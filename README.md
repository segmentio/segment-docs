# segment-docs Readme!

Hello, yes, this is docs.

![](docs.png)

Here's what's here!

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

### Intelligent content
Destinations: These files also include "intelligent partials", which are sections of doc that are built conditionally, or using/based on information from the metadata service. This is *awesome* and like the holy grail of docs systems, so please keep the metadata up to date. Check out the `_includes/content/integration-foot.md` to see this in action. This uses Liquid scripting and pulls from the catalog metadata.


## Formatting and Prettifying
Some important tips! We also have a Styleguide available so you can see how different formatting looks when rendered.

### Adding Images

**All images should be saved locally! No linking to 3rd party-hosted images!**
As CDN hosting is from the publish side, we shouldn't be worrying about that at the file level.

To add images to a docs page, create an `images` folder for the docs path, save the image to the folder and then reference it in your markdown file. The [Google Analytics destination](/src/connections/destinations/catalog/google-analytics) is a good example.

There are no naming conventions at this time. Anything you see with `asset` was dowloaded by a script to save it from Contents.io. :)

### Adding links

Use the standard markdown format for links (ex: `[text](https://example.com)`).
To make a link open in a new tab append `[text](https://example.com){:target="_blank"}` to the end.

### Escaping code snippets

Certain code syntax will be interpreted by Jekyll/Liquid as site code. If you're having trouble showing code snippets in the docs, you can wrap the snippet in a `{% raw %}` tag. In the example below, the curly brackets would not render in the docs. The raw tags ensure the code renders properly.

```
{% raw %}
To pass source name in the slack message, format it like so: `{{properties.sourceName}}`
{% endraw %}
```

## Frontmatter

