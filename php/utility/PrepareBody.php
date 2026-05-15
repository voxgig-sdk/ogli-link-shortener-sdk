<?php
declare(strict_types=1);

// OgliLinkShortener SDK utility: prepare_body

class OgliLinkShortenerPrepareBody
{
    public static function call(OgliLinkShortenerContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
