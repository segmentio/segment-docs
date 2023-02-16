---
title: Upollo Destination
hidden: true
private: true
---

{% include content/plan-grid.md name="actions" %}


[Upollo](https://upollo.ai?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} finds and converts repeat trialers, account sharers and more.

11% of users signing up for free trials have [already used one](https://upollo.ai/blog/turn-repeated-trials-into-growth?utm_source=segmentio&utm_medium=docs&utm_campaign=partners), and up to 45% of users [share their logins](
https://upollo.ai/blog/grow-by-understanding-account-sharing?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) with others.
Inviting these users to a paid account is the number 1 underutilized growth channel for SaaS businesses.

This destination is maintained by Upollo. For any questions or issues with the destination, please [contact the Upollo team](https://upollo.ai/contact?utm_source=segmentio&utm_medium=docs&utm_campaign=partners).

## Benefits of Upollo (Actions)

Upollo (Actions) provides the following benefits:

- **Find hidden growth opportunities**. Quickly see how many users are repeating free trials or share their account.
- **More happy paying customers**. Upgrade these users onto a paying plan and get more happy paying users.

## Getting Started

1. Signup for Upollo and get your public API key.
2. Add that to the segment configuration

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Search for **Upollo (Actions)** and click **Configure Upollo**.
4. Select an existing Source to connect to Upollo (Actions).
5. Get your **Public API key** from the [Upollo dashboard](https://upollo.ai/app/settings/access-and-keys?utm_source=segmentio&utm_medium=docs&utm_campaign=partners).
6. Add your API key to the segment Upollo Action settings.

## Identify

Upollo uses segments identify call to analyse users on your platform. If the same person is using mulitple accounts or if different people are sharing an account they will be flagged and shown in the Upollo dashboard.


In the `identify` call provide any available information.
```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  name: 'John Doe',
  phone: '+123456789'
});
```

For more see the [Identify API documentation](/docs/connections/spec/identify/).

{% include components/actions-fields.html %}
