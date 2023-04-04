---
title: VWO Cloud Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 63bedc136a8484a53739e013
versions:
  - name: 'VWO Web Mode (Actions)'
    link: '/docs/connections/destinations/catalog/actions-vwo-web/'
---

{% include content/plan-grid.md name="actions" %}

[VWO](https://vwo.com/) is an optimization platform that allows websites to run experiments on their platforms to derive insights from visitor behavior and harness the results to amp up the conversion rate. Apart from experimentation, it also provides for personalization of the platform for different cohorts, full stack implementation, and direct deployment of the changes determined through experimentation.

> info ""
> The events and attributes that are transferred from Segment to your VWO account will appear under [Unregistered Events](https://help.vwo.com/hc/en-us/articles/8676443712537-Working-with-Events-in-VWO#:~:text=UNREGISTERED%20EVENTS%3A%20These%20are%20the,UNREGISTERED%20EVENTS.){:target="_blank"} and [Unregistered Attributes](https://help.vwo.com/hc/en-us/articles/8681465703705-Working-with-Attributes-in-VWO#:~:text=UNREGISTERED%20ATTRIBUTES%3A%20These%20are%20the,UNREGISTERED%20ATTRIBUTES.){:target="_blank"} sections, respectively. You need to save these events and attributes to VWO for further use.

## Benefits of VWO Cloud Mode(Actions) vs VWO Classic

VWO Cloud Mode (Actions) provides the following benefits over the classic VWO destination:

- **Support for Customer Data Platform (Data360)**. With the cloud mode enabled, you will be able to transfer all the events and attributes into your VWO account through the [Data360 module](https://help.vwo.com/hc/en-us/articles/8679651827737-About-VWO-Data360){:target="_blank"}.
- **Support for FullStack**. While the classic destination was serving only websites, the cloud mode can provide for server sources, as well.

## Getting started

1. From the Segment web app dashboard, navigate to **Connections > Catalog**.
2. Under the **Destinations** tab, search for “VWO Cloud Mode (Actions)”, and select the destination.
3. Click **Configure VWO Cloud Mode (Actions)**.
4. Select the source that will send data to VWO Cloud Mode (Actions), click **Next** to enter the name of your destination, and click Save.
5. On the **Settings** tab, under **Other Settings**, click on **Account ID**, enter your VWO account ID, and click **Save**. 
6. To customize the mapping of actions, follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings). Mappings in Segment allow you to control the events and attributes that are sent to VWO. 
7. Enable the destination using the toggle switch.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}
