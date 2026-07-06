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
# @!attribute [rw] click_count
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
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
# @!attribute [rw] short_url
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Link = Struct.new(
  :click_count,
  :created_at,
  :description,
  :id,
  :image,
  :short_url,
  :slug,
  :title,
  :updated_at,
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
# @!attribute [rw] click_count
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
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
# @!attribute [rw] short_url
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
LinkListMatch = Struct.new(
  :click_count,
  :created_at,
  :description,
  :id,
  :image,
  :short_url,
  :slug,
  :title,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for Link#create.
#
# @!attribute [rw] click_count
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
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
# @!attribute [rw] short_url
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
LinkCreateData = Struct.new(
  :click_count,
  :created_at,
  :description,
  :id,
  :image,
  :short_url,
  :slug,
  :title,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for Link#update.
#
# @!attribute [rw] id
#   @return [String]
LinkUpdateData = Struct.new(
  :id,
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
# @!attribute [rw] clicks_by_country
#   @return [Array, nil]
#
# @!attribute [rw] clicks_by_date
#   @return [Array, nil]
#
# @!attribute [rw] clicks_by_device
#   @return [Array, nil]
#
# @!attribute [rw] clicks_by_referrer
#   @return [Array, nil]
#
# @!attribute [rw] link_id
#   @return [String, nil]
#
# @!attribute [rw] total_click
#   @return [Integer, nil]
#
# @!attribute [rw] unique_click
#   @return [Integer, nil]
LinkStat = Struct.new(
  :clicks_by_country,
  :clicks_by_date,
  :clicks_by_device,
  :clicks_by_referrer,
  :link_id,
  :total_click,
  :unique_click,
  keyword_init: true
)

# Request payload for LinkStat#list.
#
# @!attribute [rw] id
#   @return [String]
LinkStatListMatch = Struct.new(
  :id,
  keyword_init: true
)

