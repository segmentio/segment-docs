---
title: Trait Activation Setup

---

On this page, you'll learn how to set up the destination that you'll use to get started with [Trait Enrichment](/docs/unify/trait-activation/trait-enrichment/) and [ID Sync](/docs/unify/trait-activation/id-sync/).  

## Set up a Destination

Trait Activation supports real-time and batch audiences for the following destinations:

|-----------------------|---------------|-------------------------|
|Destination            |  Type         |  Unsupported Destinations           |
| [Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/) | List | Facebook Pixel, Facebook Conversions API, Facebook App Events, and Facebook Offline Conversions. |
| [Google Ads Remarketing List](/docs/connections/destinations/catalog/adwords-remarketing-lists/#overview) | List | Google Firebase, Google Universal Analytics, Google Analytics 4 Cloud, Google Analytics 4 Web, Google Tag manager, Google Cloud Function, and Google Cloud Pub/Sub destinations. |
|[Iterable](/docs/connections/destinations/catalog/iterable/)              | Event         |                           |
|[Zendesk](/docs/connections/destinations/catalog/zendesk/)                | Event         | Zendesk Connect, and Zendesk Chat (Zopin) |
|[Braze Cloud Mode (Actions)](/docs/connections/destinations/catalog/braze-cloud-mode-actions/) | Event | Braze Destination, Braze Cohorts, and Braze Mobile Mode (Actions) |
| [Adobe Target (Actions)](/docs/connections/destinations/catalog/actions-adobe-target-cloud/#available-actions)    | Event      |                          |
| [Salesforce (Actions) Destination](/docs/connections/destinations/catalog/actions-salesforce/) | Event          |                   |
|[SendGrid Marketing Campaigns](/docs/connections/destinations/catalog/actions-sendgrid/)   |   Event           |                       |

## Resyncs

Segment recommends creating a new Audience for Trait Enrichment and ID Sync. For existing Audience destinations, both Trait Enrichment and ID Sync don't automatically resync the entire Audience. Only new data flowing into Segment will adhere to new trait criteria. 

[Contact Segment support](https://segment.com/help/contact/){:target="_blank"} if you'd like your Audience data resynced with Trait Enrichment and ID Sync. 

> warning ""
> For Audiences larger than 50 million users, it may take up to several hours or even days, to sync or resync. Only one resync is allowed at a time for each workspace. 


