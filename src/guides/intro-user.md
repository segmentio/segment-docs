---
title: Segment for data users
---

If you aren't involved in setting up your Segment implementation, or are just starting to set up Destinations for your organization's workspace, this guide is for you.

## What is Segment?

> info ""
> If you read the [detailed explanation of Segment](/docs/guides/) on the previous page, you can skip ahead!

Segment is a system for sending messages from your websites, mobile apps, and servers. These messages contain data about events on, or users of those systems, and these messages can sent on to other tools, and gathered together in a warehouse for later analysis. Segment can also bring in information about your users from external systems, such as helpdesks or CRM systems, and collate that information to help you analyze your data, build audiences of users, and personalize your users' experiences.

Once you (or your organizations' developers) have your Segment Sources set up and sending data, you can log in to the Segment App and set up Destinations, which are how Segment sends that data to other tools (like Google Analytics, Mixpanel, and many others).

## Environments and Labels

Depending on your organization's configuration and access settings, you might be able to see one or multiple Environments (for example, "Production", "Testing", "Development"), or one or multiple [Labels](/docs/segment-app/iam/labels/), which control access to different parts of your organization's Segment system.  If you see several environments, contact your Segment administrator for more details so you can make sure you make your changes in the right place.

## Data inside Segment

Data enters the Segment systems from Sources, but once data is in the system, your organization may have different tools configured to control and change it. This could change what data is available to you, or any destinations you set up.

For example, Protocols makes sure that data coming into Segment follows specific formats and patterns, and might block and discard malformed or unwanted data. The Privacy tool can be configured to remove Personally Identifiable Information (PII) from the data. And several different methods are available to [filter data](/docs/guides/filtering-data/) so that it doesn't send certain types of events, or reach specific destinations or warehouses.

## Set up a Destination

Depending on the access level you have in your organization's Segment workspace, you might be able to create new Destinations, or you might only be able to edit existing ones.

To add a new Destination, you'll usually need some information (such as a token or API key) from the destination tool to start. You'll enter that into the Segment App so we can connect to and send data to that tool. You'll also need to know which Source you'll be sending data from.

To set up a destination:

1. Log in to the Segment App, and click [Add Destination](https://app.segment.com/segment/destinations/catalog) to go to the catalog of available destinations.
2. Search for and select the destination you want to set up.
3. On the description page that appears, click **Configure**.
4. On the next page, select the source that you want the destination to get data from.
   You can only select one source at at time. The list displays only the sources that are compatible with the destination you chose. If you don't see a source that you expect, contact your administrator.
5. Click **Confirm Source**.
6. On the next page, configure your destination by entering the API key, token, and any other information.
   The configuration page shows both required information, and any extra settings.

> success ""
> **Tip**: Segment usually is able to translate data into a format that the destination expects, however some destinations (such as Adobe Analytics) may require manual mapping steps to configure properly. If you see additional fields for mapping configuration, read the documentation for that destination to learn more.

<!--

## Intro to personas

- intro to personas (what is it, what's it do, do you need to mess with it? who do you contact?)
-->

## Troubleshooting

If you're setting up a destination to use [cloud-mode data](/docs/connections/destinations/#connection-modes) (data that's sent through Segment, rather than directly from a user's device), you can use the [Event Tester](/docs/connections/test-connections/) and [Event Delivery](/docs/connections/event-delivery/) tools to check that data is arriving, and being correctly delivered to the destination.

> success ""
> Have suggestions for things to add to this guide? [Drop us a line](mailto:docs-feedback@segment.com?subject=Segment%20Data%20User%20guide%20Suggestion)!
