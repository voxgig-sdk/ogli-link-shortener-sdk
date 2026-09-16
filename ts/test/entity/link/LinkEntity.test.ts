

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


describe('LinkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OGLI_LINK_SHORTENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('OGLI_LINK_SHORTENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OgliLinkShortenerSDK.test()
    const ent = testsdk.Link()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OGLI_LINK_SHORTENER_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'link.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"clickCount","req":false,"short":"Total number of clicks on the link","type":"`$INTEGER`","index$":0},{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"Timestamp when the link was created","type":"`$STRING`","index$":1},{"active":true,"name":"description","req":false,"short":"Open Graph description","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the link","type":"`$STRING`","index$":3},{"active":true,"format":"uri","name":"image","req":false,"short":"Open Graph image URL","type":"`$STRING`","index$":4},{"active":true,"format":"uri","name":"shortUrl","req":false,"short":"The shortened URL","type":"`$STRING`","index$":5},{"active":true,"name":"slug","req":false,"short":"The short code used in the URL","type":"`$STRING`","index$":6},{"active":true,"name":"title","req":false,"short":"Open Graph title","type":"`$STRING`","index$":7},{"active":true,"format":"date-time","name":"updatedAt","req":false,"short":"Timestamp when the link was last updated","type":"`$STRING`","index$":8},{"active":true,"format":"uri","name":"url","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"The destination URL","type":"`$STRING`","index$":9}],"id":{"field":"id","name":"id"},"name":"link","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /links","json":"{\"operationId\":\"createLink\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Open Graph description for social media previews\",\"example\":\"Check out this amazing content\",\"type\":\"string\"},\"image\":{\"description\":\"Open Graph image URL for social media previews\",\"example\":\"https://example.com/image.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"slug\":{\"description\":\"Custom short code for the link (optional, auto-generated if not provided)\",\"example\":\"my-custom-link\",\"pattern\":\"^[a-zA-Z0-9-_]+$\",\"type\":\"string\"},\"title\":{\"description\":\"Open Graph title for social media previews\",\"example\":\"My Amazing Page\",\"type\":\"string\"},\"url\":{\"description\":\"The destination URL to shorten\",\"example\":\"https://example.com/long-url-path\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"url\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"clickCount\":{\"description\":\"Total number of clicks on the link\",\"example\":125,\"type\":\"integer\"},\"createdAt\":{\"description\":\"Timestamp when the link was created\",\"example\":\"2023-10-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Open Graph description\",\"example\":\"Check out this amazing content\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the link\",\"example\":\"abc123xyz\",\"type\":\"string\"},\"image\":{\"description\":\"Open Graph image URL\",\"example\":\"https://example.com/image.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"shortUrl\":{\"description\":\"The shortened URL\",\"example\":\"https://ogli.sh/abc123\",\"format\":\"uri\",\"type\":\"string\"},\"slug\":{\"description\":\"The short code used in the URL\",\"example\":\"abc123\",\"type\":\"string\"},\"title\":{\"description\":\"Open Graph title\",\"example\":\"My Amazing Page\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"Timestamp when the link was last updated\",\"example\":\"2023-10-20T14:45:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"The destination URL\",\"example\":\"https://example.com/long-url-path\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Link created successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid input\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing authentication\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token for API authentication\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/links","segments":[{"lit":"links"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /links","json":"{\"operationId\":\"listLinks\",\"parameters\":[{\"description\":\"Maximum number of links to return\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of links to skip for pagination\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"limit\":{\"description\":\"Maximum number of links returned\",\"example\":20,\"type\":\"integer\"},\"links\":{\"items\":{\"properties\":{\"clickCount\":{\"description\":\"Total number of clicks on the link\",\"example\":125,\"type\":\"integer\"},\"createdAt\":{\"description\":\"Timestamp when the link was created\",\"example\":\"2023-10-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Open Graph description\",\"example\":\"Check out this amazing content\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the link\",\"example\":\"abc123xyz\",\"type\":\"string\"},\"image\":{\"description\":\"Open Graph image URL\",\"example\":\"https://example.com/image.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"shortUrl\":{\"description\":\"The shortened URL\",\"example\":\"https://ogli.sh/abc123\",\"format\":\"uri\",\"type\":\"string\"},\"slug\":{\"description\":\"The short code used in the URL\",\"example\":\"abc123\",\"type\":\"string\"},\"title\":{\"description\":\"Open Graph title\",\"example\":\"My Amazing Page\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"Timestamp when the link was last updated\",\"example\":\"2023-10-20T14:45:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"The destination URL\",\"example\":\"https://example.com/long-url-path\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"offset\":{\"description\":\"Number of links skipped\",\"example\":0,\"type\":\"integer\"},\"total\":{\"description\":\"Total number of links available\",\"example\":50,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"List of links retrieved successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing authentication\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token for API authentication\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/links","segments":[{"lit":"links"}],"select":{"exist":["limit","offset"]},"transform":{"req":"`reqdata`","res":"`body.links`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"link_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /links/{linkId}","json":"{\"operationId\":\"getLink\",\"parameters\":[{\"description\":\"The unique identifier of the link\",\"in\":\"path\",\"name\":\"linkId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"clickCount\":{\"description\":\"Total number of clicks on the link\",\"example\":125,\"type\":\"integer\"},\"createdAt\":{\"description\":\"Timestamp when the link was created\",\"example\":\"2023-10-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Open Graph description\",\"example\":\"Check out this amazing content\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the link\",\"example\":\"abc123xyz\",\"type\":\"string\"},\"image\":{\"description\":\"Open Graph image URL\",\"example\":\"https://example.com/image.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"shortUrl\":{\"description\":\"The shortened URL\",\"example\":\"https://ogli.sh/abc123\",\"format\":\"uri\",\"type\":\"string\"},\"slug\":{\"description\":\"The short code used in the URL\",\"example\":\"abc123\",\"type\":\"string\"},\"title\":{\"description\":\"Open Graph title\",\"example\":\"My Amazing Page\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"Timestamp when the link was last updated\",\"example\":\"2023-10-20T14:45:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"The destination URL\",\"example\":\"https://example.com/long-url-path\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Link retrieved successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing authentication\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Link not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token for API authentication\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/links/{linkId}","rename":{"param":{"linkId":"id"}},"segments":[{"lit":"links"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"link_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /links/{linkId}","json":"{\"operationId\":\"deleteLink\",\"parameters\":[{\"description\":\"The unique identifier of the link\",\"in\":\"path\",\"name\":\"linkId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Link deleted successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing authentication\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Link not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token for API authentication\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/links/{linkId}","rename":{"param":{"linkId":"id"}},"segments":[{"lit":"links"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"link_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /links/{linkId}","json":"{\"operationId\":\"updateLink\",\"parameters\":[{\"description\":\"The unique identifier of the link\",\"in\":\"path\",\"name\":\"linkId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Open Graph description for social media previews\",\"example\":\"Updated description\",\"type\":\"string\"},\"image\":{\"description\":\"Open Graph image URL for social media previews\",\"example\":\"https://example.com/new-image.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Open Graph title for social media previews\",\"example\":\"Updated Title\",\"type\":\"string\"},\"url\":{\"description\":\"The destination URL\",\"example\":\"https://example.com/updated-url\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"clickCount\":{\"description\":\"Total number of clicks on the link\",\"example\":125,\"type\":\"integer\"},\"createdAt\":{\"description\":\"Timestamp when the link was created\",\"example\":\"2023-10-15T10:30:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Open Graph description\",\"example\":\"Check out this amazing content\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the link\",\"example\":\"abc123xyz\",\"type\":\"string\"},\"image\":{\"description\":\"Open Graph image URL\",\"example\":\"https://example.com/image.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"shortUrl\":{\"description\":\"The shortened URL\",\"example\":\"https://ogli.sh/abc123\",\"format\":\"uri\",\"type\":\"string\"},\"slug\":{\"description\":\"The short code used in the URL\",\"example\":\"abc123\",\"type\":\"string\"},\"title\":{\"description\":\"Open Graph title\",\"example\":\"My Amazing Page\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"Timestamp when the link was last updated\",\"example\":\"2023-10-20T14:45:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"The destination URL\",\"example\":\"https://example.com/long-url-path\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Link updated successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid input\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing authentication\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"INVALID_INPUT\",\"type\":\"string\"},\"details\":{\"additionalProperties\":true,\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Link not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT token for API authentication\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/links/{linkId}","rename":{"param":{"linkId":"id"}},"segments":[{"lit":"links"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"link","name__orig":"link","Name":"Link","name_":"link","name-":"link","NAME":"LINK","index$":0}, {"active":true,"entity":"link","key$":"BasicLinkFlow","kind":"basic","name":"BasicLinkFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"link_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"link_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"link_ref01","srcdatavar":"link_ref01_data","suffix":"_up0","textfield":"createdAt"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-link_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"link_ref01","srcdatavar":"link_ref01_data","suffix":"_dt0"},"match":{"id":"link01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-link_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"link_ref01","suffix":"_rm0"},"match":{"id":"link01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"link_ref01"}}],"index$":5}]}, 'Link')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const link_ref01_ent = client.Link()
    let link_ref01_data = setup.data.new.link['link_ref01']

    link_ref01_data = (await link_ref01_ent.create(link_ref01_data)).data()
    assert(null != link_ref01_data.id)


    // LIST
    const link_ref01_match: any = {}

    const link_ref01_list = (await link_ref01_ent.list(link_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(link_ref01_list, { id: link_ref01_data.id })))


    // UPDATE
    const link_ref01_data_up0: any = {}
    link_ref01_data_up0.id = link_ref01_data.id

    const link_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-link_ref01_' + setup.now }
    ;(link_ref01_data_up0 as any)[link_ref01_markdef_up0.name] = link_ref01_markdef_up0.value

    const link_ref01_resdata_up0 = (await link_ref01_ent.update(link_ref01_data_up0)).data()
    assert(link_ref01_resdata_up0.id === link_ref01_data_up0.id)

    assert((link_ref01_resdata_up0 as any)[link_ref01_markdef_up0.name] === link_ref01_markdef_up0.value)


    // LOAD
    const link_ref01_match_dt0: any = {}
    link_ref01_match_dt0.id = link_ref01_data.id
    const link_ref01_data_dt0 = (await link_ref01_ent.load(link_ref01_match_dt0)).data()
    assert(link_ref01_data_dt0.id === link_ref01_data.id)


    // REMOVE
    const link_ref01_match_rm0: any = { id: link_ref01_data.id }
    await link_ref01_ent.remove(link_ref01_match_rm0)
  

    // LIST
    const link_ref01_match_rt0: any = {}

    const link_ref01_list_rt0 = (await link_ref01_ent.list(link_ref01_match_rt0)).map((e: any) => e.data())

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

  const env = envOverride({
    'OGLI_LINK_SHORTENER_TEST_LINK_ENTID': idmap,
    'OGLI_LINK_SHORTENER_TEST_LIVE': 'FALSE',
    'OGLI_LINK_SHORTENER_TEST_EXPLAIN': 'FALSE',
    'OGLI_LINK_SHORTENER_APIKEY': '',
  })

  idmap = env['OGLI_LINK_SHORTENER_TEST_LINK_ENTID']

  const live = 'TRUE' === env.OGLI_LINK_SHORTENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OGLI_LINK_SHORTENER_TEST_LINK_ENTID']
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
  
