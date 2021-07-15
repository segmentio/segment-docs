# Segment Docs Dev guide

Aka, where all the bodies are buried.

Contents below. (This TOC generated with `markdown-toc` in Atom.)
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Segment Docs Dev guide](#segment-docs-dev-guide)
		- [Local development with `ruby` and `node`, without Config API](#local-development-with-ruby-and-node-without-config-api)
	- [Changing a DevCenter Destination's name](#changing-a-devcenter-destinations-name)
	- [All about the Catalog script](#all-about-the-catalog-script)
		- [Connection Modes in the Catalog script](#connection-modes-in-the-catalog-script)
	- [Developer information](#developer-information)
		- [Layouts](#layouts)
		- [Config API + Catalog](#config-api-catalog)
			- [API Key](#api-key)
				- [Bring your own token](#bring-your-own-token)
				- [Chamber](#chamber)
			- [Catalog Data + Doc Links](#catalog-data-doc-links)
			- [Object Sources and Warehouses](#object-sources-and-warehouses)
		- [Sidenav](#sidenav)
		- [Breadcrumb](#breadcrumb)
		- [Searching](#searching)
	- [Testing](#testing)
		- [Build Testing](#build-testing)
		- [Manual Testing](#manual-testing)

<!-- /TOC -->


### Local development with `ruby` and `node`, without Config API

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

## All about the Catalog script

You run the Catalog update script by running `make catalog` from the docs repo. You, a person who is going to run the script, must first save a Segment token to an `.env` file locally, which is `gitignored` so we don’t check it in to gihub accidentally.

Note: Old ConfigAPI tokens are not compatible with Public API. You'll need a new one if you want to use Public API.

The script takes your token, inserts it into a request header, then contacts the API, downloads all the available metadata for destinations and sources. It then writes them into a series of yml files that the docs build can consume. (You can find these in `/src/_data/catalog/`)

Note: We don’t currently (Feb '21) do this for warehouses (storage dests) because they were originally lumped in with destinations, and didn’t change often enough to be worth writing a script for. We just have a static `warehouses.yml` file instead. With the switch to Public API from ConfigAPI, we should change this.

The script also “calculates” the values for the `connection-modes` table for destinations, but that’s a huge other headache.

It also does some slugification and destination-name normalization, since our handling of dots and dashes hasn't been consistent over time. Finally, it checks to see if there’s a folder for each destination. If it finds a new one, the script makes a folder with a “stub” markdown file for that destination, and then adds a line for it to an "incompleteDocs.txt" file. (It doesn't check to see if it's already listed, just appends to the file.)

### Connection Modes in the Catalog script

As part of the Dossiers project we worked on making the Connection Modes table more readable. Originally we were going to have per-page liquid run, but these modes don't change often so it would've added a lot of build time for very little benefit. Instead we pushed it into `catalog.js`.
Once the connection modes device and cloud arrays are set, we do a bunch of calculations, and add a text summary, a number which corresponds to that summary for easier programmatic writing, and a rough category.

| Case | Summary                                | Type        | Message                                                                                                                                                     |
| ---- | -------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0    | No data available                      | none        | No connection mode information available.                                                                                                                   |
| 1    | Both device, no cloud                  | device-only | accepts device-mode data from both Analytics.js and mobile sources. It does not accept data in cloud-mode.                                                  |
| 2    | AJS (web device) only                  | device-only | accepts device-mode data only from Analytics.js.                                                                                                            |
| 3    | Mobile device mode only                | device-only | accepts device-mode data only from a mobile source.                                                                                                         |
| 4    | Accepts from all                       | all         | accepts cloud-mode data from all Segment source types. It can accept device-mode data from both web and mobile sources.                                     |
| 5    | All cloud types                        | cloud-only  | accepts cloud-mode data from all Segment source types. It does not offer device-mode connections.                                                           |
| 6    | Mobile and Server cloud only           | cloud-only  | accepts data from any Segment mobile or server source in cloud mode. It does not accept data from a web source, and does not offer device-mode connections. |
| 7    | Web and mobile cloud only              | cloud-only  | accepts only cloud-mode data from web and mobile sources.                                                                                                   |
| 8    | Mobile cloud only                      | cloud-only  | accepts only cloud-mode data from mobile sources.                                                                                                           |
| 9    | All cloud types, 1 device mode         | mixed       | accepts data in cloud-mode from all source types, and can accept data in device-mode from [Analytics.js or mobile] sources.                                 |
| 10   | Web and mobile cloud, 1 device         | mixed       | accepts data in cloud-mode from web and mobile sources, and can accept data in device-mode from [Analytics.js or mobile] sources.                           |
| 11   | Mobile and server cloud, mobile device | mixed       | accepts data in cloud-mode from mobile and server sources, and can accept data in device-mode from mobile sources.                                          |

## Developer information


### Layouts

`default.html` is the base container through which all the individual other layouts are built to have the right title, seo, etc. The template inheritance is described in the diagram below.

The `destination.html`, `source.html`, and `integration.html` templates contain the logic that runs the layouts for individual catalog pages. Storage/warehouses use the generic Integration right now because they don't need anything special. Set the layout in the Jekyll `_config.yml` file.

```text
default.html
  |- integration.html
    |- destination.html
    |- source.html
  |- main.html
    |- catalog.html - used for connections catalog pages only
    |- home.html - for main landing page only
    |- page.html - used for all pages outside Connections catalogs, without an explicit override
    |- search.html - search results page only
```

### Config API + Catalog

The Segment Config API provides the data for the Source and Destination catalog pages. This happens on demand using `make catalog`, and the results are stored in the respective `_data/catalog` yml files.

Warehouses.yml is currently built by hand, because warehouses have traditionally been considered a form of destination, so are not separated out in the Config API.

#### API Key
The Config API needs an API key to pull in the _latest_ catalog data and currently looks for one in the environment variable `PLATFORM_API_TOKEN`. This value is stored in a special file named `.env` that the appropriate scripts reference. You can what this file looks like by looking at `.env.example`

If you want to interact with the Platform API, locally, first make sure you have run `make env`. This will create the appropriate `.env` file for you to work with

**NOTE: Never check-in `.env` or remove it from `.gitignore`.**

Once your local environment is configured, you then have two options to pull Platform API data: You can use the token in [`chamber`](https://github.com/segmentio/chamber) or you can create your own token.


##### Bring your own token

You create your own token in the Segment App. You can use your own personal workspace, or if you have access to them, use [`segment-engineering`](https://app.segment.com/segment-engineering/settings/access-management) or [`segment_prod`](https://app.segment.com/segment_prod/settings/access-management). Go to **Settings > Access Management > Tokens**.
Any type of token will work, but you might want to limit it to a read-only token. If you're working in a shared workspace, make sure you label it so folks know what it's for and don't revoke it.

Once you make a new token, paste the token value in the `.env` file like so:

```text
PLATFORM_API_TOKEN=(token value here)
```
You can now run `make catalog`!

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



#### Catalog Data + Doc Links
By default, the links on the catalog page and respective sidenavs attempt to automagically set hyperlinks, for actual doc file, at the path `connections/:type/:slug`. However, given the transitory state of Docs V2, these links might 404 since the respective doc might be in a different directory.

#### Object Sources and Warehouses
These two catalogs are hardcoded in the `_data` directory since the Config API does not expose these resources.

### Sidenav
The sidenav is managed by the files in `_data/sidenav/`. Depending on what section we are in determines the file used. We currently support up to 2 levels deep on a sidenav.

### Breadcrumb
The current breadcrumb is currently determined based on the `page.path` and the current page's `title` front-matter attribute.

### Searching
We're currently using Algolia, which uses `algolia.js` and `algolia.css`. The search indexing is managed on the Algolia site.

## Testing

### Build Testing
Currently the only automatic testing we perform is linting on the configuration yaml files to ensure proper the project will build.

TODO: define rules for markdown linting and clean up linting errors
`npx remark ./src --use preset-lint-markdown-style-guide`

### Manual Testing

There are also some manual testing scripts that you can run to validate the build.

1. Vale. Vale is a prose linter which you can run on-demand, or configure to work with Atom or other editors.

2. `tests/redirects/redirects_bash`: used for validating a list of paths that we have nginx redirects for

3. `tests/externalLinks/linkTester_bash`: used to validate that external links referenced in docs point to a validate endpoint

4. `tests/imageSizes/getImageSizes.js`: used to get the 10 largest images in the repo.

5. `npx mdspell 'src/**/*.md' -r --en-us`: used to validate spelling in docs, needs to be configured to add Segment terms.

6. Included is the [Hyperlink](https://www.npmjs.com/package/hyperlink) NPM module. Run `bundle install` to install that, plus the tap-spot plugin for pretty output. To check all links on the site, prior to build, run `yarn run hyperlink ./_site/index.html --canonicalroot https://segment.com/docs -i -r --skip 0.0.0.0 | yarn run tap-spot`. This module checks hyper links, images, and anchor tags to ensure that everything linked internally resolves to a location. **TODO**: Add support for external links.
