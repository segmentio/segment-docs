---
title: 'Spec: Alias'
---

The Alias method is an advanced method used to merge 2 unassociated user identities, effectively connecting 2 sets of user data in one profile. 

> info "Alias and Unify"
> Alias calls can't be used to merge profiles in [Unify](/docs/unify/). For more information on how Unify merges user profiles, view the [Identity Resolution documentation](https://segment.com/docs/unify/identity-resolution/). 

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
| `userId`     |          | String   | The `userId` is a string that will be the user's new identity, or an existing identity that you wish to merge with the `previousId`. See the [User ID docs](/docs/connections/spec/identify#user-id) for more detail.                                                                                            |
| `previousId` | optional | String   | The `previousId` is the existing ID you've referred to the user by. It might be an Anonymous ID assigned to that user or a User ID you previously identified them with using Segment's [Identify](/docs/connections/spec/identify/) call.                                          |
| `options`    | optional | Object   | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. |
| `callback`   | optional | Function | A function that is executed after a timeout of 300 ms, giving the browser time to make outbound requests first.                                 |

The Alias method follows the format below:

```js
analytics.alias(userId, [previousId], [options], [callback]);
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
```

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
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36"
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "previousId": "39239-239239-239239-23923",
  "receivedAt": "2015-02-23T22:28:55.387Z",
  "sentAt": "2015-02-23T22:28:55.111Z",
  "timestamp": "2015-02-23T22:28:55.111Z",
  "type": "alias",
  "userId": "507f191e81",
  "version": "1.1"
}
```
