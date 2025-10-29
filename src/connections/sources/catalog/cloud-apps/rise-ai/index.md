---
title: Rise AI Source
---

[Rise AI](https://getrise.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides AI-powered user guidance and automation, helping users accomplish their jobs-to-be-done with intelligent walkthroughs and contextual assistance.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Rise AI. For any issues with the source, [contact their Support team](mailto:support@getrise.ai).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.
2. Search for "Rise AI" in the Sources Catalog, select Rise AI, and click **Add Source**.
3. On the next screen, give the source a name, then configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (for example, `RiseAI_Prod`, `RiseAI_Staging`, or `RiseAI_Dev`).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your Rise AI account, then navigate to **Settings** > **Integrations** > **Segment Integration** and paste the key to connect.

## Stream

Rise AI uses our stream source component to send Segment event data. It uses a server-side Track method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

Rise AI includes the `userId` when available, along with a unique `tenant_id` for tenant isolation to ensure data privacy and proper attribution across different workspaces.

## Events

The table below lists events that Rise AI sends to Segment. These events appear as tables in your warehouse, and as regular events in other destinations. Rise AI includes the `userId` if available.

| Event name          | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| walkthrough-progress | User progress through AI-guided walkthroughs and onboarding flows |
| chats               | AI chat session creation and interactions                          |


## Event Properties

The table below list the properties included in the events listed above.

| Property name             | Description                                                      |
| ------------------------- | ---------------------------------------------------------------- |
| `batch_id`                | Unique identifier for the event batch                            |
| `chat_id`                 | Unique identifier for the chat session                           |
| `environment`             | Environment where the event occurred (for example, production or staging) |
| `event_timestamp`         | Timestamp when the event occurred                                |
| `tenant_id`               | Unique identifier for the tenant/workspace                       |
| `step_index`              | Position of the current step in the walkthrough (walkthrough-progress only) |
| `step_title`              | Title of the current walkthrough step (walkthrough-progress only) |
| `fulfillment_action`      | Action taken to fulfill the step (walkthrough-progress only)     |
| `walkthrough_job_to_be_done` | The job-to-be-done that the walkthrough helps accomplish (walkthrough-progress only) |
| `chat_type`               | Type of chat interaction (chats only)                            |


## Adding destinations

Now that your source is set up, you can connect it with destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don't appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Rise AI support team](mailto:support@getrise.ai).
