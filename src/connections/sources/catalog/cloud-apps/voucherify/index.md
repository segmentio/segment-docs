## title: Voucherify Source

> (delete after reading) Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

[Voucherify](https://voucherify.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) [text]

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

> (delete after reading) Update your company name and support email address.

This source is maintained by Voucherify. For any issues with the source, [contact their Support team](mailto:support@voucherify.io).

> (delete after reading) Update your company name (x2) and support email address.

_**NOTE:** The Voucherify Source is currently in beta, which means that they are still actively developing the source. This doc was last updated on <Month_Name DD, YYYY>. If you are interested in joining their beta program or have any feedback to help improve the Voucherify Source and its documentation, [let their team know](mailto:support@voucherify.io)!_

## Getting Started

> (delete after reading) Include clear, succinct steps including hyperlinks to where customers can locate the place in your app to enter their Segment writekey.

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "Voucherify" in the Sources Catalog, select Voucherify, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.

   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to your Voucherify account. 
6. To finish the set up, go to your Voucherify account, then go to Project Settings > Integrations > Segment.io, and enter the Write Key.

## Stream

> (delete after reading) Clarify the type of Segment events your integration will send. 

Voucherify uses our stream Source component to send Segment event data. It uses a server-side (select from `track`, `identify`, `page`, `group`) method(s) to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

> (delete after reading) Clarify how your integration includes user identifiers in your event payloads, the example below is from Klaviyo:

The default behavior is for Voucherify to pass the `userId` associated with the customer. There are cases in which Voucherify does not have an associated `userId`, in which case the customer will be associated with the `anonymousId`. 

> (delete after reading) For each of the below sections, populate the event and properties that a customer would expect to receive in their downstream tools from your Event Source.

## Events

The table below lists events that Voucherify sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Voucherify includes the `userId` if available.

Redemption events: 

<table>
  <tr>
    <td>Redemption succeeded</td>
    <td>Triggered when a redemption is successfully completed by a customer (successful use of a voucher to receive a discount or other reward).</td>
  </tr>
  <tr>
   <td>Redemption failed</td>
   <td>Triggered  when a redemption attempt fails, due to an issue with the voucher or customer.</td>
  </tr>
  <tr>
   <td>Redemption rollback succeeded</td>
   <td>Triggered when a redemption is successfully rolled back, which means removal of the voucher and reversal of any associated discount or reward.</td>
  </tr>
  <tr>
   <td>Redemption rollback failed</td>
   <td>Triggered when an attempt to rollback the redemption has failed. </td>
  </tr>
  </table>

 Customer rewarded events: 

  <table>
<tr>
   <td>Customer creates a reward redemption request</td>
   <td>Triggered when a customer redeems a reward in Voucherify account.</td>
  </tr>
  <tr>
   <td>Customer reward redemption completed</td>
   <td>Triggered when a customer's redemption request is completed (customer received the reward).</td>
  </tr>
  <tr>
   <td>Reward redemption created</td>
   <td>Triggered when a reward redemption is created.</td>
  </tr>
    <tr>
   <td>Reward redemption completed</td>
   <td>Triggered when a reward redemption is successfuly completed.</td>
  </tr>
   <tr>
   <td>Customer rewarded</td>
   <td>Triggered when a customer is rewarded with a main reward. (a type of reward that is associated with a specific voucher campaign and is typically the primary incentive offered to customers.</td>
  </tr>
    <tr>
   <td>Customer rewarded with loyalty points</td>
   <td>Triggered when a customer is rewarded with loyalty points.</td>
  </tr>
  <tr>
  </table>

Validation events:

  <table>
   <tr>
   <td>Validation succeeded</td>
   <td>Triggered when a customer's validation is completed (customer entered valid code).</td>
  </tr>
     <tr>
   <td>Validation failed</td>
   <td>Triggered when a customer's validation has failed.</td>
  </tr>
</table>

Publication events:

  <table>
   <tr>
   <td>Publication succeeded</td>
   <td>Triggered when a publication (assigning a code to particular customer) is completed.</td>
  </tr>
   <tr>
   <td>Publication failed</td>
   <td>Triggered when a publication (assigning a code to particular customer) has failed.</td>
  </tr>
</table>

## Event Properties

The table below list the properties included in the events listed above.

<table>
  <tr>
   <td>voucherifyEvent</td>
   <td>The entire event object that occured in Voucherify.</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Voucherify support team](mailto:support@voucherify.io).
