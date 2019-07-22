.PHONY: start
run:
	make build && \
	make release && \
	echo "Starting segment-docs at http://localhost:4000" && \
	docker run -p 4000:80 segment-docs:latest

.PHONY: build
build:
	docker run -it \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
	  jekyll build

.PHONY: release
release:
	docker build . -t segment-docs:latest
		
.PHONY: dev
dev:
	docker run -it \
	  -p 4000:4000 \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
	  jekyll serve -H 0.0.0.0