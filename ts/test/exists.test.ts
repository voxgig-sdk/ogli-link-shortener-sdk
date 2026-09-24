
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OgliLinkShortenerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OgliLinkShortenerSDK.test()
    equal(testsdk instanceof OgliLinkShortenerSDK, true,
      'OgliLinkShortenerSDK.test() must return a client synchronously')
  })

})
