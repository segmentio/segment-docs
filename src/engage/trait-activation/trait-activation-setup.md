---
title: Trait Activation Setup
plan: engage-foundations
beta: true
---

On this page, you'll learn how to set up the Destination that you'll use to get started with [Trait Enrichment](/docs/engage/trait-activation/trait-enrichment/) and [ID Sync](/docs/engage/trait-activation/id-sync/).  

## Set up a Destination

You'll first choose a Destinaton to connect to your Audience and use with Trait Activation. Trait Activation supports real-time and batch audiences for the Destinations listed in the table below. Select your Destination, view its Segment documentation, then follow the required setup steps. 


|-----------------------|---------------|---------------------------|
|Destination            |  Type         |  Required Steps           |
| [Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/) | List | 1. Authorize Facebook Custom Audiences. <br> 2. Create an Audience in Engage and connect to Facebook. <br> 3. Verify that the Audience appears in Facebook. |
| [Google Ads Remarketing Lists](/docs/connections/destinations/catalog/adwords-remarketing-lists/#overview) | List | 1. Add Google Ads Remarketing Lists as an Engage Destination. <br> 2. Create an Audience in Segment and connect it to Google Ads Remarketing Lists. <br> 3. Confirm that the list is building in Google Ads Audience manager. |
|[Braze Cloud Mode (Actions)](/docs/connections/destinations/catalog/braze-cloud-mode-actions/) | Event | 1. Connect Braze Cloud Mode (Actions) to your Segment space. <br> 2. Add the API Key, App ID, and REST Endpoint connection settings. |
| [Adobe Target (Actions)](/docs/connections/destinations/catalog/actions-adobe-target-cloud/#available-actions)    | Event      |  1. Connect Adobe Target (Actions) to your Segment space. <br> 2. On the **Settings** tab, input your Adobe Target destination settings. <br> 3. Follow the Destination Actions documentation for [customized mappings](/docs/connections/destinations/actions/#customizing-mappings). <br> 4. Enable the destination and configured mappings.                        |
| [Salesforce (Actions)](/docs/connections/destinations/catalog/actions-salesforce/) | Event          | 1. Connect Salesforce to your Segment space. <br> 2. Select **Actions** as the destination framework. <br> 3. From the **Settings** tab, authenticate with Salesforce using OAuth. <br> 4. Follow steps in the [Customizing Mappings documentation](/docs/connections/destinations/actions/#customizing-mappings). <br> 5. Enable the Destination and configured mappings.                  |
| [Salesforce Marketing Cloud (Actions)](/docs/connections/destinations/catalog/actions-salesforce-marketing-cloud/#getting-started) | Event          | 1. Grant Segment API access to Salesforce Marketing Cloud. <br> 2. Connect the Salesforce Marketing Cloud destination to your Segment space.            |
|[SendGrid Marketing Campaigns](/docs/connections/destinations/catalog/actions-sendgrid/)   |   Event           |  1. Connect SendGrid Marketing Campaigns to your Segment space. <br> 2. Enter your SendGrid Marketing Campaigns API key into the connection settings.                      |
|[LiveRamp](/docs/connections/destinations/catalog/actions-liveramp-audiences/)   |   Event           |  1. Set up your LiveRamp file drop. <br> 2. Connect LiveRamp Audiences to your Segment space.                       |
|[Iterable (Actions)](/docs/connections/destinations/catalog/actions-iterable/)   |   Event           |  1. Connect Iterable (Actions) to your Segment space. <br> 2. Enter your Iterable (Actions) API key and Data Center Location into the Destination Settings.           |
|[Yahoo Audiences (Actions)](/docs/connections/destinations/catalog/actions-yahoo-audiences/)   |   Event           |  1. Connect Yahoo Audiences to your Engage space. <br> 2. Enter your Yahoo MDM ID, Engage Space Id and provide description (optional).           |



## Resyncs 

Segment recommends creating a new Audience for Trait Enrichment and ID Sync. For existing Audience destinations, both Trait Enrichment and ID Sync won't resync the entire Audience. Only new data flowing into Segment will adhere to new trait settings. 

[Contact Segment support](https://segment.com/help/contact/){:target="_blank"} if you'd like your Audience resynced with Trait Enrichment and ID Sync. 

> warning ""
> For Audiences larger than 50 million users, it may take several hours, or even days, to sync. Only one resync is allowed at a time for each workspace. 


