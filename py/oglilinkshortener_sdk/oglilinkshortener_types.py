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
    clickCount: int
    createdAt: str
    description: str
    id: str
    image: str
    shortUrl: str
    slug: str
    title: str
    updatedAt: str
    url: str


class LinkLoadMatch(TypedDict):
    id: str


class LinkListMatch(TypedDict, total=False):
    clickCount: int
    createdAt: str
    description: str
    id: str
    image: str
    shortUrl: str
    slug: str
    title: str
    updatedAt: str
    url: str


class LinkCreateData(TypedDict, total=False):
    clickCount: int
    createdAt: str
    description: str
    id: str
    image: str
    shortUrl: str
    slug: str
    title: str
    updatedAt: str
    url: str


class LinkUpdateDataRequired(TypedDict):
    id: str


class LinkUpdateData(LinkUpdateDataRequired, total=False):
    clickCount: int
    createdAt: str
    description: str
    image: str
    shortUrl: str
    slug: str
    title: str
    updatedAt: str
    url: str


class LinkRemoveMatch(TypedDict):
    id: str


class LinkStat(TypedDict, total=False):
    clicksByCountry: list
    clicksByDate: list
    clicksByDevice: list
    clicksByReferrer: list
    linkId: str
    totalClicks: int
    uniqueClicks: int


class LinkStatListMatch(TypedDict):
    id: str
