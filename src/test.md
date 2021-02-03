---
description: Smoketest page
title: Testing page
hide_from_sitemap: true
toc_min: 1
toc_max: 2
beta: true
deprecated: true
changefreq: daily
seo-priority: 1.0
layout: page
redirect_from:
- /test/test
- /guides/testing
published: false
---

> note "This is a note"
> Some note text foo bar baz



We hope you like their pie.

Welcome to the documentation test page!

This is a demo of components, tags, styles, tools, and strategies we use for the
docs. We explain the code behind the published page and demo the effects. So, if
you want to see, for example, how admonitions and notes are coded in markdown,
read the section on [Admonitions (notes)](/test.md#admonitions-notes) on the web
published page and study the pre-processed `test.md` to see how they are
implemented. The Docker documentation team uses this page as "note to self"
reminders. Since we invite docs suggestions and contributions from the
community, we've always made the test page generally available.

If you want to understand how something in the docs is coded, use this page is
as a resource.

If, in the course of making docs updates and suggestions, you develop a new
strategy or component for the docs, feel free to add a demo and explanation to
this test page and submit a PR for it so we can review and discuss it.

Cool? Let's dive in!

# Heading 1

Our pages use the H1 heading for the Title of the page, as set in the `title:` frontmatter. It's included in this page just so you can see and test the formatting. :)

via

 We have included it here to show all heading levels, and
set front matter as `toc_min: 1` so that it shows in the navigation bar (on-page
topics).

## Heading 2

By default, this is the highest heading included in the right navigation bar. To
include more heading levels, set `toc_min: 1` in the page's front-matter (as is
done on this `test.md` page). You can go all the way to 6, but if `toc_min` is
geater than `toc_max` then no headings are shown.

### Heading 3

This is the lowest heading included in the right-nav, by default. To include
more heading levels, set `toc_max: 4` in the page's front-matter. You can go all
the way to 6.

#### Heading 4

This heading is not included in the right-nav. To include it set `toc_max: 4` in
the page's front-matter.

##### Heading 5

This heading is not included in the right-nav. To include it set `toc_max: 5` in
the page's front-matter.

###### Heading 6

This is probably too many headings. Try to avoid it.

This heading is not included in the right-nav. To include it set `toc_max: 6` in
the page's front-matter.

## Typography

Plain block of text.

<!-- vale off -->

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.
<!-- vale on -->

**Inline text styles**:

- **bold**
- _italic_
- ***bold italic***
- ~~strikethrough~~
- <u>underline</u>
- _<u>underline italic</u>_
- **<u>underline bold</u>**
- ***<u>underline bold italic</u>***
- `monospace text`
- **`monospace bold`**

## Links and images

### Links

