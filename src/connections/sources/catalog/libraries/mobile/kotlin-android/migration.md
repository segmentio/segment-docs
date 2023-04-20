---
title: Analytics for Kotlin Migration Guide
strat: kotlin-android
---

> info ""
> Analytics-Kotlin supports [these destinations](/docs/connections/sources/catalog/libraries/mobile/kotlin-android#supported-destinations) with more to come. 

If you're using a different library such as Analytics-Android, follow these steps to migrate to the Analytics-Kotlin library:

> success ""
> You can continue to use your Android source write key for the migration to view historical events.

## Create a Kotlin Source in Segment 
{: .head-list}
1. Go to **Connections > Sources > Add Source**.
2. Search for **Kotlin** and click **Add source**.
    You can choose between Kotlin (Android) Mobile or Kotlin Server. Kotlin Server doesn't support device-mode destinations.

## Replace your dependencies
{: .head-list}
Segment recommends you to install the library with a build system like Gradle, as it simplifies the process of upgrading versions and adding integrations. The library is distributed through [Jitpack](https://jitpack.io/){:target="_blank"}. Add the analytics module to your build.gradle.

Before example:
```groovy  
dependencies {
    implementation 'com.segment.analytics.android:analytics:4.+'
}
```

 After example:
```groovy
repositories {
    mavenCentral()
}
dependencies {
    implementation 'com.segment.analytics.kotlin:android:<latest_version>'
}
```

## Modify your initialized instance
{: .head-list}
Before example:

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
 Analytics analytics = new Analytics.Builder(context, "YOUR_WRITE_KEY")
   .trackApplicationLifecycleEvents()
   .build();
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
  val analytics = Analytics.Builder(context, "YOUR_WRITE_KEY")
 .trackApplicationLifecycleEvents()
 .build()
 ```
 {% endcodeexampletab %}
 {% endcodeexample %}   
   After example:

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
    // Initialize an Analytics object with the Kotlin Analytics method
    Analytics androidAnalytics = AndroidAnalyticsKt.Analytics("YOUR_WRITE_KEY", context, configuration -> {
     configuration.setTrackApplicationLifecycleEvents(true);
     return Unit.INSTANCE;
    }
  );

  // Wrap the object with JavaAnalytics to bring Java Compatibility.
  // You can also choose not to wrap the object, but some of the Analytics methods may not be accessible.
  JavaAnalytics analytics = new JavaAnalytics(androidAnalytics);    
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
    Analytics("YOUR_WRITE_KEY", context) {
        trackApplicationLifecycleEvents = true
    }
 ```
 {% endcodeexampletab %}
 {% endcodeexample %}   

## Add a middleware
{: .head-list}

Middlewares are a powerful mechanism that can augment the events collected by the SDK. A middleware is a function that the Segment SDK invokes and can be used to monitor, modify, augment or reject events.

As middlewares have the same function as [enrichment plugins](/docs/connections/sources/catalog/libraries/mobile/kotlin-android#plugin-architecture), you need to write an enrichment plugin to add a middleware.

Before example:

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

After example:

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



## Add a destination middleware
{: .head-list}
If you don't need to transform all of your Segment calls, and only want to transform the calls going to specific destinations, use Destination middleware instead of Source middleware. Destination middleware is available for device-mode destinations only.


Before example:

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
 
After example:

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


## Set your config options
{: .head-list}

Segment changed these config options:

| Before                               | After                                                                                                     |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `collectDeviceId`                    | Name changed to `collectDeviceId`                                                                         |
| `context`                            | Name changed to `application`                                                                             |
| `defaultApiHost`                     | Name changed to `apiHost`                                                                                 |
| `defaultProjectSettings`             | Name changed to `defaultSettings`                                                                         |
| `experimentalUseNewLifecycleMethods` | Name changed to `useLifecycleObserver`Note: Used in tandem with `trackApplicationLifecycleEvents` |
| `flushInterval`                      | Name changed to `flushInterval`                                                                           |
| `flushQueueSize`                     | Name changed to `flushAt`                                                                                 |

Segment added this option:

| Option                      | Details                                                                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoAddSegmentDestination` | The analytics client automatically adds the Segment Destination. Set this to `false`, if you want to customize the initialization of the Segment Destination, such as, add destination middleware). |

Segment deprecated these options:

| Option                 | Details                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultOptions`       | Deprecated in favor of a plugin that adds the default data to the event payloads. Segment doesn't provide a plugin example since it's dependent on your needs. |
| `recordScreenViews`    | Deprecated in favor of the `AndroidRecordScreenPlugin` that provides the same functionality.                                                                   |
| `trackAttributionData` | This feature no longer exists.                                                                                                                                 |

## Add a destination
{: .head-list}

Segment previously used Factories to initialize destinations. With Analytics Kotlin, Segment treats destinations similar to plugins and simplifies the process in adding them.  


Before example:

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
    // Previously Segment used to use Factories to initialize destinations
    analytics.use(FooIntegration.FACTORY);
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
    // Previously Segment used to use Factories to initialize destinations
    analytics.use(FooIntegration.FACTORY)
 ```
 {% endcodeexampletab %}
 {% endcodeexample %}   

   After example:

 {% codeexample %}
 {% codeexampletab Java%}
 ```java	
    // Now destinations are treated similar to plugins and thus are simpler to add
    YourDestination destination = new YourDestination();
    analytics.add(destination); 
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
    // Now destinations are treated similar to plugins and thus are simpler to add
    val destination = YourDestination()
    analytics.add(destination)
 ```
 {% endcodeexampletab %}
 {% endcodeexample %}   
## Modify your tracking methods for Identify, Track, Group, Screen, and Alias
{: .head-list}

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
      analytics.identify("a user's id", new Traits().putName("John Doe"), null);

 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
    analytics.identify("a user's id", Traits().putName("John Doe"), null)

 ```
 {% endcodeexampletab %}
 {% endcodeexample %}   

After example:

 {% codeexample %}
 {% codeexampletab Java%}
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
 {% codeexampletab Kotlin%}
 ```java
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


### Track

Before example:

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
    analytics.track("Product Viewed", new Properties().putValue("name", "Moto 360"));
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
    analytics.track("Product Viewed", Properties().putValue("name", "Moto 360"))
 ```
 {% endcodeexampletab %}
 {% endcodeexample %}   

After example:

 {% codeexample %}
 {% codeexampletab Java%}
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
 {% codeexampletab Kotlin%}
 ```java
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
        price = 300.00,
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


### Group

Before example:

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
    analytics.group("a user's id", "a group id", new Traits().putEmployees(20));
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
    analytics.group("a user's id", "a group id", Traits().putEmployees(20))
 ```
 {% endcodeexampletab %}
 {% endcodeexample %}   

After example:

 {% codeexample %}
 {% codeexampletab Java%}
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
 {% codeexampletab Kotlin%}
 ```java
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


### Screen

Before example:

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
    analytics.screen("Feed", new Properties().putValue("Feed Length", "26"));
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
    analytics.screen("Feed", Properties().putValue("Feed Length", "26"))
 ```
 {% endcodeexampletab %}
 {% endcodeexample %}   

After example:

 {% codeexample %}
 {% codeexampletab Java%}
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
 {% codeexampletab Kotlin%}
 ```java
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


### Alias

Before example:

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
    analytics.alias("new id");
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
    analytics.alias("new id")
```
 {% endcodeexampletab %}
 {% endcodeexample %}   

After example:

 {% codeexample %}
 {% codeexampletab Java%}
 ```java	
    analytics.alias("new id");
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```java
    analytics.alias("new id");
```
 {% endcodeexampletab %}
 {% endcodeexample %}   


## Properties and Options conversions

Segment no longer supports the `Properties` or `Options` parameters in Analytics Kotlin. Follow the guide below to implement the `Builders.JSONObject` for your `Properties` and `plugins` to replace `Options`. 


### Properties

> info ""
> The keys for properties are case-sensitive. Use the following casing to match the expected behavior in Analytics Android (Classic).

Before example 

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
   (new Properties())
        .putRevenue(23.20)
        .putCategory("foo")
        .putProducts(Properties.Product("id", "sku", 1234.23))
        .putCoupon("mycoupon")
        .putCurrency("USD")
        .putDiscount(1.00)
        .putName("great product name")
        .putPrice(19.99)
        .putOrderId("x2390-129")
        .putPath("/a/b/c/foo")
        .putProductId("p1239")
        .putReferrer("yahoo ads")
        .putRepeatCustomer(true)
        .putShipping(4.99)
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```kotlin
    (Properties())
        .putRevenue(23.20)
        .putCategory("foo")
        .putProducts(Properties.Product("id", "sku", 1234.23))
        .putCoupon("mycoupon")
        .putCurrency("USD")
        .putDiscount(1.00)
        .putName("great product name")
        .putPrice(19.99)
        .putOrderId("x2390-129")
        .putPath("/a/b/c/foo")
        .putProductId("p1239")
        .putReferrer("yahoo ads")
        .putRepeatCustomer(true)
        .putShipping(4.99)
```
 {% endcodeexampletab %}
 {% endcodeexample %}  

After example 

 {% codeexample %}
 {% codeexampletab Java%}
 ```java
    Builders.buildJsonObject(o -> {
        o.put("revenue", 23.20);
        o.put("category", "foo");
        o.put("products", Builders.buildJsonArray (a -> {
            a.addJsonObject(p -> {
                p.put("id", "id");
                p.put("sku", "sku");
                p.put("price", 1234.23);
            });
        }));
        o.put("coupon", "mycoupon");
        o.put("currency", "usd");
        o.put("discount", 1.00);
        o.put("name", "Great Product Name");
        o.put("price", 19.99);
        o.put("orderId", "x2390-129");
        o.put("path", "/a/b/c/foo");
        o.put("productId", "p1239");
        o.put("referrer", "yahoo ads");
        o.put("repeat", true);
        o.put("shipping", 4.99);
    });
 ```
 {% endcodeexampletab %}
 {% codeexampletab Kotlin%}
 ```kotlin
    Builders.buildJsonObject { o -> {
        o.put("revenue", 23.20)
        o.put("category", "foo")
        o.put("products", Builders.buildJsonArray {a -> {
            a.addJsonObject{ p -> 
                p.put("id", "id")
                p.put("sku", "sku")
                p.put("price", 1234.23)
            }
        }})
        o.put("coupon", "mycoupon")
        o.put("currency", "usd")
        o.put("discount", 1.00)
        o.put("name", "Great Product Name")
        o.put("price", 19.99)
        o.put("orderId", "x2390-129")
        o.put("path", "/a/b/c/foo")
        o.put("productId", "p1239")
        o.put("referrer", "yahoo ads")
        o.put("repeat", true)
        o.put("shipping", 4.99)
    }}
```
 {% endcodeexampletab %}
 {% endcodeexample %}  

### Options

Options are no longer supported and should be converted into plugins.