---
title: Segment for Developers
---

This guide explains all you need to know to get started with your Segment implementation, and directs you to more resources depending on your specific needs.

> info ""
> If you haven't already, you should read the [detailed explanation of Segment](/docs/guides/) on the previous page!

{% include components/reference-button.html href="https://university.segment.com/introduction-to-segment/324262?reg=1&referrer=docs" icon="media/icon-academy.svg" title="Segment University: Segment in Action" description="See a quick example of Segment working on an ecommerce website. (Must be logged in to access.)" %}

## What does Segment do?

Segment sends messages about activities in your mobile apps, websites or servers, receives those messages, and translates and forwards the message content to Destination tools. It also can send the contents of those messages to a bulk storage destination for archiving. In more complicated implementations, Segment can serve as a wrapper to trigger messages directly to other APIs, and can inspect, correct, classify and block the message contents.

## Types of Segment messages

Segment's libraries generate and send messages to our tracking API in JSON format, and provide a standard structure for the basic API calls. We also provide recommended JSON structure (also known as a schema, or 'Spec') that helps keep the most important parts of your data consistent, while allowing great flexibility in what other information you collect and where.

There are six calls in the basic tracking API, which answer specific questions:

- [Identify](/docs/connections/spec/identify/): Who is the user?
- [Track](/docs/connections/spec/track/): What are they doing?
- [Page](/docs/connections/spec/page/): What web page are they on?
- [Screen](/docs/connections/spec/screen/): What app screen are they on?
- [Group](/docs/connections/spec/group/): What account or organization are they part of?
- [Alias](/docs/connections/spec/alias/): What was their past identity?

Among these calls, you can think of Identify, Group, and Alias as similar types of calls, all to do with updating our understanding of the user who is triggering Segment messages. You can think of these calls as adding information to, or updating an object record in a database. **Objects** are described using "traits", which you can collect as part of your calls.

The other three, Track, Page, and Screen, can be considered as increasingly specific types of events. **Events** can occur multiple times, but generate separate records which append to a list, instead of being updated over time.

A Track call is the most basic type of call, and can represent any type of event. Page and Screen are similar and are triggered by a user viewing a page or screen, however Page calls can come from both web and mobile-web views, while Screen calls *only* occur on mobile devices. Because of the difference in platform, the context information collected is very different between the two types of calls.

> success ""
> **Tip**! Segment recommends that you always use the Page and Screen calls when recording a page-view, rather than creating a "Page Viewed" event, because the Page/Screen calls automatically collect much better context information.

## Anatomy of a Segment message

{% include content/message-anatomy.md %}

## Message schemas, Blocks, and Specs

The Segment "Specs" provide recommended message schemas - the information we recommend that you collect - for each type of call. These are recommendations not requirements, but if you follow these schema guidelines the Segment servers can more easily identify parts of your messages, and translate them to downstream tools.

In addition to the recommended message schemas, Segment also provides "blocks": recommendations on what information to collect and how to format it, for different industries and use cases. These are recommendations only, but by collecting all of the information in these blocks, you can ensure that common tools used in that use-case have the information they need to function.

A third section of the Spec is the "industry specs" which provide recommendations that include an explicit translation or mapping in the Segment servers, to best power the downstream Destinations commonly used in these industries.

## Sources and Destinations

When you start out, you create a Workspace, which serves as a container for all of your Sources and Destinations.

Segment has [Sources](/docs/connections/sources/) and [Destinations](/docs/connections/destinations/). Sources send data _into_ Segment, while Destinations receive data _from_ Segment.

Segment has five types of sources: Web (Analytics.js), Mobile, Server, and Cloud App, plus a fifth type: User-created [Source Functions](/docs/connections/sources/source-functions/). Web, Mobile, and Server sources send first-party data from your digital properties. Cloud-app sources send data about your users from your connected web apps, for example a ticketing system such as [Zendesk](/docs/connections/sources/catalog/cloud-apps/zendesk/), a payments system such as [Stripe](/docs/connections/sources/catalog/cloud-apps/stripe/), or a marketing tool like [Braze](/docs/connections/sources/catalog/cloud-apps/braze/).


## Connection modes

Segment has several types of sources, and many destinations can accept data from all of them. However, some are only compatible with specific source types (for example, web only, or server only). To find out which source types a specific destination can accept data from, check the documentation for that destination for a "Supported Sources and Connection Modes" section.

{% include content/connection-modes-intro.md %}

To learn more about connection modes and when you should use each, see the [details in the Destinations docs](/docs/connections/destinations/#when-should-i-use-device-mode-when-should-i-use-cloud-mode).


## Planning your Segment implementation

The journey of a thousand miles begins, ideally, with a plan. Regardless of if you're a new company just implementing analytics for the first time, or a multi--national corporation modernizing your analytics stack, it's a great idea to [start with a Tracking Plan](/docs/protocols/tracking-plan/create/). For new implementations, this can be as simple as a document where you write down these four things for each item you track:

- What am I tracking? (What is the event name or type?)
- Why am I tracking it? (What questions does this data answer?)
- For whom am I tracking it? (Who owns this question, tool, or business area?)
- Where (which destination tools) do I want to send this data to?

If you're a large or long-established organization and you're replacing existing tools, you'll want to spend more time on this to maintain analytic parity and continuity of tooling. We highly recommend [reading up on tracking plans](/docs/protocols/tracking-plan/create/) and [schemas](/docs/protocols/enforce/schema-configuration/) for [Protocols](/docs/protocols/), our tool for managing and sharing tracking plans and enforcing schemas.

Regardless of your organization's size or age, you'll want to take an inventory of the destination tools you'll be using with Segment, and make a list of the connection modes each one accepts. This makes it easier to check off when you've implemented each one, so you're not missing anything.


<!--
## Initialize a Source

in the segment app: Add source
then implement: add snippet, import code, add library, w/e. add code calls to generate the messages on specific actions - maybe a button click, zooming in or out, or just loading a page
then hook up to destinations in the app -->

## How do I test if it's working?

There are several ways to check if your data is flowing. One is the [Debugger tab in each Source](/docs/connections/sources/debugger/) in the Segment web app, where you can see data coming from a source into Segment. Another is the [Event Delivery tool](/docs/connections/event-delivery/) which shows which data is arriving at specific destinations.

For monitoring purposes, you'll also see alerts in the [Workspace Health](/docs/segment-app/#health) tool if your sources or destinations produce repeated errors.

## How do I filter my data?

There are several different ways to ensure that you can collect your data once, but filter it out of specific destinations. See [Filtering Data](/docs/guides/filtering-data/) for a list of the available methods and descriptions.

## Troubleshooting

If you're seeing errors thrown by your destinations, you might have an implementation issue. See the [Integration Error Codes list](/docs/connections/integration_error_codes/) or [contact our Success engineering team](https://segment.com/help/contact/) for help.


> success ""
> Have suggestions for things to add to this guide? [Drop us a line](mailto:docs-feedback@segment.com?subject=Segment%20Dev%20guide%20Suggestion)!
