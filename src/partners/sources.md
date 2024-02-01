---
title: Build a Source
---

Sources send data into Segment, and serve as the origin for your data. Segment empowers companies of all sizes to use their customer data to grow their business. When you create a Segment source for your organization, you enable customers to use data from your tool wherever it's most useful to them.

## Get access and log in

Before you begin, you need access to the Developer Portal. To access the Developer portal:

1. Apply to become a [Segment Select Partner](https://segment.com/partners/integration/){:target="_blank"}.
2. Once approved, you'll receive an invitation to join the Segment Developer Portal.
3. Log in to Segment, navigate to the User dropdown in the top right of the screen, and click [**Developer Portal**](https://app.segment.com/dev-portal){:target="_blank"}.

## Build the source

1. Once in the Developer Portal, navigate to **Integrations** and click **Build integration** > **Build a source**

2. On the Source setup screen, enter a name and slug for your source, and click **Create source**.

3. From the Integrations screen, click on the source you just created. You should see your source in **Private building** status.

4. Select the **Catalog info** tab and add relevant metadata and catalog information for your source.

## Understanding the integration

To complete the source set up flow, the customer will need to input the Segment write key for this source in your integrations settings UI. This will enable your tool to route customer data back to Segment correctly. 

To send events to Segment you should post events directly to the [Segment HTTP API](/docs/connections/sources/catalog/libraries/server/http-api/#track). You may use any server-side Segment [library](/docs/connections/sources/catalog/) to do so.

## The Segment Spec

Building your source will require defining the event data that you send to Segment. Segment's spec is a critical component of preserving semantics between sources and destinations. 

If you break the spec, you are breaking the promise of Segment, which is grounds for removal from the catalog. To learn about the semantics of the five supported API calls, and the semantic event names and properties Segment recognizes, read the [Segment Spec](/docs/connections/spec).

Within the Spec, there are a few requirements for partner Streams worth pointing out.

### Naming conventions

When you're creating events and the properties associated with them, you want to be crystal clear about the casing. This might seem nitpicky, but it's imperative in the long run. Segment recommends `Proper Case` for event names, and `snake_case` for properties. If you have platform-specific requirements that necessitate the use of different casing, it is permissible.

Here are the five most common options:

- `all lowercase` — account created

- `snake_case` — account_created

- `Proper Case` — Account Created

- `camelCase` — accountCreated

- `Sentence case` — Account created

You can read more about Segment's recommended naming conventions [here](https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/){:target="_blank"}.


### `userId`

Each call sent to Segment must contain a  `userId`. The `userId` is what allows Segment to identify each unique user. This value should be stored by your tool when you receive an event from Segment.

For example, you might receive an `identify` call with a `userId` and `traits` about that user. If that user is sent an email and opens that email, you would want to send an `Email Opened` event back to Segment with that same `userId` . The `userId` should be part of the call body as a top-level object.

> info ""
>  For Customers, it's critical that the `userId` be consistent across all data flowing through Segment — this has significant implications for Segment billing (based on unique Monthly Tracked Users) and usefulness of data in integrations/warehouses. Passing back the `userId` value sent from Segment into your tool should be the default behavior of your track calls. If you're not a destination, make sure that you're using the customer's internal database ID, not your tool's ID.

If you have your own unique identifier you use in your tool, Segment recommends passing that along as a context property in the event for QA purposes. For example:

```json
    "type": "track",
    "userId": "abc",
    "traits": {
        "email": "customer@company.com"
     }
     "context": {
       "yourToolId": "123"
     },
```

### `integration`

Each call should contain a `context.integration` object in the call body that identifies your tool (for example where the call is coming from). Use the slugified name for your tool, and `1.0.0` as the initial version — if you're unsure of your integration slug, contact Segment support. Once Streams are supported in the Developer Center, this will be rendered for you and will be validated as part of the QA process.

This should be part of the `context` top-level object and will look like:

```json
    "context": {
      "integration": {
        "name": "your-tool",
        "version": "1.0.0"
      }
    }
```

### `writeKey`

Each call must contain a `writeKey`. Segment provides this `writeKey` to customers in the settings panel for each of their sources. As mentioned in the set up flow description above, customers will need to save their Segment write key in your UI in order authenticate calls being made by your tool.

The write key is required in the header of every call to identify the customer whose data Segment receives. See the [authentication section](/docs/connections/sources/catalog/libraries/server/http-api/#authentication) of the HTTP API docs for more detail. If you do not include a customer write key in the call header, Segment will reject track calls from your tool.

**Rate limits and batching**
There is no hard rate limit at which point Segment will drop your data. However, to avoid processing delays, Segment asks partners to send requests at a maximum rate of 50 requests per second.

If you want to batch requests to the HTTP endpoint, refer to the batching documentation [here](/docs/connections/sources/catalog/libraries/server/http-api/#import). The suggested maximum rate includes any batch requests.

## Regional Segment

Segment offers customers the option to lead on data residency by providing [regional infrastructure](/docs/guides/regional-segment) in both the Europe and the United States. In order for your source to be available in an EU workspace, you will need to provide the ability for the Segment user to post their data to the EU ingestion endpoint: 

- Oregon (US Default) — `api.segment.io/v1`
- Dublin — `events.eu1.segmentapis.com/`

## Test your source

1. From your source's page in the Developer Portal, navigate to **Settings** > **Add to workspace**. From the dropdown, select the Segment workspace you'll use to test your source, and click **Add to workspace**. The selected workspace will open in a new tab.

When the selected workspace opens in a new tab, with your source's configuration page visible, copy the workspace ID, and add it to your source.

Use the [Source Debugger](/docs/connections/sources/debugger/) to observe inbound data when you generate events in your source. For example, if your source sends email data to Segment, you should:

- Create an email campaign that includes one hyperlink and an unsubscribe option
- Send the email to yourself
- When you receive the email
  - Open it
  - Click the link
  - Unsubscribe

Check the Source Debugger to verify that the events arrive and are formatted according to the Segment Spec.

> info ""
>  To test an EU workspace, reach out to Support through the Developer Portal. They can follow up on provisioning you an appropriate workspace.

## Write your source's documentation

Documentation is integral to enabling Segment's users to self-serve and onboard with your integration. Segment's documentation team will work with you during this part of the process to ensure your documentation matches the Segment style and is as instructive as possible.

To create your documentation, follow the instructions outlined [in this template](https://github.com/segmentio/segment-docs/blob/develop/templates/partners/source.md){:target="_blank"}. When submitting your source integration for review, you will need to include a link to the pull request you made to add your documentation.

## Launch your source

When you've verified that your source sends the correct information, submit it for review. The Segment team will review your source's functionality, catalog metadata, and documentation. If your source is approved, it will appear in the Segment catalog, marked with a "beta" badge for a period of two weeks. After this period, the source is considered generally available.
