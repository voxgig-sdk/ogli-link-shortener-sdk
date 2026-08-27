<?php
declare(strict_types=1);

// Typed models for the OgliLinkShortener SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Link entity data model. */
class Link
{
    public ?int $clickCount = null;
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $shortUrl = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updatedAt = null;
    public ?string $url = null;
}

/** Request payload for Link#load. */
class LinkLoadMatch
{
    public string $id;
}

/** Request payload for Link#list. */
class LinkListMatch
{
    public ?int $clickCount = null;
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $shortUrl = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updatedAt = null;
    public ?string $url = null;
}

/** Request payload for Link#create. */
class LinkCreateData
{
    public ?int $clickCount = null;
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $shortUrl = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updatedAt = null;
    public ?string $url = null;
}

/** Request payload for Link#update. */
class LinkUpdateData
{
    public string $id;
    public ?int $clickCount = null;
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $image = null;
    public ?string $shortUrl = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updatedAt = null;
    public ?string $url = null;
}

/** Request payload for Link#remove. */
class LinkRemoveMatch
{
    public string $id;
}

/** LinkStat entity data model. */
class LinkStat
{
    public ?array $clicksByCountry = null;
    public ?array $clicksByDate = null;
    public ?array $clicksByDevice = null;
    public ?array $clicksByReferrer = null;
    public ?string $id = null;
    public ?string $linkId = null;
    public ?int $totalClicks = null;
    public ?int $uniqueClicks = null;
}

/** Request payload for LinkStat#list. */
class LinkStatListMatch
{
    public string $id;
}

