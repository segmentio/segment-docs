---
rewrite: true
title: Userlike Destination
---

[Userlike](https://www.userlike.com/en/) is B2C live chat software optimized for website and messenger support - it enables real-time analysis, so you can see web visitors and actions taken. Our Userlike destination code is open source and is viewable [here](https://github.com/segment-integrations/analytics.js-integration-userlike).

This document was last updated on October 22, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Userlike" within the Destinations Catalog and confirm the Source you'd like to connect to - keep in mind, that the Userlike destination is only compatible with our Javascript source.
3. Add your Secret Key to your destination settings in Segment - your Secret Key can be found under Config > Install > Secret in your Userlike dashboard. It should look something like this: 8a3707ab96df8354253c158a25f908b84dc655c27d5828a1a97d99f08bfba6f4.
4. Once you enable the destination, our CDN is updated within 45 minutes. Analytics.js will start asynchronously loading Userlike's javascript onto your page. Please remember to remove Userlike's snippet from your page.

## Track
 If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does.

### Record Live Chat Events

With Userlike we _only support "Live Chat" `track` events_. If you enable "Record Live Chat Events" in your destination settings, we will automatically collect the following events on your behalf:
* Live Chat Conversation Started
* Live Chat Message Sent
* Live Chat Message Received

These events will then flow out to your other tools, so you can do things like analyze if users who chat spend more money over time.

To learn more about the live chat events you can capture with this destination, head on over to our [Live Chat spec docs](/docs/spec/live-chat/).
