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

To send Engage event data to a destination, you’ll need to configure a mapping. Mappings define Segment passes fields like `traits.email` or `properties.browse_abandoners` to the destination's API endpoint.

When you add a mapping, you’ll choose the event type (Identify or Track) and then define which fields to send and where to send them. The structure of the event payload depends on the type of event, which is why mapping an Identify event differs from mapping a Track event.

The following sections walk through each event type and show how to configure a mapping using example payloads.

Before you begin, make sure you've done the following:

- Created an audience in Engage
- Connected an Actions destination
- Confirmed whether the destination expects Identify or Track events
- Located your audience key (you'll use it to configure the trigger)

### 1. Create a mapping

To create a mapping, follow these steps:

1. In your Segment workspace, go to **Connections > Destinations**.
2. Select the destination where you want to send Engage data.
3. On the destination overview page, click **Mappings > + New mapping**.
4. Choose the event type you want to use: Identify or Track.

After you select the event type, you'll configure a trigger to determine when the mapping fires (based on audience entry or exit), and then map the fields to the destination's expected format.

### 2. Define the event trigger

Before mapping fields, you’ll define a trigger that determines when the mapping executes. For Engage events, triggers typically use the audience key's boolean value. 

So to trigger the mapping when a user enters or exits an audience, you'd use the audience key and its boolean value:

When a user enters the audience, configure the trigger like this:

- Trigger type: `Event Trait`
- Field: `browse_abandoners`
- Condition: `is true`

When a user exits the audience, set the trigger like this:

- Trigger type: `Event Trait`
- Field: `browse_abandoners`
- Condition: `is false`

This tells Segment to execute the mapping only when the value of the audience key changes in the appropriate direction.

### 3. Map event fields

The fields you map depend on whether you selected Identify or Track. 

#### Map an Identify event 

Since Identify events send data in the `traits` object, you'll use `traits` in your mappings, like in this example:

```json
{
  "type": "identify",
  "userId": "user-123",
  "anonymousId": "anon-test-1",
  "traits": {
    "email": "user@example.com",
    "browse_abandoners": true,
    "first_name": "Jane",
    "last_name": "Doe"
  }
}
```

Here’s how you might configure your mapping for this Identify event:

| Segment field              | Destination field | Details                           |
| -------------------------- | ----------------- | --------------------------------- |
| `traits.email`             | `email_address`   | User’s email                      |
| `traits.browse_abandoners` | `audience_status` | True if user entered the audience |
| `traits.first_name`        | `first_name`      | User’s first name                 |
| `traits.last_name`         | `last_name`       | User’s last name                  |


<!-- Maybe add screenshot-->

#### Map a Track event

Track events send data in the `properties` object, like in this example:

```json
{
  "type": "track",
  "event": "Audience Entered",
  "userId": "user-123",
  "anonymousId": "anon-test-1",
  "context": {
    "traits": {
      "email": "user@example.com"
    }
  },
  "properties": {
    "audience_key": "browse_abandoners",
    "browse_abandoners": true,
    "first_name": "Jane",
    "last_name": "Doe"
  }
}
```
This event logs the moment the user entered the `browse_abandoners` audience. Audience status and [enriched traits](#) show up in `properties`, while email is stored in `context.traits`.

Here’s how you might configure your mapping for this Track event:

| Segment field                  | Destination field | Details                           |
| ------------------------------ | ----------------- | --------------------------------- |
| `context.traits.email`         | `email_address`   | User’s email                      |
| `properties.browse_abandoners` | `audience_status` | True if user entered the audience |
| `properties.first_name`        | `first_name`      | User’s first name                 |
| `properties.last_name`         | `last_name`       | User’s last name                  |


Once you've decided whether to map a Track or Identify event, finish by following these steps:

1. Load a test event or paste the event JSON into the mapping interface.
2. For each field you want to send:
  - Select the source field from the left panel.
  - Enter the destination field on the right.

## Trait enrichment

Trait Enrichment lets you pull Segment profile traits into mappings when syncing audiences or journeys to destinations and [Destination functions](/docs/connections/functions/destination-functions/).

To enable trait enrichment:

1. From your Segment workspace, go to **Engage > Audiences**.
2. 