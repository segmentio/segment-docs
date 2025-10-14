---
title: Relay Destination
---

## Getting Started

Once the Segment library is integrated with your server, toggle Relay on in your Segment destinations.

Relay supports the `identify` and `track` methods.

## Identify

When you `identify` a user, we'll pass that user's information to Relay with `userId` as Relay's External User ID. Segment's special traits recognized as Relay's standard user profile fields (in parentheses) are:

- `firstName` (`first_name`)
- `lastName` (`last_name`)
- `email` (`email`)

All other traits will be sent to Relay as custom attributes.

## Track

When you `track` an event, we will send that event to Relay as a custom event. Your '.track' events should have the properties associated with it.
