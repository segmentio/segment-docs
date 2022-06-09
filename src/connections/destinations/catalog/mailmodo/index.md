---
title: Mailmodo Destination
rewrite: true
id: 623a07123d307e60f268a1c2
---

[Mailmodo](https://www.mailmodo.com/){:target="_blank"} is an email marketing tool that focuses on bringing the interactive experience of the AMP framework to emails. It allows businesses to create emails with web page-like interactivity right inside the user inbox, thereby increasing engagement and conversions multi-fold.


Mailmodo maintains this destination. For any issues with the destination, [contact the Mailmodo Support team](mailto:help@mailmodo.com).


## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Mailmodo** in the Destinations Catalog, and select the **Mailmodo** destination.
3. Choose which Source should send data to the Mailmodo destination.
4. Go to the [Mailmodo Dashboard](https://manage.mailmodo.com/app/dashboard){:target="_blank"} and navigate to **Settings > API Keys**, then create a new API Key and copy it.
5. Enter the **API Key** in the Mailmodo destination settings in Segment.


## Supported methods

Mailmodo supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Take a look at the [Identify method documentation](/docs/connections/spec/identify) to learn about what it does.

```js
analytics.identify('userId12345', {
  firstName: 'Bob',
  lastName: 'Dole',
  email: 'bob.dole@example.com',
  company: 'Initech',
  employees: 234
});
```

Every time you make an identify call with an email address included:
1.	Mailmodo verifies that the email exists.
2.	If the email doesn’t exist, Mailmodo adds the user as a contact to the Mailmodo database and matches user properties with the Segment `traits` sent in the identify call payload.
3.	If the email exists, Mailmodo updates the user properties for the Contact against the Segment `traits` sent in the identify call payload.

All the [special traits](/docs/connections/spec/identify#traits) recognized by Segment are translated and matched with the Mailmodo user properties for a Contact. These fields are automatically created or mapped for a Contact in Mailmodo and are available for personalization and advance segmentation.

> info "How Mailmodo handles incoming email addresses"
> * The email field is required. Mailmodo drops identify calls without an email.
> * If different email addresses are sent against the same user ID in identify call, Mailmodo treats them as two different contacts.

### Track
Take a look at the [Track method documentation](/docs/connections/spec/track) to learn about what it does. An example call looks like:

```js
analytics.track('Product Viewed', {
  product_id: '507f1f77bcf86cd799439011',
  name: 'Monopoly: 3rd Edition',
  price: 18.99,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg'
});
```
Segment sends `Track` calls to Mailmodo as a Custom Event. When you call track, Segment sends the event to Mailmodo with the event name and all properties that you specified.

Be sure you send an Identify call for any user who triggers Track calls. If Mailmodo receives a Track call for an unknown userId, the call drops.
