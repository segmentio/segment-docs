---
title: Google Tag for Campaign Manager
strat: google
hide-boilerplate: true
hide-dossier: false
id: 64f2434e5066280a0e7f1ab3
versions:
  - name: "Google Tag for Campaign Manager"
    link: '/docs/connections/destinations/catalog/actions-google-analytics-4/'
---

{% include content/plan-grid.md name="actions" %}

[Google Tag for Campaign Manager](https://support.google.com/analytics/answer/12325075){:target="_blank"} (formerly known as DoubleClick Floodlight) is Google's tool to measure ad impressions and report on conversions. With this integration, Segment customers can make use of their existing tracking implementation to send data to Campaign Manager 360 without having to manage additional tags or code on their site.

When you have Segment installed and enable this destination, Segment takes care of loading the Google Tag (gtag.js library) for you, ensuring data is forwarded to your Floodlight configuration in Campaign Manager.


### Getting Started

1. Before you connect Segment to Google Tag for Campaign Manager, ensure you have set up your Floodlight configurations in Campaign Manager.
2. Navigate to the Segment web app, select Connections, then click on Destinations.
3. Search for "Google Tag for Campaign Manager" in the Destinations Catalog and click on the destination.
4. Choose "Configure Google Tag for Campaign Manager."
5. Select the appropriate source that will forward data to Campaign Manager.
6. On the Settings tab:
    * Enter the Advertiser ID found under Floodlight -> Configuration in Campaign Manager.
    * Set Allow Ad Personalization Signals as per your need.
    * Decide if you want to enable Conversion Linker which helps with first-party cookie tracking.
7. Once done, Segment will begin forwarding the appropriate events and conversions to your Floodlight configurations.


## Sales Activity

Capture monetary conversion data like revenue, order quantity, and transaction ID.

### Configuration Fields:

- **activityGroupTagString**: Identifier for the Floodlight activity group.
- **activityTagString**: Identifier for the Floodlight activity.
- **enableDynamicTags**: Toggle for dynamic tags.
- **countingMethod**: Conversion counting method (`transactions`, or `items_sold`).
- **transactionId**: Unique transaction ID.
- **revenue**: Total revenue of a transaction.
- **quantity**: For `transactions` counting method, this is typically is set to 1, for `items_sold`, the quantity of items sold.
- **uVariables**: Additional custom Floodlight variables.
- **dcCustomParams**: Custom data for event snippets.



## Counter Activity

Track non-monetary conversion data such as unique users, conversions, and session length.

### Configuration Fields:

- **activityGroupTagString**: Identifier for the Floodlight activity group.
- **activityTagString**: Identifier for the Floodlight activity.
- **enableDynamicTags**: Toggle for dynamic tags.
- **countingMethod**: Conversion counting method (`standard`, `unique`, or `per_session`).
- **sessionId**: Unique session ID (relevant for `per_session` counting).
- **uVariables**: Custom Floodlight variables.
- **dcCustomParams**: Custom data for event snippets.

---
