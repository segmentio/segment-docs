---
title: 'Protocols: APIs and Extensions'
---

{% include content/plan-grid.md name="protocols" %}

Built from the ground up, Protocols addresses a wide range of customer needs.

With Protocols, you can help engineers reduce tracking errors, create issue notifications, and get the most out of your Tracking Plan. Below, learn about several Protocols resources that can help you address these and other common use cases.

## Anomaly detection

If you're using Protocols, you might want to get notifications when event volume anomalies or Protocols violation counts occur. Read Segment's [anomaly detection documentation](/docs/protocols/apis-and-extensions/anomaly_detection/) to learn about common anomalies, as well as monitoring and alerting solutions you can implement using standard tools.

## Config API

Protocols customers can access [Segment's Config API](/docs/config-api/), which enables programmatic creation, configuration, and fetching of core Segment platform resources like Sources, Destinations, and Tracking Plans.

The Config API represents Segment's commitment to developers, helping you extend your workflow around customer data collection and activation.

### Supported Operations

- **List Tracking Plans**
- **Get Tracking Plan**
- **Create Tracking Plan**
- **Update Tracking Plan**
- **Delete Tracking Plan**

## Typewriter

Typewriter is a tool for generating strongly-typed Segment analytics libraries based on your pre-defined Tracking Plan spec. View Segment's [Typewriter documentation](/docs/protocols/apis-and-extensions/typewriter/) to get started.


<!--
Removed on 3/18/2020 per PROT-2279
## Debug Endpoint

This endpoint enables customers to send sample `.track()`, `.identify()`, `.group()`, `.page()` and `.screen()` requests to a debug endpoint that will return an error response if that payload is invalid. The event payload will not be delivered to the Segment Source or any active Destinations.
Customers can use this endpoint in testing suites or to test payloads against current Schema filters or a Tracking Plan spec. Follow the instructions below to test sample payloads without delivering the event to Segment or downstream Destinations.

**Endpoint:** https://debug-api.segment.com/v1/<<Segment request type>>

**Authentication:** This endpoint uses the same Authentication protocol outlined in our [HTTP docs](/docs/connections/sources/catalog/libraries/server/http/#authentication).

### Enable debug mode with Analytics.js

The following snippet can be added to your dev environment or executed in a web console to use the debug endpoint. When enabled, all outbound Segment events will hit the debug endpoint. Events will not be delivered to Segment Destinations, so make sure to disable this when deploying your code to production.

```js
analytics.Integrations["Segment.io"].prototype._enqueue = analytics.Integrations["Segment.io"].prototype.enqueue;
analytics.Integrations["Segment.io"].prototype.enqueue = function(path, msg, fn) {
  this.options.apiHost = 'debug-api.segment.com/v1'
  return this._enqueue(path, msg, fn)
};
```

### Enable debug mode with querystring flag

Analytics.js does not have a built-in 'debug mode' flag yet. You can add a querystring flag to your Segment instrumentation with the following snippet:
```js
// Point to the debug-api when the URL contains the query param "?segment_debug=true"

var apiHost;
if (window.location.href.indexOf('segment_debug=true') !== -1) {
  apiHost = 'debug-api.segment.com/v1';
} else {
  apiHost = 'api.segment.io/v1';
}

analytics.load("YOUR_WRITE_KEY", {
  integrations: {'Segment.io': { apiHost: apiHost } }
});
```

**NOTE: Make sure this is only used in development environments since the debug-api does not send data downstream!**

### Error responses

The debug endpoint API will return detailed errors depending on the violation generated.

| Error Response | Description|
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Invalid JSON` | The JSON payload is invalid. Check to make sure your payload contains valid JSON. |
| `Invalid writeKey` | Segment source writekey is not valid. Check your source settings. |
| `Missing writeKey` | Segment source writekey is missing from payload. Make sure writekey is included in request. |
| `Missing event key for track call` | The payload is missing track call name. Make sure your payload includes `"``event``"``:``"``My Event Name``"`.|
| `Event must be a string` | The payload has an event key, but the value is not a string. Make sure the value associated with the `event` key is a string. |
| `Missing userId or anonymousId` | Every Segment event must contain either a `userId`, `anonymousId` or both. Make sure to include 1 or both IDs in your payload.|
| `context integrations must be an object` | When specifying event context or integrations, they must be passed in an object. Make sure the value associated with the `context` or `integrations` key is an object.|
| `Disabled event` | The event has either been disabled in Schema or is not included in your Tracking Plan. If you expect this event to be enabled, check your Source schema tab to see if the event is disabled, or add it to the Tracking Plan associated to the Source. |
| `properties.Required: properties.Required is required` | The event is missing a required property defined in the Tracking Plan. If the event does not require the property, update the Tracking Plan associated to the source. Otherwise, update the request payload. |
| `properties.Optional: Invalid type. Expected: string, given: array` | The event property is passing as an array, but expects a string as defined in the Tracking Plan. If the event property should be an array, update the Tracking Plan associated to the source. Otherwise, update the request payload. |

-->
