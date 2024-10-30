---
title: Event-Triggered Journeys
plan: engage-foundations
---

With Event-triggered Journeys, you can build real-time, event-based marketing workflows to automate and personalize customer journeys. 

Unlike traditional audience-based journeys that rely on pre-defined user segments, these journeys start automatically when users perform specific actions on your website or app.

On this page, you'll learn how to create an Event-triggered Journey, configure entry conditions, and apply best practices.

## Overview

Event-triggered Journeys help you create a responsive approach for time-sensitive use cases, like cart abandonment campaigns and transactional messages. Where audience-based journeys activate based on aggregated conditions, Event-triggered Journeys respond instantly to individual events, delivering personalized experiences based on the full context of each event.

Opt for an event-triggered journey in situations like these:

- When campaigns require real-time action in response to user behavior.
- For transactional messages (like receipts and confirmations) that require specific event-based triggers.
- In abandonment campaigns where a follow-up is needed if a corresponding completion event doesn’t occur.

## Build an Event-triggered Journey

Before you begin building an Event-triggered Journey, make sure that:

- You've enabled all [destinations](/docs/connections/destinations/) intended for event delivery in [Connections](/docs/connections/).
- The events you want to use as triggers are already available in your Segment workspace.

To set up an Event-triggered Journey:

1. In your Segment workspace, navigate to **Engage > Journeys**, then click **+ Create journey**.
2. On the **Create journey** page, select **User performs an event**, then click **Next**.
3. Give your new journey a name and, optionally, a description.
4. Select entry event:
   - Choose the event that will trigger user entry into the journey.
   - (Optional:) Apply filters based on event property values to refine entry conditions. For example, enter only if `{property} = value A, value B, or value C`.
5. Configure entry rules:
   - **Re-enter every time event occurs** (default): Users enter the journey each time they trigger the specified event.
   - **Enter one time**: Users enter the journey once only, regardless of repeated event triggers.
6. **If you chose Re-enter every time event occurs in Step 5**, select a unique identifier. 
7. Configure event delivery to destinations by selecting a destination or setting up a custom destination function.
8. Preview the contextual payload that Segment will send to your destination(s).
9. After you've finished setting up your journey, click **Publish**, then click **Publish** again in the popup.