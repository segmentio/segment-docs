---
title: Smyte Destination
---

This destination is maintained by Smyte.


# Getting Started

Once you've integrated with Segment on your server or client, toggle Smyte on in your Segment destinations, and add your **Segment API key** that you received from us during registration.

Smyte works with events from both your clients and your server, so you don't need to be using a particular Segment SDK, however, the more data you can provide Smyte from as many platforms as you can, the more effective our technology becomes.

Smyte supports the `identify`, `track`, `group`, `alias`, `page` and `screen` methods.

## Identify

When you `identify` a user, Smyte will store information about the user for later analysis. When you send a `track` event, we'll analyze all of the data stored about a user in addition to the event they're performing to determine if they're a bad actor.

Smyte understands all of the reserved traits in this event, so send as many as you can. If you send custom traits, it may take a day or two for Smyte to understand them. Your account manager will emial you if there are any questions, or feel free to email [support@smyte.com](mailto:support@smyte.com) if there are any issues.

## Track

Smyte is preconfigured to fight fraud if you're using Segment's [e-commerce tracking API](/docs/connections/spec/ecommerce/v2/) and spam, harassment and scams if you're using Segment's [live chat API](/docs/connections/spec/live-chat/).

As Segment adds more [semantic events](/docs/connections/spec/semantic/), Smyte will be updated to work with them.

If you're sending custom events, it may take a day or two for Smyte to start working. Your account manager will email you if there are any questions, or feel free to email [support@smyte.com](mailto:support@smyte.com) if there are any issues.

## Group

We'll use this event to distinguish between users in different organizations and roles. In our UIs, this may be reflected in the "target owner" field for some actions.

## Alias

This event may improve how users are rendered in our UIs.

## Page

This event helps Smyte identify whether the user is suspicious.

## Screen

This event also helps Smyte identify whether the user is suspicious.
