---
title: Kameleoon (Actions) Destination
private: true
beta: true
id: 652ea51a327a62b351aa12c0
---

{% include content/plan-grid.md name="actions" %}

[Kameleoon](https://www.kameleoon.com/en?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a versatile optimization, experimentation, and personalization platform. It is used to enhance website and mobile app experiences while enabling experimentation.

This destination is maintained by Kameleoon. For any issues with the destination, [contact the Kameleoon Support team](mailto:support@kameleoon.com).

> success ""
> This page is about the [Actions-framework](/docs/connections/destinations/actions/) Kameleoon Segment destination. There's also a page about the [non-Actions Kameleoon destination](/docs/connections/destinations/catalog/kameleoon/). Both of these destinations receive data from Segment.


## Benefits of Kameleoon (Actions) vs Kameleoon Classic

Kameleoon (Actions) provides the following benefits over the classic Kameleoon destination:

- **Event Flexibility**. Tailor your events precisely by leveraging Segment's event filters, allowing for more granular control over the data you receive in Kameleoon.
- **Attribute Mapping**. Seamlessly map attributes before forwarding events, ensuring a smooth integration process and accurate representation of your data in Kameleoon.
- **Monitoring Capabilities**. Take advantage of Segment's monitoring tools to keep a vigilant eye on your operations, providing valuable insights and ensuring a seamless data flow into Kameleoon.

## Getting started

1. Navigate to **Connections > Catalog** in the Segment web app.
2. Search for *Kameleoon (Actions)* and select the destination.
3. Click **Add destination**.
4. Select the Source you want to connect to Kameleoon (Actions) and click **Confirm Source**.
5. On the **Basic Settings** side panel, complete the required fields:
     - **Name**: Enter a name to help you identify this destination in Segment
     - **API Key**: Paste your Kameleoon API key. To generate an API Key, see [Kameleoon's documentation on generating an API key](https://help.kameleoon.com/setting-up-segment-destination-actions/#Kameleoon_setup){:target="_blank”}.
     - **Sitecode**: Paste your Kameleoon project sitecode. You can find it in the [project dashboard](https://help.kameleoon.com/question/how-do-i-find-my-site-id/){:target="_blank”}.
6. Enable the destination by clicking the **Enable Destination** toggle switch.
7. Click **Save Changes**.


{% include components/actions-fields.html %}


The integration requires that you use the same system of identifiers for both tools. While Segment uses the userId, Kameleoon uses the kameleoonVisitorCode. In order to identify which visitor triggered the forwarded Segment events, you must include the kameleoonVisitorCode inside your Segment events. To know more, see [Kameleoon's documentation on matching a Segment user with a Kameleoon visitor](https://help.kameleoon.com/setting-up-segment-destination-actions/#Matching_an_Segmentio_user_with_a_Kameleoon_visitor){:target="_blank”}.


## Migration from the classic Kameleoon destination

To migrate from the classic Kameleoon destination:
1. Include the `kameleoonVisitorCode` in your Segment events for accurate visitor tracking. To know more, see [Kameleoon's documentation on matching a Segment user with a Kameleoon visitor](https://help.kameleoon.com/setting-up-segment-destination-actions/#Matching_an_Segmentio_user_with_a_Kameleoon_visitor){:target="_blank”}.
2. Define mapping and filters on the destination configuration page.
3. Test events to ensure accurate goal creation and conversion tracking.
4. Activate the Kameleoon (Actions) destination when everything is ready and tested.
5. Deactivate the classic Kameleoon destination.

