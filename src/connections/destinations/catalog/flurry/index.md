---
title: Flurry Destination
rewrite: true
id: 54521fd625e721e32a72eeb1
---
[Flurry](https://developer.yahoo.com/flurry/docs/) provides you with the tools and resources you need to gain a deep level of understanding about your users' behavior in your apps.

Our Flurry destination code is open sourced on GitHub. Feel free to check it out: [iOS](https://github.com/segment-integrations/analytics-ios-integration-flurry), [Android](https://github.com/segment-integrations/analytics-android-integration-flurry).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Flurry" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Flurry "API Key" in Segment's Settings UI. You can retrieve this from your **Flurry Admin > Apps > API Key**. It should look like "4KKKGS3BAK4WW8WJ93DN".
4. Follow the instructions in the GitHub repos: [iOS SDK](https://github.com/segment-integrations/analytics-ios-integration-flurry) and [Android SDK](https://github.com/segment-integrations/analytics-android-integration-flurry).
5. Once the Segment library is integrated with your app, toggle Flurry on in your Segment UI.

_Note: Flurry does not always display data in real time. We've seen that it can take anywhere from a few hours to a few days for certain types of data to sync with Flurry._

### React Native set up

{% include content/react-dest.md %}

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does.

An example iOS call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

An example Android call would look like:

```java
Analytics.with(context).screen("Feed");
```

_Note: When you toggle the Screen Tracks As Events option on in your Flurry Segment UI - we will treat `screen` calls as events when sending them to Flurry._

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does.

An example iOS call would look like:

```objc
[[SEGAnalytics sharedAnalytics] identify:@"f4ca124298", traits: @{
    @"age" : @"23",
    @"gender" : @"Male"
}];
```

An example Android call would look like:

```java
Analytics.with(context).identify("f4ca124298", new Traits().putAge("23").putGender("Male"));
```

When you call [`identify`](/docs/connections/spec/identify/), we'll set the user ID in Flurry, and set any special Flurry `traits` you provide, such as `gender`, or `age`.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does.

An example iOS call would look like:

```objc
[[SEGAnalytics sharedAnalytics] track:@"Item Purchased"
                           properties:@{ @"item": @"Sword of Heracles", @"revenue": @2.95 }];
```

An example Android call would look like:

```java
Analytics.with(context).track("Signed up", new Properties().putValue("plan", "Enterprise"));
```
