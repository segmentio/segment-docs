---
title: UserGuiding Source
id: VShGHAfvlr
---

[UserGuiding](https://userguiding.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a product adoption platform that helps product teams automate in-app experiences that turn new users into champions.


This source is maintained by UserGuiding. For any issues with the source, [contact their Support team](mailto:assist@userguiding.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for *UserGuiding* in the Sources Catalog, select UserGuiding, and click **Add Source**.
3. Give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. UserGuiding_Prod, UserGuiding_Staging, UserGuiding_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your UserGuiding account - navigate to Settings > Integrations > Segment Integration and paste the key in the API Key textbox in the *UserGuiding as a source* section to connect.

## Stream

UserGuiding uses a stream Source component to send Segment event data. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available as a schema in your data warehouse so you can query using SQL.

UserGuiding sends user identifiers in the `user_id` attribute in the event payload. This is the same identifier that is used in the `identify` call to UserGuiding.

## Events

The table below lists events that UserGuiding sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. UserGuiding includes the `userId` if available.

| UserGuiding Event Name                   | Description                                                                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Guide Started                            | It means that a user previews the first step of a Guide                                                                                                |
| Guide Completed                          | It means that the user has completed all steps of a Guide                                                                                              |
| Hotspot Interacted                       | It means that the user interacted with a Hotspot group and saw a Hotspot as content. (remember, Hotspot groups can have multiple Hotspots as contents) |
| Checklist Item Trigger                   | It means that the user triggers a Checklist Guide                                                                                                      |
| Checklist Item Url Click                 | It means that the user clicks a URL item on a Checklist                                                                                                |
| Checklist Completed                      | It means that the user completed a Checklist                                                                                                           |
| Resource Center Guide Trigger            | It means that the user triggered a Resource Center Guide                                                                                               |
| Resource Center Checklist Guide Trigger  | It means that a Guide in a Checklist put in a Resource Center as a module is triggered by a user                                                       |
| Resource Center Checklist Item Url Click | It means that a URL item in a Checklist put in a Resource Center as a module is clicked by a user                                                      |
| Resource Center External URL Click       | It means that a user clicks an external URL in a Resource Center                                                                                       |
| Resource Center Article Link Click       | It means that a user clicks a search article in a Resource Center                                                                                      |
| Resource Center Survey Trigger           | It means that a user has triggered a survey in a Resource Center                                                                                       |
| Survey Shown                             | It means a survey was shown to a user                                                                                                                  |
| Survey Question Answer                   | It means a survey question was answered by a user                                                                                                      |


## Event properties

The table below lists the properties included in the events listed above.

| Property Name          | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `user_id`              | User identifier                                                   | str |
| `guide_id`             | ID of the guide                                                   | int |
| `guide_name`           | Name of the guide                                                 | str |
| `page_url`             | URL of the page the material was interacted at                    | str |
| `hotspot_group_id`     | Group ID of the hotspot                                           | int |
| `hotspot_group_name`   | Group name of the hotspot                                         | str |
| `hotspot_id`           | ID of the hotspot                                                 | int |
| `hotspot_title`        | Title of the hotspot                                              | str |
| `checklist_name`       | Name of the checklist                                             | str |
| `checklist_id`         | ID of the checklist                                               | int |
| `checklist_item_url`   | Item URL of the checklist                                         | str |
| `resource_center_name` | Name of the resource center                                       | str |
| `resource_center_id`   | ID of the resource center                                         | int |
| `external_url`         | External URL of resource center url click event                   | str |
| `article_link`         | Link to the article in resource center where click event happened | str |
| `survey_id`            | ID of the survey                                                  | int |
| `survey_name`          | Name of the survey                                                | str |
| `question_id`          | ID of the question in a survey                                    | str |
| `question_name`        | Name of the question                                              | str |
| `score`                | Score in a survey question answer                                 | int |
| `survey_question`      | Question text of a survey                                         | str |
| `emoji_score`          | Emoji score in a survey question answer                           | str |
| `choices`              | Choices in a survey question                                      | str |
| `feedback`             | Feedback left in survey question answer                           | str |

## Adding destinations

Once your source is set up, you can connect it to destinations.

Log in to your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the UserGuiding support team](mailto:assist@userguiding.com).

## Regional data

If you want to use [Regional Segment](/docs/guides/regional-segment/) to store your data in EU regional data centers, use the radio button in the Userguiding as a Source section in Integrations Page to select the Data Residency.
