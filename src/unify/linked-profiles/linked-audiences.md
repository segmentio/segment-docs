---
title: Linked Audiences

---

With Linked Audiences, you can use the relational data you've defined in your Data Graph to build audiences and send them to your downstream destinations. 

From the relationships you've defined between a profile and entities, you can filter on profile traits, entity attributes, and associated events to create audiences.

> success ""
> Before you build Linked Audiences, be sure you've defined entities in your [Data Graph](/docs/unify/linked-profiles/data-graph/). 


## Getting started

To help you get started with Linked Audiences, keep the following guidelines in mind. 

- It may be helpful to first identify an entity that is directly associated with your users, such as `Accounts`, `Households`, or `Organizations`.
- From there you can define relationships between this entity with any of the other entities that may be directly associated with it, such as how `Accounts` can have the following:
    - `Subscriptions` 
    - `Purchases`
    - `Carts` 
- You can create entity relationships up to four levels in depth. For example, you can build an entity condition that queries for relationships between `Profiles`, `Accounts`, `Credit Cards`, and finally `Transactions`. 
- Along the way, identify column values that you might also want to filter your entities by to further refine your audiences. 

## Use Cases

Below are some example use cases to help you learn more about Linked Audiences.

### Build an audience of cat owners

Build an audience with `Households` and `Pets` where:
- `pets.type` equals "cat".

In the Data Graph, `Households` and `Pets` are defined as entities and are represented as separate tables in your data warehouse. 

Relationships are defined between:
 - `Profiles` and `Households` 
 - `Households` and `Pets` 

In the warehouse, `pets.type` is a column in the `pets` table. By filtering against the `pets.type` column for the "cat" value, marketers can return a list of users that have a cat. 


### Build an audience of users with premium subscriptions

Build an audience with `Accounts` and `Subscriptions`, where the following are true:
- `subscription.status` equals "active"
- `subscription.tier` equals "premium"

In the Data Graph, `Accounts` and `Subscriptions` are defined as entities. Relationships are defined between:
- `Profiles` and `Accounts`
- `Accounts` and `Subscriptions` 

In the warehouse, `subscription.status` is a column in the `subscriptions` table. Marketers can refine their audience by filtering against the `subscription.status` and `subscription.tier` columns to return a list of users that have an active subscription to their premium offering.


### Build an audience of credit card holders with a certain number of transactions

Build an audience with `Accounts`, `Credit Cards`, and `Transactions` where the following are true: 
- `credit_cards.name` equals "Owly Card" 
- `transactions.count` is greater than five

In the Data Graph, `Accounts`, `Credit Cards`, and `Transactions` are defined as entities. Relationships are defined between:
- `Profiles` and `Accounts`
- `Accounts` and `Credit Cards`
- `Accounts` and `Subscriptions`

In the warehouse, `credit_cards.name` is a column in the `credit_cards` table, and `transactions.count` is a column in the `transactions` table. Marketers can create hyper-targeted user segmentations by filtering by column values or attributes, such as "Owly Card" and integers. 


## Build a Linked Audience

Use the Audience overview page to build or maintain a Linked Audiences.

1. Navigate to **Engage > Audiences**
2. Click **+ New audience**, then select **Audience**.
3. On the Select Type screen, select **Linked audience**, then click **Next**.
4. Click the **associated with entity** field to add your entity. 
- To view your entities, navigate to **Unify > Data Graph > Entities**. 
5. Enter an entity to associate your audience with, then finish building your Linked Audience. Once you're done, click **Next**.
6. Enter an Audience name and description, then click **Create Audience**.

> warning ""
> At this time, Linked Audiences can't be edited or deleted. Create a new audience to update conditions. To disable an audience, navigate to **Engage > Audiences > Settings** and toggle the **Enabled** button off.


## Activate your Linked Audience

Use the Audience overview page to build or maintain Linked Audiences.

> info ""
> The following steps apply to non-preset destinations. If you're using Braze, Iterable, or Customer io, use [these setup steps](#). <!-- What's the flow here? -->

### Step 1: Add an actions destination

To activate your Linked Audience, you'll first need to add an actions destination.

From the Add destination window, select your actions destination and click **Next**.

### Step 2: Select event
After adding an actions destination, select what type of event you want to send to the destination. Events update the destination about changes to your entity or audiences. 

You can send events:
- When an [entity on a profile changes](#entity-update)
- Based on profile [audience membership updates](#audience-update)

> info ""
> Note that you can't send events before you identify people. Ensure you're making the profile(s) known in the destination before you send events. You can do this by sending an `Audience Membership Changed` event first, or by creating a standard Identify event in Connections.

#### Entity update

Select to send an event when any of the following updates occur to an entity on a profile:

1. Entity added

Send an action to a destination when an entity associated with a profile matches the audience condition. Use these actions to orchestrate campaigns in other tools. 

Example use cases:
- Send a reminder to a customer when a credit card associated with their profile has an outstanding balance.
- Notify a traveler when a flight associated with their profile is delayed.
- Notify a customer when a product associated with their profile's wishlist is back in stock.

2. Entity removed

Send an event to a destination when an entity assoacited with the profile no longer matches the audience condition. Use these events to orchestrate campaigns in other tools. 

Example use cases:
- Send a confirmation to a customer when a credit card associated with their profile has been paid off.
- Send a confirmation to the primary doctor when each of their associated patients completes their annual check up.

#### Audience update

Select to send an event based on the following profile audience membership updates:

1. Audience Entered

Send a Track event to a destination when a profile matches the audience condition. Use these events to orchestrate campaigns in other tools.

Example use cases:

- Send a congratulatory email when a travel qualifies for premium status.
- Send a discount to all customers with a particular product on their wishlist.

<!-- removed? 
#### Audience membership changed

Send an Identify event when a profile enters or exits the audience.

Example use case:
- Update a user profile in a destination with the most recent audience membership.
-->
2. Audience exited

Send a Track event to a destination when a profile no longer matches the audience condition. Use these events to orchestrate campaigns in other tools.

Example use cases:

- Send an email to credit card owners to confirm that their credit cards have been paid in full.
- Send a confirmation to a patient when they have completed all their pre-screening forms.

#### Audience entered and exited

Send events when a profile enters and exits the audience.

<!-- add use cases here -->


### Step 3: Select an action

Next, you'll select the destination action to call when the event happens.

Segement displays available actions based on the destination action you've connected with your Linked Audience. 

Visit the [destination actions docs](/docs/connections/destinations/actions/) learn more about destination actions, and view available actions for your destination.

### Step 4: Configure the event

Finally, you'll configure your event and select additional entity context you want to send to the destination. 

To configure your event:

1. Selecting additional properties to include in each event. 
- As you're configuring your event, you can view a preview of the enriched event based on your property selections. 
2. Next, map your event from your audience to your destination.
- You can preview what the event will look like in your destination.
3. Click **Save** to save your changes, or **Save and enable** to save the configuration and enable the events. 

After saving, you'll be redirected to a destination sidesheet where you can view all configured events and their corresponding actions.

## Confirm the payload in your destination

Linked Audiences will send events to your destination after Segment computes the audience. 

To confirm your destination is receiving events, Segment recommends that you log in to your destination and perform one of the following:
- Monitor the event activity
- Search for the `UserID` or `Event Name` (for example, `Entity Added`)



