---

---

[Split](https://split.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) powers your product decisions with a unified solution for feature flagging and experimentation. With Split, you can safely rollout new functionality using sophisticated user targeting, measure impact of change on engineering, product, and business metrics, and rapidly iterate to refine functionality anywhere in the application stack.

In addition to the docs below, Split has created integration specific [documentation](https://docs.split.io/docs/segment#section-advanced-functionality) for additional troubleshooting and frequently asked questions. 

This destination is maintained by [Split](https://split.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners). For any issues with the destination, please [reach out to their team](https://help.split.io).


_**NOTE:** Split is currently in beta, which means that there may still be some bugs for us to iron out. This doc was last updated on March 1, 2019, and we'd love to hear your feedback. If you are interested in joining our beta program or have any feedback to help us improve the Split Destination and its documentation, please [let us know](https://help.split.io)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for Split within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI. 

To find your key, log into Split and navigate to "Admin Settings" > "Integrations" > select your desired workspace > "Segment". There you can find the key for each configured integration. If you don't have an integration configured, be sure to configure your integration in the section "Configure as a destination in Segment" and click save to generate a key.  For more information, learn more in Split's [integration documentation](https://docs.split.io/docs/segment).

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page({
  userId: "some_user_id", 
  category: "Merchant",
  name: "Signup",
})
```

Page calls will be sent to Split with a format of `viewed_<page_name>_page`. 

Split will record events for page method calls that have a name associated with them. E.g. page(‘signup’) translates to viewed_signup_page.

If you would not like Split to receive `page` calls, you can configure in your integration settings in Split.

## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.screen({
  userId: "some_user_id", 
  category: "Merchant",
  name: "Signup",
})
```

Screen calls will be sent to Split with a format of `viewed_<page_name>_screen`. 

Split will record events for page method calls that have a name associated with them. E.g. page(‘signup’) translates to viewed_signup_screen. 

If you would not like Split to receive `screen` calls, you can configure in your integration settings in Split.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify("userId1", {
  name: "Peter Gibbons", 
  email: "peter@initech.com", 
  plan: "premium", 
  logins: 5
});
```

Identify calls will be sent to Split as an `identify` event. The `identify` event's userId (or anonymousId) will be mapped to the selected Split [traffic type](https://docs.split.io/docs/selecting-the-traffic-type). 

Any traits you provide will be displayed in Split as traffic type attributes. Learn more about attributes in Split's [documentation](https://docs.split.io/docs/identifying-customers).

If you would not like Split to receive `identify` calls, you can configure in your integration settings in Split.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track("Registered", {
  plan: "Pro Annual", 
  accountType: "Facebook"
});
```

Track calls will be sent to Split as a `track` event. The `track` event's userId (or anonymousId) will be mapped to the selected Split traffic type. 

The events received correspond to an event type in Split. In some cases the name of the event is not in the `event` field. If this is the case, configure your integration in Split to select the correct field when creating the event type. If an event type does not exist when an event is first received, the event type will be automatically created. 

Each event may have a `value` field which you would like to utilize in Split metric definitions. Configure your integration in Split to select the correct field from your track events as the `value` field. The value must be an integer or float value.

If you would not like Split to receive `track` calls, you can configure in your integration settings in Split.

_**NOTE:** Split currently does not capture the properties of the your track events. The Split team is currently working to accept these properties for use in creating metrics in Split._
