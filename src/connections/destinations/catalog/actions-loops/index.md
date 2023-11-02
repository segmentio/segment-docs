---
title: Loops (Actions) Destination
hide-boilerplate: true
hide-dossier: true
id: 63360a5fe290ca3fdfad4a68
---

{% include content/plan-grid.md name="actions" %}

[Loops](https://loops.so?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target:="_blank"} is a modern email platform for SaaS, a better way to send marketing and transactional email.

You can use this Segment destination to create and update your Loops contacts and trigger email sending with events.

Loops maintains this destination. For any issues with the destination, [contact their Support team](mailto:help@loops.so).

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Loops (Actions)” in the Destinations Catalog, and select the destination.
3. Click **Configure Loops**.
4. Select an existing Source to connect to Loops and click **Next**.
5. On the Setup page, enter a name for your destination and click **Create destination**. 
6. Open Loops and generate an API key from [Settings > API](https://app.loops.so/settings?page=api){:target="_blank"}. Click "Generate key" then click the "Copy to clipboard" icon.
7. Open the Segment app, go to the Settings page inside your Loops destination, and paste your API key. Then, click "Save Changes".

## Create or update contacts

You can create and update Loops contacts by using Segment's [Identify method](/docs/connections/spec/identify/), like this:

```javascript
analytics.identify("test-user-a5h7xb", {
  email: "adam@loops.so",
  firstName: "Adam",
  favoriteColor: "blue",
  favoriteNumber: 42
});
```

If the email address or user ID do not exist in your contacts, a new contact will be created. If the email address or user ID already exists, the existing contact will be updated with the data sent in the Identify call.

Go to the Mappings tab inside your Loops destination and click **New Mapping**. Select **Create or update a contact**.

It is important that you set up the data mapping properly in step 3 of the "Create or update a contact" form. This is where you can select which data is sent on to Loops and into which fields. Loops provides an example default mapping in the form, but you should make sure that you set up the mapping to capture the correct data in the correct fields (you may have some [custom fields in Loops](https://loops.so/docs/add-users/properties){:target="_blank"} that the default mapping doesn't cover, for example).

You can pass any custom fields that you're using in Loops inside "Custom Contact Attributes".

Once you have completed the mapping you can send a test event. After you submit a test event, you can verify everything is set up correctly by looking for the contact on the [Audience](https://app.loops.so/audience){:target="_blank"} page in your Loops account.

Loops has a full tutorial for creating and updating contacts [in the Loops docs](https://loops.so/docs/add-users/segment#create-or-update-contact){:target="_blank"}.

## Sending events

In Loops you can send emails [triggered by events](https://loops.so/docs/loop-builder/triggering-emails){:target="_blank"}. You can trigger these events from Segment by using the [Track method](/docs/connections/spec/track/), like this:

```javascript
analytics.track("User Registered");
```

When you make a Track call, Segment will pass this event data on to Loops, which can then send emails based on [email-sending triggers](https://loops.so/docs/loop-builder/loop-triggers){:target="_blank"} you've set up in your account.

To set up event sending with Segment, go to the Mappings tab inside your Loops destination and click **New Mapping**. Select **Send Event**.

In the next page, enter the name of the event you're tracking into the "Event Name" field (for example, "User Registered" from the example above). If you have not already created the contact in Loops, you need to include an email address in your mapping, as Loops requires a contact for each event.

Now you are able to send a test event. You can verify that the event was triggered properly in your Loops account from the [Events](https://app.loops.so/settings?page=events){:target="_blank"} page.

Read the tutorial for sending events [in the Loops docs](https://loops.so/docs/add-users/segment#send-event){:target="_blank"}.

{% include components/actions-fields.html %}