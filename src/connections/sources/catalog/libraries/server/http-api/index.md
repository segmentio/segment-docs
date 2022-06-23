---
title: HTTP Tracking API Source
redirect_from: '/connections/sources/catalog/libraries/server/http/'
id: iUM16Md8P2
---
The Segment HTTP Tracking API lets you record analytics data from any website or application. The requests hit Segment servers, Segment routes your data to any destination you want.

Segment has native [sources](/docs/connections/sources/) for most use cases (like JavaScript and iOS) that are all built for high-performance and are open-source. But sometimes you may want to send to the HTTP API directly—that's what this reference is for.

## Headers

### Authentication

Authenticate to the Tracking API by sending your project's **Write Key** along with a request.
Authentication uses HTTP Basic Auth, which involves a `username:password` that is base64 encoded and prepended with the string `Basic`.

In practice that means taking a Segment source **Write Key**,`'abc123'`, as the username, adding a colon, and then the password field is left empty. After base64 encoding `'abc123:'` becomes `'YWJjMTIzOg=='`; and this is passed in the authorization header like so: `'Authorization: Basic YWJjMTIzOg=='`.

### Content-Type

To send data to Segment's HTTP API, a content-type header must be set to `'application/json'`.

## Errors

Segment returns a `200` response for all API requests so debugging should be done in the Segment Debugger. The only exception is if the request is too large / JSON is invalid it will respond with a `400`.

Segment welcomes feedback on API responses and error messages. [Reach out to support](https://segment.com/help/contact/) with any requests or suggestions you may have.

## Rate Limits

The HTTP API has no hard rate limit. However, Segment recommends not exceeding 500 requests per second, including large groups of events sent with a single [`batch` request](#batch).

## Max Request Size

There is a maximum of `32KB` per normal API request.  The `batch` API endpoint accepts a maximum of `500KB` per request, with a limit of `32KB` per event in the batch.  If you are sending data from a server source, Segment's API responds with `400 Bad Request` if these limits are exceeded.

## Regional configuration
For Business plans with access to [Regional Segment](/docs/guides/regional-segment), you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `api.segment.io/v1`
2. Dublin — `events.eu1.segmentapis.com/v1/`

## Identify

`identify` lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

Segment recommends calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change.

Example `identify` call:

```
POST https://api.segment.io/v1/identify
```
```json
{
  "userId": "019mr8mf4r",
  "traits": {
    "email": "pgibbons@example.com",
    "name": "Peter Gibbons",
    "industry": "Technology"
  },
  "context": {
    "ip": "24.5.68.47"
  },
  "timestamp": "2012-12-02T00:30:08.276Z"
}
```
This call is identifying the user by their unique User ID (the one you know them by in your database) and labeling them with `email`, `name`, and `industry` traits.
<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-anonymous-id.md %}
  {% include content/spec-field-context.md %}
  {% include content/spec-field-integrations.md %}
  {% include content/spec-field-timestamp.md %}
  {% include content/spec-field-identify-traits.md %}
  {% include content/spec-field-user-id.md %}
</table>

Find details on the **identify method payload** in the [Segment Spec](/docs/connections/spec/identify/).

## Track

`track` lets you record the actions your users perform. Every action triggers an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, try tracking just a few important events. You can always add more later.

Example `track` call:

```
POST https://api.segment.io/v1/track
```
```json
{
  "userId": "019mr8mf4r",
  "event": "Item Purchased",
  "properties": {
    "name": "Leap to Conclusions Mat",
    "revenue": 14.99
  },
  "context": {
    "ip": "24.5.68.47"
  },
  "timestamp": "2012-12-02T00:30:12.984Z"
}
```

`track` event properties can be anything you want to record. In this case, `name` and `revenue`.

The `track` call has the following fields:
<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-anonymous-id.md %}
  {% include content/spec-field-context.md %}
  {% include content/spec-field-event.md %}
  {% include content/spec-field-integrations.md %}
  {% include content/spec-field-event-properties.md %}
  {% include content/spec-field-timestamp.md %}
  {% include content/spec-field-user-id.md %}
</table>

Find details on **best practices in event naming** as well as the **`track` method payload** in our [Spec](/docs/connections/spec/track/).

## Page

The [`page`](/docs/connections/spec/page/) method lets you record page views on your website, along with optional extra information about the page being viewed.

Example `page` call:

```
POST https://api.segment.io/v1/page
```
```json
{
  "userId": "019mr8mf4r",
  "name": "Tracking HTTP API",
  "timestamp": "2012-12-02T00:31:29.738Z"
}
```
The `page` call has the following fields:
<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-anonymous-id.md %}
  {% include content/spec-field-context.md %}
  {% include content/spec-field-integrations.md %}
  {% include content/spec-field-page-name.md %}
  {% include content/spec-field-page-properties.md %}
  {% include content/spec-field-timestamp.md %}
  {% include content/spec-field-user-id.md %}
</table>

Find details on the **`page` payload** in our [Spec](/docs/connections/spec/page/).

## Screen

The [screen](/docs/connections/spec/screen/) method let you record whenever a user sees a screen of your mobile app.

You'll want to send the `screen` message whenever a user requests a page of your app.

Example `screen` call:

```
POST https://api.segment.io/v1/screen
```
```json
{
  "userId": "019mr8mf4r",
  "name": "Tracking HTTP API",
  "timestamp": "2012-12-02T00:31:29.738Z"
}
```

The `screen` call has the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-anonymous-id.md %}
  {% include content/spec-field-context.md %}
  {% include content/spec-field-integrations.md %}
  {% include content/spec-field-screen-name.md %}
  {% include content/spec-field-screen-properties.md %}
  {% include content/spec-field-timestamp.md %}
  {% include content/spec-field-user-id.md %}
