---
title: Live Plugins
strat: swift
---

Live Plugins let you modify analytics events in real time, directly on user devices, without rebuilding or redeploying your app. They’re JavaScript snippets that you publish from your Segment workspace, where they run on your users’ mobile devices to filter or transform data before it’s sent to Segment.

Live Plugins work alongside [Auto-Instrumentation](/docs/connections/auto-instrumentation/) to give you flexible control over your event data. 

On this page, you’ll learn how to set up your mobile app to support Live Plugins, create and deploy custom plugins, and explore examples for common use cases.

> info "Live Plugins is in Public Beta"
> Live Plugins is in public beta for Swift and Kotlin and available to select Business Tier Customers only. To enable this feature for your workspace, contact your CSM.

## Live Plugins overview

You can use JavaScript Live Plugins with Analytics-Swift and Analytics-Kotlin to modify or filter event data directly on user devices. This lets you make real-time updates to your tracking logic without redeploying your app, helping you maintain data quality and consistency across your mobile users.

Because Live Plugins run before data leaves the device, you can apply the same logic to all destinations or target specific destinations as needed.

## Setup

To use Live Plugins, you first need to set up your mobile app with a one-time configuration.

To configure Live Plugins:

1. Include [Analytics-Live for Swift plugin](https://github.com/segment-integrations/analytics-swift-live){:target="_blank"}
 and [Analytics-Live for Kotlin](https://github.com/segment-integrations/analytics-kotlin-live){:target="_blank"}
 in your project.
2. Add the plugin to your instance of Analytics, using the following code:

{% codeexample %}
{% codeexampletab Swift %}
```swift
// Import the live plugin
import AnalyticsLive
// Instantiate Analytics
// Add LivePlugins to Analytics
analytics.add(plugin: LivePlugins(null))
```
{% endcodeexampletab %}

{% codeexampletab Kotlin %}
```kotlin
// Import the live plugin
import com.segment.analytics.plugins.livePlugin
// Instantiate analytics
// Add LivePluginsto Analytics
analytics.add(LivePlugins())
```
{% endcodeexampletab %}
{% endcodeexample %}

After you've completed setup, you can deploy your apps to the Apple App Store and Google Play Store. You can then add new JavaScript plugin code to your mobile apps through the Segment website, and perform updates as often as needed.

## Create your own Live Plugin

To access Live Plugins for your Swift and Kotlin sources:

1. Navigate to Connections > Sources.
2. Select your Swift or Kotlin source (or create a new one).
3. From the Source's overview, select the Live Plugin tab
<img alt="Access Live Plugins from the Source overview tab" src="https://github.com/user-attachments/assets/e228bddb-4cb8-4469-9ac6-8a2c322edcbc" />

Follow the steps in this section to create and deploy your own Live Plugin.

### 1. Subclass the `LivePlugin` class

To create your own live plugin, you'll start by subclassing the `LivePlugin` class and overloading one (or more) of the event-related functions.

For example, suppose you want to correct a field-naming inconsistency in your event data:

```js
// This UserIdLivePlugin corrects a naming inconsistency in the event data by renaming "user_id" to "userId."

class UserIdLivePlugin extends LivePlugin {
   // The execute function is called for every event.
   execute(event) {
       // Correct the field naming inconsistency from "user_id" to "userId."
       event.userId = event.user_id;
       delete event.user_id;
       return event;
   }
}

// Add the UserIdLivePlugin to the Analytics instance without specifying a target destination (null).
analytics.add(new UserIdLivePlugin(LivePluginType.enrichment, null));
```

In this example, you've created a `UserIdLivePlugin` by subclassing `LivePlugin` and implementing the `execute()` function. This function gets applied to every event.

### 2. Add your Live Plugin to the Analytics instance

After you define your custom Live Plugin, you need to add it to the Analytics instance. The Analytics object is globally accessible, and you can use the `add()` method to include your Live Plugin. 

When you adding a new instance, you specify the `LivePluginType` and the destination to which it applies, or use null to apply it to all destinations.

Here's how you can add the `UserIdLivePlugin` to your Analytics instance:

```js
analytics.add(new UserIdLivePlugin(LivePluginType.enrichment, "adobe"));
```

### 3. Use the `LivePluginType` enums

To control when your custom Live Plugin runs during the event lifecycle, you can use `LivePluginType` enums, which define different timing options for your Live Plugin. Here are the available types:

```js
const LivePluginType = {
   before: "before",
   enrichment: "enrichment",
   after: "after",
   utility: "utility"
}
```

With these enums, you can select the timing that best fits your custom Live Plugin's target use case. These types align with categories used for Native Plugins.

## Live Plugin examples

The following live plugin examples address common use cases:

{% codeexample %}

{% codeexampletab Anonymize events %}
```js

// This PrivacyLivePlugin anonymizes events by removing user IDs and device IDs

class PrivacyLivePlugin extends LivePlugin {
   // The execute function is called for every event.
   execute(event) {
       // Remove the user ID and device ID from the event to anonymize it.
       event.userId = null;
       delete event.context.device.id;
       return event;
   }
}

analytics.add(new PrivacyLivePlugin(LivePluginType.Enrichment, null));
```
{% endcodeexampletab %}

{% codeexampletab Drop events %}
```js
// This DropEventsLivePlugin filters and drops all events targeted for a specific destination.

class DropEventsLivePlugin extends LivePlugin {
   // The execute function is called for every event.
   execute(event) {
       // Drop all events by returning null.
       return null;
   }
}

// Add the DropEventsLivePlugin to the Analytics instance, applying it only to the Adobe destination.

analytics.add(new DropEventsLivePlugin(LivePluginType.Enrichment, "adobe"));

```
{% endcodeexampletab %}

{% codeexampletab Modify events %}
```js
// This UserIdLivePlugin corrects a naming inconsistency in the event data by renaming "user_id" to "userId."

class UserIdLivePlugin extends LivePlugin {
   // The execute function is called for every event.
   execute(event) {
       // Correct the field naming inconsistency from "user_id" to "userId."
       event.userId = event.user_id;
       delete event.user_id;
       return event;
   }
}

// Add the UserIdLivePlugin to the Analytics instance without specifying a target destination (null).
analytics.add(new UserIdLivePlugin(LivePluginType.enrichment, null));
```
{% endcodeexampletab %}

{% codeexampletab Down sample events %}
```js
// This DownSampleLivePlugin down-samples events to reduce overall traffic.

class DownSampleLivePlugin extends LivePlugin {
   // Edge Functions can maintain internal state and persist in memory after startup.
   // They're cleared when the app is terminated or analytics.reset() is called.
   counter = 0
    // The execute function is called for every event.
   execute(event) {
      // Check if the event count is divisible by 10 (that is, every tenth event).
       if (counter++ % 10 == 0) {
         return event
       } else {
          // Drop 90% of event traffic by returning null for non-selected events.
         return null
       }
   }
}


analytics.add(new DownSampleLivePlugin(LivePluginType.enrichment, null))
```
{% endcodeexampletab %}

{% codeexampletab Chain multiple functions %}
```js
// The UserIdLivePlugin corrects a field naming inconsistency by renaming "user_id" to "userId."

class UserIdLivePlugin extends LivePlugin {
   // The execute function is called for every event.
   execute(event) {
       // Correct the field naming inconsistency from "user_id" to "userId."
       event.userId = event.user_id;
       delete event.user_id;
       return event;
   }
}

// This DownSampleLivePlugin down-samples events to reduce overall traffic.

class DownSampleLivePlugin extends LivePlugin {
   // LivePlugins can maintain internal state, persisting in memory after startup.
   // They are cleared when the app is terminated or when analytics.reset() is called.
   counter = 0;

   // The execute function is called for every event.
   execute(event) {
      // Check if the event count is divisible by 3 (that is, every third event).
      if (this.counter++ % 3 === 0) {
         return event; // Keep this event.
      } else {
         // Drop 66% of event traffic by returning null for non-selected events.
         return null;
      }
   }

   // The reset function resets the counter when the Analytics instance is reset.
   reset() {
      this.counter = 0;
   }
}

// Chain both live plugins to the Analytics instance.
analytics.add(new UserIdLivePlugin(LivePluginType.enrichment, null));
analytics.add(new DownSampleLivePlugin(LivePluginType.enrichment, null));

```

{% endcodeexampletab %}
{% endcodeexample %}

## Live Plugins API

Live Plugins expose an interface that lets you intercept Segment events and modify their data. This interface includes several functions that you can implement for custom behavior:

```js
// Interface for Live Plugins:
class LivePlugin {
   // Event callbacks
   execute(event): event
   identify(event): event
   track(event): event
   group(event): event
   alias(event): event
   screen(event): event

   // Called when the Analytics instance is being reset.
   reset() { }
}
```

### Event callbacks

This section covers the primary event callbacks.

#### The `execute` callback

The `execute` callback function serves as the primary entry point for Live Plugins to intercept and modify events. When you implement the `execute` function in your plugin, you can decide whether to keep the event by returning it or drop it by returning `null`. 

This callback is versatile, as you can use it for various event types when the event type itself is not critical. Additionally, `execute` lets you invoke more specific callbacks based on the event type.

| Callback                | Description |
| ----------------------- | ----------- |
| `execute(event): event` | Called for every event. Must return the event or `null` to drop it. If you do return the event, then the more specific callback based on the event type is called. Use this callback if the event type isn't important. Additionally, you can call `super.execute()` to use one of the event type callbacks for Track, Identify, Screen, Group, or Alias calls.  |

#### Additional event callbacks

The following callback functions are designed for specific event types and let you control event modification:

| Callback          | Description                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `track(event)`    | Called for a tracking event. Must return the event to keep it or return `null` to drop it.    |
| `identify(event)` | Called for an identify event. Must return the event to keep it or return `null` to drop it. |
| `screen(event)`   | Called for a screen event. Must return the event to keep it or return `null` to drop it.      |
| `group(event)`    | Called for a group event. Must return the event to keep it or return `null` to drop it.       |
| `alias(event)`    | Called for an alias event. Must return the event to keep it or return `null` to drop it.      |

#### Non-event functions

There's one non-event function:

| Function        | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `reset(): null` | Called when the Analytics instance is about to be reset. Nothing to return. | 
