---
title: Correlated Destination
id: 60df6d4c038b872f10c54801
---

[Correlated](https://www.getcorrelated.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_new"} is the first product-led revenue platform built to help you and your sales teams take action based on how customers are using your product.

This destination is maintained by Correlated. For any issues with the destination, [contact the Correlated Support team](mailto:support@getcorrelated.com).

> success ""
> Set up a free account with Correlated by visiting their [website](https://www.getcorrelated.com/get-started){:target="_new"}.

## Getting Started

### Connect with OAuth
1. Log in to the Correlated application. 
2. Go to [Correlated integrations](https://app.getcorrelated.com/integrations) and select the Segment integration.
3. Click **Connect to Segment** to connect with OAuth. 
4. Select the relevant Sources that you want to include (Correlated recommends that you include your website and application)

### Connect with an API Key
1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Correlated" in the Destinations Catalog, and select the "Correlated" destination.
3. Choose which Source should send data to the "Correlated" destination.
4. Go to [Correlated integrations](https://app.getcorrelated.com/integrations) and click on the "Segment" integration.
5. Copy the "Segment API key".
6. Enter the "Segment API Key" in the "Correlated" destination settings in Segment.

## Supported Methods

Correlated supports the following methods. 

### Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Correlated as a `page` event. Correlated displays these events as `Page views` by default. 


### Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:
```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

Segment sends Group calls to Correlated as a `group` event. `Group` events are augmented with group traits. Correlated displays these events as `Accounts` by default. It's best to include a name as a trait, as Correlated will use this to populate Account views by default.

### Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Correlated as an `identify` event. Correlated displays these events as `Users` by default. `Track` event data is augmented with identify traits. It's best to include email as a trait, as Correlated will use email to populate User views by default. 

### Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Correlated as a `track` event. Track events should be flattened whenever possible. For example, rather than "Button Click" as a track event with "Onboarding Form Submit" as a property, use "Onboarding Form Submit Button Click". `Product Events` can be filtered and grouped by identify traits or group traits. 