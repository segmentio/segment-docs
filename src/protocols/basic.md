---
title: The Segment Basic Tracking Plan
---

( to be reviewed by PMM )
With Segment, you can track the myriad events that are important to your organization the way you want to track them - the possibilities are endless. But when you're just getting started, what do you track first? Over the years, we've helped countless organizations think through what they need to track, and recommended the best way to do it. Now, with (TODO: Public facing product name), you can start out strong by tracking some common Track events.

With (TODO: Public facing product name) Segment you can choose from the most common Events, and create a custom tracking plan for your workspace. Tracking plans help you and other people working in your organization to understand what data you're tracking, under what names, and which additional data (properties) are attached to each event type.

This is a great way to get a head start on your tracking, and also to monitor your events as you implement your Segment tracking.
 ( TODO this is not finished )


## Set up a basic Segment tracking plan
TODO: Prereqs? How to invoke?

The first page shows the Segment Standard Events, organized by their industry spec. Click each industry or use case to see and select properties from that group.

- choose a "spec" based on your industry/type of website
you might want to check through them all for relevant events, just in case.
- select the events you want to use from the menu. you can also search if you know a specific event name you know you want to track.
- don't see an event you want? contact us (TODO how?)

(TODO: do we add custom properties here, or later?)

click **Next**.

The next screen shows you the properties each Event has. Properties are how you enrich the raw event data with useful context, which allows you to perform useful analysis and alerting. These standard events have a minimal standard set of properties, based on what we know about the event type and use. You can add extra custom properties later.

Expand each event to view its properties. If you decide you want to add or remove Events, click **Previous** to go back to the event list. When you're satisfied that you've selected Events for all of the activities on your site that appear in the standard events, click **Add**.

(TODO: if this step is just review, )

When you click Add, Segment adds the events you selected to your Tracking Plan, and begins watching for data from any Sources connected to that workspace formatted as those Events.

## Customize Properties

(TODO - idk how this works, can't figure it out from Figma)

## Monitor your Segment data flow

(TODO: explain the TP overview columns)

## Implementing using your tracking plan

If you haven't yet implemented Segment tracking in your app or site, there are three easy ways to use the Tracking Plan to set up your implementation:

- **If you use Analytics.js and the [Visual Tagger](https://segment.com/docs/connections/sources/visual-tagger/)**, Segment loads your tracking plan so that you can simply tag the elements in your website with the Events that they should trigger.

- You can click the **...** menu for each Event in the tracking plan to download code snippets (TODO: for each source in the workspace...? AJS only? how do we determine what format the snippet is in?)) which you can paste into your site or app code. (TODO: confirm since I've never seen one of these snippets) You can replace the example properties in these snippets with variables from your code.)
- **If you are using [Typewriter](https://segment.com/docs/protocols/apis-and-extensions/typewriter/)**, you can export your tracking plan to a format Typewriter can use. (TODO: probably want more docs around compatibility and format here, and i need to validate the processs)


## FAQ

### Can I track Page, Identify, or Group calls with the basic tracking plan?

No. The Basic tracking plan only tracks Events. If you need to track other types of calls, consider Protocols.

### How do I disconnect a source?

You don't. :) (TODO explain why)
