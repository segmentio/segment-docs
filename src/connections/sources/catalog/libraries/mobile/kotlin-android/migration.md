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
    ```groovy  
    dependencies {
        implementation 'com.segment.analytics.android:analytics:4.+'
    }
    ```

    <br> After example:
    ```groovy
    repositories {
      mavenCentral()
    }
    dependencies {
        implementation 'com.segment.analytics.kotlin:android:<latest_version>'
    }
    ```
3. Modify your initialized instance.

    <br> Before example:
    ```java  
    Analytics analytics = new Analytics.Builder(context, "YOUR_WRITE_KEY")
      .trackApplicationLifecycleEvents()
      .build();
    ```

    <br> After example:

    {% codeexample %}
    {% codeexampletab Java %}
    ```java
    // Initialize an Analytics object with the Kotlin Analytics method 
    Analytics androidAnalytics = AndroidAnalyticsKt.Analytics("YOUR_WRITE_KEY", context, configuration -> {
      configuration.setTrackApplicationLifecycleEvents(true);
      return Unit.INSTANCE;
    });

    // Wrap the object with JavaAnalytics to bring Java Compatibility.
    // You can also choose not to wrap the object, but some of the Analytics methods may not be accessible.
    JavaAnalytics analytics = new JavaAnalytics(androidAnalytics);    
    ```
    {% endcodeexampletab %}
    {% codeexampletab Kotlin %}
    ```kotlin
    Analytics("YOUR_WRITE_KEY", context) {
        trackApplicationLifecycleEvents = true
    }
    ```
    {% endcodeexampletab %}
    {% endcodeexample %}
    
