const cookieStore = require('./js/cookies');

const getSpoorNumber = () => {
	let spoorId = cookieStore.get('spoor-id').replace(/-/g, '');
	spoorId = spoorId.substring(spoorId.length - 12, spoorId.length); // Don't overflow the int
	return parseInt(spoorId, 16);
};

module.exports = {
	$: function (sel, ctx) { return (ctx || document).querySelector(sel); },
	$$: function (sel, ctx) { return [].slice.call((ctx || document).querySelectorAll(sel));},
	debounce: function (func, wait) {
		let timeout;
		return function () {
			const args = arguments;
			const later = () => {
				timeout = null;
				func.apply(this, args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	},

	throttle: function (func, wait) {
		let timeout;
		return function () {
			if (timeout) {
				return;
			}
			const args = arguments;
			const later = () => {
				timeout = null;
				func.apply(this, args);
			};

			timeout = setTimeout(later, wait);
		};
	},
	uuid: function uuid (a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid);},
	ascii: require('./js/to-ascii'),
	broadcast: function (name, data, bubbles = true) {
		const rootEl = Element.prototype.isPrototypeOf(this) ? this : document.body;
		let event;

		try {
			event = new CustomEvent(name, {bubbles: bubbles, cancelable: true, detail: data});
		} catch (e) {
			event = CustomEvent.initCustomEvent(name, true, true, data);
		}
		rootEl.dispatchEvent(event);
	},
	perfMark: name => {
		const performance = window.LUX || window.performance || window.msPerformance || window.webkitPerformance || window.mozPerformance;
		if (performance && performance.mark) {
			performance.mark(name);
		}
	},
	sampleUsers: (pct, seed) => {
		if (!seed) {
			throw new Error('sampleUsers needs a seed string to be passed in as the second parameter');
		}
		const seedAsNumber = seed.split('').reduce((num, str, i) => num + Math.pow(2, i) * str.charCodeAt(0), 0);
		return (getSpoorNumber() + seedAsNumber) % 100 < pct;
	},
	cookieStore
};
