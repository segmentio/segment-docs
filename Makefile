BIN := ./node_modules/.bin

# Core...
JEKYLL_ENV ?= development

.PHONY: dev
dev: node_modules vendor/bundle
	@$(BIN)/concurrently --raw --kill-others -n webpack,jekyll \
		"$(BIN)/webpack --mode=development --watch" \
		"bundle exec jekyll serve --trace --incremental -H 0.0.0.0 -V"

.PHONY: build
build: node_modules vendor/bundle
#	@bundle exec rake catalog:update
	@$(BIN)/webpack --mode=production
	@JEKYLL_ENV=${JEKYLL_ENV} bundle exec jekyll build

.PHONY: package
package: build
	@docker build . -t segment-docs:latest

.PHONY: serve
serve: package
	@docker run -p 4000:80 segment-docs:latest

.PHONY: catalog
catalog: vendor/bundle
	@bundle exec rake catalog:update

.PHONY: deps
deps: node_modules vendor/bundle

.PHONY: clean
clean:
	@rm -Rf _site
	@rm -Rf .sass-cache
	@rm -Rf .jekyll-cache
	@rm -Rf src/.jekyll-metadata
	@rm -f assets/docs.bundle.js

.PHONY: clean-deps
clean-deps:
	@rm -Rf vendor
	@rm -Rf node_modules

.PHONY: seed
seed:
	@cp templates/destinations.example.yml src/_data/catalog/destinations.yml
	@cp templates/sources.example.yml src/_data/catalog/sources.yml

.PHONY: node_modules
node_modules: package.json yarn.lock
	yarn --frozen-lockfile

.PHONY: vendor/bundle
vendor/bundle: Gemfile Gemfile.lock
	bundle install

#.PHONY: docs
#docs: node_modules
#	$(BIN)/webpack --mode=production
#	make seed && \
#	make build && \
#	docker build . -t segment-docs:latest && \
#	echo "Running segment docs at http://localhost:4000/docsv2/" && \
#	docker run -p 4000:80 segment-docs:latest
#
#.PHONY: build
#build: node_modules
#	echo "Building site for ${JEKYLL_ENV}"
#	docker run -it \
#	  --volume="$(PWD):/srv/jekyll" \
#	  jekyll/jekyll \
#		bundle package && \
#		make deps && \
#		make catalog && \
#	  JEKYLL_ENV=${JEKYLL_ENV} bundle exec jekyll build
#
## Helper commands...
#
#.PHONY: nav
#nav:
#	bundle exec rake nav:update
#
#.PHONY: catalog
#catalog:
#	bundle exec rake catalog:update
#
#.PHONY: env
#env:
#	gem install bundler
#	cp -i .env.example .env | true
#	echo "Environment configured"
#
#.PHONY: clean
#clean:
#	bundle exec jekyll clean
#
#.PHONY: deps
#deps:
#	bundle install
#
#.PHONY: dev
#dev: node_modules
#	make clean && \
#	$(BIN)/concurrently --raw --kill-others -n webpack,jekyll \
#	  "$(BIN)/webpack --mode=development --watch" \
#	  "bundle exec jekyll serve --trace --incremental -H 0.0.0.0 -V"
#
#
#.PHONE: trace
#trace:
#	bundle exec jekyll build --trace
#
## Docker-based commands...
#
#.PHONY: docker-serve
#docker-serve: node_modules
#	$(BIN)/webpack --mode=development
#	docker run --rm \
#	  -e "JEKYLL_ENV=development" \
#	  -p 127.0.0.1:4000:4000/tcp \
#	  --volume="$(PWD):/srv/jekyll" \
#	  -it jekyll/jekyll \
#	  jekyll serve --trace --incremental -H 0.0.0.0 -V
#
#.PHONY: docker-clean
#docker-clean:
#	docker run -it \
#	  --volume="$(PWD):/srv/jekyll" \
#	  jekyll/jekyll \
#	  jekyll clean
#
#.PHONY: docker-deps
#docker-deps:
#	docker run -it \
#	  --volume="$(PWD):/srv/jekyll" \
#	  jekyll/jekyll \
#		bundle install
#
#.PHONY: docker-dev
#docker-dev: node_modules
#	docker run -it \
#	  -p 4000:4000 \
#	  --volume="$(PWD):/srv/jekyll" \
#	  jekyll/jekyll \
#	  $(BIN)/concurrently --raw --kill-others -n webpack,jekyll \
#	  "$(BIN)/webpack --mode=development --watch" \
#	  "jekyll serve --incremental -H 0.0.0.0"
#
#.PHONY: docker-nav
#docker-nav:
#	docker run -it \
#	  --volume="$(PWD):/srv/jekyll" \
#	  jekyll/jekyll \
#		bundle exec rake nav:update
#
#.PHONY: docker-catalog
#docker-catalog:
#	docker run -it \
#	  --volume="$(PWD):/srv/jekyll" \
#	  jekyll/jekyll \
#		bundle install && \
#		bundle exec rake catalog:update
