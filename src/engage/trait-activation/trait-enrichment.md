---
title: Trait Enrichment 
beta: true 
plan: engage-foundations
---

Use Trait Enrichment to access Segment profile traits when you sync Audiences and Journeys to Destinations and Destination Functions. With Trait Enrichment, you can use custom, SQL, computed, and predictive traits to enrich the data you map to your destinations. 

## Set up Trait Enrichment

Use the following steps to set up Trait Enrichment with Audiences or Journeys.


> info ""
> The setup steps you'll use for Trait Enrichment depend on the type of destination [you've connected](/docs/engage/trait-activation/trait-activation-setup/). 
> - For Facebook Custom Audiences and Google Adwords, [use these destination requirements](#destination-requirements). 
> - If you're using Destination Actions, like Salesforce Marketing Cloud, Braze Actions, or Salesforce Actions, or [Destination Functions](/docs/connections/functions/destination-functions/), use the [Destination Actions and Destination Functions setup steps](#destination-actions-and-destination-functions-setup).


### Set up Trait Enrichment with Audiences

To set up Trait Enrichment with [Audiences](/docs/engage/audiences/):

1. Navigate to **Engage** > **Audiences**.
2. [Create a new Audience](/docs/engage/audiences/). From the **Select Destination** tab in the Audience builder, select your destination.
- If you don't see any destinations to add, you'll need to [add a destination](/docs/connections/destinations/add-destination/#adding-a-destination) to your Engage space first.
- For existing audiences, select the connected Destination from the Audience Overview page.
3. In the **Event Settings** section, you'll see two options: **Default Setup** and **Customized Setup**. For Trait Enrichment, select [**Customized Setup**](#customized-setup). 

### Set up Trait Enrichment with Journeys


You can set up Trait Enrichment with Journeys as you're creating or editing your journey in the [builder](/docs/engage/journeys/build-journey/).

1. From a journeys step, select the destination you're going to use with Trait Enrichment. 
2. On the Connection Settings tab, select **Customized Setup**  and use the corresponding [steps below](#customized-setup) to customize the way data is sent to your destination by creating identifier and trait mappings. 

### Default setup 

Default setup uses default Segment Destination settings without Trait Enrichment. To use the default settings, select **Default Setup**, then click **Save** to resume building your audience or journey. 

You can customize event settings at any time. 

### Customized setup

With Customized setup, you can choose which traits you want to map to your destination or destination function. 

1. Click **Customized Setup**, then click **Add Trait**.
2. Select all traits you want to sync and click **Save**. 
- Use the **Segment** column to select traits from the Segment Spec. 
- Use the **Destination** column to select which traits you want to map to in your destination. By default, Segment attempts to find traits with matching names.
3. Click **Save** and finish building your audience or journey.


Segment sends traits you select for enrichment in the `traits` object in Identify calls (`traits.trait_1`, `traits.trait_2`), and as properties in the `properties` object in Track calls (`properties.trait_1`, `properties.trait_2`).


Here's an example Identify call payload with traits in the `traits` object:

```json
{
  "messageId": "segment-test-message-uozjhr",
  "timestamp": "2024-02-22T22:11:15.595Z",
  "type": "identify",
  "email": "test@example.org",
  "projectId": "5kXbpcJxms8WWaEdQUkRWc",
  "traits": {
    "trait1": 1,
    "trait2": "test",
    "trait3": true
  },
  "userId": "test-user-cq8idf"
}
```
And here's an example Track call payload with properties in the `properties` object:

```json
{
  "messageId": "segment-test-message",
  "timestamp": "2024-02-22T22:10:13.640Z",
  "type": "track",
  "email": "test@example.org",
  "projectId": "5kXbpcJxms8WWaEdQUkRWc",
  "properties": {
    "property1": 1,
    "property2": "test",
    "property3": true
  },
  "userId": "test-user-1tgg9e",
  "event": "Segment Test Event Name"
}
```


## Destination requirements 

The following are a list of destination-specific requirements for using Trait Enrichment. 
 
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


#### Google Ads Remarketing Lists

`email` is required when syncing to Google, because every payload will send `email` (as an identifier) downstream in addition to phone number. 

Additionally, you can only map one trait per audience to Google as a phone number.

## Destination Actions and Destination Functions setup

If you're using [Destination Actions](/docs/connections/destinations/actions/) or [Destination Functions](/docs/connections/functions/destination-functions/), use the following steps to set up Trait Enrichment.

1. Navigate to **Engage > Engage settings**. 
2. Select the Destinations tab, then click **+ Add Destination**. Trait Activation supports all [Destination Actions](/docs/connections/destinations/actions/) and [Destination Functions](docs/connections/functions/destination-functions/).
3. Select your destination or function.
4. Navigate to **Engage > Audiences**, and click **+ New audience**. 
5. From the Select Destinations screen in the Audience builder, select your destination. 
6. Confirm that **Send Track** or **Send Identify** is toggled on. 
- Trait Enrichment supports Track and Identify calls. Follow the corresponding destination instructions to determine which event you'll need.
7. Select **Customized Setup**.
8. Select **Add Trait**. Then, select the traits you want to sync and click **Save**.

### Configure mappings in your destination

After you add traits, configure how your selected traits will map to your destination.

> success ""
> Keep your Engage Audience open in a separate tab, as you'll need to return. 

1. Navigate to **Connections > Destinations** and select your destination.
1. From the Destination overview screen, select the **Mappings** tab. 
2. Click **+ New Mapping**. 
- All actions in Destination Actions can receive traits you configure with Trait Activation.
3. Locate the  **Select mappings** section to confirm the default field mappings match the traits in your custom setup. 
- To update a trait field mapping for Identify calls, click on a field, and in the dropdown search bar enter `traits.` followed by your trait (for example, `traits.trait_1`). Segment sends traits you select for enrichment as traits in the `traits` object.
- To update a trait field mapping for Track calls, click on a field, and in the dropdown search bar enter `properties.` followed by your trait (for example, `properties.trait_1`). Segment sends traits you select for enrichment as properties in the `properties` object.
- Click **Use as an event variable** to add your trait.
4. Click **Save** and navigate back to Engage to finish building your Audience.
 
## Best practices

For best results with Trait Enrichment, Segment recommends:
- Using Trait Enrichment with new audiences.
- Using smaller audiences for real-time use cases, as data delivery is slower for large audiences. 

## FAQs

#### What's the difference between Trait Enrichment and ID Sync? 

**Trait Enrichment** lets you map the traits data you've collected with Engage to use when syncing audiences and Journeys to destinations. 

**ID Sync** lets you map the identities data gathered for a profile for use when syncing audiences and Journeys to destinations.

#### How do syncs differ between audiences with Trait Enrichment and audiences without Trait Enrichment? 

Trait Enrichment on existing audience destinations doesn't automatically resync the entire audience. Only new data flowing into Segment will adhere to the new trait criteria. 

#### Can I edit mappings once Segment syncs the audience? 

Yes, you can edit mappings in the Destination `Mappings` tab at any time. However, changes will only take place in subsequent audience syncs or in new audiences connected to the destination.

#### Does Trait Enrichment guarantee match rate improvements? 

No. Segment doesn't guarantee match rate improvements with Trait Enrichment. Match rates depend on data quality.

#### Can I include the audience_key of the audience for which the trait enrichment is being configured as a trait?

No. Implementing this approach will update the user's profile with the previous trait value, replacing any latest value for that trait in the most recent identify call. Trait mapping serves to associate additional traits beyond the primary audience key. By activating the "Send Identify" feature, the system automatically transmits the audience_key as a trait with boolean values through the identify call to both the Engage source and the linked destination. Should you wish to dispatch other custom or SQL traits alongside the audience key within the identify call triggered by the audience, you can achieve this by specifying those traits in the trait mapping. As a result, the identify call that includes the mapped trait will be forwarded to the destination in conjunction with the specific audience to which it is linked.


