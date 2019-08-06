# segment-docs

This is a blank template for segment-docs

## Contributing to the Segment Docs

You can make a limited range of edits from the Github site, but this system works best if you clone it locally so you can run test builds.

### Setup instructions
1. First, clone the repo to your local machine.
2. From the command-line, run `make env` to run the Ruby bundler and install the stuff you need to run the repo.
   **Tip**: If you ever need to do this again, you can run `make deps`.
3. Run a test `make dev` to run Jekyll locally. It should serve the docs at `0.0.0.0:4000` on your local machine.

Use the local build process to preview local changes. If you're doing a release, you can use the `make docs` to see how this would work in the docker container environment that's more like production.

### Makefile commands

- docs: builds the docs and serves the static content via nginx
- build: runs a local jekyll build.
- nav: (TODO)
- catalog: (TODO)
- docker-clean: runs a `jekyll clean` on a docker host.
- docker-deps: runs `bundle install` on a docker host.
- docker-dev: runs `jekyll serve` on a docker host.
- env: for when you're first getting set up: installs bundler, and installs the deps for the repo.
- seed: copies all example data files out of the `_templates` directory and puts them in the `_data` directory.
- clean: runs `jekyll clean` locally
- deps: re-runs `bundle install` locally.
- dev: runs `jekyll serve` locally (but is shorter and easier to type!)


## Searching

Swiftype is set up as a script in `_layouts/default.html`


## Syntax highlighting

We're using Rouge, set in the `_config.yml`. It's now default for Jekyll 3 and later, so 🎉.

A list of the cues rouge accepts can be found [here](https://github.com/rouge-ruby/rouge/wiki/list-of-supported-languages-and-lexers).


## Frontmatter

- `redirect_from`: defaults to none. Takes an array of URLs from the frontmatter in a file, and generates a "stub" page at each URL. Each stub file redirects to the original file.

- `beta`: default false. When true, show an "in beta" warning in the page layout (see the warning in `_includes/content/beta.md`)

- hidden: omits the file from the `sitemap.xml` and adds a `<meta name="robots" content="noindex" />` to the top of the generated HTML file. TODO: it should probably also omit the item from the navbar generator script 🤔

- `feedback`: defaults to true. When false, hide the feedback footer. Good for legal and landing pages,

- `seo-priority`: values from `1.0` to `0.1`, default: `0.5 `. Sets the `Priority` tag in the sitemap

- `seo-changefreq`: default: `weekly `. Use the values [in the sitemap spec](https://www.sitemaps.org/protocol.html#xmlTagDefinitions). - sets the `changefreq` tag in the sitemap.xml generator, which tells search crawlers how often to check back.
