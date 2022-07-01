---
title: Protocols Frequently Asked Questions
---

{% include content/plan-grid.md name="protocols" %}


## Protocols Notifications

### How can I subscribe to Protocols notifications?

You can subscribe to a variety of Protocols specific alerts through the workspace Activity Feed settings. To subscribe, visit your workspace **Settings** > **User Preferences** > **Activity Notifications** > **Protocols**.

### How can I get notified when someone makes a change to my tracking plan?

You can forward notifications from Protocols to a new Segment Source, which can then send them to notification tools such as Slack webhook.

You can also forward these Protocols alerts to any (cloud-mode) Segment destination that accepts Track calls, including data warehouses. Most customers record these activity feed events to a data warehouse for analysis.

### How do I get notified when new violations are generated? Can I create custom violation notifications?

You can enable [violation event forwarding](/docs/protocols/validate/forward-violations/) to start delivering violations as Track calls to a Segment Source. From there, you can forward the events to any Segment destination that accepts Track calls.


## Protocols Tracking Plan

### Do I need to add a Page Viewed event to my tracking plan?

Yes. To consolidate the views in the Schema tab, Segment automatically converts `page` calls into `Page Viewed` events that appear in the Schema Events view. Segment recommends adding a `Page Viewed` event to your Tracking Plan with any properties you want to validate against. At this time, you cannot validate that a specific named page (`analytics.page('Homepage')`) has a specific set of required properties.

### How can I see who made changes to my Tracking Plan?

Each Tracking Plan includes a Changelog, which shows which changes were made by which users. To view it, open a Tracking Plan, click the **...** button (also known as the dot-dot-dot, or ellipses menu) next to the Edit Tracking Plan button, and click **View Changelog**.

### How many Sources can I connect to a Tracking Plan?

The Tracking Plan to Source relationship is a one-to-many relationship. This means you can connect as many Sources to a Tracking Plan as you need. However Segment recommends connecting 1-3 Sources per Tracking Plan, because it's rare to have more than three Sources that share an identical set of events, especially when tracking events across platforms. For example, many Segment mobile SDKs (iOS and Android) automatically collect events that would not make sense to collect in a web app. Segment doesn't recommend including events in a Tracking Plan that would never be tracked in a Source.

### Can I duplicate a Tracking Plan in the Segment UI?

You cannot currently duplicate Tracking Plans in the Segment web app. Instead, Segment recommends using the [Tracking Plan API](/docs/protocols/apis-and-extensions/) to copy the underlying JSON schema from one Tracking Plan to another.

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

## Protocols Validation

### What is the difference between Violations Emails and the Violations page in the Segment UI?

**Violations Daily Digest**
The Violations Daily Digest is a great way to keep informed of new violations that might be easy to overlook on the Protocols Violations page. The digest sends one email digest per source, every day at approximately 12AM EST. You cannot currently opt in or out of specific sources.

The digest contains all violations for that source that are _unique_ in the previous 48 hours. For example, if an event `testEvent` had violations on the first day of the month, then those violations won't appear in the digest until the third of the month.

The email includes information about the violation to help you track down its source and correct it. It includes the event name and property name fields, the violation type, the number of times that specific type of violation was seen, and the last time it was seen.

**Protocols Violations Page**
The Protocols Violations page shows a live count for violations. You can adjust the timeframe to show violations in the last hour, the last 24 hours, or the last seven days.

You might see a difference between the count on the Violations page and the count in the Violations email digests. This can happen due to differences between the time periods available (24 hours in in the live page, 48 hours in the daily digest email), and the fact that the digest only shows _unique_ violations. The fields displayed on the Violations page are more detailed than those included in the email digest.

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

### Why can't we support transformations for device-mode destinations?

Transformations introduce advanced logic that at scale may impact performance of client-side libraries. If you are interested in testing new functionality which supports device-mode destination transformations in analytics.js, contact your account rep.

### Why do I need Protocols to use transformations?

Transformations are but one tool among many to help you improve data quality. Segment highly recommends that all customers interested in improving data quality start with a well defined Tracking Plan. The Tracking Plan serves as a roadmap for how you want to collect data. Without a clear roadmap, it's nearly impossible to build alignment around how transformations should be used to improve data quality, leading to more data quality issues than it solves.
