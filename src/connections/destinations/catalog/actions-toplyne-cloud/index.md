---
title: Toplyne Cloud Mode (Actions) Destination
beta: true
hide-boilerplate: true
hide-dossier: true
id: 6408ac6c144a7d5ac55cf414
---

{% include content/plan-grid.md name="actions" %}

[Toplyne](https://www.toplyne.io/){:target="_blank"} is a headless Sales AI for revenue teams. Toplyne's AI captures and understands every user click passed through Segment and enriches it with demographic data (through 3rd party enrichment tools). Toplyne then delivers opportunities for expansion and conversion into your existing CRM. Toplyne does this without involving your data and engineering teams. Cloudflare, Vercel, and Canva depend on Toplyne to build predictable pipelines and improve conversions and expansions for their sales and account management teams.


{% include content/ajs-upgrade.md %}

## Benefits of Toplyne (Actions)

Toplyne (Actions) provides the following benefits:

- **Reduced time-to-value.** Seamlessly move your data from Segment to Toplyne with the click of a button.
- **Clear mapping of data** Actions-based destinations enable you to define the mapping between the data Segment received from your source and the data Segment sends to Toplyne.
- **Pre-built mapping.** Mappings for Toplyne, are prebuilt with the prescribed parameters and available for customization
- **No 3rd party tool is involved.** Move the data directly from Segment to Toplyne without the requirement of a 3rd party tool to facilitate the data sync.


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



{% include components/actions-fields.html %}
