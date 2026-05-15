
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OgliLinkShortenerSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OgliLinkShortenerSDK.test()
    equal(null !== testsdk, true)
  })

})
