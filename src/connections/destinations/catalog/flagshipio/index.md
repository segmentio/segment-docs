---
title: Flagship.io Destination
rewrite: true
id: 626153e34fb8f47a32f8deab
---

[Flagship.io](https://www.Flagship.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) lets engineering teams deploy continuously and monitor the impact of features on technical infrastructure, while product teams control how features are released and their impact on users' experience and business KPIs.

This destination is maintained by Flagship.io. For any issues with the destination, [contact the Flagship Support team](mailto:support@flagship.io).

## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Flagship.io" in the Destinations Catalog, and select the "Flagship.io" destination.
3. Choose which Source should send data to the "Flagship.io" destination.
4. Go to the [Flagship.io settings interface](https://app.flagship.io/env/c92t23fode700aontbvg/settings/integrations) (Settings > Integrations), choose Segment in the dropdown, click Add Tool, copy the API key displayed.
5. Enter the "API Key" in the "Flagship.io" destination settings in Segment.

## Supported methods

AB Tasty supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to AB Tasty webhook. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  trait1: 1,
  trait2: "test",
  trait3: true
  },    
});
```

Segment sends Identify calls to Flagship.io as an `identify` event. AB Tasty data engine then ingest the different traits associated to the identified user

Traits received are then available in the [Flagship use case builder](https://docs.developers.flagship.io/docs/getting-started-with-flagship#4-create-your-first-campaign-on-the-platform).


### Group

Send [Group](/docs/connections/spec/group) calls to Flagship.io webhook. Flagship.io data engine then ingest the different traits associated to the identified group. For example:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

Segment sends Track calls to Flagship.io as a `group` event. Flagship.io data engine then ingest the different traits associated to the identified user

Traits received are then available in the [Flagship use case builder](https://docs.developers.flagship.io/docs/getting-started-with-flagship#4-create-your-first-campaign-on-the-platform).
