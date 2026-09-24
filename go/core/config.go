package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OgliLinkShortener",
			"slug": "ogli-link-shortener",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://app.ogli.sh/api",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"link": map[string]any{},
				"link_stat": map[string]any{},
			},
		},
		"entity": map[string]any{
			"link": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clickCount",
						"title": "Click Count",
						"type": "`$INTEGER`",
						"short": "Total number of clicks on the link",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Timestamp when the link was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Open Graph description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the link",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$STRING`",
						"short": "Open Graph image URL",
						"format": "uri",
					},
					map[string]any{
						"name": "shortUrl",
						"title": "Short Url",
						"type": "`$STRING`",
						"short": "The shortened URL",
						"format": "uri",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"short": "The short code used in the URL",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Open Graph title",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "Timestamp when the link was last updated",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The destination URL",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "link",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/links",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
								},
								"parts": []any{
									"links",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/links",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
								},
								"parts": []any{
									"links",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.links`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/links/{linkId}",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"links",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"linkId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "link_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/links/{linkId}",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"links",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"linkId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "link_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/links/{linkId}",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"links",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"linkId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "link_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"link_stat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clicksByCountry",
						"title": "Clicks By Country",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "clicksByDate",
						"title": "Clicks By Date",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "clicksByDevice",
						"title": "Clicks By Device",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "clicksByReferrer",
						"title": "Clicks By Referrer",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "linkId",
						"title": "Link Id",
						"type": "`$STRING`",
						"short": "The link identifier",
					},
					map[string]any{
						"name": "totalClicks",
						"title": "Total Clicks",
						"type": "`$INTEGER`",
						"short": "Total number of clicks",
					},
					map[string]any{
						"name": "uniqueClicks",
						"title": "Unique Clicks",
						"type": "`$INTEGER`",
						"short": "Number of unique visitors",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "link_stat",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/links/{linkId}/stats",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "stats",
									},
								},
								"parts": []any{
									"links",
									"{id}",
									"stats",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"linkId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "link_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"id",
										"start_date",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
