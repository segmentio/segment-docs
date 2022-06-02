---
rewrite: true
title: Webhooks Destination
id: 54521fdc25e721e32a72ef04
---
Segment Webhooks submit real-time user data to your own HTTP endpoints. A Webhook is an HTTP callback: a simple event-notification using HTTP POST. A web application implementing Webhooks will POST a message to a URL when certain things happen.

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Webhooks" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Specify up to five different Webhook URLs, you would like to forward data to.
4. Add in any header values you would like to add to the HTTP requests
5. If you require authentication, add in a [shared secret](/docs/connections/destinations/catalog/webhooks/#authentication).
6. Once enabled, Segment sends data to the configured webhook

> info ""
> **Note:** With each call, Segment sends receive a [`context`](/docs/connections/spec/common/#context) object that provides information about the user's device, IP address, etc. As you start experimenting, test the Webhooks destination with [RequestBin.com](https://requestbin.com/) and [ultrahook](http://www.ultrahook.com) to see requests as they come through.

## Webhooks timeouts

When Segment sends an event to a webhook endpoint, the service must respond within 5 seconds. If Segment does not receive a response within that period, the system logs a timeout error and [retries the event later](/docs/connections/destinations/#retries-between-segment-and-destinations).

## Page
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:
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

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:
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

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:
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

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:
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

If you're not familiar with the Segment Specs, take a look to understand what the [Alias method](/docs/connections/spec/alias/) does. An example call would look like:
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

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

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

When you create a deletion request, for each affected source that has webhooks enabled, Segment forwards a notification so that you can kick off any automations needed on your side. An example call would look like:

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

If you want to authenticate the requests being sent to your webhook endpoint, you can input a `sharedSecret` in the advanced option settings. If you provide this, Segment signs your requests using the shared secret and the body of the request, and add that as the ​`X-Signature`​ header. Segment calculates a SHA1 digest using the shared secret and the JSON-stringified body of the request.

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

If your server is using HTTPS, note that our webhooks destination does not work with self-signed certs. If webhooks detects a self-signed cert it will throw an error and no request will be sent.

### Sending to multiple webhooks

Under 'Connection Settings', you can provide up to 5 webhooks.

**Note:** If sending a message to any of the webhooks succeed, we consider the message to be successfully processed and won't retry the request to the other webhooks. If your webhooks aren't robust, you should consider using our [Iron.io](/docs/connections/destinations/catalog/iron-io/) destination.

### Retries

Our webhooks destination will retry any request that returns 5xx errors, multiple times, for a maximum of 4 hours.
