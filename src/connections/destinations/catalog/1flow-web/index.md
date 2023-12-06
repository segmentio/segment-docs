---
title: 1Flow Web (Actions) Destination
hidden: true
versions:
  - name: '1Flow Web (Actions) Destination'
    link: '/docs/connections/destinations/catalog/1flow-web'

---
[1Flow](https://1flow.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a leading in-app user survey and messaging platform for Mobile app and SaaS businesses.

{% include content/plan-grid.md name="actions" %}

1Flow is an easy-to-use, yet powerful in-app survey and messaging software.
Using 1Flow, you can reach users in-the-moment while they are interacting with your website or mobile app, to collect highly contextual user insights that help you improve your product offering and customer experience.

When you use the 1Flow Web (Actions) Destination, Segment loads the [1Flow SDK](https://1flow.ai/docs/install-sdk/javascript){:target="_blank"} for you. The 1Flow library enables you to track and identify user events on your website and interact with the 1Flow messenger window.

## Benefits of 1Flow Web Mode (Actions) Destination

After you install both Segment and 1Flow's Segment Plugin for the web:
1. You can track events and identify users
2. Segment passes the event and user payload directly to 1Flow 
3. 1Flow then uses this information to trigger surveys and identify users


## Getting started
1. From Segment, navigate to  **Connections > Catalog**, then select **Destinations**.
2. Search for and select **1Flow  Web (Actions) Destination**.
3. Click **Configure 1Flow Web (Actions) Destination**
4. Select the web source that will send data to 1Flow web (Actions) and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/source/catalog/libraries/website/javascript).
5. On the **Settings** tab, input your 1Flow "PROJECTAPIKEY" and other destinations settings.
6. Follow the step in the Destinations Actions docs to [customizing mappings](/docs/connections/destinations/action/#customizing-mappings).
 7. Enable the destination and configured mappings.

```suggestion
{% include components/actions-fields.html %}
## Supported methods

### Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. Below is an example of how a Segment Identify event maps to an invocation of the 1flow SDK:

```window._1flow('identify', 'userId', {
			'name': 'Jane Doe', 
			'company': 'ACME, Inc.'
			'email': 'jane.doe@gmail.com', 
			'plan': 'Premium'
			'total_spend': 880
	});

```
When you call Segment's Identify method, it will be equivalent to `logUser` of 1Flow. 
- Segment's `userId` is `userID` in 1Flow 
- Segment's `traits` is `userDetails` in 1Flow

### Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. Below is an example of how a Segment Track event maps to an invocation of the 1flow SDK:

```

	window._1flow('track', 'event name', {
			'record_id':'1234abcdef56', 
			'quantity': 1
	});

```
Any value passed in `name`, will be eventName and if you have passed any event property, then it will be event `parameters`.


## Troubleshooting

### Requests to 1Flow return a 404 response
If you are seeing 404 responses in your browser's network tab, you've likely encountered one of two issues:

- You set the wrong App ID on the 1Flow Actions (Web) destination settings page.
- You set the wrong Regional Data Hosting value on the 1Flow Actions (Web) destination settings page. 1Flow gates regional endpoints by plan level, so you may not have access to EU data hosting.

### 1Flow does not support rETL event batching
The 1Flow (Web) Actions destination does not support the bulk contacts endpoint, and therefore is unable to support batching events in rETL.