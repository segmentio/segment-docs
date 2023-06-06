---
title: Voucherify Source
hidden: true
---
[Voucherify](https://voucherify.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is an API-first Promotion Engine for growth teams. With Voucherify, marketers can run dynamic and personalized promotions and loyalty programs without the involvement of the development team. Run CDP-powered coupons, discounts, referrals, loyalty programs, gift cards, cashback, bundles, and more.
The integration is bidirectional, which means you can configure Voucherify as both the destination and source of customer data.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also sync the exported data into your other enabled Segment Destinations.

This source is maintained by Voucherify. For any issues with the source, [contact the Voucherify team](mailto:support@voucherify.io).

> info "This is a Beta source"
> The Voucherify Source is currently in beta, which means that they are still actively developing the source. If you are interested in joining their beta program or have any feedback to help improve the Voucherify Source and its documentation, [contact the Voucherify team](mailto:support@voucherify.io).

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "Voucherify" in the Sources Catalog, select Voucherify, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings. The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends you use something that reflects the source itself and distinguishes amongst your environments.
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to your Voucherify account. 
6. In your Voucherify account, go to **Project Settings > Integrations > Segment.io > Connect** and enter the Write Key.

## Stream

Voucherify uses the stream Source component to send Segment event data. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL. These events are also assigned to user accounts in the Segment Profiles (Unify). 

By default, Voucherify passes a customer's associated `userId` to Segment. Because Voucherify sends customer-triggered events only, `anonymousId` is not used. The Voucherify source doesn't send anonymous events to Segment. As a result, events that aren't assigned to or called by a customer are ignored. For mapping, `source_id` on Voucherify events becomes the `user_id` in Segment.

## Events
Integrating by adding Voucherify as a Source to Segment supports the following events to be sent out of the box:
- Redemption events (successful, failed, rolled back). 
- Validation events (only if connected with a customer). 
- Publication events.
- Customer reward events.

Below are the events that Voucherify sends to Segment. These events appear as tables in your warehouse and as regular events in other Destinations. Voucherify includes the `userId` if available.

### Redemption events
| Event                                  | Description                                                                                                                                    | Fields                                                                                                                        |
|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Customer Redemption Succeeded          | Triggered when a redemption is successfully completed by a customer (successful use of a voucher to receive a discount or other reward).       | order (object), promotion_tier (object), redemption (object), voucher (object), holder (object)                               |
| Customer Redemption Failed             | Triggered  when a redemption attempt fails due to an issue with the voucher or customer.                                                       | order (object), promotion_tier (object), redemption (object), voucher (object), holder (object)                               |
| Customer Redemption Rollback Succeeded | Triggered when a redemption is successfully rolled back, which means removal of the voucher and reversal of any associated discount or reward. | order (object), promotion_tier (object), redemption (object), redemption_rollback (object), voucher (object), holder (object) |
| Customer Redemption Rollback Failed    | Triggered when an attempt to roll back the redemption fails.                                                                                   | order (object), promotion_tier (object), redemption (object), redemption_rollback (object), voucher (object), holder (object) |

### Customer rewarded events
| Event                                 | Description                                                                                 | Fields                                                                                                                               |
|---------------------------------------|---------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Customer Reward Redemptions Created   | Triggered when a customer redeems a reward in Voucherify account.                           | reward (object), reward_assignment (object), reward_redemption (object), voucher (object), source (object), holder (object), balance |
| Customer Reward Redemptions Completed | Triggered when a customer's redemption request is completed (customer received the reward). | reward (object), reward_assignment (object), reward_redemption (object), voucher (object), source (object), holder (object), balance |
| Customer Rewarded                     | Triggered when a customer is rewarded with a main reward.                                   | redemption (object),  referral_tier (object), reward (object), voucher (object), holder (object), balance                            |
| Customer Rewarded Loyalty Points      | Triggered when a customer is rewarded with loyalty points.                                  | earning_rule (object),  loyalty_tier (object), order (object), voucher (object), holder (object), balance                            |

### Validation events
| Event                         | Description                                                                        | Fields              |
|-------------------------------|------------------------------------------------------------------------------------|---------------------|
| Customer Validation Succeeded | Triggered when a customer's validation is completed (customer entered valid code). | validation (object) |
| Customer Validation Failed    | Triggered when a customer's validation fails.                                      | validation (object) |

### Publication events
| Event                          | Description                                                                          | Fields               |
|--------------------------------|--------------------------------------------------------------------------------------|----------------------|
| Customer Publication Succeeded | Triggered when a publication (assigning a code to particular customer) is completed. | publication (object) |
| Customer Publication Failed    | Triggered when a publication (assigning a code to particular customer) fails.        | publication (object) |


## Event Properties

The table below shows common properties for each event.

| Event     | Description                                                                                                       |
|-----------|-------------------------------------------------------------------------------------------------------------------|
| userId    | The id used to identify the customer in Voucherify. It's the same id as the source_id in Voucherify.              |
| email     | Customer's email.                                                                                                 |
| event     | Event name.                                                                                                       |
| timestamp | Date and time the event occurred                                                                                  |
| customer  | Customer object. Contains fields such as: id, email, source_id and name.                                          |
| campaign  | Campaign object. Contains fields such as: id, name, created_at, type, active. It may include voucher information. |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Voucherify support team](mailto:support@voucherify.io).
