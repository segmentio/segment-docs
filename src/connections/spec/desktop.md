---
title: 'Desktop Spec'
---

One of the core components of the Segment [Spec](/docs/connections/spec/) is the [`track`](/docs/connections/spec/track) method. It records any arbitrary event that the user has triggered. For desktop tracking, in addition to `screen` calls, send **specific event names** that Segment recognizes semantically. That way, Segment can transform them correctly before sending them off to downstream destinations.

By standardizing the events that comprise the **desktop application lifecycle** and associated **desktop campaign and referral events**, Segment and its partners can, wherever possible, automatically collect and forward these events on your behalf and build downstream destinations which take full advantage of the semantic meaning associated with these events and their properties.

> info ""
>  If you're already collecting similar events, Segment recommends migrating to these event names so that you can take advantage of available features in Segment's destinations which depend on the spec as they become available.

> warning ""
>  Per the [Privacy Policy](https://segment.com/legal/privacy/#sensitive-personal-information) and applicable terms, don't send Segment sensitive personal information about your users. Certain features from Segment and partners allow you to opt-in to automatically track data (for example: Application Installed or Deep Link Clicked). When working with these features and Segment in general, be mindful of the data that is tracked to ensure it's matching both your obligations under your agreement with Segment and the privacy expectations of your users.

## Overview of Events

The Segment Desktop Spec includes the following semantic events:

**Application Lifecycle Events**
- [Application Installed](#application-installed)
- [Application Opened](#application-opened)
- [Application Updated](#application-updated)
- [Application Backgrounded](#application-backgrounded)
- [Application Hidden](#application-hidden)
- [Application Unhidden](#application-unhidden)
- [Application Terminated](#application-terminated)

**Campaign Events**
- [Push Notification Received](#push-notification-received)
- [Push Notification Tapped](#push-notification-tapped)
- [Push Notification Bounced](#push-notification-bounced)
- [Install Attributed](#install-attributed)
- [Deep Link Clicked](#deep-link-clicked)
- [Deep Link Opened](#deep-link-opened)


Segment recommends you to use the above event names if you're going to be integrating the events yourself. This ensures that they can be mapped effectively in downstream tools.

## Lifecycle Events

Desktop applications live within a fairly bounded lifecycle. In order to understand and communicate effectively with your users, it's crucial to instrument the core flows associated with installing and opening your app. The following events, many of which Segment can capture automatically in the latest versions of Segment's SDKs, allow you to get a picture of top-line metrics like DAUs, MAUs, Screen Views per session.

These events track automatically when you enable lifecycle events:

- [Application Installed](#application-installed)
- [Application Opened](#application-opened)
- [Application Updated](#application-updated)

### Application Installed

This event fires when a user **first** opens your desktop application. If the user never opens the app after installing, Segment won't be able to collect this event. This event doesn't wait for attribution or campaign information to be received, and is collected automatically by Segment's SDKs. Advertising providers like Facebook and Google require discrete install events to correctly attribute installs to ads served through their platform.

{% comment %} api-example '{ "userId": "019mr8mf4r", "type": "track", "event": "Application Installed", "properties": { "version": "1.2.3", "build": "1234" }}'}}} {% endcomment %}


```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Application Installed",
  "properties": {
    "version": "1.2.3", "build": "1234"
  }
}
```

| **Property** | **Type** | **Description**                        |
| ------------ | -------- | -------------------------------------- |
| `version`    | String   | The version installed.                 |
| `build`      | String   | The build number of the installed app. |


### Application Opened

This event fires when a user launches or foregrounds your desktop application after the first open. It fires after the `Application Installed` event and again after the app is re-opened after being closed. This event doesn't wait for attribution information to be received but may include information about referring applications or deep link URLs if available to the application upon open.

{% comment %} api-example '{"userId": "019mr8mf4r", "type": "track", "event": "Application Opened", "properties": { "from_background": false, "referring_application": "GMail", "url": "url://location" }}'}}} {% endcomment %}

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Application Opened",
  "properties": {
    "from_background": false,
    "referring_application": "GMail",
    "url": "url://location"
  }
}
```

| **Property**            | **Type** | **Description**                                                                                                                                                                                                                                                                     |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from_background`       | Boolean  | If the application [transitioned](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/#//apple_ref/doc/uid/TP40006786-CH3-SW52) from "Background" to the "Inactive" state prior to foregrounding (as opposed to from "Not Running" state). |
| `url`                   | String   | The value of `UIApplicationLaunchOptionsURLKey` from `launchOptions`.**Collected on iOS only**.                                                                                                                                                                                     |
| `referring_application` | String   | The value of `UIApplicationLaunchOptionsSourceApplicationKey` from `launchOptions`. **Automatically collected on iOS only**.                                                                                                                                                        |
| `version`               | String   | The version installed.                                                                                                                                                                                                                                                              |
| `build`                 | String   | The build number of the installed app.                                                                                                                                                                                                                                              |


### Application Backgrounded

You should send this event when a user backgrounds the application upon [`applicationDidEnterBackground`](https://developer.apple.com/reference/uikit/uiapplicationdelegate/1622997-applicationdidenterbackground).

{% comment %} api-example '{ "userId": "019mr8mf4r", "type": "track", "event": "Application Backgrounded", "properties": {}}'}}} {% endcomment %}

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Application Backgrounded",
  "properties": {}
}
```

### Application Updated

This event fires when a user updates the application. Segment's SDK automatically collects this event in lieu of an "Application Opened" event when it's determined that the Open is first since an update.

{% comment %} api-example '{ "userId": "019mr8mf4r", "type": "track", "event": "Application Updated", "properties": { "previous_version": "1.1.2", "previous_build": 1234, "version": "1.2.0", "build": "1456" }}'}}} {% endcomment %}

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Application Updated",
  "properties": {
    "previous_version": "1.1.2",
    "previous_build": "1234",
    "version": "1.2.0",
    "build": "1456"
  }
}
```

| **Property**       | **Type** | **Description**                  |
| ------------------ | -------- | -------------------------------- |
| `previous_version` | String   | The previously recorded version. |
| `previous_build`   | String   | The previously recorded build.   |
| `version`          | String   | The new version.                 |
| `build`            | String   | The new build.                   |


### Application Hidden
This event fires when a user decides to hide their desktop application.

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Application Hidden",
  "properties": {}
}
```

### Application Unhidden
This event fires when a user unhides their hidden desktop application.

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Application Unhidden",
  "properties": {
    "build": "1",
    "from_background": true,
    "version": "1.0"
  }
}
```

Property | Type | Description
-------- | ---- | -----------
`build` | String | The build number of the installed app.
`from_background` | Boolean | If application [transitioned](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/#//apple_ref/doc/uid/TP40006786-CH3-SW52) from "Background" to "Inactive" state prior to foregrounding (as opposed to from "Not Running" state).
`version` | String | The version installed.


### Application Terminated
This event fires when a user terminates their desktop application.

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Application Terminated",
  "properties": {}
}
```

## Campaign Events

As the walls between apps lower, capturing information about the content and campaigns that drive users to engage with your app is critical to building more targeted, relevant, personalized experiences for your users.

### Install Attributed

When Segment or an integrated partner discerns the source of an install, Segment collects an `Install Attributed` event. This event may be sent to Segment using server-to-server connection from your attribution provider, or directly on the device using packaged destinations. In either case, this happens **after** install, and doesn't apply to all installs, which is why it is a discrete event.

{% comment %} api-example '{ "userId": "019mr8mf4r", "type": "track", "event": "Install Attributed", "properties": { "provider": "Tune/Kochava/Branch/AppsFlyer", "campaign": { "source": "Network/FB/AdWords/MoPub/Source", "name": "Campaign Name", "content": "Organic Content Title", "ad_creative": "Red Hello World Ad", "ad_group": "Red Ones" }}}'}}} {% endcomment %}

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Install Attributed",
  "properties": {
    "provider": "Tune/Kochava/Branch/AppsFlyer",
    "campaign": {
      "source": "Network/FB/AdWords/MoPub/Source",
      "name": "Campaign Name",
      "content": "Organic Content Title",
      "ad_creative": "Red Hello World Ad",
      "ad_group": "Red Ones"
    }
  }
}
```

| **Property**            | **Type** | **Description**                         |
| ----------------------- | -------- | --------------------------------------- |
| `provider`              | String   | The attribution provider.               |
| `campaign[source]`      | String   | Campaign source — attributed ad network |
| `campaign[name]`        | String   | The name of the attributed campaign.    |
| `campaign[medium]`      | String   | Identifies what type of link was used.  |
| `campaign[content]`     | String   | The content of the campaign.            |
| `campaign[ad_creative]` | String   | The ad creative name.                   |
| `campaign[ad_group]`    | String   | The ad group name.                      |


### Push Notification Received

You can send this event when the app receives a push notification.

{% comment %} api-example '{ "userId": "019mr8mf4r", "type": "track", "event": "Push Notification Received", "properties": { "campaign": { "medium": "Push", "source": "Vendor Name", "name": "Referral Flow", "content": "Your friend invited you to play a match."}}}'}}} {% endcomment %}

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Push Notification Received",
  "properties": {
    "campaign": {
      "medium": "Push",
      "source": "Vendor Name",
      "name": "Referral Flow",
      "content": "Your friend invited you to play a match."
    }
  }
}
```

| **Property**        | **Type** | **Description**                                            |
| ------------------- | -------- | ---------------------------------------------------------- |
| `campaign[name]`    | String   | Campaign Name.                                             |
| `campaign[medium]`  | String   | Identifies what type of link was used (Push Notification). |
| `campaign[content]` | String   | Push notification content.                                 |
| `campaign[source]`  | String   | Designates the push provider. (Optional)                   |


### Push Notification Tapped

You can send this event when a user taps on a push notification associated with your app.

{% comment %} api-example '{ "userId": "019mr8mf4r", "type": "track", "event": "Push Notification Tapped", "properties": {"action": "Accept", "campaign": { "medium": "Push", "source": "Vendor Name", "name": "Referral Flow", "content": "Your friend invited you to play a match." }}}'}}} {% endcomment %}

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Push Notification Tapped",
  "properties": {
    "action": "Accept",
    "campaign": {
      "medium": "Push",
      "source": "Vendor Name",
      "name": "Referral Flow",
      "content": "Your friend invited you to play a match."
    }
  }
}
```


| **Property**        | **Type** | **Description**                                                                     |
| ------------------- | -------- | ----------------------------------------------------------------------------------- |
| `action`            | String   | If this notification is "actionable", the custom action tapped. **Default:** "Open" |
| `campaign[name]`    | String   | Campaign Name.                                                                      |
| `campaign[medium]`  | String   | Identifies what type of link was used (Push Notification).                          |
| `campaign[content]` | String   | Push notification content content                                                   |
| `campaign[source]`  | String   | Designates the push provider. (Optional)                                            |


### Push Notification Bounced

This event fires when a push notification from a provider bounces. If your push notification provider forwards push lifecycle events to Segment, they should include this event in their suite.

{% comment %} api-example '{ "userId": "019mr8mf4r", "type": "track", "event":"Push Notification Bounced", "properties": { "action": "Accept", "campaign": { "medium": "Push", "source": "Vendor Name", "name": "Referral Flow", "content": "Your friend invited you to play a match." }}}'}}} {% endcomment %}

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event":"Push Notification Bounced",
  "properties": {
    "action": "Accept",
    "campaign": {
      "medium": "Push",
      "source": "Vendor Name",
      "name": "Referral Flow",
      "content": "Your friend invited you to play a match."
    }
  }
}
```

| **Property**        | **Type** | **Description**                                                                     |
| ------------------- | -------- | ----------------------------------------------------------------------------------- |
| `action`            | String   | If this notification is "actionable", the custom action tapped. **Default:** "Open" |
| `campaign[name]`    | String   | The Campaign Name.                                                                      |
| `campaign[medium]`  | String   | This identifies what type of link was used (Push Notification).                          |
| `campaign[content]` | String   | The push notification content.                                                    |
| `campaign[source]`  | String   | Designates the push provider. (Optional)                                            |


### Deep Link Opened

When your application is opened using a referring link, Segment or your packaged deep link partner can fire this event on your behalf. If the deep link has additional data associated with it, either passed through the third party service or as `annotations` in `launchOption`, you may want to include those values as properties here as well.

This event is fired *in addition* to the associated `Application Opened` event.

{% comment %} api-example '{"userId": "019mr8mf4r", "type": "track", "event": "Deep Link Opened", "properties": {"provider": "Branch Metrics", "url": "app://landing" }}'}}} {% endcomment %}

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Deep Link Opened",
  "properties": {
    "provider": "Branch Metrics",
    "url": "app://landing"
  }
}
```

| **Property** | **Type** | **Description**         |
| ------------ | -------- | ----------------------- |
| `provider`   | String   | The deep link provider. |
| `url`        | String   | The App URL opened.     |


### Deep Link Clicked

This event may be provided by deep link providers postback mechanisms or an internal redirect service if you use one in order to provide a waypoint funnel step between your content or advertisement and the resulting app open.

{% comment %} api-example '{"userId": "019mr8mf4r", "type": "track", "event": "Deep Link Clicked", "properties": {"provider": "Branch Metrics", "url": "brnch.io/1234"}}'}}} {% endcomment %}

```json
{
  "userId": "019mr8mf4r",
  "type": "track",
  "event": "Deep Link Clicked",
  "properties": {
    "provider": "Branch Metrics",
    "url": "brnch.io/1234"
  }
}
```

| **Property** | **Type** | **Description**            |
| ------------ | -------- | -------------------------- |
| `provider`   | String   | The deep link provider.    |
| `url`        | String   | The deep link URL clicked. |
