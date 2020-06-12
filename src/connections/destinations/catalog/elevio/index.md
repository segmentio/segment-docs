---
title: Elevio Destination
rewrite: true
---

[Elevio](https://elev.io/) is a continuous user education platform that makes your product easier to learn and use. It helps your organization increase user engagement through up-skilling and education while reducing support loads and customer churn. The Elevio Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-elevio).

This document was last updated on 31 July, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Elevio" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in your "Account ID" from your Elevio's [Installation](https://app.elev.io/installation) page under "Install using Code Snippet". You can also utilize Elevio's "Install with Segment" workflow from the same page.
4. Ensure that you have Elevio's Assistant enabled from your [Settings](https://app.elev.io/settings).
5. In about 45 minutes the CDN will be updated and Elevio's snippet will be initialized onto your page.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify({
  name: 'Peter Gibbons',
  email: 'pgibbons@example.com',
  plan: 'developer'
});
```

Passing in the `name`, `email` and `plan` traits allows you to send the user's information to Elevio and utilize the access control feature to restrict article access based on the email domain or plan, as well as identifying customers with live chat.
