/* global sinon, expect*/
const util = require('../main');
const cookieStore = require('../js/cookies');
const starterHexString = '1234567890-abcdef';

describe('Sample users', () => {
	beforeEach(() => {
		let hexString = starterHexString;
		const getSpoorId = () => {
			hexString = hexString.slice(1) + hexString.charAt(0);
			return hexString;
		};
		sinon.stub(cookieStore, 'get').callsFake(() => getSpoorId());
	});
	afterEach(() => cookieStore.get.restore());

	it('should allocate 50% of users', () => {
		const allocations = starterHexString.split('')
			.map(() => util.sampleUsers(50, 'seed1'));
		// no, this array isn't split 50/50, but the important thing
		// is it should differ from the results of the other tests
		expect(allocations).to.eql([false, false, true, true, false, false, false, true, false, false, false, false, false, true, false, true, true]);
	});

	it('should allocate 10% of users', () => {
		const allocations = starterHexString.split('')
			.map(() => util.sampleUsers(10, 'seed1'));
		expect(allocations).to.eql([false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false]);
	});
	it('should allocate differently if different seed', () => {
		const allocations = starterHexString.split('')
			.map(() => util.sampleUsers(50, 'seed2'));
		expect(allocations).to.eql([true, false, true, true, false, false, true, true, false, true, true, false, true, true, true, false, false]);
	});

});