</table>

Find details on the **`screen` payload** in our [Spec](/docs/connections/spec/screen/).

## Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/node/#identify) with a group. A group could be a company, organization, account, project, or team. It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```
POST https://api.segment.io/v1/group
```
```json
{
  "userId": "019mr8mf4r",
  "groupId": "8e9df332ac",
  "traits": {
    "name": "Initech",
    "industry": "Technology",
    "employees": 420
  },
  "timestamp": "2012-12-02T00:31:38.208Z"
}
```
The `group` call has the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-anonymous-id.md %}
  {% include content/spec-field-context.md %}
  {% include content/spec-field-group-id.md %}
  {% include content/spec-field-integrations.md %}
  {% include content/spec-field-timestamp.md %}
  {% include content/spec-field-group-traits.md %}
  {% include content/spec-field-user-id.md %}
</table>

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```
POST https://api.segment.io/v1/alias
```
```json
{
  "previousId": "39239-239239-239239-23923",
  "userId": "019mr8mf4r",
  "timestamp": "2012-12-02T00:31:29.738Z"
}
```
The `alias` call has the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-context.md %}
  {% include content/spec-field-integrations.md %}
  {% include content/spec-field-previous-id.md %}
  {% include content/spec-field-timestamp.md %}
  {% include content/spec-field-user-id.md %}
</table>

For more details on the `alias` call and payload, check out our [Spec](/docs/connections/spec/alias/).

## Historical Import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, and Kissmetrics can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

**Note:** If you're tracking things that are happening right now, leave out the `timestamp` and Segment servers will timestamp the requests for you.

## Batch

The `batch` method lets you send a series of `identify`, `group`, `track`, `page` and `screen` requests in a single batch, saving on outbound requests. Our server-side and mobile [sources](/docs/connections/sources/) make use of this method automatically for higher performance.

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}


Here's the what the `batch` request signature looks like:

```
POST https://api.segment.io/v1/batch
```
```json
{
  "batch": [
    {
      "type": "identify",
      "userId": "019mr8mf4r",
      "traits": {
        "email": "jake@yahoo.com",
        "name": "Jake Peterson",
        "age": 26
      },
      "timestamp": "2012-12-02T00:30:08.276Z"
    },
    {
      "type": "track",
      "userId": "019mr8mf4r",
      "event": "Song Played",
      "properties": {
        "name": "Fallin for You",
        "artist": "Dierks Bentley"
      },
      "timestamp": "2012-12-02T00:30:12.984Z"
    },
    {
      "type": "identify",
      "userId": "971mj8mk7p",
      "traits": {
        "email": "cindy@example.com",
        "name": "Cindy Gonzalez",
        "age": 23
      },
      "timestamp": "2015-2-02T00:30:08.276Z"
    },
    {
      "type": "track",
      "userId": "971mj8mk7p",
      "event": "Song Played",
      "properties": {
        "name": "Get Right",
        "artist": "Jennifer Lopez"
      },
      "timestamp": "2015-2-02T00:30:12.984Z"
    }
  ],
  "context": {
    "device": {
      "type": "phone",
      "name": "Apple iPhone 6"
    }
  }
}
```

<table>
<tr>
  <th>Field</th>
  <th></th>
  <th>Type</th>
  <th>Description</th>
</tr>
  <tr>
    <td>`batch` _Array_</td>
    <td>An array of `identify`, `group`, `track`, `page` and `screen` method calls. Each call **must** have an `type` property with a valid method name.</td>
  </tr>
  <tr>
    <td>`context` _Object, optional_</td>
    <td>The same as [Context](/docs/connections/spec/common#context) for other calls, but it will be merged with any context inside each of the items in the batch.</td>
  </tr>
  <tr>
    <td>`integrations` _Object, optional_</td>
    <td>The same as [Destinations](/docs/connections/spec/common#integrations) for other calls, but it will be merged with any destinations inside each of the items in the batch.</td>
  </tr>
</table>


## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `integrations` that lets you turn certain destinations on or off. By default all destinations are enabled.

Here's an example showing an `identify` call that only goes to Mixpanel and Kissmetrics:

```
POST https://api.segment.io/v1/identify
```
```json
{
  "userId": "019mr8mf4r",
  "traits": {
    "email": "pgibbons@example.com",
    "name": "Peter Gibbons",
    "industry": "Technology"
  },
  "context": {
    "ip": "24.5.68.47"
  },
  "timestamp": "2012-12-02T00:30:08.276Z",
  "integrations": {
    "All": false,
    "Mixpanel": true,
    "Kissmetrics": true,
    "Google Analytics": false
  }
}
```

 `'All': false` says that no destination should be enabled unless otherwise specified. `'Mixpanel': true` turns on Mixpanel, `"Kissmetrics": true,` turns on Kissmetrics, and so on.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/catalog/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", and so on).

**Note:**

- Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. Segment recommends using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

- If you are on a grandfathered plan, events sent server-side that are filtered through the Segment dashboard will still count towards your API usage.

## Collecting IP Address

When sending a HTTP call from a user's device, you can collect the IP address by setting `context.direct` to `true`.

## Troubleshooting

{% include content/troubleshooting-intro.md %}

<!-- LR: no quickstart for this file. removing this include and manually putting in a flat text version that can be customized {% include content/troubleshooting-server-debugger.md %} -->

### No events in my debugger

1. Double check that you've set up the library correctly.

2. Make sure that you're calling a Segment API method once the library is successfully installed—[`identify`](#identify), [`track`](#track), and so on.

{% include content/troubleshooting-server-integration.md %}
