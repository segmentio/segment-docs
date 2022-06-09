---
title: Elevio Destination
rewrite: true
id: 556df6680a20f4e22f0fb3a0
---
[Elevio](https://elev.io/) is a continuous user education platform that makes your product easier to learn and use. It helps your organization increase user engagement through up-skilling and education while reducing support loads and customer churn. The Elevio Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-elevio).


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Elevio" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your "Account ID" from your Elevio's [Installation](https://app.elev.io/installation) page under "Install via Code Snippet". You can also use Elevio's "Install with Segment" workflow from the same page.
4. Ensure that you have Elevio's Assistant enabled from your [Settings](https://app.elev.io/settings).

Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Elevio's snippet on your page and sending data.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify({
  name: 'Peter Gibbons',
  email: 'pgibbons@example.com',
  plan: 'developer'
});
```

Passing in the `name`, `email` and `plan` traits allows you to send the user's information to Elevio and use the access control feature to restrict article access based on the email domain or plan, as well as identifying customers with live chat.
