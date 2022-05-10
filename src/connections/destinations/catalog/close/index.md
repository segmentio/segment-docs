---
title: 'Close Destination'
id: 61f8296b7d15c30a3bbe2b76
beta: true
hide-boilerplate: true
hide-dossier: true
redirect_from:
  - '/connections/destinations/catalog/actions-close'
---

<!-- This template is meant for Actions-based destinations that do not have an existing Classic or non-Actions-based version. For Actions Destinations that are a new version of a classic destination, see the doc-template-update.md template. -->

{% include content/plan-grid.md name="actions" %}

<!-- Include a brief description of the destination here, along with a link to your website. -->
[Close](https://close.com/){:target="_blank"} is the inside sales CRM of choice for startups and small and midsize businesses (SMBs.)


<!-- This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

{% include content/ajs-upgrade.md %}

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

1. Go to your Close app and select the Organization you want to use.
2. Click **Settings** in the bottom left, then click **API Keys** in the left menu. Create a new API Key.
3. From the Segment web app, click **Catalog**, then click **Destinations**.
4. Find the Destinations Actions item in the left navigation, and click it.
5. Click the “Close” item to select it and click Configure.
6. Choose which of your sources to connect the destination to. (You can connect more sources to the destination later.)

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

<!--
Additional Context

Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.
-->
