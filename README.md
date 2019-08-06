# segment-docs

# Contributing to the Segment Docs

You can make a limited range of edits from the Github site, but this system works best if you clone it locally so you can run test builds.

# Setup instructions
1. First, clone the repo to your local machine.
2. From the command-line, run `make env` to run the Ruby bundler and install the stuff you need to run the repo.
   **Tip**: If you ever need to do this again, you can run `make deps`.
3. Run a test `make dev` to run Jekyll locally. It should serve the docs at `0.0.0.0:4000` on your local machine.

Use the local build process to preview local changes. If you're doing a release, you can use the `make docs` to see how this would work in the docker container environment that's more like production.

## Makefile commands

- `docs`: locally builds the docs and serves the static content via a Docker container running nginx
- `build`: Builds the site docs. Used by CI to publish the docs to staging and production
- `nav`: Rebuilds the entire nav datafile based on the current doc structure. This is destructive and should not be used unless absolutely necessary.
- `catalog`: Pulls in the latest catalog data from the Platform API and saves it in the respective data files. Requires an API key saved in .env
- `env`: for when you're first getting set up: installs bundler, and installs the deps for the repo.
- `seed`: copies all example data files out of the `_templates` directory and puts them in the `_data` directory.
- `clean`: runs `jekyll clean` locally
- `deps`: re-runs `bundle install` locally.
- `dev`: runs `jekyll serve` locally with incremental builds. Useful when updating CSS, JS, or content and you don't want to rebuild everytime.

- docker-clean: runs a `jekyll clean` on a docker host.
- docker-deps: runs `bundle install` on a docker host.
- docker-dev: runs `make dev` on a docker host.
- docker-nav: runs `make nav` on a docker host.
- docker-catalog: runs `make catalog` on a docker host.

# Layouts
Default.html is the container through which all the individual other layouts (currently one) are built to have the right title, seo, etc.

# Platform Config API + Catalog

### Data Source
The Segment Config API is currently providing the data for the Source and Destination catalog pages. This happens at build time and the results are stored in the respective `_data/catalog` yml files.

### Catalog Data + Doc Links
By default, the links on the catalog page and respective sidenavs will attempt to automagically set hyperlinks, for actual doc file, at the path `connections/:type/:slug`. However, given the transitory state of Docs V2, these links might 404 since the respective doc might be in a different directory.

### Object Sources and Warehouses
These two catalogs are hardcoded in the `_data` directory since the Config API does not expose these resources.

# Sidenav
The sidenav is managed by the files in `_data/sidenav/`. Depending on what section we are in determines the file used. We currently support up to 2 levels deep on a sidenav.

# Breadcrumb
The current breadcrumb is currently determined based on the `page.path` and the current page's `title` front-matter attribute.

# Searching

Swiftype is set up as a script in `_layouts/default.html`


# Syntax highlighting

We're using Rouge, set in the `_config.yml`. It's now default for Jekyll 3 and later, so 🎉.

A list of the cues Rouge accepts can be found [here](https://github.com/rouge-ruby/rouge/wiki/list-of-supported-languages-and-lexers).


# Frontmatter

- `beta`: default false. When true, show an "in beta" warning in the page layout (see the warning in `_includes/content/beta.md`)
- `description`: takes a string. Adds the text here to the meta "description" tag used for SEO purposes
- `feedback`: defaults to true. When false, hide the feedback footer. Good for legal and landing pages,
- `hidden`: omits the file from the `sitemap.xml` and adds a `<meta name="robots" content="noindex" />` to the top of the generated HTML file. TODO: it should probably also omit the item from the navbar generator script 🤔
- `hide_toc`: hides the right-nav TOC that's generated from H2s
- `redirect_from`: defaults to none. Takes an array of URLs from the frontmatter in a file, and generates a "stub" page at each URL. Each stub file redirects to the original file.
- `seo-changefreq`: default: `weekly `. Use the values [in the sitemap spec](https://www.sitemaps.org/protocol.html#xmlTagDefinitions). - sets the `changefreq` tag in the sitemap.xml generator, which tells search crawlers how often to check back.
- `seo-priority`: values from `1.0` to `0.1`, default: `0.5 `. Sets the `Priority` tag in the sitemap
