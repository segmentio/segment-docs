---
rewrite: true
title: Kevel Destination
---

With [Kevel](https://kevel.co)'s ad serving APIs, you can build custom ad platforms for sponsored listings, internal promotions, native ads, and more — so you can take back the Internet and drive more revenue.

This destination is maintained by Kevel. For any issues with the destination, [contact the Kevel Support team](mailto:support@kevel.co).


## Getting Started

{% include content/connection-modes.md %} 

1. From the Segment web app, click **Catalog**.
2. Search for "Kevel" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the [Kevel App](https://app.kevel.co), click the Information icon in the top-right navigation to find your **Network ID** by.
4. Still in the [Kevel app](https://app.kevel.co), go to **Settings -> API Keys** in the top navigation. Either copy an existing key, or generate a new one.
5. Back in the Kevel destination settings in the Segment app, enter the values for the **Network ID** and the **API Key**.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Kevel as [UserDB updates](https://dev.kevel.co/docs/userdb-1). Traits with `boolean` values are stored as `interests` on the UserDB Record. Other traits are stored in the `custom` property.

## Personas

You can send computed traits and audiences generated using [Segment Personas](https://segment.com/docs/personas) to this destination as a **user property**. To learn more about Personas, contact us for a [demo](https://segment.com/contact/demo).

For user-property destinations, an [identify](https://segment.com/docs/connections/spec/identify/) call is sent to the destination for each user being added and removed. The property name is the `snake_cased` version of the audience name, with a true/false value to indicate membership. For example, when a user first completes an order in the last 30 days, Personas sends an Identify call with the property `order_ completed_last_30days: true`. When the user no longer satisfies this condition (for example, it's been more than 30 days since their last order), Personas sets that value to `false`.

When you first create an audience, Personas sends an Identify call for ever user in that audience. Later audience syncs only send updates for users whose membership has changed since the last sync.

## Settings

Segment lets you change these destination settings from the Segment app without have to touch any code.

### API Key

The API key can be found in the [Kevel App](https://app.kevel.co), by navigating to Settings -> API Keys via the top navigation menu.

### Network ID

The Network ID can be found in the [Kevel App](https://app.kevel.co), by clicking the "Information" icon in the top navigation next to your Username after logging in.
