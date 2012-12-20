
all: node-modules

node-modules:
	npm install
	npm prune

jshint:
	jshint --config config/jshint-node.json *.js

test: jshint

PHONY: node-modules test jshint
