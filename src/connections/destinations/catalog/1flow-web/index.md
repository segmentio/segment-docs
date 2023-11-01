---
title: 1Flow Web (Actions) Destination
id: 64dd07c1fed86b6866cd93f5
versions:
  - name: '1Flow Web (Actions) Destination'
    link: '/docs/connections/destinations/catalog/1flow-web'

---
https://1flow.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners{:target="_blank"} is a leading in-app user survey and messaging platform for Mobile app and SaaS businesses.

{% include content/plan-grid.md name="actions" %}

1Flow is an easy-to-use - yet powerful - in-app surveys and messaging software.
Using 1Flow, you can reach users in-the-moment while they are interacting with your website or mobile app, to collect highly contextual user insights that help you improve your product offering and customer experience.

When you use the 1Flow Web (Actions) Destination Segment loads the https://1flow.ai/docs/install-sdk/javascript for you. The 1Flow library enables you to track and identify your user’s events on your website and interact with the 1Flow messenger window.

## Benefits of 1Flow Web Mode (Actions) Destination
1. User installs both Segment and 1Flow’s Segment Plugin for Web on the web
2. User tracks events and identifies users to Segment SDK
3. Segment SDK directly passes the event and user payload to 1Flow without talking to server first
4. 1Flow can use this information to trigger surveys and identify users


## Getting started
1. From the segment web app,navigate to  **Conn*ection >Catalog**.
2. Search for **1Flow  Web (Actions) Destination** in the Destinations Catalog, and select the destination.*
3. Click **Configure 1Flow Web (Actions) Destination**
4. Select the web source that will send data to 1Flow web (Actions) and follow  the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/source/catalog/libraries/website/javascript).
5. On the **Settings** tab, input your 1Flow "PROJECTAPIKEY" and other destinations settings.
6. Follow the step in the Destinations Actions ducumentation on [Customizing mappings](/docs/connections/destinations/action/#customizing-mappings).
 7. Enable the destination and configured mappings.


## Supported methods

### Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```window._1flow('identify', 'userId', {
			'name': 'Jane Doe', 
			'company': 'ACME, Inc.'
			'email': 'jane.doe@gmail.com', 
			'plan': 'Premium'
			'total_spend': 880
	});

```
When you call identify method of segment, it will be equivalent to `logUser` of 1Flow. `userId` will be `userID` and `traits` will be `userDetails`.

### Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```

	window._1flow('track', 'event name', {
			'record_id':'1234abcdef56', 
			'quantity': 1
	});

```
Any value passed in `name`, will be eventName and if you have passed any event property, then it will be event `parameters`.


## Troubleshooting

### Requests to Intercom return a 404 response
If you are seeing 404 responses in your browser's network tab, you've likely encountered one of two issues:

- You set the wrong App ID on the Intercom Actions (Web) destination settings page.
- You set the wrong Regional Data Hosting value on the Intercom Actions (Web) destination settings page. Intercom gates regional endpoints by plan level, so you may not have access to EU data hosting.

### Intercom does not support rETL event batching
The Intercom (Web) Actions destination does not support the bulk contacts endpoint, and therefore is unable to support batching events in rETL.