---
rewrite: true
title: Webhooks Destination
---
Segment Webhooks submit real-time user data to your own HTTP endpoints. A Webhook is an HTTP callback: a simple event-notification via HTTP POST. A web application implementing Webhooks will POST a message to a URL when certain things happen.

This document was last updated on January 28, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Webhooks" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Specify up to five different Webhook URLs, you would like to forward data to.
4. Add in any header values you would like to add to the HTTP requests
5. If you require authentication, add in a [shared secret](https://segment.com/docs/connections/destinations/catalog/webhooks/#authentication).
6. Toggle on Webhooks and we will start sending all the requests received by Segment's API.

**Note:** We'll send you HTTP(s) POST requests that look like the below for each type. Note with each call, you'll also receive a [`context`](/docs/connections/spec/common/#context) object that provides information about the user's device, IP address, etc. As you start experimenting, we recommend trying the Webhooks destination with [RequestBin.com](https://requestbin.com/) and [ultrahook](http://www.ultrahook.com) to immediately start seeing requests coming through.

## Webhooks timeouts

When Segment sends an event to a webhook endpoint, the service must respond within 5 seconds. If Segment does not receive a response within that period, the system logs a timeout error and [retries the event later](/docs/connections/destinations/#retries-between-segment-and-destinations).

## Page
If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:
```
POST https://your-webhook-url.com/x
```
```
User-Agent: Segment.io/1.0
Content-Type: application/json
```
```json
{
    "version"       : 1,
    "type"          : "page",
    "userId"        : "019mr8mf4r",
    "properties"    : {
        "path"      : "/pricing",
        "referrer"  : "https://segment.com",
        "title"     : "Segment Pricing",
        "url"       : "https://segment.com/pricing"
    },
    "timestamp" : "2012-12-02T00:30:08.276Z"
}
```
## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. An example call would look like:
```
POST https://your-webhook-url.com/x
```
```
User-Agent: Segment.io/1.0
Content-Type: application/json
```
```json
{
    "version"   : 1,
    "type"      : "screen",
    "userId"    : "019mr8mf4r",
    "name"      : "Main Screen",
    "timestamp" : "2012-12-02T00:30:08.276Z",
    "context"   : {
        "device"     : {
            "model"  : "x86_64",
            "type"   : "ios"
        },
        "os"         : {
            "name"   : "iPhone OS",
            "version": "7.1"
        },
        "app"        : {
            "build"  : "88",
            "name"   : "YourApp",
            "version": "2.0.0"
        }
    }
}
```
## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:
```
POST https://your-webhook-url.com/x
```
```
User-Agent: Segment.io/1.0
Content-Type: application/json
```
```json
{
    "version"   : 1,
    "type"      : "identify",
    "userId"    : "019mr8mf4r",
    "traits"    : {
        "email"            : "achilles@segment.com",
        "name"             : "Achilles",
        "subscriptionPlan" : "Premium",
        "friendCount"      : 29
    },
    "timestamp" : "2012-12-02T00:30:08.276Z"
}
```
## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:
```
POST https://your-webhook-url.com/x
```
```
User-Agent: Segment.io/1.0
Content-Type: application/json
```
```json
{
    "version"    : 1,
    "type"       : "track",
    "userId"     : "019mr8mf4r",
    "event"      : "Purchased an Item",
    "properties" : {
        "revenue"        : "39.95",
        "shippingMethod" : "2-day"
    },
    "timestamp" : "2012-12-02T00:30:08.276Z"
}
```
## Alias

If you haven't had a chance to review our spec, please take a look to understand what the [Alias method](https://segment.com/docs/connections/spec/alias/) does. An example call would look like:
```
POST https://your-webhook-url.com/x
```
```
User-Agent: Segment.io/1.0
Content-Type: application/json
```
```json
{
    "version"   : 1,
    "type"      : "alias",
    "Previous ID"      : "previousId",
    "User ID"        : "userId",
    "timestamp" : "2012-12-02T00:30:08.276Z"
}
```
## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```
POST https://your-webhook-url.com/x
```
```
User-Agent: Segment.io/1.0
Content-Type: application/json
```
```json
{
    "version"   : 1,
    "type"      : "group",
    "groupId"   : "0e8c78ea9d97a7b8185e8632",
    "userId"    : "019mr8mf4r",
    "traits"    : {
        "name"             : "Initech",
        "industry"         : "Technology",
        "employees"        : 329,
        "plan"             : "Enterprise",
        "total billed"     : 830
    },
    "timestamp" : "2012-12-02T00:30:08.276Z"
}
```

## Delete

When you create a deletion request, for each affected source that has webhooks enabled we will forward a notification so that you can kick off any automations needed on your side. An example call would look like:

```
POST https://your-webhook-url.com/x
```
```
User-Agent: Segment.io/1.0
Content-Type: application/json
```
```json
{
    "type"      : "delete",
    "userId"    : "019mr8mf4r",
    "timestamp" : "2012-12-02T00:30:08.276Z"
}
```

## Appendices
### Authentication

If you want to authenticate the requests being sent to your webhook endpoint, you can input a `sharedSecret` in the advanced option settings. If you provide this, we will sign your requests using the shared secret and the body of the request, and add that as the ​`X-Signature`​ header. We calculate a SHA1 digest using the shared secret and the JSON-stringified body of the request.

An example of how one might authenticate the requests would be:

```javascript
 var signature = req.headers['x-signature'];
 var digest = crypto
     .createHmac('sha1', settings.sharedSecret)
     .update(new Buffer(JSON.stringify(req.body),'utf-8'))
     .digest('hex');

if (signature === digest) {

 // do cool stuff

}
```

### SSL Certification

If your server is using HTTPS, please note that our webhooks destination does not work with self-signed certs. If webhooks detects a self-signed cert it will throw an error and no request will be sent.

### Sending to multiple webhooks

Under 'Connection Settings', you can provide up to 5 webhooks.

**Note:** If sending a message to any of the webhooks succeed, we consider the message to be successfully processed and won't retry the request to the other webhooks. If your webhooks aren't robust, you should consider using our [Iron.io](/docs/connections/destinations/catalog/iron.io/) destination.

### Retries

Our webhooks destination will retry any request that returns 5xx errors, multiple times, for a maximum of 4 hours.
