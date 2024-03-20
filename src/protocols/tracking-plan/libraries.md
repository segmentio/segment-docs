---
title: Tracking Plan Libraries
plan: protocols
---

Tracking Plan Libraries make it easy to scale Tracking Plan creation within your workspace. You can create libraries for track events or track event properties. Editing Tracking Plan Libraries is identical to [editing Tracking Plans](/docs/protocols/tracking-plan/create/).

> note ""
> **Note**: Segment does support advanced JSON schema implementations and identify/group trait libraries.

Once created, you can import event or property Libraries into a Tracking Plan using a simple wizard flow.

## Create a Tracking Plan Library

To create a new Library:
1. In the left navigation, click **Protocols**
2. Click **Libraries** in the top navigation bar
3. Click **New Library** and follow the steps to create an event or property library

![Screenshot of the Ecommerce Properties Library.](../images/property_library_example.png)

### Tracking Plan Event Libraries

Tracking Plan Event Libraries support Track events and associated properties. Event Libraries are helpful when you want to track a group of events consistently across tracking plans. For example, if you are an eCommerce company with more than one application, you may need to track [eCommerce Spec](/docs/connections/spec/ecommerce/v2/) events consistently across those sources. Instead of needing to re-create the eCommerce spec across all tracking plans, create a library and import the events to each Tracking Plan.

### Tracking Plan Property Libraries

Tracking Plan property Libraries support Track event property groups. Property Libraries are helpful when you have more than one event in a Tracking Plan that share a common set of properties. For example, if you want to consistently include `order_id`, `currency`, `cart_id` and a `products` array of objects in your checkout flow events, you can create a Library with these properties including descriptions, data types and conditional filters.

### Import Libraries into a Tracking Plan

You can import event and property libraries into a Tracking Plan. Enter the Draft mode for a Tracking Plan and click the **Import from Event or Property Library** dropdown. A wizard will appear allowing you to either add the events to a tracking plan, or add properties to selected events already in the tracking plan. After adding your events or properties, remember to merge your changes!

![Animation of a user importing events into their Tracking Plan using a Tracking Plan library.](../images/import_library_to_tracking_plan.gif)

### Library syncing


When you import events or properties from a Library, you can enable syncing to ensure that changes made to the Library pass down to all synced Tracking plans. Syncing is important when you want to make sure all Tracking Plans define events and properties consistently. For example, it's best practice to create separate tracking plans for mobile and web sources as these two sources share some but not all events or properties. Library syncing is the best way to ensure that the shared events are consistently tracked across Tracking Plans, even as you make changes to the Library.

To enable syncing, select the desired Library from the Tracking Plan import flow, and toggle the syncing option. This selects all events or properties in the Library for import. Partial syncs are not supported.

Syncing a Library makes events and properties un-editable, and bypasses the Tracking Plan merge step. You can add properties to synced events, but cannot remove those synced events unless you also remove the Library sync. To unsync a library, click **View Synced Libraries** from the Tracking Plan and click the overflow menu to unsync the Library.

> warning ""
> All changes made to a synced library pass through to the Tracking Plans and may impact data deliverability

![Screenshot of the Synced Libraries page, with the overflow menu selected and the Unsync from Tracking setting visible.](../images/unsync_library.png)

