---
title: Analytics for Kotlin Migration Guide
strat: kotlin-android
tags:
  - android
  - kotlin
  - android-kotlin
---

If you're using a different library such as Analytics-Android, follow these steps to migrate to the Analytics-Kotlin library:

1. [Import Analytics Kotlin](#1-import-analytics-kotlin)
2. [Upgrade your Destinations](#2-upgrade-your-destinations)
3. [Advanced: Upgrade your Middleware](#3-upgrade-middleware-to-plugins)
4. [Upgrade Notes](#4-upgrade-notes-changes-to-the-configuration-object)

> success ""
> You can continue to use your Android source write key for the migration to view historical events.

## 1. Import Analytics-Kotlin

```java
repositories {
    mavenCentral()
}

...

dependencies {
    implementation 'com.segment.analytics.kotlin:android:<latest_version>'
}
```

### 1.a) Modify your initialized instance

  {% codeexample %}
  {% codeexampletab Kotlin%}
  ```java
	val analytics = Analytics("YOUR_WRITE_KEY", context) {
        trackApplicationLifecycleEvents = true
    }

    // Optionally add extension to recreate Analytics.with(context).track/screen/etc calls
    fun Analytics.with(context: Context) {
        // Return the analytics instance from above.
        return analytics
    }
  ```
  {% endcodeexampletab %}
  {% codeexampletab Java%}
  ```java
    // Initialize an Analytics object with the Kotlin Analytics method
    Analytics androidAnalytics = AndroidAnalyticsKt.Analytics           ("YOUR_WRITE_KEY", context, configuration -> {
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

### 1.b) Update your import statements

  {% codeexample %}
  {% codeexampletab Before%}
  ```java
    import com.segment.analytics.Analytics;
    import com.segment.analytics.Middleware;   
  ```
  {% endcodeexampletab %}
  {% codeexampletab After%}
  ```java
    import com.segment.analytics.kotlin.core.Analytics;
    import com.segment.analytics.kotlin.android.AndroidAnalyticsKt; // For calling from Android
    import com.segment.analytics.kotlin.core.compat.JavaAnalytics; // For calling from Java
    import com.segment.analytics.kotlin.core.platform.Plugin; // Replaces Middleware
  ```
  {% endcodeexampletab %}
  {% endcodeexample %}

## 2. Upgrade your Destinations

If your app uses Segment to route data to Destinations via Segment-cloud (i.e. Cloud-mode destinations), you can skip this step. Analytics-Kotlin treats Device-mode Destinations as plugins, and simplifies the process in integrating them into your app. Analytics-Kotlin supports these Device-Mode Destinations with more to come.

### 2.a) Import the Destination Plugin

```java
    implementation '<owner>:<project>:<version>'
```

### 2.b) Add Plugin to your Analytics instance

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

Middlewares are a powerful mechanism that can augment events collected by the Analytics iOS (Classic) SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify, augment or reject events. Analytics Swift replaces the concept of middlewares with Enrichment Plugins to give you even more control over your event data. Refer to the Plugin Architecture Overview for more information.

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
If you don’t need to transform all of your Segment calls, and only want to transform the calls going to specific destinations, use Destination middleware instead of Source middleware. Destination middleware is available for device-mode destinations only.

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


## 4. Upgrade Notes: Changes to the Configuration Object

Segment changed these config options:

| Before                   | After                             |
| ------------------------ | --------------------------------- |
| `context` | Name changed to `application`             |
| `defaultAPIHost` | Name changed to `apiHost`             |
| `defaultProjectSettings` | Name changed to `defaultSettings`             |
| `experimentalUseNewLifecycleMethods` | Name changed to `useLifecycleObserver`             |

Segment added these options:

| Name                        | Details                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoAddSegmentDestination` | The analytics client automatically adds the Segment Destination. Set this to `false` if you want to customize the initialization of the Segment Destination, such as, add destination middleware. |
<br> Segment added these options:

Option | Details
------ | -------
`autoAddSegmentDestination` | The analytics client automatically adds the Segment Destination. Set this to `false`, if you want to customize the initialization of the Segment Destination, such as, add destination middleware). |

<br> Segment removed these options:

Option | Details
------ | --------
`defaultOptions` | Removed in favor of a plugin that adds the default data to the event payloads. Segment doesn't provide a plugin example since it's dependent on your needs.|
`recordScreenViews` | Removed in favor of the `AndroidRecordScreenPlugin` that provides the same functionality. |
`trackAttributionData` | This feature no longer exists. |       
                                        
### 4.b) Properties

Properties have been replace by JsonElement. Since Properties are essentially a map we provide a conversion function
to convert Maps of type Map<String, Object> to JsonElement:

Kotlin
val map : MutableMap<String, Object> = HashMap<String, Object>()

val json = map.toJsonElement()

Java
Map map = new HashMap<String, Object>();
JsonElement json = JSONKt.toJsonElement(map);

### 4.c) Options
Options are no longer supported and should be converted into plugins.
## Conclusion
Hopefully this simplifies your migration to Analytics-Kotlin. Once you’re up and running, you can take advantage of Analytics-Kotlin’s additional features, such as Destination Filters, Functions & Typewriter support.
