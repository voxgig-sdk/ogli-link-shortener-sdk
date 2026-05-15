<?php
declare(strict_types=1);

// OgliLinkShortener SDK utility: result_body

class OgliLinkShortenerResultBody
{
    public static function call(OgliLinkShortenerContext $ctx): ?OgliLinkShortenerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
