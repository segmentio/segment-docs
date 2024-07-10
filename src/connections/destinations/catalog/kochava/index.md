---
title: Kochava Destination
rewrite: true
id: 5695db50e954a874ca44ce63
---
[Kochava](https://www.kochava.com/){:target="_blank"} offers mobile app attribution and mobile app analytics providing holistic, unbiased measurement for precise, real-time visualization of app performance through the funnel.

_**NOTE:** The Segment-Kochava destination is only available to [Kochava paid accounts](https://support.freeappanalytics.com/server-to-server-integration/segment-integration/){:target="_blank"}._

This destination is maintained by Kochava. For any issues with the destination, [contact the Kochava Support team](mailto:support@kochava.com)

## Getting Started



1. If you have not already, create your app within the Kochava dashboard. Check out Kochava's documentation for information on [creating your app](http://support.kochava.com/create-manage-apps/create-edit-apps){:target="_blank"}.
2. From your Segment UI's Destinations page click on "Add Destination".
3. Search for "Kochava" in the Catalog, select it, and choose which of your sources to connect the destination to.
4. In the Kochava app, grab your Kochava App GUID (Globally Unique Identifier)
5. Copy the Kochava GUID into the Segment Destinations Settings UI under "API key".

Additional information from Kochava on [setting up your first campaign within Kochava](https://support.kochava.com/campaign-management/create-an-install-campaign){:target="_blank"}.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] track:@"Item Purchased"
                           properties:@{ @"item": @"Sword of Heracles", @"revenue": @2.95 }];
```

Kochava is able to accommodate any post-install track event that is passed into its system. Events, when received for the first time, will auto provision into the Kochava dashboard. There is no need to create / provision the post-install track event ahead of time. When enabling Kochava in the Segment dashboard, you should expect to see any / all actions you're tracking with Segment appear in your Kochava account.

`context.device.type` (has value of 'ios' or 'android'), `context.device.advertising_id` (IDFA on iOS and adID on Android) **and** `context.device.id` are required in all calls to Kochava.

To automatically collect `context.device.advertising_id`, on Android you must include the Google Mobile Ads component of Google Play services as described in the [Google Play services setup documentation](https://developers.google.com/android/guides/setup#add_google_play_services_to_your_project){:target="_blank"}. On iOS, you must include the [AdSupport and Ad Tracking Transparency frameworks](/docs/connections/sources/catalog/libraries/mobile/ios/#ad-tracking-and-idfa).

If making calls outside of Segment's iOS or Android library (eg post-install events sent from a server-side library), you'll need to ensure that you collect and send `context.device.type`, `context.device.advertising_id` **and** `context.device.id`.

Note that if you are sending data from mobile devices using one of our mobile libraries as well as server-side, `context.device.id` and `context.device.advertising_id` need to be the same for the same user regardless of where the data originates. Below is a Ruby example of how to pass the required context information in the track call.

```
Analytics.track(
  user_id: '019mr8mf4r',
  event: 'Subscription Charge',
  properties: {
    subscription_type: 'Premium',
    revenue: '9.99'
  },
  context: {
    device: {
      id: '176779B9-8C07-4E53-B3EA-ABBFAA40C829',
      advertising_id: '017D76B5-85F8-4E3C-8CCE-8B29CCEACB1D',
      type: 'ios' # or 'android'
    }
  }
)
```

### Install Attributed Postback

To create a Kochava-Certified Postback that will send campaign information to Segment after attributing an `Application Installed` event, follow [Kochava's Postback set up documentation](https://support.kochava.com/campaign-management/create-a-kochava-certified-postback){:target="_blank"}.



{% include content/personas.md %}

## Troubleshooting

### advertisingId is string of 0s
This occurs when the user has limited ad tracking enabled on their iOS mobile device.
