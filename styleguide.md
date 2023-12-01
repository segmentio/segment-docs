# Style guide
When contributing to the docs, please try to follow the rules in this style guide. 

## Format for titles and headings
Rule | Description | 
---- | ------- | 
Title casing for article titles | Use title case for article titles and the nav. <br><br> For example, instead of `Data export options` &rarr; use `Data Export Options`. 
Sentence casing for headings | Article headings should be in sentence case, meaning you only capitalize the first word and any product names and proper nouns. For example: <li> Query the User's Event Traits &rarr; Query the user's event traits

## Voice and point of view
Rule | Description | 
---- | ------- | 
Active voice | Write in active voice whenever possible. Instead of referring to something that will happen (`Segment will create`), rephrase it in the present tense (`Segment creates`). <br><br>Other examples: <li> `You'll see a new dialog` &rarr; `A dialog appears`
Third-person | When referring to ourselves as a company, use *Segment*. Avoid the following: <li> we, we've, we're <br><li>our, ours <br><li>us <br><li>let's <br><br>When referring to a third-party, use a name. Avoid the following: <li> their


## Wording rules
Rule | Description | 
---- | ------- | 
No latin abbreviations | <li> Instead of `e.g.` &rarr; use `for example` <br><li> Instead of `i.e.` &rarr; use `that is`, `for example`.
Don't use that &rarr; use this | <li> Instead of `blacklist` &rarr; use `blocklist` <br><li>Instead of `whitelist` &rarr; use `allowlist` <br><li>Instead of `utilize(s)` &rarr; use `use(s)` <br><li> Instead of `leverage(s)` &rarr; use `use(s)` <br><li>Instead of `via` &rarr; use `through`, `using` <br><li>Instead of `drop in` &rarr; use `enter` <br><li>Instead of `&` &rarr; use `and` <br><li>Instead of `login` &rarr; use `credentials`, `account` <br><li>Instead of `setup` &rarr; use `configuration`
Correct use of `might`, `may`, `can` | <li>Use `might` when something could possibly happen. For example, “Depending on your configuration, you **might** see different options.” <br><li>Use `may` to grant a user *permission* to do something. For example, "You **may** add optional notes in this section." <br><li>Use `can` to apply the ability to do something. For example, "You **can** use Personas to send data to your marketing tools."
Weasel Words | Avoid words that don't add substance to a sentence. <br><br> For example: `you can run virtually any type of application...` <br><br> The word **virtually** does not contribute to the meaning of the sentence. <br><br> If you're going to add an adverb or adjective to a sentence, make sure it contributes to something. 
Contractions | Use contractions. For example, `can't`, `won't`, `haven't`
Using `click` or `select` | Use **click** when a user should take action on a single item. <br><br>Use **select** when the user should pick an item from a list. 
The use of `At this time`, `Currently` | Generally, don't use such words/phrases, except when the feature is half rolled out or in beta. 
Projecting ease of something | Avoid trying to convey the ease with which something can be accomplished. For example: <li> `You can easily...` <br><li> `With this simple...` <br><br>It's not up to us to determine how difficult or easy someone will find a task. 


## Formatting
Rule | Description | 
---- | ----------- |
Field names in any app | **Bold** the use of field names.
Hyperlinks | Link to the noun or topic of the article rather than `here`. 
Numbers | Use digits/numerals in all cases, except at the beginning of a sentnce. <br><br> For example, instead of `There are five options to choose from.` &rarr; use `There are 5 options to choose from.`
Entered text in the app | Use `code format`
Capitalization | Capitalize Segment and Segment product names. For example, "privacy" by itself isn't capitalized, but "Segment Privacy Portal" is. Page titles and other UI text should be in lower case. <br><br>Capitalize the words "Sources", "Destinations", and "Warehouses" when referring them as product names (for example: “You can use Sources to…”) but decap them when referring to them generically (“You can connect your warehouse to…”)
`we` and `they` | Avoid using `we` and `they`. Be explicit about naming who is being referenced. Because Segment has such a large footprint of documentation around third-party integrations, it's important to be very clear about who "we" are in any given part of the doc. Instead of using "we", your should refer to our software or processes in the third person: "Segment creates..." "Segment sends..."
Sub-bullets/sub-lists | If there are mutliple tasks within a step, break it up into a sub-list. A single task should be no longer than 3 sentences. 
FAQs | Use H4s for FAQs. Don't use the liquid formatting. <b><br>When naming the FAQ section, use `FAQ` instead of `Frequently Asked Questions`. 
External links | When inserting links, follow this format: `[link text](https://google.com){:target="blank"}` <br>Make sure the `{:target="blank"}` is included after the link. This ensures that the link to the external site opens up in a new tab to avoid taking users away from the docs site. 
Code blocks | When giving a code example that is more than a line long, use a code block. (For keyboard shortcuts, variables, and commands, use the single-backtick `code format`). Always use triple-backtick code fences to create a code block. Do not use the three-indent (three tabs/six spaces) mode, as this can conflict with nested list rendering.


