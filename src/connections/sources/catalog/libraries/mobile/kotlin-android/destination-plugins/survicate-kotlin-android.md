---
title: Analytics Kotlin Survicate Plugin
strat: kotlin-android
---

[Survicate](https://survicate.com/){:target="_blank"} is an all-in-one customer feedback platform that helps you collect and act on feedback from your customers. With Survicate, you can better understand your customers and improve their experience with your product or service.

Add Survicate device mode support to your applications using [this plugin](https://github.com/segmentio/analytics-kotlin){:target="_blank"} for Analytics-Kotlin.

## Getting started

To get started, you need to provide a Survicate workspace key.

You can do this in two ways:

1. Add the key in the Segment panel. Navigate to **Connections > Destinations** and locate your Android app destination. Click **Settings**, then enter the key inside the Connection Settings as a "Workspace Key".

2. Alternatively, you can add your Survicate workspace key as metadata inside AndroidManifest:

   ```xml
   <application
       android:name=".MyApp"
   >
       <!-- ... -->
       <meta-data android:name="com.survicate.surveys.workspaceKey" android:value="YOUR_WORKSPACE_KEY"/>
   </application>
   ```

## Adding the dependency

To define the Maven repository:

```
allprojects {
    repositories {
        // ...
        maven { url 'https://repo.survicate.com' }
    }
}
```

Add the dependency to your app's build.gradle file:
```
dependencies {
    // ...
    implementation 'com.survicate:survicate-segment-analytics-kotlin:<latest_version>'
}
```

You can find the current version in the [plugin repository](https://github.com/Survicate/analytics-kotlin-survicate){:target="_blank"}.

## Using the plugin in your app
In order to activate the Survicate plugin, you have to add a `SurvicateDestination` to the Analytics instance.

```kotlin
analytics = Analytics(segmentKey, applicationContext) {  
  // ...
}
analytics.add(SurvicateDestination(applicationContext))
```

Only keep one instance of the `Analytics` (for example, initialize it inside the application's `onCreate` method). This is important because the Survicate SDK underneath can only be initialized once.

Now you can use the Analytics, having the events mapped to the Survicate SDK as described below.

#### Identify

In the SurvicateDestination plugin, the Identify method from Segment is transferred to the `setUserTraits` method of Survicate. You can provide multiple key-value pairs. The `userId` argument of `Analytics.identify` is also set as a user trait with the key "user_id".

#### Track

The Track method from Segment is used as the `invokeEvent` method in Survicate. This means that when you track an event in Segment, it will be invoked in Survicate.

#### Screen

Similarly, the Screen method from Segment is used as the `enterScreen` method in Survicate. This means that when you track a screen in Segment, it will be entered in Survicate.

#### Reset

The Reset method from Segment is used as the reset method in Survicate. This means that when you reset the Segment client, the Survicate client is also reset.
