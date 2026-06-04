package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ogli-link-shortener-sdk/go"
	"github.com/voxgig-sdk/ogli-link-shortener-sdk/go/core"

	vs "github.com/voxgig-sdk/ogli-link-shortener-sdk/go/utility/struct"
)

func TestLinkEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Link(nil)
		if ent == nil {
			t.Fatal("expected non-nil LinkEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := linkBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "link." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OGLILINKSHORTENER_TEST_LINK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		linkRef01Ent := client.Link(nil)
		linkRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "link"}, setup.data), "link_ref01"))

		linkRef01DataResult, err := linkRef01Ent.Create(linkRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		linkRef01Data = core.ToMapAny(linkRef01DataResult)
		if linkRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if linkRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		linkRef01Match := map[string]any{}

		linkRef01ListResult, err := linkRef01Ent.List(linkRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		linkRef01List, linkRef01ListOk := linkRef01ListResult.([]any)
		if !linkRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", linkRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(linkRef01List), map[string]any{"id": linkRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		linkRef01DataUp0Up := map[string]any{
			"id": linkRef01Data["id"],
		}

		linkRef01MarkdefUp0Name := "created_at"
		linkRef01MarkdefUp0Value := fmt.Sprintf("Mark01-link_ref01_%d", setup.now)
		linkRef01DataUp0Up[linkRef01MarkdefUp0Name] = linkRef01MarkdefUp0Value

		linkRef01ResdataUp0Result, err := linkRef01Ent.Update(linkRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		linkRef01ResdataUp0 := core.ToMapAny(linkRef01ResdataUp0Result)
		if linkRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if linkRef01ResdataUp0["id"] != linkRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if linkRef01ResdataUp0[linkRef01MarkdefUp0Name] != linkRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", linkRef01MarkdefUp0Name, linkRef01ResdataUp0[linkRef01MarkdefUp0Name])
		}

		// LOAD
		linkRef01MatchDt0 := map[string]any{
			"id": linkRef01Data["id"],
		}
		linkRef01DataDt0Loaded, err := linkRef01Ent.Load(linkRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		linkRef01DataDt0LoadResult := core.ToMapAny(linkRef01DataDt0Loaded)
		if linkRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if linkRef01DataDt0LoadResult["id"] != linkRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		linkRef01MatchRm0 := map[string]any{
			"id": linkRef01Data["id"],
		}
		_, err = linkRef01Ent.Remove(linkRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		linkRef01MatchRt0 := map[string]any{}

		linkRef01ListRt0Result, err := linkRef01Ent.List(linkRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		linkRef01ListRt0, linkRef01ListRt0Ok := linkRef01ListRt0Result.([]any)
		if !linkRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", linkRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(linkRef01ListRt0), map[string]any{"id": linkRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func linkBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "link", "LinkTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read link test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse link test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"link01", "link02", "link03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OGLILINKSHORTENER_TEST_LINK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OGLILINKSHORTENER_TEST_LINK_ENTID": idmap,
		"OGLILINKSHORTENER_TEST_LIVE":      "FALSE",
		"OGLILINKSHORTENER_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["OGLILINKSHORTENER_TEST_LINK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OGLILINKSHORTENER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewOgliLinkShortenerSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OGLILINKSHORTENER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OGLILINKSHORTENER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
