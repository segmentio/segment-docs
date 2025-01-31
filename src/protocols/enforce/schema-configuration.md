---
title: Customize your schema controls
redirect_from: '/protocols/enforce/'
plan: protocols
---

The Schema Configuration settings for each source can be used to selectively block events, or omit properties and traits from `.track()`, `.identify()` and `.group()` calls. Segment can permanently drop events that are not included in your Tracking Plan, depending on the settings you select. Segment can also block events with invalid properties or invalid property values.

> warning "Blocked events not forwarded to a Source are discarded"
> Blocking is a serious step that you should only do after you have resolved any violations that appear when you first connect a Tracking Plan to a Source. Any blocked events that are not [forwarded to a separate Source](/docs/protocols/enforce/forward-blocked-events) are permanently discarded and cannot be recovered.

To enable blocking, go to the **Settings** tab for your source and click on **Schema Configuration**. See below for detailed descriptions for each of the configuration settings.

![A screenshot showing the Unplanned Events, Properties and Values table on the Schema Configuration settings page.](../images/event_blocking.png)

> success ""
> You can [export your Source Schema](/docs/connections/destination-data-control/#export-your-source-schema) as a CSV file to quickly audit events from your Tracking Plan.

> warning "Archived events"
> If you archive events while your source is connected to a Tracking Plan, and then later disconnect your Tracking Plan from that source, any archived events will remain archived, but will be allowed if the Schema Configuration was previously set to block unplanned events when your Tracking Plan was connected to the source.
>
> To view all archived events, go to your **Source Schema** page, click **Filter** next to the search bar, and select **Archived**. To unarchive events that have been archived, click **Unarchive** in the event column. 

## Order of Priority in Blocking Options

When setting up Schema Configuration, note that Segment prioritizes blocking controls in the following order:

1. **Standard Schema Controls**: Segment first evaluates incoming events against these controls and your Tracking Plan. Events, properties, or traits not blocked or omitted in this phase then flow to the next level of controls: the Advanced Blocking Controls/Common JSON Schema. 
![A screenshot of the Uplanned Events, Properties and Values table, which contains unplanned events, unplanned properties/traits, and JSON schema violation columns.](../images/standard-schema-controls.png)

2. **Advanced Blocking Controls/Common JSON Schema:** These controls act as a secondary layer, evaluating incoming events against the Common JSON schema included in your Tracking Plan.
![A screenshot of the Advanced Blocking Controls table, which contains two columns: call type and common JSON schema violations.](../images/advanced-blocking-controls.png)

> info "Using only the Common JSON Schema to block events"
> If your Tracking Plan only has Common JSON Schema rules, you only need to use the Advanced Blocking Controls for your source. 
>
> If you use the Standard Schema Controls and omit properties or traits that do not exist, the Tracking Plan might not generate violations for the Common JSON Schema, as the entire Tracking Plan has nothing and everything is considered to be "unplanned". 

## Track Calls - Unplanned Events
When you set this dropdown to Block Event, Segment drops any events that are not defined in your Tracking Plan. Only allowlisted `track` calls in your Tracking Plan flow through Segment to your Destinations.

For example, if you include a `Subscription Cancelled` event in your Tracking Plan, the example track call below would be blocked by Protocols because the event name does not match the event name casing in your Tracking Plan.

```js
    analytics.track('subscription_cancelled')
```

**IMPORTANT: Unplanned event blocking is supported across all device-mode and cloud-mode Destinations.**

## Track Calls - Unplanned Properties

Setting this dropdown to Omit Properties will ensure that properties not defined in your Tracking Plan are removed from the relevant event.

For example, if you include a single `subscription_id` property in the `Subscription Cancelled` event in your tracking plan, the example track call below would have the `subscription_name` property omitted by Protocols.

```js
    analytics.track('Subscription Cancelled', {subscription_id: '23r90jfs9ej', subscription_name: 'premium'})
```

**IMPORTANT: Unplanned property omission is ONLY supported in cloud-mode Destinations. Unplanned properties will not be omitted when sending to device-mode Destinations.**

## Block Track Calls - Common JSON Schema Violations

> warning "JSON schema violation event blocking only supports cloud-mode destinations"
> Events with invalid properties are not blocked from device-mode destinations.

To block all Track calls that generate a common JSON schema violation:
1. In your Segment workspace, go to **Schema Configuration**, then click **Advanced Blocking Controls** and select **Block Event** from the dropdown. 
2. [Edit the underlying JSON schema](/docs/protocols/tracking-plan/create/#edit-underlying-json-schema) and add a rule to the Common JSON Schema definition that you know won't exist in your Track event.
3. Trigger a Track event. Any Track event that generates a common JSON schema violation will be blocked.
 
Setting the dropdown to **Block Event** ensures that all Track events with JSON schema violations (for example, missing required properties, incorrect property value data types, or invalid regex patterns) are blocked. A less aggressive option is to select **Omit** from the dropdown which removes the offending property from the events.

This is an advanced feature that requires extensive testing and a squeaky clean data set/Tracking Plan to enable. To get a sense of which events will be blocked, or properties omitted, go to the Violations view for a source and note all events with a violation. For example, if you added a `subscription_id` required property to your `Subscription Cancelled` event in your Tracking Plan, the below track call would be either blocked by Protocols, or the property would be omitted, depending on your settings.

```js
    analytics.track('Subscription Cancelled', {customer_type: 'enterprise'})
```

**IMPORTANT: JSON schema violation event blocking is ONLY supported in cloud-mode Destinations. Events with invalid properties will not be blocked from sending to device-mode Destinations.**

## Identify Calls - Unplanned Traits
Setting this dropdown to Omit Traits will ensure that traits not defined in your Tracking Plan are removed from the identify call. For example, if you specify three traits in your Tracking Plan (`name`, `email`, `join_date`), the below identify call would have the `first_name` property omitted by Protocols.

```js
    analytics.identify('fe923fjid', {email: 'roger@example.com', first_name: 'Roger'})
```

**IMPORTANT: Unplanned identify trait blocking is ONLY supported in cloud-mode Destinations. Events with invalid traits will not be blocked from sending to device-mode Destinations.**

## Block Identify Calls - Common JSON Schema Violations

> warning "JSON schema violation event blocking only supports cloud-mode destinations"
> Events with invalid properties are not blocked from device-mode destinations.

To block all Identify calls that generate a common JSON schema violation:
1. In your Segment workspace, go to **Schema Configuration**, then click **Advanced Blocking Controls** and select **Block Event** from the dropdown. 
2. [Edit the underlying JSON schema](/docs/protocols/tracking-plan/create/#edit-underlying-json-schema) and add a rule to the Common JSON Schema definition that you know won't exist in your Identify event.
3. Trigger an Identify event. Any Identify event that generates a common JSON schema violation will be blocked. 
Setting the dropdown to **Block Event** will ensure that all Identify events with JSON schema violations (for example, missing required traits, incorrect property value data types, or invalid regex patterns) will be blocked. A less aggressive option is to select **Omit** from the dropdown which will simply remove the offending property from the event.
