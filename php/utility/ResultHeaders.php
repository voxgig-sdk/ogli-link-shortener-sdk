<?php
declare(strict_types=1);

// OgliLinkShortener SDK utility: result_headers

class OgliLinkShortenerResultHeaders
{
    public static function call(OgliLinkShortenerContext $ctx): ?OgliLinkShortenerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
