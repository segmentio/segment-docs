.PHONY: dev
dev:
	docker run -it \
	  -p 4000:4000 \
	  --volume="$(PWD):/srv/jekyll" \
	  jekyll/jekyll \
	  jekyll serve -H 0.0.0.0

.PHONY: build
build:
	echo "todo buildme"