Each Markdown file in the docs can have frontmatter (also and formerly known as "metadata") associated with it at the top of the file. (For clarity, we call it "Frontmatter" to prevent confusion with the Segment "Metadata service".

It'll look something like this:

```text
    ---
    title: Analytics.js Library
    hide-feedback: false
    ---
```

Each piece of frontmatter does something special:
- `published`: defaults to true. Set this to "false" to prevent Jekyll from rendering an HTML page for this file. Good for when you're working on something in the repo but aren't ready to release it yet, and don't want to use a Draft PR.
- `beta`: default false. When true, show an "in beta" warning in the page layout (see the warning in `_includes/content/beta.md`)
- `partner-contact`: defaults to null. Used to change the beta notice to include a partner/owner email address as a mailto link for integrations that aren't Segment-owned.
- `hide-feedback`: defaults to false. When true, hide the feedback footer. Good for legal and landing pages.
- `hidden`: omits the file from the `sitemap.xml`, adds a `<meta name="robots" content="noindex" />` to the top of the generated HTML file, and drops it from the convenience script for regenerating the nav.
- `rewrite`: defaults to false. This is a legacy frontmatter flag that comes from the old `site-docs` repo, and which labels any destination that was rewritten in ~2018 to a standardized template.
- `hide_toc`: hides the right-nav TOC that's generated from H2s
- `integration_type`: This is set in the `_config.yml` on three paths to add a noun (Source, Destination, or Warehouse) to the end of the title, and the end of the title tag in the html layout. It also controls the layout and icon for some of these.
- `landing`: defaults to false. Use this to drop the noun set by `integration_type` from the tab title.
- `redirect_from`: **Note** We are mostly using NGINX redirects. Defaults to null. Takes an array of URLs from the frontmatter in a file, and generates a "stub" page at each URL at build-time. Each stub file redirects to the original file.
- `seo-changefreq`: default: `weekly `. Use the values [in the sitemap spec](https://www.sitemaps.org/protocol.html#xmlTagDefinitions). - sets the `changefreq` tag in the sitemap.xml generator, which tells search crawlers how often to check back.
- `seo-priority`: values from `1.0` to `0.1`, default: `0.5 `. Sets the `Priority` tag in the sitemap

### Sidenav Icons
We have two neat icons that you can add to a bottom-level menu item to mark it with an icon. (If it's a folder/directory, the "expand" carat blocks this icon from appearing.)

- `menu_icon: read-more` to show a book icon - use this to indicate that there's a lot more in this page than meets the eye
- `menu_icon: new-tab` to show an "external link" icon. Use this to indicate that the link in the sidenav is taking out outside the segment.com domain (for example to our API references hosted on Postman)



### Syntax highlighting

We're using Rouge, set in the `_config.yml`. It's now default for Jekyll 3 and later, so 🎉.
A list of the cues Rouge accepts can be found [here](https://github.com/rouge-ruby/rouge/wiki/list-of-supported-languages-and-lexers).

### Note Blocks
We're using [Premonition](https://github.com/lazee/premonition) for our Note blocks. This is stock right now, with four styles: `note`, `info`, `success`, `warning`, and `error`.

You'd write a block like this:
```md
> warning "I am a warning"
> The body of the warning goes here. Premonition allows you to write any `Markdown` inside the block.
```

Notes *must* include a `[]` in the heading/title, even if it's empty.
You can see how to write them in the `styleguide.md`, and see how they render at [https://segment.build/docs/styleguide](https://segment.build/docs/styleguide)



## Makefile commands

- `dev`: runs `jekyll serve` locally with incremental builds. Useful when updating CSS, JS, or content and you don't want to rebuild everytime.
- `build`: Builds the site docs. Used by CI to publish the docs to staging and production
- `catalog`: Pulls in the latest catalog data from the Platform API and saves it in the respective data files. Requires an API key to be passed in env via PLATFORM_API_TOKEN
- `sidenav`: Builds the side navs for 'main', 'legal', 'api', 'partners' and stores the output in `/src/_data/sidenav-auto/`. This output isn't used for the actual build.
- `typewriter`: pulls in the current state of the Docs tracking plan for implementing Segment tracking
- `seed`: copies all example data files out of the `_templates` directory and puts them in the `_data` directory. Useful if you don't have a way to set up an API key.
- `clean`: removes all build artifacts
- `clean-deps`: removes all downloaded `gems` and `node_modules`
- `deps`: installs the required `gems` and `node_modules`


- docker-build: runs `make build` on a docker host.
- docker-dev: runs `make dev` on a docker host.


## Troubleshooting Paper Exports

Many of these docs were exported from Paper, which means that they'll have some quirks to sort out.

### Endumben-ing
Paper uses smart-quotes and smart apostrophes, which often can break syntax-sensitive formatting. You can replace them with "dumb" or straight quotes. The characters you're going to want to look for are...

’ ‘ “ ”  If you "change all" in Atom, you'll remove these examples so please revert changes to this file. ;)

Note that these won't always render in Github, so you'll have to make this change using Atom or another text editor.

If the examples get removed you can also type these on a Mac by typing
- Option + [
- Option + Shift + [
- Option + ]
- Option + Shift + ]

### Headings vs Titles

Our titles are our H1s, so you can remove a top-line H1 if if shows up, and demote all following ones. (This assumes you're using heading formats semantically and not just for formatting. :P )

### Image captions

What Paper uses as the "caption" is actually what's specified as the "alt text", meaning what a screen-reader would vocalize. It ends up inside the "image" declaration tags.

```md
![alt text goes here](resource path goes here)
 ```
### Code-block cleanup

By default, Paper uses an old style of markdown that allows you to start a code block by indenting the block. This is rendered okay on our end, but can screw up your code's indentation.

Instead, de-indent your code (shift-tab), and add a code-fence of three backticks at the top and bottom.

If you know what language it's in, you can also add a "cue" to the first codeblock, which improves how the syntax highlighter renders it (assuming it knows how to format that specific language).


## Developer information


### Layouts
`default.html` is the container through which all the individual other layouts (currently one, `page.html`) are built to have the right title, seo, etc.

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

You create your own token via the Access Management Page. Feel free to use [`segment-engineering`](https://app.segment.com/segment-engineering/settings/access-management) or [`segment_prod`](https://app.segment.com/segment_prod/settings/access-management). Once you have the token, set the value in the `.env` file.


#### Catalog Data + Doc Links
By default, the links on the catalog page and respective sidenavs will attempt to automagically set hyperlinks, for actual doc file, at the path `connections/:type/:slug`. However, given the transitory state of Docs V2, these links might 404 since the respective doc might be in a different directory.

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
