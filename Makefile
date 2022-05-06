BIN := ./node_modules/.bin

# Core...
JEKYLL_ENV = 'development'
ifeq ('${BUILDKITE_BRANCH}','master')
JEKYLL_ENV := 'production'
endif

ifeq ('${BUILDKITE_BRANCH}','staging')
JEKYLL_ENV := 'staging'
endif

# Laura's convenience command because Reasons
docs: dev

.PHONY: dev
dev: node_modules vendor/bundle
	@$(BIN)/concurrently --raw --kill-others -n webpack,jekyll \
		"$(BIN)/webpack --mode=development --watch" \
		"bundle exec jekyll clean && bundle exec jekyll serve --force_polling --trace --incremental -H 0.0.0.0 -V"

.PHONY: intialize-work-dir
intialize-work-dir:
	@mkdir -p _site
	@chmod -R 777 _site/
	@mkdir vendor
	@chmod -R 777 vendor/
	@bundle install --path=vendor

.PHONY: build
build: node_modules vendor/bundle
	@$(BIN)/concurrently --raw --kill-others -n webpack,jekyll \
		"$(BIN)/webpack --mode=development --watch" \
		"bundle exec jekyll clean && bundle exec jekyll build -V"

# .PHONY: build
# build: node_modules vendor/bundle
# 	@echo "Jekyll env: ${JEKYLL_ENV}"
# 	@chown -R jekyll /workdir
# 	@chmod -R 777 /workdir
# 	@echo "env: ${JEKYLL_ENV}"
# 	@$(BIN)/webpack --mode=production
# 	@JEKYLL_ENV=${JEKYLL_ENV} bundle exec jekyll build --trace
# 	@if [ '${BUILDKITE_BRANCH}' == 'staging' ]; then echo "updating sitemap.xml..." && sed -i -r 's/segment.com/segment.build/g' ./_site/sitemap.xml; fi;

.PHONY: upload-docs
upload-docs:
	@scripts/upload-docs

.PHONY: package
package: build
	@docker build . -t segment-docs:latest

.PHONY: serve
serve: package
	@docker run -p 4000:80 segment-docs:latest

# gives us user-transparent way to swap between two different systems
.PHONY: catalog
catalog: catalog-papi

# uses the old configapi
.PHONY: capi
capi: vendor/bundle
	@node scripts/catalog_capi.js

# shorter alias
.PHONY: catalog-capi
catalog-capi: vendor/bundle
	@node scripts/catalog_capi.js

# uses the new public api
.PHONY: catalog-papi
catalog-papi: vendor/bundle
	@node scripts/catalog_papi.js

# shorter alias
.PHONY: papi
papi: vendor/bundle
	@node scripts/catalog_papi.js

# make the list of beta connections
.PHONY: beta
beta:
	@node scripts/beta.js

.PHONY: changelog
changelog: vendor/bundle
	@node scripts/changelog.js

.PHONY: sidenav
sidenav: vendor/bundle
	@node scripts/nav.js

# check internal links
.PHONY: linkcheck-internal
linkcheck-internal:
	@node scripts/checklinks-internal.js

# check external links
.PHONY: linkcheck-external
linkcheck-external:
	@node scripts/checklinks-external.js

.PHONY: zip-artifacts
zip-artifacts:
	@tar czf build_package.tar.gz _site

.PHONY: unzip-artifacts
unzip-artifacts:
	@tar -xzf build_package.tar.gz _site

.PHONY: typewriter
typewriter: npx typewriter

.PHONY: deps
deps: node_modules vendor/bundle

.PHONY: env
env:
	@sh scripts/env.sh

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
vendor/bundle:
	@export BUNDLE_PATH="vendor/bundle"
	@mkdir -p vendor && mkdir -p vendor/bundle
	@chmod -R 777 vendor/ Gemfile.lock
	@bundle config set --local path 'vendor/bundle'
	@bundle install

.PHONY: update
update: 
	@node scripts/update.js

.PHONY: add-id
add-id:
	@node scripts/add_id.js
	
.PHONY: lint
lint: node_modules
	@echo "Checking yml files..."
	@npx yamllint src/_data/**/*.yml
	# @echo "Checking markdown files..."
	# @npx remark ./src --use preset-lint-markdown-style-guide

.PHONY: test
test: lint

.PHONY: check-spelling
check-spelling:
	@echo 'Check spelling in markdown files..."
	@npx mdspell 'src/**/*.md' -r --en-us -h

.PHONY: docker-dev
docker-dev:
	$(DOCKER_TTY) make dev

.PHONY: docker-build
docker-build:
	@$(DOCKER_TTY) make build
	bundle install --path=vevendor

#.PHONY: docs
#docs: node_modules
#	$(BIN)/webpack --mode=production
#	make seed && \
#	make build && \
#	docker build . -t segment-docs:latest && \
#	echo "Running segment docs at http://localhost:4000/docs/" && \
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
# old env command
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
