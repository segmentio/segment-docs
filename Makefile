.PHONY: docs
docs:
	make build && \
	docker build . -t segment-docs:latest && \
	echo "Running segment docs at http://localhost:4000/docsv2/" && \
	docker run -p 4000:80 segment-docs:latest

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

.PHONY: build
build:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
		bundle package && \
		bundle install && \
	  bundle exec jekyll build

.PHONY: dev
dev:
	make clean && \
	bundle exec jekyll serve --incremental -H 0.0.0.0