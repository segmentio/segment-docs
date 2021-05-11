# segment-docs Readme!

Hello, yes, this is docs.

<img src="docs.png">

Here's what's here!

We are now splitting out the Readme into three parts:
- [Contributor Guide](contributors.md)
- [Style Guide](styleguide.md)
- [Technical Details](devguide.md)

---
Here's what's on this main page:

<!-- TOC depthFrom:2 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Contributing to the Segment Docs](#contributing-to-the-segment-docs)
- [Quickstart](#quickstart)
- [Most frequently asked question: Do I need a review?](#most-frequently-asked-question-do-i-need-a-review)
- [How to docs (The Docs Process)](#how-to-docs-the-docs-process)
- [How the docs build works](#how-the-docs-build-works)
- [Formatting and Prettifying](#formatting-and-prettifying)
- [Repo structure](#repo-structure)
- [Frontmatter](#frontmatter)
- [Navigation](#navigation)
- [Makefile commands](#makefile-commands)

<!-- /TOC -->


<!-- This TOC automatically generated using the slightly-finicky markdown-toc plugin in Atom. -->



## Contributing to the Segment Docs

## Quickstart

Git clone this repo, navigate to it in Terminal, run `make env`.
This installs everything you need to edit the docs **and** run the docs build locally. That done: Edit the content files locally, check them in on a new branch, go to Github and open a PR to the segment-docs repo, and when your PR is merged to `master`, the public docs site automatically rebuilds.

If these instructions didn't make any sense to you, or for more details, see the [Contributor Guide](contributors.md)!

### JUST Editing content?

You can make a limited range of edits [from the Github site](contributors.md/#contribute-from-the-github-web-ui)! Hooray! But the Github UI [has some limitations](contributors.md#contribute-from-the-github-web-ui), and this system works best if you clone it locally so you can run test builds.

See the [Contributor Guide](contributors.md) for more info.

## Most frequently asked question: Do I need a review?

**At minimum you must open a PR so the docs team gets a notification. Do not merge directly to master.**

- **Just fixing a typo**? -> No review needed, but please label it FIX in the PR subject so we know not to worry. You can then admin-merge your PR with our blessings.

- **Delta of <20 words or ~150 characters**? -> Yes, but a minor review. Open a PR and tag @sanscontext, who'll review mostly for formatting and copy issues.

- **Adding new feature docs**? -> Yes. Get _two_ reviewers, one for technical accuracy, and one for copy.


## How to docs (The Docs Process)

If you're planning substantial changes to the docs, follow this process for great success! 🏆

1. 📞 Contact the docs team* during the planning phase. This way, we can help with logistics and information architecture, and alert you to any gotchas in your content area.
2. 📝 Unless previously booked, we don't need to be involved in the writing - go for it! (We're happy to consult if you get stuck or need someone to bounce ideas off.)
3. 👀 When you've got a draft at least 70% ready for review, tag a member of the docs team, who'll do an initial review. (This can be either in Paper/Gdocs, or in a Github [Draft PR](#draft-prs) with markdown changes if you're comfortable with that.) They'll do a copy edit pass, and ask clarifying questions.
4. ❓The doc author/owner should answer the questions asked in the review phase. Either the doc author, or the docs team member can resolve comments as they are clarified in the doc text.👍
5. ✅ The docs team member does a final review and approves.
6. 🚢 Once it's signed off, you publish! This can mean:
  - The author opens a PR to publish their changes
  - The author consults with a docs-team person to publish changes (esp good when making nav changes, moving or deleting pages)
  - The docs person opens a PR to push the changes

Once the PR is merged, the docs site rebuilds and the changes are live!

(* The docs team is just Laura right now.)


### The Docs Process for direct contributors

1. Check out the repo and get set up.
2. Create a new branch and make your changes.
   - Change the content in the files.
   - If needed, update the appropriate file in the `src/_data/sidenav/` to reflect your changes.
3. Commit your changes.
3. Push the branch to `segment-docs` and make a PR to master.
    - Include any context you can in the PR: links to ZD tickets, Jira tickets, Paper docs or wiki pages about the project. (If you include a Jira ticket number, Jira can often link directly to the PR.)
3. [Check if you need a review](#most-frequently-asked-question-do-i-need-a-review) and tag @sanscontext (or another member of the docs team). (Github also tags the CODEOWNERS for the path you're editing.)
5. If the reviewers ask for clarifications or edits:
    - make the changes
    - push the new commits to the branch
5. Once you get an approving review and the checks pass, merge your PR.
6. Once you've merged the branch, _delete it_!
7. Once merged, you can track build and deploy process in [buildkite/segment-docs](https://buildkite.com/segment/segment-docs).

### Draft PRs

If you're doing a substantial change and you're going to want to spend a few weeks on it, use [Github's Draft PRs feature](https://help.github.com/en/articles/about-pull-requests#draft-pull-requests), or add `WIP` to the title of your PR. This lets us know to ignore the PR until you're ready (otherwise Laura will ping you weekly about it!).


## How the docs build works

The actual content that you see on segment.com/docs lives in this repository in the `/src/` folder and its subdirectories. Everything outside of that folder is related to the build, styling, tracking, and process for this repo.

These files are built by Jekyll, a Ruby static-site builder, into a full site of static HTML pages. We do not have any interactive or adaptive content on the site at this time.

When you run `make dev` (or `make docs`) on your laptop, Jekyll runs the same program that it uses to create the public site html pages. It builds the page templates, then builds an HTML page for each markdown file (or html file) in the `src` path[**](#underscore-files).

Some of these files include Liquid script, which allows them to load reusable content ("includes"), render fancy HTML styling, and run simple code processes to build programmatic content. As long as the Jekyll process is running on your laptop, you can edit the content of a page in markdown and save it, and Jekyll will detect the change and rebuild that page so you can view it locally. However, this doesn't work if you're editing the page layouts or stylesheets, which are assumed to be static at build time.

When you merge a PR to master, our build system runs the Jekyll program, and automatically publishes the rebuilt HTML files to our web server. (Which is why we *require* that the Buildkite build passes before you merge!)

## Formatting and Prettifying
Some important tips are in the [styleguide](styleguide.md). We also have a (rendering)[Formatting guide](/src/utils/formatguide.md) available so you can see how different formatting looks when rendered.

## Repo structure

All of the content files live in the `/src/` directory. Everything outside of this is related to the build.

Within the `/src/` path, anything that starts with an underscore (like `_data` or `_includes`) is a utility directory, and Jekyll won't render it as a webpage path at build time. (In fact, any files where the name starts with an underscore are dropped from the build.)

### Underscore files

Anything that starts with an `_` is a utility directory of some sort (and Jekyll will skip/not render any file that starts with a `_`).

The most interesting ones are:
- `/src/_includes/content/` This is where all the includes or "partials" - the reusable content - are stored.
- `/src/_data/catalog/` This is where we keep the data we've pulled from the ConfigAPI in structured `yml` files that are used by the build.
- `/src/_data/sidenav/` This is where the navigation structures are. (Several sections in the doc have their own left-nav, making them "microsites".) They're just YML files that we manually update so we have maximum control over what's shown and what's not.


### Images

**Save all images locally! No linking to 3rd party-hosted images!** Images are published to our CDN from the build step, and this means they won't go missing if the hosting service dujour goes out of business.

There are no _enforced_ naming conventions at this time. Files that start with an underscore are ignored by Jekyll. Anything you see with `asset` was dowloaded by a script to migrate it out of Contents.io.

In general, it's a good practice to name images with a description that helps you (& other docs maintainers) figure out where they should go within a page, or within a larger folder of images.

A few possibilities/suggestions:

- **Add a prefix of what file the image appears in**. This is helpful if you have images for multiple pages in the same `images` directory, but breaks down a bit if you reuse images across multiple pages.
- **Give a prefix of the application the screenshot shows**. For example `atom-new-file.png`, `atom-commit-changes.png` etc),
- **Name images to describe a process flow**. For example `checkout-1-add-to-cart.png`, `checkout-2-est-shipping.png` and so on.


### Diagram Library

We have a diagram library in Sketch, which you can use to build pretty, on-brand architecture diagrams, etc. There's a [readme file in that directory](diagram-library/readme.md) with instructions on how to use it.

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
- `rewrite`: defaults to false. This is a legacy frontmatter flag that comes from the old `site-docs` repo, and which labels any destination that was rewritten in ~2018 to a standardized template. It disables the duplicate "connection modes" table that would otherwise show up in the boilerplate content at the end of the page.
- `no-edit`: defaults to false. When true, hide the "Edit in Github/request changes".
- `hide-boilerplate`: defaults to false. When true, none of the content from `destination-footer.md` is appended to the destination page.
- `hide-cmodes`: defaults to false. A renaming of "rewrite" for more clarity, hides the connection modes table in the boilerplate.
- `hide-personas-partial`: defaults to false. When true, hides the section of content from `destination-footer.md` that talks about being able to receive personas data.
- `integration_type`: This is set in the `_config.yml` on three paths to add a noun (Source, Destination, or Warehouse) to the end of the title, and the end of the title tag in the html layout. It also controls the layout and icon for some of these.
- `source-type`: These are only used to supplement when a Cloud App in the sources path doesn't appear in the Config API list, and needs its type explicitly set. It runs some logic in the `cloud-app-note.md` to explain which cloud-apps are object vs event sources.

#### Utility frontmatter
- `published`: defaults to true. Set this to "false" to prevent Jekyll from rendering an HTML page for this file. Good for when you're working on something in the repo but aren't ready to release it yet, and don't want to use a Draft PR.
- `hidden`: omits the file from the `sitemap.xml`, adds a `<meta name="robots" content="noindex" />` to the top of the generated HTML file, and drops it from the convenience script for regenerating the nav.
- `hide-sidebar`: defaults to false. When true, hide the entire right-nav sidebar. Use with `hide-feedback` if you want to disable *all* feedback affordances.
- `hide-feedback`: defaults to false. When true, hide the feedback in both rnav and footer. Good for landing pages.
- `hide_toc`: hides the right-nav TOC that's generated from H2s. Also good for landing pages.
- `landing`: defaults to false. Use this to drop the noun set by `integration_type` from the tab title.
- `redirect_from`: Defaults to null. Takes an array of URLs from the frontmatter in a file, and generates a "stub" page at each URL at build-time. Each stub file redirects to the original file. Use the path from the root of the content directory, for example `/connections/destinations/catalog/` rather than `/docs/connections/destinations/catalog/`. **Note** We are mostly using NGINX redirects for SEO purposes. Approximately quarterly, we'll collect these and add them to NGINX.
- `seo-changefreq`: default: `weekly `. Use the values [in the sitemap spec](https://www.sitemaps.org/protocol.html#xmlTagDefinitions). - sets the `changefreq` tag in the sitemap.xml generator, which tells search crawlers how often to check back.
- `seo-priority`: values from `1.0` to `0.1`, default: `0.5 `. Sets the `Priority` tag in the sitemap

## Navigation

The navigation is built from static yml files, which allows us maximum control over what appears there and when. Find them in `src/_data/sidenav/`

### Sidenav Icons
We have two neat icons that you can add to a bottom-level menu item to mark it with an icon. (If it's a folder/directory, the "expand" carat blocks this icon from appearing.)

- `menu_icon: read-more` to show a book icon - use this to indicate that there's a lot more in this page than meets the eye
- `menu_icon: new-tab` to show an "external link" icon. Use this to indicate that the link in the sidenav is taking out outside the segment.com domain (for example to our API references hosted on Postman)


## Makefile commands

- `dev`: runs `jekyll serve` locally with incremental builds. Useful when updating CSS, JS, or content and you don't want to rebuild every time.
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
