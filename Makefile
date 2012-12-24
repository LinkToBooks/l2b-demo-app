all: node-modules css

node-modules:
	npm install
	npm prune

jshint:
	node_modules/.bin/jshint --config config/jshint-node.json    *.js
	node_modules/.bin/jshint --config config/jshint-browser.json public/js

css:
	compass compile public

test: jshint

PHONY: node-modules test jshint css
