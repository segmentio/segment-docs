---
title: CommandBar Destination
hide-boilerplate: true
hide-dossier: true
id: 638f843c4520d424f63c9e51
---

[CommandBar](https://www.commandbar.com){:target="_blank"} gives your users a searchable index of your app's features and content, as well as customizable in-app components, like onboarding nudges. This helps you to better understand user intent and deliver step-change improvements in UX, for new and power users alike. By connecting Segment to CommandBar as a destination, you can trigger nudges and customize CommandBar functionality based on user events and user attributes. The integration also allows you to deploy CommandBar to your users.

To configure CommandBar as an Event Source to get data into your warehouse or other downstream tools, see the [CommandBar Source](/docs/connections/sources/catalog/cloud-apps/commandbar/) documentation.

{% include content/ajs-upgrade.md %}


## Getting started

1. From the Segment web app, navigate to **Connections > Catalog**, then select the **Destinations** tab at the top of the catalog.
2. Search for *CommandBar* and select it.
3. Click **Configure CommandBar**.
4. Sign in to [CommandBar](app.commandbar.com/login){:target="_blank"}, click on your organization name in the top right, and copy the `Org ID` into **Organization ID** field.
5. If you want to deploy CommandBar to your users through Segment, check **Deploy via Segment**.
6. Select an existing Source to connect to CommandBar.
7. Once connected, remove the CommandBar snippet or `init` call from your code (if you have one).

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}


