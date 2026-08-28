// Typed models for the OgliLinkShortener SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/ogli-link-shortener-sdk/go/core"
)

// Link is the typed data model for the link entity.
type Link struct {
	ClickCount *int `json:"clickCount,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	ShortUrl *string `json:"shortUrl,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Url *string `json:"url,omitempty"`
}

// LinkLoadMatch is the typed request payload for Link.LoadTyped.
type LinkLoadMatch struct {
	Id string `json:"id"`
}

// LinkListMatch is the typed request payload for Link.ListTyped.
type LinkListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
}

// LinkCreateData is the typed request payload for Link.CreateTyped.
type LinkCreateData struct {
	ClickCount *int `json:"clickCount,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	ShortUrl *string `json:"shortUrl,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Url *string `json:"url,omitempty"`
}

// LinkUpdateData is the typed request payload for Link.UpdateTyped.
type LinkUpdateData struct {
	Id string `json:"id"`
	ClickCount *int `json:"clickCount,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Image *string `json:"image,omitempty"`
	ShortUrl *string `json:"shortUrl,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Url *string `json:"url,omitempty"`
}

// LinkRemoveMatch is the typed request payload for Link.RemoveTyped.
type LinkRemoveMatch struct {
	Id string `json:"id"`
}

// LinkStat is the typed data model for the link_stat entity.
type LinkStat struct {
	ClicksByCountry *[]any `json:"clicksByCountry,omitempty"`
	ClicksByDate *[]any `json:"clicksByDate,omitempty"`
	ClicksByDevice *[]any `json:"clicksByDevice,omitempty"`
	ClicksByReferrer *[]any `json:"clicksByReferrer,omitempty"`
	Id *string `json:"id,omitempty"`
	LinkId *string `json:"linkId,omitempty"`
	TotalClicks *int `json:"totalClicks,omitempty"`
	UniqueClicks *int `json:"uniqueClicks,omitempty"`
}

// LinkStatListMatch is the typed request payload for LinkStat.ListTyped.
type LinkStatListMatch struct {
	Id string `json:"id"`
	EndDate *string `json:"end_date,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
