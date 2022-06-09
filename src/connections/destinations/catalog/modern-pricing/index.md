---
title: Modern Pricing Destination
rewrite: true
hide-personas-partial: true
id: 5d65e2aa4da0623cbe367a05
---
[Modern Pricing](https://modernpricing.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides intelligent, real-time pricing recommendations for every potential customer visiting your web application.

This destination is maintained by Modern Pricing. For any issues with the destination, [contact the Modern Pricing Support team](mailto:john@modernpricing.com).


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Modern Pricing" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "Base64 Decoded Key" into your Segment Settings UI which you can find from your Modern Pricing [API Credentials](https://modernpricing.com/login) page. Note: You must click on the active API Key Value to view the Base64 Decoded Key.

## Page

Page calls are the only type of call supported by Modern Pricing.  **Your Page calls must:**
1. Be sent from a server-side source, not the default Segment analytics.js snippet.
2. Pass along at least an `ip_address` in the context object. You may optionally provide the `user_agent` parameter for more accurate scoring.


    | Parameter  | Required | Description |
    | ---------- | -------- | ----------- |
    | ip_address | true     | The ip address of the visitor you want to score. |
    | user_agent | false    | The software client acting on behalf of the visitor. |

The IP Address and User Agent are not automatically collected by Segment's server-side libraries and you will need to manually grab these fields from the client and pass them to the server. 

An example call would look like:

```
analytics.page(
  user_id: current_user.id.to_s,
  context: {
    ip_address: request.remote_ip,
    user_agent: request.user_agent
  },
  properties: {
    url: request.original_url,
    path: request.path,
    referrer: request.referrer
  }
);
```

Page calls will be sent to Modern Pricing as a `pageview`. If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does.

**Optional Best Practices**

Modern Pricing recommends the following best practices to reduce unnecessary calls to their API that will count against your monthly usage.

For *anonymous* visitors:

* Check that the visitor's User Agent is not a bot.

```
if user_agent != bot
  // Send Page call
  analytics.page(
  ...
  );
end
```

For *logged in* visitors:

* Save the Modern Pricing score on your user model so you ensure a consistent user experience.

```
# == Schema Information
#
# Table name: users
#
# id                      :bigint(8)
# first_name              :string
# last_name               :string
# email                   :string
.
.
.
# modern_pricing_score    :string
#
```

## Identify Postback

When you integrate Modern Pricing using Segment, Modern Pricing returns a postback Identify call to your source so that you'll be able to easily pass the score to your downstream destinations.

How does it work?

1. You send a Page call from your server-source like normal.
2. Modern Pricing then recognizes your Page call and automatically returns and Identify call with the `modern_pricing_score` trait.

Segment is then able to send the Modern Pricing score to the other destinations you have connected to your source.
