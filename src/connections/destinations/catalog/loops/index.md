---
# The end name should be similar to `Slack  Destination`
title: Loops
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[Loops](https://loops.so){:target:="_blank"} is a modern email platform for SaaS, a better way to send marketing and transactional email.

You can use this Segment integration to create and update your Loops contacts as well as trigger email sending via events.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Loops (Actions)” in the Destinations Catalog, and select the destination.
3. Click **Configure Loops**.
4. Select an existing Source to connect to Loops.
5. Generate an API key in Loops from [Settings > API](https://app.loops.so/settings?page=api){:target="_blank"}. Click "Generate key" then click the "Copy to clipboard" icon.
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

If the email address or user ID do not exist in your contacts, a new contact will be created. If the email address or user ID already exist, the existing contact will be updated with the data sent in the `identify()` call.

Go to the Mappings tab inside your Loops destination and click "New Mapping". Select "Create or update a contact".

It is important that you set up the data mapping properly in step 3 of the form. This is where you can select which data is sent on to Loops and into which fields. We provide an example default mapping in the form but you should make sure that you set up the mapping to capture the correct data into the correct fields (you may have some [custom fields in Loops](https://loops.so/docs/add-users/properties){:target="_blank"} that the default mapping doesn't cover, for example).

Any custom fields you are using in Loops can be passed inside "Custom Contact Attributes".

Once you have completed the mapping you can send a test event. Once submitted you can verify everything is set up correctly by looking for the contact on the [Audience](https://app.loops.so/audience){:target="_blank"} page in your Loops account.

We have a full tutorial for creating and updating contacts [in our docs](https://loops.so/docs/add-users/segment#create-or-update-contact){:target="_blank"}.

## Sending events

In Loops you can send emails [triggered by events](https://loops.so/docs/loop-builder/triggering-emails){:target="_blank"}. You can trigger these events from Segment by using the [Track method](https://segment.com/docs/connections/spec/track/){:target="_blank"}, like this:

```javascript
analytics.track("User Registered");
```

When you make a `track()` call, Segment will pass this event data on to Loops, which can then send emails based on [email-sending triggers](https://loops.so/docs/loop-builder/loop-triggers){:target="_blank"} you've set up in your account.

To set up event sending with Segment, go to the Mappings tab inside your Loops destination and click "New Mapping". Select "Send Event".

In the next page, enter the name of the event you're tracking into the "Event Name" field (e.g. "User Registered" from the example above). If you have not already created the contact in Loops, you need include an email address in your mapping (Loops requires a contact for each event).

Now you are able to send a test event. You can verify that the event was triggered properly in your Loops account from the [Events](https://app.loops.so/settings?page=events){:target="_blank"} page.

Read our tutorial for sending events [in our docs](https://loops.so/docs/add-users/segment#send-event){:target="_blank"}.

{% include components/actions-fields.html %}