--- 
title: Airship (Actions) Destination 
id: 6475c5c14f7db4914bcd512f 
---

{% include content/plan-grid.md name="actions" %}


[Airship](https://app.segment.com/airship/destinations/catalog/actions-airship){:target="_blank"} provides an end-to-end solution for capturing value across the entire customer app lifecycle — from acquisition and activation to engagement and loyalty. It starts with Airship’s market-leading app store optimization (ASO) solutions promoting app discovery and downloads. Then the unified journey orchestration, content creation and experimentation solutions kick in. App teams can quickly design, deploy and iterate no-code native app experiences and cross-channel campaigns — bridging inside-the-app experiences with outside-the-app messaging.

Airship maintains this destination. For any issues with the destination, [contact the Airship Support team](mailto:support@airship.com).

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Airship Segment destination. There's also a page about the [non-Actions Airship destination](/docs/connections/destinations/catalog/airship/). Both of these destinations receive data from Segment.

## Benefits of Airship (Actions) vs Airship Classic

Airship (Actions) provides the following benefits over the classic Airship destination:

- **Flexibility**. Complete flexibility for mapping your data from any Segment event type to one of three Airship endpoints. Make optimal use of data from Segment to trigger Automations, audience segmentation, or to personalize end-users in-app experiences and messages.
- **Additional functionality**. Supports email registration, named user association, as well as delete for GDPR compliance. This is in addition to the previously supported custom events, tag management, and attributes.
- **Reporting**. Better and more meaningful feedback from the Airship API. This integration calls the Airship API directly, so the endpoint response shows precisely how the integration is performing.


## Getting started

1. From the Segment web app, navigate to **Connections > Catalog**, and select the **Destinations** tab in the catalog.
2. Search for *Airship (Actions)* and select it.
3. Click **Configure Airship (Actions)**.
4. Select an existing Source to connect to Airship (Actions).
5. Name the destination and choose between filling in the settings manually or copying from an existing instance.
6. Click **Create Destination**.
7. Enter your Access Token and App Key. You can get your access token and app key by going to your Airship project and navigating to **Settings > Partner Integrations** and selecting Segment. Following the instructions there will create a Tag Group, Attributes, and provide the Access Token and App Key.
8. Select the appropriate data center. 

{% include components/actions-fields.html %}

## Named User ID
Named User is an Airship concept for identifying users and associating them with devices and delivery addresses. For more information, see [Airship | Named Users](https://docs.airship.com/guides/messaging/user-guide/audience/segmentation/named-users/){:target="_blank"}. This integration does not perform the association of a Named User to a delivery address, configure that in either the mobile/web SDK or through a custom workflow out of band from this integration.



