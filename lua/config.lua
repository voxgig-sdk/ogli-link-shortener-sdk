-- OgliLinkShortener SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "OgliLinkShortener",
      slug = "ogli-link-shortener",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://app.ogli.sh/api",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["link"] = {},
        ["link_stat"] = {},
      },
    },
    entity = {
      ["link"] = {
        ["fields"] = {
          {
            ["name"] = "clickCount",
            ["short"] = "Total number of clicks on the link",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "createdAt",
            ["short"] = "Timestamp when the link was created",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Open Graph description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the link",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "image",
            ["short"] = "Open Graph image URL",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "shortUrl",
            ["short"] = "The shortened URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "slug",
            ["short"] = "The short code used in the URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["short"] = "Open Graph title",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "updatedAt",
            ["short"] = "Timestamp when the link was last updated",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "url",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The destination URL",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "link",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/links",
                ["segments"] = {
                  {
                    ["lit"] = "links",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "links",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/links",
                ["segments"] = {
                  {
                    ["lit"] = "links",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "offset",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.links`",
                },
                ["parts"] = {
                  "links",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "link_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/links/{linkId}",
                ["rename"] = {
                  ["param"] = {
                    ["linkId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "links",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "links",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "link_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/links/{linkId}",
                ["rename"] = {
                  ["param"] = {
                    ["linkId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "links",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "links",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "link_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/links/{linkId}",
                ["rename"] = {
                  ["param"] = {
                    ["linkId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "links",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "links",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["link_stat"] = {
        ["fields"] = {
          {
            ["name"] = "clicksByCountry",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "clicksByDate",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "clicksByDevice",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "clicksByReferrer",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "linkId",
            ["short"] = "The link identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "totalClicks",
            ["short"] = "Total number of clicks",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "uniqueClicks",
            ["short"] = "Number of unique visitors",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "link_stat",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "link_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "end_date",
                      ["orig"] = "end_date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "start_date",
                      ["orig"] = "start_date",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/links/{linkId}/stats",
                ["rename"] = {
                  ["param"] = {
                    ["linkId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "links",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "stats",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "end_date",
                    "id",
                    "start_date",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "links",
                  "{id}",
                  "stats",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
