<?php
declare(strict_types=1);

// OgliLinkShortener SDK base feature

class OgliLinkShortenerBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OgliLinkShortenerContext $ctx, array $options): void {}
    public function PostConstruct(OgliLinkShortenerContext $ctx): void {}
    public function PostConstructEntity(OgliLinkShortenerContext $ctx): void {}
    public function SetData(OgliLinkShortenerContext $ctx): void {}
    public function GetData(OgliLinkShortenerContext $ctx): void {}
    public function GetMatch(OgliLinkShortenerContext $ctx): void {}
    public function SetMatch(OgliLinkShortenerContext $ctx): void {}
    public function PrePoint(OgliLinkShortenerContext $ctx): void {}
    public function PreSpec(OgliLinkShortenerContext $ctx): void {}
    public function PreRequest(OgliLinkShortenerContext $ctx): void {}
    public function PreResponse(OgliLinkShortenerContext $ctx): void {}
    public function PreResult(OgliLinkShortenerContext $ctx): void {}
    public function PreDone(OgliLinkShortenerContext $ctx): void {}
    public function PreUnexpected(OgliLinkShortenerContext $ctx): void {}
}
