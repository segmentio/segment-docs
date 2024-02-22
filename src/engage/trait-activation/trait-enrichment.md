---
title: Trait Enrichment 
beta: true 
plan: engage-foundations
---

Use Trait Enrichment to access Segment profile traits when you sync Audiences and Journeys to Destinations. With Trait Enrichment, you can use custom, SQL, computed, and predictive traits to enrich the data you map to your destinations. 

## Set up Trait Enrichment

Use the following steps to set up Trait Enrichment with Audiences or Journeys.


> info ""
> The setup steps you'll use for Trait Enrichment depend on the type of Destination [you've connected](/docs/engage/trait-activation/trait-activation-setup/). 
> - For Facebook Custom Audiences and Google Adwords, use [set up Trait Enrichment](https://docs/engage/trait-activation/trait-enrichment/#destination-requirements). 
> - If you're using Destination Actions, such as Salesforce Marketing Cloud, Braze Actions, or Salesforce Actions, use the [Destination Actions setup steps](#destination-actions-setup).


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

With Customized setup, you can choose which traits you want to map to your destination. 

1. Click **Customized Setup**, then click **Add Trait**.
2. Select all traits you want to sync to your destination, and click **Save**. 
- Use the **Segment** column to select traits from the Segment Spec. 
- Use the **Destination** column to select which traits you want to map to in your destination. By default, Segment attempts to find traits with matching names.
3. Click **Save** and finish building your audience or journey.


Segment sends traits you select for enrichment in the traits object in Identify calls (`traits.trait_1`, `traits.trait_2`), and as properties in the properties object in Track calls (`properties.trait_1`, `properties.trait_2`).


Here's an example Identify call payload with traits in the `traits object`:

```json
{
  "anonymousId": "507f191e810c19729de860ea",
  "channel": "browser",
  "context": {
    "ip": "8.8.8.8",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36"
  },
  "integrations": {
    "All": false,
    "Mixpanel": true,
    "Salesforce": true
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "receivedAt": "2015-02-23T22:28:55.387Z",
  "sentAt": "2015-02-23T22:28:55.111Z",
  "timestamp": "2015-02-23T22:28:55.111Z",
  "traits": {
    "name": "John Smith",
    "email": "example@example.com",
    "plan": "premium",
    "logins": 5,
    "address": {
      "street": "6th St",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94103",
      "country": "USA"
    }
  },
  "type": "identify",
  "userId": "97980cfea0067",
  "version": "1.1"
}
```
And here's an example Track call payload with traits in the `properties object`:

```json
{
  "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
  "context": {
    "library": {
      "name": "analytics.js",
      "version": "2.11.1"
    },
    "page": {
      "path": "/academy/",
      "referrer": "",
      "search": "",
      "title": "Analytics Academy",
      "url": "https://segment.com/academy/"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36",
    "ip": "108.0.78.21"
  },
  "event": "Course Clicked",
  "integrations": {},
  "messageId": "ajs-f8ca1e4de5024d9430b3928bd8ac6b96",
  "properties": {
    "title": "Intro to Analytics"
  },
  "receivedAt": "2015-12-12T19:11:01.266Z",
  "sentAt": "2015-12-12T19:11:01.169Z",
  "timestamp": "2015-12-12T19:11:01.249Z",
  "type": "track",
  "userId": "AiUGstSDIg",
  "originalTimestamp": "2015-12-12T19:11:01.152Z"
}
```


### Destination requirements 

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

## Destination Actions setup

If you're using [Destination Actions](/docs/connections/destinations/actions/), use the following steps to set up Trait Enrichment.

1. Navigate to **Engage > Engage settings**. 
2. Select the Destinations tab, then click **+ Add Destination**. Trait Activation supports all [Destination Actions](/docs/connections/destinations/actions/).
3. Enter your destination credentials.
4. Navigate to **Engage > Audiences**, and click **+ Create**. 
5. From the Select Destinations screen in the Audience builder, select your destination. 
6. Confirm that "Send Track" or "Send Identify" is toggled on. 
- Trait Enrichment supports Track and Identify calls. Follow the corresponding destination instructions to determine which event you'll need.
7. Select **Customized Setup**.
8. Select **Add Trait**. Then, select the traits you want to sync and click **Save**.

### Configure mappings in your Destination

After you add traits, configure how your selected traits will map to your Destination.

> success ""
> Keep your Engage Audience open in a separate tab, as you'll need to return. 

1. Navigate to **Connections > Destinations** and select your destination.
1. From the Destination overview screen, select the **Mappings** tab. 
2. Click **+ New Mapping**. 
- All actions in an actions-based destination can receive traits you configure with Trait Activation.
3. Locate the  **Select mappings** section to confirm the default field mappings match the traits in your custom setup. 
- To update a trait field mapping, click on a field, and in the dropdown search bar enter `traits.` followed by your trait. For example, `traits.email`. Then, click **Use as an event variable**.
4. Click **Save** and navigate back to Engage to finish building your Audience. 

For Track events, Segment sends traits you select for enrichment in the `properties object` in a Track call. 
- For example: `properties.trait_1`, `properties.trait_2`

For Identify events, Segment sends traits you select for enrichment in the `traits object` in Identify calls. 
- For example: `traits.trait_1`, `traits.trait_2`

<!-- hold on this for now
When a sample event from **Load Test Event from Source** is available, the dropdowns under the mappings will include traits configured previously.

![Load a test event from your source](/docs/engage/images/test-event-from-source.png)

-->

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

