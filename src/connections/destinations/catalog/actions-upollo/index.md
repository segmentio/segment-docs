---
title: Upollo Web (Actions) Destination
id: 640267d74c13708d74062dcd
---

{% include content/plan-grid.md name="actions" %}

[Upollo](https://upollo.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} gives unique and actionable insights that lead to conversion, retention and expansion.

Understand who your users truly are, if they are ready to convert, churn or expand and why they are ready. Upollo provices unique insights from users who are ready to convert because they have [already had a free trial](https://upollo.ai/blog/turn-repeated-trials-into-growth?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}, a company ripe for a team wide roll out because they [share logins](https://upollo.ai/blog/grow-by-understanding-account-sharing?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} or finding high intent companies [hidden behind public emails](https://upollo.ai/blog/hidden-goldmine-public-emails).

Upollo also enriches your identify data with firmopgrahic data so you can understand your users in Upollo or in your data warehouse. See company name, size and industry for your users as soon as they sign in, for free at unlimited scale.

Upollo maintains this destination. For any questions or issues with the destination, please [contact the Upollo team](https://upollo.ai/contact?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.

## Benefits of Upollo (Actions)

Upollo (Actions) provides the following benefits:

- **Find hidden growth opportunities**. Quickly see opportunities to convert, retain and expand.
- **More happy paying customers**. Upgrade these users onto a paying plan and get more happy paying users.

## Getting Started

1. From the Segment web app, navigate to **Connections > Catalog**, and select the **Destinations** tab.
2. Select **Destinations Actions** under **Categories** in the left navigation.
3. Search for **Upollo (Actions)** and click **Configure Upollo**.
4. Select an existing Source to connect to Upollo (Actions).
5. Get your **Public API key** from the [Upollo dashboard](https://upollo.ai/app/settings/access-and-keys?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.
6. Add your API key to the segment Upollo Action settings.

## Identify

Upollo uses the `identify` call to analyze users on your platform. Our unique insights shown in the Upollo dashboard and optionally enriched data is added to identify events.

The `identify` call provides any available information about the user.

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
  name: "John Doe",
  phone: "+123456789",
});
```

Learn more about the [Identify call](/docs/connections/spec/identify/).

{% include components/actions-fields.html %}
