---
rewrite: true
title: Pendo Destination
id: 575ef2fc80412f644ff139be
---
[Pendo](http://www.pendo.io/) is a product cloud that helps product teams deliver software users love. With Pendo, product teams can understand product usage, collect feedback, measure NPS, onboard users, and announce new features in app—all without requiring engineering resources.

Pendo maintains this destination. For any issues with the destination, [contact the Pendo Support team](https://help.pendo.io/).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Pendo" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Pendo API Key which you can find in the Pendo UI under [Site Settings](https://app.pendo.io/admin) > Basic Information > API Key.

Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Pendo's snippet on your page and sending data.

 This pulls in all page and click events without needing to make additional method calls.

### Cloud-mode configuration

> info ""
> The Pendo destination does not natively support Cloud-mode connections. Use the [Webhook](/docs/connections/destinations/catalog/webhooks) destination to send data to Pendo using a Cloud-mode connection.

To add the Pendo destination using Cloud-mode, use the [Webhooks](/docs/connections/destinations/catalog/webhooks) destination to enable Segment to send data to Pendo through a webhook.

1. From the Segment web app, click **Catalog**.
2. Search for **Webhooks** in the Catalog, select it, and choose which of your JavaScript sources to connect the destination to.
3. Add the following as your Webhook URL: `https://pendo-io.appspot.com/data/segmentio/YOUR_PENDO_API_KEY` and replace `YOUR_PENDO_API_KEY` with your actual Pendo API Key which you can find in the Pendo UI under [Site Settings](https://app.pendo.io/admin) > Basic Information > API Key.
4. Headers are not required in Webhook configuration. Once you're done adding in your URL, save changes.
5. Using Track method also requires a setting enabled on your Pendo subscription. contact Pendo to enable this feature flag for your account.

To learn more about server-side data to Pendo, see Pendo's [support documentation](https://help.pendo.io/resources/support-library/integrations/segment-integration.html#send-server-side-data-to-pendo){:target = "_blank"}.

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

