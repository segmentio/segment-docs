---
title: Client-side persistence in Analytics.js
strat: ajs
---

This page explains what data Analytics.js stores on the client and how to override and change what and how this data is stored.

## Segment ID Persistence

<!-- Note: 1st 2 paragraphs copied from identity.md -->

To ensure high fidelity, first-party customer data, Segment writes the user's IDs to the user's local storage, and uses that as the Segment ID on the cookie whenever possible. Local Storage is meant for storing this type of first-party customer information.

If a user returns to your site after the cookie expires, Analytics.js looks for an old ID in the user's `localStorage`, and if one is found, sets it as the user's ID again in the new cookie. If a user clears their cookies _and_ `localstorage`, all of the IDs are removed, and the user gets a completely new `anonymousID` when they next visit the page.

### Cookie Settings

Analytics.js sets some default properties when creating cookies for user or group identities. You can override the default cookie properties in code when loading Analytics.js by passing in a `cookie` object.

Here is the full list of available parameters with their default values:

| Parameter | Description | Default value |
| --- | --- | --- |
| `domain` | The domain to set the cookie to. This must match the domain of the JavaScript origin. Cookies set on top-level domain are available to sub-domains. | Top-level domain |
| `maxage` | The maximum amount of time in seconds before the cookie expires. Browsers may clear cookies before this elapses. | 1 year |
| `path` | The path the cookie is valid for. | `"/"` |
| `sameSite` | This prevents the browser from sending the cookie along with cross-site requests. | `Lax` |
| `secure` | This determines whether cookies can only be transmitted over secure protocols such as https. | `false` |

Example:
```js
analytics.load('writeKey', {
  cookie: {
    domain: 'sub.site.example',
    maxage: 604800, // 7 days in seconds
    path: '/',
    sameSite: 'Lax',
    secure: true
  }
})
```

### User Settings

Analytics.js automatically persists the user's ID and traits locally. You can override how and where the user ID and traits are stored when loading Analytics.js by passing in a `user` object.

The user object has the following fields and default values:

| Option | Description | Default value |
| ------ | ----------- | ------------- |
| `persist` | This toggles storing user information locally. | `true` |
| `cookie.key` | Name of the cookie used to store the user ID. | `ajs_user_id` |
| `cookie.oldKey` | Name of a cookie previously used to store the user ID. Will be read if `cookie.key` can't be found. | `ajs_user` |
| `localStorage.key` | Name of the key used to store user traits in LocalStorage. | `ajs_user_traits` |

Example:
```js
analytics.load('writeKey', {
  user: {
    persist: true,
    cookie: {
      key: 'ajs_user_id'
    },
    localStorage: {
      key: 'ajs_user_traits'
    }
  }
})
```

### Group Settings

Analytics.js automatically persists the user's group ID and group properties locally. You can override how and where the group ID and properties are stored when loading analytics.js by passing in a `group` object.

The group object has the following fields and default values:

| Field | Description | Default value |
| ----- | ----------- | ------------- |
| `persist` | Toggles storing group information locally. | `true` |
| `cookie.key` | Name of the cookie used to store the group id. | `ajs_group_id` |
| `localStorage.key` | Name of the key used to store user traits in LocalStorage. | `ajs_group_properties` |

Example:
```js
analytics.load('writeKey', {
  group: {
    persist: true,
    cookie: {
      key: 'ajs_group_id'
    },
    localStorage: {
      key: 'ajs_group_properties'
    }
  }
})
```

## Persistent Retries

When enabled, Analytics.js automatically retries network and server errors. When the client is offline or your application can't connect to Segment's API, Analytics.js stores events in `localStorage` and falls back to in-memory storage when `localStorage` is unavailable.

## Disable All Client-Side Persistence

<!-- TODO: Mention GDPR and/or regulations as a reason to do this? -->
Analytics.js supports disabling persisting any data locally. This will force analytics.js to store data in-memory only and disables automatic identity tracking across pages.

You can completely disable client-side persistence when loading Analytics.js by setting `disableClientPersistence` to `true`.

```js
analytics.load('writeKey', { disableClientPersistence: true })
```
