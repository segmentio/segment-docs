---
title: Destination Actions
hidden: true
---
{% include content/plan-grid.md name="actions" %}


> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available

In the simplest form of the core Segment product, [Connections](/docs/connections/), you send data from Segment [Sources](/docs/connections/sources/), and this data is translated by the Segment servers into a format that [Destination](/docs/connections/destinations/) tools can understand. The Segment servers map data from the different [event types](/docs/connections/spec/) to transform it into a format that the destination expects, using a pre-defined set of rules. For most Segment deployments, this works great! However, if you have a complex deployment, or a lot of data coming to your destinations, you might want more control. When you use these standard Destinations, you cannot change these mappings, and it might not always be clear which parts of a Segment event end up in a specific part of the destination format.

Now, Destinations Actions allows you to see exactly how Segment sends event data to a destination, and change the data mapping to suit the needs of your organization. This means you can now explicitly see how Segment data becomes the destination data, without any guesswork or experimentation. Actions destinations are triggered by data coming through your Segment source, just as in a standard Segment destination, but now you can edit the mappings, create more than one mapping to fit different conditions, and describe specific conditions that trigger a mapping.

Each Actions-framework Destination you see in the Segment catalog represents a feature or capability of the destination which can consume data from your Segment source. The Action clearly lists which data from the events it requires, and which data is optional. For example, Amplitude requires that you always send a  `LogEvent` , or Slack always requires a `PostMessage`.  Each Action also includes a default mapping which you can modify.



## Destination Actions compatibility

<!-- TODO Uncomment when in GA
- Destination Actions are available to all customers on all Segment plans.-->
- Destination Actions do not require that you disable or change existing destinations. However, to prevent data duplication in the destination tool, you should make sure you aren’t sending the data through both a standard destination and the Actions destination at the same time.
- You can still use the [Event Tester](/docs/connections/test-connections) with Destination Actions, and event delivery metrics are still collected and available in the destination information pages.
- If you are using Protocols, Destination Actions actions are applied *after* [schema filters](/docs/protocols/enforce/schema-configuration/) and [transformations](/docs/protocols/transform/). If you are using [destination filters](/docs/connections/destinations/destination-filters/), Actions are applied after the filters - meaning that they are not applied to data that is filtered out.
- Destination Actions can not yet be accessed or modified using the Segment APIs.



## Set up a destination action

To set up a new Actions-framework destination for the first time:

1. Log in to the Workspace where you want to add the new destination, go to the Catalog page, and click the Destinations tab. (You can also get to this screen by clicking **Add Destination**  either from an existing Source, or from your list of existing destinations.)
2. Click the **Destination Actions** category in the left navigation, then click the destination you want to add.
3. From the preview screen that appears, click **Configure**.
4. If prompted, select the source you want to connect to the new destination.
5. Enter your credentials. This could be an API Key and secret key, or similar information that allows the destination to connect to your account.
6. Next, choose how you want to set up the destination, and click **Configure Actions**.
    You can choose **Quick Setup** to use the default mappings, or choose **Customized Setup** (if available) to create new mappings and conditions from a blank state. You can always edit these mappings later.
7. Once you’re satisfied with your mappings, click **Create Destination**.


## Edit a destination action
You can add or remove, disable and re-enable, and rename individual actions from the Actions tab on the destination's information page in the Segment app. Click an individual action to edit it.

From the edit screen you can change the action’s name, subscription criteria, and mapping, and toggle it on or off. See [Customizing mappings](#customizing-mappings) for more information.

![](/docs/connections/destinations/catalog/actions-amplitude/images/amplitude-actions-tab.png)

## Disable a destination action
If you find that you need to stop an action from running, but don’t want to delete it completely, you can click the action to select it, then click the toggle next to the action’s name to disable it. This takes effect within minutes, and disables the action until you reenable it.

## Delete a destination action
To delete a destination action: click the action to select it, and click **Delete** (the trash can icon).

This takes effect within minutes, and removes the action completely. Any data that would have gone to the destination is not delivered. Once deleted, the saved action cannot be restored.


## Customizing mappings

If you are using the default mappings for a destination action, you do not *need* to customize the mapping template for the action. However, you can always edit the fields later if you find that the defaults no longer meet your needs.

To create a custom destination action, start from the Actions tab.
If necessary, click **Add subscription** to create a new, blank action.

1. In the edit panel, define the [conditions](#conditions) under which the action should run.
2. Test those conditions to make sure that they correctly match an expected event.
    This step looks for events that match the criteria in the [debugger queue](/docs/connections/sources/debugger/), so you might need to trigger some events with the expected criteria to test your conditions. You can skip the test step if needed, and re-try it at any time.
3. Next, set up the data mapping from the Segment format to the destination tool format.
4. Test the mapping with data from a sample event.
    The edit panel shows you the mapping output in the format for the destination tool. You can change your mapping as needed and re-test.
5. When you’re satisfied with the mapping, click **Save**.


> info ""
> The required fields for a destination mapping appear automatically. Click the + sign to see optional fields.

### Conditions
The following type filters and operators are available to help you build conditions:

- **Event type** (`is`/`is not`). This allows you to filter by the [event types in the Segment Spec](https://segment.com/docs/connections/spec).
- **Event name** (`is`, `is not`, `contains`, `does not contain`, `starts with`, `ends with`). Use these filters to find events that match a specific name, regardless of the event type.
- **Event property** (`is`, `is not`, `less than`, `less than or equal to`, `greater than`, `greater than or equal to`, `contains`,  `does not contain`, `starts with`, `ends with`, `exists`, `does not exist`).  Use these filters to trigger the action only when an event with a specific property occurs.  You can specify nested properties using dot notation, for example `context.app.name`. If the property might appear in more than one format or location, you can use an ANY statement and add conditions for each of those formats. For example, you might filter for both `context.device.type = ios`  as well as `context.os.name = "iPhone OS``"`
    The `does` `not exist` operator matches both a `null` value or a missing property.

You can combine criteria in a single group using **ALL** or **ANY**.  Use an ANY to “subscribe” to multiple conditions. Use ALL when you need to filter for very specific conditions. You can only create one group condition per destination action. You cannot created nested conditions.



<!--
## Best Practices for configuring Destination Actions


BP: give your actions names that describe what they do, even if you won’t have many individual actions.

defaults - best for analytics tool where you need to see everything coming in.

“subscription” - you can pick and choose multiple conditions that use the same mappings.
-->
