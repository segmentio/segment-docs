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
  
### Intercom's chat widget

The [Intercom Cloud Mode (Actions)](/docs/connections/destinations/catalog/actions-intercom-cloud/) destination doesn't have access to Intercom’s chat widget. Only the [Intercom Web (Actions)](/docs/connections/destinations/catalog/actions-intercom-web/) destination has access to this.

If you're using the [Analytics.js source](/docs/connections/sources/catalog/libraries/website/javascript/), use the Intercom Web Mode (Actions) destination which sends data directly to Intercom from the client-side by loading the Intercom SDK directly onto your website. 

However, [Intercom Cloud Mode (Actions)](/docs/connections/destinations/catalog/actions-intercom-cloud/) sends data to Segment, after which Segment forwards the data to Intercom. This allows Segment users to send data to Intercom from sources that are incompatible with their SDK. 

When you configure the Segment Intercom destination in device-mode, you'll have access to Intercom's chat widget without loading Intercom separately outside of Segment.

To access the Intercom Messaging Box, you'll need to configure and connect the Intercom Web (Actions) destination to your Analytics.js source.

> success ""
> Visit the [Destination Overview docs](/docs/connections/destinations/#connection-modes) to learn the difference between cloud and device modes.

## Getting started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for **Intercom Web (Actions)** in the Destinations Catalog, and select the destination.
3. Click **Configure Intercom Web (Actions)**.
4. Select the web source that will send data to Intercom Web (Actions) and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/).
5. On the **Settings** tab, input your Intercom App ID and other destination settings.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings).
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

### Intercom does not support Reverse ETL event batching
The Intercom (Web) Actions destination does not support the bulk contacts endpoint, and therefore is unable to support batching events in Reverse ETL.

### Why are my Identify calls not updating or creating Intercom profiles, or not showing users as leads or visitors?
Intercom requires requests to include user data/traits beyond `email` or `user_hash` to update or create profiles and change user status from leads/visitors. Without additional user data/traits, Intercom assumes no changes were made to a user's data and does not send a "ping" request.

In the following example, which only includes an `email` and `user_hash`, Intercom would not send a "ping" request and update the status of this user:

```
analytics.identify("123");

analytics.identify("123", { email: "example@domain.com" });

analytics.identify("123",{email: "example@domain.com"}, {
   integrations: {
    Intercom: {
      user_hash: "81b65b9abea0444437a5d92620f03acc33f04fabbc32da1e047260024f80566a"
    }
  }})
```

However, in the following example that also contains the `name` trait, Intercom sends a "ping" request and updates the status of this user:

```
analytics.identify("123", {
   email: "example@domain.com",
   name: "John Doe"
}, {
   integrations: { Intercom: { user_hash: "hash" } }
});
```

When sending calls to Intercom, always include a trait, like`name`. If you don't have a trait to send with Identify calls, map Segment's `timestamp` field to Intercom's `last_request_at` field.
