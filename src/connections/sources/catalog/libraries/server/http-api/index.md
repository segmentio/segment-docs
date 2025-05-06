---
title: HTTP API Source
redirect_from: '/connections/sources/catalog/libraries/server/http/'
id: iUM16Md8P2
---
The Segment HTTP Tracking API lets you record analytics data from any website or application. The requests hit Segment servers, Segment routes your data to any destination you want.

Segment has native [sources](/docs/connections/sources/) for most use cases (like JavaScript and iOS) that are all built for high-performance and are open-source. But sometimes you may want to send to the HTTP API directly—that's what this reference is for.

> info "HTTP API sources in EU workspaces should use the `events.eu1.segmentapis.com` endpoint"
> If you are located in the EU and use the `https://api.segment.io/v1/` endpoint, you might not see any errors, but your events will not appear in the Segment app. For more information about regional support, see the [Source Regional support](/docs/guides/regional-segment/#source-regional-support) documentation. 

## Headers

### Authentication

Choose between [writeKey authentication](#writeKey-authentication), [basic authentication](#basic-authentication) and [OAuth](#oauth) to authenticate requests. 

#### writeKey authentication
Authenticate to the Tracking API by sending your project's **Write Key** along with a request.
The authentication writeKey should be sent as part of the body of the request. This will be encrypted over https.

```
  curl --location 'https://api.segment.io/v1/track' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "event": "happy-path-a3ef8a6f-0482-4694-bc4d-4afba03a0eab",
      "email": "test@example.org",
      "userId": "123",
      "writeKey": "DmBXIN4JnwqBnTqXccTF0wBnLXNQmFtk"
  }'
```

> info ""
> For this auth type, you do not need to set any authentication header. 

#### Basic authentication
Basic authentication uses HTTP Basic Auth, which involves a `username:password` that is base64 encoded and prepended with the string `Basic`.

In practice that means taking a Segment source **Write Key**,`'abc123'`, as the username, adding a colon, and then the password field is left empty. After base64 encoding `'abc123:'` becomes `'YWJjMTIzOg=='`; and this is passed in the authorization header like so: `'Authorization: Basic YWJjMTIzOg=='`.

> info ""
> Include a colon before encoding. While encoding the write key without a colon might work due to backward compatibility, this won't always be the case.  

#### OAuth

[Obtain the access token](/docs/connections/oauth/) from the Authorization Server specific to the region. 

Include the access token in the Authorization header as a Bearer token along with your project's write key in the payload of the request. For example, Authorization with Bearer token looks like:

  ```
  Authorization: Bearer <access token>
  ```


For example, to use the access token in the HTTP API Source, use `access_token` in the header and `write_key` in the payload. An example cURL request looks like: 

```
  curl --location 'https://api.segment.io/v1/track' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <access token>' \
  --data-raw '{
      "event": "happy-path-a3ef8a6f-0482-4694-bc4d-4afba03a0eab",
      "email": "test@example.org",
      "messageId": "58524f3a-3b76-4eac-aa97-d88bccdf4f77",
      "userId": "123",
      "type": "track",
      "writeKey": "DmBXIN4JnwqBnTqXccTF0wBnLXNQmFtk"
  }
```

You can reuse the access token until the expiry period specified on the OAuth application. 

### Content-Type

To send data to Segment's HTTP API, a content-type header must be set to `'application/json'`.

## Rate limits

For each workspace, Segment recommends you to not exceed 1,000 requests per second with the HTTP API. If you exceed this, Segment reserves the right to queue any additional events and process those at a rate that doesn't exceed the limit. Requests that exceed acceptable limits may be rejected with HTTP Status Code 429. When Segment rejects the requests, the response header contains `Retry-After` and `X-RateLimit-Reset` headers, which contains the number of seconds after which you can retry the request.

To request a higher limit, contact [Segment](mailto:friends@segment.com).

For [`batch` requests](#batch), there's a limit of 500 KB per request. 

> warning "Engage rate limit"
> Engage has a limit of 1,000 events per second for inbound data. Visit the [Engage Default Limits documentation](/docs/engage/product-limits/) to learn more. 

## Max request size

There is a maximum of `32KB` per normal API request.  The `batch` API endpoint accepts a maximum of `500KB` per request, with a limit of `32KB` per event in the batch.  If you are sending data from a server or Analytics.js source, Segment's API responds with `400 Bad Request` if these limits are exceeded.

## Regional configuration
{% include content/regional-config.md %}

## Identify

Identify lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them.

Segment recommends calling Identify a single time when the user's account is first created, and only identifying again later when their traits change.

Example Identify call:

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
  "writeKey": "YOUR_WRITE_KEY"
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

Track lets you record the actions your users perform. Every action triggers an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, try tracking just a few important events. You can always add more later.

Example Track call:

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
  "timestamp": "2012-12-02T00:30:12.984Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```

Track event properties can be anything you want to record. In this case, `name` and `revenue`.

The Track call has the following fields:
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

Find details on **best practices in event naming** as well as the **Track method payload** in the [Segment Spec](/docs/connections/spec/track/).

## Page

The [Page](/docs/connections/spec/page/) method lets you record page views on your website, along with optional extra information about the page being viewed.

Example Page call:

```
POST https://api.segment.io/v1/page
```
```json
{
  "userId": "019mr8mf4r",
  "name": "Tracking HTTP API",
  "timestamp": "2012-12-02T00:31:29.738Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```
The Page call has the following fields:
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

Find details on the **Page payload** in the [Segment Spec](/docs/connections/spec/page/).

## Screen

The [Screen](/docs/connections/spec/screen/) method let you record whenever a user sees a screen of your mobile app.

You'll want to send the Screen message whenever a user requests a page of your app.

Example Screen call:

```
POST https://api.segment.io/v1/screen
```
```json
{
  "userId": "019mr8mf4r",
  "name": "Tracking HTTP API",
  "timestamp": "2012-12-02T00:31:29.738Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```

The Screen call has the following fields:

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

Find details on the **Screen payload** in the [Segment Spec](/docs/connections/spec/screen/).

## Group

Group lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/node/#identify) with a group. A group could be a company, organization, account, project, or team. It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example Group call:

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
  "timestamp": "2012-12-02T00:31:38.208Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```
The Group call has the following fields:

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

Find more details about Group including the **Group payload** in the [Segment Spec](/docs/connections/spec/group/).

## Alias

`Alias is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of Segment's destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias), if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example Alias call:

```
POST https://api.segment.io/v1/alias
```
```json
{
  "previousId": "39239-239239-239239-23923",
  "userId": "019mr8mf4r",
  "timestamp": "2012-12-02T00:31:29.738Z",
  "writeKey": "YOUR_WRITE_KEY"
}
```
The Alias call has the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-context.md %}
  {% include content/spec-field-integrations.md %}
  {% include content/spec-field-previous-id.md %}
  {% include content/spec-field-timestamp.md %}
  {% include content/spec-field-user-id.md %}
</table>

For more details on the Alias call and payload, see the [Segment Spec](/docs/connections/spec/alias/).

## Historical import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, and Kissmetrics can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

> info ""
> If you're tracking things that are happening right now, leave out the `timestamp` and Segment servers will timestamp the requests for you.

## Batch

The `batch` method lets you send a series of Identify, Group, Track, Page and Screen requests in a single batch, saving on outbound requests. Segment's server-side and mobile [sources](/docs/connections/sources/) make use of this method automatically for higher performance.

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
  "writeKey": "YOUR_WRITE_KEY",
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
    <td>An array of Identify, Group, Track, Page and Screen method calls. Each call **must** have an `type` property with a valid method name.</td>
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

The Alias, Group, Identify, Page and Track calls can all be passed an object of `integrations` that lets you turn certain destinations on or off. By default all destinations are enabled.

Here's an example showing an Identify call that only goes to Mixpanel and Kissmetrics:

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
  },
  "writeKey": "YOUR_WRITE_KEY"
}
```

 `'All': false` says that no destination should be enabled unless otherwise specified. `'Mixpanel': true` turns on Mixpanel, `"Kissmetrics": true,` turns on Kissmetrics, and so on.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/catalog/) (for example, "AdLearn Open Platform", "awe.sm", "MailChimp", and so on).

**Note:**

- Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. Segment recommends using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

- If you are on a grandfathered plan, events sent server-side that are filtered through the Segment dashboard will still count towards your API usage.

## Collecting IP Address

When sending a HTTP call from a user's device, you can collect the IP address by setting `context.direct` to `true`.

## Errors

Segment returns a `200` response for all API requests except errors caused by large payloads and JSON errors (which return `400` responses.) To debug events that return `200` responses but aren't accepted by Segment, use the Segment Debugger.

Common reasons that events are not accepted by Segment: 
  - **Payload is too large:** Most HTTP API routes can handle API requests that are 32KB or smaller. If this limit is exceeded, Segment returns a 400 Bad Request error.
  - **The `\batch` API endpoint:** This endpoint accepts a maximum of 500KB per batch API request. Each batch request can only have up to 2500 events, and each batched event needs to be less than 32KB. Segment returns a `200` response but rejects the event when the number of batched events exceeds the limit.
  - **Identifier is not present**: The HTTP API requires that each payload has a userId and/or anonymousId.  If you send events without either the userId or anonymousId, Segment’s tracking API responds with an no_user_anon_id error. Check the event payload and client instrumentation for more details.
  - **Track event is missing name**: All Track events sent to Segment must have an `event` field. 
  - **Deduplication**: Segment deduplicates events using the `messageId` field, which is automatically added to all payloads coming into Segment. If you're setting up the HTTP API yourself, ensure all events have unique messageId values with fewer than 100 characters. 
  - **Invalid JSON**: If you send an event with invalid JSON, Segment returns a 400 Bad Request error.
  - **Incorrect credentials**: Double check your credentials for your downstream destinations.
  - **Destination incompatibility**: Make sure that the destination you are troubleshooting can accept server-side API calls. You can see compatibility information on the [Destination comparison by category](/docs/connections/destinations/category-compare/) page and in the documentation for your specific destination.
  - **Destination-specific requirements**: Check the documentation specific to the destination to see if there are other requirements for using the method and destination that you're trying to get working. 

Segment welcomes feedback on API responses and error messages. [Reach out to support](https://segment.com/help/contact/){:target="_blank"} with any requests or suggestions you may have.

## Troubleshooting

### No events in my debugger

1. Double check that you've set up the library correctly.

2. Make sure that you're calling a Segment API method after the library is successfully installed—[Identify](#identify), [Track](#track), and so on.
