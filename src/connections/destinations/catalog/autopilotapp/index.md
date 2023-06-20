---
title: Ortto Destination
rewrite: true
beta: true
id: 613ef845b8784e858199fe2d
---
[Ortto](https://ortto.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} helps thousands of organizations around the world automate their communications through email notifications, such as regular email newsletters, abandoned cart emails, as well as SMS messages, and more, to help organizations market and grow their businesses faster.

Once you connect Segment to Ortto (the Ortto product), you can use Ortto's powerful [campaign](https://help.ortto.com/user/latest/campaigns/){:target="_blank"} features on your Segment customer data.

This destination is maintained by Ortto. For any issues with the destination, [contact the Ortto Support team](mailto:help@ortto.com).


## Getting Started



1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Ortto" in the Destinations Catalog, and select the "Ortto" destination.
3. Click **Configure Ortto** and choose which Source should send data to the "Ortto" destination.
4. If requested, specify the Destination Name for your "Ortto" destination, and click **Save**.
5. Complete [integrating your Ortto account with Segment](https://help.ortto.com/user/latest/data-sources/configuring-a-new-data-source/3rd-party-integrations/segment.html), which automatically configures your Ortto API keys within your "Ortto" destination in Segment.


## Supported methods

Ortto supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).


### Identify

Send [Identify](/docs/connections/spec/identify) calls to create or update [people](https://help.ortto.com/user/latest/people/){:target="_blank"} in Ortto. For example:

```js
analytics.identify('userId123', {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Ortto as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to create or update [activities](https://help.ortto.com/user/latest/activities/){:target="_blank"} (including activity attributes) in Ortto. For example:

```js
analytics.track('Login Button Clicked', {
  action: "login-clicked"
});
```

Segment sends Track calls to Ortto as a `track` event.