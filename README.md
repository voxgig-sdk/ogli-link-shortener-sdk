# OgliLinkShortener SDK

Ogli Link Shortener client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install ogli-link-shortener
```

**Python**
```bash
pip install ogli-link-shortener-sdk
```

**PHP**
```bash
composer require voxgig/ogli-link-shortener-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ogli-link-shortener-sdk/go
```

**Ruby**
```bash
gem install ogli-link-shortener-sdk
```

**Lua**
```bash
luarocks install ogli-link-shortener-sdk
```

## Quickstart

### TypeScript

```ts
import { OgliLinkShortenerSDK } from 'ogli-link-shortener'

const client = new OgliLinkShortenerSDK({
  apikey: process.env.OGLI-LINK-SHORTENER_APIKEY,
})

// List all links
const links = await client.Link().list()
console.log(links.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o ogli-link-shortener-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ogli-link-shortener": {
      "command": "/abs/path/to/ogli-link-shortener-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Link** |  | `/links` |
| **LinkStat** |  | `/links/{linkId}/stats` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from oglilinkshortener_sdk import OgliLinkShortenerSDK

client = OgliLinkShortenerSDK({
    "apikey": os.environ.get("OGLI-LINK-SHORTENER_APIKEY"),
})

# List all links
links, err = client.Link().list()
print(links)

# Load a specific link
link, err = client.Link().load({"id": "example_id"})
print(link)
```

### PHP

```php
<?php
require_once 'oglilinkshortener_sdk.php';

$client = new OgliLinkShortenerSDK([
    "apikey" => getenv("OGLI-LINK-SHORTENER_APIKEY"),
]);

// List all links
[$links, $err] = $client->Link()->list();
print_r($links);

// Load a specific link
[$link, $err] = $client->Link()->load(["id" => "example_id"]);
print_r($link);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ogli-link-shortener-sdk/go"

client := sdk.NewOgliLinkShortenerSDK(map[string]any{
    "apikey": os.Getenv("OGLI-LINK-SHORTENER_APIKEY"),
})

// List all links
links, err := client.Link(nil).List(nil, nil)
fmt.Println(links)
```

### Ruby

```ruby
require_relative "OgliLinkShortener_sdk"

client = OgliLinkShortenerSDK.new({
  "apikey" => ENV["OGLI-LINK-SHORTENER_APIKEY"],
})

# List all links
links, err = client.Link().list
puts links

# Load a specific link
link, err = client.Link().load({ "id" => "example_id" })
puts link
```

### Lua

```lua
local sdk = require("ogli-link-shortener_sdk")

local client = sdk.new({
  apikey = os.getenv("OGLI-LINK-SHORTENER_APIKEY"),
})

-- List all links
local links, err = client:Link():list()
print(links)

-- Load a specific link
local link, err = client:Link():load({ id = "example_id" })
print(link)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OgliLinkShortenerSDK.test()
const result = await client.Link().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OgliLinkShortenerSDK.test()
result, err = client.Link().load({"id": "test01"})
```

### PHP

```php
$client = OgliLinkShortenerSDK::test();
[$result, $err] = $client->Link()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Link(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OgliLinkShortenerSDK.test
result, err = client.Link().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Link():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the Ogli Link Shortener OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
