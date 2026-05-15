# ProjectName SDK exists test

import pytest
from oglilinkshortener_sdk import OgliLinkShortenerSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OgliLinkShortenerSDK.test(None, None)
        assert testsdk is not None
