---
title: Objects API
---

> info ""
> The Objects API is in beta, and so features and names may change without notice as Segment continues to build.

Use the Segment Objects API to send business objects relevant to your business right to Redshift and other Segment supported data warehouses.

> warning ""
> Segment hasn't added support for the core `analytics-<language>` libraries so you'll need to use the Segment HTTP API directly or the independent Go(lang) client for now.

### Authentication

Authenticate to the Objects API by sending your project's **Write Key** along with a request.
Authentication uses HTTP Basic Auth, which involves a 'username:password' that is base64 encoded and pre-pended with the string 'Basic '.

In practice that means taking a Segment source **Write Key**,`'abc123'`, as the username, adding a colon, and then the password field is left empty. After base64 encoding `'abc123:'` becomes `'YWJjMTIzOg=='`; and this is passed in the authorization header like so: `'Authorization: Basic YWJjMTIzOg=='`.

### Source type

Set up an `HTTP API` source type in Segment. You will use this source write key for authenticating with the Objects API.

### Content-type

In order to send data to Segment's HTTP API, the content-type header must be set to `'application/json'`.

## Errors

The Objects API returns a 200 response in most cases, similar to the Tracking API. It will return a 400 if a request payload is malformed.

## Batching

It's highly recommended that you batch your objects where you can. This will allow you to make significantly fewer requests to Segment. To batch your requests, simply pass in more than one object into the objects array.

> info ""
> The max batch size is 10 objects per request.

## Synchronous mode

The Objects API is asynchronous by default. This means that if object updates are processed close together, they can be processed out of order. To change this default behavior, you can set the header `Synchronous: true` to ensure synchronous delivery of objects downstream.

> info ""
> The average response time increases with the synchronous objects API header set, which can impact performance speed.

## Regional configuration

For Business plans with access to [Regional Segment](/docs/guides/regional-segment), you can use the `host` configuration parameter to interact with the desired region:
1. Oregon (Default) — `objects.segment.com`
2. Dublin — `objects.euw1.segment.com`

## Naming

### snake_case properties

Segment recommends that you use snake case when naming any object properties.

```json
{
  "properties": {
    "name": "Charming Beach Room Facing Ocean",
    "location": "Lihue, HI",
    "review_count": 47
  }
}
```

### Plural collection names

You should use plural collection names wherever possible. The collection name should describe the group of one or many objects within the collection.

```json
"collection": "rooms"
"collection": "products"
"collection": "reviews"
```

## De-dupe and merge

Segment de-dupes objects with the same ID and merges properties. By sending in partial objects with the same object ID, Segment merges the properties and you can query the latest data in your data warehouse.

For example, if you make the following requests with the following payloads:

```json
{
  "collection": "rooms",
  "objects": [
    {
      "id": "2561341",
      "properties": {
        "name": "Charming Beach Room Facing Ocean",
        "location": "Lihue, HI",
        "review_count": 47
      }
    }
  ]
}

{
  "collection": "rooms",
  "objects": [
    {
      "id": "2561341",
      "properties": {
        "name": "Charming Beach Room Facing Ocean",
        "location": "Lihue, HI",
        "review_count": 48
      }
    }
  ]
}
```

When you query your warehouse you will see the following:

```SQL
select id, name, location, review_count from airbnb.rooms
```

```
 '261341' | 'Charming Beach Room Facing Ocean' | 'Lihue, HI' | 48
 ```

## Set

`set` lets you send in a collection and array of objects (to a maximum of 10 objects), each with a unique object ID.

Example `set` call:

```
POST https://objects.segment.com/v1/set
```

```json
{
  "collection": "rooms",
  "objects": [
    {
      "id": "2561341",
      "properties": {
        "name": "Charming Beach Room Facing Ocean",
        "location": "Lihue, HI",
        "review_count": 47
      }
    }, {
      "id": "2561342",
      "properties": {
        "name": "College town feel — plenty of bars nearby",
        "location": "Austin, TX",
        "review_count": 32
      }
    }
  ]
}
```

This call sends a collection of "rooms". "rooms" becomes the table name in your data warehouse, and each individual object in the array becomes a row in that table.

|-------------------------|--------|-------------------------------------------------------------------------------------------|
| `collection` *Required* | String | A string that represents the name of the collection. The collection name will become the table name in your data warehouse. Collection must consist of lowercase letters and underscores and maximum of 100 characters. Can not begin or end with an underscore. |
| `objects`               | Array  | A required array of objects describing the objects and properties being set. Must consist of at least one JSON object and a maximum of 10.  |

Each object inside of the objects array must consist of the following parameters:

|-------------------------|--------|-------------------------------------------------------------------------------------------|
| `id` *Required*         | String | The unique ID representing the object in the third party system. Maximum of 100 characters. |
| `Properties` *Required* | Object | The object properties that represent the object. Example: Each value could be a string (ISO dates are parsed and recognized as `isodate` type), an integer, or a float (JSON types). Values cannot be lists or objects. Each value must be less than 32KB in size. |

## Objects-go library

You can use the objects-go library to send object data easily from your Go server to the Objects API.

You can use the objects-go library like this:

```go
Client.Set(&objects.Object{
  ID: "room1000",
  Collection: "rooms"
  Properties: map[string]interface{}{
    "name": "Charming Beach Room Facing Ocean",
    "location": "Lihue, HI",
    "review_count": 47,
}})

// Second call on the same object
Client.Set(*objects.Object{
  ID: "room1000",
  Collection: "rooms"
  Properties: map[string]interface{}{
    "owner": "Calvin",
    "public_listing": true,
}})

// Make sure objects are flushed before your main goroutine exits
Client.Close()
```

View the Objects-go library on GitHub [here](https://github.com/segmentio/objects-go){:target="_blank"}.

Here is a `curl` example of how to get started:

```bash
curl https://objects.segment.com/v1/set \
   -u PROJECT_WRITE_KEY: \
   -H 'Content-Type: application/json' \
   -X POST -d '{"collection":"rooms","objects":[{"id": "2561341","properties": {"name": "Charming Beach Room Facing Ocean","location":"Lihue, HI","review_count":47}}]}'
```

## FAQ

### Should I use the Objects API instead of .identify() and .group()?

No; you should continue use `analytics.identify` to identify your customers. Segment syncs that to your data warehouse as `select * from project.users`.

### Can you just pull data automatically from my database?

Segment's [Reverse ETL](/docs/connections/reverse-etl) product supports this use case.

### How do you recommend I load object data into Segment?

On Change - You can `.set` when the data changes, for example, when a user updates an account field on your website.

Scheduled job - You can run scheduled scripts hourly or nightly that pull data from your database and send it to Segment. This is a totally fine approach, even if you load the same data in every night.
