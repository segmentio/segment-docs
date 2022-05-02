---
rewrite: true
title: Ambassador Destination
id: 573a3dfb80412f644ff13679
---
[Ambassador](https://www.getambassador.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) empowers companies to easily create, track & manage custom incentives that drive referrals and evangelize their users. 

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Ambassador" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your "Client ID" from your Ambassador dashboard, and populate any "Campaigns" to be mapped as per the below [Mapping campaigns to URLs](#mapping-campaigns-to-urls) section.


Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading the Ambassador snippet on your page and sending data.

Since Ambassador only records specific events and user data, events and users may not appear in Ambassador until you start using the API explained below. And you must approve your website domain through the Editor -> Manage websites section in the navigation pane along the left-hand side of the page.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does.

For Ambassador it takes the unique `userId` of a user and a specific set of traits. All supported `traits` are listed in the example below:

```javascript
analytics.identify('user1234', {
  email: 'anne@example.com',
  firstName: 'Anne',
  lastName: 'Stein',
  company: 'Ambassador',
  phone: '123-555-1234',
  address: {
    street: '1234 Test Rd.',
    city: 'Wooster',
    state: 'Ohio',
    postalCode: '12345',
    country: 'USA'
  }
})
```

_**NOTE:** You can optionally use the URL campaign map to enroll the user as an ambassador. See [Mapping campaigns to URLs](#mapping-campaigns-to-urls) below for more details._

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does.

For Ambassador `track` events will be recorded as a conversion if the Segment event name is mapped to a campaign in your Ambassador destination settings in the Segment UI. All supported `properties` are listed in the example below:

```javascript
analytics.track('Checkout Success', {
  orderId: 'order-123'
  revenue: 123.50,
  commissionApproved: true,
  eventData1: 'event 1',
  eventData2: 'event 2',
  eventData3: 'event 3'
})
```

_**NOTE:** `identify` must be called before any conversion events._

## Appendices

### Mapping campaigns to URLs

Campaigns can be mapped to specific urls for use with `identify` or `track` on matching URLs. Follow the instructions below to set up your campaign mapping:

  1. Log into your Segment account and go to the settings for the Ambassador destination.
  2. In the first field add the URL to be mapped. Wildcards can be used to match multiple domains/paths as detailed in the URL mapping examples below.
  3. In the second field add the ID of the campaign to be used when the URL matches. You can find campaign IDs in your Ambassador account.
  4. Save changes.

Once set up the campaign ID will be sent with any `identify` or `track` calls matching the corresponding URL. If the browser URL matches multiple campaigns `identify` and/or `track` will be called once per campaign.

### URL mapping examples

- `*.*/*` - matches any domain and any path
- `*.example.com` - matches root path at any subdomain on example.com
- `www.*.com` - matches any .com domain with at the www subdomain
- `example.*` - matches any domain suffix
- `example.com/path` - matches only example.com/path
- `example.com/*` - matches any path on example.com
- `example.com/products/*` - matches any path after /products
- `example.com/products/*/refer` - matches any path with products in the first path position and refer in the third path position
- `example.com/#/` - matches only hash root path
- `example.com/#/*` - matches any hash path
- `example.com/#/products/*`- matches any hash path after /products
- `example.com/#/products/*/refer` - matches any hash path with products in the first path position and refer in the third path position
