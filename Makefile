.PHONY: docs
docs:
	make build && \
	docker build . -t segment-docs:latest && \
	echo "Running segment docs at http://localhost:4000/docsv2/" && \
	docker run -p 4000:80 segment-docs:latest


.PHONY: build
build:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
		bundle package && \
		bundle install && \
	  bundle exec jekyll build

.PHONY: nav
nav:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
		rake nav:update

.PHONY: catalog
catalog:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
		rake catalog:update

.PHONY: docker-clean
docker-clean:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
	  jekyll clean

.PHONY: docker-deps
docker-deps:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
		bundle install

.PHONY: docker-dev
docker-dev:
	docker run -it \
	  -p 4000:4000 \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
	  jekyll serve --incremental -H 0.0.0.0
		.PHONY: docs

.PHONY: env
env:
	gem install bundler && \
	bundle install

.PHONY: clean
clean:
	bundle exec jekyll clean

.PHONY: deps
deps:
	bundle install

.PHONY: dev
dev:
	make clean && \
	bundle exec jekyll serve --incremental -H 0.0.0.0
	  jekyll serve -H 0.0.0.0