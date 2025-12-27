---
title: 'Spec: Alias'
---

The Alias method is an advanced method used to merge 2 unassociated user identities, effectively connecting 2 sets of user data in one profile. 

> info "Alias and Unify"
> Alias calls can't be used to merge profiles in [Unify](/docs/unify/). For more information on how Unify merges user profiles, view the [Identity Resolution documentation](https://segment.com/docs/unify/identity-resolution/). 
> _To prevent the Alias event from sending to Unify, simply add `{integrations:{"Personas":false}}` within the event's `options` parameter. Please review the Examples provided below for additional context._

> info "Alias is an advanced method"
> The Alias method allows you to explicitly change the ID of a tracked user. This should only be done when it's required for downstream destination compatibility. See the [Best Practices for Identifying Users](/docs/guides/how-to-guides/best-practices-identify/) docs for more information.

<!-- Since this is Segment's most advanced method, there are sections on each docs page for destinations that use it:

- [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics#alias)
- [Mixpanel](/docs/connections/destinations/catalog/mixpanel#alias)
- [Vero](/docs/connections/destinations/catalog/vero#alias)

 TODO: do more research on if this is required anywhere anymore. --->

## Syntax

The Alias call has the following fields:

| Field        |          | Type     | Description                                                                                                                                     |
| ------------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `userId`     | optional | String   | The `userId` is a string that will be the user's new identity, or an existing identity that you wish to merge with the `previousId`. See the [User ID docs](/docs/connections/spec/identify#user-id) for more detail.                                                                                            |
| `previousId` | optional | String   | The `previousId` is the existing ID you've referred to the user by. It might be an Anonymous ID assigned to that user or a User ID you previously identified them with using Segment's [Identify](/docs/connections/spec/identify/) call.                                          |
| `options`    | optional | Object   | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. |
| `callback`   | optional | Function | A function that is executed after a timeout of 300 ms, giving the browser time to make outbound requests first.                                 |

The Alias method follows the format below:

```js
analytics.alias(userId, [previousId], [options], [callback]);
```
Examples : 
```js
// Alias event that includes the new userId and previousId.
analytics.alias("507f191e81", "jen@email.com");

// Alias event that includes the new userId and previousId, passes in context.traits.email as the options parameter, and an Identify event as the callback function.
analytics.alias("507f191e81", "jen@email.com", {"traits":{"email":"jen@email.com"}}, ()=>{analytics.identify("507f191e81")});

// Alias event that includes the new userId and previousId, accesses the client's existing traits as the options parameter, and an Identify event as the callback function parameter that includes the A.js method to access the client's existing traits to persist them when assigning a new userId on the client, and adds a new trait of status.
analytics.alias("507f191e81", "jen@email.com", {"traits":analytics.user().traits()}, ()=>{analytics.identify("507f191e81", {...analytics.user().traits(), "status":"alias")});

// To prevent the Alias event from sending to Unify, simply add {integrations:{"Personas":false}} within an event's options parameter. Doing so to the example event provided above would prevent both the Alias and the Identify events from entering Unify.
analytics.alias("507f191e81", "jen@email.com", {"traits":analytics.user().traits(), integrations:{"Personas":false}}, ()=>{analytics.identify("507f191e81", {...analytics.user().traits(), "status":"alias"}, {integrations:{"Personas":false}})});
```


Here's the payload of a basic Alias call that will associate this user's existing `id` (email address) with a new one (a database ID), with most [common fields](/docs/connections/spec/common/) removed:

```js
{
  "type": "alias",
  "previousId": "jen@email.com",
  "userId": "507f191e81"
}
```

Here's the corresponding JavaScript event that would generate the above payload. If you're using Segment's JavaScript library, Segment automatically passes in the user's `anonymousId` as `previousId` for you:

```js
analytics.alias("507f191e81");

// This event would also result in the same payload above
analytics.alias("507f191e81", "jen@email.com");
```
_Please note that none of Segment's server-side libraries will automatically pass the user's `previousId` into the payload, but this field will need to be collected and included in the event payload as is done in all other server-side events._

When a `userId` is not provided in the Analytics.js library's Alias event, such as in `analytics.alias()`, Segment automatically passes in the user's `anonymousId` as the `previousId` for you, while the `userId` is set to `null`. However, for effective user aliasing, the new `userId` should be provided in the event.

If you're instrumenting a website, the Anonymous ID is generated in the browser so you must call Alias from the client-side. If you're using a server-side session ID as the Anonymous ID, then you must call Alias from the server-side.


{% include content/syntax-note.md %}

## Examples
Here's a complete example of an Alias call:

```js
{
  "anonymousId": "507f191e810c19729de860ea",
  "channel": "browser",
  "context": {
    "ip": "8.8.8.8",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "previousId": "39239-239239-239239-23923",
  "receivedAt": "2024-02-23T22:28:55.387Z",
  "sentAt": "2024-02-23T22:28:55.111Z",
  "timestamp": "2024-02-23T22:28:55.111Z",
  "type": "alias",
  "userId": "507f191e81",
  "version": "1.1"
}
```

## Client-Side : Alias with Identify

Triggering an Alias event with Segment's Analytics.js client-side library with a new `userId` will not overwrite the client's existing `userId` cookie, `ajs_user_id`. If you would like to do so, you will need to follow the Alias event with an Identify event, by passing in the new `userId` within the Identify event. You can also persist the client's other existing cookies, such as user traits `ajs_user_traits` with its method `analytics.user().traits()`, as is shown in the examples below. 

You can technically trigger the Identify separately after the Alias event has been triggered, or you can pass the Identify event inside the Alias' callback parameter. The second and third examples illustrate how to pass an Identify event into the Alias' callback function parameter, which will be triggered after the Alias event is triggered.
- If the existing traits method is not used then upon the Identify event is triggered, all traits will be removed from the client's cookies. 
- When Identify is called with a new `userId`, the `anonymousId` cookie is also regenerated with a new value, but can be persisted if passed in as the Identify event's options parameter, as is done in the third example with its method.

Examples : 
```js
// Alias event that includes the new userId and previousId.
analytics.alias("507f191e81", "jen@email.com");

// Alias event that includes the new userId and previousId, passes in context.traits.email as the options parameter, and an Identify event as the callback function.
analytics.alias("507f191e81", "jen@email.com", {"traits":{"email":"jen@email.com"}}, ()=>{analytics.identify("507f191e81")});

// Alias event that includes the new userId and previousId, accesses the client's existing traits as the options parameter, and an Identify event as the callback function parameter that includes the A.js method to access the client's existing traits to persist them when assigning a new userId on the client, and adds a new trait of "status", also persisting the anonymousId 
analytics.alias("507f191e81", "jen@email.com", {"traits":analytics.user().traits()}, ()=>{analytics.identify("507f191e81", {...analytics.user().traits(), "status":"aliased user"}, {anonymousId: analytics.user().anonymousId()})});
```
