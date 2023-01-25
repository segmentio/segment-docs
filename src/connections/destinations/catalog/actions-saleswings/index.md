---
title: SalesWings (Actions) Destinaton
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[SalesWings](https://www.saleswingsapp.com/) is a lead scoring platform that offers a user-friendly, no-code solution to identify your leads' true interests. The SalesWings Destination enables using the data collected in Segment to identify, tag and prioritize your leads in SalesWings for your Marketing and Sales teams.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure SalesWings (Actions)**.
4. Select an existing Source to connect to SalesWings (Actions).

{% include components/actions-fields.html %}

## How Segment users are mapped to SalesWings lead-profiles

The SalesWings Destination provides four actions for sending the following Segment event types to SalesWings: Track, Identify, Page and Screen. Each event will be associated with a SalesWings lead-profile based on `userId` and `anonymousId`, as well as the `email` trait. 

While in SalesWings you could only see leads identified with an email, all the forwarded events will be registered by SalesWings. When a Segment user first gets Track, Screen or Page events with `anonymousId` and/or `userId`, these events are stored in SalesWings, but the corresponding lead-profile is not yet visible. When the Segment user gets an Identify event with the `email` trait, the email is added to the lead-profile in SalesWings and it becomes visible in the SalesWings cockpit and exported to SalesWings external integrations, such as Salesforce or Salesforce Marketing Cloud. All the events previously recorded from Segment events by anonymousId and/or userId are available as part of this SalesWings lead-profile. As a fallback, SalesWings is also able to recognise emails provided in the `email` property of Track events.

If a Segment user first gets events with only an anonymous id and then subsequently receives additional events with this anonymous id paired with a permanent user id, all these events will become a part of the same lead-profile in SalesWings.

## How Segment events are mapped to SalesWings lead activities

The Segment Page events are registered as Page-Visit activities of a SalesWings lead. To make use of these activites for tags and scores in the Falcon engine, use the "Page Visit" condition.

The Segment Track, Identify and Screen events are registered as Custom-Event activities of a SalesWings lead. To make use of these activites for tags and scores in the Falcon engine, use the "Custom Event" condition. 

When adding a Track, Identify or Screen action, you control how a corresponding Custom Event activity would look like in SalesWings. When you see a Custom Event activity in the SalesWings cockpit or the SalesWings Lead Intent View in Salesforce, the activity is visualized as `[Kind] Data`. When adding an action for Track, Identify or Screen, you can configure how `Kind` and `Data` fields are formed in SalesWings. The action configuration has the following defaults:
- For a Track event, `Data` would be set to "Track" and `Kind` would be set to the Track event name. The resulting Custom Event activity would look like, for example, `[Track] User Registered`.
- For a Identify event, `Data` would be set to "Identify" and `Kind` would be set to the Segment user email. The resulting Custom Event activity would look like, for example, `[Identify] peter@example.com`.
- For a Screen event, `Data` would be set to "Screen" and `Kind` would be set to the screen name. The resulting Custom Event activity would look like, for example, `[Screen] Home View`.

All the defaults can be overridden in the action configuration, you can either set `Kind` and `Data` to static values, or map them to string properties from Segment events.

If you have the Custom Attributes feature enabled in SalesWings, you would be able to configure SalesWings Custom Attributes based on Segment events properties (for Track and Screen events) and traits (for Identify events). When you add a Custom Attribute with an id that matches a property or a trait name in Segment, you will see the Custom Attibute values on the lead profies created for Segment users.

## Configuring multiple actions for the same event type

It's possible to add any number of SalesWings Destination actions for the same Segment event type, for example, Track. But default, every SalesWings action is added with a trigger that only filters by event type (for example, "Event Type is Track"). If you choose to add multiple actions for the same event type, make sure to configure mutually exclusive triggers (for example, "Event Type is Track and Event Name is Order Completed" and "Event Type is Track and Event Name is Cart Abandonned"). If the triggers are not mutually excelusive, this would result in registering mutiple SalesWings lead activities for the same Segment event.
