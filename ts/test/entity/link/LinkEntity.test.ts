

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"clickCount":{"a":true,"h":"Click Count","n":"clickCount","r":false,"sh":"Total number of clicks on the link","t":"`$INTEGER`","key$":"clickCount","index$":0},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"Timestamp when the link was created","t":"`$STRING`","key$":"createdAt","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Open Graph description","t":"`$STRING`","key$":"description","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the link","t":"`$STRING`","key$":"id","index$":3},"image":{"a":true,"fo":"uri","h":"Image","n":"image","r":false,"sh":"Open Graph image URL","t":"`$STRING`","key$":"image","index$":4},"shortUrl":{"a":true,"fo":"uri","h":"Short Url","n":"shortUrl","r":false,"sh":"The shortened URL","t":"`$STRING`","key$":"shortUrl","index$":5},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"The short code used in the URL","t":"`$STRING`","key$":"slug","index$":6},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Open Graph title","t":"`$STRING`","key$":"title","index$":7},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"Timestamp when the link was last updated","t":"`$STRING`","key$":"updatedAt","index$":8},"url":{"a":true,"fo":"uri","h":"Url","n":"url","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The destination URL","t":"`$STRING`","key$":"url","index$":9}},"id":{"field":"id","name":"id"},"name":"link","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /links","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/links","q":{},"r":{},"s":[{"lit":"links"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /links","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/links","q":{"exist":["limit","offset"]},"r":{},"s":[{"lit":"links"}],"t":{"req":"`reqdata`","res":"`body.links`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /links/{linkId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"link_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/links/{linkId}","q":{"exist":["id"]},"r":{"param":{"linkId":"id"}},"s":[{"lit":"links"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /links/{linkId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"link_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/links/{linkId}","q":{"exist":["id"]},"r":{"param":{"linkId":"id"}},"s":[{"lit":"links"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /links/{linkId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"link_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/links/{linkId}","q":{"exist":["id"]},"r":{"param":{"linkId":"id"}},"s":[{"lit":"links"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"link","name__orig":"link","Name":"Link","name_":"link","name-":"link","NAME":"LINK","index$":0}, {"active":true,"entity":"link","key$":"BasicLinkFlow","kind":"basic","name":"BasicLinkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"link_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"link_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"link_ref01","srcdatavar":"link_ref01_data","suffix":"_up0","textfield":"createdAt"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-link_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"link_ref01","srcdatavar":"link_ref01_data","suffix":"_dt0"},"m":{"id":"link01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-link_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"link_ref01","suffix":"_rm0"},"m":{"id":"link01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"link_ref01"}}],"index$":5}]}, 'Link', {"POST /links":{"protocol":"http","operationId":"createLink","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["url"],"properties":{"url":{"type":"string","format":"uri","description":"The destination URL to shorten","example":"https://example.com/long-url-path","key$":"url"},"slug":{"type":"string","description":"Custom short code for the link (optional, auto-generated if not provided)","pattern":"^[a-zA-Z0-9-_]+$","example":"my-custom-link","key$":"slug"},"title":{"type":"string","description":"Open Graph title for social media previews","example":"My Amazing Page","key$":"title"},"description":{"type":"string","description":"Open Graph description for social media previews","example":"Check out this amazing content","key$":"description"},"image":{"type":"string","format":"uri","description":"Open Graph image URL for social media previews","example":"https://example.com/image.jpg","key$":"image"}},"x-ref":"#/components/schemas/CreateLinkRequest","index$":1}}}},"responses":{"201":{"description":"Link created successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Unique identifier for the link","example":"abc123xyz","type":"string","key$":"id"},"shortUrl":{"description":"The shortened URL","example":"https://ogli.sh/abc123","format":"uri","type":"string","key$":"shortUrl"},"url":{"description":"The destination URL","example":"https://example.com/long-url-path","format":"uri","type":"string","key$":"url"},"slug":{"description":"The short code used in the URL","example":"abc123","type":"string","key$":"slug"},"title":{"description":"Open Graph title","example":"My Amazing Page","type":"string","key$":"title"},"description":{"description":"Open Graph description","example":"Check out this amazing content","type":"string","key$":"description"},"image":{"description":"Open Graph image URL","example":"https://example.com/image.jpg","format":"uri","type":"string","key$":"image"},"createdAt":{"description":"Timestamp when the link was created","example":"2023-10-15T10:30:00Z","format":"date-time","type":"string","key$":"createdAt"},"updatedAt":{"description":"Timestamp when the link was last updated","example":"2023-10-20T14:45:00Z","format":"date-time","type":"string","key$":"updatedAt"},"clickCount":{"description":"Total number of clicks on the link","example":125,"type":"integer","key$":"clickCount"}},"x-ref":"#/components/schemas/Link"}}}},"400":{"description":"Bad request - Invalid input","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"401":{"description":"Unauthorized - Invalid or missing authentication","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"security":[{"bearerAuth":[]}],"securitySource":"definition","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT token for API authentication"}}},"GET /links":{"protocol":"http","operationId":"listLinks","responses":{"200":{"description":"List of links retrieved successfully","content":{"application/json":{"schema":{"type":"object","properties":{"links":{"items":{"properties":{"clickCount":{"description":"Total number of clicks on the link","example":125,"type":"integer","key$":"clickCount"},"createdAt":{"description":"Timestamp when the link was created","example":"2023-10-15T10:30:00Z","format":"date-time","type":"string","key$":"createdAt"},"description":{"description":"Open Graph description","example":"Check out this amazing content","type":"string","key$":"description"},"id":{"description":"Unique identifier for the link","example":"abc123xyz","type":"string","key$":"id"},"image":{"description":"Open Graph image URL","example":"https://example.com/image.jpg","format":"uri","type":"string","key$":"image"},"shortUrl":{"description":"The shortened URL","example":"https://ogli.sh/abc123","format":"uri","type":"string","key$":"shortUrl"},"slug":{"description":"The short code used in the URL","example":"abc123","type":"string","key$":"slug"},"title":{"description":"Open Graph title","example":"My Amazing Page","type":"string","key$":"title"},"updatedAt":{"description":"Timestamp when the link was last updated","example":"2023-10-20T14:45:00Z","format":"date-time","type":"string","key$":"updatedAt"},"url":{"description":"The destination URL","example":"https://example.com/long-url-path","format":"uri","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Link","index$":0},"key$":"links","type":"array"},"total":{"description":"Total number of links available","example":50,"key$":"total","type":"integer"},"limit":{"description":"Maximum number of links returned","example":20,"key$":"limit","type":"integer"},"offset":{"description":"Number of links skipped","example":0,"key$":"offset","type":"integer"}},"x-ref":"#/components/schemas/LinkList"}}}},"401":{"description":"Unauthorized - Invalid or missing authentication","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"limit","in":"query","description":"Maximum number of links to return","schema":{"type":"integer","default":20,"minimum":1,"maximum":100},"index$":0},{"name":"offset","in":"query","description":"Number of links to skip for pagination","schema":{"type":"integer","default":0,"minimum":0},"index$":1}],"security":[{"bearerAuth":[]}],"securitySource":"definition","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT token for API authentication"}}},"GET /links/{linkId}":{"protocol":"http","operationId":"getLink","responses":{"200":{"description":"Link retrieved successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Unique identifier for the link","example":"abc123xyz","type":"string","key$":"id"},"shortUrl":{"description":"The shortened URL","example":"https://ogli.sh/abc123","format":"uri","type":"string","key$":"shortUrl"},"url":{"description":"The destination URL","example":"https://example.com/long-url-path","format":"uri","type":"string","key$":"url"},"slug":{"description":"The short code used in the URL","example":"abc123","type":"string","key$":"slug"},"title":{"description":"Open Graph title","example":"My Amazing Page","type":"string","key$":"title"},"description":{"description":"Open Graph description","example":"Check out this amazing content","type":"string","key$":"description"},"image":{"description":"Open Graph image URL","example":"https://example.com/image.jpg","format":"uri","type":"string","key$":"image"},"createdAt":{"description":"Timestamp when the link was created","example":"2023-10-15T10:30:00Z","format":"date-time","type":"string","key$":"createdAt"},"updatedAt":{"description":"Timestamp when the link was last updated","example":"2023-10-20T14:45:00Z","format":"date-time","type":"string","key$":"updatedAt"},"clickCount":{"description":"Total number of clicks on the link","example":125,"type":"integer","key$":"clickCount"}},"x-ref":"#/components/schemas/Link","index$":0}}}},"401":{"description":"Unauthorized - Invalid or missing authentication","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Link not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"linkId","in":"path","required":true,"description":"The unique identifier of the link","schema":{"type":"string"},"index$":0}],"security":[{"bearerAuth":[]}],"securitySource":"definition","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT token for API authentication"}}},"DELETE /links/{linkId}":{"protocol":"http","operationId":"deleteLink","responses":{"204":{"description":"Link deleted successfully"},"401":{"description":"Unauthorized - Invalid or missing authentication","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Link not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"linkId","in":"path","required":true,"description":"The unique identifier of the link","schema":{"type":"string"},"index$":0}],"security":[{"bearerAuth":[]}],"securitySource":"definition","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT token for API authentication"}}},"PUT /links/{linkId}":{"protocol":"http","operationId":"updateLink","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"url":{"type":"string","format":"uri","description":"The destination URL","example":"https://example.com/updated-url","key$":"url"},"title":{"type":"string","description":"Open Graph title for social media previews","example":"Updated Title","key$":"title"},"description":{"type":"string","description":"Open Graph description for social media previews","example":"Updated description","key$":"description"},"image":{"type":"string","format":"uri","description":"Open Graph image URL for social media previews","example":"https://example.com/new-image.jpg","key$":"image"}},"x-ref":"#/components/schemas/UpdateLinkRequest","index$":1}}}},"responses":{"200":{"description":"Link updated successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Unique identifier for the link","example":"abc123xyz","type":"string","key$":"id"},"shortUrl":{"description":"The shortened URL","example":"https://ogli.sh/abc123","format":"uri","type":"string","key$":"shortUrl"},"url":{"description":"The destination URL","example":"https://example.com/long-url-path","format":"uri","type":"string","key$":"url"},"slug":{"description":"The short code used in the URL","example":"abc123","type":"string","key$":"slug"},"title":{"description":"Open Graph title","example":"My Amazing Page","type":"string","key$":"title"},"description":{"description":"Open Graph description","example":"Check out this amazing content","type":"string","key$":"description"},"image":{"description":"Open Graph image URL","example":"https://example.com/image.jpg","format":"uri","type":"string","key$":"image"},"createdAt":{"description":"Timestamp when the link was created","example":"2023-10-15T10:30:00Z","format":"date-time","type":"string","key$":"createdAt"},"updatedAt":{"description":"Timestamp when the link was last updated","example":"2023-10-20T14:45:00Z","format":"date-time","type":"string","key$":"updatedAt"},"clickCount":{"description":"Total number of clicks on the link","example":125,"type":"integer","key$":"clickCount"}},"x-ref":"#/components/schemas/Link","index$":0}}}},"400":{"description":"Bad request - Invalid input","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"401":{"description":"Unauthorized - Invalid or missing authentication","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Link not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid request parameters"},"code":{"type":"string","description":"Error code","example":"INVALID_INPUT"},"details":{"type":"object","description":"Additional error details","additionalProperties":true}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"linkId","in":"path","required":true,"description":"The unique identifier of the link","schema":{"type":"string"},"index$":0}],"security":[{"bearerAuth":[]}],"securitySource":"definition","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT token for API authentication"}}}})
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
  
