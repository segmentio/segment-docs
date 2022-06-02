# Contributing to Segment Docs

## Getting Started

Before you begin:

- This site is powered by [Jekyll](https://www.jekyllrb.com).
- Please familiarize yourself with the licensing agreement.
- Browse existing issues to see if your issue has been raised already.

## Use the contribution links from any docs page

Not all pages have a 1-1 mapping with their location within the repository. This can make browsing and locating the file you're trying to reference a challenge. As you browse [segment.com/docs](https://segment.com/docs), you'll notice two links in the right sidebar, at the top of the page. Click **Edit this page** to open the page in the GitHub editor. Or, click **Request docs change** to create a new issue that references the page.

## Want to go deeper? Fork the repository

You can fork this repository and clone it to your local machine to make larger changes. Examples of larger changes include:
- editing more than one file at a time
- adding or updating images
- updating navigation items

In this scenario, you'll fork the repository, clone it locally, make your changes, and submit a pull request to have them reviewed and merged back into the site.

## Site structure

As mentioned, the Segment docs site is powered by Jekyll, with a few customizations and enhancements. Generally speaking, everything you'll need to edit is located in the `_src/` directory. This directory contains the data files, layouts, sass, and markdown source files that combine to make a live, working website.

Within the `/src/` path, anything that starts with an underscore (like `_data` or `_includes`) is a utility directory, and Jekyll won't render it as a webpage path at build time. (In fact, any files where the name starts with an underscore are dropped from the build.)

### Underscore files

Anything that starts with an `_` is a utility directory of some sort (and Jekyll will skip/not render any file that starts with a `_`).

The most interesting ones are:
- `/src/_includes/content/` This is where all the includes or "partials" - the reusable content - are stored.
- `/src/_data/catalog/` This is where we keep the data we've pulled from the ConfigAPI in structured `yml` files that are used by the build.
- `/src/_data/sidenav/` This is where the navigation structures are. (Several sections in the doc have their own left-nav, making them "microsites".) They're just YML files that we manually update so we have maximum control over what's shown and what's not.


### Images

**Save all images locally! No linking to third-party hosted images!** Images are published to our CDN from the build step, and this means they won't go missing if the hosting service dujour goes out of business.

There are no _enforced_ naming conventions at this time. Files that start with an underscore are ignored by Jekyll. Anything you see with `asset` was dowloaded by a script to migrate it out of Contents.io.

In general, it's a good practice to name images with a description that helps you (& other docs maintainers) figure out where they should go within a page, or within a larger folder of images.

A few possibilities/suggestions:

- **Add a prefix of what file the image appears in**. This is helpful if you have images for multiple pages in the same `images` directory, but breaks down a bit if you reuse images across multiple pages.
- **Give a prefix of the application the screenshot shows**. For example `atom-new-file.png`, `atom-commit-changes.png` etc),
- **Name images to describe a process flow**. For example `checkout-1-add-to-cart.png`, `checkout-2-est-shipping.png` and so on.


### Content structure

There are folders for each of the top level products, and those folders might also contain topics that are related to that product area (for example the Privacy Portal section also contains GDPR/CCPA docs).

For the Connections product, the section is divided into the Spec, then Sources, Destinations, and Storage Destinations (formerly called "Warehouses"), with general accessory topics at the folder root. (More specific accessory topics are in each sub directory.)

Each also contains a `catalog` directory, which contains all the directories with information about specific integrations. The top-level of this `catalog` folder (the `index.md`) is a pretty "catalog" page which gives a tile-like view by category, suitable for browsing. It pulls the logo for these tiles from the path for the integration in the metadata, either in `destinations.yml`, `sources.yml`, or `warehouses.yml`.


### Programmatic content

Programmatic content is sections of documentation that are built conditionally, or using public information from our Config API. This is *awesome* and like the holy grail of docs systems.

Programmatic content is built using information in the files in `/src/_data/catalog/`. These files (with the exception of `warehouses.yml`) are built by the `make catalog` command, which contacts our public ConfigAPI, gets a list of all the available integrations using the Catalog API, and then parses them into static `.yml` files.

