-- Typed models for the OgliLinkShortener SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Link
---@field clickCount? number
---@field createdAt? string
---@field description? string
---@field id? string
---@field image? string
---@field shortUrl? string
---@field slug? string
---@field title? string
---@field updatedAt? string
---@field url? string

---@class LinkLoadMatch
---@field id string

---@class LinkListMatch
---@field limit? number
---@field offset? number

---@class LinkCreateData
---@field clickCount? number
---@field createdAt? string
---@field description? string
---@field id? string
---@field image? string
---@field shortUrl? string
---@field slug? string
---@field title? string
---@field updatedAt? string
---@field url? string

---@class LinkUpdateData
---@field id string
---@field clickCount? number
---@field createdAt? string
---@field description? string
---@field image? string
---@field shortUrl? string
---@field slug? string
---@field title? string
---@field updatedAt? string
---@field url? string

---@class LinkRemoveMatch
---@field id string

---@class LinkStat
---@field clicksByCountry? table
---@field clicksByDate? table
---@field clicksByDevice? table
---@field clicksByReferrer? table
---@field id? string
---@field linkId? string
---@field totalClicks? number
---@field uniqueClicks? number

---@class LinkStatListMatch
---@field id string
---@field end_date? string
---@field start_date? string

local M = {}

return M
