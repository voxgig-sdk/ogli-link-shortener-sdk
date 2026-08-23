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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"short": "Total number of clicks on the link",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "createdAt",
						"short": "Timestamp when the link was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Open Graph description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"short": "Open Graph image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shortUrl",
						"short": "The shortened URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"short": "The short code used in the URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Open Graph title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"short": "Timestamp when the link was last updated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The destination URL",
						"type": "`$STRING`",
					},
				},
				"name": "link",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/links",
								"parts": []any{
									"links",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/links",
								"parts": []any{
									"links",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.links`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "link_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/links/{linkId}",
								"parts": []any{
									"links",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"linkId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "link_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/links/{linkId}",
								"parts": []any{
									"links",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"linkId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "link_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/links/{linkId}",
								"parts": []any{
									"links",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"linkId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "clicksByDate",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "clicksByDevice",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "clicksByReferrer",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "linkId",
						"short": "The link identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "totalClicks",
						"short": "Total number of clicks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uniqueClicks",
						"short": "Number of unique visitors",
						"type": "`$INTEGER`",
					},
				},
				"name": "link_stat",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "link_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/links/{linkId}/stats",
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
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"id",
										"start_date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
