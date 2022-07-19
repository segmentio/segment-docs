---
title: FullStory Destination
rewrite: true
maintenance: true
id: 54521fd625e721e32a72eeb8
---
[FullStory](https://www.fullstory.com/){:target="_blank"} lets product and support teams easily understand everything about the customer experience. The Segment integration for FullStory helps accurately identify your customers within the FullStory dashboard.

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "FullStory" in the Catalog, select it, and choose which of your sources to connect the destination to. Note the source must be sending events using our JavaScript library Analytics.js.
3. Add your `FS Org` in the destination settings. You can find this in FullStory by navigating to `Settings` > `General` > and copying the value found on the line `window['_fs_org'] = 'fullstory_org_here';`

Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading FullStory's recording snippet on your page and sending data.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [identify method](/docs/connections/spec/identify/) does. Identify calls sent to Segment will be transformed and sent to [FullStory's](https://help.fullstory.com/hc/en-us/articles/360020828113) `FS.identify` method.

An example call which does not include a `userId` will send FullStory the value of the `anonymousId` and would look like:

```javascript
analytics.identify();
```

If an `identify` call does contain a `userId`, that will be the ID sent along to FullStory.

```javascript
analytics.identify("userId");
```

In addition, Segment will send over along any traits included in the `identify` call. The example call below would send over both `plan` and `logins`.

```
analytics.identify("userId123", {
  plan: "premium",
  logins: 5
});
```

### Specifying display name and email

Both `email` and `displayName` are special traits that will be passed to FullStory to be used in their interface as explained in [FullStory's docs](https://help.fullstory.com/hc/en-us/articles/360020828113). These traits are optional.

```
analytics.identify("userId123", {
  email: "john.doe@example.com",
  displayName: "John Doe"
});
```

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [track method](/docs/connections/spec/track/) does. Track calls sent to Segment will be automatically passed directly to FullStory using [FullStory's](https://help.fullstory.com/hc/en-us/articles/360020623274){:target="_blank} `FS.event` method, including all the properties passed in the event.

An example call would look like:

```
analytics.track('Product Purchased', {
    order_ID: '2969302398',
    category: 'boots',
    product_name: 'yellow_cowboy_boots',
    price: 99.95,
    currency: 'EUR'
});
```
