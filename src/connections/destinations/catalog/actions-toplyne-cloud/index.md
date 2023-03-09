---
# The end name should be similar to `Slack  Destination`
title: Toplyne Cloud Mode (Actions) Destination
beta: true
hide-boilerplate: true
hide-dossier: true
hidden: true
private: true
id: 6408ac6c144a7d5ac55cf414
---

<!-- This template is meant for Actions-based destinations that do not have an existing Classic or non-Actions-based version. For Actions Destinations that are a new version of a classic destination, see the doc-template-update.md template. -->

{% include content/plan-grid.md name="actions" %}

[Toplyne](https://www.toplyne.io/){:target="_blank"} is a headless Sales AI for revenue teams. Toplyne's AI captures and understands every user click passed through Segment and enriches it with demographic data (through 3rd party enrichment tools). Toplyne then delivers opportunities for expansion and conversion into your existing CRM. Toplyne does this without involving your data and engineering teams. Cloudflare, Vercel, and Canva depend on Toplyne to build predictable pipelines and improve conversions and expansions for their sales and account management teams.

<!-- This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

{% include content/ajs-upgrade.md %}

<!-- In the section below, explain the value of this actions-based destination. If you don't have a classic version of the destination, remove this section. -->

## Benefits of Toplyne (Actions)

Toplyne (Actions) provides the following benefits:

- **Reduced time-to-value.** Seamlessly move your data from Segment to Toplyne with the click of a button.
- **Clear mapping of data** Actions-based destinations enable you to define the mapping between the data Segment received from your source and the data Segment sends to Toplyne.
- **Pre-built mapping.** Mappings for Toplyne, are prebuilt with the prescribed parameters and available for customization
- **No 3rd party tool is involved.** Move the data directly from Segment to Toplyne without the requirement of a 3rd party tool to facilitate the data sync.
<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

1. From the Segment web app, navigate to **Connections > Catalog** and select the **Destinations** tab of the catalog.
2. Search for **Toplyne Cloud Mode (Actions)** and select it.
3. Click **Configure Toplyne Cloud Mode (Actions)**.
4. Select an existing Source to connect to Toplyne (Actions).
5. To obtain the API key you have to move to the **Toplyne dashboard**
6. From your Toplyne dashboard, navigate to **Settings** > **API Settings** and click on **+ Generate new token**.
7. Enter a name for your token, and select *Does not expire* under _Expiration_. Then click **Generate new token**
8. Copy the access token that has just been generated. This will be the API key that you will enter in Segment.
9. Save your changes and enable the destination.

   <!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

   {% include components/actions-fields.html %}
   <!--
   Additional ContextInclude additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.
   -->
