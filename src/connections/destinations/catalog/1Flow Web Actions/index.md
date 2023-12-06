---
title: 1Flow Web Actions
rewrite: true
id: 62bf80378e3d0241ab190594
---
## Destination Info

- Accepts **Identify**, and **Track** calls
- Refer to it as 1Flow in the **Integrations object**

---

## Components

- **Browser**

---
## Connection Modes
 ## Device-mode
 - Web

---
[1Flow](https://1flow.ai){:target="_blank"} enables user survey and messaging platform for Mobile app and SaaS businesses. 
1Flow is an easy-to-use, yet powerful in-app survey and messaging software.
Using 1Flow, you can reach users in-the-moment while they are interacting with your website or mobile app, to collect highly contextual user insights that help you improve your product offering and customer experience.

The Segment 1Flow Destination allows you to get started with 1Flow and its core APIs. You can:
1. Automatically install the [1Flow SDK](https://docs.1flow.ai/install-sdk/javascript){:target="_blank"}.
2. Automatically send [user attributes](https://docs.1flow.ai/install-sdk/javascript#de21ec0a453d443b88ca4bc1b12dc6bf){:target="_blank"} to 1Flow by connecting your Segment `identify` calls with 1Flow's own Identify API.
3. Automatically send [custom events](https://docs.1flow.ai/install-sdk/javascript#d19201d97efa4ea4b81be6a351709332){:target="_blank"} to 1Flow by connecting your Segment `track` calls with 1Flow's own Events API.

Knowing who your users are and what they're doing unlocks more advanced filtering and targeting capabilities across all of 1Flow's tools, helping you find meaningful insights faster.

This destination is maintained by 1Flow. For any issues with the destination, [contact the 1Flow Support team](mailto:support@1flow.app).

## Getting Started



1. Navigate to **Connections** and click **Add Destination** From the Segment web app.

2. Search for *1Flow Web Actions* in the Catalog, select it, and choose the JavaScript source you want to connect the destination to.

3. Add your1 Flow **PROJECT API KEY** to your Destination settings. You can find this **PROJECT API KEY**  in Account settings.

Your changes will appear in the Segment CDN after 45 minutes, and then Analytics.js will start to asynchronously load 1Flow's tracking snippet and send data.

## Identify

The 1Flow destination will automatically ingest a User ID and any values sent over your Identify spec as [traits](/docs/connections/spec/identify/#traits), as long as session capture is enabled in 1Flow.

Identify calls that do not have a User ID value will not be sent to 1Flow.

### Nested values or lists

Currently, the 1Flow Identify API **does not** support ingesting values passed as nested objects or lists over your identify Spec:

```js
"traits": {
    'name':'Jane Doe', 
    'company':'ACME, Inc.'
    'email':'jane.doe@gmail.com', 
    'plan':'Premium'
    'total_spend': 880
}
```

## Track

The 1Flow destination automatically ingests any user actions tracked over your Track spec as [events](/docs/connections/spec/track/), as long as session capture is enabled in 1Flow.

### Event properties

Currently, the 1Flow Events API **does not** support ingesting event properties:

```js
analytics.track("Experiment Viewed", {
  experiment_id: "1234",
  experiment_name: "new_upsell_UX"
  variation_id: "1234b"
  variation_name: "variant"
});
```

In the example above, 1Flow only ingests the event name, `Experiment Viewed`. All of its event properties are rejected.

### Settings

##### SETTING  

API KEY                        
(required)

##### DESCRIPTION

string. Your API key                             can be found in your 1Flow dashboard -> Settings -> Project Settings page.