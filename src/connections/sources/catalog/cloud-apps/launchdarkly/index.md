---
title: LaunchDarkly Source
id: cODRw1GgIP
---
{% include content/source-region-unsupported.md %}

[LaunchDarkly](https://launchdarkly.com) is a feature management platform that empowers development teams to safely deliver and control software through feature flags.

This source is maintained by LaunchDarkly. For any issues with the source, [contact the LaunchDarkly Support team](mailto:support@launchdarkly.com).


## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Search for "LaunchDarkly" within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the set up flow to "Add Source". The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you'll be querying against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Copy the Write key from the Segment UI and log in to your LaunchDarkly account - navigate to Integrations > Data Export Destinations
5. Select "Add destination" and select "Segment" in the dropdown menu.
6. Choose a name for the destination and the LaunchDarkly environment for which events will be forwarded to Segment
7. Paste the Segment key into the "Write Key" textbox.
8. Click "Save Destination"

## Events

Below is a table of events that LaunchDarkly sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. LaunchDarkly will send through the `userId` if available.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
  <td><code>feature</code></td>
   <td>A feature flag has been evaluated</td>
  </tr>
  <tr>
  <td><code>click</code></td>
   <td>A user clicked on a CSS selector for which they have configured a LaunchDarkly experimentation goal</td>
  </tr>
  <tr>
  <td><code>Page</code></td>
   <td>A user has loaded a page which is associated with a LaunchDarkly experimentation goal</td>
  </tr>
  <tr>
  <td><code>Custom</code></td>
   <td>A custom event was sent by the LaunchDarkly SDK</td>
  </tr>
</table>

## Event Properties

Below are tables outlining the properties included in the events listed above.

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
  <td><code>event</code></td>
   <td>event type</td>
  </tr>
  <tr><td><b>Common Properties</b></td>
  <td>Properties common to all event types</td>
  </tr>
  <tr>
  <td><code>environment</code></td>
   <td>The LaunchDarkly environment ID corresponding to event</td>
  </tr>
  <tr>
  <td><code>project</code></td>
   <td>The LaunchDarkly project ID corresponding to the event</td>
  </tr>
  <tr>
   <td><code>key</code></td>
   <td>The flag key corresponding to the event. In the case of experimentation events, this will be the goal key for the experiment.</td>
  </tr>
  <tr>
  <td><b>Feature Request Event Properties</b></td>
  </tr>
  <tr>
  <td><code>value</code></td>
      <td>The value the flag evaluated to</td>
  </tr>
  <tr>
  <td><code>flagVersion</code></td>
      <td>The version of the flag when it was evaluated</td>
  </tr>
  <tr>
  <td><code>reasonKind</code></td>
      <td>The <a href="https://docs.launchdarkly.com/docs/evaluation-reasons">evaluation reason</a> for the flag.</td>
  </tr>
  <tr>
  <td><code>prereqOf</code></td>
      <td>Set to another flag's key if this flag evaluation was only performed in order to determine
 whether the prerequisite values were met for the indicated flag. See <a href="https://docs.launchdarkly.com/docs/prerequisites">flag prerequisites</a>.</td>
  </tr>
  <tr>
  <td><code>default</code></td>
      <td>Indicates whether the flag value was the result of the default variation being selected</td>
  </tr>
  <tr>
  <td><code>variation</code></td>
      <td>The variation of the flag requested. Flag variation values are stored in an array. This value corresponds to the index of the variation the array. Boolean flags show as <code>0</code> or <code>1</code> for <code>true</code> and <code>false</code>, and other flag types are numbered starting with <code>0</code> for their different variations.</td>
  </tr>
  <tr>
    <td><b>Page View Event Properties</b></td>
  </tr>
  <tr>
  <td><code>url</code></td>
   <td>The URL the user was on when the flag was evaluated</td>
  </tr>
  <tr>
    <td><b>Click Event Properties</b></td>
  </tr>
  <tr>
  <td><code>url</code></td>
   <td>The URL the user was on when the flag was evaluated</td>
  </tr>
  <tr>
  <td><code>selector</code></td>
   <td>Contains the CSS selector corresponding to the click event</td>
  </tr>
  <tr>
    <td><b>Custom Event Properties</b></td>
    <td>Custom Events have no additional properties besides the common properties</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the LaunchDarkly team](mailto:support@launchdarkly.com).
