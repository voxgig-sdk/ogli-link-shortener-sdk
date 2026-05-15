<?php
declare(strict_types=1);

// OgliLinkShortener SDK utility: feature_hook

class OgliLinkShortenerFeatureHook
{
    public static function call(OgliLinkShortenerContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
