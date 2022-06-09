---
title: 'Pinterest Audiences Destination'
id: 5f3ada4acea48a461353d5af
---
Pinterest Ads provides a way to target advertisements on Pinterest to a global audience. Segment's Pinterest Audiences integration allows Segment Personas customers to sync audiences from Personas to Pinterest for better retargeting and higher-performing ads.

For more information about advertising with Pinterest, see:
- [Pinterest Developers](https://developers.pinterest.com/docs/widgets/getting-started/?)
- [Pinterest for Business](https://business.pinterest.com/)

## Details

**Requirements**
- Personas enabled with an existing Personas space
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

The Pinterest Audiences destination syncs data from Segment Personas to Pinterest Ads. To begin:

1. Navigate to the Destinations section of your Personas space, and click Add Destination.
2. Search for `Pinterest Audiences` and click Configure Pinterest Audiences.
3. Confirm the Source. The default value is the source connected to the Personas space to which you're adding the destination.
4. On the Pinterest Audiences configuration screen, click Connect to Pinterest Audiences. Log in to Pinterest with an account that has access to the Pinterest Ads dashboard. Once authenticated, confirm the connection to Segment.
5. Select the Pinterest Ad account that will receive audience data. This account may be your personal Pinterest account, but it must have an ad account attached. After you select the account, the destination is active.
6. Add the Pinterest Audiences destination to an existing Personas Audience.
    1. Navigate to the Personas space that contains the audience, and select it from the Audiences tab.
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
