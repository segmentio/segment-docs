---
title: Analytics for AMP
redirect_from: '/connections/sources/catalog/libraries/server/amp/'
---

The [Segment AMP](https://www.ampproject.org/docs/reference/components/amp-analytics#segment) component makes it easy to send your data to lots of tools without having to learn, test or implement a new AMP component every time.
The component automatically collects default properties and sends a page view.

**NOTE:** Since our AMP source sends data directly to our servers, only destinations that support [cloud-mode](/docs/connections/destinations/#connection-modes) are compatible with AMP.


## Getting Started

If you're new to [AMP](https://www.ampproject.org), go through their excellent [Quickstart](https://www.ampproject.org/docs/get_started/create_page.html). Once you're setup, follow the steps below to implement Segment.

### Step 1: Include AMP component
Before the closing `</head>` tag, include the [`amp-analytics` component](https://www.ampproject.org/docs/reference/components/amp-analytics):

  ```js
 <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  ```

### Step 2: Include Segment Analytics
Within you `<body>` tags, include the following Segment analytics snippet:

  ```html
<body>
<amp-analytics type="segment">
<script type="application/json">
  {
    "vars": {
      "writeKey": "WRITE_KEY",
      "name": "My Page Name"
    }
  }
</script>
</amp-analytics>
</body>
  ```
Replace `WRITE_KEY` with the write key you obtain from the AMP Source you've set up within the Segment UI.

By default, the snippet will automatically fire a page event which you can read more about [here](https://segment.com/docs/connections/sources/catalog/libraries/mobile/amp/#page).


## Page

The Page method lets you record page views on your website, along with your choice of [custom properties](https://segment.com/docs/connections/sources/catalog/libraries/mobile/amp/#getting-started) about the page being viewed.

A `page` call is included by default when you include Segment Analytics into your code with the ability to customize the `name` of your page:

  ```html
<amp-analytics type="segment">
<script type="application/json">
  {
    "vars": {
      "writeKey": "WRITE_KEY",
      "name": "My Page Name"
    }
  }
</script>
</amp-analytics>
  ```

## Track

The Track method (referred to as `click` in AMP) lets you record any actions your users perform.

In order to track these `click` events simply add a trigger with a `selector`, which behaves the same way as [CSS Selectors](https://www.w3schools.com/cssref/css_selectors.asp), which will send that event once the user clicks:

  ```html
<body>
<amp-analytics type="segment">
<script type="application/json">
  {
    "vars": {
      "writeKey": "WRITE_KEY",
      "name": "My Page Name"
    }
    "triggers": {
      "click": {
        "on": "click",
        "selector": ".read-more-button",
        "request": "track",
        "vars": {
          "event": "Read More Clicked"
        }
      }
    }
  }
</script>
</amp-analytics>
<button class="read-more-button">Read More</button>
</body>
  ```

## Properties

### Default Properties

A few properties are automatically collected with each page view and track call:

  ```json
{
  "anonymousId": "amp-<unique-id>",
  "context.locale": "en-US",
  "context.page.path": "/article",
  "context.page.url": "http://example.com/article",
  "context.page.referrer": "referrer",
  "context.page.title": "My Article",
  "context.screen.width": 600,
  "context.screen.height": 800
}
  ```

### Custom Properties

If you would like to collect additional, custom properties, include an `extraUrlParams` object. All properties you'd like to include must follow the format of `properties.<property_name>`:

  ```html
<amp-analytics type="segment">
<script type="application/json">
  {
    "vars": {
      "writeKey": "WRITE_KEY",
      "name": "My Page Name"
    },
    "extraUrlParams": {
      "properties.type": "article",
      "properties.published_at": "2016-06-28",
      "properties.author": "John Doe",
      "properties.button_type": "read-more",
      "properties.article_id": "my-article-id"
    }
  }
</script>
</amp-analytics>
  ```

### UTM Parameters

Our AMP Source doesn't automatically collect UTM parameters for you but you can define these explictly as a property. An example of this is shown below:

```html
<amp-analytics type="segment">
<script type="application/json">
  {
    "vars": {
      "writeKey": "WRITE_KEY",
      "name": "My Page Name"
    },
    "extraUrlParams": {
      "properties.utm_source": "google",
      "properties.utm_campaign": "2016-06-28",
      "properties.utm_medium": "email"
    }
  }
</script>
</amp-analytics>
```

## AMP Linker

In order to maintain a merged session for a user navigating from an AMP page served from AMP cache to AMP pages hosted on your domain, you will need to use the [AMP Linker](https://amp.dev/documentation/examples/advertising-analytics/joining_analytics_sessions/) feature. It works by decorating outgoing links from AMP cache with params such as AMP Client ID in a URL parameter and gets written into a first-party cookie.

In order to enable this feature, you will need to include a `linkers` object set to `true` within your configuration.

```
<amp-analytics type="segment">
<script type="application/json">
  {
    "vars": {
      "writeKey": "WRITE_KEY",
      "name": "My Page Name"
    },
    "linkers": {
      "enabled": true
    }
  }
</script>
</amp-analytics>
</body>
```


## Troubleshooting

### Can I use client-side Destinations?
No. All AMP data is sent from Google's servers to our server-side API and subsequently only onto our server-side Destinations. You will only be able to use our server-side destinations and their relevant setting. For example, for Google Analytics, use the "Server-side Tracking ID".

### How do I identify users?
Because AMP is static, it doesn't provide many options for persistently identifying users. AMP provides a basic cookie mechanism called an AMP Client ID which is a uniquely generated cookie for every unique end user's AMP session. Depending on Google's caching settings, you may receive multiple AMP Client IDs for the same user. Segment will [capture](https://github.com/ampproject/amphtml/blob/b8abe2137f1a50ca6173a258fced64e41a46c763/extensions/amp-analytics/0.1/vendors.js#L1629-L1659) this AMP Client ID as an `anonymous_id` and it will be of this format: `amp-REDmCPH4F0QX44kCFomrcA`.

### How do I manager user identities client-side and server-side?
There is no user identity management client-side with AMP, so to join user sessions together you'll need to capture the AMP Client ID on your server-side and join it with your `user_id` in your warehouse.

```
AMP Source: amp_client_id as anonymous_id
Server Source: amp_client_id as anonymous_id, user_id as user_id
```

This identity schema will allow you to join down funnel interaction with earlier website browsing behavior. On the server-side, you can grab the `amp_client_id` from the `ajs_anonymous_id` header.


### Why aren't all my IDs prefixed with an 'amp-'?

All AMP events won't consistently have an 'amp-' prefixed ID as this is only included in the event that the AMP page is directly visited on your domain.
For further details refer to the various `Client ID` scenarios in relation to AMP pages [here]( https://developers.google.com/analytics/devguides/collection/amp-analytics/client-id) (we can only guarantee that if the 3rd scenario happens, the AMP ID will get generated and picked up).


See a live <a href="https://segment-amp.firebaseapp.com">AMP with Segment analytics</a>
<link rel="amphtml" href="https://segment-amp.firebaseapp.com">
