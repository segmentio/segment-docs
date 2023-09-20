---
title: Protocols Frequently Asked Questions
---

{% include content/plan-grid.md name="protocols" %}


## Protocols Notifications

### How can I subscribe to Protocols notifications?

You can subscribe to a variety of Protocols specific alerts through the workspace Activity Feed settings. To subscribe, visit your workspace **Settings** > **User Preferences** > **Activity Notifications** > **Protocols**.

### How can I get notified when someone makes a change to my tracking plan?

You can forward notifications from Protocols to a new Segment source, which can then send them to notification tools such as Slack webhook. 

You can also forward these Protocols alerts to any (cloud-mode) Segment destination that accepts Track calls, including data warehouses. Most customers record these activity feed events to a data warehouse for analysis.

### How do I get notified when new violations are generated? Can I create custom violation notifications?

You can enable [violation event forwarding](/docs/protocols/validate/forward-violations/) to start delivering violations as Track calls to a Segment source. From there, you can forward the events to any Segment destination that accepts Track calls. 

You can also use the Slack Actions destination to set event triggers for context fields, meaning events with violations are sent as Track calls directly from the source.


## Protocols Tracking Plan

### How do I add Page and Screen events to my Tracking Plan?

To consolidate the views in the Schema tab, Segment automatically converts `page` and `screen` calls into `Page Viewed` and `Screen Viewed` events that appear in the Schema Events view. Segment recommends adding a `Page Viewed` or `Screen Viewed` event to your Tracking Plan with any properties you want to validate against. At this time, to validate that a specific named page/screen (`analytics.page('Homepage') | analytics.screen('Home')`) has a specific set of required properties, you will need to use the [JSON Schema](/docs/protocols/tracking-plan/create/#edit-underlying-json-schema).

### How can I see who made changes to my Tracking Plan?

Each Tracking Plan includes a Changelog, which shows which changes were made by which users. To view it, open a Tracking Plan, click the **...** button (also known as the dot-dot-dot, or ellipses menu) next to the Edit Tracking Plan button, and click **View Changelog**.

### How many Sources can I connect to a Tracking Plan?

The Tracking Plan to Source relationship is a one-to-many relationship. This means you can connect as many Sources to a Tracking Plan as you need. However Segment recommends connecting 1-3 Sources per Tracking Plan, because it's rare to have more than three Sources that share an identical set of events, especially when tracking events across platforms. For example, many Segment mobile SDKs (iOS and Android) automatically collect events that would not make sense to collect in a web app. Segment doesn't recommend including events in a Tracking Plan that would never be tracked in a Source.

### Can I duplicate a Tracking Plan in the Segment UI?

You can duplicate Tracking Plans in the Segment web app by following the [instructions to copy a tracking plan](/docs/protocols/tracking-plan/create/#copy-a-tracking-plan). You can also use the [Public API](/docs/protocols/apis-and-extensions/) to copy the underlying JSON schema from one Tracking Plan to another.

### How do I handle versioning with mobile apps?

Segment currently supports the ability to [create multiple versions of an event](/docs/protocols/tracking-plan/create/#tracking-plan-event-versioning) in a Tracking Plan. This is ideal for mobile apps, where a breaking change like adding a new required property to an event could cause all previous app versions on user devices to generate violations. You must manually add a `context.protocols.event_version` property to the specific track call so that Segment can correctly validate the event against the defined version. Learn more in the [Tracking Plan event versioning documentation](/docs/protocols/tracking-plan/create/#tracking-plan-event-versioning).

### How do I handle null property values?

In the Tracking Plan editor, click on the data type dropdown for a given property and toggle "Allow Null Values". Enabling null values means both the specified data type and `null` will be accepted as values for that property.

### Can I group specific events in a Tracking Plan?

Yes. [Tracking Plan Labels](/docs/protocols/tracking-plan/create/#add-a-label) are an excellent way to organize events in a Tracking Plan by priority, platform, product, or similar metadata for each event.

### How do I send someone a specific event or group of events to implement?

You can search in a Tracking Plan to find a specific event, and then copy the URL for the search results page and share it. You can also filter by label to share a group of events. The person you send the URL to must have access to the Workspace and tracking plan to see the results page. (See [the Access Management documentation](/docs/segment-app/iam/) for more details.)

### Can I create a master Tracking Plan that supersedes all other Tracking Plans?

Yes. [Tracking Plan Libraries](/docs/protocols/tracking-plan/libraries/) makes it easy to create groups of events or properties that can be easily imported into multiple Tracking plans.

### Can I copy a Tracking Plan into a library?

No. Unfortunately it's not yet possible to automatically transfer events from a Tracking Plan to Libraries. To import events into a new event library, import them directly from a source.

### Can I transfer a Tracking Plan between production and staging environments?

Yes. Using the [Public API](/docs/protocols/apis-and-extensions/), you can copy the underlying JSON schema from a Tracking Plan in one Workspace to a Tracking Plan in another Workspace. 

If you [discarded events](/docs/protocols/enforce/schema-configuration) as a part of your original Tracking Plan, you must connect to the same Source and configure identical Schema Controls in your other Workspace so that blocked events behave as expected.

### Can I connect a Source to more than one Tracking Plan?

Unfortunately, Sources cannot be connected to more than one Tracking Plan. If you were able to connect more than one Tracking Plan to a Source, it could create conflict if events overlapped. 

### How do Tracking Plans work?

Segment's code uses built-in logic to verify if an event exists in the Tracking Plan. If an event does not exist, it will follow the configuration the [Schema Configuration settings](/docs/protocols/enforce/schema-configuration/) for each source connected to the Tracking Plan.

### Why are my unplanned properties still getting sent to my destinations even though I've set the dropdown to "Omit Properties"?

Unplanned property omission is only supported for cloud-mode destinations. Unplanned properties will not be omitted when they're sent to device-mode destinations.

### Why do I have to different Tracking Plan IDs?

When you access a Tracking Plan, you'll come across two IDs: tp_ and rs_:

If you are using Public API, copy the ID that starts with "tp". 

If you are using Config API, copy the ID that starts with "rs". 

*Please be aware that depending on how you access your tracking plan will depend on the slug that is presented in the URL.*

## Protocols Validation

### What is the difference between Violations Emails and the Violations page in the Segment UI?

**Violations Daily Digest**
The Violations Daily Digest is a great way to keep informed of new violations that might be easy to overlook on the Protocols Violations page. The digest sends one email digest per source, every day at approximately 12AM EST. You cannot currently opt in or out of specific sources.

The digest contains all violations for that source that are _unique_ in the previous 48 hours. For example, if an event `testEvent` had violations on the first day of the month, then those violations won't appear in the digest until the third of the month.

The email includes information about the violation to help you track down its source and correct it. It includes the event name and property name fields, the violation type, the number of times that specific type of violation was seen, and the last time it was seen.

**Protocols Violations Page**
The Protocols Violations page shows a live count for violations. You can adjust the timeframe to show violations in the last hour, the last 24 hours, or the last seven days.

You might see a difference between the count on the Violations page and the count in the Violations email digests. This can happen due to differences between the time periods available (24 hours in in the live page, 48 hours in the daily digest email), and the fact that the digest only shows _unique_ violations. The fields displayed on the Violations page are more detailed than those included in the email digest.

### Why do I see root listed on my Violations page?
You may see violations related to (root). For example:
```js
(root)
Must validate all the schemas
// Or
(root)
Must validate "then" as "if" was valid
```
These violations are related to your common JSON Schema if you've applied custom rules. In this instance (root), refers to the top level of the JSON object (Segment event). 

## Protocols Enforcement

### Why can't I use the Schema to filter my events?

The schema functionality is a _reactive_ way to clean up your data, where the Tracking Plan functionality is a _proactive_, intentional way to clean and unify all future data. Segment has found that the best data driven companies invest the time required to build strong processes and controls around their data. The investment pays off exponentially.

That being said, there are plenty of scenarios where the reactive Schema functionality solves immediate needs for customers. Often times, customers will use both Schema Controls and Tracking Plan functionality across their Segment Sources. For smaller volume Sources with less important data, the Schema functionality often works perfectly.

### If I enable blocking, what happens to the blocked events? Are events just blocked from specific Destinations or the entire Segment pipeline?

Blocked events are blocked from sending to all Segment Destinations, including warehouses and streaming Destinations. When an Event is blocked using a Tracking Plan, it does not count towards your MTU limit. They will, however, count toward your MTU limit if you enable [blocked event forwarding](/docs/protocols/enforce/forward-blocked-events/) in your Source settings.

### Do blocked and discarded events count towards my MTU counts?

Blocked events will not count towards your MTU counts as long as blocked event forwarding is disabled.

## Protocols Transformations

### Do transformations work with Segment replays?

If you create a destination scoped transformation and request a replay for that destination, the transformation will transform events into the destination. Segment doesn't recommended requesting a replay to resend events to a destination as that will likely result in duplicate events in the destination.

### Why can't I create multiple transformations of the same type for the same event?

To reduce the risk of creating circular and conflicting transformations, Segment only allows a single transformation to be created for each distinct source, event, destination and type pairing. That means you cannot create two **Rename track event** transformations for a `order_completed` event. This eliminates the possibility of different stakeholders creating conflicting transformations to satisfy their own needs. It also simplifies the Transformations list view, making it much easier to sort and filter by source, event, destination, etc.

### Why can't I select multiple events or destinations in a single transformation?

In early transformations prototypes, Segment allowed users to select multiple events and destinations for a single transformation rule. Segment realized, however, that this created a structure that was impossible to scale, and likely to generate unintended consequences. For example, if Segment allows multiple track events to be selected for a property name change, it'd be possible to create conflicting changes. Instead, by enforcing a single event, Segment can check to see if a transformation rule exists and smartly link you to that rule using a warning.

### What permissions are required to create and edit transformations?

Only workspace admins are allowed to create transformations.

### What permissions are required to view transformations?

All users with Protocols admin or read-only permissions can view transformations.

### Why can't Segment support transformations for device-mode destinations?

Transformations introduce advanced logic that at scale may impact performance of client-side libraries. If you are interested in testing new functionality which supports device-mode destination transformations in analytics.js, contact your account rep.

### Are Destination Filters applied before or after my Protocols Transformations?

That depends. If you are working with source-level Transformations, the Protocols conversion will come first. If you are dealing with a destination scoped transformation (which is set to only impact data going to a specific destination), Destination Filters will be applied prior to Protocols Transformations.

### Why do I need Protocols to use transformations?

Transformations are but one tool among many to help you improve data quality. Segment highly recommends that all customers interested in improving data quality start with a well defined Tracking Plan. The Tracking Plan serves as a roadmap for how you want to collect data. Without a clear roadmap, it's nearly impossible to build alignment around how transformations should be used to improve data quality, leading to more data quality issues than it solves.