Most of the programmatic content is built into the `_layouts` templates that each page uses. Sources, Destinations, and Warehouses use the `integration.html` template, which uses some Liquid logic, and calls an `include` depending on the integration type. Most of logic for the actual content must live in the include file itself, however logic controlling *if* the include is built can live in the `layout`.

Destination pages include the `destination-dossier.html` and `destination_footer.md` content, which use Liquid scripting and pulls from the catalog metadata.

Sources pages check if the source is a cloud-app, then include information about if the source is an object or event source, based on the `type` data from the ConfigAPI.

## Edit pages

Content with in each `.md` file is markdown. For information about styling, and available extensions, see `_src/utils/formatguide.md` or the live version [here](https://segment.com/docs/utils/formatguide).

### Front matter

Repository Markdown files often contain front matter metadata, which you'll find at the top of the file. These front matter variables instruct Jekyll how to build and render the page as HTML.

Front matter in a file will look something like this:

```md
---
title: Analytics.js Library
hide-feedback: false
---
```

Front matter variables have unique functions, including the following:

#### Content-related front matter
- `beta`: default false. When true, show an "in beta" warning in the page layout (see the warning in `_includes/content/beta-note.md`)
- `rewrite`: defaults to false. This is a legacy front matter flag that comes from the old `site-docs` repo, and which labels any destination that was rewritten in ~2018 to a standardized template. It disables the duplicate "connection modes" table that would otherwise show up in the boilerplate content at the end of the page.
- `hide-dossier`: defaults to false. When true, hides the "quick info" box at the top of a destination page.
- `hide-boilerplate`: defaults to false. When true, none of the content from `destination-footer.md` is appended to the destination page.
- `hide-cmodes`: defaults to false. A renaming of "rewrite" for more clarity, hides the connection modes table in the boilerplate.
- `hide-personas-partial`: defaults to false. When true, hides the section of content from `destination-footer.md` that talks about being able to receive personas data.
- `integration_type`: This is set in the `_config.yml` on three paths to add a noun (Source, Destination, or Warehouse) to the end of the title, and the end of the title tag in the html layout. It also controls the layout and icon for some of these.
- `source-type`: These are only used to supplement when a Cloud App in the sources path doesn't appear in the Config API list, and needs its type explicitly set. It runs some logic in the `cloud-app-note.md` to explain which cloud-apps are object vs event sources.

#### Utility front matter
- `published`: defaults to true. Set this to "false" to prevent Jekyll from rendering an HTML page for this file. Good for when you're working on something in the repo but aren't ready to release it yet, and don't want to use a Draft PR.
- `hidden`: omits the file from the `sitemap.xml`, adds a `<meta name="robots" content="noindex" />` to the top of the generated HTML file, and drops it from the convenience script for regenerating the nav.
- `hide-sidebar`: defaults to false. When true, hide the entire right-nav sidebar. Use with `hide-feedback` if you want to disable *all* feedback affordances.
- `hide-feedback`: defaults to false. When true, hide the feedback in both rnav and footer. Good for landing pages.
- `hide_toc`: hides the right-nav TOC that's generated from H2s. Also good for landing pages.
- `landing`: defaults to false. Use this to drop the noun set by `integration_type` from the tab title.
- `redirect_from`: Defaults to null. Takes an array of URLs from the front matter in a file, and generates a "stub" page at each URL at build-time. Each stub file redirects to the original file. Use the path from the root of the content directory, for example `/connections/destinations/catalog/` rather than `/docs/connections/destinations/catalog/`. **Note** We are mostly using NGINX redirects for SEO purposes. Approximately quarterly, we'll collect these and add them to NGINX.
- `seo-changefreq`: default: `weekly `. Use the values [in the sitemap spec](https://www.sitemaps.org/protocol.html#xmlTagDefinitions). - sets the `changefreq` tag in the sitemap.xml generator, which tells search crawlers how often to check back.
- `seo-priority`: values from `1.0` to `0.1`, default: `0.5 `. Sets the `Priority` tag in the sitemap
