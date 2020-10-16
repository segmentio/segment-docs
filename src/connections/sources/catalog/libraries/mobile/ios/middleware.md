---
title: Middleware for iOS
strat: ios
---

Middlewares are simple functions invoked by the Segment libraries, which give you a way to add information to the events you collect using the Segment SDKs. They can be used to monitor, modify, or reject events. Source Middleware are available on `analytics-ios` 3.6.0 and later. Destination Middleware are available on `analytics-ios` 4.0.0 and later.

You can access the middleware API in both Objective-C and Swift.

### Usage

Middleware is any Objective-C class that conforms to the following protocol.

```objc
@protocol SEGMiddleware
@required
- (void)context:(SEGContext *_Nonnull)context next:(S
EGMiddlewareNext _Nonnull)next;
@end
```

We also provide a block-centric helper class to make it easier to create middlewares using anonymous functions on the fly. (See examples later on in the guide)


```objc
typedef void (^SEGMiddlewareBlock)(SEGContext *_Nonnull context, SEGMiddlewareNext _Nonnull next);

@interface SEGBlockMiddleware : NSObject <SEGMiddleware>
@property (nonnull, nonatomic, readonly) SEGMiddlewareBlock block;

- (instancetype _Nonnull)initWithBlock:(SEGMiddlewareBlock _Nonnull)block;

@end
```


The `context` object encapsulates everything about an event in the stream. You invoke the `next` callback function when the current middleware is done processing the event, and can pass the processed event down to the next middleware in the chain.

The `SEGContext` object is not very information rich by itself. Typically you must use `eventType`  and `payload` to get more information about an event.

```objc
@interface SEGContext : NSObject <NSCopying>

@property (nonatomic, readonly, nonnull) SEGAnalytics *_analytics;
@property (nonatomic, readonly) SEGEventType eventType;

@property (nonatomic, readonly, nullable) NSString *userId;
@property (nonatomic, readonly, nullable) NSString *anonymousId;
@property (nonatomic, readonly, nullable) NSError *error;
@property (nonatomic, readonly, nullable) SEGPayload *payload;
@property (nonatomic, readonly) BOOL debug;

- (instancetype _Nonnull)initWithAnalytics:(SEGAnalytics *_Nonnull)analytics;

- (SEGContext *_Nonnull)modify:(void (^_Nonnull)(id<SEGMutableContext> _Nonnull ctx))modify;

@end
```


Look at the `SEGEventType` carefully, and notice that middleware can handle `track` , `identify` and other Segment analytics APIs. Even calls like `reset` , `flush` and `openURL` go through and can be processed by the middleware pipeline.


```objc
typedef NS_ENUM(NSInteger, SEGEventType) {
    // Should not happen, but default state
    SEGEventTypeUndefined,
    // Core Tracking Methods
    SEGEventTypeIdentify,
    SEGEventTypeTrack,
    SEGEventTypeScreen,
    SEGEventTypeGroup,
    SEGEventTypeAlias,

    // General utility
    SEGEventTypeReset,
    SEGEventTypeFlush,

    // Remote Notification
    SEGEventTypeReceivedRemoteNotification,
    SEGEventTypeFailedToRegisterForRemoteNotifications,
    SEGEventTypeRegisteredForRemoteNotifications,
    SEGEventTypeHandleActionWithForRemoteNotification,

    // Application Lifecycle
    SEGEventTypeApplicationLifecycle,

    // Misc.
    SEGEventTypeContinueUserActivity,
    SEGEventTypeOpenURL,
};
```


In Objective C, the most classes are prefixed with `SEG`. In swift, this

There are almost as many `SEGPayload` subclasses as there are `SEGEventType` enums. Subclassed payloads may contain call specific information, For example, the `SEGTrackPayload` contains `event` as well as `properties` .

```objc
@interface SEGTrackPayload : SEGPayload

@property (nonatomic, readonly) NSString *event;

@property (nonatomic, readonly, nullable) NSDictionary *properties;

@end
```


Finally, to use a middleware, you must provide it to the `SEGAnalyticsConfiguration` object prior to the initialization of `SEGAnalytics`.


```objc
@interface SEGAnalyticsConfiguration : NSObject

/**
 * Set custom source middleware. Will be run before all integrations
 */
@property (nonatomic, strong, nullable) NSArray<id<SEGMiddleware>> *sourceMiddleware;

/**
 * Set custom destination middleware. Will be run before the associated integration for a destination.
 */
@property (nonatomic, strong, nullable) NSArray<SEGDestinationMiddleware *> *destinationMiddleware;

// ...
@end
```



Once initialized, the list of middleware used in `SEGAnalytics` cannot be changed.

## Middlewares Examples

The following examples are written in Swift to show that the middleware API works just as well in Swift as in Objective-C.


#### Initialize middleware

The following example shows how to initialize middleware.

{% codeexample %}
{% codeexampletab Swift %}

