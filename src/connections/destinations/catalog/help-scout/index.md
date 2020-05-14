---
title: Help Scout Destination
rewrite: true
---

[Help Scout](https://www.helpscout.net/) is a help desk software company which provides an email-based customer support platform, knowledge base tool, and an embeddable search/contact widget for customer service professionals.

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for Help Scout within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Click "Connect to Help Scout" to start the Help Scout authentication process. Help Scout provides a secure token that Segment uses to send data to Help Scout. If you need to change accounts, click **Disconnect**, then connect to a new Help Scout account.
4. Enable the Destination.
5. Start sending events!

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like this:

    analytics.identify({
      userId: '019mr8mf4r',
      traits: {
        name: 'Kamala Khan',
        email: 'kkhan@colesacademic.edu',
      }
    });

You can use the Identify call to create or update customers in your Help Scout account.

A `name` and an `email` are required by Help Scout to complete the request. You can set the userId as the `email`, although this is [not recommended](https://segment.com/docs/connections/spec/identify/#user-id). You can also specify `firstName` and `lastName` traits instead of a single `name` trait. You can learn more about which properties Help Scout will accept [here](https://developer.helpscout.com/mailbox-api/endpoints/customers/create/).
