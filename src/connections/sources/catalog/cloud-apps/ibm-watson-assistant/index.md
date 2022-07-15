---
title: 'IBM Watson Assistant Source'
---

[IBM Watson Assistant](https://www.ibm.com/products/watson-assistant){:target="_blank"} uses artificial intelligence that understands customers in context to provide fast, consistent, and accurate answers across any application, device, or channel. You can use Watson Assistant to quickly build a customized AI chatbot and deploy it on your website, over the phone, or to any other channel your customers use.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources), which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by IBM. If you have any issues with the source, see the [Watson Assistant documentation](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-troubleshoot){:target="_blank"} for information about how to get help.

## Getting Started

1. From your workspace's `/sources` page, click **Add Source**.

1. Choose IBM Watson Assistant and click **Connect**.

1. In the **Name** field, specify a descriptive name for the source (for example, `Customer Care Chatbot`). This name will be used to identify the source in the Segment user interface.

1. Click **Create**.

1. Click **Copy** to copy the Segment write key to the clipboard.

1. In the Watson Assistant user interface, open the Segment integration settings. (For more information about adding the Segment integration to your assistant, see [Sending events to Segment](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-build-custom-extension).)

1. In the **Connect** step, paste the write key into the **Segment key** field.

1. Click **Connect**.

1. In the **Select events** step, select the events you want to send to Segment. Click **Next**.

1. Review the configuration and click **Done**.

## Events

The table below lists events that Watson Assistant sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Only events generated using the v2 API and associated with a user ID are included.

| Event Name       | Description                                              |
| ---------------- | -------------------------------------------------------- |
| Message Handled  | Sent when the assistant completes handling of a message. |
| Session Started  | A new session was started with an assistant.             |
| Action Started   | Processing of an action (including subactions) began.    |
| Action Completed | Processing of an action (including subactions) ended.    |

## Event properties

The tables below list the properties included in the events listed above.

### Message handled

| Property          | Type     | Description                                                                                                                             |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `accountId`       | String   | The ID of the IBM account.                                                                                                              |
| `assistantId`     | String   | The ID of the assistant.                                                                                                                |
| `browser`         | String   | The browser that was used to send the message.                                                                                          |
| `channel`         | String   | The channel the customer used to send the message (for example, `phone` or `chat`).                                                     |
| `device`          | String   | The type of device that was used to send the message.                                                                                   |
| `environment`     | String   | The environment in which the message was handled (such as `draft` or `live`.)                                                           |
| `language`        | String   | The language of the assistant.                                                                                                          |
| `pageUrl`         | String   | The URL of the web page from which the message was sent.                                                                                |
| `serviceInstance` | String   | The IBM Watson Assistant service instance.                                                                                              |
| `sessionId`       | String   | The ID of the session during which the message was handled.                                                                             |
| `skillsInvoked`   | String[] | An array of strings listing all skills that were invoked during handling of the message (for example, `main skill` or `actions skill`). |

The following properties are included only for messages that were handled by an actions skill:

| Property                | Type     | Description                                                                                                                    |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `action`                | String   | The unique identifier of the action that was visited during handling of the message (for example, `action_202`).               |
| `actionCompleted`       | Boolean  | Whether the action completed during handling of the message.                                                                   |
| `actionCompletedReason` | String   | The reason the action completed (for example, `all_steps_done` or `fallback`.)                                                 |
| `actionStarted`         | Boolean  | Whether processing of the action started during handling of the message.                                                       |
| `actionTitle`           | String   | The title of the action that was visited during handling of the message (for example, `I want to pay my bill`).                |
| `actionsVisited`        | String[] | An array of strings listing the actions visited during handling of the message.                                                |
| `fallbackReason`        | String   | The reason why the fallback action was visited (for example, escalated to human agent or no action matches).                   |
| `handler`               | String   | The name of any handler that was called.                                                                                       |
| `stepsVisited`          | String[] | An array of strings listing the steps visited during handling of the message. Each step name is prefixed with the action name. |
| `subaction`             | String   | The name of any subaction that was called during handling of the message.                                                      |

The following properties are included only for messages that were handled by a dialog skill:

| Property             | Type     | Description                                                                                                                                                             |
| -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `branchExited`       | Boolean  | Whether the dialog branch was exited during handling of the message.                                                                                                    |
| `branchExitedReason` | String   | The reason the dialog branch was exited (for example, `completed`).                                                                                                     |
| `nodesVisited `      | String[] | An array of strings listing the dialog nodes visited during handling of the message. For each dialog node, the string specifies the node title (if any) or the node ID. |

### Action started

| Property                | Type     | Description                                                                                                                                                     |
| ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accountId`             | String   | The ID of the IBM account.                                                                                                                                      |
| `action`                | String   | The unique identifier of the action (for example, `action_202`).                                                                                                |
| `actionTitle`           | String   | The title of the action  (for example, `I want to pay my bill`).                                                                                                |
| `actionCompleted`       | Boolean  | Whether the action completed during the same conversation turn.                                                                                                 |
| `actionCompletedReason` | String   | The reason the action completed (for example, `all_steps_done` or `fallback`.)                                                                                  |
| `assistantId`           | String   | The ID of the assistant.                                                                                                                                        |
| `browser`               | String   | The browser that was used to send the message that triggered the action.                                                                                        |
| `channel`               | String   | The channel the customer used to send the message that triggered the action (for example, `phone` or `chat`).                                                   |
| `device`                | String   | The type of device that was used to send the message that triggered the action.                                                                                 |
| `environment`           | String   | The environment in which the action was started (such as `draft` or `live`.)                                                                                    |
| `fallbackReason`        | String   | The reason why the fallback action started (for example, escalated to human agent or no action matches).                                                        |
| `handler`               | String   | The name of any handler that was called.                                                                                                                        |
| `language`              | String   | The language of the assistant.                                                                                                                                  |
| `pageUrl`               | String   | The URL of the web page from which the message that triggered the action was sent.                                                                              |
| `serviceInstance`       | String   | The IBM Watson Assistant service instance.                                                                                                                      |
| `sessionId`             | String   | The ID of the session during which the message that started the action was sent.                                                                                |
| `skillsInvoked`         | String[] | An array of strings listing all skills that were invoked during handling of the message that started the action (for example, `main skill` or `actions skill`). |
| `stepsVisited`          | String[] | An array of strings listing the steps visited during processing of the action.                                                                                  |
| `subaction`             | String   | The name of any subaction that was called.                                                                                                                      |

### Action completed

| Property                | Type     | Description                                                                                                                                                     |
| ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accountId`             | String   | The ID of the IBM account.                                                                                                                                      |
| `action`                | String   | The unique identifier of the action (for example, `action_202`).                                                                                                |
| `actionCompletedReason` | String   | The reason the action completed (for example, `all_steps_done` or `fallback`.)                                                                                  |
| `actionStarted`         | Boolean  | Whether the action was started during the same conversation turn.                                                                                               |
| `actionTitle`           | String   | The title of the action  (for example, `I want to pay my bill`).                                                                                                |
| `assistantId`           | String   | The ID of the assistant.                                                                                                                                        |
| `browser`               | String   | The browser that was used to send the message that triggered the action.                                                                                        |
| `channel`               | String   | The channel the customer used to send the message that started the action (for example, `phone` or `chat`).                                                     |
| `device`                | String   | The type of device that was used to send the message that triggered the action.                                                                                 |
| `environment`           | String   | The environment in which the action completed (such as `draft` or `live`.)                                                                                      |
| `fallbackReason`        | String   | The reason why the fallback action was called (for example, escalated to human agent or no action matches).                                                     |
| `handler`               | String   | The name of any handler that was called by the action.                                                                                                          |
| `language`              | String   | The language of the assistant.                                                                                                                                  |
| `pageUrl`               | String   | The URL of the web page from which the message that triggered the action was sent.                                                                              |
| `serviceInstance`       | String   | The IBM Watson Assistant service instance.                                                                                                                      |
| `sessionId`             | String   | The ID of the session during which the message that started the action was sent.                                                                                |
| `skillsInvoked`         | String[] | An array of strings listing all skills that were invoked during handling of the message that started the action (for example, `main skill` or `actions skill`). |
| `stepsVisited`          | String[] | An array of strings listing the steps visited during processing of the action.                                                                                  |
| `subaction`             | String   | The name of any subaction that was called by the action.                                                                                                        |

### Session started

| Property          | Type   | Description                                                                       |
| ----------------- | ------ | --------------------------------------------------------------------------------- |
| `accountId`       | String | The ID of the IBM account.                                                        |
| `assistantId`     | String | The ID of the assistant.                                                          |
| `browser`         | String | The browser that was used to send the message that started the session.           |
| `channel`         | String | The channel that started the session (for example, `phone` or `chat`).            |
| `device`          | String | The type of device that was used to send the message that started the session.    |
| `environment`     | String | The environment in which the session was started (such as `draft` or `live`.)     |
| `pageUrl`         | String | The URL of the web page from which the message that started the session was sent. |
| `serviceInstance` | String | The IBM Watson Assistant service instance.                                        |
| `sessionId`       | String | The ID of the session.                                                            |

**Note:** The v2 stateless API does not generate events for starting or ending sessions.

## Adding destinations

Now that your Source is set up, you can connect it with Destinations.

Log in to your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, see the [Watson Assistant documentation](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-troubleshoot){:target="_blank"} for information about how to get help.