---
title: Tag Injector Destination
hide-dossier: true
hidden: true
hide-cmodes: true
---

Segment has built a Tag Injector Destination to give Segment users the flexibility needed to load and configure client-side tools.

_**NOTE:** Tag Injector is only available for select customers at this time._

## Getting Started

{% include content/connection-modes.md %}

1. Once you have access, with the link provided confirm the Source you'd like to connect to.
2. You have the following configuration options which will manipulate the page at runtime:
  - **URL**: A URL to the JavaScript code to load on the page as the `src` attribute of the `<script>` tag.
  - **Merge Variable**: A global variable that can be modified or created at runtime.
3. You can also configure global variables, which the Tag Injector can manipulate in a user-specified way using Merge Variable tags. These Merge Variable tags support two fields:
  - Variable Name indicates what global variable to operate on.
  - Tag Value specifies what values should be merged into the global variable.
4. For each Merge Variable tag, the Tag Injector will inject code which will have the behavior as follows. For this example, let us call the global variable with the name specified in Variable Name _the global variable to modify_.
  - If the global variable to modify does not yet exist, it is created and initialized to the value described in Tag Value.
  - If the global variable to modify already exists, its value is merged with the value described in Tag Value. This merging process will be implemented using a custom function.


## Best Practices

**Important**: This Destination allows you to inject Javascript onto a page where you have the Tag Injector enabled on the source loading `analytics.js`. Be sure that the script you have configured performs the desired task and does not break your page. You should mitigate any risks by assuring the script injected using the Tag Injector will be QA'd for correctness and security.

## FAQ

### How do I know what tags were injected by the Tag Injector?

You will be able to distinguish tags loaded using Segment's Tag Injector through the `data-injected-by="segment"` attribute on the tag.

### Script injection location and ordering

The Tag Injector will always inject the configured tags as `<script>` elements inserted into the document's `<head>`. These `<script>` elements will be inserted in the order they are defined in the Tag Injector settings.
