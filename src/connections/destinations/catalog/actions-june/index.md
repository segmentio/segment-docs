---
title: June (Actions) Destination
hide-boilerplate: true
hide-dossier: false
hidden: true
private: true
id: 6419fce5b6e12cf44efbd34c
versions:
  - name: "June (Classic)"
    link: "/docs/connections/destinations/catalog/june"
---

{% include content/plan-grid.md name="actions" %}

[June](https://june.so/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is product analytics for B2B SaaS companies. June auto-generated reports focused on how companies use your product - just connect your Segment account.

June maintains this destination. For any issues with the destination, [contact the June Support team](mailto:ferruccio@june.so).

## Getting started

{% include content/connection-modes.md %}

1. Go to the [June settings page](https://app.june.so/redirect-to-my-workspace/settings), click **Add your first source**. To add more instances of the June Destination, click on the Segment integration card and click on "Create new key" and copy that key.
2. From the Segment web app, navigate to **Connections > Catalog**, and select the **Destinations** tab in the catalog.
3. Find the Destinations Actions item in the left navigation, and click it.
4. Click the "June" item to select it and click **Configure**.
5. Choose which of your sources to connect the destination to. (You can connect more sources to the destination later.)

### Connection Modes for June (Actions) destination

The June (Actions) destination does not offer a device-mode connection mode. If you're using one of Segment's new libraries ([Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/), [Swift](https://github.com/segmentio/analytics-swift) or [Kotlin](https://github.com/segmentio/analytics-kotlin)) with the Actions-framework version of the destination, you do not need the device-mode connection.

{% capture group_identify_user_details %}

In the default configuration, June (Actions) triggers this action when it receives a Group call.

This action sets or updates the properties of specific groups. Use this when you want to update properties on a June company profile.

{% endcapture %}

## Migration from June Classic

{% include content/ajs-upgrade.md %}

Assuming you're already using Segment Cloud-mode, the June (Actions) destination is expected to have no breaking changes when upgrading. With the exception of a few new properties added to your events in the new Actions destination, there should be no difference in the data received in June when using either of the June destinations.

If you want to confirm, you can configure the new destination to point to a different June workspace and connect it to the same source(s) as the Classic destination and manually verify before fully switching over.

> info ""
> Contact June support if you find features missing from the June (Actions) destination that were available in the classic June destination.
