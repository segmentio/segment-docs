---
title: Trait Enrichment 
beta: true 
plan: engage-foundations
---

Use Trait Enrichment to access Segment profile traits when you sync Audiences and Journeys to Destinations. With Trait Enrichment, you can use custom, SQL, computed, and predictive traits to enrich the data you map to your destinations. 

> success "Trait Activation setup"
> Visit the Trait Activation [setup doc](/docs/engage/trait-activation/trait-activation-setup/) for supported destinations and more on how to get started with Trait Activation.

> info ""
> The setup steps you'll use for Trait Enrichment depend on the type of Destination [you've connected](/docs/engage/trait-activation/trait-activation-setup/). 
> - For Iterable, Facebook Custom Audiences, Zendesk, and Google Adwords, use [set up Trait Enrichment](#set-up-trait-enrichment). 
> - If you're using SendGrid, Braze, or Salesforce Actions, use the [Destination Actions setup steps](#destination-actions-setup). 

> warning ""
> You must have Engage Foundations to use Trait Enrichment.

## Set up Trait Enrichment

> info ""
> If you're using Destination Actions, visit the setup instructions [here](#destination-actions-setup).

To map Trait Enrichment to your destination:

1. Navigate to **Engage** > **Audiences**.
2. [Create a new Audience](/docs/engage/audiences/). From the **Select Destination** tab in the Audience builder, select your destination.
- If you don't see any destinations to add, you'll need to [add a destination](/docs/connections/destinations/add-destination/#adding-a-destination) to your Engage space first.
- For existing Audiences, select the connected Destination from the Audience Overview page.
3. In the **Event Settings** section, you'll see two options: **Default Setup** and **Customized Setup**. For Trait Enrichment, select [**Customized Setup**](#customized-setup). 

### Default setup 

Default setup uses default Segment Destination settings without Trait Enrichment. To use the default settings, select **Default Setup**, then click **Save** to resume building your Audience. 

You can customize event settings at any time. 

### Customized setup

With Customized setup, you can choose which traits you want to map to your destination. 

1. Click **Customized Setup**, then click **Add Trait**.
2. Select all traits you want to sync to your destination, and click **Save**. 
- Use the **Segment** column to select traits from the Segment Spec. 
- Use the **Destination** column to select which traits you want to map to in your destination. By default, Segment attempts to find traits with matching names.
3. Click **Save** and finish building your audience.

> info ""
> Segment sends traits you select for enrichment in the traits object in Identify calls, and as properties in the properties object in Track calls.

### Destination requirements 

The following are a list of destination-specific requirements for using Trait Enrichment. 

#### Iterable

Users can sync as many traits as they would like to Iterable. Iterable doesn't require you to map Segment traits to specific Iterable fields. 

#### Facebook Custom Audiences

You can only sync the following traits to Facebook:
- `email`
- `context.device.advertisingId`
- `firstName`
- `lastName`
- `phone`
- `gender`
- `birthYear`
- `birthMonth`
- `birthday`
- `address.state`
- `address.city`
- `address.postalCode`
- `address.country`

Each trait you select must map to a Facebook key.

#### Zendesk

If you're using Zendesk, you must include the `firstName` and `lastName` traits as part your mapping. 

#### Google Ads Remarketing Lists

`email` is required when syncing to Google, because every payload will send `email` (as an identifier) downstream in addition to phone number. 

Additionally, you can only map one trait per audience to Google as a phone number.

## Destination Actions setup

If you're using [Destination Actions](/docs/connections/destinations/actions/), use the following steps to set up Trait Enrichment.

1. Navigate to **Engage > Engage settings**. 
2. Select the Destinations tab, then click **+ Add Destination**. Search for either Braze Cloud Mode (Actions), Salesforce (Actions), or SendGrid Marketing Campaigns. 
3. Enter your destination credentials.
4. Navigate to **Engage > Audiences**, and click **+ Create**. 
5. From the Select Destinations screen in the Audience builder, select your destination. 
6. Confirm that "Send Identify" is toggled on. Next, select **Customized Setup**.
7. Select **Add Trait**. Then, select the traits you want to sync and click **Save**.

### Configure mappings in your Destination

After you add traits, configure how your selected traits will map to your Destination.

> success ""
> Keep your Engage Audience open in a separate tab, as you'll need to return. 

1. Navigate to **Connections > Destinations** and select your destination.
1. From the Destination overview screen, select the **Mappings** tab. 
2. Click **+ New Mapping**.
- **Braze Cloud Mode (Actions)**: Use a preset mapping called "Update User Profile". 
- **Salesforce (Actions)**: Use `Identify calls` as your event trigger.
- **SendGrid Marketing Campaigns**: Configure an "Upsert Contact" mapping. Use `Identify calls` as the event trigger. 
3. Locate the  **Select mappings** section to confirm the default field mappings match the traits in your custom setup. 
- To update a trait field mapping, click on a field, and in the dropdown search bar enter `traits.` followed by your trait. For example, `traits.email`. Then, click **Use as an event variable**.
4. Click **Save** and navigate back to Engage to finish building your Audience. 


## Use Trait Enrichment with Journeys

You can also use Trait Enrichment with [Journeys](/docs/engage/journeys/). 

As you're creating or editing your Journey, set up Trait Enrichment with any of the [supported destinations](/docs/engage/trait-activation/trait-activation-setup/).

1. From a Journeys step, select your destination to customize event settings. 
2. On the Connection Settings tab, select **Customized Setup**  and use the [steps above](#customized-setup) to customize the way data is sent to your destination by creating identifier and trait mappings. 

## Best practices

For best results with Trait Enrichment, Segment recommends:
- Using Trait Enrichment with new audiences.
- Using smaller audiences for real-time use cases, as data delivery is slower for large audiences. 

## Frequently asked questions
{% faq %}
{% faqitem What's the difference between Trait Enrichment and ID Sync? %}

**Trait Enrichment** lets you map the traits data you've collected with Engage to use when syncing Engage Audiences to destinations. 

**ID Sync** lets you map the identities data gathered for a profile for use when syncing Engage Audiences to destinations.

{% endfaqitem %}

{% faqitem How do syncs differ between Audiences with Trait Enrichment and Audiences without Trait Enrichment? %}

Trait Enrichment on existing Audience destinations doesn't automatically resync the entire audience. Only new data flowing into Segment will adhere to the new trait criteria. 

{% endfaqitem %}

{% faqitem Can I edit mappings once Segment syncs the Audience? %}

Yes, you can edit mappings in the Destination `Mappings` tab at any time. However, changes will only take place in subsequent audience syncs or in new audiences connected to the destination.

{% endfaqitem %}

{% faqitem Does Trait Enrichment guarantee match rate improvements? %}

No. Segment doesn't guarantee match rate improvements with Trait Enrichment. Match rates depend on data quality.

{% endfaqitem %}
{% endfaq %}
