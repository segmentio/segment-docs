---
title: Destinations Overview
---

Destinations are the business tools or apps that Segment forwards your data to. Adding Destinations allow you to act on your data and learn more about your customers in real time.

> info "Destinations Catalog"
> If you want to explore the destinations compatible with Segment, check out the [Destinations catalog](/docs/connections/destinations/catalog/). Select an item from the catalog to learn more about it. The documentation for each destination explains how the Segment Tracking API methods are implemented for that destination.

## Sources vs Destinations

Segment has [Sources](/docs/connections/sources/) and [Destinations](/docs/connections/destinations/). Sources send data _into_ Segment, while Destinations receive data _from_ Segment.

## Destination connection types
Segment has three destination connection types:
* [Event streams](#event-streams-destinations)
* [Storage](#storage-destinations)
* [Reverse ETL](#reverse-etl-destinations)

### Event streams destinations
Event streams destinations are all destinations that aren't storage or Reverse ETL destinations. Adding these destinations allow you to act on your data and learn more about your customers in real time. These include [Destination Actions](/docs/connections/destinations/actions/). 

### Storage destinations
Storage destinations enable you to store your raw Segment data. This enables data analysts and data scientists to work with the raw data to derive deeper and more customized insights to support your organization. Learn more from the [storage overview page](/docs/connections/storage/).

### Reverse ETL destinations
[Reverse ETL](/docs/connections/reverse-etl) destinations are the business tools or apps you use that Segment syncs the data from your warehouse to. 

If your destination is not listed in the Reverse ETL catalog, use the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/) to send data from your Reverse ETL warehouse to other destinations listed in the [catalog](/docs/connections/destinations/catalog/). The Segment Connections destination enables you to mold data extracted from your warehouse in [Segment Spec](docs/connections/spec/) API calls that are then processed by [Segment’s HTTP Tracking API](/docs/connections/sources/catalog/libraries/server/http-api/). The Segment HTTP Tracking API lets you record analytics data. The requests hit Segment’s servers, and then Segment routes your data to any destination you want. Get started with the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/). 	
 

## Method compatibility

Not all destinations can accept data from specific method types. To know if a destination can accept data from specific method types, look for the *Quick Info* box at the top of the destination's documentation page, or check out the [Destinations Methods comparison chart](/docs/connections/destinations/methods-compare/).

## Source compatibility

Many destinations can accept data from all types of sources, but some are only compatible with specific source types (for example, web only, or server only). To find out which source types a specific destination can accept data from, check the documentation for that destination in the *Quick info* box, or in the *Supported Sources and Connection Modes* section.

{% include components/reference-button.html href="/docs/connections/destinations/category-compare/" icon="guides.svg" title="Destinations Compatibility Matrix" description="Wondering which destinations take which data? Check out the Destination connection modes list by category." %}


## Destination Actions

In June 2021, Segment released a new form of destinations called [Destinations Actions](/docs/connections/destinations/actions/). These destinations allow users to create *subscriptions*: sets of conditions in which data is sent to the destinations and data mappings, to format that data for the destination tool. Segment watches for data that matches the conditions you create (*triggers*) for the subscription, and when the conditions are met, uses an explicit mapping to transform the incoming data to an output format that your destination can use.

## Connection modes

{% include content/connection-modes-intro.md %}


### Choosing a connection mode

Cloud-mode destinations send data through Segment. Device-mode destinations send data in parallel to Segment. There are tradeoffs between using cloud-mode and device-mode destinations. In general, Cloud-mode is preferred because you then benefit from Segment's system features, like retries, Replay, Warehouses, Privacy blocking, filtering, and more.

You should consider using device-mode if you use destinations which record information directly on the user's device. These types of tools might lose functionality if they aren't loaded directly on the device.

Take a look at the pros and cons chart of device-mode and cloud-mode destinations to determine which connection mode is best for you:

Connection Mode| Pros | Cons |
-------------- | ---- | ---- |  
Cloud-mode | * Increased site or app performance<br>* Unaffected by ad blockers | * May limit Destination features |
Device-mode | * Access to all features of the Destination | * Decreased site or app performance |

#### Website source connection modes

Segment's website sources use device-mode by default, because so many website-based destinations require that they be loaded on the page, and because size and page performance are less of a concern than on mobile. If your website source only collects information that you can instrument yourself, then you can use cloud-mode.

For example, a web-chat destination must be loaded to connect to the service and collect metrics efficiently - you don't expect it to route chat messages through Segment! This _does_ mean that Segment might not receive a small amount of the destination-specific information from your users. In the chat example, if the destination is calculating idle time between messages, that data would appear in the destination's tooling, but not necessarily in the Segment data.

#### Mobile source connection modes

By default, destinations configured on a mobile source send their data directly to the Segment servers, then translate it and use Cloud-mode to forward it to destinations. *Cloud-mode* means that Segment sends the data directly from the Segment servers, to their servers. This means you don't need to package third-party SDKs for destinations that can accept cloud-mode data. Some primarily web-based destinations also allow cloud-mode, which can help reduce app size, and improve load time and performance. You can read more about the [effects of mobile app size on downloads in Segment's blog](https://segment.com/blog/mobile-app-size-effect-on-downloads/).

Before you turn on or opt-in for cloud-mode for a mobile source, consider if your destinations have features that require interactions on the device or require device-specific data (see the examples above). For example, if you use cloud-mode for Mixpanel, you'll get your data on reporting and people, but won't be able to use their features for in-app surveys or auto-tracking. These can be really valuable, but might not be a priority for your team.


### How Segment determines Device-mode and Cloud-mode destinations

There are two main things Segment considers when deciding to use Device-mode or Cloud-mode, or both, for a destination partner:
1. [Anonymous Attribution Methodology](#anonymous-attribution-methodology)
2. [Client-native Destination Features](#client-native-destination-features)

#### Anonymous attribution methodology

##### Mobile attribution

The anonymous identifiers used on mobile devices are usually static, which means Segment doesn't need to do additional resolution, and can build Cloud-mode destinations by default. Because Segment uses native advertising identifiers on mobile devices, you don't need a full SDK on the device to reconcile or identify a user. For example, you might track users who viewed an advertisement in one app and installed another app as a result.

However, some mobile attribution tools do more advanced reconciliation based on more than the native identifier, which requires the SDK on the device to work properly. For those destinations, Segment offers device-mode, which packages the tool's SDK with the client-side library so that you can get the entire range of tool functionality.

##### Web Attribution

Cross-domain identity resolution for websites requires that the attribution tool use a third-party cookie so it can track a user anonymously across domains. This is a critical component of attribution modeling. As a matter of principle, Segment only uses first-party cookies and doesn't share cookies with partners, so Analytics.js and the data it collects aren't enough to generate view-through attribution in ad networks.

Customers can load their libraries and pixels in the context of the browser and trigger requests to attribution providers from their device in response to Segment API calls to take advantage of advertising and attribution tools.

#### Client-native destination features

Many of Segment's destinations offer client-side features beyond data collection in their SDKs and libraries, for both mobile and web. In these cases, Segment offers Device-mode SDKs so that you can collect information on the device using Segment, but still get the destination's complete native functionality.

Some features that usually require Device-mode include: automatic A/B testing, displaying user surveys, live chat or in-app notifications, touch and hover heatmapping, and accessing rich device data such as CPU usage, network data, or raised exceptions.

### How can I tell which connection modes and platforms are supported for a destination?

The first place to look is the individual destination documentation. Each one includes a matrix of supported Sources and Connection Modes. Segment provides a list of [all destinations and their connection modes](/docs/connections/destinations/cmodes-compare/).

In order to override the default, check the destination settings pane in the Segment web App either for a **Connection Mode** toggle or instructions on bundling any additional mobile components required.

## Add a destination
To add a Destination:

1. Navigate to **Connections**.
2. Click **Add Destination**.
3. Choose the Destination you want to add and click **Configure**. Most users eventually add destinations for: Analytics, Advertising, Email Marketing and/or Live Chat.
4. Select the Source you want to connect to your Destination.
5. Click **Next**.
6. Give you Destination a name.
7. Click **Save**.
8. Configure the settings and enable your destination on the destination settings page.

[Learn more](/docs/connections/destinations/add-destination/) about what adding a destination entails.

## Data deliverability

Segment increases deliverability to destinations in two ways: [retries](#retries) and [replays](/docs/guides/what-is-replay/). Retries happen automatically for all customers, while replays are available on request for [Business](https://segment.com/pricing/) customers.

### Retries

#### Retries in Segment's client libraries

Segment's client libraries ensure delivery of your data to the API reliably in the face of spotty connections, device failure, or network partitions in your data centers.

When you use Segment's mobile SDK, Segment dispatches each event to a background thread where the event is then written to a queue. Later, Segment's SDK batches together many requests in to one compressed request and sends it to Segment's servers. Segment's SDKs minimize battery use and bandwidth use by powering up the radio less frequently and for shorter time periods.

If the delivery of the payload is not successfully sent due to connection issues, all of your SDKs will automatically retry the request until successful receipt of the payload according to the following policies. Note that retry policies are subject to change / tuning in the future.

Platform | **Initial Wait -** Sleep duration before the first retry | **Wait Growth -** Rate of growth of the sleep duration between each retry | **Max Wait -** Maximum sleep duration between retries | **Max Attempts -** Maximum number of individual retries
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

All mobile libraries handle retries by periodically attempting to flush their internal queue of events to Segment. If the flush is unsuccessful, the library waits until the next regularly-scheduled flush time to try again. The background queue of requests to Segment is bounded in size so if events are being queued faster than we can successfully flush them to Segment, some events may be dropped.

#### Retries between Segment and destinations

The destination endpoint APIs have fluctuations in availability due to a number of issues ranging from network failures to bugs to overload. Segment's internal systems retry failed destination API calls for four hours with a randomized exponential backoff after each attempt. This substantially improves delivery rates.

Here's an example destination that was only successfully accepting 93.36% of all API requests but was achieving a 99.28% final deliverability rate due to Segment's retry functionality.

![Segment destination data deliverability retries](images/integration-data-deliverability.png)

You can see the current destination endpoint API success rates and final delivery rates for Segment's server-side destinations on Segment's [status page](https://status.segment.com).

### Replays

> info ""
> Replay is available to [Business tier](https://segment.com/pricing) customers. [Contact Segment](https://segment.com/contact/sales) to learn more.

[Replays](/docs/guides/what-is-replay/) allow customers to load historical data from Segment's S3 logs into downstream destinations which accept cloud-mode data. So, for example, if you wanted to try out a new email or analytics tool, Segment can replay your historical data into that tool. This gives you a great testing environment and prevents data lock-in when vendors try to hold data hostage.

> warning ""
> If you submitted [`suppress_only` requests](https://segment.com/docs/privacy/user-deletion-and-suppression/#suppressed-users), Segment still retains historical events for those users, which can be replayed. If you do not want historical events replayed for suppressed users, submit `suppress_and_delete` requests instead.


### IP Allowlist 

{% include content/ip-allowlist.md %}