---
rewrite: true
title: Singular Destination
id: 5c768ec31413290001ebdd2e
---
[Singular](https://www.singular.net/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a Marketing Intelligence Platform that transforms marketing data into accurate, granular and actionable insights to drive growth. By unifying marketing campaign data with attribution data, marketers can measure ROI from every touchpoint across multiple channels for a single source of truth.

This destination is maintained by Singular. For any issues with the destination, [contact Singular Support](mailto:support@singular.net).

## Getting Started



1. From the Segment web app, click **Catalog**.
2. Search for "Singular" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Add your Singular "API KEY", found in your Singular Dashboard under 'Developer Tools' > 'SDK Keys', to the Segment Settings UI.

## What's supported

1. Install Attribution
2. Apple Search Ads Attribution
3. Custom Event Tracking
4. Revenue tracking
5. Custom User ID

## Install Attribution

Enable automatic tracking of lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) using initialization config parameters ([iOS](/docs/connections/sources/catalog/libraries/mobile/ios/#application-lifecycle-tracking), [Android](/docs/connections/sources/catalog/libraries/mobile/android/#step-2-initialize-the-client)) to track installs and sessions in Singular. The Singular "**session**" will be sent automatically by the integration as long as you are including the events above.


## Tracking Custom Events

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call (in Android) would look like:

```java
Analytics.with(context).track("Signup")
Analytics.with(context).track("Level9Passed")
```

Those calls will be sent to Singular and processed as custom post-install events and will be available in reporting & user-level exports.

## Revenue Tracking

Singular will receive revenue tracking when an event containing the `revenue` property is sent (including zero value). You can optionally pass the `currency` (as an iso3 code). The default currency is `USD`.


For example in Android you would do:

```java
Analytics.with(context).track("Order Completed", new Properties().putRevenue(1.99));
```

## Custom User ID
For the cloud-mode destination, Singular has mapped the **Custom User ID** to the Segment [User ID](/docs/connections/spec/identify/#user-id) value. Follow the steps here to configure for: [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/#identify), [Android](/docs/connections/sources/catalog/libraries/mobile/android/#identify).

For the device-based destination, Singular's SDK uses the ​identify​ method to map Segment's ​User ID​ value to the Custom User ID.

Android example:

```java
Analytics.with(context).identify("myUserId");
```

In order to unset the Custom User ID, call the ​reset​ method.

Android example:

```java
Analytics.with(context).reset();
```