## Segment Specific Terms
Rule | Description | 
---- | ----------- |
Libraries vs SDKs | Segment Source libraries are libraries, not SDKs. The bundled destination dependencies are SDKs. <br><br>Technically, an SDK often contains a hardware component, or is closely tied to a unique developer key or development-only hardware device - for example, an PlayStation SDK includes a software license key and test hardware linked to that account, an Apple SDK includes a developer key. A library is any modularlized piece of code that can be added to or invoked by a larger project.
Styling Segment Methods | When you refer to a method *outside* of code, use: <li>Page call, Identify call <br><br>Avoid styling like inline code: <li> Page() method <br><li> `page()` <br><li> `.identify()` <br><li> `Identify` call
Connection modes | Device-mode and Cloud-mode are always hyphenated. They should be capitalized when referring to the mode in abstract (as a product name), but can be decapped when used in running text about a specific destination. <br><br>We’ve had a lot of confusion in the past due to using device-mode and client-side, and cloud-mode and server-side interchangeably when referring to our Connection Modes. There are legitimate uses of both the terms client-side and server-side when referring to things _other than_ our connection modes, so we’re moving to use **Device-mode** and **Cloud-mode** instead.


## Images
Rule | Description | 
---- | ----------- |
Screenshots | Use screenshots sparingly. Screenshots are hard to maintain and don't add much value. Confirm that they are essential to understand the feature you're documenting. <br><br>PR reviewers should monitor for screenshots and help determine if they are necessary. <br><br> Save all images locally and don't link them to 3rd party-hosted images. To add images to a docs page, create an `images` folder for the docs path, save the image to the folder and then reference it in your markdown file. The [Google Analytics destination](/src/connections/destinations/catalog/google-analytics) is a good example.
Image captions | Provide brief image captions that can be helpful for accessibility. Follow this format for including images with captions: `![description of image goes here](resource path of image file goes here)`

## Troubleshooting Formatting

### Restarting ordered (numbered) lists

We have some fairly complex CSS, and lists with lots of "stuff" in them. Normally, the way you make Markdown include something as part of a list item is to indent it the same number of places as the number.  Unfortunately Markdown _also_ maintains backwards compatibility with an archaic method of invoking a code block, which is to indent it four spaces or two tabs. You can probably guess how this works out...

On top of this, some of the Premonition callouts we use, for some reason, break list ordering. So you can't add an "info" box inside a running list. (Boooo.)

To get around this, you can let the previous list item end whereever if needs to, then create an entire new ordered list with specific HTML to allow you to override the start number.

```html
<ol style="counter-reset: none;">
  <li value="5" markdown=1>
  <!--list item contents here-->
  </li>
  <li value="6" markdown=1>
  <!--list item contents here-->
  </li>
</ol>

```

Do this with great caution, and only when absolutely necessary. Because you're explicitly setting the numbers, they won't update if you add or delete a step in the auto-numbered list above.


### Tables

Tables can be a mix of markdown and HTML, but they can't be both markdown and HTML on the same line.

Tables in HTML can include html formatting, OR markdown formatting, but not both in the same cell. We built a ruby hook that adds a `markdown=1` cue to all `<td>` elements at build time, which allows Kramdown to interpret and render their content normally. This doesn't apply to `<th>` tags, and it also means that you can have (for example) `<p>` paragraph markers inside a table cell.




