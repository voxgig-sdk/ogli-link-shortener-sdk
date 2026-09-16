

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OgliLinkShortenerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('LinkStatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OGLI_LINK_SHORTENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('OGLI_LINK_SHORTENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OgliLinkShortenerSDK.test()
    const ent = testsdk.LinkStat()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OGLI_LINK_SHORTENER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'link_stat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"clicksByCountry","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"clicksByDate","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"clicksByDevice","req":false,"type":"`$ARRAY`","index$":2},{"active":true,"name":"clicksByReferrer","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"linkId","req":false,"short":"The link identifier","type":"`$STRING`","index$":5},{"active":true,"name":"totalClicks","req":false,"short":"Total number of clicks","type":"`$INTEGER`","index$":6},{"active":true,"name":"uniqueClicks","req":false,"short":"Number of unique visitors","type":"`$INTEGER`","index$":7}],"id":{"field":"id","name":"id"},"name":"link_stat","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"link_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /links/{linkId}/stats","json":"{\"operationId\":\"getLinkStats\",\"parameters\":[{\"description\":\"The unique identifier of the link\",\"in\":\"path\",\"name\":\"linkId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date for statistics (ISO 8601 format)\",\"in\":\"query\",\"name\":\"startDate\",\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"End date for statistics (ISO 8601 format)\",\"in\":\"query\",\"name\":\"endDate\",\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"clicksByCountry\":{\"items\":{\"properties\":{\"clicks\":{\"example\":320,\"type\":\"integer\"},\"country\":{\"example\":\"US\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"clicksByDate\":{\"items\":{\"properties\":{\"clicks\":{\"example\":45,\"type\":\"integer\"},\"date\":{\"example\":\"2023-10-15\",\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"clicksByDevice\":{\"items\":{\"properties\":{\"clicks\":{\"example\":750,\"type\":\"integer\"},\"device\":{\"example\":\"mobile\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"clicksByReferrer\":{\"items\":{\"properties\":{\"clicks\":{\"example\":180,\"type\":\"integer\"},\"referrer\":{\"example\":\"twitter.com\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"linkId\":{\"description\":\"The link identifier\",\"example\":\"abc123xyz\",\"type\":\"string\"},\"totalClicks\":{\"description\":\"Total number of clicks\",\"example\":1250,\"type\":\"integer\"},\"uniqueClicks\":{\"description\":\"Number of unique visitors\",\"example\":890,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Statistics retrieved successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing authentication\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Link not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token for API authentication\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/links/{linkId}/stats","rename":{"param":{"linkId":"id"}},"segments":[{"lit":"links"},{"var":"id"},{"lit":"stats"}],"select":{"exist":["end_date","id","start_date"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"link_stat","name__orig":"link_stat","Name":"LinkStat","name_":"link_stat","name-":"link-stat","NAME":"LINK_STAT","index$":1}, {"active":true,"entity":"link_stat","key$":"BasicLinkStatFlow","kind":"basic","name":"BasicLinkStatFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"link_id":"link01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"link_stat_ref01"}}],"index$":0}]}, 'LinkStat')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let link_stat_ref01_data = Object.values(setup.data.existing.link_stat)[0] as any

    // LIST
    const link_stat_ref01_ent = client.LinkStat()
    const link_stat_ref01_match: any = {}
    link_stat_ref01_match['link_id'] = setup.idmap['link01']

    const link_stat_ref01_list = (await link_stat_ref01_ent.list(link_stat_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/link_stat/LinkStatTestData.json')

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
    ['link_stat01','link_stat02','link_stat03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OGLI_LINK_SHORTENER_TEST_LINK_STAT_ENTID': idmap,
    'OGLI_LINK_SHORTENER_TEST_LIVE': 'FALSE',
    'OGLI_LINK_SHORTENER_TEST_EXPLAIN': 'FALSE',
    'OGLI_LINK_SHORTENER_APIKEY': '',
  })

  idmap = env['OGLI_LINK_SHORTENER_TEST_LINK_STAT_ENTID']

  const live = 'TRUE' === env.OGLI_LINK_SHORTENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OGLI_LINK_SHORTENER_TEST_LINK_STAT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OgliLinkShortenerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.OGLI_LINK_SHORTENER_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
