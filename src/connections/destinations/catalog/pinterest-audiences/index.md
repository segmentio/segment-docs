---
title: 'Pinterest Audiences Destination'
id: 5f3ada4acea48a461353d5af
---
> warning "Migration of Pinterest Marketing API from v4 to v5"
> Pinterest has upgraded their Marketing API from v4 to v5 and are sunsetting their v4 API on **June 30, 2023**. To keep your account up-to-date and keep data flowing into Pinterest without interruption, please manually re-authenticate each instance of the Pinterest Audiences destination in your Segment workspace before June 30. This is the only required step for Segment customers sending data to Pinterest through the Pinterest Audiences destination. You can read more about the Pinterest v4 end of life in [Pinterest’s documentation](https://developers.pinterest.com/docs/getting-started/migration/){:target="_blank"}.



Pinterest Ads provides a way to target advertisements on Pinterest to a global audience. Segment's Pinterest Audiences integration allows Engage customers to sync audiences from Engage to Pinterest for better retargeting and higher-performing ads.

For more information about advertising with Pinterest, see:
- [Pinterest Developers](https://developers.pinterest.com/docs/widgets/getting-started/?){:target="_blank"}
- [Pinterest for Business](https://business.pinterest.com/){:target="_blank"}

## Details

**Requirements**
- Engage enabled with an existing Space
- A Pinterest Ads account with the `owner`, `admin`, or `audience_manager` role

**Supported identifiers**
- Email
- iOS IDFA
- Android ID

> warning ""
> **Note**: The Segment iOS SDK version 4.0 and up does not collect automatically collect IDFA. For more information, see the [iOS 14 Guide](/docs/connections/sources/catalog/libraries/mobile/ios/ios14-guide/).

**Connection type**
- Server-side

## Set up

The Pinterest Audiences destination syncs data from Engage to Pinterest Ads. To begin:

1. In your Segment workspace, click Engage in the left navigation bar, and select your Space.
2. Click **Engage Settings** and select the **Destinations** tab.
3. Click **Add Destination**.
4. Search for `Pinterest Audiences` and click Configure Pinterest Audiences.
5. Confirm the Source. The default value is the source connected to the Space to which you're adding the destination.
6. On the Pinterest Audiences configuration screen, click Connect to Pinterest Audiences. Log in to Pinterest with an account that has access to the Pinterest Ads dashboard. Once authenticated, confirm the connection to Segment.
7. Select the Pinterest Ad account that will receive audience data. This account may be your personal Pinterest account, but it must have an ad account attached. After you select the account, the destination is active.
8. Add the Pinterest Audiences destination to an existing Engage Audience.
    1. Navigate to the Space that contains the audience, and select it from the Audiences tab.
    2. Click Add Destination.
    3. The configured Pinterest Audiences destination should appear in the Send as User List category of available destinations.
    4. Select the destination, and click Add Destination.

The initial synchronization of audience data may take several hours, depending on the size of the audience. Once the initial sync occurs, you'll see a new audience in the Pinterest Audiences dashboard.

## FAQ

### What does the audience size represent?
The audience size represented in Pinterest is the final count of matched users between your customer profiles in Segment and Pinterest users. This number denotes your targetable audience size within Pinterest.

The initial synchronization of audience data may take several hours, depending on the size of the audience. Once the initial sync occurs, you'll see a new Audience in the Pinterest Audiences dashboard.

### Are lists/audiences processed on some interval, or on customer list update? Do we need to wait 24-48 hours every time we add/remove identifiers from a list?
Processing happens regularly and automatically throughout the day - but can take up to 24 hours.

You do not need to wait to continue sending data; however, any campaigns using those audiences will not see the changes until after processing (they'll continue running against whatever users have already been matched).
