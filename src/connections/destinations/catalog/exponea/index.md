---
title: Exponea Destination
rewrite: true
beta: true
id: 5d4d88bbd02041672e51e3ca
---
[Exponea](https://exponea.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a Customer Data & Experience Platform (CDXP) which creates a unified source of customer intelligence in real-time, ready for immediate activation using its own built‑in omnichannel marketing systems (web, email, push, mobile, text messages,etc.) powered by customer-centric analytics and artificial intelligence (product recommendations and predictions).

This destination is maintained by Exponea. For any issues with the destination, contact [the Exponea Support team](mailto:support@exponea.com).


{% include content/beta-note.md %}


## Getting Started


{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Exponea" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Create a [public API group](https://docs.exponea.com/reference#setting-up-access-keys) for your Segment integration in your Exponea project. Don't forget to set the appropriate [group permissions](https://docs.exponea.com/v2/reference#section-modifying-the-access-of-your-api-group) to allow recieveing events and customer updates.
4. Fill in the "API Base URL", "API key" and "Project Token" into your Segment Settings UI. You can find all of the above in the API settings page of your Exponea project.
5. Enter your Exponea hard ID and soft ID names into the corresponding fields to specify Segment's userId and anonymousId mapping into your Exponea ID structure.


## Common fields

If you have not had a chance to review our spec, take a look tounderstand what the [Common fields](/docs/connections/spec/common/) are.

The `userId` and `anonymousId` common fields are used for all types of calls to identify the user in Exponea. Mapping of the IDs is based on the destination settings:

| Segment | Exponea |
| -------- | -------- |
| userId      | Exponea hard ID (e.g registered)     |
| anonymousId | Exponea soft ID (e.g cookie) |



Other common fields are used only for `track`, `page` and `screen` calls which are translated into Exponea events. The following common fields are mapped to Exponea:


| Segment | Exponea |
| -------- | -------- |
| timestamp | timestamp (string date is parsed to unix timestamp) |
| context: app, device, os, screen, referrer, campaign, user_agent, location  | event properties (fields that contain child objects are flattened) |


## Page

If you have not had a chance to review our spec, take a look tounderstand what the [Page method](/docs/connections/spec/page/) does.

Page calls will be sent to Exponea as a `page_visit` event with the `properties` field mapped into event properties and the `name` field mapped into the `page_name` property.

Example of page call:

```js
analytics.page("Home", {
    url: "https://exponea.com",
    referrer: "http://google.com"
})
```

This `page` call is translated into a `page_visit` event with the following properties:

```js
"page_name": "Home",
"url": "https://exponea.com",
"referrer": "http://google.com"
```

An optional event `session_ping` can be tracked along with `page_visit` for [automatic session tracking](https://docs.exponea.com/docs/system-events#section-first-session-session-start-session-end). You can adjust this behavior in your Exponea destination settings by toggling on and off the 'Track session ping' settings. The Exponea soft ID must be set to `cookie` and the `anonymousId` field must be present in the `page` call for session events to work.


## Screen

If you have not had a chance to review our spec, take a look tounderstand what the [Screen method](/docs/connections/spec/screen/) does.

Screen calls will be sent to Exponea as a `screen_visit` event with the `properties` field mapped into event properties and the`name` field mapped into the `screen_name` property.

Example of screen call:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"
                            properties:@{ @"Feed Type": @"private" }];
```

This `screen` call is translated into a `screen_visit` event with the following properties:

```objc
"screen_name": "Home",
"Feed Type": "private"
```

An optional event `session_ping` can be tracked along with `screen_visit` for [automatic session tracking](https://docs.exponea.com/docs/system-events#section-first-session-session-start-session-end). You can adjust this behavior in your Exponea destination settings by toggling on and off the 'Track session ping' settings. The Exponea soft ID must be set to `cookie` for session events to work and `anonymousId` field must be present in the `screen` call for session events to work.

## Track

If you have not had a chance to review our spec, take a look tounderstand what the [Track method](/docs/connections/spec/track/) does.

Track calls will be sent to Exponea as events under name provided in the event field. The `properties` field will be mapped into event properties (objects will be flattened using underscore).

Example of track call:

```js
analytics.track("Registered", {
  plan: "Pro Annual",
  accountType: "Facebook"
});
```

This track call is translated into a `Registered` event with the following properties:

```js
"plan": "Pro Annual",
"accountType" : "Facebook"
```

## Identify

If you have not had a chance to review our spec, take a look tounderstand what the [Identify method](/docs/connections/spec/identify/) does.

Identify calls will be sent to Exponea as customer updates with traits set as customer properties.

Example of identify call:

```js
analytics.identify("userId123", {
  name: "John Doe",
  email: "john.doe@example.com",
  address: {
    city: "New York",
    country: "USA"
  }
});
```

This identify call is translated into a customer update for user with Exponea hard id `userId123` with properties:

```js
"name": "John Doe",
"email": "john.doe@example.com",
"address_city": "New York",
"address_country": "USA",
```

## Alias

If you have not had a chance to review our spec, take a look tounderstand what the [Alias method](/docs/connections/spec/alias/) does.

The alias call can be used to merge two user identities and their data to one. The `previousId` field should always contain a previously used `anonymousId`, as merging users by specifying two `userIds` is not supported. Sending an alias event with `previousId` and no `userId` will cause the event to be ignored. Note that users are also merged when any call specifies both a userId and an anonymousId, which previously belonged to two separate users.

Example of alias call:

```js
analytics.alias("507f191e81");
```
## Group

If you have not had a chance to review our spec, take a look tounderstand what the [Group method](/docs/connections/spec/group/) does.

Group calls will be sent to Exponea as customer updates with group traits as customer properties prefixed with `group_` and `groupId` into `group_id`. For example:

```js
analytics.group("123", {
  name: "Exponea",
  industry: "Technology"
});
```

will be translated into a customer update with properties:

```js
"group_id": "123",
"group_name": "Exponea",
"group_industry": "Technology",
```

Disclaimer: This is a beta version of group tracking and might be subject to change.

## General

### Nested Objects
Values that contain nested objects will be flattened using underscore.

For example:
```js
analytics.identify('userId123', {
  address: {
    city: "New York",
    country: "USA"
  }
});
```
The properties would be sent as:
```js
"address_city": "New York",
"address_country": "USA",
```
