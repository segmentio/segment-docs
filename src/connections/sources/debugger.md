---
title: Using the Source Debugger
---

The Debugger is a real-time tool that lets you quickly confirm that API calls you make from your website, mobile app, or servers are arriving to your Segment Source. When using the Debugger, you can make sure that everything is being sent just as you anticipated without having to wait for any sort of data processing, so getting set up with Segment is even quicker.

![](images/debugger_view.png)

The Debugger is separate from your data pipeline and is not an exhaustive view of all the events ever sent to Segment. The Debugger will only show a sample of the events that the Source is receiving in real time, capping at 500 events. The Debugger is a great tool to use to validate that events are successfully firing and arriving to your Source when testing specific implementations. If you would like to get a more completed view of all your events, we recommend setting up either a [warehouse](/docs/guides/general/what-is-a-warehouse/) or an [S3 destination](/docs/destinations/amazon-s3/).

You can search the Debugger to find a specific payload using any information that may be available in the raw payload of an event. You can also apply several advanced search options, such as a specific event. The Debugger shows a live stream of sampled events arriving into the Source, but you can also pause the stream from displaying new events by toggling "Live" to "Pause". Events will continue to arrive to your Source while you Pause the stream.

![](images/debugger_search.png)

There are also two views when viewing a payload:

* The **Pretty view** is a recreation of the API call you made that was fired to Segment.
* The **Raw view** is the complete JSON object we receive from the calls that customers send to us. These calls include all the details about what is being tracked: timestamps, properties, traits, ids, and [contextual information Segment automatically collects](/docs/connections/spec/common/#context-fields-automatically-collected) the moment the data is sent.
