module.exports = {
	$ (sel, ctx) {
		console.error(`n-ui-foundations $ is deprecated. please use ${ctx ? 'el' : 'document'}.querySelector('${sel}') directly`);
		return (ctx || document).querySelector(sel);
	},
	$$ (sel, ctx) {
		console.error(`n-ui-foundations $$ is deprecated. please use ${ctx ? 'el' : 'document'}.querySelectorAll('${sel}') directly`);
		return [].slice.call((ctx || document).querySelectorAll(sel));
	},
	broadcast (name, data, bubbles = true) {
		const isElement = Element.prototype.isPrototypeOf(this);
		const rootEl = isElement ? this : document.body;

		console.error(`n-ui-foundations broadcast is deprecated. please use ${isElement ? 'el' : 'document.body'}.dispatchEvent(new CustomEvent('${name}', { bubbles: true, cancelable: true, detail: EVENT_DATA })) directly`);
		let event;

		try {
			event = new CustomEvent(name, {bubbles: bubbles, cancelable: true, detail: data});
		} catch (e) {
			event = CustomEvent.initCustomEvent(name, true, true, data);
		}
		rootEl.dispatchEvent(event);
	},
};
