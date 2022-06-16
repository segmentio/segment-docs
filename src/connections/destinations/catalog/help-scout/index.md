---
title: Help Scout Destination
rewrite: true
hide-boilerplate: true
id: 54521fd725e721e32a72eebf
---
[Help Scout](https://www.helpscout.net/) is a help desk software company which provides an email-based customer support platform, knowledge base tool, and an embeddable search/contact widget for customer service professionals.

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for Help Scout in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Click "Connect to Help Scout" to start the Help Scout authentication process. Help Scout provides a secure token that Segment uses to send data to Help Scout. If you need to change accounts, click **Disconnect**, then connect to a new Help Scout account.
4. Enable the Destination.
5. Start sending events!

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like this:

    analytics.identify({
      userId: '019mr8mf4r',
      traits: {
        name: 'Kamala Khan',
        email: 'kkhan@colesacademic.edu',
      }
    });

You can use the Identify call to create or update customers in your Help Scout account.

Help Scout requires a `name` and an `email` to complete the request. You can set the userId as the `email`, although this is [not recommended](/docs/connections/spec/identify/#user-id). You can also specify `firstName` and `lastName` traits instead of a single `name` trait. You can learn more about which properties Help Scout accepts [here](https://developer.helpscout.com/mailbox-api/endpoints/customers/create/){:target="_blank"}.

> info ""
> This destination doesn't allow you to send custom properties to Help Scout. Use [Destination Functions](/docs/connections/functions/destination-functions/#create-a-destination-function) to send any non-standard properties to Help Scout.
