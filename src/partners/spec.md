---
title: Segment Spec for Partners
---

Segment users instrument their apps with a the Segment SDKs. The most common SDK is analytics.js, which is used in a webapp as the following:

```js
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@example.com",
  plan: "premium",
  logins: 5
});
```

These simple SDK calls are turned into an "event" -- JSON data for Segment and its Partners to process. The event data for the identify call is:

```json
{
  "type": "identify",
  "traits": {
    "name": "Peter Gibbons",
    "email": "peter@example.com",
    "plan": "premium",
    "logins": 5
  },
  "userId": "97980cfea0067"
}
```

However the SDKs also add common fields about the user, their environment, timestamps and more. In reality the full event data for the identify call is:

```json
{
  "_metadata": {
    "bundled": [
      "Segment.io"
    ],
    "unbundled": [
      "Facebook Pixel"
    ]
  },
  "anonymousId": "3d316d2c-26e8-451f-91be-a0766708c81e",
  "channel": "client",
  "context": {
    "ip": "67.160.210.48",
    "library": {
      "name": "analytics.js",
      "version": "3.8.2"
    },
    "page": {
      "path": "index.html",
      "referrer": "",
      "search": "",
      "title": "",
      "url": "index.html"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36"
  },
  "integrations": {},
  "messageId": "ajs-18c6f23382e31fad89210c1c022cc068",
  "originalTimestamp": "2019-06-21T16:33:26.060Z",
  "projectId": "P0OJ3CTID1",
  "receivedAt": "2019-06-21T16:33:26.158Z",
  "sentAt": "2019-06-21T16:33:26.060Z",
  "timestamp": "2019-06-21T16:33:26.158Z",
  "traits": {
    "email": "peter@example.com",
    "logins": 5,
    "name": "Peter Gibbons",
    "plan": "premium"
  },
  "type": "identify",
  "userId": "97980cfea0067",
  "version": 2
}
```

As a Partner your job is to take this JSON event and translate it into API calls to your system.

To help with this effort, full details of a customer's journey and their event data are documented below.

## Common Fields

The power of the Segment Spec is that it helps Segment Users and Partners collect data in a common structure. Here's an example of all the common fields:

```json
{
  "anonymousId": "507f191e810c19729de860ea",
  "context": {
    "active": true,
    "app": {
      "name": "InitechGlobal",
      "version": "545",
      "build": "3.0.1.545",
      "namespace": "com.production.segment"
    },
    "campaign": {
      "name": "TPS Innovation Newsletter",
      "source": "Newsletter",
      "medium": "email",
      "term": "tps reports",
      "content": "image link"
    },
    "device": {
      "id": "B5372DB0-C21E-11E4-8DFC-AA07A5B093DB",
      "advertisingId": "7A3CBEA0-BDF5-11E4-8DFC-AA07A5B093DB",
      "adTrackingEnabled": true,
      "manufacturer": "Apple",
      "model": "iPhone7,2",
      "name": "maguro",
      "type": "ios",
      "token": "ff15bc0c20c4aa6cd50854ff165fd265c838e5405bfeb9571066395b8c9da449"
    },
    "ip": "8.8.8.8",
    "library": {
      "name": "analytics.js",
      "version": "2.11.1"
    },
    "locale": "nl-NL",
    "location": {
      "city": "San Francisco",
      "country": "United States",
      "latitude": 40.2964197,
      "longitude": -76.9411617,
      "speed": 0
    },
    "network": {
      "bluetooth": false,
      "carrier": "T-Mobile NL",
      "cellular": true,
      "wifi": false
    },
    "os": {
      "name": "iPhone OS",
      "version": "8.1.3"
    },
    "page": {
      "path": "/academy/",
      "referrer": "",
      "search": "",
      "title": "Analytics Academy",
      "url": "https://segment.com/academy/"
    },
    "referrer": {
      "id": "ABCD582CDEFFFF01919",
      "type": "dataxu"
    },
    "screen": {
      "width": 320,
      "height": 568,
      "density": 2
    },
    "groupId": "12345",
    "timezone": "Europe/Amsterdam",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "receivedAt": "2015-12-10T04:08:31.909Z",
  "sentAt": "2015-12-10T04:08:31.581Z",
  "timestamp": "2015-12-10T04:08:31.905Z",
  "type": "track",
  "userId": "97980cfea0067",
  "version": 2
}
```

Below are highlights about these common fields for event data. Most of these are optional for Segment Users to supply, but if they do collect this information it will be available in these common fields.

As you build your integration you should try to map as many of these common fields to the equivalent fields in your systems.

