# DO NOT ADD TASKS TO THIS MAKEFILE
# these tasks exist for principle-of-least-surprise purposes for people coming
# here from next-land. this makefile should not be used for anything else.
# instead, use per-package npm scripts

check_engine:
	npx check-engine

clean: check_engine
	npm run clean

install: check_engine
	npm install

build: check_engine
	npm run build

test: check_engine
	npm run test

storybook: check_engine
	npm run storybook
