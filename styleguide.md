# Style guide

This doc is for keeping track of [style decisions](#style-decisions), [structure decisions](#doc-structure), and [formatting gotchas](#formatting) in the Segment Docs.

## Style decisions

### When to capitalize

Capitalize Segment (obviously ;) ) and Segment product names. For example, "privacy" by itself isn't capitalized, but "Segment Privacy Portal" is. Page titles Other UI text should be in lower case.

Capitalize Sources, Destinations, and Warehouses when referring them as product names (for example: “You can use Sources to…”) but decap them when referring to them generically (“You can connect your warehouse to…”)


### Connection modes
Device-mode, Client Side, Cloud-mode, Server side

We’ve had a lot of confusion in the past due to using device-mode and client-side, and cloud-mode and server-side interchangeably when referring to our Connection Modes. To reduce confusion, we’re standardizing.

There are legitimate uses of both the terms client-side and server-side when referring to things _other than_ our connection modes, so we’re moving to use **Device-mode** and **Cloud-mode** instead. Laura made an initial scrub through to change all instances of “client-side” to “device mode”, but there are some legitimate uses of “server side” in the docs which prevent us doing a full find-and-replace to change those.

Device-mode and Cloud-mode are always hyphenated. They should be capitalized when referring to the mode in abstract (as a product name), but can be decapped when used in running text about a specific destination.


## Doc structure

### Adding Images

**All images should be saved locally! No linking to 3rd party-hosted images!**
As CDN hosting is from the publish side, we shouldn't be worrying about that at the file level.

To add images to a docs page, create an `images` folder for the docs path, save the image to the folder and then reference it in your markdown file. The [Google Analytics destination](/src/connections/destinations/catalog/google-analytics) is a good example.

There are no naming conventions at this time. Anything you see with `asset` was dowloaded by a script to save it from Contents.io. :)

### Signposting

The Segment-App section should contain roughly a page for each page within the web app. If there are in-depth docs about that feature elsewhere, the page should describe what it does at a high-level, and link out to those docs. This gives us a comprehensive UI reference for novice readers that serves as a signpost to the details they may or may not need, and prevents us pulling all of the docs into the Segment-app section.




## Formatting

### Mixed markdown and HTML

You can mix markdown and html in the same file, but you need to be careful to keep these items on separate lines. The one exception to this is

### Code fences and syntax highligher cues

When giving a code example that is more than a line long, use a code block. (For keyboard shortcuts, variables, and commands, use the single-backtick `code format`)

Always use triple-backtick code fences to create a code block. Do not use the three-indent (three tabs/six spaces) mode, as this can conflict with nested list rendering.

When you create a code fence, add a syntax highlighter cue after the first set of backticks - this tells the renderer how to color the text for better readability. We use Rouge, and you can read the [long list of the cues Rouge accepts](https://github.com/rouge-ruby/rouge/wiki/list-of-supported-languages-and-lexers) to find one that works for your code snippet.

### Tables

Tables can be a mix of markdown and HTML, but only they can't be both markdown and HTML on the same line.



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
