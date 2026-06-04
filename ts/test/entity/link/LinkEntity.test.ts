
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { OgliLinkShortenerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('LinkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OGLILINKSHORTENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('OGLILINKSHORTENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OgliLinkShortenerSDK.test()
    const ent = testsdk.Link()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OGLI_LINK_SHORTENER_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'link.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set OGLI_LINK_SHORTENER_TEST_LINK_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const link_ref01_ent = client.Link()
    let link_ref01_data = setup.data.new.link['link_ref01']

    link_ref01_data = await link_ref01_ent.create(link_ref01_data)
    assert(null != link_ref01_data.id)


    // LIST
    const link_ref01_match: any = {}

    const link_ref01_list = await link_ref01_ent.list(link_ref01_match)

    assert(!isempty(select(link_ref01_list, { id: link_ref01_data.id })))


    // UPDATE
    const link_ref01_data_up0: any = {}
    link_ref01_data_up0.id = link_ref01_data.id

    const link_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-link_ref01_' + setup.now }
    link_ref01_data_up0 [link_ref01_markdef_up0.name] = link_ref01_markdef_up0.value

    const link_ref01_resdata_up0 = await link_ref01_ent.update(link_ref01_data_up0)
    assert(link_ref01_resdata_up0.id === link_ref01_data_up0.id)

    assert(link_ref01_resdata_up0[link_ref01_markdef_up0.name] === link_ref01_markdef_up0.value)


    // LOAD
    const link_ref01_match_dt0: any = {}
    link_ref01_match_dt0.id = link_ref01_data.id
    const link_ref01_data_dt0 = await link_ref01_ent.load(link_ref01_match_dt0)
    assert(link_ref01_data_dt0.id === link_ref01_data.id)


    // REMOVE
    const link_ref01_match_rm0: any = { id: link_ref01_data.id }
    await link_ref01_ent.remove(link_ref01_match_rm0)
  

    // LIST
    const link_ref01_match_rt0: any = {}

    const link_ref01_list_rt0 = await link_ref01_ent.list(link_ref01_match_rt0)

    assert(isempty(select(link_ref01_list_rt0, { id: link_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/link/LinkTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OgliLinkShortenerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['link01','link02','link03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['OGLI_LINK_SHORTENER_TEST_LINK_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'OGLI_LINK_SHORTENER_TEST_LINK_ENTID': idmap,
    'OGLI_LINK_SHORTENER_TEST_LIVE': 'FALSE',
    'OGLI_LINK_SHORTENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OGLI_LINK_SHORTENER_TEST_LINK_ENTID']

  const live = 'TRUE' === env.OGLI_LINK_SHORTENER_TEST_LIVE

  if (live) {
    client = new OgliLinkShortenerSDK(merge([
      {
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.OGLI_LINK_SHORTENER_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
