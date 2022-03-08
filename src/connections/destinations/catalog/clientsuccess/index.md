---
title: ClientSuccess Destination
hide-personas-partial: true
id: 55677dfd0a20f4e22f0fb39a
---
This destination is maintained by ClientSuccess.

## Getting Started (for CSMs)

If your engineers have already set up Segment, adding Segment data to ClientSuccess is straightforward. All you need to do is turn on the destination.

To turn on the destination, do the following:

1. Go to the Segment destinations catalog and enable ClientSuccess.
2. Add your `ClientSuccess Source Id` and `ClientSuccess API Key` (these can be found within ClientSuccess under the top right menu, Apps & Integrations > Usage).


**Note:** Because ClientSuccess focuses on group level events, you must pass group information before your events will show up. If you turn on the ClientSuccess destination in Segment and don't see events in ClientSuccess after 24 hours, it may be that your engineers need to send group information to Segment using Segment's `group` call.

- - -

## Getting Started (for Developers)

ClientSuccess supports the `identify`, `group`, `track`, and `page` methods of Segment.

The `group` method is required for any data to stick in ClientSuccess. Any `track` and `page` events fired before the `group` method is called for a particular user, will be lost.


## Identify

When you `identify` a user, Segment will pass that user's information to ClientSuccess with `userId` as an external user Id for ClientSuccess usage. ClientSuccess uses the following of Segment's standard user profile fields (in parentheses):

- `firstName` (`first_name`)
- `lastName` (`last_name`)

ClientSuccess ignores all other traits sent as custom attributes.

## Track

When you `track` an event, Segment will send that event to ClientSuccess as a custom event.

## Page

When you track a `page` event, Segment will send that event to ClientSuccess as a custom event.

## Group

When you call `group`, Segment will send that group's information to ClientSuccess with `groupId` as the id and `name` as the group name.  Both `groupId` and `name` are required for ClientSuccess.
