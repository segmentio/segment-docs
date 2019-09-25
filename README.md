# segment-docs

# Contributing to the Segment Docs

You can make a limited range of edits from the Github site, but this system works best if you clone it locally so you can run test builds.

# Quickstart (local development with docker)
You will need to have Docker installed https://docs.docker.com/install/
* If using Linux, run `docker-compose up`
* Visit http://localhost:4000/docsv2/

# Local development with `ruby` and `node`, without platform-api

* If using OSX, install command line tools, `xcode-select --install`
* Install `Ruby` https://www.ruby-lang.org/en/documentation/installation/
* Install `Node` https://nodejs.org/en/download/
* Install `Yarn` https://yarnpkg.com/en/docs/install
* Install `Bundler` `gem install bundler`
* Run server, `make dev`
* Visit http://localhost:4000/docsv2/

## Makefile commands

- `build`: Builds the site docs. Used by CI to publish the docs to staging and production
- `nav`: Rebuilds the entire nav datafile based on the current doc structure. This is destructive and should not be used unless absolutely necessary.
- `catalog`: Pulls in the latest catalog data from the Platform API and saves it in the respective data files. Requires an API key to be passed in env via PLATFORM_API_TOKEN
- `seed`: copies all example data files out of the `_templates` directory and puts them in the `_data` directory. Useful if you don't have a way to setup an API key.
- `clean`: removes all build artifacts
- `clean-deps`: removes all doownloaded `gems` and `node_modules`
- `deps`: installs the required `gems` and `node_modules`
- `dev`: runs `jekyll serve` locally with incremental builds. Useful when updating CSS, JS, or content and you don't want to rebuild everytime.

- docker-build: runs `make build` on a docker host.
- docker-dev: runs `make dev` on a docker host.

# Layouts
`default.html` is the container through which all the individual other layouts (currently one, `page.html`) are built to have the right title, seo, etc.

# Platform Config API + Catalog

### Data Source
The Segment Config API is currently providing the data for the Source and Destination catalog pages. This happens at build time and the results are stored in the respective `_data/catalog` yml files.

For local development, you can always run `make seed` to use the example files if you don't want to mess with interacting with the Platform API.

### API Key
The Platform API needs an API key to pull in the _latest_ catalog data and currently looks for one in the environment variable `PLATFORM_API_TOKEN`. This value is stored in a special file named `.env` that the appropriate scripts reference. You can what this file looks like by looking at `.env.example`

If you want to interact with the Platform API, locally, first make sure you have run `make env`. This will create the appropriate `.env` file for you to work with

**NOTE: Never check-in `.env` or remove it from `.gitignore`.**

Once your local environment is configured, you then have two options to pull Platform API data: You can use the token in [`chamber`](https://github.com/segmentio/chamber) or you can create your own token. The one in chamber is also used by CircleCI when the docs are built + deployed.

#### Chamber

If you installed and have access to `chamber`, run the following command:

```bash
$ aws-okta exec prod-privileged -- chamber read segment-docs platform_api_key
```

or for staging...

```bash
$ aws-okta exec stage-privileged -- chamber read segment-docs platform_api_key
```

You should get something like this as the output of the command.
```bash
Key			Value												Version		LastModified	User
platform_api_key	[REDACTED FOR DOCS]		2		08-05 10:24:55	arn:aws:sts::752180062774:assumed-role/production-write/bryan.mikaelian@segment.com
```

Edit the `.env` file (generated from `make env`) and replace the environment variable with the token above. `make catalog` should then work and you should see some output like this:

```bash
$ make catalog
"Saving catalogs from Platform API..."
"Finished Destinations."
"Finished Sources."
"Done."
```

#### Bring your own token

You create your own token via the Access Management Page. Feel free to use [`segment-engineering`](https://app.segment.com/segment-engineering/settings/access-management) or [`segment_prod`](https://app.segment.com/segment_prod/settings/access-management). Once you have the token, set the value in the `.env` file.


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

# Note Blocks
We're using [Premonition](https://github.com/lazee/premonition) for our Note blocks. This is stock right now, with four styles: `note`, `info`, `warning`, and `error`. We might build more later.

You'd write a block like this:
```md
> warning "I am a warning"
> The body of the warning goes here. Premonition allows you to write any `Markdown` inside the block.
```


# Frontmatter

- `beta`: default false. When true, show an "in beta" warning in the page layout (see the warning in `_includes/content/beta.md`)
- `description`: takes a string. Adds the text here to the meta "description" tag used for SEO purposes
- `feedback`: defaults to true. When false, hide the feedback footer. Good for legal and landing pages,
- `hidden`: omits the file from the `sitemap.xml` and adds a `<meta name="robots" content="noindex" />` to the top of the generated HTML file. TODO: it should probably also omit the item from the navbar generator script 🤔
- `hide_toc`: hides the right-nav TOC that's generated from H2s
- `integration_type`: This is set on two paths in the `_config.yml` to add a noun (Source or Destination) to the end of the title, and the end of the title tag in the html layout.
- `landing`: defaults to false. Use this to drop the noun set by `integration_type` from the title and heading.
- `redirect_from`: defaults to none. Takes an array of URLs from the frontmatter in a file, and generates a "stub" page at each URL. Each stub file redirects to the original file.
- `seo-changefreq`: default: `weekly `. Use the values [in the sitemap spec](https://www.sitemaps.org/protocol.html#xmlTagDefinitions). - sets the `changefreq` tag in the sitemap.xml generator, which tells search crawlers how often to check back.
- `seo-priority`: values from `1.0` to `0.1`, default: `0.5 `. Sets the `Priority` tag in the sitemap
