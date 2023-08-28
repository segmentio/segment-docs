---
title: Aampe Destination
id: 6188d844be5cf0e3b59189d2
---

[Aampe](https://aampe.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} uses automated, rapid learning to personalize notifications, and continuously learns what messages bring value to your customer.

This destination is maintained by Aampe. For any issues with the destination, [contact the Aampe Support team](mailto:support@aampe.com).

## Getting Started



1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Aampe" in the Destinations Catalog, and select the "Aampe" destination.
3. Choose which Source should send data to the "Aampe" destination.
4. Go to the [Data Integrations page](https://compose.aampe.com/configure/integrations) on Aampe Composer, click on "Add Integration", select "Segment" and click "Next".
5. Copy the Segment API Key from the resulting page.
6. Enter this key in "API Key" in the "Aampe" destination settings in Segment.

## Supported methods

Aampe supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Track

Segment sends [Track](/docs/connections/spec/track) calls to Aampe as a `track` event. These are used by Aampe to display engagement activity and reports in the [Aampe Composer](https://compose.aampe.com). You can use these to configure goals that are used for monitoring and creating campaigns. It may take up to 24 hours for events to show up in the Aampe Composer.

```js
analytics.track("Login Button Clicked");
```

Segment sends Track calls to Aampe as a `track` event.

Other methods like Page, Screen, and Identify are accepted by the Aampe destination but are not stored or used in any way.
