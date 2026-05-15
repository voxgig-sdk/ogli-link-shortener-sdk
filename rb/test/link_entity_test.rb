# Link entity test

require "minitest/autorun"
require "json"
require_relative "../OgliLinkShortener_sdk"
require_relative "runner"

class LinkEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OgliLinkShortenerSDK.test(nil, nil)
    ent = testsdk.Link(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = link_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "link." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OGLILINKSHORTENER_TEST_LINK_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    link_ref01_ent = client.Link(nil)
    link_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.link"), "link_ref01"))

    link_ref01_data_result, err = link_ref01_ent.create(link_ref01_data, nil)
    assert_nil err
    link_ref01_data = Helpers.to_map(link_ref01_data_result)
    assert !link_ref01_data.nil?
    assert !link_ref01_data["id"].nil?

    # LIST
    link_ref01_match = {}

    link_ref01_list_result, err = link_ref01_ent.list(link_ref01_match, nil)
    assert_nil err
    assert link_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(link_ref01_list_result),
      { "id" => link_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    link_ref01_data_up0_up = {
      "id" => link_ref01_data["id"],
    }

    link_ref01_markdef_up0_name = "created_at"
    link_ref01_markdef_up0_value = "Mark01-link_ref01_#{setup[:now]}"
    link_ref01_data_up0_up[link_ref01_markdef_up0_name] = link_ref01_markdef_up0_value

    link_ref01_resdata_up0_result, err = link_ref01_ent.update(link_ref01_data_up0_up, nil)
    assert_nil err
    link_ref01_resdata_up0 = Helpers.to_map(link_ref01_resdata_up0_result)
    assert !link_ref01_resdata_up0.nil?
    assert_equal link_ref01_resdata_up0["id"], link_ref01_data_up0_up["id"]
    assert_equal link_ref01_resdata_up0[link_ref01_markdef_up0_name], link_ref01_markdef_up0_value

    # LOAD
    link_ref01_match_dt0 = {
      "id" => link_ref01_data["id"],
    }
    link_ref01_data_dt0_loaded, err = link_ref01_ent.load(link_ref01_match_dt0, nil)
    assert_nil err
    link_ref01_data_dt0_load_result = Helpers.to_map(link_ref01_data_dt0_loaded)
    assert !link_ref01_data_dt0_load_result.nil?
    assert_equal link_ref01_data_dt0_load_result["id"], link_ref01_data["id"]

    # REMOVE
    link_ref01_match_rm0 = {
      "id" => link_ref01_data["id"],
    }
    _, err = link_ref01_ent.remove(link_ref01_match_rm0, nil)
    assert_nil err

    # LIST
    link_ref01_match_rt0 = {}

    link_ref01_list_rt0_result, err = link_ref01_ent.list(link_ref01_match_rt0, nil)
    assert_nil err
    assert link_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(link_ref01_list_rt0_result),
      { "id" => link_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def link_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "link", "LinkTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OgliLinkShortenerSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["link01", "link02", "link03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["OGLILINKSHORTENER_TEST_LINK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OGLILINKSHORTENER_TEST_LINK_ENTID" => idmap,
    "OGLILINKSHORTENER_TEST_LIVE" => "FALSE",
    "OGLILINKSHORTENER_TEST_EXPLAIN" => "FALSE",
    "OGLILINKSHORTENER_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["OGLILINKSHORTENER_TEST_LINK_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["OGLILINKSHORTENER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["OGLILINKSHORTENER_APIKEY"],
      },
      extra || {},
    ])
    client = OgliLinkShortenerSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["OGLILINKSHORTENER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["OGLILINKSHORTENER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
