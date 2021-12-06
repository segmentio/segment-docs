---
title: 'Protocols: APIs and Extensions'
---

{% include content/plan-grid.md name="protocols" %}


Protocols was developed from the ground up to support a wide range of customer needs. Whether you're interested in helping your engineers reduce tracking errors, or want to get notified when an issue arises, or want to use a Tracking Plan you already have, we have a suite of features and API support to get it done. We've captured many of those resources below.

## Anomaly detection

If you’re using Protocols, you might want to get notifications when an anomaly in event volumes or Protocols violation counts occurs. [This document](/docs/protocols/apis-and-extensions/anomaly_detection/) clarifies what we mean by anomaly detection, gives examples of anomalies that might be relevant to your business, and provides some example solutions of how to monitor and alert on anomalies using some standard tools available today.

[Read more about Anomaly Detection here](/docs/protocols/apis-and-extensions/anomaly_detection/)

## Config API

Protocols customers get access to the Segment Config API, which enables programmatic creation, configuration, and fetching of core Segment platform resources such as Sources, Destinations, and now Tracking Plans. The Config API represents Segment's commitment to developers, enabling customers to extend their workflows around customer data collection and activation. The Config API will be generally available to customers in coming months and will be evolving with more features throughout next year.

### Supported Operations

- **List Tracking Plans**
- **Get Tracking Plan**
- **Create Tracking Plan**
- **Update Tracking Plan**
- **Delete Tracking Plan**

[Learn more about the Config API here](https://segment.com/docs/config-api/)

## Typewriter

Typewriter is a tool for generating strongly-typed Segment analytics libraries based on your pre-defined Tracking Plan spec. [Head over to the docs](/docs/protocols/apis-and-extensions/typewriter/) to get started with Typewriter.

## Google Sheets Tracking Plan Uploader

Thousands of Segment customers have used Google Sheets to build Tracking Plans. We created the following template to help you draft a Tracking Plan and easily upload that Tracking Plan to Segment. Keep in mind that uploading changes from Google Sheets will overwrite any changes made in the Segment UI.

[View the Google Sheets Tracking Plan template here](https://docs.google.com/spreadsheets/u/1/d/1TA6qTcDHoZzsG7-C6p5yHGximDxqoNtizguKs7Z0av4/copy). Feel free to make a copy!

To upload your Tracking Plan directly from Google Sheets, follow these steps:

1. Generate a Personal Access Token following the steps [here](/docs/config-api/authentication/)
2. Copy your Personal Access Token, your Workspace's slug and your tracking plan's `rs_` id (found in the URL path of your Tracking Plan) to the Importer Settings worksheet. Then click on the Segment > Send to Segment menu item to upload your Tracking Plan to Segment.

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
