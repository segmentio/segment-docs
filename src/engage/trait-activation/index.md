---
title: Trait Activation Overview
beta: true
plan: engage-foundations
redirect_from: 
- 'engage/trait-activation/overview'
- 'engage/trait-activation/trait-activation-setup'
---

Use Trait Activation to configure sync payloads that you send from Engage Audiences and Journeys to a Destination or Destination Function. Map traits from user profiles to Destinations, configure identifiers to sync, and choose a sync strategy that fits your use cases. 

Trait Activation includes both [Trait Enrichment](/docs/engage/trait-activation/trait-enrichment/) and [ID Sync](/docs/engage/trait-activation/id-sync/). With Trait Enrichment, use custom, SQL, computed, and predictive traits to enrich the data you map to your destinations or destination functions. Use ID Sync to select identifiers and a sync strategy for each identifier when syncing Engage Audiences to Destinations.

## Trait Activation setup

To get started with Trait Activation, you'll need to set up the destination that you'll use with [Trait Enrichment](/docs/engage/trait-activation/trait-enrichment/) and [ID Sync](/docs/engage/trait-activation/id-sync/).  


### Set up your destination

Select your destination, view its Segment documentation, then follow the corresponding required setup steps. 


|Destination            |  Type                                                                              |  Compatible with Trait Enrichment | Compatible with ID Sync |
|-----------------------| -----------------------------------------------------------------------------------| --------------------------------- | ----------------------- |
| [Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/)    | List     | ![Supported](/docs/images/supported.svg){:class="inline"} | ![Supported](/docs/images/supported.svg){:class="inline"} |
| [Google Ads Remarketing Lists](/docs/connections/destinations/catalog/adwords-remarketing-lists/#overview) | List     | ![Supported](/docs/images/supported.svg){:class="inline"} | ![Supported](/docs/images/supported.svg){:class="inline"} |
| [Destination Actions](/docs/connections/destinations/actions/#available-actions-based-destinations)        | Actions  | ![Supported](/docs/images/supported.svg){:class="inline"} | ![Supported](/docs/images/supported.svg){:class="inline"} |
| [Destination Functions](/docs/connections/functions/destination-functions/#create-a-destination-function)  | Function | ![Supported](/docs/images/supported.svg){:class="inline"} | ![Supported](/docs/images/supported.svg){:class="inline"} | 
| [Classic Destinations](/docs/connections/destinations/#add-a-destination)                                  | Classic  | ![Unsupported](/docs/images/unsupported.svg){:class="inline"} | ![Supported](/docs/images/supported.svg){:class="inline"} |

### Resyncs 

Segment recommends creating a new audience for Trait Enrichment and ID Sync. For existing audience destinations, both Trait Enrichment and ID Sync won't resync the entire audience. Only new data flowing into Segment will adhere to new trait settings. 

[Contact Segment support](https://segment.com/help/contact/){:target="_blank"} if you'd like your Audience resynced with Trait Enrichment and ID Sync. 

> warning ""
> For Audiences larger than 50 million users, it may take several hours, or even days, to sync. Only one resync is allowed at a time for each workspace. 


## Use cases 

Trait Enrichment and ID Sync can help you:

- **Increase advertising match rates**: Expand the pool of users you advertise to and increase match rates by using traits and identifiers to find the right customers. 

- **Include more personalized message content**: Include traits in your payload for more up-to-date, accurate data. 

- **Configure how you send identifiers to Destinations**: Send the right identifiers to your destinations. For profiles with multiple identifiers, choose a strategy to select identifiers and send them downstream.

 
## Next steps 

To learn more about Trait Activation, visit the following docs:

- Learn more about how to access Segment profile traits when you sync Audiences and Journeys to Destinations or Destination Functions with [Trait Enrichment](/docs/engage/trait-activation/trait-enrichment/).
- Learn how to sync select identifiers and create a sync strategy with [ID Sync](/docs/engage/trait-activation/id-sync/).



