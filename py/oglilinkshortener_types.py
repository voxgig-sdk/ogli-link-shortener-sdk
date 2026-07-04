# Typed models for the OgliLinkShortener SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Link(TypedDict, total=False):
    click_count: int
    created_at: str
    description: str
    id: str
    image: str
    short_url: str
    slug: str
    title: str
    updated_at: str
    url: str


class LinkLoadMatch(TypedDict):
    id: str


class LinkListMatch(TypedDict, total=False):
    click_count: int
    created_at: str
    description: str
    id: str
    image: str
    short_url: str
    slug: str
    title: str
    updated_at: str
    url: str


class LinkCreateData(TypedDict, total=False):
    click_count: int
    created_at: str
    description: str
    id: str
    image: str
    short_url: str
    slug: str
    title: str
    updated_at: str
    url: str


class LinkUpdateData(TypedDict):
    id: str


class LinkRemoveMatch(TypedDict):
    id: str


class LinkStat(TypedDict, total=False):
    clicks_by_country: list
    clicks_by_date: list
    clicks_by_device: list
    clicks_by_referrer: list
    link_id: str
    total_click: int
    unique_click: int


class LinkStatListMatch(TypedDict):
    id: str
