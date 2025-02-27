--- 
title: ID Sync
beta: true
plan: engage-foundations
---

Use ID Sync to select identifiers and a sync strategy when you send Audience or Journeys data to your destinations or destination functions. Configure how you send identifiers, which provides more control over the data you send downstream. 

On this page, you'll learn how to configure and begin using ID Sync.

## Set up ID Sync

Use the following steps to set up ID Sync with Audiences or Journeys.

### Set up ID Sync with Audiences 

To set up ID Sync with [Audiences](/docs/engage/audiences/):

1. Navigate to **Engage** > **Audiences**.
2. [Create a new Audience](/docs/engage/audiences/). From the **Select Destination** tab in the Audience builder, select your destination.
- If you don't see any destinations to add, you'll need to [add the destination](/docs/connections/destinations/add-destination/#adding-a-destination) or [destination function](docs/connections/functions/destination-functions/#create-a-destination-function) to your Engage space first.
- For existing audiences, you'll find your connected destination on the Audience Overview page.
3. In the **Event Settings** section, you'll see two options: **Default Setup** and **Customized Setup**. To use ID Sync, select [**Customized Setup**](#customized-setup). 

### Set up ID Sync with Journeys

You can configure ID Sync with Journeys as you're creating or editing your journey in the [builder](/docs/engage/journeys/build-journey/).

1. From a journey step, select the destination you're going to use with ID Sync. 
2. On the Connection Settings tab, select **Customized Setup** and use the corresponding [steps below](#customized-setup) to customize which identifiers you want to map downstream to your destination. 

### Default setup 

Default setup uses default Segment Destination behavior. To use the default settings, click **Save** and resume building your audience or journey. 

You can customize additional event settings at any time. 

### Customized setup 

With Customized setup, you can choose which identifiers you want to map downstream to your destination.

> warning "Review your settings before configuring an ID strategy"
> If you want to send `ios.idfa` as a part of your ID strategy, confirm that you've enabled the Send Mobile IDs setting when connecting your destination to an audience or journey.   

1. Using **Customized Setup**, click **+ Add Identifier** and add the identifiers:
- **Segment**: Choose your identifiers from Segment.
- **Destination**: Choose which identifiers you want to map to from your destination. If the destination doesn't contain the property, then outgoing events may not be delivered.
- *Facebook Custom Audiences* and *Google Ads Remarketing Lists* display a dropdown for you to choose available identifiers. 
2. Add an ID strategy. 
- This is a strategy for a particular identifier which sends either the `last added`, `first added`, or `all` identifiers to your destination.
3. Click **Save**, then finish building your audience or journey.
 
## Limits and best practices

- Segment recommends using ID Sync with new audiences. 
- ID sync configuration changes apply to new data flowing after about five minutes. Changes don't apply to active or running syncs. 
- ID Sync used on existing audience destinations or destination functions won't resync the entire audience. Only new data flowing into Segment follows your ID Sync configuration. 
- Segment doesn't maintain ID Sync history, which means that any changes are irreversible. 
- You can only select a maximum of three identifiers with an `All` strategy.
- Segment recommends that you map Segment properties to destination properties using [Destination Actions](/docs/connections/destinations/actions/#components-of-a-destination-action) instead of ID Sync. If you use ID Sync to map properties, Segment adds the property values as traits and identifiers to your Profiles. 


## FAQs

#### What's the difference between Trait Enrichment and ID Sync? 

**Trait Enrichment** lets you map the traits data you've collected with Engage to use when syncing audiences and Journeys to destinations and destination functions. 

**ID Sync** lets you map the identities data gathered for a profile for use when syncing audiences and Journeys to destinations and destination functions.

#### How do syncs differ between audiences with ID Sync and audiences without ID Sync? 

Audiences without ID Sync aren't allowed to select any strategy, and by default will send all values of an identifier to the destination. Also, audiences without ID Sync don't send any custom identifiers that are present in your space. 

#### Can I edit config once the audience has synced? 
Yes, you can edit configuration in the Destination **Settings** tab at any time. However, changes will only take place in subsequent audience syncs, or in new audiences connected to the destination.