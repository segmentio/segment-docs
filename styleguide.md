# Style guide

This doc is for keeping track of [style decisions](#style-decisions), [structure decisions](#doc-structure), and [formatting gotchas](#formatting) in the Segment Docs.

## Style decisions

## General text style

- Titles and headings should be in sentence case, meaning you only capitalize the first word, and any product names and proper nouns.

- UI items are described by their text label in **Bold**. We don't add an explicit reference to what type of affordance it is (button, toggle, etc) unless needed for clarity.  "Click **Send**." rather than "Click the **Send**  button."

- Use single-backtick `code format` for variables, for commands or values that need to be entered by the user, and the names of methods or calls when referring to them in context of an implementation (for example: "You'll make an identify call to capture this information" vs "In your code, edit the `identify` call...").

- One-line or less of code can be formatted using single-backtick "code format". For more than one line of code, use a code block.

- Code blocks must use the triple-backtick format, and must include a syntax highlighter cue (even if that cue is "text" or "none".)

### Use Active Voice / Write in the Present / Yes We Do

Write in the active voice.
This one is harder to encapsulate.

Instead of saying "Segment will create..." use "Segment creates..."
Instead of saying "You should see your data in (x) minutes..." use "Your data arrives within..."
Instead of saying "You will see a new dialog with your key..." use "A diaglog appears and displays your key..."

### We and they

TL:DR: Avoid the words "we" and "they". Be explicit about naming who is being referenced.

Because Segment has such a large footprint of documentation around third-party integrations, it's important to be very clear about who "we" are in any given part of the doc. Instead of using "we", your should refer to our software or processes in the third person: "Segment creates..."  "Segment sends..."

This is especially important with destination partners. Instead of writing "we create a new table schema and they ingest it" write "Segment Personas creates a new table schema, and FancyIntegration ingests it."

### Might, may, can

These three often have overlapping understandings of meaning, but in technical docs it's good to be *very* clear about which one to use.

- **Might** means a thing could possibly happen. Use this for example, when you're describing an unknown environment: "You might see additional options depending on your pricing plan." Or when describing something where we don't necessarily know what is needed or what will happen: "Depending on your configuration, you might..." or "You might want to ..."

- **May** grants permission to the user to do something. "You may omit this value."

- **Can** implies ability to do something. "You can use..."  Or "If your implementation needs it, you can..."

### Styling the Segment Methods

We've traditionally been pretty scattered about how we describe the Segment Methods in our running text. In general: capitalize it when referring to the method in general ("You use a Page call to..."), but capitalization is optional when referring to a specific call in an implementation or code snippet ("The page call on line 38...")

Omit the empty parentheses. :)

This styling guidance applies to any prose mention of the methods that is *not* styled as code, including fenced code blocks, and longer phrases contained in code-format backtics.

✅
- Page call, Page method
- Identify call, Identify method
- ...etc

👎
- Page() method
- `page()`
- `.identify()`
- `Identify` call




### When to capitalize

Capitalize Segment (obviously ;) ) and Segment product names. For example, "privacy" by itself isn't capitalized, but "Segment Privacy Portal" is. Page titles Other UI text should be in lower case.

Capitalize the words "Sources", "Destinations", and "Warehouses" when referring them as product names (for example: “You can use Sources to…”) but decap them when referring to them generically (“You can connect your warehouse to…”)

Other items that can be capitalized:
- Segment Methods (when referring to the Spec methods collectively)
- Page, Screen, Track, Identify, Group, Alias calls, when referring to them as a class of calls.

Don't capitalize these:
- partners
- write key

### Connection modes
Device-mode, Client Side, Cloud-mode, Server side

We’ve had a lot of confusion in the past due to using device-mode and client-side, and cloud-mode and server-side interchangeably when referring to our Connection Modes. To reduce confusion, we’re standardizing.

There are legitimate uses of both the terms client-side and server-side when referring to things _other than_ our connection modes, so we’re moving to use **Device-mode** and **Cloud-mode** instead. Laura made an initial scrub through to change all instances of “client-side” to “device mode”, but there are some legitimate uses of “server side” in the docs which prevent us doing a full find-and-replace to change those.

Device-mode and Cloud-mode are always hyphenated. They should be capitalized when referring to the mode in abstract (as a product name), but can be decapped when used in running text about a specific destination.

### Use this not that

- Don't use characters like ampersand (`&`) -> Use the word "and".
- Don't use "ie" or "eg", write out "for example".
- Don't use the word "via". Instead use the words "using", "with", or sometimes "through" as appropriate.
- Setup is one word describing a noun ("your recording studio setup") which we should more properly call "configuration."  "Set up" is an action, and requires a space.
- "Login" is a noun, and we should use "credentials", "account", or similar. "Log in" is an action and requires a space.
- Replace big words like leverage, utilize, utilizing -> Use "use"

## Doc structure

### Adding Images

**All images should be saved locally! No linking to 3rd party-hosted images!**
As CDN hosting is from the publish side, we shouldn't be worrying about that at the file level.

To add images to a docs page, create an `images` folder for the docs path, save the image to the folder and then reference it in your markdown file. The [Google Analytics destination](/src/connections/destinations/catalog/google-analytics) is a good example.

There are no naming conventions at this time. Anything you see with `asset` was dowloaded by a script to save it from Contents.io. :)

### Signposting

The Segment-App section should contain roughly a page for each page within the web app. If there are in-depth docs about that feature elsewhere, the page should describe what it does at a high-level, and link out to those docs. This gives us a comprehensive UI reference for novice readers that serves as a signpost to the details they may or may not need, and prevents us pulling all of the docs into the Segment-app section.


## Troubleshooting Formatting


### Mixed markdown and HTML

You can mix markdown and html in the same file, but you need to be careful to keep these items on separate lines. The one exception to this is

### Code fences and syntax highligher cues

When giving a code example that is more than a line long, use a code block. (For keyboard shortcuts, variables, and commands, use the single-backtick `code format`)

Always use triple-backtick code fences to create a code block. Do not use the three-indent (three tabs/six spaces) mode, as this can conflict with nested list rendering.

When you create a code fence, add a syntax highlighter cue after the first set of backticks - this tells the renderer how to color the text for better readability. We use Rouge, and you can read the [long list of the cues Rouge accepts](https://github.com/rouge-ruby/rouge/wiki/list-of-supported-languages-and-lexers) to find one that works for your code snippet.

### Tables

Tables can be a mix of markdown and HTML, but only they can't be both markdown and HTML on the same line.

Markdown tables are built on a single line per table row, and so have to be pretty much 100% markdown. Markdown tables aren't fun, but you can install the Atom `markdown-table-editor` package which makes them easier to work with.

Tables in HTML can include html formatting, OR markdown formatting, but not both in the same cell. We built a ruby hook that adds a `markdown=1` cue to all `<td>` elements at build time, which allows Kramdown to interpret and render their content normally. This doesn't apply to `<th>` tags, and it also means that you can have (for example) `<p>` paragraph markers inside a table cell.

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

If you want to preserve this as alt-text, awesome. However, if you want to use this as a "caption", you'll have to copy and paste that text below the image. You can put it in italic format if you'd like.

### Code-block cleanup

By default, Paper uses an old style of markdown that allows you to start a code block by indenting the block. This is rendered okay on our end, but can screw up your code's indentation.

Instead, de-indent your code (shift-tab), and add a code-fence of three backticks at the top and bottom.

If you know what language it's in, you can also add a "cue" to the first codeblock, which improves how the syntax highlighter renders it (assuming it knows how to format that specific language). See the [section on code fences](#code-fences-and-syntax-highligher-cues) above for more details.
