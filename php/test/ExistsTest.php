<?php
declare(strict_types=1);

// OgliLinkShortener SDK exists test

require_once __DIR__ . '/../oglilinkshortener_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OgliLinkShortenerSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
