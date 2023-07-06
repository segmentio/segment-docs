---
title: Bloomreach Engagement Destination
rewrite: true
beta: true
id: 5d4d88bbd02041672e51e3ca
---
[Bloomreach Engagement](https://www.bloomreach.com/en/products/engagement?spz=learn_orig/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a Customer Data & Experience Platform (CDXP) which creates a unified source of customer intelligence in real-time, ready for immediate activation using its own built‑in omnichannel marketing systems (web, email, push, mobile, text messages,etc.) powered by customer-centric analytics and artificial intelligence (product recommendations and predictions).

This destination is maintained by Bloomreach Engagement. For any issues with the destination, contact [the Bloomreach Engagement Support team](mailto:support@exponea.com).


{% include content/beta-note.md %}


## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Bloomreach Engagement" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Create a [public API group](https://documentation.bloomreach.com/engagement/reference/authentication){:target="_blank”} for your Segment integration in your Bloomreach Engagement project. Don't forget to set the appropriate [group permissions](https://documentation.bloomreach.com/engagement/reference/authentication#using-the-api-groups){:target="_blank”} to allow recieveing events and customer updates.
4. Fill in the "API Base URL", "API key" and "Project Token" into your Segment Settings UI. You can find all of the above in the API settings page of your Bloomreach Engagement project.
5. Enter your Bloomreach Engagement hard ID and soft ID names into the corresponding fields to specify Segment's userId and anonymousId mapping into your Bloomreach Engagement ID structure.


## Common fields

If you have not had a chance to review the Segment spec, take a look to understand what the [Common fields](/docs/connections/spec/common/) are.

The `userId` and `anonymousId` common fields are used for all types of calls to identify the user in Bloomreach Engagement. Mapping of the IDs is based on the destination settings:

| Segment | Bloomreach Engagement |
| -------- | -------- |
| userId      | Bloomreach Engagement hard ID (e.g registered)     |
| anonymousId | Bloomreach Engagement soft ID (e.g cookie) |



Other common fields are used only for `track`, `page` and `screen` calls which are translated into Bloomreach Engagement events. The following common fields are mapped to Bloomreach Engagement:


| Segment | Bloomreach Engagement |
| -------- | -------- |
| timestamp | timestamp (string date is parsed to unix timestamp) |
| context: app, device, os, screen, referrer, campaign, user_agent, location  | event properties (fields that contain child objects are flattened) |


## Page

If you have not had a chance to review the Segment spec, take a look to understand what the [Page method](/docs/connections/spec/page/) does.

Page calls will be sent to Bloomreach Engagement as a `page_visit` event with the `properties` field mapped into event properties and the `name` field mapped into the `page_name` property.

Example of page call:

```js
analytics.page("Home", {
    url: "https://Bloomreach Engagement.com",
    referrer: "http://google.com"
})
```

This `page` call is translated into a `page_visit` event with the following properties:

```js
"page_name": "Home",
"url": "https://Bloomreach Engagement.com",
"referrer": "http://google.com"
```

An optional event `session_ping` can be tracked along with `page_visit` for [automatic session tracking](https://documentation.bloomreach.com/engagement/docs/system-events#section-first-session-session-start-session-end){:target="_blank”}. You can adjust this behavior in your Bloomreach Engagement destination settings by toggling on and off the 'Track session ping' settings. The Bloomreach Engagement soft ID must be set to `cookie` and the `anonymousId` field must be present in the `page` call for session events to work.


## Screen

If you have not had a chance to review the Segment spec, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does.

Screen calls will be sent to Bloomreach Engagement as a `screen_visit` event with the `properties` field mapped into event properties and the`name` field mapped into the `screen_name` property.

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

An optional event `session_ping` can be tracked along with `screen_visit` for [automatic session tracking](https://documentation.bloomreach.com/engagement/docs/system-events#section-first-session-session-start-session-end){:target="_blank”}. You can adjust this behavior in your Bloomreach Engagement destination settings by toggling on and off the 'Track session ping' settings. The Bloomreach Engagement soft ID must be set to `cookie` for session events to work and `anonymousId` field must be present in the `screen` call for session events to work.

## Track

If you have not had a chance to review the Segment spec, take a look to understand what the [Track method](/docs/connections/spec/track/) does.

Track calls will be sent to Bloomreach Engagement as events under name provided in the event field. The `properties` field will be mapped into event properties (objects will be flattened using underscore).

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

If you have not had a chance to review the Segment spec, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does.

Identify calls will be sent to Bloomreach Engagement as customer updates with traits set as customer properties.

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

This identify call is translated into a customer update for user with Bloomreach Engagement hard id `userId123` with properties:

```js
"name": "John Doe",
"email": "john.doe@example.com",
"address_city": "New York",
"address_country": "USA",
```

## Alias

If you have not had a chance to review our spec, take a look to understand what the [Alias method](/docs/connections/spec/alias/) does.

The alias call can be used to merge two user identities and their data to one. The `previousId` field should always contain a previously used `anonymousId`, as merging users by specifying two `userIds` is not supported. Sending an alias event with `previousId` and no `userId` will cause the event to be ignored. Note that users are also merged when any call specifies both a userId and an anonymousId, which previously belonged to two separate users.

Example of alias call:

```js
analytics.alias("507f191e81");
```
## Group

If you have not had a chance to review the Segment spec, take a look to understand what the [Group method](/docs/connections/spec/group/) does.

Group calls will be sent to Bloomreach Engagement as customer updates with group traits as customer properties prefixed with `group_` and `groupId` into `group_id`. For example:

```js
analytics.group("123", {
  name: "Bloomreach Engagement",
  industry: "Technology"
});
```

will be translated into a customer update with properties:

```js
"group_id": "123",
"group_name": "Bloomreach Engagement",
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
