# 💥 Segment Partner Source Documentation Template

> Hi Partners 👋🏼
>
> Welcome to Segment - glad to have you onboard! This doc serves as a guideline for your team to create best-in-class documentation alongside your amazing product.
>
> Here are the guidelines we want you to have in mind when writing out your documentation:
>
> - Be succinct and simple in your writing. Reduce text bloat where possible.
> - Avoid 1st person language as it’s confusing for customers if they don’t know who wrote the docs (Segment or the Partner).
> - Where pre-reading is required, hyperlink to other more generic parts of Segment’s (or your) documentation.
>
> - Screenshots/Images are generally discouraged unless absolutely necessary
>
> The below template intends to provide a standardized structure. To submit your documentation, complete the following steps:
>
> 1. Fork and clone the `segment-docs` repo locally
> 2. Create a new branch (e.g., partner-name/source)
> 3. Create an `index.md` file in the following path `src/connections/sources/catalog/cloud-apps/{source-slug}/index.md
> 4. Copy the template below into your `index.md` file, and edit it to be in line with how your integration operates
> 5. Add, commit, and push your code, then submit a pull request to the `segment-docs` repo
>
> If a section does not apply to your integration, feel free to remove. Please don’t create separate sections unless absolutely necessary. In most cases, creating a H3 (###) sub-heading under an existing section is the best option!
>
> If you have any questions in the meantime, please reach out to our team at partner-support@segment.com.

---

## Template begins here...

---

## title: <integration_name> Source

> (delete after reading) Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

[<integration_name>](https://yourintegration.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides self-serve predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

> (delete after reading) Update your company name and support email address.

This source is maintained by <integration_name>. For any issues with the source, [contact their Support team](mailto:support@<integration_name>.com).

> (delete after reading) Update your company name (x2) and support email address.

_**NOTE:** The <integration_name> Source is currently in beta, which means that they are still actively developing the source. This doc was last updated on <Month_Name DD, YYYY>. If you are interested in joining their beta program or have any feedback to help improve the <integration_name> Source and its documentation, [let their team know](mailto:support@<integration_name>.com)!_

## Getting Started

> (delete after reading) Include clear, succinct steps including hyperlinks to where customers can locate the place in your app to enter their Segment writekey.

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "<integration_name>" in the Sources Catalog, select <integration_name>, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.

   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to your <integration_name> account - navigate to Settings > Integrations > Segment Integration and paste the key to connect.

## Stream

> (delete after reading) Clarify the type of Segment events your integration will send. 

<integration_name> uses our stream Source component to send Segment event data. It uses a server-side (select from `track`, `identify`, `page`, `group`) method(s) to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

> (delete after reading) Clarify how your integration includes user identifiers in your event payloads, the example below is from Klaviyo:

The default behavior is for Klaviyo to pass the userId associated with the email recipient as the userId. There are cases in which Klaviyo does not have an associated userId, in which case the email address will be passed in as the anonymousId.

> (delete after reading) For each of the below sections, populate the event and properties that a customer would expect to receive in their downstream tools from your Event Source.

## Events

The table below lists events that <integration_name> sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. <integration_name> includes the `userId` if available.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Email Sent</td>
   <td>Email was sent successfully</td>
  </tr>
  <tr>
   <td>Email Opened</td>
   <td>Prospect opened the email</td>
  </tr>
  <tr>
   <td>Link Clicked</td>
   <td>Prospect clicked the tracking link</td>
  </tr>
  <tr>
   <td>Email Replied</td>
   <td>Prospect replied to the email sent</td>
  </tr>
  <tr>
   <td>Email Bounced</td>
   <td>Email servers rejected the email</td>
  </tr>
  <tr>
   <td>Email Unsubscribed</td>
   <td>Prospect clicked the unsubscribe link</td>
  </tr>
</table>

## Event Properties

The table below list the properties included in the events listed above.

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`event`</td>
   <td>Email event type</td>
  </tr>
  <tr>
   <td>`userId`</td>
   <td>Prospect email ID</td>
  </tr>
  <tr>
   <td>`email_id`</td>
   <td>ID of the email</td>
  </tr>
  <tr>
   <td>`fromId`</td>
   <td>Sender email ID</td>
  </tr>
  <tr>
   <td>`email_subject`</td>
   <td>Subject line of the email</td>
  </tr>
  <tr>
   <td>`link`</td>
   <td>URL of the link clicked</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the <integration_name> support team](mailto:support@<integration_name>.com).

---

> Congratulations! 🎉 You’ve finished the documentation for your Segment integration. If there’s any additional information or nuance which did not fit in the above template and that you want to share with our mutual customers, feel free to include these as a separate section for us to review. If not, you may now submit this doc to our team.
