# OgliLinkShortener SDK

Create and manage short links with customisable Open Graph meta tags for richer social previews

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Ogli Link Shortener

Ogli Link Shortener is a small URL-shortening API hosted at [app.ogli.sh](https://app.ogli.sh/api). Its distinguishing feature is letting you attach custom Open Graph (OG) meta tags to each short link, so the preview card rendered by social networks and messaging apps can be tailored independently of the destination page.

The service exposes two resource groupings:

- `link` — create, retrieve, update and delete short links, including their OG title, description and image fields used for social previews.
- `link_stat` — read click counts and related usage statistics for an existing short link.

Note: third-party monitoring (see the [freepublicapis.com listing](https://freepublicapis.com/ogli-link-shortener)) has recently reported the public endpoint as intermittently unavailable, so treat uptime and response shapes as best-effort and verify against the live server before relying on the API.

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

## 30-second quickstart

### TypeScript

```ts
import { OgliLinkShortenerSDK } from 'ogli-link-shortener'

const client = new OgliLinkShortenerSDK({})

// List all links
const links = await client.Link().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **Link** | A shortened URL resource that bundles the destination, the short slug and customisable Open Graph metadata (title, description, image) used for social-media link previews. | `/links` |
| **LinkStat** | Usage statistics for a given short link, such as click counts and related access metrics. | `/links/{linkId}/stats` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from oglilinkshortener_sdk import OgliLinkShortenerSDK

client = OgliLinkShortenerSDK({})

# List all links
links, err = client.Link(None).list(None, None)

# Load a specific link
link, err = client.Link(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'oglilinkshortener_sdk.php';

$client = new OgliLinkShortenerSDK([]);

// List all links
[$links, $err] = $client->Link(null)->list(null, null);

// Load a specific link
[$link, $err] = $client->Link(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ogli-link-shortener-sdk/go"

client := sdk.NewOgliLinkShortenerSDK(map[string]any{})

// List all links
links, err := client.Link(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "OgliLinkShortener_sdk"

client = OgliLinkShortenerSDK.new({})

# List all links
links, err = client.Link(nil).list(nil, nil)

# Load a specific link
link, err = client.Link(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("ogli-link-shortener_sdk")

local client = sdk.new({})

-- List all links
local links, err = client:Link(nil):list(nil, nil)

-- Load a specific link
local link, err = client:Link(nil):load(
  { id = "example_id" }, nil
)
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
client = OgliLinkShortenerSDK.test(None, None)
result, err = client.Link(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OgliLinkShortenerSDK::test(null, null);
[$result, $err] = $client->Link(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Link(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OgliLinkShortenerSDK.test(nil, nil)
result, err = client.Link(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Link(nil):load(
  { id = "test01" }, nil
)
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

## Using the Ogli Link Shortener

- Upstream: [https://app.ogli.sh/api](https://app.ogli.sh/api)

---

Generated from the Ogli Link Shortener OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
