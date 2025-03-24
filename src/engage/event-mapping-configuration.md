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

## Understanding Engage events

Before you create a mapping, you need to understand how Segment structures Engage events. Where the data lives in each event affects how you map it.

Engage sends two types of events: Identify and Track. These two event types use different parts of the event payload to store user data. If you're mapping an email address, an audience membership, or a trait like `first_name`, you need to know where to look for that value in each event type.

If you map from the wrong part of the payload, your data might not reach the destination at all, or it might show up incorrectly. 

This section breaks down the difference between Identify and Track events, shows you what each payload looks like, and explains where to find data you'll typically want to map so you can configure mappings correctly and avoid pitfalls.

<!-- Engage events carry critical information, including:

- User identifiers (like `userId` and `anonymousId`)
- Audience membership status
- Other user traits, if you've enabled enrichment 

## Key Engage event fields

The following properties appear in Engage event payloads:

| Field            | Type   | Description                                                       |
| ---------------- | ------ | ----------------------------------------------------------------- |
| `userId`         | String | The unique identifier for a known user.                           |
| `anonymousId`    | String | The identifier for anonymous users before they log in.            |
| `traits`         | Object | Stores user attributes (like `email` and audience status).        |
| `context.traits` | Object | In Track events, this object stores user attributes like `email`. |
| `properties`     | Object | Stores event-related data, including audience membership.         | 

Understanding these fields will help you correctly set up mappings and send Engage data to external destinations. -->                                                   

### Engage event types and structure

Engage uses two event types to deliver data to downstream destinations: 

- **Identify** events, which send or update user traits like email, name, or audience membership status.
- **Track** events, which capture actions or user behaviors, like when a user enters or exits an audience.

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

In this example:

- `email` is included in the `traits` object.
- The `your_audience_key` field indicates that the user is part of a specific audience. If the `value` is `false`, it means the user exited the audience.

Because Identify events update profile data, they are commonly mapped to destinations that rely on persistent user records, like customer databases, email platforms, and loyalty systems. 

### Track events: logging user actions

Track events, on the other hand, capture user actions and behaviors. These events are event-driven rather than profile-based, which makes them ideal for tracking audience membership changes or user activities. <!-- hm, does this make sense?  >

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









