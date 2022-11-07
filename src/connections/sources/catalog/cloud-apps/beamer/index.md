---
title: Beamer Source
beta: true
id: ErcsNGMEwt
---
{% include content/source-region-unsupported.md %}

[Beamer](https://www.getbeamer.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a changelog and notification center that lets you announce new features, product updates, special offers and more.

This source is maintained by Beamer. For any issues with the source, [contact the Beamer Support team](mailto:info@getbeamer.com).

> success ""
> **Good to know**: This page is about the Beamer Segment source, which sends data _into_ Segment. There's also a page about the [Beamer Segment destination](/docs/connections/destinations/catalog/beamer/), which receives data from Segment!

{% include content/beta-note.md %}

## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Search for "Beamer" within the Sources Catalog and confirm the Source you'd like to connect to.
3. Give the Source a nickname and follow the set up flow to “Add Source”. The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you'll be querying against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Copy the Write key from the Segment UI and go to [Integrations](https://app.getbeamer.com/integrations) in your Beamer dashboard, then paste your write key in the **Integrate with Segment** section.
5. Click on **Save** and that's it!

## Events

Beamer uses a server-side `track` method to send all user interactions to Segment. Keep in mind Beamer will only send interactions from users that are identified with a `userId`, which must be provided by you. For more information on how to identify your users in Beamer, check out our [Developer Docs](https://www.getbeamer.com/docs) (see the `user_id` parameter).

Below is a table of events that Beamer sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations.

| Event Name | Description |
| -------- | -------- |
| Post Viewed | A post in your feed was viewed by one of your users |
| Link Clicked | A link in one of your posts was clicked by one of your users |
| Push Notification Clicked | A push notification was received and clicked by one of your users |
| Post Commented | A user has commented on one of your posts |
| Post Reacted To | A user has sent a reaction to one of your posts |
| NPS Response Sent | A user has sent an NPS response |

## Event Properties

Below are tables describing the properties specific to each type of events sent by Beamer.

#### Post Viewed

| Property Name | Description |
| -------- | -------- |
| `post`     | Title of the post viewed |
| `language` | Two-letter language code for the post viewed (e.g `en`, `es`, `fr`, etc.) |
| `origin` | Source from where the Beamer view came (can be `Sidebar`, `Standalone`, `Notification`, `API` or `Intercom`) |

#### Link Clicked

| Property Name | Description |
| -------- | -------- |
| `post`     | Title of the post where the link was clicked |
| `language` | Two-letter language code for the post (e.g `en`, `es`, `fr`, etc.) |
| `url` | Full URL of the clicked link |

#### Push Notification Clicked

| Property Name | Description |
| -------- | -------- |
| `post`     | Title of the post that triggered the notification |
| `language` | Two-letter language code for the post (e.g `en`, `es`, `fr`, etc.) |
| `url` | Full URL to which the user was redirected |

#### Post Commented

| Property Name | Description |
| -------- | -------- |
| `post`     | Title of the post where the comment was sent |
| `comment` | Full text of the comment |

#### Post Reacted To

| Property Name | Description |
| -------- | -------- |
| `post`     | Title of the post where the reaction was sent |
| `reaction` | Type of reaction sent (can be `positive`, `neutral` or `negative`) |

#### NPS Response Sent

| Property Name | Description |
| -------- | -------- |
| `score`     | Numeric score (0-10) sent by the user |
| `comment` | Full text of the comment sent after scoring (if available) |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the Beamer team](mailto:info@getbeamer.com).
