Nudge (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[Nudge](https://nudgenow.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is an AI personalization platform for marketing teams for enabling rapid personalization experimentation and for autonomously delivering 1:1 user experiences.

This destination is maintained by the Nudge Developer Team. For any issues with the destination, [contact the Support team](mailto:support@nudgenow.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Nudge".
2. Select **Nudge** and click **Add Destination**.
3. Select an existing Source to connect to Nudge (Actions).
4. Go to the [Nudge dashboard](https://dashboard.nudgenow.com){:target="_blank"}, and navigate to the **Settings** page.
5. Go to the **Secret Keys** section and click on the **Create new secret key** button.
6. Give appropriate name for the key, select the **Backend API** option from the permissions dropdown and create the key.
7. Copy the generated key and store it somewhere safe for future reference.
8. Enter the generated API key in the **Nudge** destination settings in Segment.

## Supported methods

Nudge (Actions) Destination currently supports the Identify and Track methods listed below in accordance to the core Segment Specs. Reference: [Spec Overview](https://segment.com/docs/connections/spec/)

### Identify

The Identify method lets you create or update a user in Nudge’s backend. Every Identify call should include a `userId`. See Segment's Spec for Identify for any reference: [Identify Spec](https://segment.com/docs/connections/spec/identify/)

**Example (using Segment's Analytics.js SDK)**

```js
analytics.identify('user123', {
  firstName: 'Alice',
  lastName: 'Smith',
  email: 'alice.smith@example.com',
  company: 'Acme Corp',
  employees: 150
});
```

How Nudge handles Identify calls:

* If `userId` does not exist, the request would throw a 400 validation error as it is a required field.
* If `userId` already exists, Nudge merges or overwrites profile properties with the latest values.
* Identify calls without `userId`, or with only `anonymousId`, are dropped.

---

### Track

The Track method sends custom events and their properties into Nudge. You must include `event` name in every Track call so events can be associated with the correct user. See Segment's Spec for Track for any reference: [Track Spec](https://segment.com/docs/connections/spec/track/)

**Example (using Segment's Analytics.js SDK)**

```js
analytics.track('Product Viewed', {
  product_id: 784,
  product_sku: 'SH#79817'
});
```

How Nudge handles Track calls:

* Segment ensures the `userId` is attached to the Track call for a previously successful Identify.
* Events without a valid `userId` or with only `anonymousId` are dropped.
* All other event properties are ingested as event metadata and can be used for trigger conditions.


{% include components/actions-fields.html %}

## Troubleshooting

### 1. Events not showing up in Nudge

* **Missing or invalid API key**
  Ensure that the API key you generated under **Settings → Secret Keys → Backend API** is correctly entered in your Segment destination settings.
* **Dropped Identify/Track calls**
  Calls without `userId`, or with only `anonymousId`, are automatically dropped. Verify your mapping includes the correct identifier field.

### 2. Timestamp or date format errors

Nudge expects all date/time properties in UTC ISO-8601 format (Javascript Date object's ISO format). If you see failed events due to timestamp validation:

* Confirm you’re sending dates like `"2025-05-14T07:30:00Z"`.
* Remove any timezone offsets other than `Z` (UTC).

### 3. Validation failures

If requests continue to fail after checking your API key and payload:

* Compare against Nudge’s specification from the documentation: [https://docs.nudgenow.com/](https://docs.nudgenow.com/).
* Ensure all required fields (e.g., `userId`, `event` name for Track) are present and correctly typed.

---

*If you still encounter issues, please reach out to the Nudge Developer Team or email [support@nudgenow.com](mailto:support@nudgenow.com).*