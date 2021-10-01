# Segment Docs Developer Guide

The contents of this guide will help you get up and running with the Segment Docs local environment.

## Local development with `ruby` and `node`, without Config API

If using OSX:
  * Install command line tools, `xcode-select --install`
  * Install `Ruby` >= 2.3.0 https://www.ruby-lang.org/en/documentation/installation/
  * Ensure you're running `RubyGems` >= 2.5.0 by running `gem update --system` followed by `gem --version`
  * Install `Bundler 2` with `gem install bundler`
  * Install `Node` https://nodejs.org/en/download/
  * Install `Yarn` https://yarnpkg.com/en/docs/install
  * Run server, `make dev`
  * Visit http://localhost:4000/docs/

##  All about the Catalog script

You run the Catalog update script by running `make catalog` from the docs repo. You, a person who is going to run the script, must first save a Segment token to an `.env` file locally, which is `gitignored` so we don’t check it in to GitHub accidentally.

Note: Old ConfigAPI tokens are not compatible with Public API. You'll need a new one if you want to use Public API.

The script takes your token, inserts it into a request header, then contacts the API, downloads all the available metadata for destinations and sources. It then writes them into a series of yml files that the docs build can consume. (You can find these in `/src/_data/catalog/`)

Note: We don’t currently (Feb '21) do this for warehouses (storage dests) because they were originally lumped in with destinations, and didn’t change often enough to be worth writing a script for. We just have a static `warehouses.yml` file instead. With the switch to Public API from ConfigAPI, we should change this.

The script also “calculates” the values for the `connection-modes` table for destinations, but that’s a huge other headache.

It also does some slugification and destination-name normalization, since our handling of dots and dashes hasn't been consistent over time. Finally, it checks to see if there’s a folder for each destination. If it finds a new one, the script makes a folder with a “stub” markdown file for that destination, and then adds a line for it to an "incompleteDocs.txt" file. (It doesn't check to see if it's already listed, just appends to the file.)

##  3. <a name='Developerinformation'></a>Developer information


###  3.1. <a name='Layouts'></a>Layouts

`default.html` is the base container through which all the individual other layouts are built to have the right title, SEO, etc. The template inheritance is described in the diagram below.

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

###  3.2. <a name='ConfigAPICatalog'></a>Config API + Catalog

The Segment Config API provides the data for the Source and Destination catalog pages. This happens on demand using `make catalog`, and the results are stored in the respective `_data/catalog` yml files.

Warehouses.yml is currently built by hand, because warehouses have traditionally been considered a form of destination, so are not separated out in the Config API.

####  3.2.1. <a name='APIKey'></a>API Key
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


### Sidenav
The sidenav is managed by the files in `_data/sidenav/`. Depending on what section we are in determines the file used. We currently support up to 2 levels deep on a sidenav.

###  Breadcrumb
The current breadcrumb is currently determined based on the `page.path` and the current page's `title` front-matter attribute.

###  Searching
We're using Algolia, which uses `algolia.js` and `algolia.css`. The index is updated as part of the build process on Netlify..

