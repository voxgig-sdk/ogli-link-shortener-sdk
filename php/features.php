<?php
declare(strict_types=1);

// OgliLinkShortener SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OgliLinkShortenerFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OgliLinkShortenerBaseFeature();
            case "test":
                return new OgliLinkShortenerTestFeature();
            default:
                return new OgliLinkShortenerBaseFeature();
        }
    }
}
