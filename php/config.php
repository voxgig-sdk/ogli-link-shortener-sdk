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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'short' => 'Total number of clicks on the link',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'date-time',
              'name' => 'createdAt',
              'short' => 'Timestamp when the link was created',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Open Graph description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the link',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'image',
              'short' => 'Open Graph image URL',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'shortUrl',
              'short' => 'The shortened URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'slug',
              'short' => 'The short code used in the URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'Open Graph title',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'updatedAt',
              'short' => 'Timestamp when the link was last updated',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The destination URL',
              'type' => '`$STRING`',
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/links',
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'links',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/links',
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.links`',
                  ],
                  'parts' => [
                    'links',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'link_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/links/{linkId}',
                  'rename' => [
                    'param' => [
                      'linkId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'links',
                    '{id}',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'link_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/links/{linkId}',
                  'rename' => [
                    'param' => [
                      'linkId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'links',
                    '{id}',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'link_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/links/{linkId}',
                  'rename' => [
                    'param' => [
                      'linkId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'links',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'links',
                    '{id}',
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
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'clicksByDate',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'clicksByDevice',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'clicksByReferrer',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'linkId',
              'short' => 'The link identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'totalClicks',
              'short' => 'Total number of clicks',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'uniqueClicks',
              'short' => 'Number of unique visitors',
              'type' => '`$INTEGER`',
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
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'link_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/links/{linkId}/stats',
                  'rename' => [
                    'param' => [
                      'linkId' => 'id',
                    ],
                  ],
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
                  'select' => [
                    'exist' => [
                      'end_date',
                      'id',
                      'start_date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'links',
                    '{id}',
                    'stats',
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
