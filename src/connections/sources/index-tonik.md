---
title: Sources
sidebar: Overview
redirect_from:
- '/guides/sources/what-can-I-do-with-sources-data'
- '/sources/etl-billing/'
- '/sources/etl-usage/'
- '/sources/5/'
- '/sources/cloud-app/'
landing: true
contributors:
  - name: Paul Mccall
    date: 23.08.2019
  - name: Jane Doe
    date: 23.08.2019
  - name: Porter Braun
    date: 23.08.2019
  - name: Monica Buck
    date: 23.08.2019
faq:
  Source:
    - title: "Should I track client or server-side?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/connections/sources/catalog/libraries/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "What are best practices in identifying users?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/connections/sources/catalog/libraries/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "What events should I track?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/connections/sources/catalog/libraries/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "How do I join user profiles?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/connections/sources/catalog/libraries/mobile/ios). It's worth a read!
    - title: "How do I measure my advertising funnel?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/connections/sources/catalog/libraries/mobile/ios). It's worth a read!
  Cloud Sources:
    - title: "What are cloud sources?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/connections/sources/catalog/libraries/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "How do cloud sources work?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/connections/sources/catalog/libraries/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "What can I do with cloud app source data?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/connections/sources/catalog/libraries/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "What are some common cloud source errors and how do I debug them?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/connections/sources/catalog/libraries/mobile/ios). It's worth a read!

related:
  - "/connections/sources/catalog/"
  - "/connections/sources/faq/"
---


## What is a source?

In Segment, you create a source (or more than one!) for each website or app you want to track. While it's not required that you have a single Source for each server, site or app, we **highly recommend** creating a Source for each unique source of data.

