// Typed models for the OgliLinkShortener SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Link {
  clickCount?: number
  createdAt?: string
  description?: string
  id?: string
  image?: string
  shortUrl?: string
  slug?: string
  title?: string
  updatedAt?: string
  url?: string
}

export interface LinkLoadMatch {
  id: string
}

export interface LinkListMatch {
  clickCount?: number
  createdAt?: string
  description?: string
  id?: string
  image?: string
  shortUrl?: string
  slug?: string
  title?: string
  updatedAt?: string
  url?: string
}

export interface LinkCreateData {
  clickCount?: number
  createdAt?: string
  description?: string
  id?: string
  image?: string
  shortUrl?: string
  slug?: string
  title?: string
  updatedAt?: string
  url?: string
}

export interface LinkUpdateData {
  id: string
  clickCount?: number
  createdAt?: string
  description?: string
  image?: string
  shortUrl?: string
  slug?: string
  title?: string
  updatedAt?: string
  url?: string
}

export interface LinkRemoveMatch {
  id: string
}

export interface LinkStat {
  clicksByCountry?: any[]
  clicksByDate?: any[]
  clicksByDevice?: any[]
  clicksByReferrer?: any[]
  linkId?: string
  totalClicks?: number
  uniqueClicks?: number
}

export interface LinkStatListMatch {
  id: string
}

