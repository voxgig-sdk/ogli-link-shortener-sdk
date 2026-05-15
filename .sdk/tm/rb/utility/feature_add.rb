# OgliLinkShortener SDK utility: feature_add
module OgliLinkShortenerUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
