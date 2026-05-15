# OgliLinkShortener SDK exists test

require "minitest/autorun"
require_relative "../OgliLinkShortener_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OgliLinkShortenerSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
