---
title: June (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 6419fce5b6e12cf44efbd34c
versions:
  - name: "June (Classic)"
    link: "/docs/connections/destinations/catalog/june"
---

{% include content/plan-grid.md name="actions" %}

[June](https://june.so/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a product analytics tool for B2B SaaS companies. June auto-generates reports that focus on how companies use your product.

June maintains this destination. For any issues with the destination, [contact the June Support team](mailto:ferruccio@june.so).

## Getting started

{% include content/connection-modes.md %}

1. Go to the [June settings page](https://app.june.so/redirect-to-my-workspace/settings){:target="_blank"} and click **Add your first source**. To add more instances of the June Destination, click on the Segment integration card and click on **Create new key** and copy the key.
2. From the Segment web app, navigate to **Connections > Catalog**, and select the **Destinations** tab in the catalog.
3. Search for *June (Actions)* and select it.
4. Click **Configure June (Actions)**.
5. Select the source you want to connect the destination to.
6. Configure your settings.
7. Click the toggle to enable the destination.

### Connection modes for June (Actions) destination
June (Actions) does not offer a device-mode connection. All events generated in a browser or app are sent to June through Segment's servers.

{% capture group_identify_user_details %}

In the default configuration, June (Actions) triggers this action when it receives a Group call.

This action sets or updates the properties of specific groups. Use this when you want to update properties on a June company profile.

{% endcapture %}


{% include components/actions-fields.html content1=group_identify_user_details section1="group" %}
## Migration from June Classic

{% include content/ajs-upgrade.md %}

If you're already using Segment cloud-mode, you're not expected to have breaking changes when upgrading to the June (Actions) destination. With the exception of a few new properties added to your events in the new Actions destination, there's no difference in the data received in June when using either of the June destinations.

You can configure the new destination to point to a different June workspace and connect it to the same source(s) as the Classic destination and manually verify it before fully switching over.

> info ""
> Contact June support if you find features missing from the June (Actions) destination that were available in the classic June destination.