You can create new sources using the button in the workspace view. Each source you create has a write key, which is used to send data to that source. For example, to load [`analytics.js`, the Segment JavaScript library](https://segment.com/docs/connections/sources/catalog/libraries/website/analytics.js/) on your page, the snippet on the [Quickstart Guide](https://segment.com/docs/connections/sources/catalog/libraries/website/analytics.js/quickstart/) includes:

{% codeexample %}
{% codeexampletab JavaScript %}
```js
analytics.identify('025pikachu025', {
  email: 'peekAtMe@email.poke',
  name: 'Pikachu'
  }, {
  integrations: {
    'All': false,
    'Intercom': true,
    'Google Analytics': true,
  }
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

---

## Website libraries

[Analytics.js](/docs/connections/sources/catalog/libraries/website/analytics.js/), our Javascript library, is the most powerful way to track customer data from your website. If you're just starting out, we recommend it over server-side libraries as the simplest installation for any website.

{% include components/media-icon.html
  href="#"
  icon="symbols/connections.svg"
  title="The Analytic Quickstart Guide"
  content="Analytics and data collection is a very broad topic and it can be quite overwhelming. How do you get started?"
%}

---

## Mobile

Our Mobile SDKs are the best way to simplify your iOS, Android, and Xamarin app tracking. We recommend them over server-side sources as the default installation for any mobile app.

- [iOS SDK](/docs/connections/sources/catalog/libraries/mobile/ios)
- [Android SDK](/docs/connections/sources/catalog/libraries/mobile/android)
- [Android Wear SDK](/docs/connections/sources/catalog/libraries/mobile/android/wear)
- [Xamarin SDK](/docs/connections/sources/catalog/libraries/mobile/xamarin)
- [AMP](/docs/connections/sources/catalog/libraries/mobile/amp)
- [React Native](/docs/connections/sources/catalog/libraries/mobile/react-native)

---

## Server

Our server-side sources let you send analytics data directly from your servers. We only recommend tracking from your servers when client-side tracking won't work. Check out [our guide on server-side tracking](/docs/guides/sources/client-vs-server) if you're not sure whether it makes sense for your use case.

{: .columns }
- [Clojure](/docs/connections/sources/catalog/libraries/server/clojure/)
- [Go](/docs/connections/sources/catalog/libraries/server/go/)
- [Java](/docs/connections/sources/catalog/libraries/server/java/)
- [Node.js](/docs/connections/sources/catalog/libraries/server/node/)
- [PHP](/docs/connections/sources/catalog/libraries/server/php/)
- [Python](/docs/connections/sources/catalog/libraries/server/python/)
- [Ruby](/docs/connections/sources/catalog/libraries/server/ruby/)
- [.NET](/docs/connections/sources/catalog/libraries/server/net/)

> note "Server-side tracking"
> Server-side data management is when tag sends data into your web server, then your web server passes that data to the destination system/server.
> [Find out more](https://segment.com)

---

## Cloud Apps

Cloud app sources empower you to pull together data from all of your different third-party tools into a Segment warehouse or to your other enabled integrated tools. There are two types of Cloud Apps: **Object** and **Event** sources.

### Object Cloud Sources

These Cloud App Sources can export data from its third party tool and import it directly into your Segment warehouse. Make sure you have a Segment warehouse enabled before you enable any of the following sources:

{: .columns }
- [Salesforce](/docs/connections/sources/catalog/cloud-apps/salesforce/)
- [Stripe](/docs/connections/sources/catalog/cloud-apps/stripe/)
- [Zendesk](/docs/connections/sources/catalog/cloud-apps/zendesk/)
- [Facebook Ads](/docs/connections/sources/catalog/cloud-apps/facebook-ads/)
- [Google Ads](/docs/connections/sources/catalog/cloud-apps/google-ads/)
- [SendGrid](/docs/connections/sources/catalog/cloud-apps/sendgrid/)
- [Mailchimp](/docs/connections/sources/catalog/cloud-apps/mailchimp/)
- [Mandrill](/docs/connections/sources/catalog/cloud-apps/mandrill/)
- [Marketo](/docs/connections/sources/catalog/cloud-apps/marketo/)
- [Twilio](/docs/connections/sources/catalog/cloud-apps/twilio/)
- [HubSpot](/docs/connections/sources/catalog/cloud-apps/hubspot/)
- [Intercom](/docs/connections/sources/catalog/cloud-apps/intercom/)
- [Salesforce Marketing Cloud](/docs/connections/sources/catalog/cloud-apps/salesforce-marketing-cloud/)


### Event Cloud Sources

These Cloud App Sources can not only export data into your Segment warehouse, but they can **also** federate the exported data into your other enabled Segment integrations:

{: .columns }
- [Facebook Lead Ads](/docs/connections/sources/catalog/cloud-apps/facebook-lead-ads/)
- [Activecampaign](/docs/connections/sources/catalog/cloud-apps/activecampaign/)
- [Customer.io](/docs/connections/sources/catalog/cloud-apps/customer.io/)
- [Drip](/docs/connections/sources/catalog/cloud-apps/drip/)
- [Iterable](/docs/connections/sources/catalog/cloud-apps/iterable/)
- [Klaviyo](/docs/connections/sources/catalog/cloud-apps/klaviyo/)
- [Mailjet](/docs/connections/sources/catalog/cloud-apps/mailjet/)
- [Nudgespot](/docs/connections/sources/catalog/cloud-apps/nudgespot/)
- [Vero](/docs/connections/sources/catalog/cloud-apps/vero/)
- [Blueshift](/docs/connections/sources/catalog/cloud-apps/blueshift/)
- [Delighted](/docs/connections/sources/catalog/cloud-apps/delighted/)
- [Braze](/docs/connections/sources/catalog/cloud-apps/braze/)
- [Looker](/docs/connections/sources/catalog/cloud-apps/looker/)
- [Radar](/docs/connections/sources/catalog/cloud-apps/radar/)
- [Autopilot](/docs/connections/sources/catalog/cloud-apps/autopilothq/)
- [Friendbuy](/docs/connections/sources/catalog/cloud-apps/friendbuy/)
- [Amplitude Cohorts](/docs/connections/sources/catalog/cloud-apps/amplitude-cohorts/)
- [Klenty](/docs/connections/sources/catalog/cloud-apps/klenty/)
- [ProveSource](/docs/connections/sources/catalog/cloud-apps/provesource/)
- [Moesif API Analytics](/docs/connections/sources/catalog/cloud-apps/moesif-api-analytics/)

To dig into some examples of how to pull this data together, check out our [sample queries](https://community.segment.com/category/warehouses) in the Segment Community.


### HTTP

If we don't have a library for your environment yet, you can always send your data directly to our [HTTP Tracking API](/docs/connections/sources/catalog/libraries/server/http/). All of our other sources and platforms use the HTTP API to work their magic behind the scenes.


### Pixel

Our [Pixel Tracking API](/docs/connections/sources/catalog/libraries/server/pixel-tracking-api/) lets you track events from environments where you can't execute code, like tracking email opens.

| Event name              | Description       |
| ---                     | ---               |
| Email Delivered         | Message has been successfully delivered to the receiving server |
| Email Opened	          | Recipient has opened the HTML message. You need to enable Open Tracking for getting this type of event |
| Email Link Clicked      | Recipient clicked on a link within the message. You need to enable Click Tracking for getting this type of event |
| Email Bounced           | Receiving server could not or would not accept message |
| Email Marked as Spam    | Recipient marked message as spam |
| Unsubscribe             | Recipient clicked on message's subscription management link |

### Source request

We'd love to know what other sources of data you'd like to analyze. Please [log your request](/contact/requests/source/).

---

## Visual Tagger (Beta)

[Getting started with Segment Visual Tagger](/docs/connections/sources/visual-tagger)
