// Typed models for the OgliLinkShortener SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Link is the typed data model for the link entity.
type Link struct {
	ClickCount *int `json:"click_count,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	ShortUrl *string `json:"short_url,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// LinkLoadMatch is the typed request payload for Link.LoadTyped.
type LinkLoadMatch struct {
	Id string `json:"id"`
}

// LinkListMatch is the typed request payload for Link.ListTyped.
type LinkListMatch struct {
	ClickCount *int `json:"click_count,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	ShortUrl *string `json:"short_url,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// LinkCreateData is the typed request payload for Link.CreateTyped.
type LinkCreateData struct {
	ClickCount *int `json:"click_count,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	ShortUrl *string `json:"short_url,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// LinkUpdateData is the typed request payload for Link.UpdateTyped.
type LinkUpdateData struct {
	Id string `json:"id"`
}

// LinkRemoveMatch is the typed request payload for Link.RemoveTyped.
type LinkRemoveMatch struct {
	Id string `json:"id"`
}

// LinkStat is the typed data model for the link_stat entity.
type LinkStat struct {
	ClicksByCountry *[]any `json:"clicks_by_country,omitempty"`
	ClicksByDate *[]any `json:"clicks_by_date,omitempty"`
	ClicksByDevice *[]any `json:"clicks_by_device,omitempty"`
	ClicksByReferrer *[]any `json:"clicks_by_referrer,omitempty"`
	LinkId *string `json:"link_id,omitempty"`
	TotalClick *int `json:"total_click,omitempty"`
	UniqueClick *int `json:"unique_click,omitempty"`
}

// LinkStatListMatch is the typed request payload for LinkStat.ListTyped.
type LinkStatListMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
