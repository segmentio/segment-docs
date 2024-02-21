---
title: Analytics for Kotlin FAQ
strat: kotlin-android
---

## What is the latest version of the library?

Analytics-Android is published to [Maven Central](https://central.sonatype.com/namespace/com.segment.analytics.kotlin) where you can see all published releases.

## Where is the changelog for the library?

You can see a changelog in the [GitHub repository](https://github.com/segmentio/analytics-kotlin/releases), detailing the changes made in each release.

## Can I use the library with Maven?

Yes. You can use the Segment library with Maven, or any other custom build system because the `core` SDK is simply a JAR.

```
    <dependency>
        <groupId>com.segment.analytics.kotlin</groupId>
        <artifactId>android</artifactId>
        <version>1.10.1</version>
    </dependency>
```

## How big is the Segment SDK?

The core Segment SDK is extremely lightweight. The JAR weighs in at 12.3KB.

## How should I configure Proguard?

For the Segment SDKs, you can add the following snippet to your Proguard configuration:
```
    - keep class com.segment.analytics.** { *; }
    - keep class androidx.lifecycle.DefaultLifecycleObserver
```

You should also check the vendor documentation for any Device-mode destinations you are bundling, to see if they include any recommended Proguard configurations.

## Do you support Phonegap or Cordova?

Yes. You can use Segment’s browserify’d [analytics-node](https://github.com/segmentio/analytics-node) package just like any other client-side JavaScript library.

## Can I use the library in Java?

Yes. Please refer to the [Java Compatibility](https://github.com/segmentio/analytics-kotlin/blob/main/JAVA_COMPAT.md) doc for sample usages.

## My app crashes with NoClassDefFoundError Failed resolution of: Ljava/time/Instant

If you're on a version prior to `1.10.4`, the SDK internally uses a number of Java 8 language APIs through desugaring (see [Java 8+ API](https://developer.android.com/studio/write/java8-support#library-desugaring) desugaring support). Please make sure your project either uses Android Gradle plugin 4.0.0 or higher, has a minimum API level of 26, or is upgraded to the latest SDK.


## My deeplinks are not tracked?


While Analytics Kotlin will automatically track deep links that open your app when the `trackDeepLinks` Configuration property is set to `true`. There are some situations when the app is already open that could cause a deep link open event to be missed.

The `openUrl` function allows you to manually track that a deep link has opened your app while your app was already open:


    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
    
        // Add a deep-link opened event manually.
        // This is necessary when your Activity has a android:launchMode of
        // 'singleInstance', 'singleInstancePerTask', 'singleTop', or any other mode
        // that will re-use an existing Activity instead of creating a new instance.
        // The Analytics SDK automatically identifies when you app is started from 
        // a deep link if the Activity is created, but not if it is re-used. Therefore 
        // we have to add this code to manually capture the Deep Link info.
        
        val referrer = "unknown" 
        analytics.trackDeepLinkOpen(referrer, intent)
    }

Note: Due to the way deep links are handled in Android, we can not know the referrer when a deep link causes `onNewIntent()` to be fired instead of `onCreate()`. 

For a sample implementation see our [Kotlin Sample App](https://github.com/segmentio/analytics-kotlin/tree/main/samples/kotlin-android-app).

## Will I still see device-mode integrations listed as `false` in the integrations object?
When you successfully package a plugin in device-mode, you will no longer see the integration listed as `false` in the integrations object for a Segment event. This logic is now packaged in the event metadata, and is not surfaced in the Segment debugger.

## What is the instanceId set in context?
The instanceId was introduced in [V 1.10.1](https://github.com/segmentio/analytics-kotlin/releases/tag/1.10.1){:target="_blank"} and correlates events to a particular instance of the client in a scenario when you might have multiple instances on a single app.
