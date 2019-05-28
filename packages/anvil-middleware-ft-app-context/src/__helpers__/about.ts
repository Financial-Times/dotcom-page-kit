import { getAboutDocPath } from '../helpers'

export function mockAboutDoc({ workingDir = '/foo/bar', version = '123' } = {}) {
  const aboutDoc = { appVersion: version }
  const aboutDocPath = getAboutDocPath({ workingDir })
  jest.doMock(aboutDocPath, () => aboutDoc, { virtual: true })
  return { workingDir, aboutDoc, aboutDocPath }
}
