---
title: Dynamic Yield By Mastercard Audiences Destination
beta: true
---

{% include content/plan-grid.md name=**actions** %}

[Dynamic Yield by Mastercard](https://www.dynamicyield.com/){:target=**_blank”} helps businesses deliver digital customer experiences that are personalized, optimized, and synchronized.
With Dynamic Yield’s Experience OS, you can algorithmically match content, products, and offers to each individual customer to increase revenue, build customer loyalty, and gain a sustainable competitive advantage.

This destination is maintained by Dynamic Yield by Mastercard. For any issues with the destination, [contact their Support team](mailto:info@dynamicyield.com).

## Getting started

**Dynamic Yield by Mastercard Audiences** is an Audience Destination which must be first connected to an Engage Space before it can be connected to individual Engage Audiences. The steps below outline how to connect the Destination to an Engage Space and then to an Audience.

### Creating an instance of the Dynamic Yield Destination, and connecting it to an Engage Space.

1. In your Segment Workspace, navigate to Connections > Catalog
2. Use the search field to find the **Dynamic Yield by Mastercard Audiences** Destination, then select it.
3. Click the **Add Destination** button
4. Select the Engage Space to connect to, then click the **Next button**. Note that you must select an Engage Space and not a regular Connections Space.
5. Provide a name for the Destination then click **Create destination**.

### Configuring Basic Settings
1. Provide the Section ID and Connection Key on the Settings tab for your Dynamic Yield by Mastercard destination.
2. Enable the Destination using the toggle, then click the **Save changes** button.


### Create and configure a Mapping
Before connecting your Audiences to the Destination you will need to create, configure and enable a Mapping.

1. Navigate to the Mappings tab in the Dynamic Yield by Mastercard Destination.
2. Click the **New Mapping** button and select the **Sync Audience **Action**.
3. Ensure that the only condition to trigger the mapping is **Event Type is track** (remove the **Event Type is identify** condition if it is present).
4. Click the Save button to save the Mapping configuration.
5. You can then enable the Mapping from the Mappings tab using the **Status** toggle.

Once these steps have been completed you can connect Audiences to the Destination.

### Connecting Audiences to the Dynamic Yield by Mastercard Destination

1. Navigate to your Engage Space > Audiences.
2. Select the Audience you'd like to sync to Dynamic Yield
3. Click the **+ Add destination** button, then select the **Dynamic Yield by Mastercard Audiences** Destination you connected earlier. Click Add Destination.
4. The Audience Settings panel will display for your Destination.
5. Provide a value for the **Audience Name** field. This name will be used by Segment when creating the Audience in Dynamic Yield.
6. Provide a value for the **Identifier Type** field. Valid entries are any one of **userid** or **anonymousid** or **email**. * See **Customized Identifier Setup** below for how to configure identifiers other than userid, email or anonymousid.
6. Enable the **Send Track** toggle. You don't need to change the **Enter Event** or **Exit Event** fields as these are not used by this Destination.
7. Click the **Default Setup** panel under **Event settings**.
8. Click the Save button to save the Audience Settings.
9. Click the **Add Destination** button.
10. The Destination will now be connected to the Audience and will start syncing data to Dynamic Yield.


### Customized Identifier Setup
The Dynamic Yield Audience Destination can accept identifiers other than userId, anonymousId or email - however this requires some additional configuration steps when connecting the Audience to your **Dynamic Yield Audiences** Destination.

1. When connecting your Audience to the **Dynamic Yield Audiences** Destination, select the **Customized Setup** panel under **Event Settings**.
2. Click the **Add identifier** button, then select the identifier type you'd like to use.
3. Provide a name for the identifier in the **identifier in destination** field.
4. Scroll back up to the top of the Audience Settings panel and ensure that the **Identifier Type** field contains the identical name for the identifier you configured in the Customized Setup panel.
6. Click the Save button to save your Audience Settings.
6. Click the **Add Destination** button.
7. The Destination will now be connected to the Audience and will start syncing data to Dynamic Yield using the specified custom identifier.

{% include components/actions-fields.html %}
