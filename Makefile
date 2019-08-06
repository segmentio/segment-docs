.PHONY: docs
docs:
	make seed && \
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
		make deps && \
		make catalog && \
	  bundle exec jekyll build

.PHONY: nav
nav:
	bundle exec rake nav:update

.PHONY: catalog
catalog:
	bundle exec rake catalog:update

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

.PHONY: docker-nav
docker-nav:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
		bundle exec rake nav:update
		
.PHONY: docker-catalog
docker-catalog:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
		bundle install && \
		bundle exec rake catalog:update

.PHONY: env
env:
	gem install bundler && \
	bundle install && \
	cp _templates/destinations.example.yml _data/catalog/destinations.yml && \
	cp _templates/sources.example.yml _data/catalog/sources.yml

.PHONY: seed
seed:
	cp _templates/destinations.example.yml _data/catalog/destinations.yml && \
	cp _templates/sources.example.yml _data/catalog/sources.yml


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