---
title: 'Spec: A/B Testing Events'
hidden: true
---

This guide explains what data should be sent to Segment *from* A/B Testing tools and hence is targeted to partners who send A/B testing data back into Segment rather than targeted to customers themselves. The [semantic events](/docs/connections/spec/semantic/) detailed below represent the ideal for A/B Testing events.

## Overview

Every A/B Testing tool is built around the concept of [showing visitors an experiment](#experiment-viewed) with changes to the page. Each experiment can have multiple variations shown to different random samples of visitors.

## Events

The one semantic event for recording A/B Test experiments is:

* [Experiment Viewed](#experiment-viewed)

### Experiment Viewed

This event will be sent **automatically** every time a customer sees a variation of an active A/B Test when using some A/B testing tools using Segment. You don't actually have to make these track calls! Note that the A/B testing tools will need to be loaded synchronously in order for these events to fire properly.

#### Properties

This event supports the following semantic properties:

Property          | Type   | Description
--------          | ----   | -----------
`experiment_id`   | String | The experiment's ID.
`experiment_name` | String | The experiment's human-readable name.
`variation_id`    | String | The variations's ID.
`variation_name`  | String | The variation's human-readable name.


## Sending A / B Testing Data To Different Destinations

**This implementation strategy requires a Business Tier plan, as it requires the use of Destination Filters.**

Connect two destinations (A & B) to the same Segment Source. Destination A to receive events related to user events for group-A. Destination B to receive events related to user events for group-B. Configure the destinations as you normally would, and navigate to the Destinations Filter tab on each destination. Referencing the [Destination Filters]([url](https://segment.com/docs/connections/destinations/destination-filters/)) doc and [FQL]([url](https://segment.com/docs/api/public-api/fql/)) doc, create a Destination Filter for each destination to either Allow or Block the events you want sent to each destination. 

For example, Destination A's filter could be built to Allow all events where `context.page.url` has a specific value, and Destination B could be built to Block all events where the `context.page.url` has a specific value. You could also configure them to only Allow/Block events by other fields that can be referenced within the event payloads. Please note that when using Destination Filters, an event must pass all filters in order to be sent to the destination.

**This second implementation strategy does not require a Business Tier plan, but does require code changes to modify the events' `integrations` object.**

Connect two destinations (A & B) to the same Segment Source. Destination A to receive events related to user events for group-A. Destination B to receive events related to user events for group-B. Next, modify the code where these events are being generated, before sending to Segment, by setting the `integrations` object to false for the unwanted destination. This would require additional logic on your team's end to decide if the event should send to Destination A or B. For example, Destination A's filter could be built to Allow all events where `context.page.url` has a specific value, and Destination B could be built to Block all events where the `context.page.url` has a specific value.

To route data to Destination A, modify the integrations object like this `integrations : { "_Destination A_" : true, "_Destination B_" : false}`, where _Destination A_ and _Destination B_ is the name of the integration. Follow these same steps for events you want to send to Destination B and not to Destination A. To find the name of the integration to include in the integrations object, please refer to that destination's specific Segment documentation, found under Destination Info _(Refer to it as ___ in the Integrations object)_. To route data to Destination B, modify the integrations object like this `integrations : { "_Destination B_" : true, "_Destination A_" : false,}`. 

*Note* If you're wanting both Destination A and Destination B to be the same integration, such as two Mixpanel destinations, then modifying the `integrations` wouldn't work, as the integrations object would set them both to true or false. See the third implementation strategy below for Destination Function.

**This third implementation strategy does not require a Business Tier plan, but utilizes Segment's Custom Functions : Source Functions & Destination Functions.**

You can use either a source function or a destination function, depending on whether you'd like to modify the `integrations` object or simply add logic to route the events that you want sent to the destination.

[Source Function]([url](https://segment.com/docs/connections/functions/source-functions/)) : Create a Source Function in your [workspace]([url](https://app.segment.com/goto-my-workspace/functions/catalog/new)) and select Source for a Source Function. Build out the source function's code to handle the logic for modifying the integrations object as explained in the second implementation strategy above for Destination A and Destination B. Functions require you to build out event handlers for each event type (track/identify/page/screen/group/alias), so make sure all events you want sent to the source are configured appropriately.

*Note* If you want both Destination A and Destination B to be the same integration, such as two Mixpanel destinations, then modifying the `integrations` wouldn't work, as the integrations object would set them both to true or false. See the destination function strategy below.

[Destination Function]([url](https://segment.com/docs/connections/functions/destination-functions/)) : Create a Destination Function in your [workspace]([url](https://app.segment.com/goto-my-workspace/functions/catalog/new)) and select Destination for a Destination Function. Build out the destination function's code to handle the logic to check whether the event should be sent to Destination A or Destination B. Set two endpoints, one for each destination, and route all events pertaining to group-A to use Destination A's endpoint and route all events pertaining to group-B to use Destination B's endpoint. Functions require you to build out event handlers for each event type (track/identify/page/screen/group/alias), so make sure all events you want sent to each destination are configured appropriately.
