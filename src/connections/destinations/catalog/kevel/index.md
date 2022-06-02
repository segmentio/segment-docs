---
rewrite: true
title: Kevel Destination
id: 60525b44d37b46d34612c45e
---
With [Kevel](https://kevel.co)'s ad serving APIs, you can build custom ad platforms for sponsored listings, internal promotions, native ads, and more — so you can take back the Internet and drive more revenue.

This destination is maintained by Kevel. For any issues with the destination, [contact the Kevel Support team](mailto:support@kevel.co).


## Getting Started

{% include content/connection-modes.md %} 

1. From the Segment web app, click **Catalog**.
2. Search for "Kevel" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the [Kevel App](https://app.kevel.co), click the Information icon in the top-right navigation to find your **Network ID**.
4. Still in the [Kevel app](https://app.kevel.co), go to **Settings -> API Keys** in the top navigation. Either copy an existing key, or generate a new one.
5. Back in the Kevel destination settings in the Segment app, enter the values for the **Network ID** and the **API Key**.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Kevel as [UserDB updates](https://dev.kevel.co/docs/userdb-1). Traits with `boolean` values are stored as `interests` on the UserDB Record. Other traits are stored in the `custom` property.
