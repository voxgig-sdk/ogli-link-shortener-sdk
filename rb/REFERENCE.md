# OgliLinkShortener Ruby SDK Reference

Complete API reference for the OgliLinkShortener Ruby SDK.


## OgliLinkShortenerSDK

### Constructor

```ruby
require_relative 'ogli-link-shortener_sdk'

client = OgliLinkShortenerSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OgliLinkShortenerSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = OgliLinkShortenerSDK.test
```


### Instance Methods

#### `Link(data = nil)`

Create a new `Link` entity instance. Pass `nil` for no initial data.

#### `LinkStat(data = nil)`

Create a new `LinkStat` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## LinkEntity

```ruby
link = client.link
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `click_count` | ``$INTEGER`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `short_url` | ``$STRING`` | No |  |
| `slug` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `click_count` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `image` | - | - | - | - | - |
| `short_url` | - | - | - | - | - |
| `slug` | - | - | - | - | - |
| `title` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |
| `url` | - | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.link.create({
})
```

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.link.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.link.load({ "id" => "link_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.link.remove({ "id" => "link_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.link.update({
  "id" => "link_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LinkEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LinkStatEntity

```ruby
link_stat = client.link_stat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clicks_by_country` | ``$ARRAY`` | No |  |
| `clicks_by_date` | ``$ARRAY`` | No |  |
| `clicks_by_device` | ``$ARRAY`` | No |  |
| `clicks_by_referrer` | ``$ARRAY`` | No |  |
| `link_id` | ``$STRING`` | No |  |
| `total_click` | ``$INTEGER`` | No |  |
| `unique_click` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.link_stat.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LinkStatEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = OgliLinkShortenerSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

