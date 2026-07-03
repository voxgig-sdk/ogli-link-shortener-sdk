<?php
declare(strict_types=1);

// LinkStat entity test

require_once __DIR__ . '/../oglilinkshortener_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class LinkStatEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OgliLinkShortenerSDK::test(null, null);
        $ent = $testsdk->LinkStat(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = link_stat_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "link_stat." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set OGLILINKSHORTENER_TEST_LINK_STAT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $link_stat_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.link_stat")));
        $link_stat_ref01_data = null;
        if (count($link_stat_ref01_data_raw) > 0) {
            $link_stat_ref01_data = Helpers::to_map($link_stat_ref01_data_raw[0][1]);
        }

        // LIST
        $link_stat_ref01_ent = $client->LinkStat(null);
        $link_stat_ref01_match = [
            "link_id" => $setup["idmap"]["link01"],
        ];

        [$link_stat_ref01_list_result, $err] = $link_stat_ref01_ent->list($link_stat_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($link_stat_ref01_list_result);

    }
}

function link_stat_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/link_stat/LinkStatTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OgliLinkShortenerSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["link_stat01", "link_stat02", "link_stat03", "link01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("OGLILINKSHORTENER_TEST_LINK_STAT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "OGLILINKSHORTENER_TEST_LINK_STAT_ENTID" => $idmap,
        "OGLILINKSHORTENER_TEST_LIVE" => "FALSE",
        "OGLILINKSHORTENER_TEST_EXPLAIN" => "FALSE",
        "OGLILINKSHORTENER_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["OGLILINKSHORTENER_TEST_LINK_STAT_ENTID"]);
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
