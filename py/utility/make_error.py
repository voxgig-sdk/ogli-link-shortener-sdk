# OgliLinkShortener SDK utility: make_error

from __future__ import annotations
from core.operation import OgliLinkShortenerOperation
from core.result import OgliLinkShortenerResult
from core.control import OgliLinkShortenerControl
from core.error import OgliLinkShortenerError


def make_error_util(ctx, err):
    if ctx is None:
        from core.context import OgliLinkShortenerContext
        ctx = OgliLinkShortenerContext({}, None)

    op = ctx.op
    if op is None:
        op = OgliLinkShortenerOperation({})
    opname = op.name
    if opname == "" or opname == "_":
        opname = "unknown operation"

    result = ctx.result
    if result is None:
        result = OgliLinkShortenerResult({})
    result.ok = False

    if err is None:
        err = result.err
    if err is None:
        err = ctx.make_error("unknown", "unknown error")

    errmsg = ""
    if isinstance(err, OgliLinkShortenerError):
        errmsg = err.msg
    elif hasattr(err, "msg") and err.msg is not None:
        errmsg = err.msg
    elif isinstance(err, str):
        errmsg = err
    else:
        errmsg = str(err)

    msg = "OgliLinkShortenerSDK: " + opname + ": " + errmsg
    msg = ctx.utility.clean(ctx, msg)

    result.err = None

    spec = ctx.spec

    if ctx.ctrl.explain is not None:
        ctx.ctrl.explain["err"] = {"message": msg}

    sdk_err = OgliLinkShortenerError("", msg, ctx)
    sdk_err.result = ctx.utility.clean(ctx, result)
    sdk_err.spec = ctx.utility.clean(ctx, spec)

    if isinstance(err, OgliLinkShortenerError):
        sdk_err.code = err.code

    ctx.ctrl.err = sdk_err

    if ctx.ctrl.throw_err is False:
        return result.resdata

    raise sdk_err
