---
title: Sending Segment Data to Destinations
---

You've decided how to format your data, and collected it using [Segment Sources](/docs/connections/sources/). Now what do you do with it? You send the data to Destinations!

Destinations are tools or services which can use the data sent from Segment to power analytics, marketing, customer outreach, and more.

> info ""
> Each Segment Workspace has its own set of destinations, which are connected to the workspace's sources. When you add or modify a destination, make sure you're working with the correct workspace!


## Adding a destination

There are two ways to add a destination to your deployment: using the Segment web app, or using the [Config API](/docs/config-api/).


#### Adding a destination from the Segment web app

> warning ""
> Some third-party tools (such as Customer.io, Leanplum, and Airship) can both consume Segment data (as destinations), and send their data to Segment Warehouses as [Cloud-Sources](/docs/connections/sources/about-cloud-sources/). When you add a destination, make sure you're viewing the Destinations tab in the catalog so you add the correct one.

1. Before you start, log in to your account on the destination tool, and get the token or other credentials needed to access the tool. You'll use these to give Segment permission to send data to the tool.
2. Log in to the Segment web app, and select the workspace you want to add the destination to.
3. Click **Catalog** in the left navigation, and click the **Destinations** tab.
4. Search for the destination you want to add, and click it in the results.
   If there are multiple results for your search, you can click each result to read more about them until you find the one you're looking for.
5. In the panel that appears, click **Configure**.
6. On the next page, select a source to connect to the destination, and click **Confirm Source**.
7. On the next page, find the **Connection Settings** section, and enter the token or credentials for that destination tool.
8. Click the toggle at the top of the Settings page to enable the destination.

> success ""
> If you have more than one instance of the same destination, you can click **Copy Settings From Other Destination** to save yourself time entering the settings values.

#### Adding a destination to a specific Segment Source

You can also add a destination directly from the source's settings page in the Segment web app.

1. Before you start, log in to your account on the destination tool, and get the token or other credentials needed to access the tool. You'll use these to give Segment permission to send data to the tool.
2. Log in to the Segment web app, and select the workspace you want to work in, and navigate to the source you want to add the destination to.
3. From the source information page, click **Add Destination**.
4. Search for the destination you want to add, and click it in the results.
   If there are multiple results for your search, you can click each result to read more about them until you find the one you're looking for.
5. In the panel that appears, click **Configure**.
6. On the next page, find the **Connection Settings** section, and enter the token or credentials for that destination tool.
7. Click the toggle at the top of the Settings page to enable the destination.

#### Adding a destination using the Config API

