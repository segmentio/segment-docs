# segment-docs Readme!

Hello, yes, this is docs.

<img src="docs.png">

Here's what's here!

We are now splitting out the Readme into three parts:
- [Contributor Guide](contributors.md)
- [Style Guide](styleguide.md)
- [Technical Details](devguide.md)

<!-- TOC depthFrom:2 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Contributing to the Segment Docs](#contributing-to-the-segment-docs)
- [Most frequently asked question: Do I need a review?](#most-frequently-asked-question-do-i-need-a-review)
- [How to docs (The Docs Process)](#how-to-docs-the-docs-process)
- [Repo structure](#repo-structure)
- [Formatting and Prettifying](#formatting-and-prettifying)
- [Frontmatter](#frontmatter)
- [Makefile commands](#makefile-commands)
- [Troubleshooting Paper Exports](#troubleshooting-paper-exports)
- [Developer information](#developer-information)

<!-- /TOC -->

<!-- This TOC automatically generated using the slightly-finicky markdown-toc plugin in Atom. -->



## Contributing to the Segment Docs

## Quickstart

Git clone this repo, navigate to it in Terminal, run `make env`.
This will install everything you need to edit the docs, and run the docs build locally.

Edit the content files, check them in on a new branch, PR to the main repo, and when your PR is merged to `master`, the site automatically rebuilds.

For more details, see the [Contributor Guide](contributors.md)!

### JUST Editing content?

You can make a limited range of edits [from the Github site](contributors.md/#contribute-from-the-github-web-ui)! Hooray! But this system works best if you clone it locally so you can run test builds.

See the [Contributor Guide](contributors.md) for more info.

## Most frequently asked question: Do I need a review?

The docs repo works on the honor system right now. The only rule is you can't merge if it breaks the build (or introduces security vulns that Snyk complains about).

- **Just fixing a typo**? -> No review needed, merge with blessings.

- **Delta of <50 words or ~250 characters**? -> No review needed, but get someone to spot check you just in case.

- **Adding new feature docs**? -> Yes. Get _two_ reviewers, one for technical accuracy, and one for copy.

## How to docs (The Docs Process)

1. Check out the repo and get set up.
2. Create a new branch and make your changes.
   - Change the content in the files.
   - If needed, update the appropriate file in the `src/_data/sidenav/` to reflect your changes.
3. Commit your changes.
3. Push the branch to `segment-docs` and make a PR to master.
    - Include any context you can in the PR: links to ZD tickets, Jira tickets, Paper docs or wiki pages about the project. (If you include a Jira ticket number, Jira can often link directly to the PR.)
3. [Check if you need a review](#most-frequently-asked-question-do-i-need-a-review).
5. If the reviewers ask for clarifications or edits:
    - make the changes
    - push the new commits to the branch
5. Once you get a review, and the checks pass, merge your PR.
6. Once you've merged the branch, delete it!
7. Once merged, you can track build and deploy process in [buildkite/segment-docs](https://buildkite.com/segment/segment-docs).

### Long running projects

If you're doing a substantial change and you're going to want to spend a few weeks on it, use [Github's Draft PRs feature](https://help.github.com/en/articles/about-pull-requests#draft-pull-requests), or add `WIP` to the title of your PR. This lets us know to ignore the PR until you're ready.


## How the docs build works

The actual content that you see on segment.com/docs lives in this repository, most of it in the `/src/` folder and its subdirectories. Everything outside of that folder is related to the build, styling, tracking, and process for this repo.

These files are built by Jekyll, our static-site builder program, into a full site of static HTML pages. We do not have any interactive or adaptive content on the site at this time.

When you run `make dev` (or `make docs`) on your laptop, Jekyll runs the same program that it uses to publish the public site content. It builds the page templates, then builds an HTML page for each markdown file (or html file) in the `src` path[**](#underscore-files). Some of these files include Liquid script, which allows them to load reusable content ("includes"), render fancy HTML styling, and run simple code processes to build programmatic content. As long as the Jekyll process is running on your laptop, you can edit the content of a page in markdown and save it, and Jekyll will detect the change and rebuild that page so you can view it locally. However, this doesn't work for the page layouts (and a few other things), which are assumed to be static at build time.

When you merge a PR to master, our build system runs the Jekyll program, and automatically publishes the rebuilt HTML files to our web server. (Which is why we *require* that the Buildkite build passes before you merge!)


## Repo structure

All of the content files live in the `/src/` directory. Everything outside of this is related to the build.

Within the `/src/` path, anything that starts with an underscore (like `_data` or `_includes`) is a utility directory, and Jekyll won't render it as a webpage path at build time. (In fact, any files where the name starts with an underscore are dropped from the build.)

### Underscore files

Anything that starts with an `_` is a utility directory of some sort (and Jekyll will skip/not render any file that starts with a `_`).

The most interesting ones are:
- `/src/_includes/content/` This is where all the includes or "partials" - the reusable content - are stored.
- `/src/_data/catalog/` This is where we keep the data we've pulled from the ConfigAPI in structured `yml` files that are used by the build.
- `/src/_data/sidenav/` This is where the navigation structures are. (Several sections in the doc have their own left-nav, making them "microsites".) They're just YML files that we manually update so we have maximum control over what's shown and what's not.

### Diagram Library

We have a [diagram library](diagram-library/readme.md) available using Sketch! Use this to create new process diagrams, charts, and other visuals.

### Content structure

There are folders for each of the top level products, and those folders might also contain topics that are related to that product area (for example the Privacy Portal section also contains GDPR/CCPA docs).

For the Connections product, the section is divided into the Spec, then Sources, Destinations, and Warehouses, with general accessory topics at the folder root. (More specific accessory topics are in each sub directory.) Each also contains a `catalog` directory, which contains all the directories with information about specific integrations. The top-level of this folder (the `index.md`) is a pretty "catalog" page which gives a tile-like view by category, suitable for browsing. It pulls the logo for these tiles from the path for the integration in the metadata service.

### Programmatic content

Programmatic content is sections of documentation that are built conditionally, or using public information from our Config API. This is *awesome* and like the holy grail of docs systems.

Programmatic content is built using information in the files in `/src/_data/catalog/`. These files (with the exception of `warehouses.yml`) are built by the `make catalog` command, which contacts our public ConfigAPI, gets a list of all the available integrations using the Catalog API, and then parses them into static `.yml` files.

Most of the programmatic content is built into the `_layouts` templates that each page uses. Sources, Destinations, and Warehouses use the `integration.html` template, which uses some Liquid logic, and calls an `include` depending on the integration type. Most of logic for the actual content must live in the include file itself, however logic controlling *if* the include is built can live in the `layout`.

Destination pages include the `integration_foot.md` content which uses Liquid scripting and pulls from the catalog metadata.

Sources pages check if the source is a cloud-app, then include information about if the source is an object or event source, based on the `type` data from the ConfigAPI.


## Frontmatter

Each Markdown file in the docs can have "frontmatter" associated with it at the top of the file. These are considered by Jekyll to be "properties" of a page, generally control how the HTML page is built or rendered.

Frontmatter in a file will look something like this:

```md
---
title: Analytics.js Library
hide-feedback: false
---
```

Each piece of frontmatter does something special!

#### Content-related frontmatter
- `beta`: default false. When true, show an "in beta" warning in the page layout (see the warning in `_includes/content/beta-note.md`)
- `rewrite`: defaults to false. This is a legacy frontmatter flag that comes from the old `site-docs` repo, and which labels any destination that was rewritten in ~2018 to a standardized template.
- `integration_type`: This is set in the `_config.yml` on three paths to add a noun (Source, Destination, or Warehouse) to the end of the title, and the end of the title tag in the html layout. It also controls the layout and icon for some of these.
- `source-type`: These are only used to supplement when a Cloud App in the sources path doesn't appear in the Config API list, and needs its type explicitly set. It runs some logic in the `cloud-app-note.md` to explain which cloud-apps are object vs event sources.

#### Utility frontmatter
- `published`: defaults to true. Set this to "false" to prevent Jekyll from rendering an HTML page for this file. Good for when you're working on something in the repo but aren't ready to release it yet, and don't want to use a Draft PR.
- `hidden`: omits the file from the `sitemap.xml`, adds a `<meta name="robots" content="noindex" />` to the top of the generated HTML file, and drops it from the convenience script for regenerating the nav.
- `hide-feedback`: defaults to false. When true, hide the feedback footer. Good for legal and landing pages.
- `hide_toc`: hides the right-nav TOC that's generated from H2s
- `landing`: defaults to false. Use this to drop the noun set by `integration_type` from the tab title.
- `redirect_from`: Defaults to null. Takes an array of URLs from the frontmatter in a file, and generates a "stub" page at each URL at build-time. Each stub file redirects to the original file. **Note** We are mostly using NGINX redirects for SEO purposes. Approximately quarterly, we'll collect these and add them to NGINX.
- `seo-changefreq`: default: `weekly `. Use the values [in the sitemap spec](https://www.sitemaps.org/protocol.html#xmlTagDefinitions). - sets the `changefreq` tag in the sitemap.xml generator, which tells search crawlers how often to check back.
- `seo-priority`: values from `1.0` to `0.1`, default: `0.5 `. Sets the `Priority` tag in the sitemap

## Navigation

The navigation is built from a static yml file, which allows us maximum control over what appears there and when.

### Sidenav Icons
We have two neat icons that you can add to a bottom-level menu item to mark it with an icon. (If it's a folder/directory, the "expand" carat blocks this icon from appearing.)

- `menu_icon: read-more` to show a book icon - use this to indicate that there's a lot more in this page than meets the eye
- `menu_icon: new-tab` to show an "external link" icon. Use this to indicate that the link in the sidenav is taking out outside the segment.com domain (for example to our API references hosted on Postman)


## Makefile commands

- `dev`: runs `jekyll serve` locally with incremental builds. Useful when updating CSS, JS, or content and you don't want to rebuild everytime.
- `docs`: same as `make dev`, but for Laura's convenience.
- `build`: Builds the site docs. Used by CI to publish the docs to staging and production
- `catalog`: Pulls in the latest catalog data from the Platform API and saves it in the respective data files. Requires an API key to be passed in env via PLATFORM_API_TOKEN. [Instructions here](#bring-your-own-token).
- `sidenav`: Builds the side navs for 'main', 'legal', 'api', 'partners' and stores the output in `/src/_data/sidenav-auto/`. This output isn't used for the actual build.
- `typewriter`: pulls in the current state of the Docs tracking plan for implementing Segment tracking
- `seed`: copies all example data files out of the `_templates` directory and puts them in the `_data` directory. Useful if you don't have a way to set up an API key.
- `clean`: removes all build artifacts
- `clean-deps`: removes all downloaded `gems` and `node_modules`
- `deps`: installs the required `gems` and `node_modules`


- docker-build: runs `make build` on a docker host.
- docker-dev: runs `make dev` on a docker host.
