# Typed models for the OgliLinkShortener SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Link:
    click_count: Optional[int] = None
    created_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    short_url: Optional[str] = None
    slug: Optional[str] = None
    title: Optional[str] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class LinkLoadMatch:
    id: str


@dataclass
class LinkListMatch:
    click_count: Optional[int] = None
    created_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    short_url: Optional[str] = None
    slug: Optional[str] = None
    title: Optional[str] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class LinkCreateData:
    click_count: Optional[int] = None
    created_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    short_url: Optional[str] = None
    slug: Optional[str] = None
    title: Optional[str] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class LinkUpdateData:
    id: str


@dataclass
class LinkRemoveMatch:
    id: str


@dataclass
class LinkStat:
    clicks_by_country: Optional[list] = None
    clicks_by_date: Optional[list] = None
    clicks_by_device: Optional[list] = None
    clicks_by_referrer: Optional[list] = None
    link_id: Optional[str] = None
    total_click: Optional[int] = None
    unique_click: Optional[int] = None


@dataclass
class LinkStatListMatch:
    id: str

