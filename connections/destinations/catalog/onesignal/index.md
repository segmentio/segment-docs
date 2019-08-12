---
title: OneSignal
---
## Getting Started

After integrating Segment with your app, enable OneSignal in your Segment destinations. Use your OneSignal App ID to enable the destination. This ID can be found on the settings page for your app on the OneSignal dashboard.

OneSignal will only track new users. If you have existing push notification data in another service, please get in touch with us to transfer it over: support@onesignal.com

OneSignal supports the `identify` and `track` methods and is currently only available on iOS via Segment.

- - -

## Identify & Track

Both Identify and Track have identical behavior for the OneSignal destination.

OneSignal will store the following data fields about a user:

- `App Version`
- `Device Type`
- `Device Model`
- `Device OS Version`
- `Push Notification Token` (If available)
- `Advertising ID` (If available)
- `Identifier For Vendor` (iOS Only)
- `Timezone`

OneSignal will also assign the following custom tags based on user attributes or traits, when available:

- `Segment user ID`
- `Segment Group ID`
- `Age`
- `Avatar`
- `Birthday`
- `Description`
- `Email`
- `Name`
- `FirstName`
- `LastName`
- `Gender`
- `Phone`
- `Title`
- `Username`
- `Website`

All of the above values can be used to deliver and schedule notifications to your users from the OneSignal dashboard.
