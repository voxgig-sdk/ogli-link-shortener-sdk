# OgliLinkShortener SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OgliLinkShortenerFeatures
  def self.make_feature(name)
    case name
    when "base"
      OgliLinkShortenerBaseFeature.new
    when "ratelimit"
      OgliLinkShortenerRatelimitFeature.new
    when "retry"
      OgliLinkShortenerRetryFeature.new
    when "test"
      OgliLinkShortenerTestFeature.new
    when "timeout"
      OgliLinkShortenerTimeoutFeature.new
    else
      OgliLinkShortenerBaseFeature.new
    end
  end
end
