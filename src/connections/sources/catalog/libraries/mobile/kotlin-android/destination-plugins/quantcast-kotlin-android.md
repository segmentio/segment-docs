---
title: Analytics Kotlin Optimizely Full Stack Plugin
strat: kotlin-android
---

## Adding the dependency
To install the Segment-Quantcast integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:quantcast:<latest_version>'
```

Or the following for Kotlin DSL

```
implementation('com.segment.analytics.kotlin.destinations:quantcast:<latest_version>')
```

At this time Quantcast's library is hosted in JCenter, which is deprecated. In order to satisfy the Quantcast library dependency, you may have to add the following to the repositories setup in your project's gradle files:
```
 repositories {
        gradlePluginPortal()
    }
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library. Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.quantcast.QuantcastDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = QuantcastDestination())
```

Your events will now begin to flow to Quantcast in device mode.