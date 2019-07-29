---
rewrite: true
---

[CustomerSuccessBox](https://customersuccessbox.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is Outcome Driven Customer Success software, which helps maximize retention, drive product adoption and grow revenue for your B2B SaaS

This destination is maintained by CustomerSuccessBox. For any issues with the destination, please [reach out to their team](mailto:support@customersuccessbox.com).

_**NOTE:** The CustomerSuccessBox Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 10, 2019. If you are interested in joining their beta program or have any feedback to help improve the CustomerSuccessBox Destination and its documentation, please [let  their team know](mailto:support@customersuccessbox.com)!_


## Getting Started

{% include content/connection-modes.md %}


### Adding Destination

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "CustomerSuccessBox" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Copy "API key for POST request" from under "Settings (Gear icon) > Developer Console > API Key tab" in your CustomerSuccessBox.
4. Fill "API key for POST request" as "API Key" for CustomerSuccessBox Destination app in Segment UI

## Identify

Send **account_id** and **user_id** in **traits** of an identify call to set and update the traits of a unique user belonging to a unique Account.

To learn more about user traits that are supported (including custom traits), check **User traits** section from [here](https://support.customersuccessbox.com/article/77-customersuccessbox-destination-on-segment-com)

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userID123', {
	account_id: '12345678',
	user_id: 'john.doe@company.com'
});
```

Identify calls will be sent to CustomerSuccessBox as an `identify` event.


## Track

Send **account_id** and **user_id** in properties of a track call to attribute the event to a unique user belonging to a unique Account.

You can also pass **product_id** and **module_id** in properties of a track call to define a module and product for the event. To learn more, check **Understanding Product Usage** section [here](https://support.customersuccessbox.com/article/70-getting-started-with-customersuccessbox)

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Order Received', {
	cost: "$120.00",
	account_id: '12345678',
	user_id: 'john.doe@company.com'
});
```

Track calls will be sent to CustomerSuccessBox as a `track` event.


## Group

Send **account_id** in traits of a group call to set and update the traits of a unique Account.

To learn more about account traits that are supported (including custom traits), check **Account traits** section from [here](https://support.customersuccessbox.com/article/77-customersuccessbox-destination-on-segment-com)

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/spec/group/) does. An example call would look like:

```
analytics.group('accountId123', {
	account_id: '12345678',
	name: "ABC Group"
});
```

Group calls will be sent to CustomerSuccessBox as an `account`event.

## Page

Send **account_id** and **user_id** in properties of a page call to attribute the pageview to a unique user belonging to a unique Account. .

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page('orders', {
title: "My Orders",
...
account_id: '12345678', //CustomerSuccessBox Account identifier
user_id: 'john.doe@company.com' //CustomerSuccessBox User identifier
});
```

Page calls will be sent to CustomerSuccessBox as an `page` event.

---