You can use the Segment Config API to add destinations to your workspace using the [Create Destination endpoint](https://reference.segmentapis.com/#51d965d3-4a67-4542-ae2c-eb1fdddc3df6). The API requires an authorization token, and uses the `name` field as a namespace that defines which _source_ the destination is connected to. You send the rest of the destination's configuration as a JSON blob. View the documentation page in the Segment Catalog, or query the [Segment Catalog API](https://reference.segmentapis.com/#7a63ac88-43af-43db-a987-7ed7d677a8c8), for a destination to see the available settings.

> success ""
> You must use an authorization token to access the Config API, and these tokens are tied to specific workspaces. If you use the Config API to access multiple workspaces, make sure you're using the token for the workspace you want to access before proceeding.


## What happens when you add a destination

Adding a destination can have a few different effects, depending on which sources you set up to collect your data, and how you configured them.

#### Analytics.js

If you are using [Segment's JavaScript library, Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/), then Segment handles any configuration changes you need for you. If you're using Analytics.js in cloud-mode, the library sends its tracking data to the Segment servers, which route it to your destinations. When you change which destinations you send data to, the Segment servers automatically add that destination to the distribution list.

If you're using Analytics.js in device-mode, then Analytics.js serves as a wrapper around additional code used by the individual destinations to run on the user's device. When you add a destination, the Segment servers update a list of destinations that the library queries. When a user next loads your site, Analytics.js checks the list of destinations to load code for, and adds the new destination's code to what it loads. It can take up to 30 minutes for the list to update, due to CDN caching.

You can enable device-mode for some destinations from the destination's Settings page in the Segment web app. You don't need to use the same mode for all destinations in a workspace; some can use device-mode, and some can use cloud-mode.

#### Mobile sources

By default, Segment's [mobile sources](/docs/connections/sources/catalog/#mobile) send data to Segment in cloud-mode to help minimize the size of your apps. In cloud-mode the mobile source libraries forward the tracking data to the Segment servers, which route the data to the destinations. Since the Segment servers know which destinations you're using, you don't need to take any action to add destinations to mobile apps using cloud-mode.

However, if the destination you're adding has features that run on the user's device, you might need to update the app to package that destination's SDK with the library. Some destinations require that you package the SDK, and some only offer it

#### Server sources

Segment's [server sources](/docs/connections/sources/catalog/#server) run on your internal app code, and never have access to the user's device. They run in cloud-mode only, and forward their tracking calls to the Segment servers, which forward the data to any destinations you enabled.


## Destination authentication

When you add a destination in Segment, you must tell Segment how to connect with that destination's app or endpoints. Most destinations offer an API token or authentication code which you can get from their web app. The documentation for each Segment destination includes information about what you need, and how to find it. Copy this information, and paste it into the Settings for the destination, or include it in the [create API call](https://reference.segmentapis.com/#51d965d3-4a67-4542-ae2c-eb1fdddc3df6).

## Destination settings

Each destination can also have destination settings. These control how Segment transforms the data you send to the destination, and can be used to adapt it to your configuration or enable or disable certain destination features.


## Connecting one source to multiple instances of a destination

> note ""
> Multiple-destination support is available for all Segment customers on all plan tiers.

Segment allows you to connect a source to multiple instances of a destination. You can use this to set up a single Segment source that sends data into different instances of your analytics and other tools.

For example, you might set up a single Segment source to send data both to separate instances of Google Analytics for each business unit in your organization, and to another instance for executive-level reporting. You could also use this to make sure that tooling instances for different geographic teams are populated with the same data from the same source.

You can also connect multiple instances of a destination to help you smoothly migrate from one configuration to another. By sending each version the same data, you can check and validate the new configuration without interrupting use of the old one.


> success ""
> If your organization is on a Segment Business tier plan, you can use [Replay](/docs/guides/what-is-replay/) to send historical data to new instances of a destination.


### Connect a source to more than one instance of a destination

To connect a source to more than one instance of a destination in the Segment web app, start by adding the first instance of the destination and giving it a unique name, [as described above](#adding-a-destination). To add another instance of the destination, follow either of those two methods and choose another unique name.

You must give each instance of the destination connected to the same source a unique name. Segment recommends that you use descriptive names rather than numbers, so other Segment users can understand which Segment destinations are linked to which tool instances. For example, you might use "Amplitude North America" and "Amplitude South America", instead of "Amplitude 1" and "Amplitude 2". You can edit the destination instance name at any time.

If you added the first instance of your destination before multi-instance destinations became available, that instance is automatically named for the destination with no other identifiers, for example "Amplitude".

Some destinations do not support having multiple instances connected to the same source. In that case, the option to add a second instance of that destination does not appear.

You can create unique destination filters for each destination instance connected to the same source.


### Connect multiple sources to one instance of a destination

It is not possible to connect multiple instances of one source (for example, two website sources) to the same destination. However, you can create another instance of the destination for the other sources, and click **Copy Settings From Other Destination**  to save yourself time entering the settings values again.


### Connect to more than one instance of a destination using the Config API

You can add multiple instances of a destination using the Segment Config API. See the Segment Config [API documentation](https://reference.segmentapis.com/?version=latest#39ce0439-0969-48c3-ba49-b22a46c41060). If a destination does not support multi-instance, the Config API throws an appropriate error.


### Multi-instance destinations and Device-mode

- **You can connect a source to up to 25 instances of a destination if all of the instances use cloud-mode.** Destinations using cloud-mode receive data directly from the Segment servers.
- **Mobile sources, and the legacy Project source, can connect to multiple instances of destinations that operate only in cloud-mode.** Mobile and Project sources cannot connect to multiple instances of destinations that operate in both cloud-mode and device-mode.
    - **Warning**: If you bundle one instance of a destination in a mobile source but have other instances of that destination connected to that source you might see unexpected and inconsistent data.
- **Non-mobile sources can only connect to one *device-mode* instance of a destination, in addition to up to 25 cloud-mode instances.** A web browser sending to a destination in device-mode sends data directly from the user's browser (instead of through the Segment servers), by bundling a copy of destination's code with the Segment SDK. Segment can't bundle multiple copies of the destination SDK and so it can't send data to multiple instances of the destination from the browser.
- **You cannot connect a source to more than one instance of a destination that operates in device-mode only**. These destinations can only accept data from code directly on the user's device, and Segment cannot include duplicates of that code for a single source.


### Other multi-instance destination considerations


- **Multiple Data Lakes:** Segment does not currently support connecting a single source to multiple instances of a data lakes destination. [Contact Segment Customer Success](https://segment.com/help/contact/) if this would be useful for your organization.

- **Protocols transformations and multi-instance support:** Protocols transformations are specific to each source, and operate the same on all instances of a specific destination. Segment does not currently support creating unique protocols transformations for each instance of a destination.

-  **Integrations object considerations:** A common part of a Segment message is [the integrations object](https://segment.com/docs/guides/filtering-data/#filtering-with-the-integrations-object), which you can use to explicitly filter to which destinations the call is forwarded, as well as to specify options for different destination tools. If you use the integrations object to filter events or to send destination-specific options, Segment applies its values to all instances. For example:

```js
{
  "integrations": {
    "Mixpanel": false,
    "Adobe Analytics": {
      "marketingCloudVisitorId": "12345"
    }
  }
}
```

In this example:

- Events sent with this `Mixpanel` setting are **not** sent to instances of Mixpanel.
- Events sent to any Adobe Analytics destinations with this `Adobe Analytics` setting use the same `marketingCloudVisitorId` value specified.
You can not use the [integrations object](/docs/guides/filtering-data/#filtering-with-the-integrations-object) to send data to individual destination instances.
