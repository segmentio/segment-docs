---
title: 'Spec: Page'
---

The `page` call lets you record whenever a user sees a page of your website, along with any optional properties about the page. Calling `page` or [`screen`](/docs/connections/spec/screen/) in a Segment [source](/docs/connections/sources/) is one of the first steps to getting started with Segment.

{% include components/reference-button.html href="https://university.segment.com/introduction-to-segment/299969?reg=1&referrer=docs" icon="media/academy.svg" title="Segment University: The Page Method" description="Check out our high-level overview of the Page method in Segment University. (Must be logged in to access.)" %}

**Note: In `analytics.js` a `page` call is included in the snippet by default** just after `analytics.load`. Many destinations require this page event to be fired at least once per page load for proper initialization. You may add an optional `name` or `properties` to the default call, or call it multiple times per page load if you have a single-page application.

Here's the payload of a typical `page` call with most [common fields](/docs/connections/spec/common/) removed:

```json
{
  "type": "page",
  "name": "Home",
  "properties": {
    "title": "Welcome | Initech",
    "url": "http://www.example.com"
  }
}
```

And here's the corresponding JavaScript event that would generate the above payload. If you're using Segment's JavaScript library, the page name and URL are automatically gathered and passed as properties into the event payload:

```js
analytics.page("Retail Page","Home");
```
{% include content/syntax-note.md %}

Beyond the common fields, the `page` call takes the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-page-category.md %}
  {% include content/spec-field-page-name.md %}
  {% include content/spec-field-page-properties.md %}
</table>


## Example

Here's a complete example of a `page` call:

```json
{
  "anonymousId": "507f191e810c19729de860ea",
  "channel": "browser",
  "context": {
    "ip": "8.8.8.8",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36"
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "name": "Home",
  "properties": {
    "title": "Welcome | Initech",
    "url": "http://www.example.com"
  },
  "receivedAt": "2015-02-23T22:28:55.387Z",
  "sentAt": "2015-02-23T22:28:55.111Z",
  "timestamp": "2015-02-23T22:28:55.111Z",
  "type": "page",
  "userId": "97980cfea0067",
  "version": "1.1"
}
```

## Identities

{% include content/spec-identities.md %}

## Properties

Properties are extra pieces of information that describe the page. They can be anything you want.

Segment handles properties with semantic meanings in unique ways. For example, Segment always expects `path` to be a page's URL path, and `referrer` to be the previous page's URL.

You should **only use reserved properties for their intended meaning**.

Reserved properties Segment has standardized:

| Property   | Type           | Description    |
| ---------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | String      | Name of the page. Reserved for future use.     |
| `path`     | String         | Path portion of the page's URL.  Equivalent to [`canonical path`](https://github.com/segmentio/analytics.js/blob/master/analytics.js#L6499-L6503){:target="_blank"} which defaults to [`location.pathname`](https://developer.mozilla.org/en-US/docs/Web/API/Location){:target="_blank"} from the DOM API.      |
| `referrer` | String         | Previous page's full URL.  Equivalent to [`document.referrer`](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer){:target="_blank"} from the DOM API.     |
| `search`   | String         | Query string portion of the page's URL. Equivalent to [`location.search`](https://developer.mozilla.org/en-US/docs/Web/API/Location){:target="_blank"} from the DOM API.     |
| `title`    | String         | Page's title. Equivalent to [`document.title`](https://developer.mozilla.org/en-US/docs/Web/API/Document/title){:target="_blank"} from the DOM API.     |
| `url`      | String         | Page's full URL. Segment first looks for the canonical URL. If the canonical URL is not provided, Segment uses [`location.href`](https://developer.mozilla.org/en-US/docs/Web/API/Location){:target="_blank"} from the DOM API.          |
| `keywords` | Array [String] | A list/array of keywords describing the page's content. The keywords would most likely be the same as, or similar to, the keywords you would find in an HTML [meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#Attributes){:target="_blank"} tag for SEO purposes. This property is mainly used by content publishers that rely heavily on pageview tracking. This isn't automatically collected. |

**Note:** In [analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/), Segment automatically sends the following properties: `title`, `path`, `url`, `referrer`, and `search`.
