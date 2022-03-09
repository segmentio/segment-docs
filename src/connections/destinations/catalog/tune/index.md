---
rewrite: true
title: TUNE Destination
id: 54521fd925e721e32a72eed7
---
[TUNE](https://www.tune.com/) helps attribute mobile app events to the advertisements that a customer interacted with. We take care of sending those mobile events to TUNE so that they can be reconciled with ad views. The attributed data can then be [routed](#postbacks) back into other tools that you have enabled in Segment.

This destination is maintained by TUNE. Their code is publicly available for [iOS](https://github.com/TuneOSS/segment-integration-ios) and [Android](https://github.com/TuneOSS/segment-integration-android). For any issues with the destination, [contact the TUNE Support team](https://help.tune.com/contact-support/).

## Getting Started

{% include content/connection-modes.md %}

1.  From your Segment UI's Destinations page click on "Add Destination".
2.  Search for "TUNE" in the Catalog, select it, and choose which of your sources to connect the destination to.
3.  Add your TUNE Advertiser ID in the Segment Settings UI from the TUNE Dashboard.
4.  In your TUNE account, ensure that you have created a new app by navigating to Applications > Apps > Add A New App.
5.  Depending on library you've installed, follow the additional steps below to finish setting up!

### iOS

When using our [iOS library](/docs/connections/sources/catalog/libraries/mobile/ios/), make sure you are using the AdSupport Framework. You can verify this by checking if `context.device.advertisingId` (formerly `context.device.idfa`) is getting set in your source's debugger (check raw format).

### Xamarin

#### Xamarin.iOS

For iOS apps built with Xamarin, you need to set the `context.device.advertisingId` field to the Apple advertising identifier, and the `context.device.adTrackingEnabled` boolean to indicate whether ad tracking is supported.

You can retrieve these values by adding the following directive to your `.cs` file:

```csharp
using MonoTouch.AdSupport;
```

And access the values as:

```csharp
ASIdentifierManager.SharedManager.AdvertisingIdentifier
ASIdentifierManager.SharedManager.IsAdvertisingTrackingEnabled
```

#### Xamarin.Android

For Android apps built with Xamarin, you first need to add the Google Play Services component through the Xamarin Component Store by navigating to Project > Get More Components.

You then need to set the `context.device.advertisingId` field to the Google Advertising ID.

```csharp
using Android.Gms.Ads.Identifier;
using Android.Gms.Common;
```

```csharp
AdvertisingIdClient.Info adInfo = AdvertisingIdClient.GetAdvertisingIdInfo(this.ApplicationContext);
```

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify({
  userId: '019mr8mf4r',
  traits: {
    name: 'Michael Bolton',
    email: 'mbolton@example.com',
    plan: 'Enterprise',
    friends: 42
  }
});
```

If your app has user accounts, you may want to identify these users when they login. This will appear in TUNE as a `Login` event.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track({
  "userId": "abcd9435db2d4b53c94fb4b688a63fab",
  "event": "Opened App"
  "properties": {},
  "context": {
    "device": {
      "manufacturer": "Apple",
      "model": "iPhone7,2",
      "idfv": "A3D261E4-DE0A-470B-9E4A-720F3D3D22E6",
      "type": "ios"
    },
    "os": {
      "name": "iPhone OS",
      "version": "8.1.1"
    },
    "app": {
      "name": "Test App",
      "namespace": "com.segment.testapp",
      "version": "2.1.1",
      "build": "2.1.1.4"
    },
    "library": {
      "name": "analytics-ios",
      "version": "1.6.11"
    },
    "locale": "en-US",
    "traits": {},
    "network": {
      "bluetooth": true,
      "carrier": "AT&T"
    },
    "ip": "70.128.91.158"
  }
})
```

You can track the effectiveness of a mobile ad campaign by tracking key conversion events. This destination recognizes six special events (listed below), as well as any custom events you wish to track.

### Server

When sending your data [server-side](/docs/connections/sources/#server), contextual fields `context.app.namespace` and `context.device.advertisingId` must be manually sent in all calls.

### Xamarin

When sending your data using our [Xamarin library](/docs/connections/sources/catalog/libraries/mobile/xamarin/), contextual fields `context.app.namespace` and the boolean `context.device.adTrackingEnabled` must be manually sent in all calls.

### Opened App

Install attribution is the most common use case for mobile attribution tools. To send this event to TUNE, send a track call from your mobile application when the app is opened with the event name `Opened App`. TUNE will take care of determining whether this is a first-time install, open, or update.


### Special Events

TUNE supports special events beyond install attribution which are mapped to the Segment [Ecommerce Spec](/docs/connections/spec/ecommerce/v2/):

| Segment Event             | TUNE Event         |
|---------------------------|--------------------|
| Product Viewed            | Content View       |
| Product Added             | Add to Cart        |
| Product Added to Wishlist | Add to Wishlist    |
| Checkout Step Viewed      | Checkout Initiated |
| Order Completed           | Purchase           |

If you send an event with a name not included in the list above, Segment will send it to TUNE as a generic conversion event. You can then assign those events to pre-defined event categories in TUNE.


## Postbacks

In addition to sending data to TUNE to be attributed, Segment allows you to route that data back into other tools that you have enabled. For example, you might want to use a particular analytics tool's dashboards to compare the different channels of your mobile ad campaign. To do this, enable postbacks in TUNE and provide them with your source write key.
