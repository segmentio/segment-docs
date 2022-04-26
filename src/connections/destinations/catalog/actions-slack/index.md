---
title: Slack (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 5f7dd8e302173ff732db5cc4
redirect_from:
  - '/connections/destinations/catalog/vendor-slack'
versions:
  - name: Slack (Classic)
    link: /docs/connections/destinations/slack
---
{% include content/plan-grid.md name="actions" %}

[Slack](https://www.slack.com){:target="_blank"} is a team collaboration tool work flows. It's where the people you need, the information you share, and the tools you use come together to get things done.


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

- The classic Slack destination formats messages using the handlebars syntax. Slack (Actions) follows [Slack's  formatting syntax](https://api.slack.com/reference/surfaces/formatting){:target="_blank"}.

{% include components/actions-fields.html %}

## Migration from the classic Slack destination

{% include content/ajs-upgrade.md %}


Follow the table below to map your existing Slack destination configuration to Slack (Actions).

> warning ""
> Slack (Actions) uses [Slack's  formatting syntax](https://api.slack.com/reference/surfaces/formatting){:target="_blank"}. This requires that you manually re-enter any messages from Slack Classic, and pick event data from the event variable picker. The handlebars syntax from Slack Classic is not compatible.

{% include components/actions-map-table.html name="slack" %}