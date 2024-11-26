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

### Which Destinations can I send deletion requests to?

In addition to your Raw Data destinations (Amazon S3 and Data Warehouses), we can forward requests to the following streaming destinations:

- Amplitude
- Iterable
- Braze
- Intercom
- Webhooks
- tray.io
- Appcues
- Vero
- Google Analytics
- Customer.io
- Optimizely Full Stack
- Google Cloud PubSub
- Friendbuy (Cloud Destination)

Segment cannot guarantee that data is deleted from your Destinations. When you issue a user deletion request, Segment forwards the request to supported streaming Destinations. You must still contact these Destinations to confirm that they've executed the request.

### Which destinations require additional destination setting configuration?

#### Amplitude
If you have the Amplitude destination enabled in one or more sources, you must include Amplitude's secret key in each destination(s) settings so they can accept the deletion request. (You add it in the Amplitude destination settings, under "Secret Key"). You can find your Secret Key on the [General Settings](https://help.amplitude.com/hc/en-us/articles/235649848-Settings) of your Amplitude project.

#### Google Analytics
To send user deletion requests to Google Analytics you must authenticate your Google Analytics account with Segment using OAuth. If you have the Google Analytics destination enabled in one or more sources, you must authenticate your account in each destination(s) settings. Navigate to the **User Deletion** settings in your Segment Google Analytics settings and use your email and password to authenticate your account.

### What regulation types does Segment support?

Segment supports the following regulation types:
- **SUPPRESS_ONLY**: Suppress new data based on the `userId` without deleting existing data stored in your workspace and in downstream destinations.
- **UNSUPPRESS**: Stop the ongoing suppression of a `userId`.
- **SUPPRESS_WITH_DELETE**: Suppress new data based on the `userId` and also delete all existing data for that ID from your workspace and our internal archives. While Segment forwards the deletion request to your downstream destinations, Segment cannot guarantee deletion in your third-party tools.
- **DELETE_INTERNAL**: Deletes user data from within Segment archives only and not from any connected destinations.
- **DELETE_ONLY**: Deletes user data from Segment and your connected warehouses. Also sends a deletion request to your downstream destinations.


> info ""
> Using **SUPPRESS_WITH_DELETE** or **DELETE_ONLY** regulation types might lead to additional charges levied by your destination providers.