.PHONY: docs
docs:
	make build && \
	docker build . -t segment-docs:latest && \
	echo "Running segment docs at http://localhost:4000/docsv2/" && \
	docker run -p 4000:80 segment-docs:latest


.PHONY: deps
deps:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
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
	docker run -it \
	  -p 4000:4000 \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
	  jekyll serve -H 0.0.0.0