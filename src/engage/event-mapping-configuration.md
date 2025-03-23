---
title: Engage Event Mapping
plan: engage-foundations
---

This guide helps you configure mappings for Engage events in Actions Destinations. 

## Overview

Engage Mappings let you transform and send user data to downstream destinations. Engage events sent to destinations may need to be formatted or adjusted, though, to match the destination’s expected data structure. Without mapping, critical user information like audience membership or enriched traits may not sync correctly.

This guide explains how to configure mappings for Engage events in Actions Destinations, including:

- The differences between [Identify](/docs/connections/spec/identify/) and [Track](/docs/connections/spec/track/) events.
- How to extract and map data from Engage event payloads.
- A step-by-step walkthrough of mapping configurations.
- Advanced features like Trait Enrichment that you can use to pass additional profile data.

## What are Engage events?

Segment generates events whenever a user enters or exits an Engage audience. You can then use these Engage events to sync audience membership to your connected destinations.

Engage events carry critical information, including:

- User identifiers (like `userId` and `anonymousId`)
- Audience membership status
- Other user traits, if you've enabled enrichment 

### Engage event types and structure

Engage generates two event types: Identify and Track. 

Each event serves a different purpose and has a specific structure that determines how you configure your mappings.

#### Identify events: updating user traits

Identify events in Engage update user profiles with audience membership status. Identify events send all user details in the `traits` object. 

The audience key appears in the object as a boolean that indicates whether the user is in the audience (`true`) or not (`false`), like in this payload:

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








