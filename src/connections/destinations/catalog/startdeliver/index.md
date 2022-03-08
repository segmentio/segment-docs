---
rewrite: true
title: Startdeliver Destination
id: 5fa3ce52d18ccdfb384b13f7
---
[Startdeliver](https://startdeliver.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) connects data from a variety of sources to provide a customer view optimized to Customer Success Managers.

Startdeliver maintains this destination. For any issues with the destination, [contact their support team](mailto:support@startdeliver.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Startdeliver" in the Destinations Catalog, and select the "Startdeliver" destination.
3. Choose which Source should send data to the "Startdeliver" destination.
4. Go to the [API keys](https://app.startdeliver.com/settings/apikeys) in your Startdeliver dashboard, generate an API key, make it active and grant it "Admin" permissions.
5. Enter the "API Key" in the "Startdeliver" destination settings in Segment.
6. Create a User custom field you want to match a Segment event on [here](https://app.startdeliver.com/settings/fields). You will need a field's alias at the next step.
7. Enter the "Startdeliver user custom field to match on" in the "Startdeliver" destination settings in Segment.


You have to [identify](/docs/connections/spec/identify/) your user with a proper `userId` so that Startdeliver can match your Segments events with correct Startdeliver users.

Startdeliver attaches any matched events to existing users. If no matched users are found, Startdeliver creates a new user. Startdeliver uses a custom field you specified at the 7th step of the "Getting Started" section to match a user.

For example, you have a user in Startdeliver and you want to attach your Segment events to that user.

To do this, create a User custom field. For instance, it could be `externalId`. Now you should update your Startdeliver user with a proper value, for example, `97980cfea0067` (this is your user's ID). Don't forget to set this custom field in 7th step of the "Getting Started" section.

Now when this user goes to your app, you should [identify](/docs/connections/spec/identify/) them:

```js
analytics.identify('97980cfea0067')
```

After this, you can send either `Page` or `Track` events:

```js
analytics.track('Login Button Clicked')
```

This event is matched with a Startdeliver user that has ID `97980cfea0067` set in a custom field `externalId`.

Segment events will appear on Customer and User views in Startdeliver. The views will be created instantly within Startdeliver.

For further information you can check [Startdeliver documentation](https://app.startdeliver.com/dev).


## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page('Home')
```

Segment sends Page calls to Startdeliver as a `page` event. 


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Startdeliver as a `track` event. 
