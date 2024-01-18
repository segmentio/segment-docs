---
title: Kameleoon (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[Kameleoon](https://www.kameleoon.com/en?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a versatile optimization, experimentation, and personalization platform. It is used to enhance website and mobile app experiences while enabling experimentation.

This destination is maintained by Kameleoon. For any issues with the destination, [contact their Support team](mailto:support@kameleoon.com).

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Kameleoon Segment destination. There's also a page about the [non-Actions Kameleoon destination](/docs/connections/destinations/catalog/kameleoon/). Both of these destinations receives data from Segment.

<!-- > This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

{% include content/ajs-upgrade.md %}

<!-- In the section below, explain the value of this actions-based destination over the classic version, if applicable. If you don't have a classic version of the destination, remove this section. -->

## Benefits of Kameleoon (Actions) vs Kameleoon Classic

Kameleoon (Actions) provides the following benefits over the classic Kameleoon destination:

- **Event Flexibility**. Tailor your events precisely by leveraging Segment's event filters, allowing for more granular control over the data you receive in Kameleoon.
- **Attribute Mapping**. Seamlessly map attributes before forwarding events, ensuring a smooth integration process and accurate representation of your data in Kameleoon.
- **Monitoring Capabilities**. Take advantage of Segment's monitoring tools to keep a vigilant eye on your operations, providing valuable insights and ensuring a seamless data flow into Kameleoon.

## Getting started

1. From the Segment web app, on the navigation menu, click **Connections**, then click **Catalog**.
2. On the **Catalog** page, use the search bar (at the top right corner) and search for "Kameleoon (Actions)". Click on the Destination named "Kameleoon (Actions).
3. Click **Add destination**.
4. Select the Source you want to connect to Kameleoon (Actions) and click **Confirm Source**.
5. On the **Basic Settings** side panel, complete the required fields:
- **Name**: type a name to help you identify this destination in Segment
- **API Key**: paste your Kameleoon API key. To generate an API Key, we recommend reading [the dedicated documentation page](https://help.kameleoon.com/).
- **Sitecode**: paste your Kameleoon project sitecode. You can find it in the [project dashboard](https://help.kameleoon.com/question/how-do-i-find-my-site-id/).
6. Enable the destination by cliking on the **Enable Destination** toggle switch.
7. Click **Save Changes**.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

The integration requires that you use the same system of identifiers for both tools. While Segment uses the userId, Kameleoon uses the kameleoonVisitorCode. In order to identify which visitor triggered the forwarded Segment events, you must include the kameleoonVisitorCode inside your Segment events. To know more, we recommend reading [the dedicated documentation page](https://help.kameleoon.com/).


## Migration from the classic Kameleoon destination

To migrate from the classic Kameleoon destination, you can follow these three steps:
1. **Visitor Identification:**
   - Include the `kameleoonVisitorCode` in your Segment events for accurate visitor tracking. To know more, we recommend reading [the dedicated documentation page](https://help.kameleoon.com/).

2. **Mapping, Filters, and Testing:**
   - Define Mapping and Filters in the destination configuration page.
   - Test events to ensure accurate goal creation and conversion tracking.

3. **Activation:**
   - Activate the Kameleoon (Actions) destination when everything is ready and tested.
   - Deactivate the classic Kameleoon destination.

---
