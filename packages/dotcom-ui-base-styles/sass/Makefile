include n.Makefile

test-unit:
	karma start karma.conf.js

test-unit-dev:
	karma start karma.conf.js --single-run false --auto-watch true

test: verify test-unit

test-dev: verify test-unit-dev
