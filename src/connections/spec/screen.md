---
title: 'Spec: Screen'
---

The `screen` call lets you record whenever a user sees a screen, the mobile equivalent of `page`, in your mobile app, along with any properties about the screen. Calling `page` or [`screen`](/docs/connections/spec/screen/) in one of our [sources](/docs/connections/sources/) is one of the first steps to getting started with Segment.

Here's the payload of a typical `screen` call, with most [common fields](/docs/connections/spec/common/) removed:

```js
{
  "type": "screen",
  "name": "Home",
  "properties": {
    "Feed Type": "private"
  }
}
```

And here's the corresponding Objective-C event that would generate the above payload:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"
                            properties:@{ @"Feed Type": @"private" }];
```

Beyond the common fields, the `screen` call takes the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-screen-name.md %}
  {% include content/spec-field-screen-properties.md %}
</table>

## Example

Here's a complete example of a `screen` call:

```js
{
  "anonymousId": "3a12eab0-bca7-11e4-8dfc-aa07a5b093db",
  "channel": "mobile",
  "context": {
    "ip": "8.8.8.8"
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "name": "Home",
  "properties": {
    "variation": "blue signup button"
  },
  "receivedAt": "2015-02-23T22:28:55.387Z",
  "sentAt": "2015-02-23T22:28:55.111Z",
  "timestamp": "2015-02-23T22:28:55.111Z",
  "type": "screen",
  "userId": "97980cfea0067",
  "version": "1.1"
}
```


## Identities

{% include content/spec-identities.md %}


## Name

Each screen can be tagged with a `name`. For example, many apps have a "Signup" screen that can be useful to tag so that you can see users as they move through your funnel.


## Properties

Properties are extra pieces of information that describe the screen. They can be anything you want.

We've reserved some properties that have semantic meanings, and we handle them in special ways. You should **only use reserved properties for their intended meaning**.

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
    <td>Name of the screen
      <p>This is reserved for future use.</p></td>
  </tr>
</table>
