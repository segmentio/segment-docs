---
title: Gainsight Destination
rewrite: true
---

[Gainsight](https://www.gainsight.com/) is a customer success software that empowers companies to increase revenue, decrease customer churn, and drive advocacy. Gainsight for Analytics Cloud is the first and only solution that runs predictive data science natively using Salesforce sales, service, marketing, and community data.

This document was last updated on October 18, 2018. If you notice any gaps, outdated information, or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for Gainsight within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Copy your Gainsight Access Key and paste it into to the Access Key field in your Segment settings for Gainsight. This key can be generated from the integrations page under the `admin` area in Gainsight. It should be 36 characters long, for reference. If you need more information, please visit the [relevant documentation provided by Gainsight](https://support.gainsight.com/Connectors/API_Integration/Generate_API_Access_Key).
4. Start sending events!


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like this ([analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/analytics.js/)):

```js
analytics.identify('123', {
  accountId: 'o283h08fh2390f923uofu23',
  name: 'Miles Morales',
  email: 'mmorales@midtownhs.edu'
});
```

You can map `identify` calls to Salesforce by including the Salesforce Account ID as `accountId`. Gainsight will handle the rest and collect any additional info you send in your `identify` calls and attribute them to the correct Account.

## Track

**Important**: You should only send the `track` events you need to Gainsight. You can whitelist the names of the events you need in your Segment UI settings for Gainsight. Once you pre-map your events, we will only send those events to Gainsight for you. However, if you do *not* map any events, we will by default send all your track events to Gainsight.

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like this ([analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/analytics.js/)):

```js
analytics.track('Account Created', {
  accountId: 'o283h08fh2390f923uofu23',
  source: 'Invite',
  title: 'CEO'
});
```

Mapping your `track` calls to a Salesforce Account is only necessary if the user doing the event is not already identified or grouped. If the user is identified all their events will be picked up automatically.

If they haven't been identified, pass the Salesforce Account ID as a property like in the example above.

## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like this ([analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/analytics.js/)):

```js
analytics.group('555', {
  name: 'Twitter',
  url: 'https://twitter.com'
});
```


To map your `group` calls to a Salesforce Account, pass the Salesforce Account ID as the `groupId`, like what you see in the above example.
