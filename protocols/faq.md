---
title: 'Protocols: FAQ'
sidebar: FAQ
---

## Why can't I use the Schema to filter my events?
The schema functionality is a reactive way to clean up your data, where the Tracking Plan functionality is a proactive, intentional way to clean and unify all future data. We've found that the best data driven companies invest the time required to build strong processes and controls around their data. The investment pays off exponentially.

That being said, there are plenty of scenarios where the reactive Schema functionality solves immediate needs for customers. Often times, customers will use both Schema Controls and Tracking Plan functionality across their Segment Sources. For smaller volume Sources with less important data, the Schema functionality often works perfectly.

## Do I need to add a Page Viewed event to my tracking plan?
Yes. To consolidate the views in the Schema tab, we auto-convert `analytics.page()` calls into `Page Viewed` events that show up in the Schema Events view. We recommend adding a `Page Viewed` event to your Tracking Plan with any properties you wish to validate against. At this time, you cannot validate that a specific named page (`analytics.page('Homepage')`) has a specific set of required properties.

## How can I get notified when someone makes a change to my tracking plan?
Users can subscribe via email to a variety of Protocols specific alerts via the workspace Activity Feed settings. To enable, visit your workspace Settings > Activity Feed Settings > Protocols.

You can also forward alerts to a Segment source and send them to any cloud mode Segment destination that accepts `analytics.track()` calls. Most customers forward these activity feed events to a data warehouse for analysis.

![](images/activity_feed.png)

## How can I see who made changes to my Tracking Plan?
Each Tracking Plan includes a Changelog which shows which changes were made by which users. To view it, open a Tracking Plan, click the **...** button (also known as the dot-dot-dot, or ellipses menu) next to the Edit Tracking Plan button, and click **View Changelog**.

## How many Sources can I connect to a Tracking Plan?
The Tracking Plan to Source relationship is a one-to-many relationship. Therefore, you can connect as many Sources as you’d like to a Tracking Plan. As a best practice, we recommend connecting 1-3 Sources per Tracking Plan. The reason for this is that it’s rare to have more than 3 Sources that share the identical set of events, especially when tracking events across platforms. For example, many of our mobile SDKs (iOS and Android) automatically collect events that would not make sense to collect in a web app. We recommend against including events in a Tracking Plan that would never be tracked in a Source.

## Can I duplicate a Tracking Plan within the UI?
Duplicating Tracking Plans within the Segment App is not currently supported. Instead, we recommend using the [Tracking Plan API](/docs/protocols/apis-and-extensions/) to copy the underlying JSON schema from one Tracking Plan into another. Our [Google Sheets uploader](https://docs.google.com/spreadsheets/u/1/d/1ZHGfNrCxBQbEyevmVxNoU0DGjb8cJMro1iwIRZLWjPw/copy) can also be used to duplicate events from one Tracking Plan into another.

## How do I get notified when new violations are generated? Can I create custom violation notifications?
To receive a daily digest of current and new violations, please email protocols(at)segment.com with a link to your workspace and preferred email address(es) to deliver the violation email summaries to. You can also enable [violation event forwarding](/docs/protocols/tracking-plan/#violation-forwarding) to start delivering violations as `.track()` calls to a Segment Source. From there, you can forward the events to any Segment destination that accepts `.track()` calls.

## If I enable blocking, what happens to the blocked events? Are events just blocked from specific Destinations or the entire Segment pipeline?
Blocked events are blocked from sending to all Segment Destinations, including warehouses and streaming Destinations. When an Event is blocked using a Tracking Plan, it does not count towards your MTU limit. They will however count toward your MTU limit if you enable [blocked event forwarding](/docs/protocols/tracking-plan/#blocked-event-forwarding) in your Source settings.

## Do blocked and discarded events count towards my MTU counts?
Blocked events will not count towards your MTU counts as long as blocked event forwarding is disabled.

## How do I handle versioning with mobile apps?
We currently support the ability to [create multiple versions of an event](/docs/protocols/tracking-plan/#tracking-plan-event-versioning) within a Tracking Plan. This is ideal for mobile apps, where a breaking change like adding a new required property to an event could cause all previous app versions out in the wild on user devices to generate violations. You must manually add a `context.protocols.event_version` property to the specific track call so that we can correctly validate the event against the defined version. You can learn more about [setting up Tracking Plan event versioning here](/docs/protocols/tracking-plan/#tracking-plan-event-versioning).

## How do I handle null property values?
In the Tracking Plan editor, click on the data type dropdown for a given property and toggle "Allow Null Values". Enabling null values means both the specified data type and `null` will be accepted as values for that property.

## Can I group specific events in a Tracking Plan?
Yes. [Tracking Plan Labels](/docs/protocols/tracking-plan/#add-a-label) are an excellent way to organize events in a Tracking Plan by priority, platform, product, or similar metadata for each event.

## How do I send someone a specific event or group of events to implement?
You can search within a Tracking Plan to find a specific event, and then copy the URL for the search results page and share it. You can also filter by label to share a group of events. The person you send the URL to must have access to the Workspace and tracking plan to see the results page. (See [the Access Management documentation](/docs/iam/) for more details.)

## Can I create a master Tracking Plan that supersedes all other Tracking Plans?
We do not currently offer the ability to create a master Tracking Plan with parent-child relationships.
