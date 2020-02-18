# Segment Docs Contributors Guide

Thanks for helpin' out! We really appreciate it.


## Setting up your environment

Small edits can be done from the Github web interface. However, some edits will require that you use Git. If you're not a git-native, your best bet is likely to use Atom, the Github-created open-source editor.

We've written a bash script to set up the environment for you on a Mac computer. If you're on another platform, please [email us](mailto:docs-feedback@segment.com) or [file a Github Issue](https://github.com/segmentio/segment-docs/issues/new) to request other instructions, and we'll see what we can do.

## Set up on Mac using the Env script

1. Set up your Github config so you have an SSH key on your laptop.
2. Check out this repo.
3. Open your Terminal app and navigate to where you cloned the docs repo.
4. Type `make env` and watch the output.
5. Once the script completes, open Atom and (do some stuff)



## Contributor workflow

TODO;


## Tips and tricks


### Adding links that open in a new window

Use the standard markdown format for links (ex: `[text](https://example.com)`).
To make a link open in a new tab append `[text](https://example.com){:target="_blank"}` to the end.

### Escaping code snippets

Certain code syntax will be interpreted by Jekyll/Liquid as site code. If you're having trouble showing code snippets in the docs, you can wrap the snippet in a `{% raw %}` tag. In the example below, the curly brackets would not render in the docs. The raw tags ensure the code renders properly.

```
{% raw %}
To pass source name in the slack message, format it like so: `{{properties.sourceName}}`
{% endraw %}
```


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

### Redirect to a workspace
Occasionally, you'll want to deep-link into the Segment app to link a reader to a specific page or screen. Previously we'd throw them an URL and say "replace {MY SLUG} with your actual workspace slug", but now you can use the slug of `goto-my-workspace` and the Segment app will redirect them.
https://app.segment.com/goto-my-workspace/destinations/catalog
