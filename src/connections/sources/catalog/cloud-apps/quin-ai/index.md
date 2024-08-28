
### Quin AI Source

Quin AI is the first deep learning, real-time behavior prediction system dedicated to e-commerce conversion optimization, for growth and profitability.

This source is maintained by Quin Audience Engine. For any issues with the source, [contact the Quin Audience Engine Support team](mailto:hello@quinengine.com).

## Getting started

1. From your workspace's Source page, click **Add Source**.
2. Search for "Quin AI" in the Sources Catalog, select Quin AI, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.
   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your [Quin account](https://portal.quinengine.com/) and navigate to Integrations > Segment > Settings.
7. On the Settings page, paste your Segment write key to connect.

## Stream

Quin AI uses a stream Source component to send Segment event data. It uses server-side Track and Identify methods to send data to Segment. These events are then available in any destination that accepts server-side events and available in a schema in your data warehouse that you can query using SQL.

The default behavior is for Quin AI to pass the event data associated with the anonymous userId.

## Events

The table below lists events that Quin sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

| Event Name         | Description                        |
|--------------------|------------------------------------|
| pageview           | Get an action after viewing a page |
| click              | Get an action after a click        |  


## Event Properties

The table below list the properties included in the events listed above.

| Property Name              | Description                                                 |
|----------------------------|-------------------------------------------------------------|
| `ActionAudienceId`         | ID of the target audience for the action                    |
| `ActionControlGroup`       | Boolean indicating if the action is part of a control group |
| `ActionId`                 | Unique identifier for the action                            |
| `ActionIsCustom`           | Boolean indicating if the action is custom                  |
| `ActionName`               | Name of the action                                          |                          
| `ActionType`               | Type of the action                                          |                         
| `BasketPrice`              | Total price of the items in the basket                      |                         
| `BasketQuantity`           | Total quantity of items in the basket                       |                         
| `EventAction`              | Type of event action (e.g., pageview, click)                |                       
| `EventCategory`            | Category of the event                                       |                                                          
| `EventCount`               | Number of events                                            |                        
| `EventCustomAttributes`    | Map of custom attributes associated with the event          |                         
| `EventDuration`            | Duration of the event in seconds                            |                        
| `EventLabel`               | Label of the event                                          |                        
| `EventPlatform`            | Platform on which the event occurred (e.g., web, mobile)    |                        
| `EventTimestamp`           | Timestamp when the event occurred                           |                       
| `EventURL`                 | URL associated with the event                               |                      
| `GoogleClientId`           | Google Analytics client ID                                  |                        
| `ItemCategory`             | Category of the item                                        |                                                             
| `ItemCurrency`             | Currency of the item price (e.g., TRY)                      |                                                             
| `ItemCustomAttributes`     | Map of custom attributes associated with the item           |                                                             
| `ItemId`                   | Unique identifier for the item                              |                                                             
| `ItemName`                 | Name of the item                                            |                                                             
| `ItemPrice`                | Price of the item                                           |                                                             
| `MostVisitedCategory`      | List of most visited categories                             |                                                             
| `MostVisitedCategoryCount` | Number of times the most visited categories were visited    |                                                             
| `Prediction`               | Map of prediction probabilities for various outcomes        |
| `ReturningUser`            | Boolean indicating if the user is a returning user          |                                                             
| `SessionId`                | Unique identifier for the session                           |                                                             
| `UTMCampaign`              | UTM campaign parameter                                      |                                                             
| `UTMMedium`                | UTM medium parameter                                        |                                                             
| `UTMSource`                | UTM source parameter                                        |                                                                              


## Adding Destinations

Now that your Source is set up, you can connect to Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect.

If there are any issues with how the events are arriving to Segment, [contact the Quin AI support team](mailto:hello@<quinengine.com).
