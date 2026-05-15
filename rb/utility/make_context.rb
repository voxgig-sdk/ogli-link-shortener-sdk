# OgliLinkShortener SDK utility: make_context
require_relative '../core/context'
module OgliLinkShortenerUtilities
  MakeContext = ->(ctxmap, basectx) {
    OgliLinkShortenerContext.new(ctxmap, basectx)
  }
end
