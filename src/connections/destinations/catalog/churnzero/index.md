---
title: ChurnZero Destination
rewrite: true
---

[ChurnZero](https://churnzero.net/) is a real-time Customer Success platform that helps subscription businesses fight churn, expand current accounts, increase product adoption and optimize the customer experience.

This destination is maintained by ChurnZero. For any issues with the destination, please [reach out to their team](mailto:support@churnzero.net).

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "ChurnZero" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find within ChurnZero under [Admin > Application Keys](https://app.churnzero.net/#/app/admin/applicationKeys). Please be sure you are providing the key for your Production instance of ChurnZero.
4. Once you've completed Steps 1-3, notify your ChurnZero Implementation Specialist or Customer Success Manager. The ChurnZero team will finalize your set-up for you. Please note that you must also provide your Implementation Specialist or CSM with your company's [Segment Implementation Requirements](https://churnzerohelp.zendesk.com/hc/en-us/articles/360022631452-Usage-Data-Segment-com-Destination).


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  accountExternalId: '12345678',
  contactExternalId: 'john.smith@company.com'
});
```

Identify calls will match to Accounts and Contacts in ChurnZero when you pass the `accountExternalID` and the `contactExternalID` as traits.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will appear in ChurnZero as in-app actions (ie. Events), associated with the correct Account and Contact based on the Identify call.
