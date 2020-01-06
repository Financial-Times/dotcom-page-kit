// This file only configures Enzyme.
// To use Enzyme in your tests you must:
// - Configure a JSDOM environment with @jest-env
// - For Enzyme specific matchers and assertions @import the jest-enzyme package.
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
