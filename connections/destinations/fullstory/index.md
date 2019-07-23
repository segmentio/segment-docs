---
rewrite: true
---
[FullStory](https://help.fullstory.com/11269-Develop) lets product and support teams easily understand everything about the customer experience. The Segment integration for FullStory helps accurately identify your customers within the FullStory dashboard. 

This document was last updated on January 25, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{{>connection-modes}}

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for “FullStory” within the Destinations Catalog and confirm the Source you’d like to connect to. Please note the source must be sending events via our Javascript library Analytics.js. 
3. Add your `FS Org` in the destination settings. You can find this in FullStory by navigating to `Settings` > `General` > and copying the value found on the line `window['_fs_org'] = 'fullstory_org_here';`
4. In about 5-10 minutes the CDN will be updated and FullStory's recording snippet will be initialized onto your page. 

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [identify method](https://segment.com/docs/spec/identify/) does. Identify calls sent to Segment will be transformed and sent to [FullStory's](https://help.fullstory.com/develop-js/identify) `FS.identify` method. 

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

Both `email` and `displayName` are special traits that will be passed to FullStory to be used in their interface as explained in [FullStory's docs](https://help.fullstory.com/develop-js/identify). These traits are optional. 

```
analytics.identify("userId123", {
  email: "john.doe@example.com", 
  displayName: "John Doe"
});
```

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [track method](https://segment.com/docs/spec/track/) does. Track calls sent to Segment will be automatically passed directly to FullStory via [FullStory's](https://help.fullstory.com/develop-js/363565-fs-event-api-sending-custom-event-data-into-fullstory) `FS.event` method, including all the properties passed in the event.

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
