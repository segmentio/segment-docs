---
title: Auto-Instrumentation Event Builder
hidden: true
---

The Event Builder provides a no-code way to define analytics events based on signals collected by Auto-Instrumentation. 

You can use it to create Track, Identify, Page, and other event types directly from your Segment workspace.

> info "Auto-Instrumentation Private Beta"
> Auto-Instrumentation is currently in Private Beta and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. Segment is actively iterating on and improving the Auto-Instrumentation user experience.

## Access the Event Builder

The Event Builder appears as a tab within each source, next to the Debugger. If you don't see the Event Builder tab, first confirm that you've installed the required Auto-Instrumentation SDK. If you've installed the SDK but still don't see the Event Builder tab, reach out to your Segment account manager to verify your workspace is included in the Auto-Instrumentation Private Beta.

![The Event Builder tab shown in the navigation bar between Debugger and Schema in a Segment source](images/autoinstrumentation_signals.png)

> info "Event Builder during Private Beta"
> During Private Beta beta, both the Event Builder and the legacy Auto-Instrumentation tab appear in the navigation. Segment will remove the legacy tab once all customers have migrated to the Event Builder experience.

## Generate activity

To see activity in the Event Builder, you need to trigger signals using a custom debug link that Segment provides:

1. In the Event Builder, copy the custom URL shown at the top of the page.
2. Open your website or app using that URL in a browser or mobile device.
3. Try out some typical user actions (like clicking buttons, navigate screens, and triggering network calls).

Segment collects and displays activity as signals. These signals are grouped into types, like:

- Interaction: clicks, taps, and UI interactions.
- Navigation: screen changes and page transitions
- Network: requests and responses
- `LocalData`, Instrumentation, and `UserDefined`: additional signal types from the SDK.

### How signals relate to events

Segment separates signal collection from event creation. Signals represent raw user interactions, like a button click or screen view. Events, on the other hand, are analytics calls you define based on those signals. This two-step process lets you observe user behavior first, and then decide how and when to turn that behavior into structured analytics events, without needing to modify your code.

Signal detection is active for 24 hours after you generate activity. Detected signals are available in the Event Builder for 72 hours.

## Create an event

You can create events by selecting individual signals or combining multiple signals in sequence.

Follow these steps to create an event:

1. Find the signal you want to use and click **Configure event**.
2. Add one or more conditions. The order matters; Segment evaluates them in the order you add them.
   - For example, to track a successful login, first select a **button click** signal, then the **network response** signal.
3. Select properties from the signal(s) to include in your event.
4. Map those properties to your targeted Segment event fields.
5. Name your event. This name will appear in the Debugger and downstream tools.
6. Click **Publish event rules** to activate the event in your workspace.
    - You must publish each rule before Segment starts collecting data for the event.

For example, suppose a user taps an "Add to Cart" button. You can define an `Add to Cart` event by combining the button click signal with a network response signal that includes product details. You can then map properties like product name, ID, and price directly from the network response to your event.

Once published, your event rules appear in the **Event Rules** tab of the Event Builder.  From this tab, you can view all of your published rules and delete rules you no longer need.