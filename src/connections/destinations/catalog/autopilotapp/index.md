---
title: AutopilotApp Destination
rewrite: true
beta: true
id: 613ef845b8784e858199fe2d
---
[Autopilot](https://autopilotapp.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps thousands of organizations around the world automate their communications via email notifications, such as regular email newsletters, abandoned cart emails, as well as SMS messages, and more, to help organizations market and grow their businesses faster.

Once you connect Segment to AutopilotApp (the Autopilot product), you can leverage Autopilot's powerful [campaign](https://help.autopilotapp.com/user/latest/campaigns/) features on your Segment customer data.

This destination is maintained by Autopilot. For any issues with the destination, [contact the Autopilot Support team](mailto:help@autopilotapp.com).


## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "AutopilotApp" in the Destinations Catalog, and select the "AutopilotApp" destination.
3. Click **Configure AutopilotApp** and choose which Source should send data to the "AutopilotApp" destination.
4. If requested, specify the Destination Name for your "AutopilotApp" destination, and click **Save**.
5. Complete [integrating your Autopilot account with Segment](https://help.autopilotapp.com/user/latest/data-sources/configuring-a-new-data-source/3rd-party-integrations/segment.html), which automatically configures your Autopilot API keys within your "AutopilotApp" destination in Segment.


## Supported methods

Autopilot supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).


### Identify

Send [Identify](/docs/connections/spec/identify) calls to create or update [people](https://help.autopilotapp.com/user/latest/people/) in Autopilot. For example:

```js
analytics.identify('userId123', {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Autopilot as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to create or update [activities](https://help.autopilotapp.com/user/latest/activities/) (including activity attributes) in Autopilot. For example:

```js
analytics.track('Login Button Clicked', {
  action: "login-clicked"
});
```

Segment sends Track calls to Autopilot as a `track` event.