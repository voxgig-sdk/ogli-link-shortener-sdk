
import { Context } from './Context'


class OgliLinkShortenerError extends Error {

  isOgliLinkShortenerError = true

  sdk = 'OgliLinkShortener'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OgliLinkShortenerError
}

