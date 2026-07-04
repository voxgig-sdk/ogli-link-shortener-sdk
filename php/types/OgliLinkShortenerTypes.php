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
    public ?int $click_count = null;
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $short_url = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Request payload for Link#load. */
class LinkLoadMatch
{
    public string $id;
}

/** Match filter for Link#list (any subset of Link fields). */
class LinkListMatch
{
    public ?int $click_count = null;
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $short_url = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Match filter for Link#create (any subset of Link fields). */
class LinkCreateData
{
    public ?int $click_count = null;
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $short_url = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Request payload for Link#update. */
class LinkUpdateData
{
    public string $id;
}

/** Request payload for Link#remove. */
class LinkRemoveMatch
{
    public string $id;
}

/** LinkStat entity data model. */
class LinkStat
{
    public ?array $clicks_by_country = null;
    public ?array $clicks_by_date = null;
    public ?array $clicks_by_device = null;
    public ?array $clicks_by_referrer = null;
    public ?string $link_id = null;
    public ?int $total_click = null;
    public ?int $unique_click = null;
}

/** Request payload for LinkStat#list. */
class LinkStatListMatch
{
    public string $id;
}

