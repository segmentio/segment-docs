---
# The end name should be similar to `Slack  Destination`
title: Avo
beta: true,
hidden: true,
---

[Avo](https://avo.app) destination automatically extracts event schemas from all "track" product events from the connected source and sends it to the Avo Inspector. [Avo Inspector](https://www.avo.app/docs/inspector/start-using-inspector) compares the received events against your Avo tracking plan and surfaces any issues and discrepencies in your event tracking.

<!-- This template is meant for Actions-based destinations that do not have an existing Classic or non-Actions-based version. For Actions Destinations that are a new version of a classic destination, see the doc-template-update.md template. -->

{% include content/plan-grid.md name="actions" %}

<!-- Include a brief description of the destination here, along with a link to your website. -->

<!-- This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting Avo API key

Before connecting the segment source to avo, you will need to aquire an api key for your source.

1. Log in/Signup to Avo
2. From the sidebar, select **Sources**
3. Select your source or Create a new source. (Name it similar to what the source name is inside Segment, for example "Web", "IOS", "Android")
4. Press the **Inspector Setup** tab inside the source
5. Copy the API key

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure avo**.
4. Select an existing Source to connect to **avo** (Actions).

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

<!--
Additional Context

Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.
-->

## Destination Settings

1. Copy the API key from avo into the field `API key` in settings.
2. Select an environment you'd like the data to go to in Avo. It should reflect from what environment the source is coming from. (Production / Development / Staging)
3. **(optional)** write the property field name for exracting appVersion if you have a special appVersion property, by default we extract it from `{segmentEvent.context.app.version}` which will result in `unversioned` if that does not exist.
