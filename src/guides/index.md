---
title: An introduction to Segment
---

Welcome! This page is a high-level introduction to the Segment Platform, including what it does and how. (If you're looking for detailed information about architecture, setup, or maintenance, you can **[skip ahead](#where-can-i-learn-more).**)

## What is Segment?

Segment is a Customer Data Platform (CDP), which means that we provide a service that simplifies collecting and using data from the users of your digital properties (websites, apps, etc). With Segment, you can collect, transform, send, and archive your [first-party customer data](https://segment.com/books/customer-data/first-party-data/). We simplify the process of collecting data and hooking up new tools, allowing you to spend more time using your data, and less time trying to collect it.

You can also enrich the customer data you collect by connecting data from your other tools, and then aggregate it to monitor performance, inform decision-making processes, and create uniquely customized user experiences. You can also use Personas, our identity resolution tool, to unify data from individual users to gain a wholistic understanding of their actions.

{% include components/media-icon.html href="
https://university.segment.com/introduction-to-segment/299955?reg=1&referrer=docs" icon="media/icon-academy.svg" title="Segment University: How Segment Works" content="Check out how to get started with Segment in Segment University! (Must be logged in to access.)" %}

## What does it do?

In its very simplest form, Segment generates messages about what's happening in your site or app, then translates the content of those messages into different formats for use by other tools (which we call '[Destinations](/docs/connections/destinations)'), and transmits messages to those tools. The Segment servers also archive a copy of the data, and can [send data to your storage systems](/docs/connections/storage/) (such as databases, warehouses, or bulk-storage buckets).

## How does Segment work?

Segment's libraries generate and send messages to our tracking API in JSON format. We provide a standard structure for the basic API calls, along with a recommended JSON structure (also known as the 'Spec', a type of schema) that helps keep the most important parts of your data consistent, while allowing great flexibility in what other information you collect and where.

### Segment Messages

When you implement Segment, you add our code to your website, app, or server, which generates messages based on specific triggers you define. At its very simplest, this code can be a snippet that you copy and paste into the HTML of a website to track page views. It can also be as complex as Segment calls embedded in a React mobile app to send messages when the app is opened or closed, when the user performs different actions, or when time based conditions are met (for example "ticket reservation expired" or "cart abandoned after 2 hours").

Segment has [Sources](/docs/connections/sources/) and [Destinations](/docs/connections/destinations/). Sources send messages _into_ Segment (and other tools), while Destinations receive messages _from_ Segment.

### Anatomy of a Segment message

{% include content/message-anatomy.md %}


### Segment Sources

Segment provides several types of Sources which you can use to collect your data, and which you can choose among based on the needs of your app or site. For websites, you can embed a library which loads on the page to create the Segment messages. If you have a mobile app, you can embed one of our Mobile libraries, and if you'd like to create messages directly on a server (if you have, for example a dedicated .NET server that processes payments), we have several server-based libraries that you can embed directly into your backend code. (You can also use [cloud-sources](/docs/connections/sources/about-cloud-sources/) to import data about your app or site from other tools like Zendesk or Salesforce, to enrich the data sent through Segment.)

### Destinations

Once Segment generates the messages, it can send them directly to the Segment servers for translation and forwarding on to the Destinations you're using, or it can make calls directly from the app or site to the APIs of your Destination tools. Which of these methods you choose depends on which Destinations you're using and other factors. You can read more about these considerations in our [Connection Modes documentation](/docs/connections/destinations/#connection-modes)


## What happens next?

Messages sent to the Segment servers using the tracking API can then be translated and forwarded on to Destination tools, inspected to make sure that they're in the correct format or schema, inspected to make sure they don't contain any Personally Identifying Information (PII), aggregated to illustrate overall performance or metrics, and archived for later analysis and reuse.

## What are the other parts of the Segment platform?

In addition to [Connections](/docs/connections/) (our core message routing product) Segment offers a additional features to help your organization do more with its data, and keep data clean, consistent, and respectful of end-user privacy. The following products are available:

- [Privacy Portal](/docs/privacy/portal/) - available to all users - Inspect incoming messages to identify PII, classify it by its riskiness, and decide how it's handled and which tool may use it.
- [Protocols](/docs/protocols/) - create a unified schema for all the data you collect, coordinate implementation to keep it consistent with that schema, and make sure your data always arrives in the right format and block and alert when it doesn't.
- [Personas](/docs/personas/) - identify groups of users ("audiences") based on behavior or other metrics calculated from your data, and send these groups to Destinations, identity resolution

<!-- TODO: add these?
- [Transformations]() - correct data formatting issues coming from sources from within the Segment web app.
- [Functions]() - write code to create custom handlers for data coming from sources-->

## Where can I learn more?

We've generated different guides based on the main activities you'll do in Segment. If you wear many hats, you might use all of these guides!

- {% include components/button-hollow.html text="I'm a Segment Developer" href="/docs/guides/intro-impl/" %}
- {% include components/button-hollow.html text="I'm a Segment Data user" href="/docs/guides/intro-user/" %}
- {% include components/button-hollow.html text="I'm a Segment Workspace administrator" href="/docs/guides/intro-admin/" %}


## What's a Workspace?

{% include content/whats-a-workspace.md %}

## What's a Source?

{% include content/whats-a-source.md %}

## What's a Destination?

{% include content/whats-a-destination.md %}

## What's a Warehouse?

{% include content/whats-a-warehouse.md %}
