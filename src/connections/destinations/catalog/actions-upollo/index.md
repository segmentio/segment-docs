---
title: Upollo Web (Actions) Destination
id: 640267d74c13708d74062dcd
---

{% include content/plan-grid.md name="actions" %}

[Upollo](https://upollo.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} finds and converts repeat trialers, account sharers and more.

11% of users signing up for free trials have [already had a free trial](https://upollo.ai/blog/turn-repeated-trials-into-growth?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}, and up to 45% of users [share their logins](https://upollo.ai/blog/grow-by-understanding-account-sharing?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} with others.
Inviting these users to a paid account is the top underutilized growth channel for SaaS businesses.

Upollo maintains this destination. For any questions or issues with the destination, please [contact the Upollo team](https://upollo.ai/contact?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.

## Benefits of Upollo (Actions)

Upollo (Actions) provides the following benefits:

- **Find hidden growth opportunities**. Quickly see how many users are repeating free trials or sharing their account.
- **More happy paying customers**. Upgrade these users onto a paying plan and get more happy paying users.

## Getting Started


1. From the Segment web app, navigate to **Connections > Catalog**, and select the **Destinations** tab. 
2. Select **Destinations Actions** under **Categories** in the left navigation.
3. Search for **Upollo (Actions)** and click **Configure Upollo**.
4. Select an existing Source to connect to Upollo (Actions).
5. Get your **Public API key** from the [Upollo dashboard](https://upollo.ai/app/settings/access-and-keys?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.
6. Add your API key to the segment Upollo Action settings.

## Identify

Upollo uses the `identify` call to analyze users on your platform. If the same person is using multiple accounts or if different people are sharing an account, they are flagged and shown in the Upollo dashboard.


The `identify` call provides any available information about the user.
```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  name: 'John Doe',
  phone: '+123456789'
});
```

Learn more about the [Identify call](/docs/connections/spec/identify/).

{% include components/actions-fields.html %}
