---
hidden: true
title: UrbanAirship Destination
---
The Urban Airship destination code is open sourced on GitHub. Feel free to check it out: [Android](https://github.com/urbanairship/android-segment-integration), [iOS](https://github.com/urbanairship/ios-segment-integration)


## Screen

Screen calls will generate Urban Airship screen tracking events. These events are exposed through Connect. Only the screen and category name will be used as the screen tracking event name.

## Identify

When you `identify` a user, Urban Airship will use the `userId` to set the [Named User](http://docs.urbanairship.com/api/ua.html#named-users). Named Users allow you to associate multiple devices to a single user or profile that may be associated with more than one device, e.g., an end-user's Android phone and tablet. A device can have only one Named User, and a single Named User should not be associated with more than 20 devices.

## Track

When `track` is called, an Urban Airship custom event will be created. The event's `traits` will will be automatically added as properties on the custom event and if revenue is present that will be set at the custom event's value.

## Group

Groups will be added as tags on the Urban Airship channel. Tags can then be used for audience segmentation when sending notifications
or setting up automation rules.

## Android


### Setup

1) Include the Urban Airship dependency in the project's build.gradle file:

    repositories {
       ...

       maven {
          url  "https://urbanairship.bintray.com/android"
       }
    }


    dependencies {
       ...

       // Urban Airship SDK
       compile 'com.urbanairship.android:segment-integration:1.0.+'
    }


2) Verify the `applicationId` is set in the project's build.gradle file:


    android {
       ...

       defaultConfig {
          ...

          applicationId "com.example.application"
       }
    }


3) Add the Urban Airship Destination factory:

    Analytics analytics = new Analytics.Builder(context, writeKey)
       .use(UrbanAirshipIntegration.FACTORY)
       ...
       .build();


### Enabling user notifications

Once the Urban Airship destination is ready, you can enable user notifications with the following:

    analytics.onIntegrationReady(UrbanAirshipIntegration.URBAN_AIRSHIP_KEY, new Analytics.Callback<Object>() {
          @Override
          public void onReady(Object instance) {
             UAirship airship = (UAirship) instance;
             airship.getPushManager().setUserNotificationsEnabled(true);
          }
       });


## iOS

### Setup

1) Add the Urban Airship Segment Destination pod to your project's Podfile:

    pod "UrbanAirship-iOS-Segment-Integration"


2) Use the Urban Airship Destination:

    SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];

    [config use:[SEGUrbanAirshipIntegrationFactory instance]];

    [SEGAnalytics setupWithConfiguration:config];


### Enabling user notifications

Once the Urban Airship destination is ready, you can enable user notifications with the following:

    [UAirship push].userPushNotificationsEnabled = YES;


To listen for when the Urban Airship destination is ready, listen for the `SEGAnalyticsIntegrationDidStart` event in `NSNotificationCenter`:

    [[[NSNotificationCenter defaultCenter] addObserver:self
                                              selector:@selector(airshipReady)
                                                  name:@"io.segment.analytics.integration.did.start"
                                                object:[SEGUrbanAirshipIntegrationFactory instance].key];
