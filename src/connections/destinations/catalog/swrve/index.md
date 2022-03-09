---
beta: true
title: Swrve Destination
id: 59c467ba9e26eb0001380743
---
## Getting Started

Once the Segment library is integrated, toggle Swrve on in your Segment destination catalog. You can integrate Swrve as a mobile destination (iOS or Android). You'll need to get your `app_id` and `api_key` from the Swrve dashboard and add these to your mobile app.

Swrve supports the `identify`, `track` and `screen` methods.

## Android

### Integrating

1. In your top-level project `build.gradle` add:

  ```
  repositories {
      jcenter{
        url = 'http://dl.bintray.com/swrve-inc/android'
      }
      maven {
          url = 'https://maven.google.com'
      }
  }
  ```

2. Add the Swrve Segment dependency to your app `build.gradle`:

  ```
  compile 'com.swrve:swrve-segment-integration:+'
  ```

3. To do this, import the Swrve integration:
  ```
  import com.segment.analytics.android.integrations.swrve.SwrveIntegration;
  ```

  And add the following lines when initializing Segment:

  ```
  int appId = -1;
  String apiKey = "api_key";

  SwrveConfig swrveConfig = new SwrveConfig();
  // To use the EU stack, include this in your config.
  // swrveConfig.setSelectedStack(SwrveStack.EU);

  Analytics analytics = new Analytics.Builder(this, "write_key")
                  .use(SwrveIntegration.createFactory(application, appId, apiKey, swrveConfig)
                  .build();
  ```

  Note: Since Swrve needs to be initialized as early as possible, you need to supply the `app_id` and `api_key` key when you initialize the factory that is registered with the analytics client.

### Integrating Push & A/B Testing

Follow Swrve's push notification documentation [here](https://docs.swrve.com/developer-documentation/integration/android).

### Integrating In-app Messaging & Conversations

No further action is required to integrate in-app messages or Conversations, which are registered for and requested by default by our Swrve Segment destination.

## iOS

### Integrating

1. Add this line to your `Podfile`:

  ```
  pod 'Segment-Swrve'
  ```

2. Register the integration. To do this, import the Swrve integration in your `AppDelegate`:

  ```
  #import <SwrveSegment/SEGSwrveIntegrationFactory.h>
  ```

  And add the following lines:

  ```
  NSString *const SEGMENT_WRITE_KEY = @"...";
  SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:SEGMENT_WRITE_KEY];

  // FIXME Add your own App ID and Api Key here
  int appId = 0;
  NSString *apiKey =@"<Enter your own Api key here>";

  SwrveConfig *swrveConfig = [[SwrveConfig alloc] init];

  // TODO:
  // To use the EU stack, include this in your config.
  // swrveConfig.selectedStack = SWRVE_STACK_EU;

  [config use:[SEGSwrveIntegrationFactory instanceWithAppId:appId
                                                     apiKey:apiKey
                                                swrveConfig:swrveConfig
                                              launchOptions:launchOptions]];

  [SEGAnalytics setupWithConfiguration:config];
  ```

  Note: Since Swrve needs to be initialized as early as possible, you need to supply the `app_id` and `api_key` key when you initialize the factory that is registered with the analytics client.

### Integrating Push & A/B Testing

Follow Swrve's push notification documentation [here](https://docs.swrve.com/developer-documentation/integration/ios).

### Integrating In-app Messaging & Conversations

No further action is required to integrate in-app messages or Conversations, which are registered for and requested by default by our Swrve Segment destination.

## Screen

When you call `screen` in your mobile app, we send a event prefixed with `screen.` to Swrve.

## Identify

When you `identify` a user, we'll pass that `userId` as a user property named `customer.id` to Swrve.

All other traits will be sent to Swrve as custom user properties. Traits will be converted to strings before sending to Swrve.

## Track

When you `track` an event, we will send that event directly to Swrve as a custom event. Event properties will be sent to Swrve as event payloads. Properties will be converted to strings before sending.
