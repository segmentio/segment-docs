---
title: Castle Destination
id: 56a8f566e954a874ca44d3b0
---
[Castle](https://castle.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} monitors every step of the customer journey to help visualize and proactively block fraud that would otherwise fly under the radar. Types of fraud or abuse that can be managed include bots, fake accounts, multi-accounting, and account sharing.

The Castle destination source code is available on GitHub. Source code for the following integrations are available:

- [iOS](https://github.com/castle/analytics-ios-integration-castle){:target="_blank"}
- [Android](https://github.com/castle/analytics-kotlin-integration-castle){:target="_blank"}
- [Web](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/castle){:target="_blank"}

Castle maintains this destination. For any issues with the destination, contact the [Castle support team](mailto:support@castle.io).

## Getting Started

1. Navigate to **Connections > Catalog** in the Segment web app.
2. Search for *Castle* in the **Destinations** tab of the catalog, and select it, and click **Configure Castle**. 
3. Choose the sources you want to connect the destination to.
3. Enter the "Publishable Key" the Publishable Key field. Find the Publishable Key on the Castle dashboard.
Calls are now visible in Castle dashboards in real-time.

> info ""
> Castle ingests Segment Client-side events. Server-side events are dropped and not processed.
> Castle supports web, Android and iOS integrations through Segment.

### iOS

1. Add the Castle Segment dependency

	- With Xcode:

      In the Xcode **File** menu, click **Add Packages**. In the resulting dialog dialog where you can search for Swift packages. In the search field, enter the URL to this repository: `https://github.com/castle/analytics-ios-integration-castle`


      You can optionally pin the package to a specific branch or version, and select the project in your workspace to which you'll add the package. When you're done, click **Add Package**. 
	
	- With Package.swift:

      ```
      .package(
          name: "SegmentCastle",
          url: "https://github.com/castle/analytics-ios-integration-castle",
          from: "1.0.0"
      ),
      ```
    
2. Next, add the Castle destination to your analytics instance:

	```swift
	let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR_WRITE_KEY_HERE>"))
	
    let castleDestination = CastleDestination(userJwt: "<USER_JWT>")
    analytics.add(plugin: castleDestination)
  ```
  
### Android

1. You can add the Castle Segment dependency two ways:

	- Add this line to your gradle file:

      ```
      implementation 'com.segment.analytics.kotlin.destinations:castle:<latest_version>'
      ```

	- Add the following for Kotlin DSL:
    
      ```
      implementation("com.segment.analytics.kotlin.destinations:castle:<latest_version>")
      ```

2. Next, add the Castle destination to your analytics instance:

	```kotlin
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext)
    analytics.add(plugin = CastleDestination(userJwt = "<USER_JWT>"))
  ```
  

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page call](/docs/connections/spec/page/) does. An example call looks like:

```
analytics.page()
```

Segment sends Page calls to Castle as `$page` events.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call looks like:

```
analytics.track('Added to Cart')
```



Segment sends Track calls to Castle as a `$custom` events.

***



## Secure Mode

Send user information as a signed JWT when you use Castle in production. This prevents bad actors from spoofing any user information.

In your backend code, encode the user as a JWT and sign it using your Castle "API Secret". When Castle receives the JWT, the integrity of the user data is verified to ensure that the data wasn't tampered with.

Below is an example of how to generate a JWT on your backend using the Ruby language:

```ruby
jwt_from_backend = JWT.encode({
  id: '97980cfea0067',
  email: 'peter@example.com'
}, ENV.fetch('CASTLE_API_SECRET'), 'HS256')
```



Transfer the `user_jwt` object to your frontend through a separate API call, or by injecting the code using a templating language:

```javascript
var userJwt = "<%= jwt_from_backend %>";

// Then use the `userJwt` argument instead of `user` when using any of the tracking methods
Castle.page({userJwt: userJwt});

analytics.identify('97980cfea0067', {
  email: 'peter@example.com',
}, {
  Castle: {
    userJwt: userJwt
  }
});
```


When Castle receives a JWT version of the user object, its contents override the user object sent the standard Segment way.
