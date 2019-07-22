.PHONY: run
run:
	make build && \
	docker build . -t segment-docs:latest && \
	echo "Starting segment-docs at http://localhost:4000" && \
	docker run -p 4000:80 segment-docs:latest

.PHONY: build
build:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
		bundle package && \
		bundle install && \
	  bundle exec jekyll build

.PHONY: release
release:
		
.PHONY: dev
dev:
	docker run -it \
	  -p 4000:4000 \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
	  jekyll serve -H 0.0.0.0