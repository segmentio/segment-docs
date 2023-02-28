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
![Duplicate](https://segment.com/docs/images/duplicate.svg)
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

The SDK internally uses a number of Java 8 language API through desugaring (see [Java 8+ API](https://developer.android.com/studio/write/java8-support#library-desugaring) desugaring support). Please make sure your project:

- either uses Android Gradle plugin 4.0.0 or higher
- or requires a minimum API level of 26.

## My deeplinks are not tracked?