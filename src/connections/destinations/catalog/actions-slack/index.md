---
title: Slack (Actions) Destination
hide-boilerplate: true
hide-dossier: true
hidden: true
---
{% include content/plan-grid.md name="actions" %}

[Slack](https://www.slack.com){:target="_blank"} is a team collaboration tool work flows. It’s where the people you need, the information you share, and the tools you use come together to get things done.

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Slack Segment destination. There's also a page about the [non-Actions Slack destination](/docs/connections/destinations/catalog/slack/). Both of these destinations receives data from Segment. 

## Benefits of Slack (Actions) vs Slack Classic

Slack (Actions) provides the following benefits over the classic Slack destination:

- **Consolidated Message Sending**. Send multiple messages from a single instance of the Slack (Actions) destinations. Use Event Triggers to send a message when your criteria is met.
- **Streamlined Configuration**. Configure connection details on a per-message basis, rather than for the destination as a whole. This enables sending messages to different workspaces or channels from one source.
- **Easier access to data**. The event variables picker shows you all the available data from the event you use to test the Trigger. Variables are clearly labeled to ensure they stand out from other text and markup.


## Getting Started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure Actions Slack**.
4. Select an existing Source to connect to Slack (Actions).
5. Click Customized Setup to start from a blank mapping.

## Important differences from the classic Slack destination

- The classic Slack destination formats messages using the handlebars syntax. Slack (Actions) follows [Slack's  formatting syntax](https://api.slack.com/reference/surfaces/formatting){:target="_blank"}

## Available Slack actions

Combine the supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following Slack-supported actions:
- [Post Message](#post-message)

{% include components/actions-fields.html name="slack" %}