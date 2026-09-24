<?php
declare(strict_types=1);

// OgliLinkShortener SDK configuration

class OgliLinkShortenerConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "OgliLinkShortener",
                "slug" => "ogli-link-shortener",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://app.ogli.sh/api",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "link" => [],
                    "link_stat" => [],
                ],
            ],
            "entity" => [
        'link' => [
          'fields' => [
            [
              'name' => 'clickCount',
              'title' => 'Click Count',
              'type' => '`$INTEGER`',
              'short' => 'Total number of clicks on the link',
            ],
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the link was created',
              'format' => 'date-time',
            ],
            [
              'name' => 'description',
              'title' => 'Description',
              'type' => '`$STRING`',
              'short' => 'Open Graph description',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the link',
            ],
            [
              'name' => 'image',
              'title' => 'Image',
              'type' => '`$STRING`',
              'short' => 'Open Graph image URL',
              'format' => 'uri',
            ],
            [
              'name' => 'shortUrl',
              'title' => 'Short Url',
              'type' => '`$STRING`',
              'short' => 'The shortened URL',
              'format' => 'uri',
            ],
            [
              'name' => 'slug',
              'title' => 'Slug',
              'type' => '`$STRING`',
              'short' => 'The short code used in the URL',
            ],
            [
              'name' => 'title',
              'title' => 'Title',
              'type' => '`$STRING`',
              'short' => 'Open Graph title',
            ],
            [
              'name' => 'updatedAt',
              'title' => 'Updated At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the link was last updated',
              'format' => 'date-time',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The destination URL',
              'format' => 'uri',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'link',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/links',
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                  ],
                  'parts' => [
                    'links',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/links',
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                  ],
                  'parts' => [
                    'links',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.links`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/links/{linkId}',
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'links',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'linkId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'link_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/links/{linkId}',
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'links',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'linkId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'link_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/links/{linkId}',
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'links',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'linkId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'link_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'link_stat' => [
          'fields' => [
            [
              'name' => 'clicksByCountry',
              'title' => 'Clicks By Country',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'clicksByDate',
              'title' => 'Clicks By Date',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'clicksByDevice',
              'title' => 'Clicks By Device',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'clicksByReferrer',
              'title' => 'Clicks By Referrer',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'linkId',
              'title' => 'Link Id',
              'type' => '`$STRING`',
              'short' => 'The link identifier',
            ],
            [
              'name' => 'totalClicks',
              'title' => 'Total Clicks',
              'type' => '`$INTEGER`',
              'short' => 'Total number of clicks',
            ],
            [
              'name' => 'uniqueClicks',
              'title' => 'Unique Clicks',
              'type' => '`$INTEGER`',
              'short' => 'Number of unique visitors',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'link_stat',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/links/{linkId}/stats',
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'stats',
                    ],
                  ],
                  'parts' => [
                    'links',
                    '{id}',
                    'stats',
                  ],
                  'rename' => [
                    'param' => [
                      'linkId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'link_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'end_date',
                      'id',
                      'start_date',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return OgliLinkShortenerFeatures::make_feature($name);
    }
}
