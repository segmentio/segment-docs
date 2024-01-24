---
title: Client-side persistence in Analytics.js
redirect_from: '/connections/sources/catalog/libraries/website/javascript/persistence/'
strat: ajs
---

This page explains what data Analytics.js stores on the client and how to override and change what and how this data is stored.

## Segment ID persistence

<!-- Note: 1st 2 paragraphs copied from identity.md -->

To ensure high fidelity, first-party customer data, Segment writes the user's IDs to the user's local storage and uses that as the Segment ID on the cookie whenever possible. Local storage is for storing this type of first-party customer information.

If a user returns to your site after the cookie expires, Analytics.js looks for an old ID in the user's `localStorage`, and if one is found, it sets as the user's ID again in the new cookie. If a user clears their cookies _and_ `localStorage`, all of the IDs are removed, and the user gets a completely new [`anonymousID`](/docs/connections/sources/catalog/libraries/website/javascript/identity/#anonymous-ids) when they next visit the page.

### Cookie settings

Analytics.js sets some default properties when creating cookies for user or group identities. You can override the default cookie properties in code when loading Analytics.js by passing in a `cookie` object to the load method.

> info ""
> Analytics.js doesn't set third-party cookies and only sets first-party cookies.

Here is the full list of available parameters with their default values:

| Parameter | Description | Default value |
| --- | --- | --- |
| `domain` | The domain to set the cookie to. This must match the domain of the JavaScript origin. If an Analytics.js cookie already exists at the top-level domain, Segment carries the same cookie value to any subdomains, despite `domain` configuration. | Top-level domain |
| `maxage` | The maximum amount of time in days before the cookie expires. Browsers may clear cookies before this elapses. | 1 year |
| `path` | The path the cookie is valid for. | `"/"` |
| `sameSite` | This prevents the browser from sending the cookie along with cross-site requests. | `Lax` |
| `secure` | This determines whether cookies can only be transmitted over secure protocols such as https. | `false` |

Example:
```js
analytics.load('writeKey', {
  cookie: {
    domain: 'sub.site.example',
    maxage: 7, // 7 days
    path: '/',
    sameSite: 'Lax',
    secure: true
  }
})
```
> info ""
> Chrome has a maximum limit of 400 days for cookies. If a value is set beyond that, then Chrome sets the upper limit to 400 days instead of rejecting it. Visit Chrome's [docs](https://developer.chrome.com/blog/cookie-max-age-expires/){:target="blank"} to learn more.

### Device-mode destination cookies

Segment doesn't control cookie management for device-mode destinations. As a result, the way cookies are used and managed is solely determined by each individual SDK. For example, if you have concerns about destinations setting third-party cookies, Segment recommends that you consult directly with the destination providers for clarification. For instance, Amplitude, one of the destinations in the Segment catalog, provides an informative [article on this topic](https://www.docs.developers.amplitude.com/guides/cookies-consent-mgmt-guide/#abstraction-layer-for-storage){:target="blank"}.

### User settings

Analytics.js automatically persists the user's ID and traits locally. You can override how and where the user ID and traits are stored when loading Analytics.js by passing in a `user` object to the load method.

The user object has the following fields and default values:

| Option | Description | Default value |
| ------ | ----------- | ------------- |
| `persist` | This toggles storing user information locally. | `true` |
| `cookie.key` | Name of the cookie used to store the user ID. | `ajs_user_id` |
| `cookie.oldKey` | Name of a cookie previously used to store the user ID. Will be read if `cookie.key` can't be found. | `ajs_user` |
| `localStorage.key` | Name of the key used to store user traits in localStorage. | `ajs_user_traits` |

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

### Group settings

Analytics.js automatically persists the user's group ID and group properties locally. You can override how and where the group ID and properties are stored when loading Analytics.js by passing in a `group` object to the load method.

The group object has the following fields and default values:

| Field | Description | Default value |
| ----- | ----------- | ------------- |
| `persist` | Toggles storing group information locally. | `true` |
| `cookie.key` | Name of the cookie used to store the group id. | `ajs_group_id` |
| `localStorage.key` | Name of the key used to store user traits in localStorage. | `ajs_group_properties` |

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

## Persistent retries

When enabled, Analytics.js automatically retries network and server errors. When the client is offline or your application can't connect to Segment's API, Analytics.js stores events in `localStorage` and falls back to in-memory storage when `localStorage` is unavailable.

## Disable all client-side persistence

<!-- TODO: Mention GDPR and/or regulations as a reason to do this? -->
Analytics.js supports disabling persisting any data locally. This will force analytics.js to store data in-memory only and disables automatic identity tracking across pages.

You can completely disable client-side persistence when loading Analytics.js by setting `disableClientPersistence` to `true`.

```js
analytics.load('writeKey', { disableClientPersistence: true })
```

### Identity

When `disableClientPersistence` is set to `true`, Analytics.js won't be able to automatically keep track of a user's identity when navigating to different pages. This can cause increased MTU usage if the anonymous usage can't be associated with a `userId`.

You can still manually track identity by calling `analytics.identify()` with the known identity on each page load, or you can pass in identity information to each page using the [querystring API](/docs/connections/sources/catalog/libraries/website/javascript/querystring/).

### Event retries

Analytics.js tries to detect when a page is about to be closed and saves pending events to `localStorage`. When the user navigates to another page within the same domain, Analytics.js attempts to send any events it finds in localStorage.

When `disableClientPersistence` is set to `true`, Analytics.js won't store any pending events into `localStorage`.

## Client-side cookie methods (get, set, clear)

To access or assign a value to a cookie outside of the standard Segment methods (track/identify/page/group), you can use the following methods. To access the cookie's value, pass an empty `()` at the end of the method. To assign the value, include the string value inside those parenthesis, for example, `('123-abc')`. To clear or remove the value for a specific field, pass in an empty value of its type. For example, for string `('')`, or for object `({})`.

<table class="horizontal-scroll">
  <tr style="background-color: #fafbff; font-size: 10px;">
    <th>FIELD</th>
    <th>COOKIE NAME</th>
    <th>ANALYTICS.JS METHOD</th>
    <th>LOCAL STORAGE METHOD</th>
    <th>SET EXAMPLE</th>
    <th>CLEAR EXAMPLE</th>
  </tr>
  <tr>
    <td>`userId`</td>
    <td>`ajs_user_id`</td>
    <td>`analytics.user().id();`</td>
    <td>`window.localStorage.ajs_user_id`</td>
    <td>`analytics.user().id('123-abc');`</td>
    <td>`analytics.user().id('');` </td>
  </tr>
 <tr>
    <td>`anonymousId`</td>
    <td>`ajs_anonymous_id`</td>
    <td>`analytics.user().anonymousId();`</td>
    <td>`window.localStorage.ajs_anonymous_id`</td>
    <td>`analytics.user().anonymousId('333-abc-456-dfg');`</td>
    <td>`analytics.user().anonymousId('');`</td>
  </tr>
  <tr>
    <td>`user traits`</td>
    <td>`ajs_user_traits`</td>
    <td>`analytics.user().traits();`</td>
    <td>`window.localStorage.ajs_user_traits`</td>
    <td>`analytics.user().traits({firstName:'Jane'});`</td>
    <td>`analytics.user().traits({});`</td> 
  </tr>
  <tr>
    <td>`groupId`</td>
    <td>`ajs_group_id`</td>
    <td>`analytics.group().id();`</td>
    <td>`window.localStorage.ajs_group_id`</td>
    <td>`analytics.group().id('777-qwe-098');`</td>
    <td>`analytics.group().id('');`</td>
  </tr>
  <tr>
    <td>`group traits`</td>
    <td>`ajs_group_properties`</td>
    <td>`analytics.group().traits()`</td>
    <td>`window.localStorage.ajs_group_properties`</td>
    <td>`analytics.group().traits({name:'Segment'})`</td>
    <td>`analytics.group().traits({})`</td>
  </tr>
</table>

## Storage Priority

By default, Analytics.js uses `localStorage` as its preferred storage location, with Cookies as a fallback when `localStorage` is not available or not populated. An in-memory storage is used as a last fallback if all the previous ones are disabled.

Default Storage Priority:

```md
LocalStorage -> Cookie -> InMemory
```

Some scenarios might require a switch in the storage systems priority:

- Apps that move the user across different subdomains
- Apps where the server needs control over the user data
- User Consent
- Availability

You can configure the storage priority in the Analytics.js client using the `storage` property, either globally or only for user or group data.

The `storage` property accepts an array of supported storage names (`localStorage`, `cookie`, `memory`) to be used in the priority order of the array.

```js
analytics.load('writeKey', {
  // Global Storage Priority: Both User and Group data
  storage: {
    stores: ['cookie', 'localStorage', 'memory']
  },
  // Specific Storage Priority
  user: {
    storage: {
      stores: ['cookie', 'localStorage', 'memory']
    }
  },
  group: {
    storage: {
      stores: ['cookie', 'localStorage', 'memory']
    }
  },
}
```
