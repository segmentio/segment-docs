---
title: Dynamic Yield By Mastercard Audiences Destination
id: 64ede9fe67158afa8de61480
engage: true
beta: true
---

{% include content/plan-grid.md name=actions %}

[Dynamic Yield by Mastercard](https://www.dynamicyield.com/){:target="_blank”} helps businesses deliver digital customer experiences that are personalized, optimized, and synchronized.
With Dynamic Yield’s Experience OS, you can algorithmically match content, products, and offers to each individual customer to increase revenue, build customer loyalty, and gain a sustainable competitive advantage.

This destination is maintained by Dynamic Yield by Mastercard. For any issues with the destination, [contact the Dynamic Yield support team](mailto:info@dynamicyield.com).

## Getting started

**Dynamic Yield by Mastercard Audiences** is an Audience Destination which must be first connected to an Engage Space before it can be connected to individual Engage Audiences. The steps below outline how to connect the Destination to an Engage Space and then to an Audience.

### Enable IP allowlisting
Dynamic Yield requires that data sent by Segment originate from a fixed IP range. As a prerequisite to using the **Dynamic Yield by Mastercard Audiences** Destination, Segment Business Tier customers must enable the **IP Allowlisting** feature on their workspace. This feature is only available for Segment Business Tier customers. 

To enable IP allowlisting:
1. Navigate to **Settings > Workspace Settings > Destination IP Settings** in your Segment workspace.
2. Click **Enable IP allowlisting** to enable the feature. 

### Create an instance of the Dynamic Yield Destination

1. From your Segment workspace, navigate to **Connections > Catalog**.
2. Use the search field to find the **Dynamic Yield by Mastercard Audiences** Destination, then select it.
3. Click **Add destination**.
4. Select the Engage Space you'd like to connect your destination to and click **Next**. 
5. Enter a name for your destination and click **Create destination**.

### Configuring Basic Settings
1. Provide the Section ID and Connection Key on the Settings tab for your Dynamic Yield by Mastercard destination.
2. Enable the Destination using the toggle, then click the **Save changes** button.


### Create and configure a Mapping
You must first create, configure, and enable a Mapping before connecting your Audiences to the Dynamic Yield by Mastercard destination.

1. Navigate to the Mappings tab in the Dynamic Yield by Mastercard Destination.
2. Click **New Mapping** and select the **Sync Audience Action**.
3. Ensure that the only condition to trigger the mapping is **Event Type is Track** (remove the **Event Type is Identify** condition, if present).
4. Click **Save**.
5. Enable the Mapping from the Mappings tab using the **Status** toggle.

Once these steps have been completed you can connect Audiences to the Destination.

### Connecting Audiences to the Dynamic Yield by Mastercard Destination

1. Navigate to your **Engage Space > Audiences**.
2. Select the Audience you'd like to sync to your Dynamic Yield by Mastercard Audiences destination. 
3. Click **+ Add destination**, select the **Dynamic Yield by Mastercard Audiences** Destination you connected earlier, and click **Add Destination**.
4. On the Audience Settings panel, provide a value for the following fields: 
     - **Audience Name**: The name Segment uses when creating the Audience in Dynamic Yield.
     - **Identifier Type**: Select `userid`, `anonymousid`, or `email`. * See [Customized Identifier Setup](#customized-identifier-setup) for how to configure identifiers other than userid, email or anonymousid.
5. Enable the **Send Track** toggle. You don't need to change the **Enter Event** or **Exit Event** fields, as these are not used by this Destination.
6. Click **Default Setup** panel under **Event settings**.
7. Click **Save** and then click **Add Destination**.

The Destination is now connected to your Audience and starts syncing data to Dynamic Yield.


### Customized Identifier Setup
The Dynamic Yield Audience Destination can accept identifiers other than userId, anonymousId or email. However, this requires some additional configuration steps when connecting the Audience to your Dynamic Yield Audiences Destination.

1. When connecting your Audience to the **Dynamic Yield Audiences** Destination, select the **Customized Setup** panel under **Event Settings**.
2. Click**Add identifier** then select the identifier type you'd like to use.
3. Provide a name for the identifier in the **Identifier in destination** field.
4. Scroll back up to the top of the Audience Settings panel and ensure that the **Identifier Type** field contains the name of the identifier you configured in the Customized Setup panel.
5. Click **Save** and then click **Add Destination** button.

The Destination is now connected to your Audience and starts syncing data to Dynamic Yield with the specified custom identifier.

{% include components/actions-fields.html %}
