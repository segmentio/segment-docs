---
title: 'Paytronix Source'
id: Zd5BXedXsa
beta: true
---

[Paytronix](https://support-paytronix.force.com/help/s/article/000001348){:target="_blank”} is the leading provider of Digital Customer Engagement Solutions for restaurants, convenience stores, and retailers who seek to develop lasting relationships with their guests. For over 20 years, Paytronix has grown its Guest Engagement Platform to seamlessly incorporate individual components of digital customer engagement into a single, robust platform.

This is an [Event Cloud Source](docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Paytronix. For any issues with the source, [contact the Paytronix Support team](mailto:support@paytronix.com).

> info ""
> The Paytronix Source is currently in beta, which means that they are still actively developing the source. This doc was last updated on January 27, 2023. If you are interested in joining their beta program or have any feedback to help improve the Paytronix Source and its documentation, [let the Paytronix team know](mailto:support@paytronix.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Paytronix" in the Sources Catalog, select Paytronix, and click **Add Source**.
3. On the next screen, give the Source a nickname, and configure any other settings.
   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example, Paytronix_Prod, Paytronix_Staging, or Paytronix_Dev).
5. Click **Add Source** to save your settings.
6. Copy the Write key from the Segment UI. Include this WriteKey in your request to Paytronix Support to turn on the Segment Source Integration.


## Events

The table below lists events that Paytronix sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Paytronix includes the `userId` if available.

| Event Name        | Description                                             |
| ----------------- | ------------------------------------------------------- |
| POS Activity      | When a guest performs a function at the POS             |
| Identify Customer | Loyalty guest is identified                             |
| Web Registration  | Loyalty registration occurred on guest website          |
| Referral          | Refer A Friend                                          |
| Check-In          | When a guest checks-in                                  |
| Recharge Value    | Guest adds value to their stored value account          |
| Survey Completion | Guest completes survey                                  |
| Loyalty Registration | Guest signs up for loyalty account                   |
| Add/Redeem        | Guest accrues and/or spends points                      |

## Event properties

The table below list the properties included in the events listed above.

| Property Name          | Description                                         |
|------------------------|-----------------------------------------------------|
| first_name             | First name of the user                              |
| last_name              | Last name of the user                               |
| printed_card_number    | Loyalty card number                                 |
| email_opt_in           | Email Opt-In Status                                 |
| text_opt_in            | Text Opt-In Status                                  |
| store_name             | Store Name of Purchasing Site                       |
| store_code             | Paytronix Store Code of Purchasing Site             |
| store_latitude         | Purchasing Site Latitude                            |
| store_longitude        | Purchasing Site Longitude                           |
| store_city             | Purchasing Site City                                |
| store_postal_code      | Purchasing Site Zip Code                            |
| store_state            | Purchasing Site State                               |
| store_country          | Purchasing Site Country                             |
| wallets_info           | Wallet balance                                      |
| all_wallets_info       | All available information of wallets                |
| flat_wallets_info      | Wallet Code, Label, and Balance                     |


## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/){:target="_blank”} tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Paytronix support team](mailto:support@paytronix.com).
