---
title: Middleware for iOS
strat: ios
---

Middlewares are simple functions invoked by the Segment libraries, which give you a way to add information to the events you collect using the Segment SDKs. They can be used to monitor, modify, or reject events. Source Middleware are available on `analytics-ios` 3.6.0 and later. Destination Middleware are available on `analytics-ios` 4.0.0 and later.

You can access the middleware API in both Objective-C and Swift.

> info ""
> **Note**: Destination-middleware only act on [data sent to destinations in device-mode](/docs/connections/destinations#connection-modes). Since the destination middleware code exists in your app or project, it cannot transform the data sent from the Segment servers to the destination endpoint. 

### Use

Middleware is any Objective-C class that conforms to the following protocol.

```objc
@protocol SEGMiddleware
@required
- (void)context:(SEGContext *_Nonnull)context next:(S
EGMiddlewareNext _Nonnull)next;
@end
```

Segment also provides a block-centric helper class to make it easier to create middlewares using anonymous functions on the fly. (See examples below)


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

{% comment %}
In Objective C, the most classes are prefixed with `SEG`. In Swift, this
{% endcomment %}

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
let config = AnalyticsConfiguration(writeKey: "YOUR_WRITEKEY_HERE")

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

Analytics.setup(with: config)
```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
id<SEGIntegrationFactory> mixpanelIntegration = [SEGMixpanelIntegrationFactory instance];
id<SEGIntegrationFactory> amplitudeIntegration = [SEGAmplitudeIntegrationFactory instance];

SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITEKEY_HERE"];

config.trackApplicationLifecycleEvents = YES;
config.trackDeepLinks = YES;
config.recordScreenViews = YES;

[config use:mixpanelIntegration];
[config use:amplitudeIntegration];

config.sourceMiddleware = @[
    turnScreenIntoTrack,
    enforceEventTaxonomy,
    customizeAllTrackCalls,
    blockScreenCallsToAmplitude,
];

config.destinationMiddleware = @[
    [[SEGDestinationMiddleware alloc] initWithKey:mixpanelIntegration.key middleware:@[sampleEventsToMixpanel]];
    [[SEGDestinationMiddleware alloc] initWithKey:amplitudeIntegration.key middleware:@[customizeAmplitudeTrackCalls]];
];

[SEGAnalytics setupWithConfiguration:config];
```
{% endcodeexampletab %}
{% endcodeexample %}



#### Change event names and add attributes

The following examples show how to changing event names, and add custom attributes.

{% codeexample %}
{% codeexampletab Swift %}

```swift
let customizeAllTrackCalls = BlockMiddleware { (context, next) in
    if context.eventType == .track {
        next(context.modify { ctx in
            guard let track = ctx.payload as? TrackPayload else {
                return
            }
            let newEvent = "[New] \(track.event)"
            var newProps = track.properties ?? [:]
            newProps["customAttribute"] = "Hello"
            ctx.payload = TrackPayload(
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
SEGBlockMiddleware *customizeAllTrackCalls = [[SEGBlockMiddleware alloc] initWithBlock:^(SEGContext * _Nonnull context, SEGMiddlewareNext  _Nonnull next) {
    if ([context.payload isKindOfClass:[SEGTrackPayload class]]) {
        SEGTrackPayload *track = (SEGTrackPayload *)context.payload;
        next([context modify:^(id<SEGMutableContext> _Nonnull ctx) {
            NSString *newEvent = [NSString stringWithFormat:@"[New] %@", track.event];
            NSMutableDictionary *newProps = (track.properties != nil) ? [track.properties mutableCopy] : [@{} mutableCopy];
            newProps[@"customAttribute"] = @"Hello";
            ctx.payload = [[SEGTrackPayload alloc] initWithEvent:newEvent
                                                      properties:newProps
                                                         context:track.context
                                                    integrations:track.integrations];
        }]);
    } else {
        next(context);
    }
}];
```
{% endcodeexampletab %}
{% endcodeexample %}



#### Change a call type

The following example turns one kind call into another.
NOTE: This is only applicable to Source Middleware.


{% codeexample %}
{% codeexampletab Swift %}
```swift
let turnScreenIntoTrack = BlockMiddleware { (context, next) in
    if context.eventType == .screen {
        next(context.modify { ctx in
            guard let screen = ctx.payload as? ScreenPayload else {
                return
            }
            let event = "\(screen.name) Screen Tracked"
            ctx.payload = TrackPayload(
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
SEGBlockMiddleware *turnScreenIntoTrack = [[SEGBlockMiddleware alloc] initWithBlock:^(SEGContext * _Nonnull context, SEGMiddlewareNext  _Nonnull next) {
    if ([context.payload isKindOfClass:[SEGScreenPayload class]]) {
        SEGScreenPayload *screen = (SEGScreenPayload *)context.payload;
        next([context modify:^(id<SEGMutableContext> _Nonnull ctx) {
            NSString *event = [NSString stringWithFormat:@"%@ Screen Tracked", screen.name];
            ctx.payload = [[SEGTrackPayload alloc] initWithEvent:event
                                                        properties:screen.properties
                                                            context:screen.context
                                                    integrations:screen.integrations];
            ctx.eventType = SEGEventTypeTrack;
        }]);
    } else {
        next(context);
    }
}];
```
{% endcodeexampletab %}
{% endcodeexample %}


#### Block specific events

The following example completely blocks specific events from a list.


{% codeexample %}
{% codeexampletab Swift %}
```swift
let dropSpecificEvents = BlockMiddleware { (context, next) in
    let validEvents = [
        "Application Opened",
        "Order Completed",
        "Home Screen Tracked",
        "AnalyticsIOSTestApp. Screen Tracked",
    ]
    if let track = context.payload as? TrackPayload {
        if !validEvents.contains(track.event) {
            print("Dropping Rogue Event '\(track.event)'")
            // not calling next results in an event being discarded
            return
        }
    }
    next(context)
}
```

{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
SEGBlockMiddleware *dropSpecificEvents = [[SEGBlockMiddleware alloc] initWithBlock:^(SEGContext * _Nonnull context, SEGMiddlewareNext  _Nonnull next) {
    NSArray<NSString *> *validEvents = @[@"Application Opened",
                                            @"Order Completed",
                                            @"Home Screen Tracked",
                                            @"AnalyticsIOSTestApp. Screen Tracked"];

    if ([context.payload isKindOfClass:[SEGTrackPayload class]]) {
        SEGTrackPayload *track = (SEGTrackPayload *)context.payload;
        if ([validEvents containsObject:track.event]) {
            NSLog(@"Dropping Rogue Event '%@'", track.event);
            // not calling next results in an event being discarded
            return;
        }
    }
    next(context);
}];
```
{% endcodeexampletab %}
{% endcodeexample %}


#### Block specific call types to a specific destination

The following example blocks only screen calls from reaching the Amplitude destination.


{% codeexample %}
{% codeexampletab Swift %}
```swift
let blockScreenCallsToAmplitude = BlockMiddleware { (context, next) in
    if let screen = context.payload as? ScreenPayload {
        next(context.modify { ctx in
            ctx.payload = ScreenPayload(
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
SEGBlockMiddleware *blockScreenCallsToAmplitude = [[SEGBlockMiddleware alloc] initWithBlock:^(SEGContext * _Nonnull context, SEGMiddlewareNext  _Nonnull next) {
    if ([context.payload isKindOfClass:[SEGScreenPayload class]]) {
        SEGScreenPayload *screen = (SEGScreenPayload *)context.payload;
        next([context modify:^(id<SEGMutableContext>  _Nonnull ctx) {
            ctx.payload = [[SEGScreenPayload alloc] initWithName:screen.name
                                                        properties:screen.properties
                                                            context:screen.context
                                                    integrations:@{@"Amplitude": @NO}];
        }]);
        return;
    }
    next(context);
}];
```
{% endcodeexampletab %}
{% endcodeexample %}


#### Sample events to a destination

The following example records a random selection of events sent to the Mixpanel device-mode destination.

{% codeexample %}
{% codeexampletab Swift %}
```swift
let sampleEventsToMixpanel = BlockMiddleware { (context, next) in
    if let track = context.payload as? TrackPayload {
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
SEGBlockMiddleware *sampleEventsToMixpanel = [[SEGBlockMiddleware alloc] initWithBlock:^(SEGContext * _Nonnull context, SEGMiddlewareNext  _Nonnull next) {
    if ([context.payload isKindOfClass:[SEGTrackPayload class]]) {
        NSUInteger numberBetween0To4 = arc4random() % 5;
        if (numberBetween0To4 != 0) {
            return;
        }
    }
    next(context);
}];
```
{% endcodeexampletab %}
{% endcodeexample %}



#### Add a custom attribute for a specific destination

The following example adds a custom attribute to the `context` object when sending data to Amplitude in device-mode.

{% codeexample %}
{% codeexampletab Swift %}
```swift
// define middleware we'll use for amplitude
let customizeAmplitudeTrackCalls = BlockMiddleware { (context, next) in
    if context.eventType == .track {
        next(context.modify { ctx in
            guard let track = ctx.payload as? TrackPayload else {
                return
            }
            let newEvent = "[Amplitude] \(track.event)"
            var newProps = track.properties ?? [:]
            newProps["customAttribute"] = "Hello"
            ctx.payload = TrackPayload(
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

...

// configure destination middleware for amplitude
let amplitude = SEGAmplitudeIntegrationFactory.instance()
config.use(amplitude)
config.destinationMiddleware = [DestinationMiddleware(key: amplitude.key(), middleware:[customizeAmplitudeTrackCalls])]
```

{% endcodeexampletab %}
{% codeexampletab Objective-C %}

```objc
// define middleware we'll use for amplitude
SEGBlockMiddleware *customizeAmplitudeTrackCalls = [[SEGBlockMiddleware alloc] initWithBlock:^(SEGContext * _Nonnull context, SEGMiddlewareNext  _Nonnull next) {
    if ([context.payload isKindOfClass:[SEGTrackPayload class]]) {
        SEGTrackPayload *track = (SEGTrackPayload *)context.payload;
        next([context modify:^(id<SEGMutableContext> _Nonnull ctx) {
            NSString *newEvent = [NSString stringWithFormat:@"[Amplitude] %@", track.event];
            NSMutableDictionary *newProps = (track.properties != nil) ? [track.properties mutableCopy] : [@{} mutableCopy];
            newProps[@"customAttribute"] = @"Hello";
            ctx.payload = [[SEGTrackPayload alloc] initWithEvent:newEvent
                                                      properties:newProps
                                                         context:track.context
                                                    integrations:track.integrations];
        }]);
    } else {
        next(context);
    }
}];

...

// configure destination middleware for amplitude
id<SEGIntegrationFactory> amplitude = [SEGAmplitudeIntegrationFactory instance];
[config use:amplitude];
config.destinationMiddleware = [SEGDestinationMiddleware alloc] initWithKey:amplitude.key middleware:@[customizeAmplitudeTrackCalls]];
```
{% endcodeexampletab %}
{% endcodeexample %}


### Braze Middleware

If you use the Braze (Appboy) destination in either [cloud or device mode](/docs/connections/destinations/#connection-modes) you can save Braze costs by "debouncing" duplicate Identify calls from Segment by adding the [open-source Middleware tool](https://github.com/segmentio/segment-braze-mobile-middleware) to your implementation. More information about this tool and how it works [is available in the project's README](https://github.com/segmentio/segment-braze-mobile-middleware/blob/master/README.md#how-does-this-work).
