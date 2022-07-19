---
title: Sources Overview
landing: true
related:
  - "/connections/sources/catalog/"
  - "/connections/sources/faq/"
icon: media/academy.svg
excerpt: Detailed information about each Source. Learn how our API methods are implemented for that destination.
---

## What is a source?

In Segment, you create a source (or more than one!) for each website or app you want to track. While it's not required that you have a single Source for each server, site or app, you should create a Source for each unique source of data.

You can create new sources using the button in the workspace view. Each source you create has a write key, which is used to send data to that source. For example, to load [`analytics.js`, the Segment JavaScript library](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/) on your page, the snippet on the [Quickstart Guide](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) includes:


```js
analytics.identify('user_123', {
  email: 'jane.kim@example.com',
  name: 'Jane Kim'
  });
```

{% comment %}
{% codeexample %}
{% codeexampletab JavaScript %}
```js
analytics.identify('user_123', {
  email: 'jane.kim@example.com',
  name: 'Jane Kim'
  },
});
```
{% endcodeexampletab %}

{% codeexampletab HTML %}
```html
<div id="example"></div>
```
{% endcodeexampletab %}

{% codeexampletab CSS %}
```css
#example { color: red; }
```
{% endcodeexampletab %}
{% endcodeexample %}
{% endcomment %}
---

## Website libraries

[Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/), the JavaScript library, is the most powerful way to track customer data from your website. If you're just starting out, Segment recommends it over server-side libraries as the simplest installation for any website.

{% include components/reference-button.html
  href="https://segment.com/academy/intro/"
  icon="symbols/squares-arrow.svg"
  title="The Analytic Quickstart Guide"
  description="Analytics and data collection is a very broad topic and it can be quite overwhelming. How do you get started?"
%}

---

## Mobile

Segment's Mobile SDKs are the best way to simplify your iOS, Android, and Xamarin app tracking. Try them over server-side sources as the default installation for any mobile app.

- [AMP](/docs/connections/sources/catalog/libraries/mobile/amp)
- [Android](/docs/connections/sources/catalog/libraries/mobile/android)
- [Android Wear](/docs/connections/sources/catalog/libraries/mobile/android/wear)
- [iOS](/docs/connections/sources/catalog/libraries/mobile/ios)
- [Kotlin](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/)
- [React Native](/docs/connections/sources/catalog/libraries/mobile/react-native)
- [Swift](/docs/connections/sources/catalog/libraries/mobile/swift-ios/)
- [Xamarin](/docs/connections/sources/catalog/libraries/mobile/xamarin)

---

## Server

Segment's server-side sources let you send analytics data directly from your servers. Segment recommends tracking from your servers when device-mode tracking (tracking on the client) won't work. Check out the [guide on server-side tracking](/docs/guides/how-to-guides/collect-on-client-or-server/) if you're not sure whether it makes sense for your use case.

{: .columns }
- [Clojure](/docs/connections/sources/catalog/libraries/server/clojure/)
- [Go](/docs/connections/sources/catalog/libraries/server/go/)
- [Java](/docs/connections/sources/catalog/libraries/server/java/)
- [Node.js](/docs/connections/sources/catalog/libraries/server/node/)
- [PHP](/docs/connections/sources/catalog/libraries/server/php/)
- [Python](/docs/connections/sources/catalog/libraries/server/python/)
- [Ruby](/docs/connections/sources/catalog/libraries/server/ruby/)
- [.NET](/docs/connections/sources/catalog/libraries/server/net/)

> note "Cloud-mode tracking"
> Server-side data management is when tag sends data to the Segment servers, which then pass that data to the destination system.

---

## Cloud Apps

Cloud app sources empower you to pull together data from all of your different third-party tools into a Segment warehouse or to your other enabled integrated tools. There are two types of Cloud Apps: **Object** and **Event** sources.

{% include components/reference-button.html href="/docs/connections/sources/sources-compare/" icon="guides.svg" title="Comparing Cloud Sources" description="Wondering which cloud-apps send which types of data? Check out the Cloud Sources comparison!" %}

### Object Cloud Sources

These Cloud App Sources can export data from its third party tool and import it directly into your Segment warehouse. Make sure you have a Segment warehouse enabled before you enable any of the following sources:

{: .columns }
{% capture source-type-list %} {% include content/cloud-source-type-list.md type="object" %} {%endcapture%}
{{source-type-list | markdownify}}


### Event Cloud Sources

These Cloud App Sources can not only export data into your Segment warehouse, but they can **also** federate the exported data into your other enabled Segment integrations:

{: .columns }
{% capture source-type-list %} {% include content/cloud-source-type-list.md type="event" %} {%endcapture%}
{{source-type-list | markdownify}}

To dig into some examples of how to pull this data together, check out the [sample queries](https://community.segment.com/category/warehouses) in the Segment Community.


### HTTP

If Segment doesn't have a library for your environment, you can send your data directly to the [HTTP Tracking API](/docs/connections/sources/catalog/libraries/server/http/). All of Segment's other sources and platforms use the HTTP API to work their magic behind the scenes.


### Pixel

Segment's [Pixel Tracking API](/docs/connections/sources/catalog/libraries/server/pixel-tracking-api/) lets you track events from environments where you can't execute code, like tracking email opens.

| Event name              | Description       |
| ---                     | ---               |
| Email Delivered         | Message has been successfully delivered to the receiving server |
| Email Opened	          | Recipient has opened the HTML message. You need to enable Open Tracking for getting this type of event |
| Email Link Clicked      | Recipient clicked on a link within the message. You need to enable Click Tracking for getting this type of event |
| Email Bounced           | Receiving server could not or would not accept message |
| Email Marked as Spam    | Recipient marked message as spam |
| Unsubscribe             | Recipient clicked on message's subscription management link |
