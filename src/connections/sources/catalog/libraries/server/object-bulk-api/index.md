---
title: Objects Bulk API
---

**NOTE:** The Objects Bulk API is in beta, and so features and names may change without notice as we continue to build.

The Segment Objects Bulk API allows you to send a batched file of objects relevant to your business right to Redshift and other Segment supported data warehouses.
It differs from the Object API in that it is designed to:
- Handle large payloads of data.
- Guarantees in-order processing of data.
- Allow Customers and Partners to build their own Cloud Apps.

**NOTE:** We haven't yet created tooling akin to our core analytics-* libraries so you'll need to use our HTTP API directly for now.

### Batched Object Data
The `Batched Object Data` the API accepts is a file of line separated objects, in JSON form, compressed using `Gzip`.
The maximum size of a single `object` is 400KB and maximum uncompressed size of a file 512MB.

Example objects:
```json
{"id":"1","collection":"users","properties":{"first_name":"John","last_name":"Smith"}}
{"id":"2","collection":"users","properties":{"first_name":"Jane","last_name":"Doe"}}
```

<table>
  <tr>
    <td>**`id`**<br/> Required</td>
    <td>String</td>
    <td>
      The unique ID representing the object in the third party system.<br/><br/>Maximum of 100 characters.
    </td>
  </tr>
  <tr>
    <td>**`collection`**<br/> Required</td>
    <td>String</td>
    <td>
      A string that represents the name of the collection. The collection name will become the table name in your data warehouse.<br/><br/>Collection must consist of lowercase letters and underscores and maximum of 100 characters. Can not begin or end with an underscore.
    </td>
  </tr>
  <tr>
    <td>**`Properties`**<br/> Required</td>
    <td>Object</td>
    <td>
      The object properties that represent the object. Example:<br/><br/>
      Each value could be a string (ISO dates are parsed and recognised as `isodate` type), an integer, or a float (JSON types).<br/><br/>
      Values cannot be lists or objects. Each value must be less 32kb in size.
    </td>
  </tr>
</table>

### Authentication

Authenticate to the Objects Bulk API by sending your project's **Write Key** along with a request.
Authentication uses HTTP Basic Auth, which involves a `username:password` that is base64 encoded and prepended with the string `Basic `.

In practice that means taking a Segment source **Write Key** encoding it with base64 eg. `echo "abc123" | base64 -`, becomes `'YWJjMTIzCg=='`; and this is passed in the authorization header like so: `'Authorization: Basic YWJjMTIzCg=='`.

### Source Type

set up an `HTTP API` source type in Segment. You will use this source write key for authenticating with the Objects Bulk API.

### Limits
The API imposes some rate limits including:
- **512MB** maximum uncompressed [file](#batched-object-data) upload size
- **400KB** maximum [object](#batched-object-data) size.
- **20** simultaneous requests from the same **IP**
- **20** simultaneous requests per **Write Key**

## Endpoints

### Start

`Start` indicates the begining of a session to upload/publish data. It Returns a unique ID to be used in subsequent endpoints denoted by `<id>`.
Sessions are short lived, see [Keep Alive](#keep-alive) for details on keeping your session alive.

Example `Start` request:

```
POST https://objects-bulk-api.segmentapis.com/v0/start
```

Example `Start` response

```json
{
  "sync_id":"hjWdsur28j49LCQ"
}
```

Possible HTTP responses include:
- 201 Created
- 400 Bad Request
- 500 Internal Server Error

### Upload

`Upload` is used to publish the file(s) of [batched object data](#batched-object-data) to to be processed. It returns a unique ID associated with the published file for future use.

Example `Upload` request:

```
POST https://objects-bulk-api.segmentapis.com/v0/upload/<id>
Content-Type: binary/octet-stream
Content-Encoding: gzip
```

Example `Upload` response:

```json
{
  "part_id":"dkf539GFfmj50fnm"
}
```

Possible HTTP responses include:
- 201 Created
- 400 Bad Request
- 413 Entity Too Large
- 500 Internal Server Error

### Finish

`Finish` is used to indicate that this session is complete and no more files will be uploaded. I accepts an error message which indicates if the session was successful.

Example `Finish` request:

```
POST https://objects-bulk-api.segmentapis.com/v0/finish/<id>
Content-Type: application/json
```

```json
{
  "error":"Blank if everything was successful"
}
```

Possible HTTP responses include:
- 202 Accepted
- 400 Bad Request
- 500 Internal Server Error

### Keep Alive

`Keep Alive` is used to extend you sessions lifetime if there are long gaps inbetween API calls. The default session timeout is 10 minutes.

Example `Keep Alive` request:

```
POST https://objects-bulk-api.segmentapis.com/v0/keep-alive/<id>
```

Possible HTTP responses include:
- 200 Ok
- 500 Internal Server Error

## Naming

### snake_case properties

It is recommended that you use snake case when naming any object properties.

```
{
  "properties": {
    "name": "Charming Beach Room Facing Ocean",
    "location": "Lihue, HI",
    "review_count": 47
  }
}
```

### Plural Collection Names

You should use plural collection names wherever possible. The collection name should describe the group of one or many objects within the collection.

```
"collection": "rooms"
"collection": "products"
"collection": "reviews"
```

## De-dupe & merge

Objects with the same object ID will get de-duped and properties will get merged. By sending in partial objects with the same object ID, we will merge the properties and you can query the latest data in your data warehouse.

For example, if you make the following requests with the following payloads:

```json
{"id": "2561341","collection": "rooms","properties": {"name": "Charming Beach Room Facing Ocean","location": "Lihue, HI","review_count": 47}}
{"id": "2561341","collection": "rooms","properties": {"name": "Charming Beach Room Facing Ocean","location": "Lihue, HI","review_count": 48}}
```

When you query your warehouse you will see the following:

```SQL
select id, name, location, review_count from airbnb.rooms
```

```
 '261341' | 'Charming Beach Room Facing Ocean' | 'Lihue, HI' | 48
 ```

## FAQ

### Should I use the Objects Bulk API instead of the Objects API

If the program that collects your data runs a a predefines schedule then use **Objects Bulk API**.
If the data being collected is streaming all of the time then the **Objects API** is more suitable.

### Can you just pull data automatically from my database?

If you would like this feature, [contact us](https://segment.com/contact/) and let us know.
