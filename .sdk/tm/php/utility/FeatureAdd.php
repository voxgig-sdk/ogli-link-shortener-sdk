<?php
declare(strict_types=1);

// OgliLinkShortener SDK utility: feature_add

class OgliLinkShortenerFeatureAdd
{
    public static function call(OgliLinkShortenerContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
