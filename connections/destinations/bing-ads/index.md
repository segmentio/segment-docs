---
rewrite: true
---

 [Bing Ads](https://bingads.microsoft.com) enables Marketers to track and monitor campaigns, clicks, CTRs, spend and budget. Bing Ads lets you place cross-device product ads in front of Bing, Yahoo, and MSN customers and support imported pay-per-click ad campaigns from third-party platforms like Google AdWords. With Bing Ads you can also retarget ads to customers after they complete an action like leaving a shopping cart or viewing a product without purchasing. Learn more about all you can do with Bing Ads [here](https://advertise.bingads.microsoft.com/en-us/resources/training/what-is-bing-ads). You can also browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-bing-ads).

This document was last updated on January 29, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{{>connection-modes}}

Before you can track conversions or target audiences, you need to create a UET tag in Bing Ads and then add it to the destination settings. Follow the steps within [the Bing Ads documentation to create a UET tag](https://advertise.bingads.microsoft.com/en-us/resources/training/universal-event-tracking).

Once you have created the Tag ID, you can follow the steps below:

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for “Bing Ads” within the Destinations Catalog and confirm the Source you’d like to connect to. Please note the source must be sending events via our Javascript library Analytics.js.
3. Drop in your Tag Id
4. In about 5-10 minutes the CDN will be updated and Bing Ads' snippet will be initialized onto your page.

_**Note:** You'll only be able to include one Tag ID per source so make sure to associate the conversion goals to the correct Tag ID that is included in your settings._

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```javascript
// name and properties are optional
analytics.page();
```

Page events will be sent to Bing Ads as a `Page Load` event where name and properties are optional. 

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. 

In order for us to map your track events to a Conversion Goal, you'll first need to create the goal on your Bing Ads account:

1. Click the **Campaigns** tab, and then on the left pane, click **Conversion Tracking**.
2. Under **Conversion Tracking**, click **Conversion Goals**.
3. On the conversion goals page, click **Create conversion goal**.
4. Enter a name for your goal in the **Goal name** box. When naming your goal, use a descriptive name that makes sense to you. (For example, "Checkout page")
5. Choose the `Event` type of conversion and click **Next**.
6. Fill in the appropriate values. Make sure to add the Segment event name as the **label** field and to associate the goal to the correct Tag (**UET Tag**) that is set up in your Segment source.


![creating a goal in Bing Ads](images/creating-a-goal-new.png)


Only the event name is required - other properties are optional. An example track call is shown below:

```javascript
// Segment event
analytics.track('Order Completed', {
    category: 'tools'
    revenue: 25,
    ... // additional properties
});
```

**Label**: Event Name (`'Order Completed'` in this case)

**Value**: `revenue` property

**Category**: `category` property


## Troubleshooting

{{> client-side-script-unverified}}
