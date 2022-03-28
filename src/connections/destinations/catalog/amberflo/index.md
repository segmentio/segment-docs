---
title: Amberflo Destination
hidden: true
id: 62274854b16140600b51d1cd
---
## Amberflo Destination

[Amberflo](https://www.amberflo.io/) provides cloud based usage metering, pricing, and billing. Meter any infrastructure, platform, application, custom resource, event, or feature. Amberflo provides an end-to-end usage platform engine that serves as the system of records and single source of truth. It's platform is built on top of the metering service, Amberflo Metering Cloud. It is built on cloud platform design principles of durability, availability, scalability, and cost-effectiveness with specialized logic built-in to ensure accuracy of the metering system - that is that each record is processed once, and once only, and that duplicate records sent are automatically de-duped. Amberflo Billing Cloud is a decoupled (yet integrated) application that is built on the Metering Cloud. It allows users to create, model, and manage usage-based pricing plans with full flexibility over modern sales artifacts such as prepaid credits, rewards, promotions, and custom currency creation.

This destination is maintained by Amberflo. For any issues with the destination, [contact the Amberflo Support team](mailto:support@amberflo.io).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Amberflo" in the Destinations Catalog, and select the "Amberflo" destination.
3. Choose which Source should send data to the "Amberflo" destination.
4. Go to the [Amberflo dashboard](https://ui.amberflo.io/settings/account/api-keys), find and copy the "API key".
5. Enter the "API Key" in the "Amberflo" destination settings in Segment.

## Supported methods

Amberflo supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls the [Amberflo Ingestion API](https://docs.amberflo.io/reference/post_ingest) to ingest as a meter with value 1. For example:
```js
analytics.page({
  userId: "some_user_id",
  name: "Home",
  properties: {
    "title": "Welcome | Initech",
    "keywords": "paper,comedy",
    "search": "schrute farms",
    "referrer": "https://google.com",
    "path": "/home",
    "browser": "Chrome",
    "url": "https://segment.com"
  }
})
```

Segment sends Page calls to Amberflo as a `page` meter.

```json
curl --request POST \
     --url https://app.amberflo.io/ingest \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --header 'x-api-key: YOUR_API_KEY' \
     --data '
{
     "uniqueId": "messageId",
     "customerId": "some_user_id",
     "meterApiName": "page",
     "meterValue": 1.0,
     "meterTimeInMillis": 1619445706909,
        "title": "Welcome _ Initech",
        "keywords": "paper,comedy",
        "search": "schrute farms",
        "referrer": "https:__google.com",
        "path": "_home",
        "browser": "Chrome",
        "url": "https:__segment.com"
     }
}
'
```


### Screen

Send [Screen](/docs/connections/spec/screen) calls the [Amberflo Ingestion API](https://docs.amberflo.io/reference/post_ingest) to ingest as a meter with value 1. For example:

```js
analytics.screen({
  userId: "some_user_id",
  name: "Home",
  properties: {
    "title": "Welcome | Initech"
  }
})
```

Segment sends Screen calls to Amberlfo as a `screen` meter.
```json=
curl --request POST \
     --url https://app.amberflo.io/ingest \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --header 'x-api-key: YOUR_API_KEY' \
     --data '
{
     "uniqueId": "messageId",
     "customerId": "some_user_id",
     "meterApiName": "screen",
     "meterValue": 1.0,
     "meterTimeInMillis": 1619445706909,
     "dimensions": {
       "name": "Home",
       "title": "Welcome _ Initech"
     }
}
'
```


### Identify

Send [Identify](/docs/connections/spec/identify) calls the [Amberflo Customers API](https://docs.amberflo.io/reference/post_customers) to create a customer in Amberflo or update if the customer already exists. For example:

```js
analytics.identify({
  userId: "some_user_id",
  traits: {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "plan": "premium",
    "logins": 5,
    "phone": "650-769-3240",
    "username": "marakasina",
    "website": "example.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/scottkclark/128.jpg"
  }
})
```

Segment sends Identify calls to Amberflo as a `customer` record.

```json=
curl --request PUT \
     --url https://app.amberflo.io/customers \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --header 'x-api-key: YOUR_API_KEY' \
     --data '
{
     "customerId": "some_user_id",
     "customerName": "John Doe",
     "customerEmail": "john.doe@email.com",
     "traits": {
        "plan": "premium",
        "logins": 5,
        "phone": "650-769-3240",
        "username": "marakasina",
        "website": "example.com",
        "avatar": "https:__s3.amazonaws.com_uifaces_faces_twitter_scottkclark_128.jpg"
    }
}
'
```


### Track

Send [Track](/docs/connections/spec/track) calls [Amberflo Ingestion API](https://docs.amberflo.io/reference/post_ingest) to ingest as a meter with value of `properties.value` or 1 if value is not set. For example:

```js
analytics.track({
  userId: "some_user_id",
  event: "ApiCalls",
  properties: {
    "value" : 2.0
    "region": "us-west-2"
  }
})
```

Segment sends Track calls to Amberflo as a meter ingestion record with `meterApiName=track.event`.

```json=
curl --request POST \
     --url https://app.amberflo.io/ingest \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --header 'x-api-key: YOUR_API_KEY' \
     --data '
{
     "uniqueId": "messageId",
     "customerId": "some_user_id",
     "meterApiName": "ApiCalls",
     "meterValue": 2.0,
     "meterTimeInMillis": 1619445706909,
     "dimensions": {
        "region": "us-west-2"
     }
}
'
```

---
