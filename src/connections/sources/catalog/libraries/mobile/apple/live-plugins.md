---
title: Live Plugins
strat: swift
---

Live plugins are JavaScript code snippets published to your Segment workspace and then downloaded directly to the mobile devices of end users. Live plugins let you perform real-time modifications to events before they leave the mobile device.

On this page, you'll learn how to set up live plugins and how to create your own live plugins. You'll also see example live plugins that address common use cases.

> info "Live Plugins is in pilot"
> Live Plugins is currently in Pilot and available to select Business Tier Customers only. To enable this feature for your workspace, contact your CSM.

## Live plugins overview

You can use JavaScript live plugins with Analytics-Swift and Analytics-Kotlin to filter and modify data remotely. As a result, you can filter and modify analytics events without having to deploy updates to the app store for each change, ensuring data quality and consistency for all your mobile users.

Because live plugins let you modify event data before it leaves a mobile device, you can use the same function to modify data meant for all your cloud-mode and device-mode destinations. 

## Setup

To use live plugins, you first need to set up your mobile app with a one-time configuration.

To configure live plugins:

1. Include the [Analytics Live for Swift plugin](https://github.com/segment-integrations/analytics-swift-live){:target="_blank"}
 and [Analytics Live for Kotlin plugin](https://github.com/segment-integrations/analytics-kotlin-live){:target="_blank"}
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

After you've completed setup, you can deploy your apps to the Apple App Store and Google Play Store. You can then add new JavaScript plugin code to your mobile apps through the CLI and perform updates as often as needed.

## Live plugin tutorial

This section walks you through a sample live plugin implementation. 

### 1. Write a live plugin in JavaScript

Copy and save the following file, which anonymizes events by removing user IDs and device IDs:

```js
class PrivacyLivePlugin extends LivePlugin {
   // The execute function is called for every event.
   execute(event) {
       // Remove the user ID and device ID from the event to anonymize it.
       event.userId = null;
       delete event.context.device.id;
       return event;
   }
}
```

Note the name of your saved file. You'll need it in the next step.

### 2. Deploy the plugin with the Live Plugin CLI

With your plugin saved, you'll next deploy the plugin with Segment's Live Plugin CLI. Follow these steps:

#### Install the CLI with Homebrew

Run this command to install the Segment CLI:

```shell
$ brew install segment-integrations/formulae/segmentcli
```

#### Authenticate with Segment

Next, you'll authenticate with Segment to give the CLI access to your workspace:

1. Within your Segment workspace, navigate to **Settings > Workspace Settings > Access Management > Tokens**.
2. Click **Create token** to generate a new token with the `Workspace Owner` role. Copy the token.
3. Return to your command line and use your token to authenticate:

    ```shell
    $ segmentcli auth <ProfileName> <AuthToken>
    ```
4. Copy your source's ID. You'll find the Source ID under **Settings > API Keys > Source ID** on your source's page.
7. Use your source ID and live plugin file name to upload your live plugin:

    ```shell
    $ segmentcli liveplugins upload <SourceID> <FileName>
    ```

You've now successfully attached your live plugin(s) to your mobile source. The next time your users launch your app, their Segment SDK will download the latest live plugins, which will run every time new events are generated.

> info ""
> Because the CDN settings object takes a few minutes to rebuild, your live plugins might not be available immediately.

## Create your own live plugin

Follow the steps in this section to create your own live plugin.

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

### 2. Add your live plugin to the Analytics instance

After you define your custom live plugin, you need to add it to the Analytics instance. The Analytics object is globally accessible, and you can use the `add()` method to include your live plugin. 

When you adding a new instance, you specify the `LivePluginType` and the destination to which it applies, or use null to apply it to all destinations.

Here's how you can add the `UserIdLivePlugin` to your Analytics instance:

```js
analytics.add(new UserIdLivePlugin(LivePluginType.enrichment, "adobe"));
```

### 3. Use the `LivePluginType` enums

To control when your custom live plugin runs during event processing, you can use `LivePluginType` enums, which define different timing options for your live plugin. Here are the available types:

```js
const LivePluginType = {
   before: "before",
   enrichment: "enrichment",
   after: "after",
   utility: "utility"
}
```

With these enums, you can select the timing that best fits your custom live plugin's target use case. These types align with categories used for Native Plugins.

## Live plugin examples

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

Live plugins follow an interface that let you intercept Segment events and modify their data. This interface includes several functions that you can implement for custom behavior:

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

The `execute` callback function serves as the primary entry point for live plugins to intercept and modify events. When you implement the `execute` function in your plugin, you can decide whether to keep the event by returning it or drop it by returning `null`. 

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