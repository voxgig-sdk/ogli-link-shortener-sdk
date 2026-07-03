package = "voxgig-sdk-ogli-link-shortener"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/ogli-link-shortener-sdk.git",
  tag = "lua/v0.0.1",
  dir = "ogli-link-shortener-sdk/lua"
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
