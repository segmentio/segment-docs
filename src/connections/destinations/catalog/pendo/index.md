---
rewrite: true
title: Pendo Destination
id: 575ef2fc80412f644ff139be
---
[Pendo](http://www.pendo.io/){:target="_blank"} is a product cloud that helps product teams deliver software users love. With Pendo, product teams can understand product usage, collect feedback, measure NPS, onboard users, and announce new features in app—all without requiring engineering resources.

Pendo maintains this destination. For any issues with the destination, [contact the Pendo support team](https://support.pendo.io/hc/en-us/articles/360034163971){:target="_blank"}.

## Getting started

1. From the Segment web app, click **Catalog**.
2. Search for "Pendo" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Pendo API Key. To find the key in the Pendo UI as a Pendo admin, go to **Settings > [Subscription Settings](https://app.pendo.io/admin){:target="_blank"} > Applications**, open the relevant app, then locate the **API key** value.

Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Pendo's snippet on your page and sending data.

This pulls in all page and click events without needing to make additional method calls.

### Cloud-mode configuration

> info "Pendo does not natively support cloud-mode connections"
> The Pendo destination does not natively support cloud-mode connections. Use the [webhook](/docs/connections/destinations/catalog/webhooks) destination to send data to Pendo using a cloud-mode connection.

To add the Pendo destination using cloud-mode, use the [webhooks](/docs/connections/destinations/catalog/webhooks) destination to enable Segment to send data to Pendo through a webhook.

1. From the Segment web app, click **Catalog**.
2. Search for **Webhooks** in the Catalog, select it, and choose which of your JavaScript sources to connect the destination to.
3. Webhook URL configuration varies based on which Pendo environment you use and your API key:
    * For US customers, add the following as your Webhook URL: `https://data.pendo.io/data/segmentio/YOUR_PENDO_API_KEY` and replace `YOUR_PENDO_API_KEY` with your actual Pendo API Key.
    * For EU customers, add the following as your Webhook URL: `https://data.eu.pendo.io/data/segmentio/YOUR_PENDO_API_KEY` and replace `YOUR_PENDO_API_KEY` with your actual Pendo API Key.
4. Headers are not required in Webhook configuration. Once you're done adding in your URL, save changes.
5. Using the [Track method](/docs/connections/spec/track/) requires a setting enabled on your Pendo subscription (cloud-mode only). Contact Pendo to enable this feature flag for your account.

To learn more about server-side data to Pendo, see Pendo's [support documentation](https://support.pendo.io/hc/en-us/articles/360031870352){:target="_blank"}.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify("userId1", {
  name: "Peter Gibbons",
  email: "peter@example.com",
  plan: "premium",
  logins: 5
});
```

When you send an Identify call, Segment passes that user's information to Pendo with `userId` as Pendo's visitor ID. User traits that you pass are mapped to visitor metadata in Pendo.


## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```javascript
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise"
});
```

When you send a Group call, Segment sends `groupId` as the Pendo as account ID. Group traits are mapped to account metadata in Pendo. If you are using Pendo account data, group calls (fields `groupId` & `traits`) are required.

