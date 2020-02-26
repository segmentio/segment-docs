# segment-docs Readme!

Hello, yes, this is docs.

![](docs.png)

Here's what's here!

We are now spilitting out the Readme into three parts:
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

Check out this repo, navigate to it, run `make env` in your terminal.
This will install everything you need to edit the docs, and also to `make dev` and run the docs locally.

### JUST Editing content?

You can make a limited range of edits from the Github site! Hooray! But this system works best if you clone it locally so you can run test builds.

#### Recommended editors

Laura uses Atom because it's got the best merge conflict resolution interface out there. If you use Atom, there are some really helpful packages available for authoring in Markdown.
  - language-markdown
  - markdown-preview
  - markdown-table-editor
  - markdown-toc

Some folks use Sublime. (Please add your tips and comments here if you do!)


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
     - You can use the `make sidenav` command to generate a yml file from the current structure of your docs, which you can then use to update the nav. This command does not overwrite the nav, you need to manually copy and paste the important bits in.
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

## Repo structure

All of the content files live in the `/src/` directory. Everything outside of this is related to the build.

### Utility files
Anything that starts with an `_` is a utility directory of some sort (and Jekyll will skip/not render any file that starts with a `_`).

The most interesting ones are:
- `/src/_includes/content/` This is where all the partials - the reusable content - are stored.
- `/src/_data/catalog/` This is where we keep the data we've pulled from the ConfigAPI in some structured `yml` files that are used by the build.
- `/src/_data/sidenav/` This is where the navigation structures are. (Several sections in the doc have their own nav, making them "microsites".) They're just YML files that we manually update so we have maximum control.

### Content files
There are folders for each of the top level products, and those folders might also contain topics that are related to that product area (for example the Privacy Portal section also contains GDPR/CCPA docs).

For the Connections product, the section is divided into Sources, Destinations, and Warehouses, with general accessory topics at the folder root. (More specific accessory topics are in each sub directory.) Each also contains a `catalog` directory, which contains all the directories with information about specific integrations. The top-level of this folder (the `index.md`) is a pretty "catalog" page which gives a tile-like view by category, suitable for browsing. It pulls the logo for these tiles from the path for the integration in the metadata service.

### Programmatic content

Beta notices: Anything with `beta: true` in front of it currently adds the content of `beta-note.md` at the top of the file.

Destinations: These files also include "intelligent partials", which are sections of doc that are built conditionally, or using/based on information from the metadata service. This is *awesome* and like the holy grail of docs systems, so please keep the metadata up to date. Check out the `_includes/content/integration-foot.md` to see this in action. This uses Liquid scripting and pulls from the catalog metadata.

Sources: The Cloud-apps currently have information about if the source is an object or event source, based on the `type` data from the ConfigAPI that's copied into `sources.yml`.


## Frontmatter

Each Markdown file in the docs can have frontmatter (also and formerly known as "metadata") associated with it at the top of the file. (For clarity, we call it "Frontmatter" to prevent confusion with the Segment "Metadata service".

It'll look something like this:

```text
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
