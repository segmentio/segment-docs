---
title: Attentive Mobile Destination
id: 62bcba2e1db8cc043e95f370
---

[Attentive Mobile](https://www.attentivemobile.com/?utm_source=partner-generated&utm_medium=partner-marketing-&utm_campaign=partner-generated-4.15.22-segment.io) with Segment makes it easy to sync customer and event data from Segment to Attentive so that you can send highly personalized and timely messages.

This destination is maintained by Attentive Mobile. For any issues with the destination, [contact the Attentive Mobile Support team](mailto:support@attentivemobile.com).

## Getting Started



### Install from Attentive

1. Follow the the [Attentive documentation](https://docs.attentivemobile.com/pages/developer-guides/third-party-integrations/customer-data-platforms/segment/){:target="_blank"} to install the Segment integration in Attentive.

### Add from Segment


Note: To install an additional Attentive destination from the Segment UI, the integration must already be installed in Attentive. If you've not already done so, please follow [the Installing From Attentive steps](#installing-from-attentive).

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Attentive Mobile" in the Destinations Catalog, and select the "Attentive Mobile" destination.
3. Choose which Source should send data to the "Attentive Mobile" destination.
4. Go to the [Attentive Mobile dashboard](https://www.ui.attentivemobile.com/integrations){:target="\_blank"}. Find and select the installed 'Segment (Beta)' integration. In the settings page, find and copy the "API key".
5. Enter the "API Key" in the "Attentive Mobile" destination settings in Segment.

## Supported methods

The Attentive Mobile destination supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to add attributes to the Attentive subscriber. These attributes are used to target Attentive subscribers in the [Attentive Segments product](https://help.attentivemobile.com/hc/en-us/categories/360004558392-Subscriber-segments){:target="_blank"}. For example:

```js
analytics.identify("userId123", {
  phone: "+13334445555",
  favoriteColor: "red",
});
```

Segment sends Identify calls to Attentive Mobile as an `identify` event. The event's `traits` are saved to the Attentive subscriber with phone `+13334445555`.

It may take up to 10 minutes for the `identify` attributes to appear in Attentive.

> info ""
> For best results, send at least one Identify call that contains both a Segment `userId` and `email` or `phone`. This enables Attentive Mobile to link the Segment `userId` with an Attentive Mobile subscriber.

### Track

Send [Track](/docs/connections/spec/track) calls to save the event to the Attentive subscriber as an Attentive "Custom Event". These events are used to target Attentive subscribers. For example:

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to Attentive Mobile as a `track` event. The event is saved to the Attentive subscriber, and is usable in both the [Attentive Segments product](https://help.attentivemobile.com/hc/en-us/categories/360004558392-Subscriber-segments){:target="_blank"} and the [Attentive Journeys product](https://help.attentivemobile.com/hc/en-us/categories/6084285157396){:target="_blank"}.

It may take up to 10 minutes for the track events to appear in Attentive.
