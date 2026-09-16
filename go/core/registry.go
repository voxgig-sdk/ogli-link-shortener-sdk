package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewLinkEntityFunc func(client *OgliLinkShortenerSDK, entopts map[string]any) OgliLinkShortenerEntity

var NewLinkStatEntityFunc func(client *OgliLinkShortenerSDK, entopts map[string]any) OgliLinkShortenerEntity

