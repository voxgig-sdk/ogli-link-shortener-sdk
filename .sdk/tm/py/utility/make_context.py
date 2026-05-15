# OgliLinkShortener SDK utility: make_context

from core.context import OgliLinkShortenerContext


def make_context_util(ctxmap, basectx):
    return OgliLinkShortenerContext(ctxmap, basectx)
