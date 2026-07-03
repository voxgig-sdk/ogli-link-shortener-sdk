package sdktest

import (
	"encoding/json"
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

func TestLinkStatEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LinkStat(nil)
		if ent == nil {
			t.Fatal("expected non-nil LinkStatEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := link_statBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "link_stat." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OGLILINKSHORTENER_TEST_LINK_STAT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		linkStatRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.link_stat", setup.data)))
		var linkStatRef01Data map[string]any
		if len(linkStatRef01DataRaw) > 0 {
			linkStatRef01Data = core.ToMapAny(linkStatRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = linkStatRef01Data

		// LIST
		linkStatRef01Ent := client.LinkStat(nil)
		linkStatRef01Match := map[string]any{
			"link_id": setup.idmap["link01"],
		}

		linkStatRef01ListResult, err := linkStatRef01Ent.List(linkStatRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, linkStatRef01ListOk := linkStatRef01ListResult.([]any)
		if !linkStatRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", linkStatRef01ListResult)
		}

	})
}

func link_statBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "link_stat", "LinkStatTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read link_stat test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse link_stat test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"link_stat01", "link_stat02", "link_stat03", "link01"},
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
	entidEnvRaw := os.Getenv("OGLILINKSHORTENER_TEST_LINK_STAT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OGLILINKSHORTENER_TEST_LINK_STAT_ENTID": idmap,
		"OGLILINKSHORTENER_TEST_LIVE":      "FALSE",
		"OGLILINKSHORTENER_TEST_EXPLAIN":   "FALSE",
		"OGLILINKSHORTENER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OGLILINKSHORTENER_TEST_LINK_STAT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OGLILINKSHORTENER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["OGLILINKSHORTENER_APIKEY"],
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
