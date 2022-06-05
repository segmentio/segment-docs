---
rewrite: true
title: AB Tasty Destination
beta: true
---

# AB Tasty Destination

[AB Tasty](https://urldefense.com/v3/__https://www.abtasty.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners__;!!NCc8flgU!eK4m9yKxeZqvRYUi5qxokQvc3JbNTZ-Zg_1Naqa4sl5u-tH1w1Pw81gzJ2XznPIaxVg3HpQB-aXt4e1ffk3Siz9XJ77t$) lets you build end-to-end experiences that drive growth across all digital channels. Marketing, product and engineering teams work together to deliver seamless user experiences with AB Tasty.

This destination is maintained by AB Tasty. For any issues with the destination, [contact the AB Tasty Support team](mailto:product@abtasty.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "AB Tasty" in the Destinations Catalog, and select the "AB Tasty" destination.
3. Choose which Source should send data to the "AB Tasty" destination.
4. Go to the [AB Tasty settings interface](https://urldefense.com/v3/__https://app2.abtasty.com/settings/integration/api-configuration__;!!NCc8flgU!eK4m9yKxeZqvRYUi5qxokQvc3JbNTZ-Zg_1Naqa4sl5u-tH1w1Pw81gzJ2XznPIaxVg3HpQB-aXt4e1ffk3Si8J8KsWl$) (Integrations > API Key), click generate API Key (if not already existing), copy the API key.
5. Enter the "API Key" in the "AB Tasty" destination settings in Segment.

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

Segment sends Identify calls to AB Tasty as an `identify` event. AB Tasty data engine then ingest the different traits associated to the identified user

Traits received are then available in the [AB Tasty segment builder](https://urldefense.com/v3/__https://abtasty.zendesk.com/hc/en-us/articles/360021173873-Defining-your-segment__;!!NCc8flgU!eK4m9yKxeZqvRYUi5qxokQvc3JbNTZ-Zg_1Naqa4sl5u-tH1w1Pw81gzJ2XznPIaxVg3HpQB-aXt4e1ffk3Si3uCwYpb$).

### Group

Send [Group](/docs/connections/spec/group) calls to AB Tasty webhook. AB Tasty data engine then ingest the different traits associated to the identified group. For example:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830,
});
```

Segment sends Track calls to AB Tasty as a `group` event. AB Tasty data engine then ingest the different traits associated to the identified user

Traits received are then available in the [AB Tasty segment builder](https://urldefense.com/v3/__https://abtasty.zendesk.com/hc/en-us/articles/360013775899-Audience-Manager-Creating-a-segment-__;!!NCc8flgU!eK4m9yKxeZqvRYUi5qxokQvc3JbNTZ-Zg_1Naqa4sl5u-tH1w1Pw81gzJ2XznPIaxVg3HpQB-aXt4e1ffk3Si1GlHOMI$).
