---
title: Engage Event Mapping
plan: engage-foundations
---

This guide explains how to configure mappings for Engage events in Actions Destinations, 

## Overview

Engage Mappings let you transform and send user data to downstream destinations. Engage events sent to destinations may need to be formatted or adjusted, though, to match the destination’s expected data structure. Without mapping, critical user information like audience membership or enriched traits may not sync correctly.

including:

- The differences between [Identify](/docs/connections/spec/identify/) and [Track](/docs/connections/spec/track/) events.
- How to extract and map data from Engage event payloads.
- A step-by-step walkthrough of mapping configurations.
- Advanced features like Trait Enrichment that you can use to pass additional profile data.

## About Engage events

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

These events structure data differently, which directly affects how you should configure mappings.

#### Identify events: updating user traits

Identify events represent who the user is. These events usually update or enrich profiles in destinations like CRMs and email tools.

Key characteristics:

- Identify events store user details in the `traits` object. 
- Audience membership (for example, `browse_abandoners = true`) is also included in `traits`.
- Attributes like `email`, `first_name`, and any enriched traits all appear alongside audience flags.

Here's an example of an Engage Identify event payload:

```json
{
  "anonymousId": "anon-test-1",
  "traits": {
    "email": "user@example.com",
    "browse_abandoners": true,
    "first_name": "Jane",
    "last_name": "Doe"
  },
  "type": "identify",
  "userId": "user-123"
}
```

In this example, a user just entered the `browse_abandoners` audience. If the value for the audience were `false`, it would mean the user just **exited** the audience.

<!-- PW: hm should I change this from "alongside audience flags!-->

### Track events: logging user actions

Track events, on the other hand, represent something the user did. These events capture user actions and log events and behaviors.

Key characteristics:

- Most event-specific data is stored in the `properties` object.
- The user's `email` isn't in properties; it's nested under `context.traits`.
- Audience entry and exit shows as a boolean, where `true` is an entry and `false` is an exit.

Here's an example of an Engage Track event payload:

```json
{
  "anonymousId": "anon-test-1",
  "context": {
    "traits": {
      "email": "user@example.com"
    }
  },
  "event": "Audience Entered",
  "properties": {
    "audience_key": "browse_abandoners",
    "browse_abandoners": true,
    "first_name": "Jane",
    "last_name": "Doe"
  },
  "type": "track",
  "userId": "user-123"
}
```

In this example, a user just entered the `browse_abandoners` audience. The audience flag and traits are nested in `properties`, and the email address is in `context.traits.email`.

### Understanding the difference between Identify and Track in Engage

Engage sends both Identify and Track events when a user enters or exits an audience. While these events can contain similar information, these events serve different purposes.

Identify events answer the question, "Who is this user right now?" They update the user’s profile with traits like email, name, and audience membership. For example: “Jane’s email is `jane@example.com`. She’s in the `browse_abandoners` audience. Her first name is `jane`.”

Track events capture a specific moment in time, like when a user joins or leaves an audience. For example: “Jane just entered the `browse_abandoners` audience.”

Engage sends both types of events because different destinations rely on different types of data. Identify events are used to keep user profiles up to date, whereas Track events are useful for triggering time-sensitive actions based on audience entry or exit.

For example, you might use an Identify event to sync the current list of users in an audience to your CRM. But if you want an ad platform to show an ad the moment someone enters an audience, you'd use a Track event.

The following table summarizes the differences between Identify and Track events in Engage:

| Attribute              | Identify                                  | Track                                                 |
| ---------------------- | ----------------------------------------- | ----------------------------------------------------- |
| What it describes      | The user’s current traits and attributes  | A specific moment or action (like audience entry)     |
| When to use it         | To update a user profile in a destination | To trigger an action based on something that happened |
| Audience data location | `traits`                                  | `properties`                                          |
| Email location         | `traits.email`                            | `context.traits.email`                                |

<!-- PW: maybe add a transition here -->

## Configure mappings




