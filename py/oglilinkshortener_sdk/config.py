# OgliLinkShortener SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "OgliLinkShortener",
            "slug": "ogli-link-shortener",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://app.ogli.sh/api",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "link": {},
                "link_stat": {},
            },
        },
        "entity": {
      "link": {
        "fields": [
          {
            "name": "clickCount",
            "title": "Click Count",
            "type": "`$INTEGER`",
            "short": "Total number of clicks on the link",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the link was created",
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Open Graph description",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the link",
          },
          {
            "name": "image",
            "title": "Image",
            "type": "`$STRING`",
            "short": "Open Graph image URL",
            "format": "uri",
          },
          {
            "name": "shortUrl",
            "title": "Short Url",
            "type": "`$STRING`",
            "short": "The shortened URL",
            "format": "uri",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "short": "The short code used in the URL",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "Open Graph title",
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the link was last updated",
            "format": "date-time",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The destination URL",
            "format": "uri",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "links",
                  },
                ],
                "parts": [
                  "links",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "links",
                  },
                ],
                "parts": [
                  "links",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.links`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
              },
            ],
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
                    "lit": "links",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "links",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "linkId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "link_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
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
                    "lit": "links",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "links",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "linkId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "link_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
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
                    "lit": "links",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "links",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "linkId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "link_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "link_stat": {
        "fields": [
          {
            "name": "clicksByCountry",
            "title": "Clicks By Country",
            "type": "`$ARRAY`",
          },
          {
            "name": "clicksByDate",
            "title": "Clicks By Date",
            "type": "`$ARRAY`",
          },
          {
            "name": "clicksByDevice",
            "title": "Clicks By Device",
            "type": "`$ARRAY`",
          },
          {
            "name": "clicksByReferrer",
            "title": "Clicks By Referrer",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "linkId",
            "title": "Link Id",
            "type": "`$STRING`",
            "short": "The link identifier",
          },
          {
            "name": "totalClicks",
            "title": "Total Clicks",
            "type": "`$INTEGER`",
            "short": "Total number of clicks",
          },
          {
            "name": "uniqueClicks",
            "title": "Unique Clicks",
            "type": "`$INTEGER`",
            "short": "Number of unique visitors",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "links",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "stats",
                  },
                ],
                "parts": [
                  "links",
                  "{id}",
                  "stats",
                ],
                "rename": {
                  "param": {
                    "linkId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "link_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "end_date",
                    "id",
                    "start_date",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
