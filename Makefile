install:	install-deps

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npx jest

test-coverage:
	npx jest --coverage

.PHONY: test
