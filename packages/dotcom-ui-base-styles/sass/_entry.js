// for the purposes of exposing in a shared n-ui bundle
// This will mean webpack can find them in this bundle under n-ui/componentName
module.exports = function (withPreact, exclusions) {
	const entry = {
		// n-ui components
		'n-ui': 'window.ftNextUi',
		'n-ui/ads': 'window.ftNextUi._ads',
		'n-ui/tracking': 'window.ftNextUi._tracking',
		'n-ui/header': 'window.ftNextUi._header',
		'n-ui/footer': 'window.ftNextUi._footer',
		'n-ui/cookie-message': 'window.ftNextUi._cookieMessage',
		'n-ui/welcome-message': 'window.ftNextUi._welcomeMessage',
		'n-ui/subscription-offer-prompt': 'window.ftNextUi._subscriptionOfferPrompt',
		'n-ui/notification': 'window.ftNextUi._notification',
		'n-ui/myft': 'window.ftNextUi._myft',
		'n-ui/typeahead': 'window.ftNextUi._typeahead',
		'n-ui/utils': 'window.ftNextUi._utils',
		'n-ui/myft-digest-promo': 'window.ftNextUi._myftDigestPromo',
		'n-ui/myft-hint': 'window.ftNextUi._myftHint',
		// wrapped origami components
		'n-ui/date': 'window.ftNextUi._date',
		'o-date': 'window.ftNextUi._date',
		'n-ui/expander': 'window.ftNextUi._expander',
		'o-expander': 'window.ftNextUi._expander',
		'o-grid': 'window.ftNextUi._grid',
		'n-ui/overlay': 'window.ftNextUi._overlay',
		'o-overlay': 'window.ftNextUi._overlay',
		'n-ui/viewport': 'window.ftNextUi._viewport',
		'o-viewport': 'window.ftNextUi._viewport',
		'o-video': 'window.ftNextUi._video',
		'n-image': 'window.ftNextUi._image',

		// other components
		'ftdomdelegate': 'window.ftNextUi._ftdomdelegate',
		'superstore': 'window.ftNextUi._superstore',
		'superstore-sync': 'window.ftNextUi._superstoreSync',
	}

	if (withPreact) {
		entry.react = 'window.ftNextUi._React';
		entry['react-dom'] = 'window.ftNextUi._ReactDom';
	}

	if (exclusions) {
		exclusions.forEach(exc => delete entry[exc]);
	}

	return entry;
}