- [a markdown link](https://docker.com/)
https://github.com/docker/docker.github.io/tree/master/docker-cloud/images
- [a markdown link that opens in a new window](https://segment.com/){: target="_blank" class="_" }
  (the `class="_"` trick prevents Atom from italicizing the whole rest of the file until it encounters another underscore.)

- [a markdown link to a custom target ID](#custom-target-id)

- <a href="https://segment.com/">an HTML link</a>

- <a href="https://segment.com/" target="_blank" class="_">an HTML link that opens in a new window</a>

### Images

- A small cute image: ![a small cute image](/images/database.svg)

- A small cute image that is a link. The extra newline here makes it not show
  inline:

  [![a small cute image](/images/database.svg)](https://www.segment.com/)

  - A big wide image: ![a pretty wide image](/images/segment-diagram.png)

- The same as above but using HTML: <img src="/images/segment-diagram.png" alt="a pretty wide image using HTML"/>

[Some Bootstrap image classes](https://v4-alpha.getbootstrap.com/content/images/)
might be interesting. You can use them with Markdown or HTML images.

- An image using the Bootstrap "thumbnail" class: ![an image as a thumbnail](/images/database.svg){: class="img-thumbnail" }

- The same one, but using HTML: <img class="img-thumbnail" src="/images/footer_moby_icon.png" alt="a pretty wide image as a thumbnail, using HTML"/>

## Videos

You can add a link to a YouTube video like this:

[Drop Events using Destination Filters](https://www.youtube.com/watch?v=47dhAF1Hoco "Drop Events using Destination Filters"){:target="_blank" class="_"}

## Lists
<!-- vale off -->
- Bullet list item 1
- Bullet list item 2
* Bullet list item 3

1.  Numbered list item 1. Two spaces between the period and the first letter
    helps with alignment.

2.  Numbered list item 2. Let's put a note in it.

    >**Note**: We did it!

3.  Numbered list item 3 with a code block in it. You need the blank line before
    the code block happens.

    ```bash
    $ docker run hello-world
    ```

4.  Numbered list item 4 with a bullet list inside it and a numbered list
    inside that.

    - Sub-item 1
    - Sub-item 2
      1.  Sub-sub-item 1
      2.  Sub-sub-item-2 with a table inside it because we like to party!
          Indentation is super important.

          |Header 1 | Header 2 |
          |---------|----------|
          | Thing 1 | Thing 2  |
          | Thing 3 | Thing 4  |
<!-- vale on -->

## Tables

Some tables in markdown and html.

| Permission level                                                         | Access                                                       |
|:-------------------------------------------------------------------------|:-------------------------------------------------------------|
| **Bold** or _italic_ within a table cell. Next cell is empty on purpose. |                                                              |
|                                                                          | Previous cell is empty. A `--flag` in mono text.             |
| Read                                                                     | Pull                                                         |
| Read/Write                                                               | Pull, push                                                   |
| Admin                                                                    | All of the above, plus update description, create and delete |

The alignment of the cells in the source doesn't really matter. The ending pipe
character is optional (unless the last cell is supposed to be empty). The header
row and separator row are optional.

If you need block-level HTML within your table cells, such as multiple
paragraphs, lists, sub-tables, etc, then you need to make a HTML table.
This is also the case if you need to use rowspans or colspans. Try to avoid
setting styles directly on your tables! If you set the width on a `<td>`, you
only need to do it on the first one. If you have a `<th>`, set it there.

> **Note**: If you need to have **markdown** in a **HTML** table, add
> `markdown="span"` to the HTML for the `<td>` cells that contain the Markdown.

<table>
  <tr>
    <th width="50%">Left channel</th>
    <th>Right channel</th>
  </tr>
  <tr>
  <td>This is some test text. <br><br>This is more <b>text</b> on a new line. <br><br>Lorem ipsum dolor <tt>sit amet</tt>, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </td>
    <td>This is some more text about the right hand side. There is a <a href="https://github.com/docker/docker-ce/blob/master/components/cli/experimental/README.md" target="_blank" class="_">link here to the Docker Experimental Features README</a> on GitHub. In tables, links need to be `<a href="..."></a>`. <br><br>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
  </tr>
  <tr>
  <td>
  <p><a class="button outline-btn" href="/">Go to the docs!</a></p>
  <p><a href="/"><font color="#BDBDBD" size="-1">It is dark here. You are likely to be eaten by a grue.</font></a></p>
  </td>
  <td>
  <p><a class="button outline-btn" href="/">Go to the docs!</a></p>
  <p><a href="/"><font color="#BDBDBD" size="-1">It is dark here. You are likely to be eaten by a grue.</font></a></p>
  </td>
  </tr>
</table>

## Mixing Markdown and HTML

You can use <b>span-level</b> HTML tags within Markdown.

You can use a `<br />` tag to impose an extra newline like here:<br />

You can use entities like `&nbsp;` to keep a&nbsp;bunch&nbsp;of&nbsp;words&nbsp;together&nbsp;.

<center>
You can use block-level HTML tags too. This paragraph is centered.
</center>

Keep reading for more examples, such as creating tabbed content within the
page or displaying content as "cards".


## Code blocks

You can tell Rouge how to style your code block with a "cue". If you leave off the cue, it tries to guess and usually gets it wrong. These are just a few of the available cues.

### Raw, no highlighting

The raw markup is needed to keep Liquid from interpreting the things with double
braces as templating language.

{% raw %}
```none
none with raw
$ some command with {{double braces}}
$ some other command
```
{% endraw %}

### Raw, Bash

{% raw %}
```bash
bash with raw
$ some command with {{double braces}}
$ some other command
```
{% endraw %}

### Bash

```bash
$ echo "deb https://packages.docker.com/1.12/apt/repo ubuntu-trusty main" | sudo tee /etc/apt/sources.list.d/docker.list
```

### Go

```go
incoming := map[string]interface{}{
    "asdf": 1,
    "qwer": []interface{}{},
    "zxcv": []interface{}{
        map[string]interface{}{},
        true,
        int(1e9),
        "tyui",
    },
}
```
