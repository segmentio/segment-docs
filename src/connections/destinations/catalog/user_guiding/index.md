---
title: UserGuiding Destination
id: 6549f3d6f2f494b41bf941f8
---

[UserGuiding](https://userguiding.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a product adoption platform that helps product teams automate in-app experiences that turn new users into champions.


This destination is maintained by UserGuiding. For any issues with the source, [contact the UserGuiding Support team](mailto:assist@userguiding.com).


## Getting Started



1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for UserGuiding.
2. Select UserGuiding, and click **Add Destination**.
3. Choose the source you want to connect UserGuiding destination to.
4. Give the destination a name.
5. Enter the API key provided in the [UserGuiding integrations page](https://panel.userguiding.com/settings/integrations/segment){:target="_blank”}.
6. Select the data residency region for your UserGuiding account.


## Identify

If you're not familiar with the Segment Spec, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('user_id_123', {
  email: 'john.doe@example.com',
  firstname: 'john',
  lastname: 'doe'
});
```

Using the [Identify method](/docs/connections/spec/identify/) triggers a call to UserGuiding's [Identify](https://panel.userguiding.com/settings/installation){:target="_blank”} method. For more information about user identification in UserGuiding, see UserGuiding's [Sending user attributes and tracking user actions](https://help.userguiding.com/en/articles/5562847-sending-user-attributes-and-tracking-user-actions){:target="_blank”} documentation.


## Track

If you're not familiar with the Segment Spec, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Visited Products Page')
```

Using the [Track method](/docs/connections/spec/track/) triggers a call to UserGuiding's `userGuiding.track` method. For more information about tracking user action in UserGuiding, see UserGuiding's [Sending user attributes and tracking user actions](https://help.userguiding.com/en/articles/5562847-sending-user-attributes-and-tracking-user-actions){:target="_blank”} documentation.

