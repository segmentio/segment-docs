--- 
title: ID Sync
beta: true
plan: engage-foundations
---

Use ID Sync to select identifiers and a sync strategy when you send Engage Audience data to your Destinations. Configure how you send your identifiers, which provides more control over the data you send. 

On this page, you'll learn how to configure and begin using ID Sync.
 

> success ""
> If you haven't connected a Destination yet, view more about [Trait Activation setup](/docs/engage/trait-activation/trait-activation-setup/).

## Requirements

To use ID Sync, you must have the following:

- Engage Foundations
- A workspace approved for ID Sync
- No more than three identifiers using the **ALL** strategy for an Audience or Destination

## Set up ID Sync

To configure ID Sync:

1. Navigate to **Engage** > **Audiences**.
2. [Create a new Audience](/docs/engage/audiences/). From the **Select Destination** tab in the Audience builder, select your Destination.
- If you don't see any destinations to add, you'll need to [add the destination](/docs/connections/destinations/add-destination/#adding-a-destination) to your Engage space first.
- For existing Audiences, you'll find your connected Destination on the Audience Overview page.
3. In the **Event Settings** section, you'll see two options: **Default Setup** and **Customized Setup**. To use ID Sync, select [**Customized Setup**](#customized-setup). 

### Default setup 

Default setup uses default Segment Destination behavior. To use the default settings, click **Save** and resume building your Audience. 

You can return to customize additional event settings at any time. 

### Customized setup 

With Customized setup, you can choose which identifiers you want to map downstream to your Destination.

1. Using **Customized Setup**, click **+ Add Identifier** and add the identifiers:
- **Segment**: Choose your identifiers from Segment.
- **Destination**: Choose which identifiers you want to map to in your Destination. If the destination doesn't contain the property, then outgoing events may not be delivered to your destination.
- *Facebook Custom Audiences* and *Google Ads Remarketing Lists* display a dropdown for you to choose available identifiers. 
- *Iterable* and *Zendesk* autopopulate an open text field which you can modify.
2. Add an ID strategy. 
- This is a strategy for a particular identifier which sends either the `last added`, `first added`, or `all` identifiers to your destination.
3. Click **Save**, then finish building your Audience.


## Limits and best practices

- Segment recommends using ID Sync with new Audiences. 
- ID sync configuration changes apply to new data flowing after about five minutes. Changes don't apply to active or running syncs. 
- ID Sync used on existing Audience destinations doesn't automatically resync the entire audience. Only new data flowing into Segment adheres to your ID Sync configuration. 
- Any changes are irreversible as Segment doesn't maintain ID Sync history. 
- You can only select a maximum of three identifiers with an `all` strategy.


## Frequently asked questions
{% faq %}
{% faqitem What's the difference between Trait Enrichment and ID Sync? %}

**Trait Enrichment** maps the traits data you've collected with Engage to use when syncing Engage Audiences to destinations. 

**ID Sync** maps the identities data gathered for a profile for use when syncing Engage Audiences to destinations.

{% endfaqitem %}

{% faqitem How do syncs differ between Audiences with ID Sync and Audiences without ID Sync? %}

Audiences without an ID Sync aren't allowed to select any strategy, and by default will send all values of an identifier to the destination. Also, audiences without an ID Sync do not provide provision to send any custom identifiers that are present in your space. 

ID Sync on existing Audience destinations do not automatically resync the entire audience. Only new data flowing into Segment adheres to the new ID Sync configuration.

{% endfaqitem %}

{% faqitem Can I edit config once the audience has synced? %}
Yes, you can edit configuration in the Destination **Settings** tab at any time. However, changes will only take place in subsequent audience syncs or in new audiences connected to the destination.
{% endfaqitem %}
{% endfaq %}