```swift
let mixpanelIntegration = SEGMixpanelIntegrationFactory.instance()
let amplitudeIntegration = SEGAmplitudeIntegrationFactory.instance()
let config = SEGAnalyticsConfiguration(writeKey: "YOUR_WRITEKEY_HERE")
config.trackApplicationLifecycleEvents = true
config.trackDeepLinks = true
config.recordScreenViews = true
config.use(mixpanelIntegration)
config.use(amplitudeIntegration)

config.sourceMiddleware = [
    turnScreenIntoTrack,
    enforceEventTaxonomy,
    customizeAllTrackCalls,
    blockScreenCallsToAmplitude,
]
config.destinationMiddleware = [
    SEGDestinationMiddleware(key: mixpanelIntegration.key(), middleware: [sampleEventsToMixpanel]),
    SEGDestinationMiddleware(key: amplitudeIntegration.key(), middleware: [customizeAmplitudeTrackCalls])
]
SEGAnalytics.setup(with: config)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
// TODO - objc sample here?
```
{% endcodeexampletab %}
{% endcodeexample %}


#### Change event names and add attributes

The following examples show how to changing event names, and add custom attributes.

{% codeexample %}
{% codeexampletab Swift %}

```swift
let customizeAllTrackCalls = SEGBlockMiddleware { (context, next) in
    if context.eventType == .track {
        next(context.modify { ctx in
            guard let track = ctx.payload as? SEGTrackPayload else {
                return
            }
            let newEvent = "[New] \(track.event)"
            var newProps = track.properties ?? [:]
            newProps["customAttribute"] = "Hello"
            ctx.payload = SEGTrackPayload(
                event: newEvent,
                properties: newProps,
                context: track.context,
                integrations: track.integrations
            )
        })
    } else {
        next(context)
    }
}
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
// TODO - objc sample here?
```
{% endcodeexampletab %}
{% endcodeexample %}



#### Change a call type

The following example turns one kind call into another


{% codeexample %}
{% codeexampletab Swift %}
```swift
let turnScreenIntoTrack = SEGBlockMiddleware { (context, next) in
    if context.eventType == .screen {
        next(context.modify { ctx in
            guard let screen = ctx.payload as? SEGScreenPayload else {
                return
            }
            let event = "\(screen.name) Screen Tracked"
            ctx.payload = SEGTrackPayload(
                event: event,
                properties: screen.properties,
                context: screen.context,
                integrations: screen.integrations
            )
            ctx.eventType = .track
        })
    } else {
        next(context)
    }
}
```

{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
// TODO - objc sample here?
```
{% endcodeexampletab %}
{% endcodeexample %}


#### Block specific events

The following example completely blocks specific events from a list.


{% codeexample %}
{% codeexampletab Swift %}
```swift
let   = SEGBlockMiddleware { (context, next) in
    let validEvents = [
        "Application Opened",
        "Order Completed",
        "Home Screen Tracked",
        "AnalyticsIOSTestApp. Screen Tracked",
    ]
    if let track = context.payload as? SEGTrackPayload {
        if !validEvents.contains(track.event) {
            showAlert(title: "Dropping Rogue Event",
                      message: track.event)
            return
        }
    }
    next(context)
}
```

{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
// TODO - objc sample here?
```
{% endcodeexampletab %}
{% endcodeexample %}


#### Block specific call types to a specific destination

The following example blocks only screen calls from reaching the Amplitude destination.


{% codeexample %}
{% codeexampletab Swift %}
```swift
let blockScreenCallsToAmplitude = SEGBlockMiddleware { (context, next) in
    if let screen = context.payload as? SEGScreenPayload {
        next(context.modify { ctx in
            ctx.payload = SEGScreenPayload(
                name: screen.name,
                properties: screen.properties,
                context: screen.context,
                integrations: ["Amplitude": false]
            )
        })
        return
    }
    next(context)
}
```

{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
// TODO - objc sample here?
```
{% endcodeexampletab %}
{% endcodeexample %}


#### Sample events to a destination

The following example records a random selection of events sent to the Mixpanel device-mode destination.

{% codeexample %}
{% codeexampletab Swift %}
```swift
let sampleEventsToMixpanel = SEGBlockMiddleware { (context, next) in
    if let track = context.payload as? SEGTrackPayload {
        let numberBetween0To4 = arc4random() % 5
        if numberBetween0To4 != 0 {
            return
        }
    }
    next(context)
}
```

{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
// TODO - objc sample here?
```
{% endcodeexampletab %}
{% endcodeexample %}



#### Add a custom attribute for a specific destination

The following example adds a custom attribute to the `context` object when sending data to Amplitude in device-mode.

{% codeexample %}
{% codeexampletab Swift %}
```swift
let customizeAmplitudeTrackCalls = SEGBlockMiddleware { (context, next) in
    if context.eventType == .track {
        next(context.modify { ctx in
            guard let track = ctx.payload as? SEGTrackPayload else {
                return
            }
            let newEvent = "[Amplitude] \(track.event)"
            var newProps = track.properties ?? [:]
            newProps["customAttribute"] = "Sausage"
            ctx.payload = SEGTrackPayload(
                event: newEvent,
                properties: newProps,
                context: track.context,
                integrations: track.integrations
            )
        })
    } else {
        next(context)
    }
}
```

{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
// TODO - objc sample here?
```
{% endcodeexampletab %}
{% endcodeexample %}


### Braze Middleware

If you use the Braze (Appboy) destination in either [cloud or device mode](/docs/connections/destinations/#connection-modes) you can save Braze costs by "debouncing" duplicate Identify calls from Segment by adding the [open-source Middleware tool](https://github.com/segmentio/segment-braze-mobile-middleware) to your implementation. More information about this tool and how it works [is available in the project's README](https://github.com/segmentio/segment-braze-mobile-middleware/blob/master/README.md#how-does-this-work).
