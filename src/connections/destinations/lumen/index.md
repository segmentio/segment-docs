# Lumen Destination

[Lumen](https://uselumen.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps companies engage efficiently with the right customers with ease via data-driven messaging through push notifications, SMS and emails to meet business and marketing objectives.

From drip campaigns, special coupon offers, growth hacking, activating inactive customers, e.t.c., we do the heavy lifting while you focus on other business operations.


This destination is maintained by Lumen. For any issues with the destination, [contact the Lumen Support team](mailto:hello@uselumen.co).



## Getting Started


{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Lumen" in the Destinations Catalog, and select the "Lumen" destination.
3. Choose which Source should send data to the "Lumen" destination.
4. Go to the [Lumen dashboard](https://app.uselumen.co){:target="_blank"}, visit the settings page, navigate to the API tab and copy your "API key".
5. Enter the "API Key" in the "Lumen" destination settings in Segment.

## Supported methods

Lumen supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to create or update a user's record. The `userId` becomes the user's primary identifier.

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

If the identifier doesn't exist, a new user record is created. If the identifier already exist, we update the user record For example:

Segment sends Identify calls to Lumen as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to track a user's activity or action. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Lumen as a `track` event.

---
