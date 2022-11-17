---
title: Authentication
---
Most destinations require some sort of authentication. Segment's Destination interface provides details about how customers need to authenticate with your destination to send data or retrieve data for dynamic input fields.

## Basic Authentication

Basic authentication is useful if your destination requires username and password to authenticate. These are values that only the customer and the destination know.

> success ""
> When scaffolding your integration, pass `--template basic-auth` to use Basic Auth, or selecting it from the auto-prompt.

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

## OAuth2 Authentication Scheme

> info ""
> OAuth authentication is not generally available to external partners as part of Developer Center Pilot. Contact the Segment Support if your integration requires it.

The OAuth2 Authentication scheme is the model to be used for destination APIs which support [OAuth 2.0](https://oauth.net/2/). You can define a `refreshAccessToken` function if you want the framework to refresh expired tokens.

You'll see a new `auth` object available in `extendRequest` and `refreshAccessToken` which surfaces your destination’s `accessToken`, `refreshToken`, `clientId`, and `clientSecret` (these last are available in `refreshAccessToken`).

Most destination APIs expect the access token as part of the authorization header in every request. You can use `extendRequest` to define that header.

```js
authentication: {
    scheme: 'oauth2',
    fields: {
      subdomain: {
        type: 'string',
        label: 'Subdomain',
        description: 'The subdomain for your account, found in your user settings.',
        required: true
      }
    },
    testAuthentication: async (request) => {
      const res = await request<UserInfoResponse>('https://www.example.com/oauth2/v3/userinfo', {
        method: 'GET'
      })
      return { name: res.data.name}
    },
    refreshAccessToken: async (request, { settings, auth }) => {
      const res = await request<RefreshTokenResponse>(`https://${settings.subdomain}.example.com/api/oauth2/token`, {
        method: 'POST',
        body: new URLSearchParams({
          refresh_token: auth.refreshToken,
          client_id: auth.clientId,
          client_secret: auth.clientSecret,
          grant_type: 'refresh_token'
        })
      })
      return { accessToken: res.data.access_token }
    }
  },
  extendRequest({ auth }) {
    return {
      headers: {
        authorization: `Bearer ${auth?.accessToken}`
      }
    }
  }
```

> info ""
> OAuth directly depends on the oauth providers available in Segment's internal OAuth Service. Contact Segment if you require OAuth for your destination.

