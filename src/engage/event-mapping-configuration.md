---
title: Engage Event Mapping
plan: engage-foundations
---

This guide helps you configure mappings for Engage events in Actions Destinations. 


## Overview

Engage Mappings let you transform and send user data to downstream destinations. When Engage events get sent to destinations, they may need to be formatted or adjusted to match the destination’s expected data structure. Without mapping, critical user information like audience membership or enriched traits may not sync correctly.

This guide explains how to configure mappings for Engage events in Actions Destinations, including:

- The differences between [Identify](/docs/connections/spec/identify/) and [Track](/docs/connections/spec/track/) events.
- How to extract and map data from Engage event payloads.
- A step-by-step walkthrough of mapping configurations.
- Advanced features like Trait Enrichment to pass additional profile data.

## What are Engage events?

Engage events let you sync audience membership data to your destinations. When a user enters or exits an audience in Engage, Segment generates events that you can use to trigger actions in your connected tools.

Engage generates Identify and Track events. These events carry critical information including:

- User identifiers (like `userId` and `anonymousId`)
- Audience membership status
- Other user traits if you've enabled enrichment 

Each event type has a specific structure that determines how you configure your mappings.

### Identify events: updating user traits

Identify events are mostly used to update user profiles in external systems, like a CRM or marketing automation platform. Identify events send all user details in the `traits` object. The audience key appears in the object as a boolean that indicates whether the user is in the audience (`true`) or not (`false`), like in this example Identify payload:

```json
{
  "anonymousId": "anon-test-1",
  "traits": {
    "email": "user-testing-1@gmail.com",
    "your_audience_key": true
  },
  "type": "identify",
  "userId": "user-testing-1"
}
```

Since Identify events are designed to update profile data, they are commonly mapped to destinations that rely on persistent user records, such as customer databases, email platforms, and loyalty systems. 

### Track events: logging user actions

Track events, on the other hand, capture user actions and behaviors. These events are event-driven rather than profile-based, which makes them ideal for tracking audience membership changes or user activities.

Here's an example of a Track event payload:

```json
{
  "anonymousId": "anon-test-1",
  "context": {
    "traits": {
      "email": "user-testing-1@gmail.com"
    }
  },
  "event": "Audience Entered",
  "properties": {
    "audience_key": "your_audience_key",
    "your_audience_key": true
  },
  "type": "track",
  "userId": "user-testing-1"
}
```








