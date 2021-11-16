---
title: Hotjar Destination
rewrite: true
---

[Hotjar](https://help.hotjar.com/hc/en-us) is the fast & visual way to understand your users. It offers a full set of user experience tools: heatmaps, session recordings, forms reporting, funnels, and feedback tools, giving you everything your team needs to uncover user insights and make the right changes.

The Segment Hotjar Destination allows you to both easily install Hotjar on your pages, and send [User Attributes](https://help.hotjar.com/hc/en-us/articles/360038394053-How-to-Setup-User-Attributes-in-4-Steps) information over Hotjar’s [Identify API](https://help.hotjar.com/hc/en-us/articles/360033640653) using the Segment Identify Spec. As of February 3rd, 2020, this allows you to:

* [Target Polls and Incoming Feedback to users based on their User Attributes](https://help.hotjar.com/hc/en-us/articles/360022688554)
* [Lookup and Delete user data based on their User ID](https://help.hotjar.com/hc/en-us/articles/360001749014)

In time, most or all Hotjar features will use User Attributes in some way, with filtering Recordings planned in the first half of 2020.

This document was last updated on February 6, 2020. This destination is maintained by Segment. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.

2. Search for "Hotjar" in the Catalog, select it, and choose which of your Javascript sources to connect the destination to.

3. Add your Hotjar Site ID to your Destination settings. You can find this under Settings and Sites & Organizations in your Hotjar dashboard. It should be a whole number (e.g. 123456).

4. Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Hotjar's tracking snippet, along with your Site ID, onto the page. If you are already using Hotjar, remove Hotjar’s snippet from your code.

Hotjar automatically starts tracking visitors based on the tools you have enabled in your Hotjar dashboard.

## Identify

The Hotjar destination will automatically ingest a User ID, as well as values sent over your Identify spec as [traits](/docs/connections/spec/identify/#traits), as long as [User Attributes are enabled in Hotjar](https://help.hotjar.com/hc/en-us/articles/360038394053-How-to-Setup-User-Attributes-in-4-Steps#step-2-review-your-privacy-requirements-and-enable-user-attributes).

### Nested values or lists

The Hotjar Identify API is unable to ingest values passed as nested objects or lists over your `identify` Spec:

```js
"traits": {
    "name": "Peter Gibbons",
    "email": "peter@example.com",
    "plan": "premium",
    "logins": 5,
    "address": {
      "street": "6th St",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94103",
      "country": "USA"
    }
```

In this example, Hotjar would reject all the values in the `address` field.

This is a recognized limitation of this version of the Hotjar Identify API, and as of February 3rd, 2020, is in the improvements backlog for the API.
