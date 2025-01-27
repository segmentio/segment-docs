---
title: Display and Video 360 (Actions) Destination
strat: google
hide-settings: true
id: 65302a3acb309a8a3d5593f2
engage: true
redirect_from:
  - '/connections/destinations/catalog/personas-display-video-360/'
---

> info ""
> Display and Video 360 (Actions) operates using third-party cookies, and its match rates are influenced by the extent to which these cookies are supported by browsers.

Google's [Display & Video (DV360)](https://marketingplatform.google.com/about/display-video-360/){:target="_blank"} service is an end-to-end campaign management tool that enables enterprise customers to plan, measure, and run display and video advertisements. 

> info ""
> You can connect to a Google Ad Manager account. For more information, see [Create an audience and finish DV360 configuration](#create-an-audience-and-finish-dv360-configuration) below. Set **User-Role Granted** to `Publisher` if you plan to connect to Google Ad Manager.

Segment's integration with DV360 enables Segment customers to sync audiences created in Engage with DV360 for centralized audience management and improved retargeting.

> warning ""
> You must meet certain implementation criteria to use the DV360 integration:
> - For web traffic, you must have a client-side `analytics.js` source.
> - For mobile app traffic, you must have a mobile source.

> info ""
> Since the release of `analytics-ios` version 4, Segment no longer collects IDFA automatically. To collect and pass IDFA to your DV360 integration, follow the steps for Ad Tracking and IDFA in the [Analytics-iOS mobile source](/docs/connections/sources/catalog/libraries/mobile/ios#ad-tracking-and-idfa) documentation.

> info "Consent mode"
> Google enforced consent on March 6, 2024 for European Economic Area (EEA) users. Learn more about [consent mode](/docs/connections/destinations/catalog/actions-display-video-360/#consent-mode) and how to set it up.

## Details

> info ""
> For users detected to originate from US states with privacy restrictions, using a Google User ID to populate user lists is deprecated, and will be eventually sunset. It's recommended that bidders populate user lists with their hosted match data for these users.

Keep the following settings and requirements in mind as you set up your DV360 (Actions) Destination.

- **Audience appears as**: An audience list with the name of your Engage Audience on the **DV360 All Audiences** screen
- **Destination rate limit**: None
- **Lookback window allowed**: 30 days
- **Historical backfill supported**: No
- **Identifiers required (one of the following)**:
  - `idfa` (iOS)
  - `advertisingId` (Android)
  - `anonymousId` (Web)
- **Connection type**:
  - Client-side (DoubleClick Floodlight)
  - Server-side (DV360)
- **Aliasing supported**: No

- **Requirements**:
  - Business tier Segment customers with Engage
  - One of the following sources, depending on type:
    - For web: analytics.js
    - For mobile app: a mobile source that passes an advertising identifier
  - A Google Marketing Platform account

## Components

The Segment DV360 integration uses two components, the [DoubleClick Floodlight tag](/docs/connections/destinations/catalog/doubleclick-floodlight/) and Display & Video 360 (Actions) integration.

### DoubleClick Floodlight tag

Segment users must add this tag to their web properties. The tag performs several functions, but when enabled for the DV360 integration, it allows Segment to send information about users directly to Google client-side.

> info ""
> This component is required only if you want to sync audiences based on web traffic.

### DV360 destination

The DV360 Destination syncs audience data between Segment and Google Display & Video 360. For more information about enabling the DV360 Destination, [view the setup instructions below](#set-up) below.

## Set up the DV360 Destination

Configuring this integration requires action by both you in your Segment workspace, and Google in your Google Marketing Platform account. As a result, the time required to finish configuration and setup can vary.

### Configure client integration for web traffic

> info ""
> This step is necessary only if you want to use Google User IDs to build audiences based on website traffic. If you plan to use mobile identifiers only, continue to [Enable and configure the DV360 Destination](enable-and-configure-the-dv360-destination).

Segment requires the [DoubleClick Floodlight](/docs/connections/destinations/catalog/doubleclick-floodlight/) tag on your website to enable the creation of audiences based on website traffic. This allows Segment to send Google the appropriate identifier (typically `anonymousId`) for users that are in an audience. Google stores these identifiers on its servers and matches them against `google_id`.

To configure DoubleClick Floodlight:

> warning ""
> **Prerequisite**: Create a [JavaScript Website](/docs/connections/sources/catalog/libraries/website/javascript/) source in your Segment workspace if one does not exist. Ensure that this source is configured to track visitors to your website. For more information about configuring Javascript sources, see the [Analytics.js Quickstart guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/).

1. In your workspace, visit the **Catalog** and search for the **DoubleClick Floodlight** Destination.
2. Connect your JavaScript website source to the DoubleClick Floodlight destination, and configure the following settings:
   1. **Get DoubleClickID**: `On`
   2. **Google Network Id**: `segment`
   3. Your [Segment write key](/docs/connections/find-writekey/). You can retrieve your write key from the Settings tab in the source.
   4. **DoubleClick Advertiser ID**
      - If you use DoubleClick Floodlight for DV360 only, enter `DV360`.
      - If you use DoubleClick Floodlight for other use cases in addition to DV360, enter the Advertiser ID from your Doubleclick Floodlight account.
3.  Switch the toggle to enable the destination.

### Enable and configure the DV360 Destination

1. From your Segment workspace, navigate to **Engage > Engage Settings > Destinations > Add Destination**, then search for **Display and Video 360 (Actions)**.
2. Authenticate using OAuth. Segment asks for permissions to see, edit, create and delete your Audience Partner account data.
3. Switch the toggle to enable the destination.
4. Navigate to the **Mappings** tab, click **Add Mapping** and select **Add to Audience**. 
5. Click **Save** and make sure to enable the mapping. 
6. On the **Mappings** tab, click **Add Mapping** and select **Remove from Audience**. 
7. Click **Save** and make sure you enable the mapping. 

> info ""
> The destination does not have configurable settings until you create an audience, described in the [Create an audience and finish DV360 configuration](#create-an-audience-and-finish-dv360-configuration) documentation.

### Create an audience and finish DV360 configuration

[Create an audience](/docs/personas/audiences) in a new or existing Engage space. After you create the audience, you can select the Display & Video 360 (Actions) Destination you created before.

> info ""
> These settings are tied to a single audience. Each additional audience you send to DV360 requires you to input these values.

When you select the destination, you're prompted to enter the destination settings:

| Setting                        | Description                                                                                                                                                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Account Type                   | The type of DV360 account used to sync. Either `Advertiser`, `Partner`, or `Publisher`. **Note:** Select `Publisher` only if you plan to connect to Google Ad Manager.    |
| Advertiser ID                  | The ID of your DV360 Advertiser account. Can be found in your Google Account under **Advertiser Settings > Basic Details > Advertiser ID**.                                                                                                                                       |

You'll also need to toggle on the Send Track setting. 


After you complete the set up process, allow up to 24 hours for Google to create the new audience list. Once the list is created, Segment can begin to sync users to that list. Google may require additional time to process the initial audience additions. The entire first sync to DV360 may require 24-48 hours to complete. As a result, the first few audience syncs after you create the audience may fail.

{% include content/sync-frequency-note.md %}

## Migrate from Personas Google Display & Video 360 Destination 

Segment will copy all of your existing Personas Display & Video 360 Destination configurations to Display and Video 360 (Actions). Once the migration is completed , you will be notified by email. 


As of April 2, 2024, Segment no longer requires you to re-authenticate for existing Personas Display & Video 360 destinations. Segment, as an External Data Partner, now uses a set of Segment DMP credentials to authenticate on your behalf.  To add Segment as an External Data Partner, open Advertiser Settings, navigate to Linked Accounts, and then enable “Segment DMP”. 

Segment is disabling all existing Personas Display and Video 360 destinations. You can still access your existing configuration, but please refrain from enabling the destination, as it is set to be deprecated. You will no longer be able to create new instances of Personas Display and Video 360.

<img width="799" alt="image" src="https://github.com/segmentio/segment-docs/assets/89420099/37022665-a39e-4696-a23a-97bcafd9cecf">


## Consent mode
[Consent mode](https://support.google.com/analytics/answer/9976101?hl=en){:target="_blank"} is a feature provided by Google in the context of its products, particularly the Gtag library and Google Analytics. As of March 6, 2024, Google announced that consent mode must function for European Economic Area (EEA) users, otherwise data from EEA users won't process. 

Consent mode in the Gtag library and Google Analytics is designed to help website owners comply with privacy regulations, such as the General Data Protection Regulation (GDPR) in the European Union. It allows website owners to adjust how these tools use and collect data based on user consent.

With consent mode, you can configure your website to dynamically adjust the tracking behavior of the Gtag library and Google Analytics based on the user's consent status. If a user provides consent to data processing, both the Gtag library and Google Analytics can collect and use that data for analysis. If a user doesn't provide consent, both tools limit data collection to essential functions, helping businesses respect user privacy preferences.

Segment automatically sends consent as `TRUE` for this destination.  Segment uses the [bulk-uploader workflow](https://developers.google.com/authorized-buyers/rtb/bulk-uploader#workflow){:target="_blank"} which requires consented data. Ensure all audiences and journeys are connected to consented audiences.  

{% include components/actions-fields.html %}

## FAQ
### What is Segment's relationship with Google DV360 and is the data that Segment sends considered to be First or Third party?

Google considers Segment to be a DMP or Data Onboarder. Audience information pushed from Segment to your DV360 account is considered to be **First-Party** data.


### When will my data appear in DV360?

When you complete the connection between Segment and DV360, it can take from 24 to 48 hours for Google to create the user list. This must complete before Segment can begin to sync users into that list.


### What identifiers are needed to enable this integration?

Google's [documentation](https://developers.google.com/authorized-buyers/rtb/downloads/cookie-bulk-upload-proto){:target="_blank"} provides information about the accepted identifiers for this integration.


- To use DV360 with web traffic, you must collect `anonymous_id` through the client-side `analytics.js` source.
- To use DV360 with mobile traffic, you must collect  `IDFA`s through Segment's mobile sources.


### Why is my audience in DV360 smaller than the audience that I see in Engage? What affects match rates?

Match rates may differ between Engage and DV360 for the following reasons:

#### Go-forward data

When you first preview and create an audience in Engage, the audience may contain many audience members. This is more likely if you select the **Historical Backfill** option. This does not reflect the audience that syncs to DV360 for the following reasons:


1. During an audience sync, Segment sends a list of `anon_id` values to Google. Google attempts to match those values in their match table, to find an associated `google_user_id`.
2. To complete this lookup, Google must have both the `anon_id` and have it store along side a matched `google_user_id`. This occurs when a user visits your website with both the Doubleclick Floodlight tag installed, and the DV360 integration completed.

As a result, you must have Doubleclick Floodlight and the DV360 integration in place before Google can match users and make them available for retargeting.

To help reduce the difference between Engage and DV360 audience sizes, Segment recommends that you deselect the `Historical Backfill` option when you create the audience that syncs to DV360.

#### Impact to third-party cookies: browser policies

The DV360 integration for web traffic relies on Doubleclick Floodlight, which itself relies on a `google_user_id` cookie. While this cookie is “yours”, browsers treat this as a third-party cookie because it is served from Google's servers, and not the same domain as your website. As browsers become more privacy-oriented, they block third-party cookies by default.

Users who visit your website in Firefox and Safari, and who do not specifically allow third-party cookies, are not identifiable by Doubleclick Floodlight (`google_user_id`). This prevents Google from identifying a match between an `anon_id` sent from Segment, and results in lower match rates.

#### Impact to third-party cookies: adblockers

All browser-based adblocking software intentionally blocks most third-party cookies, including the Doubleclick Floodlight cookie necessary for identification. As a result, Google cannot match users who employ adblocking software in their browsers.

#### IDFA impact: recent Apple announcements

Apple has announced an updated privacy policy that, while not rolled out yet, impacts the way businesses collect IDFA data. When enacted, this privacy policy will significantly reduce the percentage of users for which IDFA data is collected. This change will result in lower match rates, as both Segment and Google will see a decline in the number of IDFA values sent by Segment, and matched by Google.

#### Invalid Google IDs

Sometimes, Google denies IDFA or `google_user_id` values when they consider them to be invalid or inactive.

#### Modifying list configuration in DV360

Any changes to a DV360 list's configuration (for example, modifying the membership expiration from 540 days to a value that matches the time window on the audience) is **very risky** and **will likely** cause mismatches between Engage audiences and the lists in Google. Segment ensures that the integration works successfully only if there are no changes made to the configurations in DV360. DV360 lists are created with parameters that are known to be compatible with Engage. Configurations that differ from Segment's can cause mismatches by removing more users than intended, or by not accepting valid uploads.


### Why is the audience size larger in DV360 than in Engage?

Engage syncs every IDFA or `anonymous_id` value for each user in an audience. When DV360 receives this data, it does not de-duplicate in the event that multiple identifiers map to the same unique user. This may result in a larger audience list in Google compared to Engage.


### Why don't I see matches in DV360?

The most common cause of matches not appearing in DV360 is an error with Doubleclick Floodlight. From the website where tracking is enabled, open the Network inspector, and confirm that outgoing requests to `idsync.segment.com` appear.


### How does third-party cookie eradication impact the DV360 Destination?

Google Chrome has committed to replacing third-party cookies with an alternative, but has not announced a timeframe for that alternative. Segment will not update this integration until these updates from Google are announced.


### Can I use Engage audiences to target YouTube ads with this integration?

No. YouTube (through DV360) does not support the type of lists that Segment provides.

### Why do I see destination settings after I add my audience, but not when I first enable the destination?

The DV360 Destination works on a per-audience basis. This enables you to:

- Send data from different audiences to different DV360 accounts.
- Send data to Google Ad Manager with the same destination.
