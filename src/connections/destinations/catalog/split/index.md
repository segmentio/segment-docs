---
rewrite: true
title: Split Destination
id: 5c6e2b9d79daff00017ec990
---
[Split](https://split.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) powers your product decisions with a unified solution for feature flagging and experimentation. With Split, you can safely roll out new functionality using sophisticated user targeting, measure impact of change on engineering, product, and business metrics, and rapidly iterate to refine functionality anywhere in the application stack.

Split also maintains [integration specific documentation](https://help.split.io/hc/en-us/articles/360020742532-Segment) which include additional troubleshooting and frequently asked questions.

This destination is maintained by [Split](https://split.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners). For any issues with the destination, [contact the Split IO Support team](https://help.split.io/hc/en-us).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for Split in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI.

To find your key, log into Split and navigate to "Admin Settings" > "Integrations" > select your desired workspace > "Segment". There you can find the key for each configured integration. If you don't have an integration configured, be sure to configure your integration in the section "Configure as a destination in Segment" and click save to generate a key.  For more information, learn more in Split's [integration documentation](https://help.split.io/hc/en-us/articles/360020742532-Segment).

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page({
  userId: "some_user_id",
  category: "Merchant",
  name: "Signup",
})
```

Page calls will be sent to Split with a format of `viewed_<page_name>_page`.

Split records events for page method calls that have a name associated with them. For example, `page('signup')` translates to `viewed_signup_page`.

If you would not like Split to receive `page` calls, you can configure in your integration settings in Split.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.screen({
  userId: "some_user_id",
  category: "Merchant",
  name: "Signup",
})
```

Screen calls will be sent to Split with a format of `viewed_<page_name>_screen`.

Split will record events for page method calls that have a name associated with them. For example, `page('signup')` translates to `viewed_signup_page`.

If you would not like Split to receive `screen` calls, you can configure in your integration settings in Split.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify("userId1", {
  name: "Peter Gibbons",
  email: "peter@example.com",
  plan: "premium",
  logins: 5
});
```

Identify calls will be sent to Split as an `identify` event. The `identify` event's userId (or anonymousId) will be mapped to the selected Split [traffic type](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type).

Any traits you provide will be displayed in Split as traffic type attributes. Learn more about attributes in Split's [documentation](https://help.split.io/hc/en-us/articles/360020529772-Identifying-customers).

If you would not like Split to receive `identify` calls, you can configure in your integration settings in Split.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track("Registered", {
  plan: "Pro Annual",
  accountType: "Facebook"
});
```

Track calls will be sent to Split as a `track` event. The `track` event's userId (or anonymousId) will be mapped to the selected Split traffic type.

The events received correspond to an event type in Split. In some cases the name of the event is not in the `event` field. If this is the case, configure your integration in Split to select the correct field when creating the event type. If an event type does not exist when an event is first received, the event type will be automatically created.

Each event may have a `value` field which you would like to use in Split metric definitions. Configure your integration in Split to select the correct field from your track events as the `value` field. The value must be an integer or float value.

If you would not like Split to receive `track` calls, you can configure in your integration settings in Split.

_**NOTE:** Split currently does not capture the properties of the your track events. The Split team is currently working to accept these properties for use in creating metrics in Split._
