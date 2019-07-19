.PHONY: dev
dev:
	docker run -it \
	  -p 4000:4000 \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
	  jekyll serve -H 0.0.0.0

.PHONY: clean
clean:
	rm -rf _site

.PHONY: build
build:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
	  jekyll build

.PHONY: release
release:
	make clean && \
	make build && \
	docker build . -t segment-docs:latest

.PHONY: run
run:
	docker run -p 4000:80 segment-docs:latest