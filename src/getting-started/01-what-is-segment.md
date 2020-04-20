---
title: What is Segment?
---

<!-- video here. owned by...?-->

<iframe width="560" height="315" src="https://www.youtube.com/embed/T01YklpEqiM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

With Segment, you can collect, transform, send, and archive your [first-party customer data](https://segment.com/books/customer-data/first-party-data/). We simplify the process of collecting data and hooking up new tools, allowing you to spend more time using your data, and less time trying to collect it. You can use Segment to track events that happen when a user interacts with the your interfaces. "Interfaces" is our generic word for any digital properties you own: your website, mobile apps, and processes that run on a server or OTT device.

When interaction data is captured in Segment, you can send it (often in real-time) to a wide variety of tools in the analytics, data warehousing, and marketing spaces, usually without having to add new tracking code to production applications.


<!-- TODO: better "subway map" image here.-->

## The Segment Platform

The two most basic parts of the Segment platform are the [Segment Spec methods](/docs/connections/spec/), which are how you collect interaction data from your interfaces, and the [Segment Sources](/docs/connections/sources/), which you package with your interfaces to collect and route that data.

Once you've collected your interaction data, there are several different things you can do with it:
- Send it to [Destinations](/docs/connections/destinations/), which receive the data from any number of sources in real time
- Send it to [Warehouses](/docs/connections/warehouses/) (and other bulk storage tools), which hold your raw event schemas and update on regular intervals

You can also enrich the customer data you collect by [connecting data from your other tools](/docs/connections/sources/catalog/#cloud-sources), and then collect it in a warehouse it to monitor performance, inform decision-making processes, and create uniquely customized user experiences. You can also use [Personas](/docs/personas/), our identity resolution tool, to unify data from individual users to gain a wholistic understanding of their actions.

## Workspaces

Your Segment Workspace is where you set up and manage sources and destinations, manage the schema of the data your interfaces send, and test and monitor that data for errors. A Workspace is a collection of Segment sources, destinations, and their configurations, that are administered and billed together. Each Workspace has a specific list of Segment users to which it has granted access, and it may also have several "environments" for production, development and testing use.

When you first log in to your Segment account, you can create a new workspace, or choose to log into an existing workspace if your account is part of an existing organization.


## Where data comes from

You can quickly implement Segment’s tracking libraries across several different platforms.

- [Analytics.js, the Segment Javascript source](/docs/connections/sources/catalog/libraries/website/javascript/), is the most powerful way to track customer data from a website. We recommend it as the default installation for any website.
- [The Segment Mobile SDKs](/docs/connections/sources/catalog/#mobile) are the best way to simplify tracking in your iOS, Android, and Xamarin apps. We recommend them over server-side sources as the default installation for any mobile app.
- [Server-side sources](/docs/connections/sources/catalog/#server) let you send analytics data directly from your servers when client-side tracking won't work, or when you're sending mission-critical data like revenues.

We also offer source libraries to cover exceptional cases:

- Use the [HTTP Tracking API](/docs/connections/sources/catalog/libraries/server/http-api/) if Segment doesn't offer a library for your specific environment yet.
- The [Pixel Tracking API](/docs/connections/sources/catalog/libraries/server/pixel-tracking-api/) lets you track events from environments where you can’t execute code - for example, tracking when an email has been opened.
- The [Querystring API](/docs/connections/sources/catalog/libraries/website/javascript/#querystring-api) lets you use querystrings to load API methods when a user first visits a Segment-enabled site. Use this API for tracking events like email clicks, and identifying users associated with those clicks on the destination page.

Segment also offers [Cloud App Sources](/docs/connections/sources/about-cloud-sources/) to integrate data from your third-party tools:

- [Object Cloud Sources]() can import third party tool data directly into your Segment warehouse, but cannot stream that data into your other Segment destinations. Make sure you have a Segment warehouse enabled before you enable an object cloud source.
- [Event Cloud Sources]() don’t just import third party tool data into your Segment warehouse, they also send event data in real time to your other  Segment destinations.  You’re not required to setup a data warehouse to receive your Event Cloud Source data.

## What you can track


## Where you can send data





<div class="double">
  {% include components/media-icon.html  href="/getting-started/" icon="media/icon-left.svg" title="Back to the index" content="back to the index" variant="related" %}

  {% include components/media-icon.html  href="/getting-started/02-simple-install/" icon="media/icon-right.svg" title="Next doc" content="In the next step..." variant="related" %}
</div>
