# frozen_string_literal: true

# Typed models for the OgliLinkShortener SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Link entity data model.
#
# @!attribute [rw] clickCount
#   @return [Integer, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] shortUrl
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Link = Struct.new(
  :clickCount,
  :createdAt,
  :description,
  :id,
  :image,
  :shortUrl,
  :slug,
  :title,
  :updatedAt,
  :url,
  keyword_init: true
)

# Request payload for Link#load.
#
# @!attribute [rw] id
#   @return [String]
LinkLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Link#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
LinkListMatch = Struct.new(
  :limit,
  :offset,
  keyword_init: true
)

# Request payload for Link#create.
#
# @!attribute [rw] clickCount
#   @return [Integer, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] shortUrl
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
LinkCreateData = Struct.new(
  :clickCount,
  :createdAt,
  :description,
  :id,
  :image,
  :shortUrl,
  :slug,
  :title,
  :updatedAt,
  :url,
  keyword_init: true
)

# Request payload for Link#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] clickCount
#   @return [Integer, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] shortUrl
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
LinkUpdateData = Struct.new(
  :id,
  :clickCount,
  :createdAt,
  :description,
  :image,
  :shortUrl,
  :slug,
  :title,
  :updatedAt,
  :url,
  keyword_init: true
)

# Request payload for Link#remove.
#
# @!attribute [rw] id
#   @return [String]
LinkRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# LinkStat entity data model.
#
# @!attribute [rw] clicksByCountry
#   @return [Array, nil]
#
# @!attribute [rw] clicksByDate
#   @return [Array, nil]
#
# @!attribute [rw] clicksByDevice
#   @return [Array, nil]
#
# @!attribute [rw] clicksByReferrer
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] linkId
#   @return [String, nil]
#
# @!attribute [rw] totalClicks
#   @return [Integer, nil]
#
# @!attribute [rw] uniqueClicks
#   @return [Integer, nil]
LinkStat = Struct.new(
  :clicksByCountry,
  :clicksByDate,
  :clicksByDevice,
  :clicksByReferrer,
  :id,
  :linkId,
  :totalClicks,
  :uniqueClicks,
  keyword_init: true
)

# Request payload for LinkStat#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
LinkStatListMatch = Struct.new(
  :id,
  :end_date,
  :start_date,
  keyword_init: true
)

