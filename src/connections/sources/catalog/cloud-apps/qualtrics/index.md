---
title: 'Qualtrics Source'
beta: true
---

[Qualtrics](https://qualtrics.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is an Experience Management platform that allows companies to design and improve customer and employee experiences through listening, analysis, and action.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

Qualtrics maintains this source. For any issues with the source, [contact the Qualtrics Support team](mailto:support@qualtrics.com).

> info "Beta Source"
> The Qualtrics Source is in beta, which means that they are still actively developing the source. This doc was last updated on February 15, 2023. If you are interested in joining their beta program or have any feedback to help improve the Qualtrics Source and its documentation, [let the Qualtrics team know](mailto:support@qualtrics.com)!_

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Qualtrics" in the Sources Catalog, select Qualtrics, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.
   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example, SourceName_Prod, SourceName_Staging, or SourceName_Dev).
4. Click **Add Source** to save your settings.
5. Log in to your Qualtrics Account. Navigate to workflows, select a workflow to send Segment events from, and add a new Segment task.
6. From within the Segment task, after connecting with your Segment workspace API token, select your Qualtrics source and continue to set up the task with the event, data mapping, and more.
- Your workspace token will need Source Admin permissions, at a minimum.
7. For more information on the Qualtrics Segment task, view the [Qualtrics support page](https://www.qualtrics.com/support/integrations/twilio-segment/twilio-segment-task/){:target="_blank"}.

## Stream

Qualtrics uses Segment's stream Source component to send Segment event data. It uses a server-side (select from `track` and `identify`) method(s) to send data to Segment. These events are then available in any destination that accepts server-side events and are available in a schema in your data warehouse, so you can query using SQL.

Qualtrics allows you to configure the userId from various sources from within the Qualtrics platform, for example, data from a survey response or a XM Directory contact's external data reference. The anonymous ID can also be configured from within Qualtrics task setup.

## Events

Use the Qualtrics integration to define the event to be sent to Segment from within the task. This can be customized for a particular use case such as 'Onboarding Survey Completed' which could be the event based on a response to a particular survey. Another example may be 'Contact Updated' based on XM Directory change. These events can be tailored to align with your existing process or particular use case.

## Event Properties

The Qualtrics integration allows you to define event properties within the following constraints:

- Use `Track` events to define the `properties` object
- Use `Identify` events to define the `traits` object

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and verify that events and properties appear the way you expect. If events and properties don’t appear as you expect them to, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Qualtrics support team](mailto:support@Qualtrics.com).

