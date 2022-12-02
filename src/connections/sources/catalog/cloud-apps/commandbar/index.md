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
5. Paste your Segment Write Key into the textbox.
6. Click “Connect”.
7. [Optional] Send a test event from the [CommandBar Segment integration page](https://app.commandbar.com/integrations/segment), and check your Segment Source Debugger to ensure the integration is properly configured.

## Events

Below is a table of events that CommanBar can send to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. The type name corresponds to the value of the "type" key inside the event's properties.

<table>
  <tr>
   <td>Event Name</td>
   <td>Type name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Identify</td>
   <td>N/A</td>
   <td>CommandBar booted</td>
  </tr>
  <tr>
   <td>Opened</td>
   <td>opened</td>
   <td>CommandBar opened</td>
  </tr>
  <tr>
   <td>Closed</td>
   <td>closed</td>
   <td>CommandBar closed. When the bar is closed with input text, it triggers both a `closed` event and a `deadend` event. Executions do not trigger `closed` events.</td>
  </tr>
  <tr>
   <td>Abandoned Search</td>
   <td>abandoned_search</td>
   <td>A [deadend](https://www.commandbar.com/docs/other/analytics#deadend-definition)</td>
  </tr>
  <tr>
   <td>Command Suggestion</td>
   <td>command_suggestion</td>
   <td>Command suggested</td>
  </tr>
  <tr>
   <td>Command Execution</td>
   <td>command_execution</td>
   <td>Command executed</td>
  </tr>
  <tr>
   <td>No Results For Query</td>
   <td>no_results_for_query</td>
   <td>User's search returned no results</td>
  </tr>
  <tr>
   <td>Nudge Shown</td>
   <td>nudge_shown</td>
   <td>Nudge shown</td>
  </tr>
  <tr>
   <td>Nudge Clicked</td>
   <td>nudge_clicked</td>
   <td>Nudge clicked</td>
  </tr>
  <tr>
   <td>User Changed Shortcut</td>
   <td>shortcut_edited</td>
   <td>User edited a command's shortcut</td>
  </tr>
</table>

## Event Properties

Each event has its own unique properties. There are also some properties that are shared across events.

### All events

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
  <tr>
   <td>end_user</td>
   <td>The user's ID.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>organization</td>
   <td>The CommandBar organization ID.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>search</td>
   <td>The unique ID for the user's search, if relevant.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>session</td>
   <td>The unique ID for the user's session.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>type</td>
   <td>The name of the event.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>user_type</td>
   <td>The type of user.</td>
   <td>string</td>
  </tr>
</table>

### Identify

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
  <tr>
   <td>formFactor</td>
   <td>The form factor for CommandBar, when loaded for the user.</td>
   <td>"modal" | "inline"</td>
  </tr>
  <tr>
   <td>userAttributes</td>
   <td>Attributes that are specific to the user, and which are included in the boot call.</td>
   <td>object</td>
  </tr>
</table>

### Opened

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
  <tr>
   <td>trigger</td>
   <td>The entrypoint through which the bar was opened.</td>
   <td>"launcher" | "keyboard" | "programmatic"</td>
  </tr>
</table>

### Closed

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
  <tr>
   <td>inputText</td>
   <td>The user's input text when the bar was closed.</td>
   <td>string</td>
  </tr>
</table>

### Abandoned Search

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
  <tr>
   <td>inputText</td>
   <td>The text of the deadend.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>trigger</td>
   <td>The trigger for the deadend.</td>
   <td>"Backspaced" | "Closed with text" | "Resetting search"</td>
  </tr>
  <tr>
   <td>command</td>
   <td>The id of the currently active command, if there is one.</td>
   <td>number</td>
  </tr>
  <tr>
   <td>`resource`</td>
   <td>The context key of the currently active resource, if there is one.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>`results`</td>
   <td>Information about the results being displayed when the deadend happened.</td>
   <td>object</td>
  </tr>
</table>

### Command Suggestion

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
  <tr>
   <td>text</td>
   <td>The text of the suggestion.</td>
   <td>string</td>
  </tr>
</table>

### Command Execution

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
    <tr>
   <td>command</td>
   <td>The unqiue id of the command. For commands defined via the Editor, the value will be a number. For programmatic commands, the name (string) provided will be used.</td>
   <td>number | string</td>
  </tr>
  <tr>
   <td>commandDetails</td>
   <td>The details of the command.</td>
   <td>object</td>
  </tr>
  <tr>
   <td>commandText</td>
   <td>The text of the command.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>category</td>
   <td>The category id of the command. Only provided if the command has a category.</td>
   <td>number</td>
  </tr>
  <tr>
   <td>formFactor</td>
   <td>The form factor of CommandBar.</td>
   <td>"modal" | "inline"</td>
  </tr>
  <tr>
   <td>placeholder</td>
   <td>The text of the placeholder of CommandBar.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>previousCommands</td>
   <td>The IDs of commands executed by the user earlier in the same session.</td>
   <td>string[]</td>
  </tr>
  <tr>
   <td>ranking</td>
   <td>The ranking order of the command, if relevant.</td>
   <td>number</td>
  </tr>
  <tr>
   <td>shortcut</td>
   <td>True and only provided if this command was triggered by a shortcut.</td>
   <td>boolean</td>
  </tr>
  <tr>
   <td>source</td>
   <td>Source of the executed command.</td>
   <td>"standard" | "programmatic"</td>
  </tr>
  <tr>
   <td>customShortcut</td>
   <td>Shortcut string if this command has a custom user-set shortcut.</td>
   <td>any | string</td>
  </tr>
  <tr>
   <td>inputText</td>
   <td>The text of the user's query.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>icon</td>
   <td>The icon of the command, either a path or an SVG.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>url</td>
   <td>The URL of the command. Only provided if the command is a Link command.</td>
   <td>string</td>
  </tr>
</table>

### No Results For Query

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
  <tr>
   <td>inputText</td>
   <td>The text of the user's query.</td>
   <td>string</td>
  </tr>
</table>

### Nudge Shown

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
    <tr>
   <td>id</td>
   <td>The ID of the nudge.</td>
   <td>number</td>
  </tr>
  <tr>
   <td>slug</td>
   <td>The slug or name of the nudge.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>frequency_limit</td>
   <td>The frequency limit of the nudge, e.g. 'no_limit'.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>on_select</td>
   <td>The command to execute when the nudge is clicked.</td>
   <td>object</td>
  </tr>
  <tr>
   <td>trigger</td>
   <td>The trigger for the nudge.</td>
   <td>object</td>
  </tr>
</table>

### Nudge Clicked

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
    <tr>
   <td>id</td>
   <td>The ID of the nudge.</td>
   <td>number</td>
  </tr>
  <tr>
   <td>slug</td>
   <td>The slug or name of the nudge.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>frequency_limit</td>
   <td>The frequency limit of the nudge, e.g. 'no_limit'.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>on_select</td>
   <td>The command to execute when the nudge is clicked.</td>
   <td>object</td>
  </tr>
  <tr>
   <td>trigger</td>
   <td>The trigger for the nudge.</td>
   <td>object</td>
  </tr>
</table>

### Shortcut Edited

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
   <td>Type</td>
  </tr>
    <tr>
   <td>command</td>
   <td>The unqiue id of the command. For commands defined via the Editor, the value will be a number. For programmatic commands, the name (string) provided will be used.</td>
   <td>number | string</td>
  </tr>
  <tr>
   <td>commandText</td>
   <td>The text of the command.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>category</td>
   <td>The category id of the command. Only provided if the command has a category.</td>
   <td>number</td>
  </tr>
  <tr>
   <td>source</td>
   <td>Source of the executed command.</td>
   <td>"standard" | "programmatic"</td>
  </tr>
  <tr>
   <td>defaultShortcut</td>
   <td>The command's default shortcut. Empty string if the command does not have a default set.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>oldShortcut</td>
   <td>Previously set shortcut of the command.</td>
   <td>string</td>
  </tr>
  <tr>
   <td>newShortcut</td>
   <td>The new user-set shortcut of the command.</td>
   <td>string</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, contact the [CommandBar team](mailto:support@commandbar.com).