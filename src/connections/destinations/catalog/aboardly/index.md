---
title: Aboardly Destination
---

This destination is maintained by Aboardly.

## Getting Started

Once the Segment library is integrated with your server, toggle Aboardly on in your Segment Destinations tab, and add your API Key which you can find in the Aboardly Dashboard under Settings > API.

Aboardly supports the `identify` and `track` methods.

## Identify

When you `identify` a user, we'll pass that user's information to Aboardly with `userId` as Aboardly's External Customer ID. Aboardly recognizes all traits sent by Segment, however in order to send emails you should always add the `email` trait when possible.

## Track

When you `track` an event, we will send that event to Aboardly as a custom event.
