---
title: Privacy Frequently Asked Questions
---

## Privacy Portal questions

### Why aren't fields from my Cloud Object Sources (like Salesforce and Zendesk) showing up in the Privacy Portal Inbox and Inventory?

The Privacy Portal doesn't doesn't support fields from Cloud Object Sources like Salesforce or Zendesk.

### Why does Segment suggest classifying my fields as Yellow or Red?

Segment provides suggested classifications based on [default PII matchers](/docs/privacy/portal/#default-pii-matchers). These suggestions include exact and fuzzy matches for potential PII. You can update these classifications by following the instructions to [change a recommended classification](/docs/privacy/portal/#change-a-recommended-classification).

### Who can access the Privacy Portal?

Only Workspace Owners can access the portal.

### Which Segment plan types include access to the Privacy Portal?

All Segment plans include access to the Privacy Portal. Data privacy is a fundamental Segment feature, not an add-on.

### If I block data at the source level, can I reverse it or recover the data using Segment's Data Replay feature?

When you block data at the source level using Privacy Controls, the data never enters Segment. As a result, Segment can't replay the data. Segment recommends exercising caution when blocking data at the source level.

### The Privacy Portal classified my property as Yellow, but my destinations require it to function. What should I do?

Segment classifications are recommendations. If a destination requires a field classified as Yellow, you can override the recommended classification to ensure the field gets sent downstream.

## User deletion and suppression questions

### How can I find a specific `userId`?

To locate a specific `userId`, query your Segment [data warehouse](https://segment.com/warehouses){:target="_blank”} for the `users` table. Use other known details about the user, like their email address, to identify the correct row and retrieve the `userId`.

### How many deletion requests can I send?

You can send batches of up to 5,000 `userIds`, or 4 MB, per payload. Segment processes these batches asynchronously. [Contact Segment](https://segment.com/help/contact/){:target="_blank”} if you need to process more than 110,000 users within a 30-day period.

### Which destinations can I send deletion requests to?

In addition to your Raw Data destinations (Amazon S3 and data warehouses), Segment can forward requests to the following streaming destinations:

- Amplitude
- Iterable
- Braze
- Intercom
- Webhooks
- tray.io
- Appcues
- Vero
- Google Universal Analytics
- Customer.io
- Optimizely Full Stack
- Google Cloud PubSub
- Friendbuy (Cloud Destination)

Segment forwards deletion requests but cannot guarantee that data is deleted from downstream destinations. You must contact these destinations to confirm that they executed the request.

### Which destinations require additional configuration to process deletion requests?

#### Amplitude
To process deletion requests in Amplitude, add your Amplitude secret key to the destination settings under "Secret Key." You can find this key in your Amplitude project's [General Settings](https://help.amplitude.com/hc/en-us/articles/235649848-Settings){:target="_blank”}.


#### Google Analytics
To send deletion requests to Google Analytics, authenticate your account with Segment using OAuth. Go to the **User Deletion** settings in your Segment Google Analytics destination and use your email and password to complete authentication.


### What regulation types does Segment support?

Segment supports the following regulation types:
- **SUPPRESS_ONLY**: Suppresses new data for a `userId` without deleting existing data in your workspace or downstream destinations.
- **UNSUPPRESS**: Stops ongoing suppression of a `userId`.
- **SUPPRESS_WITH_DELETE**: Suppresses new data for a `userId` and deletes all existing data for that ID in your workspace and Segment's internal archives. Segment forwards the deletion request to downstream destinations but can't guarantee deletion in third-party tools.
- **DELETE_INTERNAL**: Deletes user data only from Segment archives, without affecting downstream destinations.
- **DELETE_ONLY**: Deletes user data from Segment and your connected warehouses. Also sends a deletion request to your downstream destinations.

> info ""
> Using **SUPPRESS_WITH_DELETE** or **DELETE_ONLY** regulation types might lead to additional charges levied by your destination providers.
