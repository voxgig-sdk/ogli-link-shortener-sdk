// Typed models for the OgliLinkShortener SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Link {
  click_count?: number
  created_at?: string
  description?: string
  id?: string
  image?: string
  short_url?: string
  slug?: string
  title?: string
  updated_at?: string
  url?: string
}

export interface LinkLoadMatch {
  id: string
}

export interface LinkListMatch {
  click_count?: number
  created_at?: string
  description?: string
  id?: string
  image?: string
  short_url?: string
  slug?: string
  title?: string
  updated_at?: string
  url?: string
}

export interface LinkCreateData {
  click_count?: number
  created_at?: string
  description?: string
  id?: string
  image?: string
  short_url?: string
  slug?: string
  title?: string
  updated_at?: string
  url?: string
}

export interface LinkUpdateData {
  id: string
}

export interface LinkRemoveMatch {
  id: string
}

export interface LinkStat {
  clicks_by_country?: any[]
  clicks_by_date?: any[]
  clicks_by_device?: any[]
  clicks_by_referrer?: any[]
  link_id?: string
  total_click?: number
  unique_click?: number
}

export interface LinkStatListMatch {
  id: string
}

