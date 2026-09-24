
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'OgliLinkShortener',
        slug: "ogli-link-shortener",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://app.ogli.sh/api",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        link: {
        },
  
        link_stat: {
        },
  
    }
  }


  entity = {
    "link": {
      "fields": [
        {
          "name": "clickCount",
          "title": "Click Count",
          "type": "`$INTEGER`",
          "short": "Total number of clicks on the link"
        },
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "short": "Timestamp when the link was created",
          "format": "date-time"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Open Graph description"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique identifier for the link"
        },
        {
          "name": "image",
          "title": "Image",
          "type": "`$STRING`",
          "short": "Open Graph image URL",
          "format": "uri"
        },
        {
          "name": "shortUrl",
          "title": "Short Url",
          "type": "`$STRING`",
          "short": "The shortened URL",
          "format": "uri"
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "short": "The short code used in the URL"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Open Graph title"
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "short": "Timestamp when the link was last updated",
          "format": "date-time"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "The destination URL",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "link",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/links",
              "segments": [
                {
                  "lit": "links"
                }
              ],
              "parts": [
                "links"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/links",
              "segments": [
                {
                  "lit": "links"
                }
              ],
              "parts": [
                "links"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.links`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "offset"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/links/{linkId}",
              "segments": [
                {
                  "lit": "links"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "links",
                "{id}"
              ],
              "rename": {
                "param": {
                  "linkId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "link_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/links/{linkId}",
              "segments": [
                {
                  "lit": "links"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "links",
                "{id}"
              ],
              "rename": {
                "param": {
                  "linkId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "link_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/links/{linkId}",
              "segments": [
                {
                  "lit": "links"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "links",
                "{id}"
              ],
              "rename": {
                "param": {
                  "linkId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "link_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "link_stat": {
      "fields": [
        {
          "name": "clicksByCountry",
          "title": "Clicks By Country",
          "type": "`$ARRAY`"
        },
        {
          "name": "clicksByDate",
          "title": "Clicks By Date",
          "type": "`$ARRAY`"
        },
        {
          "name": "clicksByDevice",
          "title": "Clicks By Device",
          "type": "`$ARRAY`"
        },
        {
          "name": "clicksByReferrer",
          "title": "Clicks By Referrer",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "linkId",
          "title": "Link Id",
          "type": "`$STRING`",
          "short": "The link identifier"
        },
        {
          "name": "totalClicks",
          "title": "Total Clicks",
          "type": "`$INTEGER`",
          "short": "Total number of clicks"
        },
        {
          "name": "uniqueClicks",
          "title": "Unique Clicks",
          "type": "`$INTEGER`",
          "short": "Number of unique visitors"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "link_stat",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/links/{linkId}/stats",
              "segments": [
                {
                  "lit": "links"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "stats"
                }
              ],
              "parts": [
                "links",
                "{id}",
                "stats"
              ],
              "rename": {
                "param": {
                  "linkId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "link_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "end_date",
                  "id",
                  "start_date"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

