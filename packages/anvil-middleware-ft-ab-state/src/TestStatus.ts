import parseTestValue from './parseTestValue'
import parseTestList from './parseTestList'

interface TestStatusOptions {
  /**
   * A string of A/B tests in the format "key:value,key:value"
   */
  testList: string
}

export default class TestStatus {
  private testList: string
  private status: Map<string, string>

  constructor(userOptions: TestStatusOptions) {
    this.testList = userOptions.testList
    this.status = parseTestList(userOptions.testList)
  }

  get(testName: string): string | boolean | number | null {
    if (this.status.has(testName)) {
      return parseTestValue(this.status.get(testName))
    }

    return null
  }

  toString() {
    return this.testList
  }
}
