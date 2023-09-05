---
title: Analytics for Kotlin Migration Guide
strat: kotlin-android
tags:
  - android
  - kotlin
  - android-kotlin
---

> success ""
> This guide assumes you already have an Analytics-Android Source in your Segment workspace. If you are creating a new one you can reference the [Source Overview Guide](/docs/connections/sources/mobile/kotlin)

If you're using a previous Segment mobile library such as Analytics-Android, follow these steps to migrate to the Analytics-Kotlin library. Analytics-Kotlin is designed to work with your Java codebase as well.:

1. [Import Analytics-Kotlin](#1-import-analytics-kotlin)
2. [Upgrade your Destinations](#2-upgrade-your-destinations)
3. [Advanced: Upgrade your Middleware](#3-upgrade-middleware-to-plugins)
4. [Upgrade Notes](#4-upgrade-notes-changes-to-the-configuration-object)

## 1. Import Analytics-Kotlin

### 1.a) Add the dependencies to your app.

In your top-level build.gradle:
```java
repositories {
    mavenCentral()
}
```

In your app module's build.gradle:
```java
dependencies {
    implementation 'com.segment.analytics.kotlin:android:<latest_version>'
}
```

You have now added Analytics-Kotlin to your project. You can remove the Analytics-Android SDK from your app.

### 1.b) Modify your initialized instance

  {% codeexample %}
  {% codeexampletab Kotlin%}
  ```java
	    val analytics = Analytics("YOUR_WRITE_KEY", context) {
        trackApplicationLifecycleEvents = true
    }
  ```
  {% endcodeexampletab %}
  {% codeexampletab Java%}
  ```java
    // Initialize an Analytics object with the Kotlin Analytics method
    Analytics androidAnalytics = AndroidAnalyticsKt.Analytics("YOUR_WRITE_KEY", context, configuration -> {
        configuration.setTrackApplicationLifecycleEvents(true);
        return Unit.INSTANCE;
        }
    );

    // Wrap the object with JavaAnalytics for Java Compatibility.
    // You can also choose not to wrap the object, but some of the Analytics methods may not be accessible.
    JavaAnalytics analytics = new JavaAnalytics(androidAnalytics);   
  ```
  {% endcodeexampletab %}
  {% endcodeexample %}

### 1.c) Update your import statements

You'll need to update the imports for Analytics-Kotlin.

**Before example**
<br> 

  ```java
    import com.segment.analytics.Analytics;
    import com.segment.analytics.Middleware;   
  ```

**After example**
<br> 

  ```java
    import com.segment.analytics.kotlin.core.Analytics;
    import com.segment.analytics.kotlin.android.AndroidAnalyticsKt; // Only for calling from Android
    import com.segment.analytics.kotlin.core.compat.JavaAnalytics; // Only for calling from Java
    import com.segment.analytics.kotlin.core.platform.Plugin; // Replaces Middleware
  ```

> success ""
> Analytics-Kotlin supports running multiple instances of the analytics object, so it does not assume a singleton. However, if you’re migrating from Analytics-Android and all your track calls are routed to the `Analytics.shared()` singleton, you can these calls to your new Analytics-Kotlin object.

Add this extension to your code to ensure that tracking calls written for Analytics-Android work with Analytics-Kotlin.

```java

// Application's onCreate
...

sharedAnalytics = Analytics(...)...

fun Analytics.with {
    // TODO: Finish this
        return MyApplication.sharedAnalytics; // or whatever variable name you're using
}
```




## 2. Upgrade your Destinations

If your app uses Segment to route data to Destinations via Segment-cloud (i.e. Cloud-mode destinations), you can skip this step. Analytics-Kotlin treats Device-mode Destinations as [plugins](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-plugin-architecture), and simplifies the process in integrating them into your app. Analytics-Kotlin supports these [Device-Mode Destinations](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/destination-plugins) with more to come.


### 2.a) Import the Destination Plugin

  ```java
    implementation '<owner>:<project>:<version>'
  ```
### 2.b) Add Plugin to your Analytics instance:

Import the plugin:
  ```java
    import com.example.SomeDestinationPlugin
  ```
Add the pluging to the Analytics Instance

  {% codeexample %}
  {% codeexampletab Java%}
  ```java
    analytics.add(new SomeDestinationPlugin());
  ```
  {% endcodeexampletab %}
  {% codeexampletab Kotlin%}
  ```java
    analytics.add(SomeDestinationPlugin())
  ```
  {% endcodeexampletab %}
  {% endcodeexample %}

Your events will now begin to flow to the added destination in Device-Mode.

## 3. Upgrade Middleware to Plugins

Middlewares are a powerful mechanism that can augment events collected by the Analytics Android (Classic) SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify, augment or reject events. Analytics-Kotlin replaces the concept of middlewares with Enrichment Plugins to give you even more control over your event data. Refer to the [Plugin Architecture Overview](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-plugin-architecture) for more information.

### 3.a) Upgrading source middleware

**Before example**
<br>

  {% codeexample %}
  {% codeexampletab Java%}
  ```java
    builder
        .useSourceMiddleware(new Middleware() {
            @Override
            public void intercept(Chain chain) {
            // Get the payload.
            BasePayload payload = chain.payload();

            // Set the device year class on the context object.
            int year = YearClass.get(getApplicationContext());
            Map<String, Object> context = new LinkedHashMap<>(payload.context());
            context.put("device_year_class", year);

            // Build our new payload.
            BasePayload newPayload = payload.toBuilder()
                .context(context)
                .build();

            // Continue with the new payload.
            chain.proceed(newPayload);
           }
        })
  ```
  {% endcodeexampletab %}
  {% codeexampletab Kotlin%}
  ```java
      builder
   .useSourceMiddleware(
     Middleware { chain ->
         // Get the payload.
         val payload = chain.payload()

         // Set the device year class on the context object.
         val year = YearClass.get(getApplicationContext())
         val context = LinkedHashMap<String, Object>(payload.context())
         context.put("device_year_class", year)

         // Build our new payload.
         val newPayload = payload.toBuilder()
               .context(context)
               .build();

         // Continue with the new payload.
         chain.proceed(newPayload)
     })
  ```
  {% endcodeexampletab %}
  {% endcodeexample %}

**After example**
<br>

  {% codeexample %}
  {% codeexampletab Java%}
  ```java
  analytics.add(new Plugin() {
     private Analytics analytics;

     @Override
     public BaseEvent execute(@NonNull BaseEvent event) {
         // Set the device year class on the context object.
         int year = YearClass.get(getApplicationContext());
         EventTransformer.putInContext(event, "device_year_class", year);
         return event;
     }

     @Override
     public void setup(@NonNull Analytics analytics) {
         setAnalytics(analytics);
     }

     @NonNull
     @Override
     public Type getType() {
         return Plugin.Type.Enrichment;
     }

     @NonNull
     @Override
     public Analytics getAnalytics() {
         return analytics;
     }

     @Override
     public void setAnalytics(@NonNull Analytics analytics) {
         this.analytics = analytics;
     }
  });
  ```
  {% endcodeexampletab %}
  {% codeexampletab Kotlin%}
  ```java
    analytics.add(object: Plugin {
        override lateinit var analytics: Analytics
        override val type = Plugin.Type.Enrichment

        override fun execute(event: BaseEvent): BaseEvent? {
         // Set the device year class on the context object.
            val year = YearClass.get(getApplicationContext())
            event.context = updateJsonObject(event.context) {
             it["device_year_class"] = year
        }
        return event
     }
 })
  ```
  {% endcodeexampletab %}
  {% endcodeexample %}

### 3.b) Upgrading destination middleware
If you don't need to transform all of your Segment calls, and only want to transform the calls going to specific, device-mode destinations, use Destination plugins.

**Before example**
<br>

  {% codeexample %}
  {% codeexampletab Java%}
  ```java
      builder
   .useDestinationMiddleware("Segment.io", new Middleware() {
       @Override
       public void intercept(Chain chain) {
         // Get the payload.
         BasePayload payload = chain.payload();

         // Set the device year class on the context object.
         int year = YearClass.get(getApplicationContext());
         Map<String, Object> context = new LinkedHashMap<>(payload.context());
         context.put("device_year_class", year);

         // Build our new payload.
         BasePayload newPayload = payload.toBuilder()
             .context(context)
             .build();

         // Continue with the new payload.
         chain.proceed(newPayload);
       }
     })
  ```
  {% endcodeexampletab %}
  {% codeexampletab Kotlin%}
  ```java
 builder
   .useDestinationMiddleware(
    "Segment.io",
    Middleware { chain ->
         // Get the payload.
         val payload = chain.payload()

         // Set the device year class on the context object.
         val year = YearClass.get(getApplicationContext())
         val context = LinkedHashMap<String, Object>(payload.context())
         context.put("device_year_class", year)

         // Build our new payload.
         val newPayload = payload.toBuilder()
               .context(context)
               .build();

         // Continue with the new payload.
         chain.proceed(newPayload)
    })
   ```
  {% endcodeexampletab %}
  {% endcodeexample %}


**After example**
<br>

  {% codeexample %}
  {% codeexampletab Java%}
  ```java
         SegmentDestination segmentDestination = analytics.find(SegmentDestination.class);

    segmentDestination.add(new Plugin() {
        private Analytics analytics;

        @Override
        public BaseEvent execute(@NonNull BaseEvent event) {
            // Set the device year class on the context object.
            int year = YearClass.get(getApplicationContext());
             EventTransformer.putInContext(event, "device_year_class", year);
            return event;
        }

        @Override
        public void setup(@NonNull Analytics analytics) {
            setAnalytics(analytics);
        }

        @NonNull
        @Override
        public Type getType() {
            return Plugin.Type.Enrichment;
        }

        @NonNull
        @Override
        public Analytics getAnalytics() {
            return analytics;
        }

        @Override
        public void setAnalytics(@NonNull Analytics analytics) {
            this.analytics = analytics;
        }
    });
  ```
  {% endcodeexampletab %}
  {% codeexampletab Kotlin%}
  ```java
    val segmentDestination: DestinationPlugin = analytics.find(SegmentDestination::class)

    segmentDestination.add(object: Plugin {
        override lateinit var analytics: Analytics
        override val type = Plugin.Type.Enrichment

        override fun execute(event: BaseEvent): BaseEvent? {
            // Set the device year class on the context object.
            val year = YearClass.get(getApplicationContext())
            event.context = updateJsonObject(event.context) {
                it["device_year_class"] = year
            }
            return event
        }
    })
   ```
  {% endcodeexampletab %}
  {% endcodeexample %}


## 4. Upgrade Notes

### 4.a) Changes to the Configuration Object

The following option was renamed in Analytics-Kotlin:

| Before                   | After                             |
| ------------------------ | --------------------------------- |
| `context` | Name changed to `application`             |
| `defaultAPIHost` | Name changed to `apiHost`             |
| `defaultProjectSettings` | Name changed to `defaultSettings`             |
| `experimentalUseNewLifecycleMethods` | Name changed to `useLifecycleObserver`             |

The following option was added in Analytics-Kotlin:

Added Option | Details
------ | -------
`autoAddSegmentDestination` | The analytics client automatically adds the Segment Destination. Set this to `false`, if you want to customize the initialization of the Segment Destination, such as, add destination middleware). |

<br> The following option was removed in Analytics-Kotlin:

Removed Option | Details
------ | --------
`defaultOptions` | Removed in favor of a plugin that adds the default data to the event payloads. Segment doesn't provide a plugin example since it's dependent on your needs.|
`recordScreenViews` | Removed in favor of the `AndroidRecordScreenPlugin` that provides the same functionality. |
`trackAttributionData` | This feature no longer exists. |       
                                        
### 4.b) Properties

Properties have been replaced by JsonElement. Since Properties are essentially a `Map<String, Object>` we provide the ability to pass a map into our core tracking methods: 

  {% codeexample %}
  {% codeexampletab Java%}
  ```java
    Map<String, Object> map = new HashMap<>();
    map.put("feature", "chat");
    Map<String, Object> miniMap = new HashMap<>();
    miniMap.put("colorChoice", "green");
    map.put("prefs", miniMap);
    analytics.track("UseFeature", map);;
  ```
  {% endcodeexampletab %}
  {% codeexampletab Kotlin%}
  ```java
    val map = HashMap<String, Any>()
    map.put("feature", "chat")
    map.put("prefs", buildJsonObject { put("colorChoice", JsonPrimitive("green")) })
    analytics.track("UseFeature", map)
  ```
  {% endcodeexampletab %}
  {% endcodeexample %}
### 4.c) Options Support Removed
Options are no longer supported and should be converted into plugins.
## Conclusion
Once you’re up and running, you can take advantage of Analytics-Kotlin’s additional features, like [Destination Filters](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-destination-filters/), [Functions](https://segment.com/docs/connections/functions/), and [Typewriter](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/kotlin-android-typewriter/) support.
