-- OgliLinkShortener SDK exists test

local sdk = require("ogli-link-shortener_sdk")

describe("OgliLinkShortenerSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
