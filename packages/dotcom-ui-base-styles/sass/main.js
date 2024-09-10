module.exports = {
	$: function (sel, ctx) { return (ctx || document).querySelector(sel); },
	$$: function (sel, ctx) { return [].slice.call((ctx || document).querySelectorAll(sel));},
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
};
