# Segment Docs Dev guide

Aka, where all the bodies are buried.


### Quickstart (local development with docker)
You will need to have Docker installed https://docs.docker.com/install/

* If using Linux, run `docker-compose up`
* Visit http://localhost:4000/docs/

### Local development with `ruby` and `node`, without platform-api

If using OSX:
  * Install command line tools, `xcode-select --install`
  * Install `Ruby` >= 2.3.0 https://www.ruby-lang.org/en/documentation/installation/
  * Ensure you're running `RubyGems` >= 2.5.0 by running `gem update --system` followed by `gem --version`
  * Install `Bundler 2` with `gem install bundler`
  * Install `Node` https://nodejs.org/en/download/
  * Install `Yarn` https://yarnpkg.com/en/docs/install
  * Run server, `make dev`
  * Visit http://localhost:4000/docs/

## Changing a DevCenter Destination's name

Occasionally, a destination will change names. This shouldn't be too difficult to handle, but make sure you do the following:
- Change the name of the file **to match destination's new slug**
- Check in the Partner Portal that the name change has appropriately filled out the `previousNames` field. There should be two (or more if this has aliases/many name changes).
- Add a `redirect_from` frontmatter item, with the url of the old doc. This funnels anyone arriving at the old page from a link outside the docs site to the page at the new name.
- Run a `make catalog` to pick up the name change.
- Run `make docs` and test that:
  1. The page shows up correctly at the url you specified using the new slug.
  2. The programmatic content appears (cmodes, settings, previous names)
  3. The redirect from the old page URL works.


## Developer information


### Layouts

`default.html` is the base container through which all the individual other layouts (currently one, `page.html`) are built to have the right title, seo, etc. `Integration.html` contains the logic that runs the catalog pages.

```text
default.html
 |- integration.html
 |- catalog.html
 |- main.html
    |-page.html
    |-home.html
```

### Platform Config API + Catalog

#### Data Source
The Segment Config API is currently providing the data for the Source and Destination catalog pages. This happens at build time and the results are stored in the respective `_data/catalog` yml files.

For local development, you can always run `make seed` to use the example files if you don't want to mess with interacting with the Platform API.

#### API Key
The Platform API needs an API key to pull in the _latest_ catalog data and currently looks for one in the environment variable `PLATFORM_API_TOKEN`. This value is stored in a special file named `.env` that the appropriate scripts reference. You can what this file looks like by looking at `.env.example`

If you want to interact with the Platform API, locally, first make sure you have run `make env`. This will create the appropriate `.env` file for you to work with

**NOTE: Never check-in `.env` or remove it from `.gitignore`.**

Once your local environment is configured, you then have two options to pull Platform API data: You can use the token in [`chamber`](https://github.com/segmentio/chamber) or you can create your own token. The one in chamber is also used by CircleCI when the docs are built + deployed.

##### Chamber

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

##### Bring your own token

You create your own token in the Segment App. You can use your own personal workspace, or if you have access to them, use [`segment-engineering`](https://app.segment.com/segment-engineering/settings/access-management) or [`segment_prod`](https://app.segment.com/segment_prod/settings/access-management). Go to **Settings > Access Management > Tokens**.
Any type of token will work, but you might want to limit it to a read-only token. Make sure you label it so folks know what it's for!

Once you make a new token, paste the token value in the `.env` file like so:

```text
PLATFORM_API_TOKEN=(token value here)
```
You can now run `make catalog`!


#### Catalog Data + Doc Links
By default, the links on the catalog page and respective sidenavs attempt to automagically set hyperlinks, for actual doc file, at the path `connections/:type/:slug`. However, given the transitory state of Docs V2, these links might 404 since the respective doc might be in a different directory.

#### Object Sources and Warehouses
These two catalogs are hardcoded in the `_data` directory since the Config API does not expose these resources.

### Sidenav
The sidenav is managed by the files in `_data/sidenav/`. Depending on what section we are in determines the file used. We currently support up to 2 levels deep on a sidenav.

### Breadcrumb
The current breadcrumb is currently determined based on the `page.path` and the current page's `title` front-matter attribute.

### Searching
Swiftype is set up as a script in `_layouts/default.html`


## Testing

### Build Testing
Currently the only automatic testing we perform is linting on the configuration yaml files to ensure proper the project will build.

TODO: define rules for markdown linting and clean up linting errors
`npx remark ./src --use preset-lint-markdown-style-guide`

### Manual Testing
There is as also some manual testing scripts that can be run to validate the build.

1. `tests/redirects/redirects_bash`: used for validating a list of paths that we have nginx redirects for

2. `tests/externalLinks/linkTester_bash`: used to validate that external links referenced in docs point to a validate endpoint

3. `tests/imageSizes/getImageSizes.js`: used to get the 10 largest images in the repo.

4. `npx mdspell 'src/**/*.md' -r --en-us`: used to validate spelling in docs, needs to be configured to add Segment terms.

5. Included is the [Hyperlink](https://www.npmjs.com/package/hyperlink) NPM module. Run `bundle install` to install that, plus the tap-spot plugin for pretty output. To check all links on the site, prior to build, run `yarn run hyperlink ./_site/index.html --canonicalroot https://segment.com/docs -i -r --skip 0.0.0.0 | yarn run tap-spot`. This module checks hyper links, images, and anchor tags to ensure that everything linked internally resolves to a location. **TODO**: Add support for external links.
