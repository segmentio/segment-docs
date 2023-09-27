---
# The end name should be similar to `Slack  Destination`
title: Loops
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[Loops](https://loops.so){:target:="_blank"} is an email platform for SaaS.

You can use this Segment integration to create and update your Loops contacts as well as trigger email sending via events.

<!-- This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

{% include content/ajs-upgrade.md %}

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Loops (Actions)” in the Destinations Catalog, and select the destination.
3. Click **Configure Loops**.
4. Select an existing Source to connect to Loops.
5. Generate an Loops API key from [Settings > API](https://app.loops.so/settings?page=api){:target="_blank"}. Click "Generate key" then click the "Copy to clipboard" icon.
6. Back in Segment, go to the Settings page inside your Loops destination and paste your API key then click "Save Changes".

## Create or update contacts

You can create and update Loops contacts by using Segment's [Identify method](https://segment.com/docs/connections/spec/identify/){:target="_blank"}, like this:

```javascript
analytics.identify("test-user-a5h7xb", {
  email: "adam@loops.so",
  firstName: "Adam",
  favoriteColor: "blue",
  favoriteNumber: 42
});
```

All traits in this call can be applied to your Loops contacts using mappings. Go to the Mappings tab and click "New Mapping". Select "Create or update a contact".

It is important that you set up the data mapping properly in step 3 of the form. This is where you can select which data is sent on to Loops and into which fields. We provide an example default mapping in the form but you should make sure that you set up the mapping to capture the correct data into the correct fields (you may have some custom fields that the default mapping doesn't cover).

Any custom fields you are using in Loops can be passed inside "Custom Contact Attributes".

We have a full tutorial for creating and updating contacts [in our docs](https://loops.so/docs/add-users/segment#create-or-update-contact){:target="_blank"}.

## Sending events

In Loops you can send emails [triggered by events](https://loops.so/docs/loop-builder/triggering-emails){:target="_blank"}. You can send these events to Loops through Segment by using the [Track method](https://segment.com/docs/connections/spec/track/){:target="_blank"}.

```javascript
analytics.track("User Registered");
```

To trigger email sending with Segment, go to the Mappings tab and click "New Mapping". Select "Send Event".

In the next page enter the name of the event you're tracking in Segment into the "Event Name" field (e.g. "User Registered" from the example above).

Read our tutorial for sending events [in our docs](https://loops.so/docs/add-users/segment#send-event){:target="_blank"}.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

<!--
Additional Context

Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.
-->