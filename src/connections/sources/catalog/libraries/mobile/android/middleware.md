---
title: 'Middleware for Analytics-Android'
strat: android
---

Middlewares are a powerful mechanism that can augment the events collected by the SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify, augment or reject events. Source Middleware are available on analytics-android 4.3.0 and later. Destination Middleware are available on analytics-android 4.7.0 and later.

You can register source middleware during construction with the `.useSourceMiddleware` method on the builder. These middleware are invoked for all events, including automatically tracked events, and external event sources like Adjust and Optimizely.

You can register destination middleware during construction with the `.useDestinationMiddleware` method on the builder. These middleware are invoked for all events to the specific device-mode destination.

> info ""
> **Note**: Destination-middleware only act on [data sent to destinations in device-mode](/docs/connections/destinations#connection-modes). Since the destination middleware code exists in your app or project, it cannot transform the data sent from the Segment servers to the destination endpoint.

You can use middleware to customize those messages to fit your use case, even if the event was not sent by your source code.

For example, you might want to record the [device year class](https://github.com/facebook/device-year-class) with your events. Previously, you would have to do this everywhere you trigger an event with the Segment SDK. With middleware, you can do this in a single place.

```java
Analytics analytics = new Analytics.Builder(getApplicationContext(), ANALYTICS_WRITE_KEY)
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
    .build();
```

Building on the earlier example, maybe you don't want to collect any events for older devices. To do this, you can register a middleware that will reject events for older devices.

```java
Analytics analytics = new Analytics.Builder(getApplicationContext(), ANALYTICS_WRITE_KEY)
        .useSourceMiddleware(deviceClassMiddleware) // From earlier example.
        .useSourceMiddleware(new Middleware() {
          @Override
          public void intercept(Chain chain) {
            // Get the payload.
            BasePayload payload = chain.payload();

            // Check the device year class.
            AnalyticsContext context = payload.context();
            int year = context.getInt("device_year_class", 2009);

            // Reject the event if the year class is < 2012.
            if (year < 2012) {
              return;
            }

            // Continue with the event otherwise.
            chain.proceed(payload);
          }
        })
        .build();
```

The important thing to see is that the output produced by the first middleware feeds into the second. This allows you to chain and compose independent middlewares!

## Destination Middleware

If you do not need to transform all of your Segment calls, and only want to transform the calls going to specific destinations, you should use Destination Middleware instead of Source middleware. Destination middleware are available for device-mode destinations only; there are several other ways to transform Segment calls sent to a destination in cloud-mode.

You can use the same middleware object to apply transformations for several different device-mode destinations at the same time. For example, you can use middleware to add a property before sending `Checkout Started` track events to both a Mixpanel and an Amplitude destination.

The example below adds a property key-value pair to any "Checkout Started" Track event, with the key "step" and the value "1".

```java
Integration.Factory mixpanelFactory = MixpanelIntegration.FACTORY; // https://github.com/segment-integrations/analytics-android-integration-mixpanel
Integration.Factory amplitudeFactory = AmplitudeIntegration.FACTORY; // https://github.com/segment-integrations/analytics-android-integration-amplitude
Middleware addPropMiddleware = new Middleware() {
      @Override
      public void intercept(Chain chain) {
        // Get the payload.
        BasePayload payload = chain.payload();

        if (payload.type() == BasePayload.Type.track) {
          TrackPayload track = (TrackPayload) payload;

          // Check the track call event name
          if (track.event().equals("Checkout Started")) {

            // Create copy of Properties map and add additional property
            ValueMap newProps = new ValueMap();
            newProps.putAll(track.properties());
            newProps.put("step", 1);

            // Build our new payload.
            payload = track.toBuilder().properties(newProps).build();
          }
        }

        // Continue with new payload
        chain.proceed(payload);
      }
    };
Analytics analytics = new Analytics.Builder(getApplicationContext(), ANALYTICS_WRITE_KEY)
    .use(mixpanelFactory)
    .use(amplitudeFactory)
    .useDestinationMiddleware(mixpanelFactory.key(), addPropMiddleware)
    .useDestinationMiddleware(amplitudeFactory.key(), addPropMiddleware)
    .build();
```

## Braze Middleware

If you use the Braze (Appboy) destination in either [cloud or device mode](/docs/connections/destinations/#connection-modes) you can save Braze costs by "debouncing" duplicate Identify calls from Segment by adding our [open-source Middleware tool](https://github.com/segmentio/segment-braze-mobile-middleware) to your implementation. More information about this tool and how it works [is available in the project's README](https://github.com/segmentio/segment-braze-mobile-middleware/blob/master/README.md#how-does-this-work).
