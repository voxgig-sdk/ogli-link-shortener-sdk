# OgliLinkShortener SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OgliLinkShortenerFeatures
  def self.make_feature(name)
    case name
    when "base"
      OgliLinkShortenerBaseFeature.new
    when "test"
      OgliLinkShortenerTestFeature.new
    else
      OgliLinkShortenerBaseFeature.new
    end
  end
end
