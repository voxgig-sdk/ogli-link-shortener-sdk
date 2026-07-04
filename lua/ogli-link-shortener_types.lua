-- Typed models for the OgliLinkShortener SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Link
---@field click_count? number
---@field created_at? string
---@field description? string
---@field id? string
---@field image? string
---@field short_url? string
---@field slug? string
---@field title? string
---@field updated_at? string
---@field url? string

---@class LinkLoadMatch
---@field id string

---@class LinkListMatch

---@class LinkCreateData

---@class LinkUpdateData
---@field id string

---@class LinkRemoveMatch
---@field id string

---@class LinkStat
---@field clicks_by_country? table
---@field clicks_by_date? table
---@field clicks_by_device? table
---@field clicks_by_referrer? table
---@field link_id? string
---@field total_click? number
---@field unique_click? number

---@class LinkStatListMatch
---@field id string

local M = {}

return M
