---
title: Middleware for iOS
strat: ios
---



## Middleware
Middleware are a powerful mechanism that can augment the events collected by the SDK. A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor, modify or reject events. Source Middleware are available on `analytics-ios` 3.6.0 and higher. Destination Middleware are available on `analytics-ios` 4.0.0 and higher.

The middleware API is easily accessible in both Objective-C and Swift.

### Usage

Middleware is any Objective-C class that conforms to the following protocol.


{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
@protocol SEGMiddleware
@required
- (void)context:(SEGContext *_Nonnull)context next:(S
EGMiddlewareNext _Nonnull)next;
@end
```
{% endcodeexampletab %}

{% endcodeexample %}



We also provide a block-centric helper class to make it easier to create middlewares using anonymous functions on the fly. (See examples later on in the guide)

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
typedef void (^SEGMiddlewareBlock)(SEGContext *_Nonnull context, SEGMiddlewareNext _Nonnull next);

@interface SEGBlockMiddleware : NSObject <SEGMiddleware>
@property (nonnull, nonatomic, readonly) SEGMiddlewareBlock block;

- (instancetype _Nonnull)initWithBlock:(SEGMiddlewareBlock _Nonnull)block;

@end
```
{% endcodeexampletab %}

{% endcodeexample %}



`context` is an object that encapsulates everything about an event in the stream. `next` is a callback function that should be invoked when the current middleware is done processing the event and can pass the processed event down to the next middleware in the chain.

`SEGContext` object is not very information rich by itself. Typically you must use `eventType`  and `payload` to get more information about an event.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
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
{% endcodeexampletab %}

{% endcodeexample %}


If you look at `SEGEventType` more carefully, you'll realize that middleware is not only capable of handling `track` , `identify` and other normal analytics APIs, even calls like `reset` , `flush` and `openURL` go through and can therefore be processed by the middleware pipeline.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}

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
{% endcodeexampletab %}

{% endcodeexample %}


There are almost as many `SEGPayload` subclasses as there are `SEGEventType` enums. Subclassed payloads may contain call specific information, For example, the `SEGTrackPayload` contains `event` as well as `properties` .

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
```objc
@interface SEGTrackPayload : SEGPayload

@property (nonatomic, readonly) NSString *event;

@property (nonatomic, readonly, nullable) NSDictionary *properties;

@end
```
{% endcodeexampletab %}

{% endcodeexample %}



Finally, to use a middleware, you must provide it to the `SEGAnalyticsConfiguration` object prior to the initialization of `SEGAnalytics`.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// TODO - swift sample here
```
{% endcodeexampletab %}

{% codeexampletab Objective-C %}
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
{% endcodeexampletab %}

{% endcodeexample %}



Once initialized, the list of middleware used in `SEGAnalytics` cannot be changed.

### Examples

The following examples will be written in Swift to demonstrate that the middleware API works just as well in Swift as in Objective-C. To start off, this is what initialization looks like

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


Changing event names and adding custom attributes

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

Turn one kind call into another

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

Completely block events

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

Block only screen calls to amplitude

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

Sample events to Mixpanel device-mode destination

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

Add custom attribute to context for Amplitude device-mode destination

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

### Braze Middleware

If you use the Braze (Appboy) destination in either [cloud or device mode](/docs/connections/destinations/#connection-modes) you can save Braze costs by "debouncing" duplicate `identify()` calls from Segment by adding our [open-source Middleware tool](https://github.com/segmentio/segment-braze-mobile-middleware) to your implementation. More information about this tool and how it works [is available in the project's README](https://github.com/segmentio/segment-braze-mobile-middleware/blob/master/README.md#how-does-this-work).
