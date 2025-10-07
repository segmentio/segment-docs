---
title: Failure Log Collection
plan: failure-logs
---

Failure log collection gives you greater visibility into failed event deliveries, allowing you to identify, analyze, and troubleshoot issues with the events that Segment attempted to deliver.

> info "Failure log collection is in private beta"
> Failure log collection is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. During the private beta, failure log collection is available at no cost to Business Tier users.
>
> Failure log collection only supports streaming destinations receiving events from streaming sources or Engage sources. 

## Enable failure logs

Before you can access your failure logs using the Public API, you must first enable log collection in the Segment app.

> info ""
> Only users with the [Workspace Owner role](/docs/segment-app/iam/roles/) can enable failure logs. 

1. From your Segment workspace, navigate to **Connections > Destinations**.
2. Select one of your destinations and open the Delivery Overview tab.
3. Next to the Date Range picker, select the menu and click **Log collection**.
4. On the Log collection side sheet, turn on the **Collect logs for this destination?** toggle. Take note of the Collection ID, which identifies the logs associated with this destination, as you'll need this to access your failure logs through the Public API. 

Once you enable failure logs, Segment starts collecting all events that fail to be delivered to the destination after an attempted delivery and writes them to S3 every hour. The logs are bucketed by the hour in which the original events occurred.


## Access failure logs

Once you've enabled your failure logs in the Segment app, you can access them using Segment's Public API. 

Segment has a Public API endpoint, available in [alpha](https://docs.segmentapis.com/tag/Versioning/){:target="_blank”}, that lets you generate presigned S3 URLs for a collection ID and a specific hour in [ISO 8601 format](https://www.iso.org/iso-8601-date-and-time-format.html){:target="_blank”}. Once you've generated a URL, you can only access that data for two hours. If Segment writes additional data to the specified collection and hour time frame, you must generate an additional Public API call to view the updated logs. 

You can make up to 120 requests to the failure logs endpoint per day. Some of the request “tokens” replenish every hour. Once Segment collects the observability events, it takes 1-2 hours to populate the log. 

The rate limiting metadata follows the Segment API [Rate limit errors](https://docs.segmentapis.com/tag/Rate-Limits/#section/Rate-limit-errors){:target="_blank”} specification and the headers show how many remaining API calls can be made. If you exceed the rate limit, Segment returns a 429 status code.

Here's an example call: 


```curl
curl -i -X POST \
  'https://api.segmentapis.com/customer-insights/download?collectionId=<COLLECTION ID FROM UI>&hour=<HOUR>' \
  -H 'Authorization: Bearer <TOKEN>'
```

> success ""
> Segment retains event logs for 28 days.

## Event types

Logs are formatted as a set of Segment observability events:
- **[Error Logged](#error-logged)**: A Segment event encountered an error. Errors might include retry attempts, discards, or other handling.
- **[Delivery Attempt Logged](#delivery-attempt)**: An attempt was made to deliver an event to a Segment integration.
- **[Destination Exchange Logged](#destination-exchange)**: Captures the integration request and response payloads when delivering one or more Segment events.

### Error logged

Error logged events include basic information about a failed delivery, including the source of an event, which integration it was unable to be delivered to, a reason for the failed delivery, and the time that an error occurred. For more information about common error codes, see Delivery Overview's [Troubleshooting](/docs/connections/delivery-overview/#troubleshooting) documentation. 

Here's an example of an Error Logged event: 

```json
{
  "type": "observability",
  "event": "Error Logged",
  "version": "v1",
  "properties": {
    "routed": {
      "to": [
        { "type" : "destination", "id" : "abc" }
      ],
      "from": [
        { "type" : "source", "id" : "ghi" }
      ]
    },
    "discarded": true | false,
    "messageId": "m",
    "occurredAt": "2025-03-23T20:00:00Z",
    "loggedAt": "2025-03-23T20:00:00Z"
  }
}
```

### Delivery attempt

Delivery attempt events contain the request payload and headers Segment sent to a destination, the request payload, status code, and headers sent from a destination, and additional event context, like the current number of delivery attempts, the outcome of the latest delivery attempt, and the last time that Segment attempted a delivery. 

Here's an example of a Delivery Attempt Logged event: 

```json
{
  "type": "observability",
  "event": "Delivery Attempt Logged",
  "version": "v1",
  "properties": {
    "routed": {
      "to": [
        { "type" : "destination", "id" : "abc" }
      ],
      "from": [
        { "type" : "source", "id" : "ghi" }
      ]
    },
    "attempt": 4,
    "outcome": "failure",
    "destinationExchangeId": "x",
    "messageId": "m",
    "occurredAt": "2025-03-23T20:00:00Z",
    "loggedAt": "2025-03-23T20:00:00Z"
  }
}
```

### Destination exchange
Unlike other observability events, destination exchange observability events track **batches** of events delivered to an integration instead of individual events.  

Destination exchange events include the source of an event, which integration it was unable to be delivered to, a truncated version of the HTTP request Segment made to an integration, the HTTP response Segment received from an integration, the headers from both the HTTP request and the HTTP responses, and a `destinationExchangeId`, or a UUID that allows you to link the specific exchange to a delivery attempt.

Here's an example of a Delivery Exchange Logged event: 

```json
{
  "type": "observability",
  "event": "Destination Exchange Logged",
  "version": "v1",
  "properties": {
    "requestToDestination": {
      "body": "{\"key\": \"value\"}"
    },
    "responseFromDestination": {
      "status" : 418,
      "headers": { "X-header": "value" },
      "body": "{\"key\": \"value\"}"
    },
    "routed": {
      "to": [
        { "type" : "destination", "id" : "abc" }
      ],
      "from": [
        { "type" : "source", "id" : "ghi" }
      ]
    },
    "destinationExchangeId": "x",        
    "occurredAt": "2025-03-23T20:00:00Z",
    "loggedAt": "2025-03-23T20:00:00Z"
  }
}
```
