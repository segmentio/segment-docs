---
title: 1Flow Mobile Plugin Destination
id: 64dd07c1fed86b6866cd93f5
beta: true
hidden: true
---

[1Flow](https://1flow.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a leading in-app user survey and messaging platform for Mobile app and SaaS businesses.

Using 1Flow, you can reach users _in-the-moment_ while they are interacting with your website or application, to collect highly contextual user insights that help you improve your product offering and customer experience

The 1Flow Mobile Plugin Destination is open-source and available on GitHub. You can view these repositories here:

- [iOS](https://github.com/1Flow-Inc/Segment1Flow.git){:target="_blank"} 
- [Android](https://github.com/1Flow-Inc/1flow-segment-tool.git){:target="_blank"}

This destination is maintained by 1Flow. For any issues with the destination, [contact Support team](mailto:support@1flow.app).

## Getting started

1. From the Segment web app, click **Catalog**, then search for **1Flow Mobile Plugin**.
2. Click **Add Destination**.
4. Select an existing Source to connect to 1Flow Mobile Plugin.
5. Go to 1flow.ai -> Settings -> Project Settings, copy the 1Flow project key, and paste it into the Destination Settings in Segment.
6. Depending on the mobile source you’ve selected, include 1Flow's library by adding the following lines to your dependency configuration.

## iOS

### Step 1: Add Segment1Flow Package using Swift Package Manager

In the Xcode File menu, click Add Packages. You'll see a dialog where you can search for Swift packages. In the search field, enter the URL to this repo.

https://github.com/1Flow-Inc/Segment1Flow

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to. Once you've made your selections, click the Add Package button.

### Step 2: Initialise Segment and Add 1Fow Destination

```
    let config = Configuration(writeKey: "YOUR_WRITE_KEY_HERE")
    let analytics = Analytics(configuration: config)
    analytics.add(plugin: OneFlowDestination())
```

## Android

### Step 1: Install 1Flow-Segment-Tool

- If gradle version is 6.5 or lower, include the below repository in your project's build.gradle file:

```
allprojects{
    repositories{
        google()
        jcenter()
        maven{url 'https://jitpack.io'} 
    }
}
```

- If gradle version is higher than 6.5, add the below code in settings.gradle.

```
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven{url 'https://jitpack.io'}
    }
}
```

- Add dependency in your app's build.gradle file:

```
compileSdkVersion 34
....
defaultConfig {
              ....
              minSdkVersion 21
    }
dependencies {
        ....
    implementation 'com.segment.analytics.android:analytics:4.11.3'
    implementation "com.github.1Flow-Inc:1flow-segment-tool:2023.09.14"
}
```

### Step 2: Initialize Segment and add 1Flow Destination
```
Analytics analytics = new Analytics.Builder(context, "YOUR_WRITE_KEY_HERE")
    .use(OneFlowIntegration.FACTORY)
    ...
   .build();
    ...
    Analytics.setSingletonInstance(analytics);

```

## Supported methods

### Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```swift
analytics.identify(userId: "peter@example.com", traits: [
    "name": "Peter Gibbons",
    "email": "peter@example.com",
    "mobile": 1234567890
])
```
When you call identify method of segment, it will be equivalent to `logUser` of 1Flow. `userId` will be `userID` and `traits` will be `userDetails`.

### Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```swift
analytics.track(name: "ButtonClicked")
```
Any value passed in `name`, will be eventName and if you have passed any event property, then it will be event `parameters`.

### Screen

Send [Screen](/docs/connections/spec/screen) calls to record which mobile app screens users have viewed. For example:

```swift
analytics.screen(title: "Home")
```

Segment sends Screen calls to 1Flow as a `screen_[name]` event (or `screen_view` if a screen name isn't provided).
