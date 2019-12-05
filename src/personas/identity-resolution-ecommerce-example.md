---
title: Identity Resolution eCommerce Example
---
The Personas Identity Resolution feature helps to create a unified view of the user across devices, apps, and unique identifiers.

Let's take the example of a sneaker company called SegmentKicks which has an eCommerce app called SegKicks as well as a running app called SegRuns. We'll follow Jane Doe throughout her entire customer journey from an anonymous user to a registered buyer on one app, SegKicks, to her use of the same app on a different device, and finally to her use of a different app belonging to the same company, SegRuns.  

## Anonymous to Known Identification
Identity Resolution can connect a user's anonymous behaviors to a user's post-account registration activity.

Let's take the following example using the eCommerce app, SegKicks:
1. Jane Doe downloads the app on her iPhone but does not yet register for an account.
``` js
{
  "anonymousId": "anon_123",
  "context": {
    "app": "SegKicks",
    "device": {
      "id": "ios_abc123",
      "type": "ios"
    },
  },
  "event": "App Opened",
  "type": "track"
}
```

2. She then clicks on a few different types of shoes, ShoeA, ShoeB and ShoeC but does not add to them cart. Because she has not yet registered for an account, all of these events will be sent through with an anonymousID and an ios deviceID.  
``` js
{
  "anonymousId": "anon_123",
  "context": {
    "app": "SegKicks",
    "device": {
      "id": "ios_abc123",
      "type": "ios"
    },
  },
  "event": "ShoeA Clicked",
  "type": "track"
}
```

3. She then decides to add ShoeD to her cart. Upon checkout, she creates a new user profile with her email and purchases the shoe. At the point of account creation she is assigned a userID and the events of her purchase are sent through with an email.

``` js
{
  "anonymousId": "anon_123",
  "context": {
    "app": "SegKicks",
    "device": {
      "id": "ios_abc123",
      "type": "ios"
    },
  },  
  "userId": "abc123def",
  "type": "identify"
}
```
By linking the original anonymous events to the her logged-in activity, the app's marketing team can now begin to map out her customer journey on a single app, understand her preferences and retarget her with highly personalized emails about the shoes she didn't complete purchasing.

Her identifiers will now contain the original anonymous_id, her email and her user_id:
![](images/jane_doe_new_identities.png)

## Cross-Device Identification
Users can have multiple touch points with an app ecosystem through more than one device. For example, users might interact with an eCommerce app through both a native app, a mobile browser and a web browser.

Let’s continue with the example of Jane Doe. She now views the same mobile app SegKicks on her Android phone as well.

Jane Doe logs into the Android phone with the same email janedoe@gmail.com.

```js
{
  "anonymousId": "anon_456",
  "context": {
    "app": "SegKicks",
    "device": {
      "id": "and_1a2b3c4d",
      "type": "android"
    },
  },
  "type": "identify",
  "userId": "abc123def"
}
```

Her new User Profile identities will now also contain android.id:
![](images/jane_doe_new_android_identities.png)

## Cross-App Identification
A company’s product ecosystem may also spread out across multiple apps. For example, SegmentKicks also has a running app SegRuns.

Now let’s view what happens when Jane Doe downloads the Android app SegRuns and views a workout:

```js
{
  "anonymousId": "anon_789",
  "context": {
    "app": "SegRuns",
    "device": {
      "id": "and_1a2b3c4d",
      "type": "android"
    },
  },
  "type": "identify",
  "userId": "abc123def"
}
```

Her final identifiers now have a new anonymous_id from the SegRuns app:
![](images/jane_doe_final_new_identities.png)
