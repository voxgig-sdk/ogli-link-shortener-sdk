package voxgigoglilinkshortenersdk

import (
	"github.com/voxgig-sdk/ogli-link-shortener-sdk/core"
	"github.com/voxgig-sdk/ogli-link-shortener-sdk/entity"
	"github.com/voxgig-sdk/ogli-link-shortener-sdk/feature"
	_ "github.com/voxgig-sdk/ogli-link-shortener-sdk/utility"
)

// Type aliases preserve external API.
type OgliLinkShortenerSDK = core.OgliLinkShortenerSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OgliLinkShortenerEntity = core.OgliLinkShortenerEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OgliLinkShortenerError = core.OgliLinkShortenerError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewLinkEntityFunc = func(client *core.OgliLinkShortenerSDK, entopts map[string]any) core.OgliLinkShortenerEntity {
		return entity.NewLinkEntity(client, entopts)
	}
	core.NewLinkStatEntityFunc = func(client *core.OgliLinkShortenerSDK, entopts map[string]any) core.OgliLinkShortenerEntity {
		return entity.NewLinkStatEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOgliLinkShortenerSDK = core.NewOgliLinkShortenerSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
