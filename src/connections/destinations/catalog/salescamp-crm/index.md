---
rewrite: true
title: Salescamp Destination
id: 5d835f71811b923a6883c2eb
---
## Salescamp CRM Destination

Now it's easy to send customer data to [Salescamp](https://www.salescamp.app/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) from Segment. Once you've tracked your data through Segment's open source libraries Segment will translate and route your data into Salescamp in a format they understand.

This destination is maintained by [Salescamp](https://www.salescamp.app/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners). Feel free to contact us at [hello@salescamp.app](mailto:hello@salescamp.app) for any help.

## Getting Started
Segment's Salescamp destination allows you to identify leads without using rest APIs.

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Salescamp" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Salescamp's dashboard](https://dashboard.salescamp.app/settings/integrations).



## Identify

The Salescamp destination makes it simple to integrate from Segment and send data to Salescamp. This destination feeds your prospective customers into Salescamp as Leads from your website or mobile app.

Let's go through a quick JavaScript example of identifying a customers

If you aren't familiar with the Segment Spec, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('YOUR_USERS_ID', {
  firstname: 'Pete',
  lastname: 'Gibbons',
  title: 'VP of Derp',
  email: 'peter.gibbons@example.com',
  company: 'Initech',
  phone: '570-690-4150',
  state: 'California',
  rating: 'Hot',
  city: 'east greenwich',
  postalCode: '94115',
  country: 'USA',
  street: '19123 forest lane',
  state: 'RI'
});
```

When you call `identify`, we'll check to see if this Lead exists based on the `YOUR_USERS_ID`  trait. If it does, Segment will update the contact with the traits you've passed in your `identify` call, otherwise Segment will create a new contact. All identify calls must have a `firstname` or a `lastname` property to be accepted by Salescamp.


#### Custom traits

In order to send custom traits to Salescamp with Segment, you need to make sure you create the custom Lead Field inside Salescamp prior to sending the data.
