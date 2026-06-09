---
title: Wingify Web Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 69a2f1c8e4b7d63901ab5678
---

{% include content/plan-grid.md name="actions" %}

[Wingify](https://wingify.com/){:target="_blank"} is an optimization platform that allows websites to run experiments on their platforms to derive insights from visitor behavior and harness the results to amp up the conversion rate. Apart from experimentation, it also provides for personalization of the platform for different cohorts, full stack implementation, and direct deployment of the changes determined through experimentation.

> info ""
> The events and attributes that are transferred from Segment to your Wingify account will appear under [Unregistered Events](https://help.vwo.com/hc/en-us/articles/8676443712537-Working-with-Events-in-VWO#:~:text=UNREGISTERED%20EVENTS%3A%20These%20are%20the,UNREGISTERED%20EVENTS.){:target="_blank"} and [Unregistered Attributes](https://help.vwo.com/hc/en-us/articles/8681465703705-Working-with-Attributes-in-VWO#:~:text=UNREGISTERED%20ATTRIBUTES%3A%20These%20are%20the,UNREGISTERED%20ATTRIBUTES.){:target="_blank"} sections, respectively. You need to save these events and attributes to Wingify for further use.

## Benefits of Wingify Web Mode(Actions) vs Wingify Classic

Wingify Web Mode (Actions) provides the following benefits over the classic Wingify destination:

- **Support for Customer Data Platform (Data360)**. With the Web mode destination enabled, you will be able to transfer all the events and attributes into your Wingify account through the [Data360 module](https://help.vwo.com/hc/en-us/articles/8679651827737-About-VWO-Data360){:target="_blank"}. You can use these events and attributes to [create segments](https://help.vwo.com/hc/en-us/articles/360020418454-Using-Segmentation-in-VWO){:target="_blank"} and [metrics](https://help.vwo.com/hc/en-us/articles/8675547113625){:target="_blank"} in your Wingify campaigns.

## Getting started

1. From the Segment web app dashboard, navigate to **Connections > Catalog**.
2. Under the **Destinations** tab, search for "Wingify Web Mode (Actions)", and select the destination.
3. Click **Configure Wingify Web Mode (Actions)**.
4. Select the source that will send data to Wingify Web Mode (Actions), click Next to enter the name of your destination, and click Save.
5. On the **Basic Settings** page that appears, configure the following details in the respective fields:
   - Name of the destination
   - Your Wingify Account ID
   - Settings Tolerance
   - Add Asynchronous SmartCode
6. To customize the mapping of actions, follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings). Mappings in Segment allow you to control the events and attributes that are sent to Wingify.
7. Finally, enable the destination using the **Enable Destination** toggle switch and click **Save Changes**.


{% include components/actions-fields.html %}
