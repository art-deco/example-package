import { equal } from '@zoroaster/assert'
import Context from '../context'
import examplePackage from '../../src'

/** @type {TestSuite} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof examplePackage, 'function')
  },
  async 'calls package without error'() {
    await examplePackage()
  },
  async 'gets a link to the fixture'({ fixture, readFile }) {
    const path = fixture`test.txt`
    const text = readFile(path)
    const res = await examplePackage({
      text,
    })
    equal(res, text)
  },
}

/**
 * @typedef {import('../context').TestSuite} TestSuite
 */

export default T