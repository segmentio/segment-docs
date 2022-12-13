---
title: CommandBar Destination
hide-boilerplate: true
hide-dossier: true
private: true
hidden: true
id: 638f843c4520d424f63c9e51
---

[CommandBar](https://www.commandbar.com) gives your users a searchable index of your app's features and content, as well as customizable in-app components, like onboarding nudges. Better understand user intent and deliver step-change improvements in UX, for new and power users alike. By connecting Segment to CommandBar as a destination, you can trigger nudges and customize CommandBar functionality based on user events and user attributes. The integration also allows you to deploy CommandBar to your users.

To configure CommandBar as an Event Source to get data into your warehouse or other downstream tools, see the [CommandBar Source](/docs/connections/sources/catalog/cloud-apps/commandbar/) documentation.

{% include content/ajs-upgrade.md %}


## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure CommandBar**.
4. Sign in to [CommandBar](app.commandbar.com/login), click on your organization name in the top right, and copy the `Org ID` into "Organization ID" field.
5. If you want to deploy CommandBar to your users through Segment, check "Deploy via Segment".
6. Select an existing Source to connect to CommandBar.
7. Once connected, remove the CommandBar snippet or `init` call from your code (if you have one).

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}


