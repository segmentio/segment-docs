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
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/sources/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "What are best practices in identifying users?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/sources/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "What events should I track?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/sources/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "How do I join user profiles?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/sources/mobile/ios). It's worth a read!
    - title: "How do I measure my advertising funnel?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/sources/mobile/ios). It's worth a read!
  Cloud Sources:
    - title: "What are cloud sources?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/sources/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "How do cloud sources work?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/sources/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "What can I do with cloud app source data?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/sources/mobile/ios). It's worth a read!
      link: /sources/catalog
    - title: "What are some common cloud source errors and how do I debug them?"
      content: |
        One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?" This is such an important topic that we've written up an in-depth article in our Analytics Academy: [When to Track on the Client vs Server](/docs/sources/mobile/ios). It's worth a read!

related:
  - "/connections/sources/catalog/"
  - "/connections/sources/faq/"
---


## What is a source?

In Segment, you create a source (or more than one!) for each website or app you want to track. While it's not required that you have a single Source for each server, site or app, we **highly recommend** creating a Source for each unique source of data.

You can create new sources using the button in the workspace view. Each source you create has a write key, which is used to send data to that source. For example, to load [`analytics.js`, the Segment JavaScript library](https://segment.com/docs/sources/website/analytics.js/) on your page, the snippet on the [Quickstart Guide](https://segment.com/docs/sources/website/analytics.js/quickstart/) includes:

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

[Analytics.js](/docs/sources/website/analytics.js/), our Javascript library, is the most powerful way to track customer data from your website. If you're just starting out, we recommend it over server-side libraries as the simplest installation for any website.

{% include components/media-icon.html
  href="#"
  icon="symbols/connections.svg"
  title="The Analytic Quickstart Guide"
  content="Analytics and data collection is a very broad topic and it can be quite overwhelming. How do you get started?"
%}

---

## Mobile

Our Mobile SDKs are the best way to simplify your iOS, Android, and Xamarin app tracking. We recommend them over server-side sources as the default installation for any mobile app.

- [iOS SDK](/docs/sources/mobile/ios)
- [Android SDK](/docs/sources/mobile/android)
- [Android Wear SDK](/docs/sources/mobile/android/wear)
- [Xamarin SDK](/docs/sources/mobile/xamarin)
- [AMP](/docs/sources/mobile/amp)
- [React Native](/docs/sources/mobile/react-native)

---

## Server

Our server-side sources let you send analytics data directly from your servers. We only recommend tracking from your servers when client-side tracking won't work. Check out [our guide on server-side tracking](/docs/guides/sources/client-vs-server) if you're not sure whether it makes sense for your use case.

{: .columns }
- [Clojure](/docs/sources/server/clojure/)
- [Go](/docs/sources/server/go/)
- [Java](/docs/sources/server/java/)
- [Node.js](/docs/sources/server/node/)
- [PHP](/docs/sources/server/php/)
- [Python](/docs/sources/server/python/)
- [Ruby](/docs/sources/server/ruby/)
- [.NET](/docs/sources/server/net/)

> note "Server-side tracking"
> Server-side data management is when tag sends data into your web server, then your web server passes that data to the destination system/server.
> [Find out more](https://segment.com)

---

## Cloud Apps

Cloud app sources empower you to pull together data from all of your different third-party tools into a Segment warehouse or to your other enabled integrated tools. There are two types of Cloud Apps: **Object** and **Event** sources.

### Object Cloud Sources

These Cloud App Sources can export data from its third party tool and import it directly into your Segment warehouse. Make sure you have a Segment warehouse enabled before you enable any of the following sources:

{: .columns }
- [Salesforce](/docs/sources/cloud-apps/salesforce/)
- [Stripe](/docs/sources/cloud-apps/stripe/)
- [Zendesk](/docs/sources/cloud-apps/zendesk/)
- [Facebook Ads](/docs/sources/cloud-apps/facebook-ads/)
- [Google Ads](/docs/sources/cloud-apps/google-ads/)
- [SendGrid](/docs/sources/cloud-apps/sendgrid/)
- [Mailchimp](/docs/sources/cloud-apps/mailchimp/)
- [Mandrill](/docs/sources/cloud-apps/mandrill/)
- [Marketo](/docs/sources/cloud-apps/marketo/)
- [Twilio](/docs/sources/cloud-apps/twilio/)
- [HubSpot](/docs/sources/cloud-apps/hubspot/)
- [Intercom](/docs/sources/cloud-apps/intercom/)
- [Salesforce Marketing Cloud](/docs/sources/cloud-apps/salesforce-marketing-cloud/)


### Event Cloud Sources

These Cloud App Sources can not only export data into your Segment warehouse, but they can **also** federate the exported data into your other enabled Segment integrations:

{: .columns }
- [Facebook Lead Ads](/docs/sources/cloud-apps/facebook-lead-ads/)
- [Activecampaign](/docs/sources/cloud-apps/activecampaign/)
- [Customer.io](/docs/sources/cloud-apps/customer.io/)
- [Drip](/docs/sources/cloud-apps/drip/)
- [Iterable](/docs/sources/cloud-apps/iterable/)
- [Klaviyo](/docs/sources/cloud-apps/klaviyo/)
- [Mailjet](/docs/sources/cloud-apps/mailjet/)
- [Nudgespot](/docs/sources/cloud-apps/nudgespot/)
- [Vero](/docs/sources/cloud-apps/vero/)
- [Blueshift](/docs/sources/cloud-apps/blueshift/)
- [Delighted](/docs/sources/cloud-apps/delighted/)
- [Braze](/docs/sources/cloud-apps/braze/)
- [Looker](/docs/sources/cloud-apps/looker/)
- [Radar](/docs/sources/cloud-apps/radar/)
- [Autopilot](/docs/sources/cloud-apps/autopilothq/)
- [Friendbuy](/docs/sources/cloud-apps/friendbuy/)
- [Amplitude Cohorts](/docs/sources/cloud-apps/amplitude-cohorts/)
- [Klenty](/docs/sources/cloud-apps/klenty/)
- [ProveSource](/docs/sources/cloud-apps/provesource/)
- [Moesif API Analytics](/docs/sources/cloud-apps/moesif-api-analytics/)

To dig into some examples of how to pull this data together, check out our [sample queries](https://community.segment.com/category/warehouses) in the Segment Community.


### HTTP

If we don't have a library for your environment yet, you can always send your data directly to our [HTTP Tracking API](/docs/sources/server/http/). All of our other sources and platforms use the HTTP API to work their magic behind the scenes.


### Pixel

Our [Pixel Tracking API](/docs/sources/server/pixel-tracking-api/) lets you track events from environments where you can't execute code, like tracking email opens.

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

[Getting started with Segment Visual Tagger](/docs/sources/visual-tagger)
