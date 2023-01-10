---
title: Authentication
---
Most destinations require some sort of authentication. Segment's destination interface provides details about how customers need to authenticate with your destination to send data or retrieve data for dynamic input fields.

## Basic Authentication

Basic authentication is useful if your destination requires a username and password to authenticate. These are values that only the customer and the destination know.

> success ""
> When scaffolding your integration, select Basic Auth from the auto-prompt or pass `--template basic-auth`.

```js
const authentication = {
  // the 'basic' authentication scheme tells Segment to automatically
  // include the `username` and `password` fields so you don't have to.
  // Segment will automatically do base64 header encoding of the username:password
  scheme: 'basic',

  fields: {
    username: {
      label: 'Username',
      description: 'Your username',
      type: 'string',
      required: true
    },
    password: {
      label: 'password',
      description: 'Your password.',
      type: 'string',
      required: true
    }
  },

  // a function that can test the user's credentials
  testRequest: (request) => {
    return request('https://example.com/api/accounts/me.json')
  }
}

const destination = {
  // ...other properties
  authentication,

  extendRequest({ settings }) {
    return {
      username: settings.username,
      password: settings.password
    }
  }
}
```

## Custom Authentication

Custom authentication is the most commonly used authentication among Segment destinations. It's what most “API Key” based authentication should use. You’ll likely need to define an `extendRequest` function to complete the authentication by modifying request headers with some authentication input fields.

```js
const authentication = {
  // the 'custom' scheme doesn't do anything automagically for you, but let's you
  // define the behavior through input fields and `extendRequest`.
  // this is what most API key-based destinations should use
  scheme: 'custom',

  // a function that can test the user's credentials
  testRequest: (request) => {
    return request(`/accounts/me.json`)
  },

  // fields that are specific to authentication
  fields: {
    subdomain: {
      type: 'string',
      label: 'Subdomain',
      description: 'The subdomain for your account, found in your user settings.',
      required: true
    },
    apiKey: {
      type: 'string',
      label: 'API Key',
      description: 'Found on your settings page.',
      required: true
    }
  }
}

const destination = {
  // ...other properties
  authentication,
  // we may explore a simple JSON representation that supports template strings
  extendRequest: ({ settings }) => {
    return {
      prefixUrl: `https://${settings.subdomain}.example.com/api`,
      headers: { Authorization: `Bearer ${settings.apiKey}` },
      responseType: 'json'
    }
  }
}
```

## OAuth 2.0 Managed

If your API supports [OAuth 2.0](https://oauth.net/2/){:target="_blank"}, you can authenticate your destination's users with it.

```js
const authentication = {
  // the 'oauth-managed' authentication scheme tells Segment use the
  // oauth credentials and endpoint that you provide to authenticate users.
  scheme: 'oauth-managed',
}
```

When you receive access to the Developer Portal, find your integration, and navigate to the **OAuth settings** tab to configure the integration's OAuth details.