---
title: CommandBar Source
beta: true
id: QHndBw5kGO
---

CommandBar gives your users a searchable index of your app's features and content, as well as customizable in-app components, like onboarding nudges. Better understand user intent and deliver step-change improvements in UX, for new and power users alike. By connecting Segment to CommandBar as a source, you can deliver search and nudge event data directly into Segment in real-time, enabling you to analyze user intent and product usage data in your preferred data tools and enrich user profiles.

This source is maintained by CommandBar. For any issues with the source, contact the [CommandBar Support team](mailto:support@commandbar.com).

## Getting Started
1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) search for “CommandBar” and click **Add Source**.
2. On the next screen, give the Source a nickname configure any other settings. The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you’ll be querying against in your warehouse.
3. Copy the Write Key from the Segment UI. If you are not sure where to find your write key, visit [Segment's help document](https://segment.com/docs/connections/find-writekey/).
4. Log in to your [CommandBar account](https://app.commandbar.com/login), and navigate to the [Segment integration page](https://app.commandbar.com/integrations/segment).
5. Paste your Segment Write Key into the text box.
6. Click “Connect”.
7. [Optional] Send a test event from the [CommandBar Segment integration page](https://app.commandbar.com/integrations/segment), and check your Segment Source Debugger to ensure the integration is properly configured.

## Events

Below is a table of events that CommanBar can send to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. The type name corresponds to the value of the "type" key inside the event's properties.


| Event Name            | Type name              | Description                                                                                                                                                     |
| --------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identify              | N/A                    | CommandBar booted                                                                                                                                               |
| Opened                | `opened`               | CommandBar opened                                                                                                                                               |
| Closed                | `closed`               | CommandBar closed. When the bar is closed with input text, it triggers both a `closed` event and a `dead end` event. Executions do not trigger `closed` events. |
| Abandoned Search      | `abandoned_search`     | A [dead end](https://www.commandbar.com/docs/other/analytics#dead end-definition)                                                                               |
| Command Suggestion    | `command_suggestion`   | Command suggested                                                                                                                                               |
| Command Execution     | `command_execution`    | Command executed                                                                                                                                                |
| No Results For Query  | `no_results_for_query` | User's search returned no results                                                                                                                               |
| Nudge Shown           | `nudge_shown`          | Nudge shown                                                                                                                                                     |
| Nudge Clicked         | `nudge_clicked`        | Nudge clicked                                                                                                                                                   |
| User Changed Shortcut | `shortcut_edited`      | User edited a command's shortcut                                                                                                                                |


## Event Properties

Each event has its own unique properties. There are also some properties that are shared across events.

### All events


| Property Name | Description                                       | Type   |
| ------------- | ------------------------------------------------- | ------ |
| end_user      | The user's ID.                                    | string |
| organization  | The CommandBar organization ID.                   | string |
| search        | The unique ID for the user's search, if relevant. | string |
| session       | The unique ID for the user's session.             | string |
| type          | The name of the event.                            | string |
| user_type     | The type of user.                                 | string |



### Identify

| Property Name    | Description                                                                        | Type               |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------ |
| `formFactor`     | The form factor for CommandBar, when loaded for the user.                          | "modal" , "inline" |
| `userAttributes` | Attributes that are specific to the user, and which are included in the boot call. | object             |


### Opened


| Property Name | Description                                      | Type                                     |
| ------------- | ------------------------------------------------ | ---------------------------------------- |
| `trigger`     | The entrypoint through which the bar was opened. | "launcher" , "keyboard" , "programmatic" |

### Closed

| Property Name | Description                                    | Type   |
| ------------- | ---------------------------------------------- | ------ |
| `inputText`   | The user's input text when the bar was closed. | string |

### Abandoned Search

| Property Name | Description                                                               | Type                                                   |
| ------------- | ------------------------------------------------------------------------- | ------------------------------------------------------ |
| `inputText`   | The text of the dead end.                                                 | string                                                 |
| `trigger`     | The trigger for the dead end.                                             | "Backspaced" , "Closed with text" , "Resetting search" |
| `command`     | The id of the currently active command, if there is one.                  | number                                                 |
| `resource`    | The context key of the currently active resource, if there is one.        | string                                                 |
| `results`     | Information about the results being displayed when the dead end happened. | object                                                 |


### Command Suggestion

| Property Name | Description                 | Type   |
| ------------- | --------------------------- | ------ |
| text          | The text of the suggestion. | string |

### Command Execution

| Property Name      | Description                                                                                                                                                       | Type       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `command`          | The unique id of the command. For commands defined in the Editor, the value will be a number. For programmatic commands, the name (string) provided will be used. | number     | string         |
| `commandDetails`   | The details of the command.                                                                                                                                       | object     |
| `commandText`      | The text of the command.                                                                                                                                          | string     |
| `category`         | The category id of the command. Only provided if the command has a category.                                                                                      | number     |
| `formFactor`       | The form factor of CommandBar.                                                                                                                                    | "modal"    | "inline"       |
| `placeholder`      | The text of the placeholder of CommandBar.                                                                                                                        | string     |
| `previousCommands` | The IDs of commands executed by the user earlier in the same session.                                                                                             | string[]   |
| `ranking`          | The ranking order of the command, if relevant.                                                                                                                    | number     |
| `shortcut`         | True and only provided if this command was triggered by a shortcut.                                                                                               | boolean    |
| `source`           | Source of the executed command.                                                                                                                                   | "standard" | "programmatic" |
| `customShortcut`   | Shortcut string if this command has a custom user-set shortcut.                                                                                                   | any        | string         |
| `inputText`        | The text of the user's query.                                                                                                                                     | string     |
| `icon`             | The icon of the command, either a path or an SVG.                                                                                                                 | string     |
| `url`              | The URL of the command. Only provided if the command is a Link command.                                                                                           | string     |


### No Results For Query

| Property Name | Description                   | Type   |
| ------------- | ----------------------------- | ------ |
| `inputText`   | The text of the user's query. | string |

### Nudge Shown

| Property Name     | Description                                               | Type   |
| ----------------- | --------------------------------------------------------- | ------ |
| `id`              | The ID of the nudge.                                      | number |
| `slug`            | The slug or name of the nudge.                            | string |
| `frequency_limit` | The frequency limit of the nudge, for example `no_limit`. | string |
| `on_select`       | The command to execute when the nudge is clicked.         | object |
| `trigger`         | The trigger for the nudge.                                | object |

### Nudge Clicked

| Property Name     | Description                                               | Type   |
| ----------------- | --------------------------------------------------------- | ------ |
| `id`              | The ID of the nudge.                                      | number |
| `slug`            | The slug or name of the nudge.                            | string |
| `frequency_limit` | The frequency limit of the nudge, for example,`no_limit`. | string |
| `on_select`       | The command to execute when the nudge is clicked.         | object |
| `trigger`         | The trigger for the nudge.                                | object |


### Shortcut Edited

| Property Name     | Description                                                                                                                                                       | Type                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `command`         | The unique id of the command. For commands defined in the Editor, the value will be a number. For programmatic commands, the name (string) provided will be used. | number, string             |
| `commandText`     | The text of the command.                                                                                                                                          | string                     |
| `category`        | The category id of the command. Only provided if the command has a category.                                                                                      | number                     |
| `source`          | Source of the executed command.                                                                                                                                   | "standard", "programmatic" |
| `defaultShortcut` | The command's default shortcut. Empty string if the command does not have a default set.                                                                          | string                     |
| `oldShortcut`     | Previously set shortcut of the command.                                                                                                                           | string                     |
| `newShortcut`     | The new user-set shortcut of the command.                                                                                                                         | string                     |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, contact the [CommandBar team](mailto:support@commandbar.com).