4. Add a middleware.

    Middlewares are a powerful mechanism that can augment the events collected by the SDK. A middleware is a function that the Segment SDK invokes and can be used to monitor, modify, augment or reject events.

    <br> As middlewares have the same function as [enrichment plugins](/docs/connections/sources/catalog/libraries/mobile/kotlin-android#plugin-architecture), you need to write an enrichment plugin to add a middleware.

    <br> Before example:
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

    <br> After example:

    {% codeexample %}
    {% codeexampletab Java %}
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
    {% codeexampletab Kotlin %}
    ```kotlin
    analytics.add(object: Plugin {
        override lateinit var analytics: Analytics
        override val type = Plugin.Type.Enrichment

        override fun execute(event: BaseEvent): BaseEvent? {
            // Set the device year class on the context object.
            val year = YearClass.get(getApplicationContext());
            event.context = updateJsonObject(event.context) {
                it["device_year_class"] = year
            }
            return event
        }
    })
    ```
    {% endcodeexampletab %}
    {% endcodeexample %}

5. Add a destination middleware.

    If you don’t need to transform all of your Segment calls, and only want to transform the calls going to specific destinations, use Destination middleware instead of Source middleware. Destination middleware is available for device-mode destinations only.

    <br> Before example:
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

    <br> After example:

    {% codeexample %}
    {% codeexampletab Java %}
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
    {% codeexampletab Kotlin %}
    ```kotlin
    val segmentDestination: DestinationPlugin = analytics.find(SegmentDestination::class)

    segmentDestination.add(object: Plugin {
        override lateinit var analytics: Analytics
        override val type = Plugin.Type.Enrichment

        override fun execute(event: BaseEvent): BaseEvent? {
            // Set the device year class on the context object.
            val year = YearClass.get(getApplicationContext());
            event.context = updateJsonObject(event.context) {
                it["device_year_class"] = year
            }
            return event
        }
    })
    ```
    {% endcodeexampletab %}
    {% endcodeexample %}
    
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
    ```java  
    // Previously we used to use Factories to initialize destinations
    analytics.use(FooIntegration.FACTORY)
    ```

    <br> After example:

    {% codeexample %}
    {% codeexampletab Java %}
    ```java
    // Now destinations are treated similar to plugins and thus are simpler to add
    YourDestination destination = new YourDestination();
    analytics.add(destination);
    ```
    {% endcodeexampletab %}
    {% codeexampletab Kotlin %}
    ```kotlin
    // Now destinations are treated similar to plugins and thus are simpler to add
    val destination = YourDestination()
    analytics.add(destination)
    ```
    {% endcodeexampletab %}
    {% endcodeexample %}

8. Modify your tracking methods for Identify, Track, Group, Screen, and Alias.
    - Identify

      <br> Before example:
      ```java
      analytics.identify("a user's id", new Traits().putName("John Doe"), null);
      ```

      <br> After example:

      {% codeexample %}
      {% codeexampletab Java %}
      ```java
      // The newer APIs promote the use of strongly typed structures to keep codebases legible
      class UserTraits implements JsonSerializable {
          private String firstName;
          private String lastName;

          public JsonObject serialize() {
              return Builders.buildJsonObject(o -> {
                  o.put("firstName", firstName)
                      .put("lastName", lastName);
              }));
          }
      }

      analytics.identify("a user's id", new UserTraits());

      // Or you could use the JSON builder if you have some unstructured data
      analytics.identify("a user's id", Builders.buildJsonObject(o -> {
          o.put("firstName", "John")
              .put("lastName", "Doe");
      })); 
      ```
      {% endcodeexampletab %}
      {% codeexampletab Kotlin %}
        ```kotlin    
        // The newer APIs promote the use of strongly typed structures to keep codebases legible
        @Serializable
        data class UserTraits(
          var firstName: String,
          var lastName: String
        )

        analytics.identify("a user's id", UserTraits(firstName = "John", lastName = "Doe"))


        // Or you could use the JSON builder if you have some unstructured data
        analytics.identify("a user's id", buildJsonObject {
            put("firstName", "John")
            put("lastName", "Doe")
        }));
        ```
      {% endcodeexampletab %}
      {% endcodeexample %}

    - Track

      <br> Before example:
      ```kotlin
      analytics.track("Product Viewed", new Properties().putValue("name", "Moto 360"));
      ```

      <br> After example:

      {% codeexample %}
      {% codeexampletab Java %}
      ```java
        // The newer APIs promote the use of strongly typed structures to keep codebases legible
       class ProductViewedProperties implements JsonSerializable {
          private String productName;
          private String brand;
          private String category;
          private String price;
          private String currency;

          public JsonObject serialize() {
              return Builders.buildJsonObject(o -> {
                  o.put("productName", productName)
                      .put("brand", brand)
                      .put("category", category)
                      .put("price", price)
                      .put("currency", currency);
              }));
          }
      }
      
      analytics.track("Product Viewed", new ProductViewedProperties());
      
      // Or you could use the JSON builder if you have some unstructured data
      analytics.track("Product Viewed", Builders.buildJsonObject(o -> {
          o.put("productName", productName)
              .put("brand", brand)
              .put("category", category)
              .put("price", price)
              .put("currency", currency);
      }));

      ```
      {% endcodeexampletab %}
      {% codeexampletab Kotlin %}
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

        // Or you could use the JSON builder if you have some unstructured data
        analytics.track(
            "Product Viewed",
            buildJsonObject {
              put("productName", "Moto 360"),
              put("brand", "Motorola"),
              put("category", "smart watch"),
              put("price", 300.00),
              put("currency", "USD")
            }
        )
        ```
      {% endcodeexampletab %}
      {% endcodeexample %}
    
    - Group
      <br> Before example:
      ```java
      analytics.group("a user's id", "a group id", new Traits().putEmployees(20));
      ```

      <br> After example:

      {% codeexample %}
      {% codeexampletab Java %}
      ```java
      // The newer APIs promote the use of strongly typed structures to keep codebases legible
      class GroupTraits implements JsonSerializable {
          private int employeeCount;

          public JsonObject serialize() {
              return Builders.buildJsonObject(o -> {
                  o.put("employeeCount", employeeCount);
              }));
          }
      }

      analytics.group("a group id", new GroupTraits());

      // Or you could use the JSON builder if you have some unstructured data
      analytics.group("a group id", Builders.buildJsonObject(o -> {
          o.put("employeeCount", 20);
      }));
    
      ```
      {% endcodeexampletab %}
      {% codeexampletab Kotlin %}
      ```kotlin   
      // The newer APIs promote the use of strongly typed structures to keep codebases legible 
      @Serializable
      data class GroupTraits(
        var employeeCount: Int
      )
      analytics.group("a group id", GroupTraits(employeeCount = 20))


      // Or you could use the JSON builder if you have some unstructured data
      analytics.group("a group id", buildJsonObject{
          put("employeeCount", 20)
      })
      ```
      {% endcodeexampletab %}
      {% endcodeexample %}

    - Screen
      <br> Before example:
      ```java
      analytics.screen("Feed", new Properties().putValue("Feed Length", "26"));
      ```

      <br> After example:

      {% codeexample %}
      {% codeexampletab Java %}
      ```java
      // The newer APIs promote the use of strongly typed structures to keep codebases legible 
      class FeedScreenProperties implements JsonSerializable {
          private int feedLength;

          public JsonObject serialize() {
              return Builders.buildJsonObject(o -> {
                  o.put("Feed Length", feedLength);
              }));
          }
      }

      analytics.screen("Feed", new FeedScreenProperties());

      // Or you could use the JSON builder if you have some unstructured data
      analytics.screen("Feed", Builders.buildJsonObject(o -> {
          o.put("Feed Length", 26);
      }));

      ```
      {% endcodeexampletab %}
      {% codeexampletab Kotlin %}
      ```kotlin    
      // The newer APIs promote the use of strongly typed structures to keep codebases legible 
      @Serializable
      data class FeedScreenProperties(
        @SerialName("Feed Length")
        var feedLength: Int
      )

      analytics.screen("Feed", FeedScreenProperties(feedLength = 26))


      // Or you could use the JSON builder if you have some unstructured data
      analytics.screen("Feed", buildJsonObject{
        put("feedLength", 26)
      })
      ```
      {% endcodeexampletab %}
      {% endcodeexample %}
      
    - Alias

      <br> Before example:
      ```java
      analytics.alias("new id");
      ```

      <br> After example:

      {% codeexample %}
      {% codeexampletab Java %}
      ```java
      analytics.alias("new id");
      ```
      {% endcodeexampletab %}
      {% codeexampletab Kotlin %}
      ```kotlin    
      analytics.alias("new id")
      ```
      {% endcodeexampletab %}
      {% endcodeexample %}
      
