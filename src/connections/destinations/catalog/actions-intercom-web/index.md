---
title: Intercom Web (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 62d9daff84a6bf190da9f592
hide_action:
  - id: 5W984Qq59XEQnFYKXKHGeZ
    name: "Update User"
  - id: nqdBJoXJwFrzwoL1y45LYt
    name: "Update Company"
versions:
  - name: 'Intercom Cloud Mode (Actions)'
    link: '/docs/connections/destinations/catalog/actions-intercom-cloud'
  - name: 'Intercom (Classic)'
    link: '/docs/connections/destinations/catalog/intercom'
---

{% include content/plan-grid.md name="actions" %}

Intercom is a customer communications platform that shows you who is using your product. Intercom allows you to personally communicate with your users with targeted content, behavior-driven messages, and conversational support.

When you use the Intercom Web (Actions) destination, Segment loads the [Intercom JavaScript library](https://developers.intercom.com/installing-intercom/docs/intercom-for-web){:target="_blank"} for you. The Intercom library enables you to track your user’s events on your website and interact with the Intercom messenger window.

## Benefits of Intercom Web Mode (Actions) vs Intercom Classic
Intercom Web (Actions) provides the following benefits over the classic Intercom destination:

- **Fewer settings.** Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data.** Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the destination.
- **Granular control over data sent.** You can customize the conditions under which the events are sent to Intercom.
- **Selectively shows the Intercom chat widget.**
  
### Chat Widget
The Intercom Cloud Mode (Actions) Destination does not have access to Intercom’s chat widget, but only the Intercom Web Actions Destination would have access to this.

The difference has to do with how data gets sent to Intercom. If you are using Analytics.js source - you can use the Intercom Web Mode (Actions) destination which will send data directly to Intercom from the client-side, by loading the Intercom SDK directly onto your website. 

Whereas, the Intercom Cloud Mode (Actions) works by first sending the data to Segment, followed by Segment forwarding the data to Intercom. This allows Segment users to send data to Intercom from sources that are incompatible with their SDK. 

The Connection Modes section of our Destinations Overview docs here do a great job of breaking down the differences between the two types of connection modes that Segment offers.

When you configure the Segment Intercom destination in device-mode, you will have access to the chat widget that gets loaded by the Intercom SDK without the need to load Intercom separately outside of Segment.

In order to have access to the "Intercom Messaging Box", you'd instead want to configure and connect the Intercom Web Mode (Actions) destination to your Analytics.js source.

## Getting started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for **Intercom Web (Actions)** in the Destinations Catalog, and select the destination.
3. Click **Configure Intercom Web (Actions)**.
4. Select the web source that will send data to Intercom Web (Actions) and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/).
5. On the **Settings** tab, input your Intercom App ID and other destination settings.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).
7. Enable the destination and configured mappings.

> info "Regional Data Hosting in the EU and Australia"
> For Regional Data Hosting in the EU and Australia, you'll need an Intercom plan that [supports regional data hosting](https://www.intercom.com/help/en/articles/5778275-additional-details-on-intercom-regional-data-hosting){:target="_blank"}.

> info ""
> Segment doesn't support the creation of **Leads** for Intercom Web. Segment recommends using [Intercom Cloud Mode](/docs/connections/destinations/catalog/actions-intercom-cloud/) to support leads creation.

{% include components/actions-fields.html settings="true"%}

## Troubleshooting

### Requests to Intercom return a 404 response
If you are seeing 404 responses in your browser's network tab, you've likely encountered one of two issues:

- You set the wrong App ID on the Intercom Actions (Web) destination settings page.
- You set the wrong Regional Data Hosting value on the Intercom Actions (Web) destination settings page. Intercom gates regional endpoints by plan level, so you may not have access to EU data hosting.

### Intercom does not support rETL event batching
The Intercom (Web) Actions destination does not support the bulk contacts endpoint, and therefore is unable to support batching events in rETL.
