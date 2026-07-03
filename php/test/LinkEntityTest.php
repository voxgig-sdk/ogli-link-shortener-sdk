<?php
declare(strict_types=1);

// Link entity test

require_once __DIR__ . '/../oglilinkshortener_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class LinkEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OgliLinkShortenerSDK::test(null, null);
        $ent = $testsdk->Link(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = link_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "link." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set OGLILINKSHORTENER_TEST_LINK_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $link_ref01_ent = $client->Link(null);
        $link_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.link"), "link_ref01"));

        [$link_ref01_data_result, $err] = $link_ref01_ent->create($link_ref01_data, null);
        $this->assertNull($err);
        $link_ref01_data = Helpers::to_map($link_ref01_data_result);
        $this->assertNotNull($link_ref01_data);
        $this->assertNotNull($link_ref01_data["id"]);

        // LIST
        $link_ref01_match = [];

        [$link_ref01_list_result, $err] = $link_ref01_ent->list($link_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($link_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($link_ref01_list_result),
            ["id" => $link_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $link_ref01_data_up0_up = [
            "id" => $link_ref01_data["id"],
        ];

        $link_ref01_markdef_up0_name = "created_at";
        $link_ref01_markdef_up0_value = "Mark01-link_ref01_" . $setup["now"];
        $link_ref01_data_up0_up[$link_ref01_markdef_up0_name] = $link_ref01_markdef_up0_value;

        [$link_ref01_resdata_up0_result, $err] = $link_ref01_ent->update($link_ref01_data_up0_up, null);
        $this->assertNull($err);
        $link_ref01_resdata_up0 = Helpers::to_map($link_ref01_resdata_up0_result);
        $this->assertNotNull($link_ref01_resdata_up0);
        $this->assertEquals($link_ref01_resdata_up0["id"], $link_ref01_data_up0_up["id"]);
        $this->assertEquals($link_ref01_resdata_up0[$link_ref01_markdef_up0_name], $link_ref01_markdef_up0_value);

        // LOAD
        $link_ref01_match_dt0 = [
            "id" => $link_ref01_data["id"],
        ];
        [$link_ref01_data_dt0_loaded, $err] = $link_ref01_ent->load($link_ref01_match_dt0, null);
        $this->assertNull($err);
        $link_ref01_data_dt0_load_result = Helpers::to_map($link_ref01_data_dt0_loaded);
        $this->assertNotNull($link_ref01_data_dt0_load_result);
        $this->assertEquals($link_ref01_data_dt0_load_result["id"], $link_ref01_data["id"]);

        // REMOVE
        $link_ref01_match_rm0 = [
            "id" => $link_ref01_data["id"],
        ];
        [$_, $err] = $link_ref01_ent->remove($link_ref01_match_rm0, null);
        $this->assertNull($err);

        // LIST
        $link_ref01_match_rt0 = [];

        [$link_ref01_list_rt0_result, $err] = $link_ref01_ent->list($link_ref01_match_rt0, null);
        $this->assertNull($err);
        $this->assertIsArray($link_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($link_ref01_list_rt0_result),
            ["id" => $link_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function link_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/link/LinkTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OgliLinkShortenerSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["link01", "link02", "link03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("OGLILINKSHORTENER_TEST_LINK_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "OGLILINKSHORTENER_TEST_LINK_ENTID" => $idmap,
        "OGLILINKSHORTENER_TEST_LIVE" => "FALSE",
        "OGLILINKSHORTENER_TEST_EXPLAIN" => "FALSE",
        "OGLILINKSHORTENER_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["OGLILINKSHORTENER_TEST_LINK_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["OGLILINKSHORTENER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["OGLILINKSHORTENER_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new OgliLinkShortenerSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["OGLILINKSHORTENER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["OGLILINKSHORTENER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
