---
rewrite: true
title: Ambassador Destination
---

[Ambassador](https://www.getambassador.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) empowers companies to easily create, track & manage custom incentives that drive referrals and evangelize their users. The Ambassador Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-ambassador).

This document was last updated on September 03, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. From your Segment UI's Destinations page click on "Add Destination".
  2. Search for "Ambassador" within the Destinations Catalog and confirm the Source you'd like to connect to.
  3. Drop in your "Client ID" from your Ambassador dashboard, and populate any "Campaigns" to be mapped as per the below [Mapping campaigns to URLs](#mapping-campaigns-to-urls) section.
  4. In about 45 minutes the CDN will be updated and the Ambassador snippet will be initialized onto your page.
  5. Since Ambassador only records specific events and user data, events and users may not appear in Ambassador until you start using the API outlined below.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does.

For Ambassador it takes the unique `userId` of a user and a specific set of traits. All supported `traits` are listed in the example below:

```javascript
analytics.identify('user1234', {
  email: 'anne@example.com',
  firstName: 'Anne',
  lastName: 'Stein',
  company: 'Ambassador',
  phone: '123-123-1234',
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

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does.

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
