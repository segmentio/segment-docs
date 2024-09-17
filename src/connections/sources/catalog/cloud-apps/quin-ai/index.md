---
title: Quin AI Source
id: WGp9SQFRVu
---

Quin AI is the first deep learning, real-time behavior prediction system dedicated to e-commerce conversion optimization for growth and profitability.

This source is maintained by Quin Audience Engine. For any issues with the source, [contact the Quin Audience Engine Support team](mailto:hello@quinengine.com).

## Getting started

1. From your workspace's Source page, click **Add Source**.
2. Search for "Quin AI" in the Sources Catalog, select Quin AI, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.
  - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (eg. QuinAI_Prod, QuinAI_Staging, QuinAI_Dev).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. 6. Log in to your [Quin account](https://portal.quinengine.com/){:target="_blank”} and navigate to **Integrations > Segment > Settings**.
7. On the Settings page, paste your Segment write key to connect.

## Stream

Quin AI uses a stream Source component and Track and Identify methods to send event data to Segment. These events are then available in any destination that accepts server-side events and as a schema in your data warehouse that you can query using SQL.

The default behavior is for Quin AI to pass the event data associated with the anonymousId.

## Events

The table below lists events that Quin sends to Segment. These events appear as tables in your warehouse and as regular events in other Destinations.

| Event Name | Description                        |
|------------|------------------------------------|
| Page View  | Get an action after viewing a page |
| Click      | Get an action after a click        |  


## Event Properties

The table below list the properties included in the events listed above.

| Property Name                 | Description                                                 |
|-------------------------------|-------------------------------------------------------------|
| `action_audience_id`          | ID of the target audience for the action                    |
| `action_control_group`        | Boolean indicating if the action is part of a control group |
| `action_id`                   | Unique identifier for the action                            |
| `action_is_custom`            | Boolean indicating if the action is custom                  |
| `action_name`                 | Name of the action                                          |                          
| `action_type`                 | Type of the action                                          |                         
| `basket_price`                | Total price of the items in the basket                      |                         
| `basket_quantity`             | Total quantity of items in the basket                       |                         
| `event_action`                | Type of event action (e.g., pageview, click)                |                       
| `event_category`              | Category of the event                                       |                                                          
| `event_count`                 | Number of events                                            |                        
| `event_custom_attributes`     | Map of custom attributes associated with the event          |                         
| `evet_duration`               | Duration of the event in seconds                            |                        
| `event_label`                 | Label of the event                                          |                        
| `event_platform`              | Platform on which the event occurred (e.g., web, mobile)    |                        
| `event_timestamp`             | Timestamp when the event occurred                           |                       
| `event_url`                   | URL associated with the event                               |                      
| `google_client_id`            | Google Analytics client ID                                  |                        
| `item_category`               | Category of the item                                        |                                                             
| `item_currency`               | Currency of the item price (e.g., TRY)                      |                                                             
| `item_custom_attributes`      | Map of custom attributes associated with the item           |                                                             
| `item_id`                     | Unique identifier for the item                              |                                                             
| `item_name`                   | Name of the item                                            |                                                             
| `item_price`                  | Price of the item                                           |                                                             
| `most_visited_category`       | List of most visited categories                             |                                                             
| `most_visited_category_count` | Number of times the most visited categories were visited    |                                                             
| `prediction`                  | Map of prediction probabilities for various outcomes        |
| `returning_user`              | Boolean indicating if the user is a returning user          |                                                             
| `session_id`                  | Unique identifier for the session                           |                                                             
| `utm_campaign`                | UTM campaign parameter                                      |                                                             
| `utm_mdedium`                 | UTM medium parameter                                        |                                                             
| `utm_source`                  | UTM source parameter                                        |                                                                              


## Adding Destinations

Now that your Source is set up, you can connect to Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect.

If there are any issues with how the events are arriving to Segment, [contact the Quin AI support team](mailto:hello@quinengine.com).
