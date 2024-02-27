install:	install-deps

install-deps:
	npm ci

test:
	npx jest

test-coverage:
	npx jest --coverage

.PHONY: test