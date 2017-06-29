node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

export IGNORE_A11Y = true;

test-unit:
	@karma start karma.conf.js
	@$(DONE)

test-unit-dev:
	@karma start karma.conf.js --single-run false --auto-watch true

test: verify test-unit

test-dev: verify test-unit-dev
