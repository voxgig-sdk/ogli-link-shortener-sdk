package = "voxgig-sdk-ogli-link-shortener"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/ogli-link-shortener-sdk.git"
}
description = {
  summary = "OgliLinkShortener SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["ogli-link-shortener_sdk"] = "ogli-link-shortener_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
