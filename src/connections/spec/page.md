---
title: 'Spec: Page'
---

The `page` call lets you record whenever a user sees a page of your website, along with any optional properties about the page. Calling `page` or [`screen`](/docs/connections/spec/screen/) in one of our [sources](/docs/connections/sources/) is one of the first steps to getting started with Segment.

{% include components/media-icon.html href="https://university.segment.com/introduction-to-segment/299969?reg=1&referrer=docs" icon="media/icon-academy.svg" title="Segment University: The Page Method" content="Check out our high-level overview of the Page method in Segment University. (Must be logged in to access.)" %}

**Note: In `analytics.js` a `page` call is included in the snippet by default** just after `analytics.load`. We do that because you **must** call this method at least once per page load. However, you can choose to add an optional `name` or `properties` to the default call, or call it multiple times if you have a single-page application.

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

And here's the corresponding Javascript event that would generate the above payload. If you're using Segment's Javascript library, the page name and URL are automatically gathered and passed as properties into the event payload:

```js
analytics.page("Home");
```

Beyond the common fields, the `page` call takes the following fields:

<table>
  {% include content/spec-table-header.md %}
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

We've reserved some properties that have semantic meanings, and we handle them in special ways. For example, we always expect `path` to be the URL path of a page, and `referrer` to be the URL of the previous page.

You should **only use reserved properties for their intended meaning**.

Reserved properties we have standardized:

<table>
  <tr>
    <td>**Property**</td>
    <td>**Type**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>`name`</td>
    <td>String</td>
    <td>Name of the page.

This is reserved for future use.

    </td>
  </tr>
  <tr>
    <td>`path`</td>
    <td>String</td>
    <td>Path portion of the URL of the page.


 Equivalent to [`canonical path`](https://github.com/segmentio/analytics.js/blob/master/analytics.js#L6499-L6503) which defaults to [`location.pathname`](https://developer.mozilla.org/en-US/docs/Web/API/Location) from the DOM API.
    </td>
  </tr>
  <tr>
    <td>`referrer` </td>
    <td>String</td>
    <td>Full URL of the previous page.


 Equivalent to [`document.referrer`](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) from the DOM API.</td>
  </tr>
  <tr>
    <td>`search`</td>
    <td>String</td>
    <td>Query string portion of the URL of the page.


 Equivalent to [`location.search`](https://developer.mozilla.org/en-US/docs/Web/API/Location) from the DOM API.</td>
  </tr>
  <tr>
    <td>`title`</td>
    <td>String</td>
    <td>Title of the page.


 Equivalent to [`document.title`](https://developer.mozilla.org/en-US/docs/Web/API/Document/title) from the DOM API.</td>
  </tr>
  <tr>
    <td>`url`</td>
    <td>String</td>
    <td>Full URL of the page.


First we look for the canonical url. If the canonical url is not provided, we use [`location.href`](https://developer.mozilla.org/en-US/docs/Web/API/Location) from the DOM API.</td>
  </tr>
    <tr>
    <td>`keywords`</td>
    <td>Array[String]</td>
    <td>A list/array of keywords describing the content of the page.


The keywords would most likely be the same as, or similar to, the keywords you would find in an html [meta](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#Attributes) tag for SEO purposes. This property is mainly used by content publishers that rely heavily on pageview tracking. This is not automatically collected.
    </td>
  </tr>
</table>

**Note:** In [analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/), we automatically send the following properties: `title`, `path`, `url`, `referrer`, and `search`.
