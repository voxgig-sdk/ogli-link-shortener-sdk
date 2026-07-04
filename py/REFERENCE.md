# OgliLinkShortener Python SDK Reference

Complete API reference for the OgliLinkShortener Python SDK.


## OgliLinkShortenerSDK

### Constructor

```python
from ogli-link-shortener_sdk import OgliLinkShortenerSDK

client = OgliLinkShortenerSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OgliLinkShortenerSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OgliLinkShortenerSDK.test()
```


### Instance Methods

#### `Link(data=None)`

Create a new `LinkEntity` instance. Pass `None` for no initial data.

#### `LinkStat(data=None)`

Create a new `LinkStatEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## LinkEntity

```python
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.link.create({
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.link.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.link.load({"id": "link_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.link.remove({"id": "link_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.link.update({
    "id": "link_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LinkStatEntity

```python
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.link_stat.list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkStatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = OgliLinkShortenerSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

