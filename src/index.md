---
title: Segment Documentation
layout: home
landing: true
redirect_from:
- '/api/'
- '/big-picture/'
- '/big-picture/best-practices/'
- '/big-picture/what-we-do/'
- '/guides/mobile-spec-guides/'
- '/guides/sources/add-my-own-source/'
- '/pl/'
- '/platforms/chrome-extension/When/'
- '/plugins/woocommerce%20'
- '/troubleshooting/data'
---

# H1
Welcome to the Segment!
Get familiar with our products, features, and integrations!

{% include components/callout-mobile.html heading="Segment Platform" content="Integrate once. Connect your entire stack." buttonText="Learn more about Segment" buttonHref="segment.com" %}

{% include landing.html %}

## Getting Started

{% capture step1 %}
  Not sure what to track or why? Check out Segment's [Analytics Academy](https://segment.com/academy/) to learn more about the wide world of analytics, including the what and why and some stories about beautiful stacks.
{% endcapture %}

{% capture step2 %}
  Check out [Segment University](https://university.segment.com/) for some step-by-step instruction on implementing Segment, and some of our advanced features.
{% endcapture %}

{% capture step3 %}
  Check out the [Connections](/docsv2/connections/) documentation to learn about our [Sources](/docsv2/connections/sources/) (what you can use to collect your data), [the Segment Spec](/docsv2/connections/spec/) (the formats you can build on to collect data), and our [Destinations](/docsv2/connections/destinations/) (the tools you can then send data to).
{% endcapture %}

{% include components/list-steps.html number="1" heading="Totally new here?" content=step1 %}
{% include components/list-steps.html number="2" heading="Digging in on technical details?" content=step2 %}
{% include components/list-steps.html number="3" heading="Ready to get started implementing?" content=step3 %}

<br>

Be sure to check out the [Guides](/docsv2/guides/) for FAQs and Best Practices, and dig in to the [App](/docsv2/segment-app/) section to get to know the Segment web app.
