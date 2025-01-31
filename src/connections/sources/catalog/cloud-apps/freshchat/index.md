---
title: Freshchat Source
id: tCkZda6aKQ
---

[Freshchat](https://www.freshworks.com/live-chat-software/){:target="_blank"} is a modern messaging software built for sales and customer engagement teams to talk to customers across websites, emails and social networks.

This source is maintained by Freshworks. For any issues with the source, contact the [Freshchat Support team](mailto:support@freshdesk.com).

## Getting started:

Before you start, make sure that you have admin rights in Freshchat and [Workspace Owner or Source Admin roles](/docs/segment-app/iam/roles/) in Segment.

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.
2. Search for "Freshchat" in the Sources Catalog, select Freshchat, and click **Add Source**.
3. On the next screen, give the Source a nickname and configure any other settings.
    - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommend using something that reflects the source itself and distinguishes amongst your environments (eg. Freshchat_Prod, Freshchat_Staging, Freshchat_Dev).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI to use in Freshchat.
6. Log in to your Freshchat account.
7. In Freshchat, navigate to Admin → Marketplace Apps → Segment Integration.
8. Paste your Segment write key and click **Authenticate account** to connect.
9. After your account is authenticated, select one or more of the following events to send to Segment:
    - On Agent Activity Create
    - On Conversation Create
    - On Conversation Update
    - On Message Create
For more information about Product Events, see the [Freshchat Product Events](https://developers.freshchat.com/v2/docs/product-events/){:target="_blank”} documentation.
10. There are [four events](https://developers.freshchat.com/v2/docs/product-events/#){:target="_blank"} that can be pushed to Segment. You can choose the events that you want to send to Segment.
11. You can add/remove the events that you want to send anytime after the app installation

### Events

The table below lists events that Freshchat sends to Segment. These events appear as tables in your warehouse and as regular events in other Destinations. Freshchat includes the userId if available.

| Event Name | Description |
| --- | --- |
| On Agent Activity Create | When the general availability or Intelliassign status changes |
| On Conversation Create | When a conversation is initiated by a user |
| On Conversation Update  | When a conversation is:<br> - Assigned to an agent or group <br> - Reassigned to an agent <br> - Resolved or opened |
| On Message Create | When a message is posted, either by the agent or user |

To find the list of properties associated with the events, please refer to the [Freshchat Developer Documentation](https://developers.freshchat.com/v2/docs/product-events/){:target="_blank"}.

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, contact the [Freshchat Support team](mailto:support@freshdesk.com)
