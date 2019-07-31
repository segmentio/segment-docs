---
rewrite: true
---

[Crazy Egg](https://www.crazyegg.com/) is a user testing tool that gives you heatmaps, clickmaps and scrollmaps of your visitors interacting with your site. It helps you learn where your users are having trouble. The {{integration.name}} Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-crazy-egg).

This document was last updated on 18th January, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Crazy Egg" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Navigate to the [Setup page within your Crazy Egg UI](https://app.crazyegg.com/v2/install/manually) and copy the Account Number which should be a series of 8-9 numbers in bold.
4. Enter this within the Segment UI under "Account Number" and Crazy Egg will automatically start recording heatmap data once the CDN updates in 5-10 minutes.
5. Complete the set-up flow by entering the URL of the page you want heatmap tracking implemented for.
6. Navigate to the [Crazy Egg Dashboard](https://app.crazyegg.com/v2/dashboard) to track the data. It's worth noting that it may take up to 24-48 hours for initial data to show up.

## Page
If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:
```javascript
analytics.page();
```
As this is automatically included in the `analytics.js` snippet by default, you don't need to take any further action. If you remove this default page call for whatever reason, Crazy Egg will not be able to record any heatmaps.

> **Note:** Since Crazy Egg only records data about mouse clicks and scrolls, it does not collect any of the data represented by other standard Segment API methods.

## Troubleshooting

### I can't map user variables
The current Crazy Egg Destination doesn't support mapping of user variables out of the box. You will need to add your own additional Javascript as specified [here](https://help.crazyegg.com/articles/61-user-variables).

{% include content/client-side-script-unverified.md %}
