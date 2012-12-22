all: node-modules css

node-modules:
	npm install
	npm prune

jshint:
	node_modules/.bin/jshint --config config/jshint-node.json *.js

css:
	compass compile public

test: jshint

PHONY: node-modules test jshint css
