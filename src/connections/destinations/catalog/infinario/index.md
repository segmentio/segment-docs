---
title: Infinario Destination
beta: true
---
## Getting Started

1. Create a free account and project at https://cloud.infinario.com/ if you haven't done so already
1. Find your Infinario `Project Token` in the Project overview screen visible after choosing your project
1. Toggle Infinario on in your Segment destinations, using the Project Token from the previous step


## Common restrictions

User traits and event properties cannot contain characters `.` and `$` in the trait/property keys. That means `"currency": "$"` is OK, but `"^.^": "kitty"` is not. The total amount of user trait keys is limited to 255. The same limit also applies for the total amount of property keys for each event type, and the total amount of event types.

Aside from these restrictions, Infinario supports any JSON-serializable data as a trait/property value. However, objects are unpractical to use in the Infinario analytic module, therefore we unpack the first level of an object as properties for your convenience. For example, `"address": {"country": "UK", "city": "London"}` is stored as properties `"address_country": "UK"` and `"address_city": "London"`.

## Identify

This call ensures the existence and updates the properties of a user (player/customer) in Infinario. The `userId` is mapped to Infinario `registered` ID, whereas the `anonymousId` is mapped to Infinario `cookie` ID. Properties of a user with special usage in Infinario can be found in [the Players guide](http://guides.infinario.com/user-guide/players/#section-player).

## Track

Tracks an event of any type, including any desired properties of that event. Most of the Segment call's context will be added as extra properties.

It is advised to reserve the `campaign` event type for events generated automatically by the Infinario campaign module. If you track your mobile app payments as the event type `hard_purchase`, you will be able to use the [automated payment validation](http://guides.infinario.com/technical-documentation/payment-validation/).

## Page

Tracks an event of type `page_visit`, it is currently also used to keep track of sessions. The first page call in a session creates a `session_start` event, then after a certain time of inactivity, the `session_end` event is created with the duration of the session.

## Screen

Tracks an event of type `screen_visit`, it is currently also used to keep track of Infinario sessions, the same way the page call does.

## Alias

The alias call can be used to merge two user identities and their data to one. The `previousId` field should always contain a previously used `anonymousId`, as merging users by specifying two `userId`'s is currently not supported. Note that users are also merged when any call specifies both a `userId` and an `anonymousId`, which previously belonged to two separate users.

## Group

This call is currently only supported partially. Whenever a user is assigned to a group, the properties of this group and the group ID is added to the user's properties. This means there is no support for the user being in multiple groups.

- - -

Read the [Infinario guides](http://guides.infinario.com/) to see what can you do with the data you tracked.