See the [Common Fields](https://segment.com/docs/connections/spec/common/) doc for full details.

### anonymousId / userId

Every event has either an `anonymousId` or `userId` field, which is an identifier for the customer.

### messageId

Segment automatically adds a `messageId` to every event to uniquely identify it.

### receivedAt

Segment automatically adds a `receivedAt` to every event for when it was received.

### type

Every event has a `type` field, which has the type of the event: `identify`, `track`, `page`, `screen`, `group`, `alias` or `delete`.

### traits

Identify and Group events have a `traits` field for info about the user.

There are a set of standardized traits for Identify events:

* address
* age
* avatar
* birthday
* company
* createdAt
* description
* email
* firstName
* gender
* id
* lastName
* name
* phone
* title
* username
* website

See the [Identify traits](https://segment.com/docs/connections/spec/identify/#traits) doc for full details.

And a set for Group events:

* address
* avatar
* createdAt
* description
* email
* employees
* id
* industry
* name
* phone
* website
* plan

See the [Group traits](https://segment.com/docs/connections/spec/group/#traits) doc for full details.

### properties

Track, Page and Screen events have a `properties` field for extra information related to the event.

There are a set of standardized properties for Track events:

* revenue
* currency
* value

See the [Track properties](https://segment.com/docs/connections/spec/track/#properties) doc for full details.

And a set for Page events:

* name
* path
* referrer
* search
* title
* url
* keywords

See the [Page properties](https://segment.com/docs/connections/spec/page/#properties) doc for full details.

And a set for Screen events:

* name

See the [Screen properties](https://segment.com/docs/connections/spec/screen/#properties) doc for full details.

### context

Every call can add an optional `context` object for extra information about the data.

* active
* app
* campaign
* device
* ip
* library
* locale
* location
* network
* os
* page
* referrer
* screen
* timezone
* groupId
* traits
* userAgent

See the [Context](https://segment.com/docs/connections/spec/common/#context) doc for full details.

## Identify

A Segment user can identify who a customer is:

```js
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@example.com",
  plan: "premium",
  logins: 5
});
```

This results in the following event data:

```json
{
  "_metadata": {
    "bundled": [
      "Segment.io"
    ],
    "unbundled": [
      "Facebook Pixel"
    ]
  },
  "anonymousId": "3d316d2c-26e8-451f-91be-a0766708c81e",
  "channel": "client",
  "context": {
    "ip": "67.160.210.48",
    "library": {
      "name": "analytics.js",
      "version": "3.8.2"
    },
    "page": {
      "path": "/index.html",
      "referrer": "",
      "search": "",
      "title": "",
      "url": "https://example.com/index.html"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
  },
  "integrations": {},
  "messageId": "ajs-54ca80b0e856b62bb239ca9debbf5e2e",
  "originalTimestamp": "2019-06-21T17:33:22.373Z",
  "projectId": "P0OJ3CTID1",
  "receivedAt": "2019-06-21T17:33:22.486Z",
  "sentAt": "2019-06-21T17:33:22.373Z",
  "timestamp": "2019-06-21T17:33:22.486Z",
  "traits": {
    "email": "peter@example.com",
    "logins": 5,
    "name": "Peter Gibbons",
    "plan": "premium"
  },
  "type": "identify",
  "userId": "97980cfea0067",
  "version": 2
}
```

## Track

A Segment user can track what a customer is doing:

```js
analytics.track("Registered", {
  plan: "Pro Annual",
  accountType: "Facebook"
});
```

This results in the following event data:

```json
{
  "_metadata": {
    "bundled": [
      "Segment.io"
    ],
    "unbundled": [
      "Facebook Pixel"
    ]
  },
  "anonymousId": "3d316d2c-26e8-451f-91be-a0766708c81e",
  "channel": "client",
  "context": {
    "ip": "67.160.210.48",
    "library": {
      "name": "analytics.js",
      "version": "3.8.2"
    },
    "page": {
      "path": "/index.html",
      "referrer": "",
      "search": "",
      "title": "",
      "url": "https://example.com/index.html"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
  },
  "event": "Registered",
  "integrations": {},
  "messageId": "ajs-920a8b6591f0d25cc117fb71602a6b17",
  "originalTimestamp": "2019-06-21T17:35:47.381Z",
  "projectId": "P0OJ3CTID1",
  "properties": {
    "accountType": "Facebook",
    "plan": "Pro Annual"
  },
  "receivedAt": "2019-06-21T17:35:47.405Z",
  "sentAt": "2019-06-21T17:35:47.382Z",
  "timestamp": "2019-06-21T17:35:47.404Z",
  "type": "track",
  "userId": "97980cfea0067",
  "version": 2
}
```

## Page

A Segment user can record what page a customer is on:

```js
analytics.page("Home");
```

This results in the following event data:

```json
{
  "_metadata": {
    "bundled": [
      "Segment.io"
    ],
    "unbundled": [
      "Facebook Pixel"
    ]
  },
  "anonymousId": "3d316d2c-26e8-451f-91be-a0766708c81e",
  "category": null,
  "channel": "client",
  "context": {
    "ip": "67.160.210.48",
    "library": {
      "name": "analytics.js",
      "version": "3.8.2"
    },
    "page": {
      "path": "/index.html",
      "referrer": "",
      "search": "",
      "title": "",
      "url": "https://example.com/index.html"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
  },
  "integrations": {},
  "messageId": "ajs-472682d0fbe3250d9e436f18e18d1966",
  "name": "Home",
  "originalTimestamp": "2019-06-21T17:36:42.787Z",
  "projectId": "P0OJ3CTID1",
  "properties": {
    "name": "Home",
    "path": "/index.html",
    "referrer": "",
    "search": "",
    "title": "",
    "url": "https://example.com/index.html"
  },
  "receivedAt": "2019-06-21T17:36:42.812Z",
  "sentAt": "2019-06-21T17:36:42.787Z",
  "timestamp": "2019-06-21T17:36:42.812Z",
  "type": "page",
  "userId": "97980cfea0067",
  "version": 2
}
```

## Group

A Segment user can group a customer into an account or organization:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

This results in the following event data:

```json
{
  "_metadata": {
    "bundled": [
      "Segment.io"
    ],
    "unbundled": [
      "Facebook Pixel"
    ]
  },
  "anonymousId": "3d316d2c-26e8-451f-91be-a0766708c81e",
  "channel": "client",
  "context": {
    "ip": "67.160.210.48",
    "library": {
      "name": "analytics.js",
      "version": "3.8.2"
    },
    "page": {
      "path": "/index.html",
      "referrer": "",
      "search": "",
      "title": "",
      "url": "https://example.com/index.html"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
  },
  "groupId": "0e8c78ea9d97a7b8185e8632",
  "integrations": {},
  "messageId": "ajs-faf5e68c4da409781e30660f918d7be6",
  "originalTimestamp": "2019-06-21T17:39:06.142Z",
  "projectId": "P0OJ3CTID1",
  "receivedAt": "2019-06-21T17:39:06.172Z",
  "sentAt": "2019-06-21T17:39:06.143Z",
  "timestamp": "2019-06-21T17:39:06.171Z",
  "traits": {
    "employees": 329,
    "industry": "Technology",
    "name": "Initech",
    "plan": "enterprise",
    "total billed": 830
  },
  "type": "group",
  "userId": "97980cfea0067",
  "version": 2
}
```

## Alias

A Segment user can alias a past identity into their current identity:

```js
analytics.alias("507f191e81");
```

This results in the following event data:

```json
{
  "_metadata": {
    "bundled": [
      "Segment.io"
    ],
    "unbundled": [
      "Facebook Pixel"
    ]
  },
  "anonymousId": "3d316d2c-26e8-451f-91be-a0766708c81e",
  "channel": "client",
  "context": {
    "ip": "67.160.210.48",
    "library": {
      "name": "analytics.js",
      "version": "3.8.2"
    },
    "page": {
      "path": "/index.html",
      "referrer": "",
      "search": "",
      "title": "",
      "url": "https://example.com/index.html"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
  },
  "integrations": {},
  "messageId": "ajs-d45a45c1384424545c2cff67345f25ce",
  "originalTimestamp": "2019-06-21T17:39:56.999Z",
  "previousId": "97980cfea0067",
  "projectId": "P0OJ3CTID1",
  "receivedAt": "2019-06-21T17:39:57.032Z",
  "sentAt": "2019-06-21T17:39:57.000Z",
  "timestamp": "2019-06-21T17:39:57.031Z",
  "type": "alias",
  "userId": "507f191e81",
  "version": 2
}
```

## Screen

Docs coming soon.

## Delete

A Segment user can trigger delete action using [Config API](https://reference.segmentapis.com/?version=latest#57a69434-76cc-43cc-a547-98c319182247) or App. Partners are required to delete data for `userId` in the request payload in line with GDPR and CCPA. 

This results in the following event data:

```json
{
  "type":"delete",
  "channel":"server",
  "userId":"507f191e81",
  "context":null,
  "integrations":null,
  "messageId":"delete-reg-6543321::job-2-P0OJ3CTID1",
  "projectId":"P0OJ3CTID1",
  "timestamp":"2020-05-09T23:54:49.209Z",
  "receivedAt":"2020-05-09T23:54:49.209Z",
  "sentAt":"2020-05-09T17:49:00.000Z",
  "originalTimestamp":"2020-05-09 23:54:49.209808489 +0000 UTC m=+70366.298768264"
}
```

## Testing your Component

The Developer Center has testing tools built in.

When building a Subscription, there is a "test" tab in the UI where you can select an event or copy/paste JSON from above, and send it to your component. This makes it easy to develop your component against many different event inputs.

There is also a "test suite" tab that sends a series of events to your component. This makes it easy to see how a user's journey shows up in your system.

You can also use the Segment SDK or API to generate your own events. First navigate to the "test in your workspace" tab, and connect your destination to a source. Then you can use the JavaScript SDK in a browser to generate real analytics events.

Finally event data is in the [functions-library GitHub repo](https://github.com/segmentio/functions-library) for you to integrate with your own tests.

You can also use the Segment SDK or API to easily generate your own events.

```shell
```
