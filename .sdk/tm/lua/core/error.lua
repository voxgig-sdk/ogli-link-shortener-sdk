-- OgliLinkShortener SDK error

local OgliLinkShortenerError = {}
OgliLinkShortenerError.__index = OgliLinkShortenerError


function OgliLinkShortenerError.new(code, msg, ctx)
  local self = setmetatable({}, OgliLinkShortenerError)
  self.is_sdk_error = true
  self.sdk = "OgliLinkShortener"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OgliLinkShortenerError:error()
  return self.msg
end


function OgliLinkShortenerError:__tostring()
  return self.msg
end


return OgliLinkShortenerError
