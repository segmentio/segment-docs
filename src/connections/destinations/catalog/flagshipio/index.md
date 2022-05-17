---
title: Flagship.io Destination
rewrite: true
id: 626153e34fb8f47a32f8deab
redirect_from:
  - '/connections/destinations/catalog/flagship-io/'
---

[Flagship.io](https://www.Flagship.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} lets engineering teams deploy continuously and monitor the impact of features on technical infrastructure. It also enables product teams to control how features are released and how they impact user experience and business KPIs.

Flagship.io maintains this destination. For any issues with the destination, [contact the Flagship Support team](mailto:support@flagship.io).

## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Flagship.io** in the Destinations Catalog, and select the **Flagship.io** destination.
3. Choose which Source should send data to the Flagship.io destination.
4. Go to the [Flagship.io settings interface](https://app.flagship.io/env/c92t23fode700aontbvg/settings/integrations){:target="_blank"} under **Settings > Integrations** and choose **Segment** in the dropdown. Click **Add Tool** and copy the API key displayed.
5. Enter the **API Key** in the Flagship.io destination settings in Segment.

## Supported methods

Flagship.io supports the following methods as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify) calls to the Flagship.io webhook. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  trait1: 1,
  trait2: "test",
  trait3: true
  },    
});
```

Segment sends Identify calls to Flagship.io as an `identify` event. The Flagship.io data engine then ingests the different traits associated to the identified user.

The received traits are available in the [Flagship use case builder](https://docs.developers.flagship.io/docs/getting-started-with-flagship#4-create-your-first-campaign-on-the-platform){:target="_blank"}.


### Group

Send [Group](/docs/connections/spec/group) calls to Flagship.io webhook. The Flagship.io data engine then ingests the different traits associated to the identified group. For example:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

Segment sends Track calls to Flagship.io as a `group` event. The Flagship.io data engine then ingests the different traits associated to the identified user.

The received traits are available in the [Flagship use case builder](https://docs.developers.flagship.io/docs/getting-started-with-flagship#4-create-your-first-campaign-on-the-platform){:target="_blank"}.
