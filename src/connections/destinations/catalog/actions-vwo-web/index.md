---
title: VWO Web Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 637c192eba61b944e08ee158
versions:
  - name: 'VWO Cloud Mode (Actions)'
    link: '/docs/connections/destinations/catalog/actions-vwo-cloud/'
---

{% include content/plan-grid.md name="actions" %}

[VWO](https://vwo.com/){:target="_blank"} is an optimization platform that allows websites to run experiments on their platforms to derive insights from visitor behavior and harness the results to amp up the conversion rate. Apart from experimentation, it also provides for personalization of the platform for different cohorts, full stack implementation, and direct deployment of the changes determined through experimentation.

> info ""
> The events and attributes that are transferred from Segment to your VWO account will appear under [Unregistered Events](https://help.vwo.com/hc/en-us/articles/8676443712537-Working-with-Events-in-VWO#:~:text=UNREGISTERED%20EVENTS%3A%20These%20are%20the,UNREGISTERED%20EVENTS.){:target="_blank"} and [Unregistered Attributes](https://help.vwo.com/hc/en-us/articles/8681465703705-Working-with-Attributes-in-VWO#:~:text=UNREGISTERED%20ATTRIBUTES%3A%20These%20are%20the,UNREGISTERED%20ATTRIBUTES.){:target="_blank"} sections, respectively. You need to save these events and attributes to VWO for further use.

## Benefits of VWO Web Mode(Actions) vs VWO Classic

VWO Web Mode (Actions) provides the following benefits over the classic VWO destination:

- **Support for Customer Data Platform (Data360)**. With the Web mode destination enabled, you will be able to transfer all the events and attributes into your VWO account through the [Data360 module](https://help.vwo.com/hc/en-us/articles/8679651827737-About-VWO-Data360). You can use these events and attributes to [create segments](https://help.vwo.com/hc/en-us/articles/360020418454-Using-Segmentation-in-VWO) and [metrics](https://help.vwo.com/hc/en-us/articles/8675547113625) in your VWO campaigns.

## Getting started

1. From the Segment web app dashboard, navigate to **Connections > Catalog**.
2. Under the **Destinations** tab, search for “VWO Web Mode (Actions)”, and select the destination.
3. Click **Configure VWO Web Mode (Actions)**.
4. Select the source that will send data to VWO Web Mode (Actions), click Next to enter the name of your destination, and click Save.
5. On the **Basic Settings** page that appears, configure the following details in the respective fields:
   - Name of the destination
   - Your VWO Account ID
   - Settings Tolerance
   - Library Tolerance
6. In order for VWO to function properly, it needs jQuery to be loaded on your web page. If jQuery already exists, then turn ON the **Use Existing JQuery** toggle switch. Else, VWO will load a jQuery on your web page. 
7. To customize the mapping of actions, follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings). Mappings in Segment allow you to control the events and attributes that are sent to VWO. 
8. Finally, enable the destination using the **Enable Destination** toggle switch and click **Save Changes**.


{% include components/actions-fields.html %}
