-
title: Troubleshooting Segment Events
-

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

	- [Segment Data Flow](#segment-data-flow)
		- [Analytics.js](#analyticsjs)
		- [Expanding on the Tracking API**](#expanding-on-the-tracking-api)
			- [Integrations-consumer**](#integrations-consumer)
		- [Connection modes](#connection-modes)
			- [Client-native Destination Features](#client-native-destination-features)
			- [Choosing a Connection Mode](#choosing-a-connection-mode)
	- [Dev, QA, & Prod Sources](#dev-qa-prod-sources)
	- [Debugging Best Practices](#debugging-best-practices)
		- [Is Data reaching your debugger?](#is-data-reaching-your-debugger)
		- [Is *ANY* data reaching your Destination?](#is-any-data-reaching-your-destination)
		- [Is your Destination set up correctly?](#is-your-destination-set-up-correctly)
		- [Is your implementation server-side (i.e. Cloud Mode)?](#is-your-implementation-server-side-ie-cloud-mode)
			- [Device-Mode vs Cloud-mode troubleshooting](#device-mode-vs-cloud-mode-troubleshooting)
		- [Event Delivery Dashboard](#event-delivery-dashboard)
		- [Using the Event Tester](#using-the-event-tester)
		- [Additional troubleshooting tips](#additional-troubleshooting-tips)
	- [Further Reading](#further-reading)

<!-- /TOC -->

This documentation provides guidance on how to:

-   Understand data flow in Segment
-   Leverage different environments for testing and production
-   Apply best practices to debug issues

First, quickly review how events flow into Segment, including some concepts about how the Segment pipeline works.

Segment deals with two kinds of data: events and objects. This document describes how **events** are treated.

## Segment Data Flow

There are three main ways to get event data into Segment:

-   **Analytics.js** -- also known as ajs: the Javascript library
    running in the end-user's browser (be it desktop or mobile)
-   **Server integration:** Libraries (Node, Python, etc.), and direct
    HTTP requests.
-   **Mobile SDKs:** iOS, Android, etc

All the above libraries produce streaming events that go through our
Tracking API.

### Analytics.js

The Javascript libraries support multiple API methods but it has one
main method: `track()`. This function does two main things:

1.  Invoke client-side integrations (if configured)
2.  Send the event to Segment.

Each workspace has its own a.js file. It is generated in the background
when any of the relevant settings for the workspace are updated. Because
this rendering process is asynchronous, there may be potential events
submitted with an outdated configuration. Any system that does not
account for this behavior may potentially drop data.

In the current implementation, Segment is treated as any other
client-side integrations. When track() method is called, it goes through
all the client-side integrations configured for that workspace, and a
"Segment" destination. Any and all of those calls can fail for many
reasons (the user navigated away from the page, lost its Internet
connection, server-side issue, etc). As a result, for a given
integration, an event happening in the browser can be seen by:

-   Both Segment and the integration
-   Just Segment, not the integration
-   Just the integration, not Segment
-   Neither (effectively the event is dropped)

### Expanding on the Tracking API**

Within the Tracking API pipeline, we have additional services that
enrich and/or validate events that are ingested in our front door before
they are consumed by our main processing service called Centrifuge. Here
are some details about some of these services:

#### Integrations-consumer**

Although this is only tangential to how events get into Segment, this
system performs multiple verifications based on channel and connection
mode to decide whether to process or drop events. For each event, it
prepares an "action plan" describing what needs to happen to that event
based on many settings, then forwards that plan to our processing service to execute
it. These validations include:

1.  **server-side integration exists?**

This checks against the catalog of our Destinations whether a
server-side integration exists for that event. For example, PerimeterX
does not support server-side events, only client-side. If no integration
exists, the event is dropped since we know it's not supported.

2.  **data already sent by the client?**

When a.js is set up to send the data to both Segment and a destination
in device mode, events are dropped here to avoid double-publishing to
the same destination.

3. Channel determination

When an event is ingested, it receives a "channel" attribute. A channel
can be either client or server. Events sent by server integrations and
mobile SDKs have channel set to server. Analytics.js works differently.
It connects to a set of HTTP endpoints: /i, /t, /p etc. When an event
makes it through those endpoints, it has channel set to client.

-   Analytics.js and device-mode events → channel=client
-   Anything else → channel=server

Each destination defines which channels it supports. If the event coming
in does not belong to any of the supported channel, it is dropped.

### Connection modes

A [connection mode](https://segment.com/blog/connection-modes/) is an
attribute of a destination. It defines how events sent from our
device-mode libraries are sent to each Destination. They can either be:

-   device mode: event sent directly from the end user's device (client-side);
-   cloud mode: event sent by Segment's servers/infrastructure (server-side).

Events sent by server integrations or mobile SDKs are by definition
always sent to the destination by Segment's servers. However, some
mobile Destinations are also supported in device-mode when bundling our
libraries into the app in order to support specific device-based features
(more on this below)

Not all destinations support both connection modes. Some destinations
are device mode only, and some cloud mode only. When a destination
supports both connection modes, it defaults to using device mode.

#### Client-native Destination Features

Many of our destination partners offer device-based features beyond data
collection in their SDKs and libraries, for both mobile and web. In
these cases, we offer Device-based Connection Modes so that you can
still completely abstract over the implementation of their SDK and
ensure that all the data you collect with Segment is still routed
appropriately while availing you of their complete native functionality.

Some features that usually require a Device-based Connection Mode
include automatic A/B testing; displaying user surveys, live chat or
in-app notifications; touch/hover heatmapping; and accessing rich device
data such as CPU usage, network data, or raised exceptions.

#### Choosing a Connection Mode

By default, mobile destinations use a Cloud-based connection mode, which
forwards data to other destinations so you don't need to package their
third-party SDKs. A few of our Web destinations also have Cloud-based
Connection Modes, to help reduce website size, and improve page load
time and site performance.

Before you turn on or opt-in for Cloud mode, consider if the destination
has features that require device-based interactions or data (see the
examples above). For example, if you use the Cloud-based Connection Mode
for Mixpanel, you'll get your data on reporting and people, but won't
be able to use their features for in-app surveys or auto-tracking. These
can be really valuable, but might not be a priority for your team.

Unfortunately, there is no hard answer we can give you for what is the
best connection mode for any source. There are pros and cons to using
each of them which the customer will need to take into consideration
with respect to their requirements.

**Learn more:**

The following documents are helpful when deciding when to use
each connection mode type:

-   [Connection Modes](https://segment.com/blog/connection-modes/)
-   [Should I collect data on the client or server?(https://segment.com/docs/guides/how-to-guides/collect-on-client-or-server/)]
-   [When to track on the client vs. server](https://segment.com/academy/collecting-data/when-to-track-on-the-client-vs-server/)


## Dev, QA, & Prod Sources

When testing, you should **create and use separate sources in your workspace** (Development, QA.) to prevent testing and development
activities from filling production systems with invalid data.

> error "IMPORTANT NOTE:"
> Make sure you apply the correct Write Key for each environment to ensure that all events are tracked to the correct Segment source.

We recommend that instead of setting up separate workspaces for
different environments (local/dev/prod), you set up one workspace and
make each of these environments a different source.

We bill per workspace, and on our Team or Business plans you can create
as many sources as you need. Each Segment source will have its own Write
Key, so you can easily keep things separate. For each source, you also
get to choose which integrations you want it to send data to.

## Debugging Best Practices

When trying to debug your Segment implementation and how your user data
is reaching both Segment and your enabled Destinations, it can be pretty
confusing and complex to understand where things might be broken and
where you can start troubleshooting to fix the problem.

We recommend validating 4 main components/questions that will simplify
what you should focus on in order to identify the root cause of the
issue. These questions are:

-   Is Data reaching your Debugger?
-   Is ANY data reaching your Destination?
-   Is your Destination set-up correctly?
-   Are you sending events from the client on from the server? In other words, are you using the Cloud Mode connection mode to send events server-side?

### Is Data reaching your debugger?

If data is not even reaching our APIs, then it's definitely not flowing
into your Downstream tool. So, assuming your issues are related to your
events not reaching the debugger, we'll want to validate two things:

-   Is the library installed correctly?
-   Are you using the correct write key?

Let's go over a few exercises to explore both of these questions.

> warning "IMPORTANT:
> The Segment Debugger provides visibility into which events we are receiving but it should never be used as a source of truth when debugging. The Debugger is a SAMPLE of the events that we are receiving in real-time so it's not guaranteed that every event will show up there. The more traffic we see in a source, the less likelihood of you catching specific events.

**How to troubleshoot**

1.  Validate how our analytics.js library is loaded into your site. Use the Network tab and the object in the console.

2.  Are you including an `anonymous_id` or `user_id`? One of these is
    required for every Segment call

3.  Are you seeing any errors from our API? Make sure that you don't
    have a malformed JSON or exceeding the payload size: 32kb per call

4.  Is the call being blocked by Ad Blockers?

### Is *ANY* data reaching your Destination?

All Destinations are different and each of them has different settings
and or requirements in order to receive your data. One of the most
common issues we see is when calls are missing required parameters.
Parameters can be any data point that the downstream tool will require
for their API consumption. Some good examples would be the device\_id or
the advertising\_id that all Mobile attribution tools require. If that
parameter is missing in your calls, then their API will reject whatever
we send them. Another good example is the email trait that some Email
Marketing tools rely on for all the campaigns.

**How to troubleshoot?**

1.  Compare against successful events and ensure the syntax is correct

2.  Does the Destination require any additional properties in the
    integrations object?

3.  Are you using credentials from a Dev environment or a Prod
    environment?

### Is your Destination set up correctly?


There are some tools that have a more complex infrastructure and they
require additional setup in addition to flipping the switch. Many of the
issues that we help our customers solve are usually related to issues
with their setup. This is why you should always rely on our
documentation to understand what is expected from you in order to send
your data the way each tool needs it.

There are also restrictions on what methods and what connection modes
each tool supports. Some can just receive track calls, some just take
identify calls and some take all of our methods. Some are only supported
in device-mode like advertising pixels, some are only supported for mobile
apps in Device Mode like your Mobile Attribution tools and some will
have a more robust integration with our platform and you'll get to
decide where and how you want to send your user data from. But again,
the best way to understand what is supported by each tool is by visiting
the Destination specific documentation.

**How to troubleshoot?**

1.  Is the partner third party script still loading natively even after
    integrating with Segment? Some tools when loaded more than once
    (via Segment and natively) cause unexpected behavior since their
    APIs can be confused about which methods and calls to respond to.

2.  Triple check the credentials you are using on the settings for each
    Destination. Sometimes API keys change in the partner tool and
    they are not updated in Segment.

3.  Some tools rely on an OAuth process to enable the Destination and
    the account associated in Segment is disabled or it doesn't have
    the right permissions.

### Is your implementation server-side (i.e. Cloud Mode)?


Debugging in device-mode vs debugging in cloud-mode can be very different and
there are different tools that you'll need for each of them. For events
that are not reaching your Destination and that are sent server-side or
in cloud-mode, we provide our Event Delivery and Event Tester features
that will enable more visibility on the delivery of your data and a
testing tool that you can use to send events to the API of the
Destinations you have enabled (more on these features below).

#### Device-Mode vs Cloud-mode troubleshooting

When troubleshooting client-side (channel = client), we typically rely
on our customers to create their own testing environment where they can
validate the data flow based on what each Destination supports. We do
offer a few tools that can serve as guidance of potential issues:

1.  **Analytics.js-Integrations Tester:** This is the tool that our
    Destinations engineering team leverages to test any client-side code
    that we are updating or creating in order to understand if the
    data is flowing as expected. You can find the Github repo of this
    tool
    [[here](https://github.com/segmentio/analytics.js-integrations/tree/master/compiler).

2.  **Debugging methods in our libraries**

-   Analytics.js - [analytics.debug()](https://segment.com/docs/sources/website/analytics.js/#debug)

-   iOS SDK - [SEGAnalytics debug:YES](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/#logging)

-   Android SDK - [logLevel(LogLevel.VERBOSE)](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android/#debugging)

3.  **Amazon S3 logs:** We keep a copy of every single event that is
    correctly processed by our API so you can enable an Amazon S3
    Destination in your Sources and get a carbon copy of what we
    received. You can then query with Athena to get more granularity.

4.  **Webhooks:** You can also connect a webhook to each source in order
    to receive every event that we are processing in real-time. This
    option serves a similar purpose to our Debugger but ensures that
    you are seeing every event we receive vs just a specific sample.
    You can use
    [[https://requestbin.com/](https://requestbin.com/).

5.  **Destination device-mode code:** Always look at the source code for
    each Destination when you\'re trying to debug. The docs attempt to
    stay up to date with the code, but that\'s not always the case.
    You can find the source code of all our analytics.js to
    Destination libraries in [[this Github
    repo](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations).

For server-side troubleshooting, we offer two features that should
provide visibility into what is reaching the Destination and a testing
tool to replicate the exact behavior that our pipeline would go through
(including the Request to and the Response from the partner Destination
API).

### Event Delivery Dashboard

Event Delivery enables customers to go beyond our platform-wide [status page](https://status.segment.com/) to view the specific
deliverability rates for your Sources to your Destinations directly in
the Segment app. Event Delivery gives you:

-   Near real-time visibility into Destination errors and their payloads

-   Dynamic tips for resolution based on the error type

-   Transparency into responses from partner APIs

-   Visibility into Segment's event retry-logic

Should Segment encounter any issues when attempting to deliver your data
- whether from a network timeout, a Partner API rejecting the call,
rate limiting, or anything else - we will report them in real-time.
You can also see the latency of your data and specific details for each
error that has occurred.

With Event Delivery, you can see firsthand which errors are occurring,
why they're occurring, and what you can do about it - even if they are
not Segment-related errors. This gives you more visibility into data
deliverability than you'd get within most partner applications.

Event Delivery also highlights Segment's retry logic. Behind the scenes,
Segment retries your events up to 9 times to increase the chances of
your customer data making it to its end Destination. With Segment, more
of your data will be delivered than without because of our retry
algorithm. If your data isn't successfully delivered the first time due
to temporary issues with the data-for instance, you're being rate
limited or the Partner API is down-we will retry it for you up to 9
times to maximize the chances that your data is successfully received.

When we report on Event Delivery, we break out the events that were
successfully delivered on the first attempt versus on a retry, so you
know when your data arrived.

> warning "IMPORTANT"
>Event Delivery only displays data that was sent server-side or in cloud-mode which gets assigned the "server" channel value. Events sent device-mode or with analytics.js will not show up in the Destination Event Delivery feature.**

[Read more about the Event Delivery dashboard](https://segment.com/docs/connections/event-delivery/).

### Using the Event Tester

If you want to prevent errors from happening to begin with, you can use
Segment's Event Tester. With the Event Tester, you can test specific
events and see the realtime request and response from a Destination
partner's API. This will help you identify if your events are missing
certain required properties or if the event is making it through as
expected.

For example, some APIs have particular requirements outlined in our
docs, like the fact that you need to send along an email for email
tools. The Event Tester catches these missing fields on the fly, letting
you know that you need to add these fields to the API call in order for
the Destination to successfully receive it.

<!-- TODO: remove refs to Centrifuge -->
Event Tester actually leverages the same preprocessing pipeline that we
use for real-time events before it is managed by our Destination processing service.
The only differences between how events are delivered in Event Tester vs
our regular pipeline are:

-   No retries
-   No reporting of the event on Event Delivery

Other than that, the events you send via Event Tester will mimic the
exact behavior that you'd expect to see in our regular pipeline.

**IMPORTANT**: If we receive an event from a client-side source that
gets assigned a "client" channel and then you process that event via
Event Tester, we will re-process that event and set the channel to
"server". This may cause unwanted behavior since some Destinations are
supported client-side, server-side or both. And, considering some tools
have different behavior client-side vs server-side, you might be seeing
success or errors that might not apply to the scenario you're trying to
test. You shouldn't use Event Tester for client-side events that are not
to be sent on Cloud Mode since you wouldn't be actually testing how the
regular process would work. Event Tester should only be leveraged for
server-side and/or cloud-mode events that will leverage the server-side
code of our Destinations (when supported).

For all client-side events (channel = client), we use our analytics.js
client-side integrations (that are open source) and for all server-side
or cloud-mode events (channel = server), we will use our server-side
libraries which are not open source. If you are curious on how the code
is set up for a particular server-side Destination library, please reach
out to our Success Engineering team via [[this
form](https://segment.com/help/contact).

[Read more about the Event Tester](https://segment.com/docs/connections/test-connections/).


### Additional troubleshooting tips

1.  Set up
    [notifications](https://app.segment.com/nike/settings/notifications)
    for your Sources and Destinations so you keep up to date with any
    issues and/or changes in the data flow.

2.  Leverage the [[Health tab](https://app.segment.com/nike/integration-health) for a comprehensive report of the issues we are encountering for each Source and Destination

## Further Reading

{% include components/media-icon.html href="https://university.segment.com/debugging-and-troubleshooting" icon="media/icon-academy.svg" title="Segment University: Debugging and Troubleshooting" content="" variant="related" %}

{% include components/media-icon.html href="https://segment.com/blog/we-test-in-production-you-should-too/" icon="media/icon-academy.svg" title="Blog post on how Segment tests Segment" content="" variant="related" %}
