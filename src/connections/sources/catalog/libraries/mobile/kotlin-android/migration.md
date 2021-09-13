---
title: Analytics for Kotlin Migration Guide
strat: kotlin
---

> info ""
> Analytics-Kotlin is in pubic beta and currently supports [these destinations](https://github.com/segmentio/analytics-kotlin/tree/main/samples/kotlin-android-app-destinations/src/main/java/com/segment/analytics/destinations/plugins){:target="_blank"} with Segment actively adding more to the list. Segment's [First-Access and Beta terms](https://segment.com/legal/first-access-beta-preview/) govern this library.

If you’re using a different library such as Analytics-Android, follow these steps to migrate to the Analytics-Kotlin library:

> success ""
> You can continue to use your Android source write key for the migration to view historical events.


1. Create a Kotlin Source in Segment.
    1. Go to **Connections > Sources > Add Source**.
    2. Search for **Kotlin** and click **Add source**.
        - **NOTE:** You can choose between Kotlin (Android) Mobile or Kotlin Server. Kotlin Server doesn't support device-mode destinations.
2. Replace your dependencies.

    Segment recommends you to install the library with a build system like Gradle, as it simplifies the process of upgrading versions and adding integrations. The library is distributed via [Jitpack](https://jitpack.io/){:target="_blank"}. Add the analytics module to your build.gradle.

    <br> Before example:
    ```swift  
    dependencies {
        implementation 'com.segment.analytics.android:analytics:4.+'
    }
    ```

    <br> After example:
    ```swift
    repositories {
        maven { url 'https://jitpack.io' }
    }
    dependencies {
        implementation 'com.github.segmentio.analytics-kotlin:android:+'
    }
    ```
3. Modify your initialized instance.

    <br> Before example:
    ```swift  
    Analytics analytics = new Analytics.Builder(context, "YOUR_WRITE_KEY")
      .trackApplicationLifecycleEvents()
      .build();
    ```

    <br> After example:
    ```swift
    Analytics("YOUR_WRITE_KEY", context) {
        analyticsScope = applicationCoroutineScope
        trackApplicationLifecycleEvents = true
    }
    ```
4. Add a middleware.

    Middlewares are a powerful mechanism that can augment the events collected by the SDK. A middleware is a function that the Segment SDK invokes and can be used to monitor, modify, augment or reject events.

    <br> As middlewares have the same function as [enrichment plugins](/docs/connections/sources/catalog/libraries/mobile/swift-ios/index#plugin-architecture), you need to write an enrichment plugin to add a middleware.

    <br> Before example:
    ```swift  
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

    <br> After example:
    ```swift
    analytics.add(object: Plugin {
        override lateinit var analytics: Analytics
        override val type = Plugin.Type.Enrichment

        override fun execute(event: BaseEvent): BaseEvent? {
            // Set the device year class on the context object.
            int year = YearClass.get(getApplicationContext());
            Map<String, Object> context = new LinkedHashMap<>(payload.context());
            event.context = buildJsonObject {
                putAll(event.context)
                put("device_year_class", year)
            }
            return event
        }
    })
    ```
5. Add a destination middleware.

    If you don’t need to transform all of your Segment calls, and only want to transform the calls going to specific destinations, use Destination middleware instead of Source middleware. Destination middleware is available for device-mode destinations only.

    <br> Before example:
    ```swift  
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

    <br> After example:
    ```swift
    val segmentDestination: DestinationPlugin = analytics.find(SegmentDestination::class)

    segmentDestination.add(object: Plugin {
        override lateinit var analytics: Analytics
        override val type = Plugin.Type.Enrichment

        override fun execute(event: BaseEvent): BaseEvent? {
            // Set the device year class on the context object.
            int year = YearClass.get(getApplicationContext());
            Map<String, Object> context = new LinkedHashMap<>(payload.context());
            event.context = buildJsonObject {
                putAll(event.context)
                put("device_year_class", year)
            }
            return event
        }
    })
    ```
6. Set your config options.

    <br> Segment changed these config options:

    Before | After
    ------ | ------
    `collectDeviceId` | Name changed to `collectDeviceId` |
    `context` | Name changed to `application` |
    `defaultApiHost` | Name changed to `apiHost` |
    `defaultProjectSettings` | Name changed to `defaultSettings` |
    `experimentalUseNewLifecycleMethods` | Name changed to `useLifecycleObserver`<br><br>Note: Used in tandem with `trackApplicationLifecycleEvents` |
    `flushInterval` | Name changed to `flushInterval` |
    `flushQueueSize` | Name changed to `flushAt` |

    <br> Segment added this option:

    Option | Details
    ------ | -------
    `autoAddSegmentDestination` | The analytics client automatically adds the Segment Destination. Set this to `false`, if you want to customize the initialization of the Segment Destination, such as, add destination middleware). |

    <br> Segment deprecated these options:

    Option | Details
    ------ | --------
    `defaultOptions` | Deprecated in favor of a plugin that adds the default data to the event payloads. Segment doesn't provide a plugin example since it's dependent on your needs.
    `recordScreenViews` | Deprecated in favor of the `AndroidRecordScreenPlugin` that provides the same functionality. |
    `trackAttributionData` | This feature no longer exists. |

7. Add a destination.

    Segment previously used Factories to initialize destinations. With Analytics Kotlin, Segment treats destinations similar to plugins and simplifies the process in adding them.  

    <br> Before example:
    ```swift  
    // Previously we used to use Factories to initialize destinations
    analytics.use(FooIntegration.FACTORY)
    ```

    <br> After example:
    ```swift
    // Now destinations are treated similar to plugins and thus are simpler to add
    val destination = /* initialize your desired destination */
    analytics.add(destination)
    ```
8. Modify your tracking methods for Identify, Track, Group, Screen, and Alias.
    - Identify

      <br> Before example:
      ```kotlin
      analytics.identify("a user's id", new Traits().putName("John Doe"), null);
      ```

      <br> After example:
      ```kotlin    
      // The newer APIs promote the use of strongly typed structures to keep codebases legible
      @Serializable
      data class UserTraits(
        var firstName: String,
        var lastName: String
      )

      analytics.identify("a user's id", UserTraits(firstName = "John", lastName = "Doe"))
      ```

    - Track

      <br> Before example:
      ```kotlin
      analytics.track("Product Viewed", new Properties().putValue("name", "Moto 360"));
      ```

      <br> After example:
      ```kotlin    
      // The newer APIs promote the use of strongly typed structures to keep codebases legible
      @Serializable
      data class ProductViewedProperties(
        var productName: String,
        var brand: String,
        var category: String,
        var price: Double,
        var currency: String
      )

      analytics.track(
          "Product Viewed",
          ProductViewedProperties(
            productName = "Moto 360",
            brand = "Motorola",
            category = "smart watch",
            price = 300.00
            currency = "USD"
          )
      )
      ```

    - Group
      <br> Before example:
      ```kotlin
      analytics.group("a user's id", "a group id", new Traits().putEmployees(20));
      ```

      <br> After example:
      ```kotlin    
      @Serializable
      data class GroupTraits(
        var employeeCount: Int
      )
      analytics.group("a group id", GroupTraits(employeeCount = 20))
      ```

    - Screen
      <br> Before example:
      ```kotlin
      analytics.screen("Feed", new Properties().putValue("Feed Length", "26"));
      ```

      <br> After example:
      ```kotlin    
      @Serializable
      data class FeedScreenProperties(
        @SerialName("Feed Length")
        var feedLength: Int
      )

      analytics.screen("Feed", FeedScreenProperties(feedLength = 26))
      ```
    - Alias

      <br> Before example:
      ```kotlin
      analytics.alias("new id");
      ```

      <br> After example:
      ```kotlin    
      analytics.alias("new id")
      ```
