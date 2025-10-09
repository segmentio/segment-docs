---
title: Destinations Overview
---

Destinations are the business tools or apps that receive data from Segment. Destinations allow you to act on your data and learn more about your customers in real time.

> info "Destinations catalog"
> If you want to explore the destinations that are compatible with Segment, check out the [Destinations catalog](/docs/connections/destinations/catalog/). Select an item from the catalog to learn more about it. The documentation for each destination explains how the Segment Tracking API methods are implemented for that destination.

## Sources vs Destinations

Segment has [Sources](/docs/connections/sources/) and [Destinations](/docs/connections/destinations/). Sources send data _to_ Segment, while Destinations receive data _from_ Segment.

## Destination connection types
Segment has three destination connection types:
* [Storage](#storage-destinations)
* [Reverse ETL](#reverse-etl-destinations)
* [Event streams](#event-streams-destinations)

### Storage destinations
Storage destinations let you store your raw Segment data. This enables data analysts and data scientists to work with raw data to derive deeper and more customized insights to support your organization. Learn more on the [storage overview page](/docs/connections/storage/).

### Reverse ETL destinations
[Reverse ETL](/docs/connections/reverse-etl) destinations are the business tools or apps that receive the data that Segment extracts from your connected warehouses. 

If your destination is not listed in [the Reverse ETL catalog](/docs/connections/reverse-etl/reverse-etl-catalog/), use the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/) to send data from your Reverse ETL warehouse to other destinations listed in the [catalog](/docs/connections/destinations/catalog/). The Segment Connections destination lets you mold data extracted from your warehouse in [Segment Spec](docs/connections/spec/) API calls, that are then processed by [Segment’s HTTP Tracking API](/docs/connections/sources/catalog/libraries/server/http-api/). The Segment HTTP Tracking API lets you record analytics data. The requests hit Segment’s servers, and then Segment routes your data to any destination you want. Get started with the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/). 	

### Event streams destinations
Event streams destinations are destinations that aren't storage or Reverse ETL destinations. Adding these destinations allow you to act on your data and learn more about your customers in real time. Event streams destinations include [Destination Actions](/docs/connections/destinations/actions/), built on Segment's [Actions framework](#destination-actions).  

## Method compatibility

Not all destinations can accept data from specific method types. To know if a destination can accept data from specific method types, look for the *Quick Info* box in the destination's documentation, or check out the [Destinations Methods comparison chart](/docs/connections/destinations/methods-compare/).

## Source compatibility

Many destinations can accept data from all types of sources, but some are only compatible with specific source types (for example, only web sources or server sources). To find out which source types a specific destination can accept data from, check the documentation for that destination in the *Quick info* box, or in the *Supported Sources and Connection Modes* section.

{% include components/reference-button.html href="/docs/connections/destinations/category-compare/" icon="guides.svg" title="Destinations Compatibility Matrix" description="Wondering which destinations take which data? Check out the Destination connection modes list by category." %}


## Destination Actions

Segment supports a form of destinations called [Destinations Actions](/docs/connections/destinations/actions/). These destinations let you create subscriptions, which are sets of conditions in which data is sent to the destinations and data mappings, to format data for the destination tool. Segment watches for data that matches the conditions you define for the subscription (called triggers). When those conditions are met, Segment uses an explicit mapping to transform the incoming data to an output format that your destination can use.

## Connection modes

{% include content/connection-modes-intro.md %}


### Choosing a connection mode

Cloud-mode destinations send data through Segment. Device-mode destinations send some data directly downstream to a tool and some data to Segment as two parallel data streams. There are tradeoffs between cloud-mode and device-mode destinations. In general, Segment recommends cloud-mode destinations because you can benefit from Segment's system features, like [retries](/#retries-between-segment-and-destinations), [replays](/docs/guides/what-is-replay/), [warehouses](/docs/connections/storage/warehouses/), [privacy blocking](/docs/privacy/data-controls/), [filtering](/docs/guides/filtering-data/), and more.

You should consider using device-mode if you use destinations which record information directly on the user's device. These types of tools might lose functionality if they aren't loaded directly on the device.

Take a look at the pros and cons chart of device-mode and cloud-mode destinations to determine which connection mode is best for you:

Connection Mode| Pros | Cons |
-------------- | ---- | ---- |  
Cloud-mode | * Increased site or app performance<br>* Unaffected by ad blockers | * May limit Destination features |
Device-mode | * Access to all features of the Destination | * Decreased site or app performance |

#### Website source connection modes

Segment's website sources use device-mode by default, because so many website-based destinations require that they be loaded on the page, and because size and page performance are less of a concern than on mobile. If your website source only collects information that you can instrument yourself, then you can use cloud-mode.

For example, you need to load a web chat destination directly on a website to connect to the service and collect metrics efficiently - you don't expect it to route chat messages through Segment. This _does_ mean that Segment might not receive a small amount of the destination-specific information from your users. For example, if your web chat tool calculates idle time between messages, that data would appear in the destination's tooling but not necessarily in the data sent to Segment.

#### Mobile source connection modes

By default, destinations configured on a mobile source send their data directly to the Segment servers, then translate it and use cloud-mode to forward it to destinations. Cloud-mode means that Segment sends the data directly from the Segment servers to your destination's servers. This means you don't need to package third-party SDKs for destinations that can accept cloud-mode data. Some primarily web-based destinations also allow cloud-mode, which can help reduce app size and improve load time and performance.

Before you opt into cloud-mode for a mobile source, consider if your destinations have features that require interactions on the device or require device-specific data. For example, if you use cloud-mode for Mixpanel, you'll get data on reporting and people, but won't be able to use Mixpanel's features for in-app surveys or auto-tracking. These features can be really valuable, but might not be a priority for your team.

### How Segment determines device-mode and cloud-mode destinations

There are two main things Segment considers when deciding to use device-mode, cloud-mode, or both modes for a destination partner:
1. [Anonymous Attribution Methodology](#anonymous-attribution-methodology)
2. [Client-native Destination Features](#client-native-destination-features)

#### Anonymous attribution methodology

##### Mobile attribution

The anonymous identifiers used on mobile devices are usually static, which means Segment doesn't need to do additional resolution and can build cloud-mode destinations by default. Because Segment uses native advertising identifiers on mobile devices, you don't need a full SDK on the device to reconcile or identify a user. For example, you might track users who viewed an advertisement in one app and installed another app as a result.

However, some mobile attribution tools do more advanced reconciliation based on more than the native identifier, which requires the SDK to be installed on the device. For those destinations, Segment offers device-mode, which packages the tool's SDK with the client-side library so that you can get the entire range of tool functionality.

##### Web attribution

Cross-domain identity resolution for websites requires that the attribution tool use a third-party cookie so it can track a user anonymously across domains. This is a critical component of attribution modeling. As a matter of principle, Segment only uses first-party cookies and doesn't share cookies with partners, so Analytics.js and the data it collects aren't enough to generate view-through attribution in ad networks.

Customers can load their libraries and pixels in the context of the browser and trigger requests to attribution providers from their device in response to Segment API calls to take advantage of advertising and attribution tools.

#### Client-native destination features

Many of Segment's destinations offer client-side features beyond data collection in their SDKs and libraries, for both mobile and web. In these cases, Segment offers device-mode SDKs so that you can collect information on the device using Segment, but still get the destination's complete native functionality.

Some features that usually require device-mode include: automatic A/B testing, displaying user surveys, live chat or in-app notifications, touch and hover heatmapping, and accessing rich device data such as CPU usage, network data, or raised exceptions.

### How can I tell which connection modes and platforms are supported for a destination?

The first place to look is the individual destination documentation. Each one includes a matrix of supported Sources and Connection Modes. Segment also provides a list of [all destinations and their connection modes](/docs/connections/destinations/cmodes-compare/).

In order to override the default, check the destination settings pane in the Segment web App either for a **Connection Mode** toggle or instructions on bundling any additional mobile components required.

## Sync modes

Sync modes allow users to define how changes in the source should send downstream to your destination. Depending on which destinations you set up in Segment, you may need to choose a sync mode for your data. This configuration determines how Segment updates your destination based on the source data. 

The available sync modes can vary based on the destination, integration type, and actions within the destination. For example, if you sync customer data, you might have the option to Insert, Update, or Upsert records.

Available sync modes include: 
- **Update**: Modify existing records in the destination without adding new ones.
- **Upsert**: Update existing records and add new ones, if necessary.
- **Add**: Add records to a list, segment, or journey.
- **Remove**: Remove records from a list, audience, or journey.

## Add a destination
To add a Destination to your workspace:

1. Navigate to **Connections**.
2. Click **Add Destination**.
3. Choose the Destination you want to add and click **Configure**. Most users eventually add  Analytics, Advertising, Email Marketing and/or Live Chat destinations.
4. Select the Source you want to connect to your Destination.
5. Click **Next**.
6. Give you Destination a name.
7. Click **Save**.
8. Configure the settings and enable your destination on the destination settings page.

Learn more about what adding a destination entails in the [Sending data to a Segment destination](/docs/connections/destinations/add-destination/) documentation.

> warning "Disabled destinations do not receive data"
> If you haven't enabled your destination after you created it or if you actively disable a destination, Segment prevents any data from reaching the destination. Business Tier customers can request [a Replay](/docs/guides/what-is-replay/), which resends data from the time the destination was disabled to the time it was re-enabled. Replays can also send data to currently disabled destinations. 
>
> Some destinations are not compatible with Replays after a certain period of time. Check with Segment’s support team [friends@segment.com](mailto:friends@segment.com) to confirm that your intended destination allows historical timestamps. 

## Data deliverability

Segment increases deliverability to destinations using [retries](#retries) and [replays](/docs/guides/what-is-replay/). Retries happen automatically for all customers, while replays are available on request for [Business Tier](https://segment.com/pricing/) customers.

> info ""
> Segment's data flow is primarily unidirectional, from Segment to integrated destinations. Segment does not inherently support a bidirectional flow where events, once delivered and processed by a destination, are sent back to Segment.

Segment also uses [batching](#batching) to increase deliverability to your destinations. Some destinations have batching enabled by default, and some, like Segment's [Webhook (Actions) Destination](/docs/connections/destinations/catalog/actions-webhook/), let you opt in to batching.

> warning "Some cases of event batching might lead to observability loss"
> While batching does increase event deliverability, you might experience error amplification, as if the entire batch fails, all events will be marked with the same status. For example, if a batch fails due to one `429` (Rate Limit) error, it might appear in the UI that there was one 429s request failure for each item in the batch.

### Retries

#### Retries in Segment's client libraries

Segment's client libraries ensure delivery of your data to the API reliably in the face of spotty connections, device failure, or network partitions in your data centers.

When you use Segment's mobile SDK, Segment dispatches each event to a background thread where the event is then written to a queue. Later, Segment's SDK batches together many requests in to one compressed request and sends it to Segment's servers. Segment's SDKs minimize battery use and bandwidth use by powering up the radio less frequently and for shorter time periods.

If the delivery of the payload is not successfully sent due to connection issues, all of your SDKs will automatically retry the request until successful receipt of the payload according to the following policies. Note that retry policies are subject to change / tuning in the future.

Platform | Initial Wait - Sleep duration before the first retry | Wait Growth - Rate of growth of the sleep duration between each retry | Max Wait - Maximum sleep duration between retries | Max Attempts - Maximum number of individual retries
-- | -- | -- | -- | -- |
C++ | 1s | None | 1s | 5
Clojure | 15s | Exponential | 1h | 50
Go | 100ms | Exponential | 10s | 10
Java | 15s | Exponential | 1h | 50
JavaScript | 1s | Exponential | 1h | 10
.Net | 100ms | Exponential | 6.4s | 7
Node.js | 100ms | Exponential | 400ms | 3
PHP | 100ms | Exponential | 6.4s | 7
Python | 1s | Exponential | 34m | 10
Ruby | 100ms | Exponential | 10s | 10


#### Mobile library retries

All mobile libraries handle retries by periodically attempting to flush their internal queue of events to Segment. If the flush is unsuccessful, the library waits until the next regularly-scheduled flush time to try again. The background queue of requests to Segment is bounded in size so if events are being queued faster than can successfully flush to Segment, some events may be dropped.

#### Retries between Segment and destinations

The destination endpoint APIs have fluctuations in availability due to a number of issues ranging from network failures to bugs to overload. Segment's internal systems retry failed destination API calls for four hours with a randomized exponential backoff after each attempt. This substantially improves delivery rates.

Here's an example destination that was only successfully accepting 93.36% of all API requests but was achieving a 99.28% final deliverability rate due to Segment's retry functionality.

![Segment destination data deliverability retries](images/integration-data-deliverability.png)

You can see the current destination endpoint API success rates and final delivery rates for Segment's server-side destinations on Segment's [status page](https://status.segment.com){:target="_blank”}.

### Replays

> info ""
> Replay is available to [Business tier](https://segment.com/pricing){:target="_blank”} customers. [Contact Segment](https://segment.com/contact/sales){:target="_blank”} to learn more.

[Replays](/docs/guides/what-is-replay/) allow customers to load historical data from Segment's S3 logs into downstream destinations which accept cloud-mode data. For example, if you wanted to try out a new email or analytics tool, Segment can replay your historical data into that tool. This gives you a great testing environment and prevents data lock-in when vendors try to hold data hostage.

> warning ""
> If you submitted [`suppress_only` requests](/docs/privacy/user-deletion-and-suppression/#suppressed-users), Segment still retains historical events for those users, which can be replayed. If you do not want historical events replayed for suppressed users, submit `suppress_and_delete` requests instead.

### Batching

Segment uses [stream batching](#stream-batching) for all destinations that require near-realtime data and [bulk batching](#bulk-batching) for some data flows in the Segment pipeline.

#### Stream batching
For all destinations, except for non-realtime Engage syncs and Reverse ETL syncs, Segment processes events from your source as they arrive and then flows the data downstream to your destinations in small batches, in a process called **stream batching**. These batches might contain different events between retry attempts, as events in previous batches may have succeeded, failed with a permanent error, or expired. This variability reduces the workload the system processes during partial successes, allows for better per-event handling, and reduces the chance of load-related failures by using variable batch formations.

#### Bulk batching
Some data flows may be able to use a process called **bulk batching**, which supports batching for destinations that produce between several thousand and a million events at a time. Real-time workloads or using a destination insert function may prevent bulk batches from being formed. Batches contain the same events between retries. 

The following destinations support bulk batching:
- [DV360](/docs/connections/destinations/catalog/actions-display-video-360/)
- [Google Adwords Remarketing Lists](/docs/connections/destinations/catalog/adwords-remarketing-lists/)
- [Klaviyo (Actions)](/docs/connections/destinations/catalog/actions-klaviyo/)
- [Pinterest Audiences](/docs/connections/destinations/catalog/pinterest-audiences/)
- [Snapchat Audiences](/docs/connections/destinations/catalog/snapchat-audiences/)
- [LiveRamp](/docs/connections/destinations/catalog/actions-liveramp-audiences/)
- [The Trade Desk CRM](/docs/connections/destinations/catalog/actions-the-trade-desk-crm/)

> info "You must manually configure bulk batches for Actions destinations"
> To support bulk batching for the Actions Webhook destination, you must set `enable-batching: true` and `batch_size: >= 1000`.

### Hashing 
Segment automatically hashes personally identifiable information (PII). This simplifies implementation for teams with data privacy requirements and eliminates issues with double-hashing that can result in failed matching at destinations. 

Segment supports these 2 types of data for hashing:
* **Plain text data:** When you send plain text values to destinations that require hashed values, Segment automatically normalizes and hashes these values. 
* **Pre-hashed data:** If you already hash your data before sending it to Segment, Segment is able to detect that the data is hashed, and will pass your pre-hashed data directly to the destination, avoiding double-hashing. 

> warning ""
> The hashing detection feature applies only to **Action Destinations**. 

If you choose to hash data yourself, ensure you follow each destination's specific hashing requirements. Fields that support automatic hashing detection will display a tooltip indicating *"If not hashed, Segment will hash this value."*

For destination-specific hashing requirements, refer to the destination's API documentation. 

## IP Allowlisting

IP Allowlisting uses an NAT gateway to route traffic from Segment's servers to your destination through a limited range of IP addresses, which can prevent malicious actors from establishing TCP and UDP connections with your integrations.

IP Allowlisting is available for customers on Business Tier plans.

### Supported destinations
Segment supports IP Allowlisting in [all destinations](/docs/connections/destinations/catalog/) except for the following:
- [LiveRamp](/docs/connections/destinations/catalog/actions-liveramp-audiences/)
- [TradeDesk](/docs/connections/destinations/catalog/actions-the-trade-desk-crm/)
- [Amazon Kinesis](/docs/connections/destinations/catalog/amazon-kinesis/)

Destinations that are not supported receive traffic from randomly assigned IP addresses. 

### Configure IP Allowlisting

You can enable IP Allowlisting in your Segment workspace to ensure that data is sent only through trusted IP addresses.

#### IP Allowlisting for destinations

Use IP Allowlisting to manage how data flows from Segment to destinations.

To enable IP Allowlisting for your workspace:
1. From your Segment workspace, navigate to **[Settings > Workspace settings > Destination IP settings](https://app.segment.com/goto-my-workspace/settings/destination-ip-settings){:target="_blank”}**. 
2. On the Destination IP settings page, click **Enable IP allowlisting**. 
3. The page displays the IP address ranges that Segment uses to route data from Segment's internal systems to your destination. Make note of these ranges, as you need this information to enforce IP restriction in your downstream destinations. 
4. Open each of your downstream tools and configure IP restriction for each destination. For more information, refer to the documentation for your downstream tool. 

> warning "Some destinations might not support IP restriction"
> Not all destinations support IP restriction, see [supported destinations](#supported-destinations) for more detail.

#### IP Allowlisting for functions

Use IP Allowlisting to control how Segment sends event data to function endpoints. 

To enable IP Allowlisting for your workspace:
1. From your Segment workspace, navigate to **[Settings > Workspace settings > Destination IP settings](https://app.segment.com/goto-my-workspace/settings/destination-ip-settings){:target="_blank”}**. 
2. On the Destination IP settings page, click **Enable IP allowlisting**. 
3. The page displays the IP address ranges that Segment uses to route data from Segment’s internal systems to your destination. Make note of these ranges, as you need this information to enforce IP restriction in your downstream destinations.
4. Re-deploy relevant destination functions to allow the function to take effect of IP allowlisting. After this, all the events will be sent with only the mentioned IPs.
