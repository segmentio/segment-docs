---
title: LiveLike Cloud Mode (Actions) Destination
id: 63e42b47479274407b671071
hide-boilerplate: true
hide-dossier: false
private: true
hidden: true
---

{% include content/plan-grid.md name="actions" %}

[LiveLike](https://livelike.com/) is a technology company dedicated to empowering digital experiences that enable deeper fan engagement, increased retention rates, and new monetization opportunities.

> info ""
> The events transferred from Segment to your LiveLike application will appear under the [Actions](https://docs.livelike.com/docs/reward-actions){:target="_blank"} section.

## Getting started

1. From the Segment web app dashboard, navigate to Connections > Catalog.
2. Under the Destinations tab, search for “LiveLike Cloud Mode (Actions)”, and select the destination.
3. Click Configure “LiveLike Cloud Mode (Actions).
4. Select the source that will send data to “LiveLike Cloud Mode (Actions), click **Next** to enter the name of your destination, and click Save.
5. On the **Settings** tab, under **Basic Settings**, add the following Connection Settings:
   - [**Producer Token**](https://docs.livelike.com/docs/retrieving-important-keys#retrieving-api-access-token){:target="_blank"}: Created in the LiveLike Producer Suite.
   - [**Client ID**](https://docs.livelike.com/docs/retrieving-important-keys#retrieving-client-id){:target="_blank"}: The app identifier used to reference specific Application in requests made to the LiveLike API.
6. To customize the actions mapping, follow the Destinations Actions documentation steps on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings). Mappings in Segment allow you to control the events that are sent to LiveLike. 
7. Enable the destination using the toggle switch.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}
