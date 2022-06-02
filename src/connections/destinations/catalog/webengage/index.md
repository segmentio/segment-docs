---
title: WebEngage Destination
id: 54521fdc25e721e32a72ef02
---
This integration is maintained by [WebEngage Support](mailto:support@webengage.com).

## Getting Started

Steps to integrate Segment with WebEngage:

You will be required to provide the API key if you intend on sending any using WebEngage's server-side component. The API key can be found in your WebEngage dashboard on the top right under **Integrations > REST API**. If you don't have a WebEngage account, you can create one [here](https://webengage.com/sign-up).

To use the client-side web or mobile bundled SDKs, enter your License Code. WebEngage only needs the License Code you want to enable the device/packaged Integration which will allow you to use WebEngage's in-app and push notification functionality.

Do note that WebEngage for Mobile supports only the `Identify` and `Track` methods.

#### Android
To install the WebEngage-Segment integration, simply add this line to your app's  build.gradle file:

```java
 compile 'com.webengage:android-segment:2.+'
```

After adding the dependency, you must register the WebEngage's destination in your Segment's Analytics instance. To do this, import the WebEngage integration:

```java
 import com.webengage.sdk.android.integrations.segment.WebEngageIntegration;
```

And add the following line:

```java
analytics = new Analytics.Builder(this, "YOUR_SEGMENT_WRITE_KEY")
                .use(WebEngageIntegration.FACTORY)
                .build();
```

#### iOS

To install the Segment-WebEngage integration, simply add this line to your [CocoaPods](http://cocoapods.org) `Podfile`:

```ruby
pod "Segment-WebEngage"
```
If you are using XCode 8 and face any build issues try following before contacting support:

```ruby
pod "Segment-WebEngage/Xcode8"
```

After adding the dependency, you must register the integration with our SDK.  To do this, import the WebEngage integration in your `AppDelegate`:

```
#import <Segment-WebEngage/WEGSegmentIntegrationFactory.h>
```

And add the following lines to your AppDelegate's `application:didFinishLaunching:WithOptions:` method

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    //Initialise Segment
    SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"XXXXXXXXXXXXXXXXXXXXXXXXXXX"];

    //Additional Segment Configuration
    configuration.trackApplicationLifecycleEvents = NO; // Enable this to record certain application events automatically!
    configuration.recordScreenViews = NO; // Enable this to record screen views automatically!

    //Register WebEngage Integration With Segment
    [configuration use:[WEGSegmentIntegrationFactory instanceWithApplication:application launchOptions:launchOptions]];

    [SEGAnalytics setupWithConfiguration:configuration];

    return YES;
}
```

## Page

This is *only* supported on the client side web component. Sending page events using server side integration is not supported.

## Identify

When a user is identified, Segment will send that user's information to WebEngage, wherein a user will be created/updated. The `anonymousId` must be present in case of an anonymous user and `userId` in case of an identified user. We will map semantic traits such as your first name, email, gender, etc and also send along any custom traits.

## Track

When you `track` an event, Segment will send that event and its properties to WebEngage. Each event will have the necessary data about the user (`anonymousId` and `userId`) who performed the event.

An event name can be maximum 50 characters long. Event attribute values can be booleans, numbers, strings and dates only.
The maximum length of attribute names is 50 characters and of String data type attribute values is 1000 characters.

You cannot start your event or event attribute names with we_.

In an account, events can have at most 25 attributes of each data type type (i.e. 25 String type attributes, 25 Number type attributes etc.) across all instances of a particular event.

## Reset

The `reset` call must be invoked when a user is logged out.

- - -

## Features

### Push Notifications

Follow WebEngage's push notification documentation:
- [Android](https://docs.webengage.com/docs/android-push-messaging)
- [iOS](https://docs.webengage.com/docs/ios-push-messaging)

### In-App Notifications
No further action is required to enable in-app messaging.

### Proguard
Include the following rules in your ProGuard file.

```groovy
 -keep class com.webengage.sdk.android.**{*;}
-dontwarn com.webengage.sdk.android.**
```
