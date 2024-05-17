---
title: ConfigCat Source
---

> (delete after reading) Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

[ConfigCat](https://configcat.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a feature flag and remote configuration service that empowers developers to control and customize the functionality of their applications. With ConfigCat, you can easily toggle features on and off, alter their settings, and roll out updates to specific users or groups. Targeting is supported through attributes, percentage-based rollouts, and segmentation. ConfigCat is available for all major programming languages and frameworks.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

> (delete after reading) Update your company name and support email address.

This source is maintained by ConfigCat. For any issues with the source, [contact their Support team](mailto:support@configcat.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "ConfigCat" in the Sources Catalog, select ConfigCat, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. ConfigCat_Prod, ConfigCat_Staging, ConfigCat_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to the ConfigCat Dashboard and copy the SDK Key for your Config in the specific Environment.
7. In your application's code **Configure SDKs:**:
    - **ConfigCat SDK:** Initialize with your ConfigCat SDK key.
    - **Segment SDK:** Set up with the Segment write token acquired while adding the ConfigCat source in Segment.
8. **Integrate Feature Flag Evaluations:**
    - During the initialization of the ConfigCat SDK, subscribe to the `flagEvaluated` hook.
    - Send feature flag evaluation data to Segment using the `featureFlagEvaluated` event name. Include the following parameter:
        - `featureFlagKey`: the feature flag's key
        - `value`: the evaluated feature flag's value or Variation ID
        - `variationId` (optional): the evaluated feature flag's Variation ID
        - `userId` (optional): the user object's identifier used during feature flag evaluation
        - `user` (optional): the user object used during feature flag evaluation.
9. You can find code samples in the [ConfigCat Segment Source documentation](https://configcat.com/docs/integrations/segment?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”}.

## Stream

ConfigCat uses our stream Source component to send Segment event data. It uses a `track` method to send data to Segment. These events are then available in any destination that accepts events, and available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for ConfigCat to pass the user object's identifier propery used during the feature flag evaluation as the userId. 

## Events

The table below lists events that <integration_name> sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. <integration_name> includes the `userId` if available.

| Event Name           | Description            |
| ------------------   | ---------------------- |
| featureFlagEvaluated | Feature flag evaluated |

## Event Properties

The table below list the properties included in the events listed above.

| Property Name    | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `featureFlagKey` | The feature flag's key                                           |
| `value`          | The evaluated feature flag's value or Variation ID               |
| `variationId`    | The evaluated feature flag's Variation ID                        |
| `userId`         | The user object's identifier used during feature flag evaluation |
| `user`           | The user object used during feature flag evaluation              |
 

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the ConfigCat support team](mailto:support@configcat.com).
