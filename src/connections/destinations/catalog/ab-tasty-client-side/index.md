---
rewrite: true
title: AB Tasty Destination
id: 6214f1347a49cda426260372
beta: true
---

# AB Tasty Destination

[AB Tasty](https://www.abtasty.com){:target="_blank"} lets you build end-to-end experiences that drive growth across all digital channels. Marketing, product and engineering teams work together to deliver seamless user experiences with AB Tasty.

AB Tasty maintains this destination. For any issues with the destination, [contact the AB Tasty Support team](mailto:product@abtasty.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **AB Tasty** in the Destinations Catalog, and select the **AB Tasty** destination.
3. Choose which Source should send data to the AB Tasty destination.
4. Go to the [AB Tasty settings interface](https://app2.abtasty.com/settings/integration/api-configuration){:target="_blank"} and navigate to **Integrations > API Key**.
5. Click **Generate API Key** (if the API key doesn't already exist) and copy the API key.
6. Enter the API key in the AB Tasty destination settings in Segment.

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

Segment sends Identify calls to AB Tasty as an `identify` event. The AB Tasty data engine then ingests the different traits associated to the identified user.

Traits received are then available in the [AB Tasty segment builder](https://abtasty.zendesk.com){:target="_blank"}.

### Group

Send [Group](/docs/connections/spec/group) calls to AB Tasty webhook. The AB Tasty data engine then ingests the different traits associated to the identified group. For example:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830,
});
```

Segment sends Track calls to AB Tasty as a `group` event. The AB Tasty data engine then ingests the different traits associated to the identified user.

Traits received are then available in the [AB Tasty segment builder](https://abtasty.zendesk.com){:target="_blank"}.
