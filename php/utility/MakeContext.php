<?php
declare(strict_types=1);

// OgliLinkShortener SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OgliLinkShortenerMakeContext
{
    public static function call(array $ctxmap, ?OgliLinkShortenerContext $basectx): OgliLinkShortenerContext
    {
        return new OgliLinkShortenerContext($ctxmap, $basectx);
    }
}
