module.exports = {
	toggleState: function (btn, alreadyToggled) {

		const ariaLabel = btn.getAttribute('aria-label');
		const alternateAriaLabel = btn.getAttribute('data-alternate-label');

		if (ariaLabel) {
			btn.setAttribute('aria-label', alternateAriaLabel);
			btn.setAttribute('title', alternateAriaLabel);
			btn.setAttribute('data-alternate-label', ariaLabel);
		}
		const text = btn.textContent || btn.innerText;

		if (text) {
			const alternateText = btn.getAttribute('data-alternate-text') || alternateAriaLabel;
			btn.textContent = alternateText;
			btn.setAttribute('data-alternate-text', text);
		}

		const isPressed = btn.getAttribute('aria-pressed') === 'true';

		if (!alreadyToggled) {
			btn.setAttribute('aria-pressed', !isPressed);
		}

		btn.dispatchEvent(new CustomEvent('nButtons.stateChange', {
			detail: {
				state: isPressed
			},
			bubbles: true
		}));

		return btn;
	}
};
