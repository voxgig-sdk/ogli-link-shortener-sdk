# OgliLinkShortener SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OgliLinkShortenerUtility.registrar = ->(u) {
  u.clean = OgliLinkShortenerUtilities::Clean
  u.done = OgliLinkShortenerUtilities::Done
  u.make_error = OgliLinkShortenerUtilities::MakeError
  u.feature_add = OgliLinkShortenerUtilities::FeatureAdd
  u.feature_hook = OgliLinkShortenerUtilities::FeatureHook
  u.feature_init = OgliLinkShortenerUtilities::FeatureInit
  u.fetcher = OgliLinkShortenerUtilities::Fetcher
  u.make_fetch_def = OgliLinkShortenerUtilities::MakeFetchDef
  u.make_context = OgliLinkShortenerUtilities::MakeContext
  u.make_options = OgliLinkShortenerUtilities::MakeOptions
  u.make_request = OgliLinkShortenerUtilities::MakeRequest
  u.make_response = OgliLinkShortenerUtilities::MakeResponse
  u.make_result = OgliLinkShortenerUtilities::MakeResult
  u.make_point = OgliLinkShortenerUtilities::MakePoint
  u.make_spec = OgliLinkShortenerUtilities::MakeSpec
  u.make_url = OgliLinkShortenerUtilities::MakeUrl
  u.param = OgliLinkShortenerUtilities::Param
  u.prepare_auth = OgliLinkShortenerUtilities::PrepareAuth
  u.prepare_body = OgliLinkShortenerUtilities::PrepareBody
  u.prepare_headers = OgliLinkShortenerUtilities::PrepareHeaders
  u.prepare_method = OgliLinkShortenerUtilities::PrepareMethod
  u.prepare_params = OgliLinkShortenerUtilities::PrepareParams
  u.prepare_path = OgliLinkShortenerUtilities::PreparePath
  u.prepare_query = OgliLinkShortenerUtilities::PrepareQuery
  u.result_basic = OgliLinkShortenerUtilities::ResultBasic
  u.result_body = OgliLinkShortenerUtilities::ResultBody
  u.result_headers = OgliLinkShortenerUtilities::ResultHeaders
  u.transform_request = OgliLinkShortenerUtilities::TransformRequest
  u.transform_response = OgliLinkShortenerUtilities::TransformResponse
}
