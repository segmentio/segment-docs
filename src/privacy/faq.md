---
title: Privacy Frequently Asked Questions
---

## Privacy Portal Questions

### Why aren't fields from my Cloud Object Sources (such as Salesforce and Zendesk) showing up in the Privacy Portal Inbox and Inventory?

We do not currently support Cloud Object Sources in the Privacy Portal, but it's on our roadmap. Stay tuned for new features in the future.

### Why is Segment suggesting my fields should be classified as Yellow or Red?

You can see a full list of the fields we exact-match and fuzzy-match against [by default](/docs/privacy/portal/#default-pii-matchers). These classifications are our best-guess suggestions, and you can easily change them by following the instructions to [change a recommended classification](/docs/privacy/portal/#change-a-recommended-classification).

### Who can access the Privacy Portal?

Only Workspace Owners can access the portal.

### Which Segment plan types get access to the Privacy Portal?

All Segment plans have access to the Privacy Portal, because we believe data
privacy should be a right, not an add-on.

### If I block data at the Source level, can I reverse it or get that data back using Segment's Data Replay feature?

If you use Privacy Controls to block data at the Source level, the data never
enters Segment, and we cannot Replay that data for you. We recommend caution
when blocking data at the Source level.

### The Privacy Portal classified my property as `Yellow`, but it's required for some of my destinations to function. What should I do?

Segment classifications are simply recommendations. If an integration you rely
on requires a field that we recommend be classified as Yellow, you can override
the recommended setting to send that field downstream.

## User Deletion and Suppression Questions

### How can I find my user's userId?

The easiest way to find a customer's `userId` is by querying an existing tool. Specifically, you can use your Segment [data warehouse](https://segment.com/warehouses) to query the `users` table for another known item of information about the user (their email address, for example) and then use that row to find their userId.

### How many deletion requests can I send?
You can send us batches of up to 5,000 `userIds`, or 4 MB, per payload. We process these batches asynchronously. [Contact us](https://segment.com/help/contact/) if you need to process more than 100,000 users within a 30 day period.

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

Segment cannot guarantee that data is deleted from your Destinations. When you issue a user deletion request, Segment forwards the request to supported streaming Destinations. You must still contact these Destinations to confirm that they've executed the request.

### Which destinations require additional destination setting configuration?

#### Amplitude
If you have the Amplitude destination enabled in one or more sources, you must include Amplitude's secret key in each destination(s) settings so they can accept the deletion request. (You add it in the Amplitude destination settings, under "Secret Key"). You can find your Secret Key on the [General Settings](https://help.amplitude.com/hc/en-us/articles/235649848-Settings) of your Amplitude project.

#### Google Analytics
To send user deletion requests to Google Analytics you must authenticate your Google Analytics account with Segment using OAuth. If you have the Google Analytics destination enabled in one or more sources, you must authenticate your account in each destination(s) settings. Navigate to the **User Deletion** settings in your Segment Google Analytics settings and use your email and password to authenticate your account.
