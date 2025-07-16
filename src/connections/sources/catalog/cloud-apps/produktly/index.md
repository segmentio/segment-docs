# 💥 Segment Partner Source Documentation Template

> Hi Partners 👋🏼
>
> Welcome to Segment - glad to have you on board! This doc serves as a guideline for your team to create best-in-class documentation alongside your amazing product.
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

## Template begins here...
---
title: Produktly Source
---

> (delete after reading) Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

[Produktly](https://produktly/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} provides self-serve predictive analytics for growth marketers, leveraging machine learning to automate audience insights and recommendations.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

> (delete after reading) Update your company name and support email address.

This source is maintained by Produktly. For any issues with the source, [contact the Produktly Support team](mailto:support@produktly.com).

## Getting started

> (delete after reading) Include clear, succinct steps including hyperlinks to where customers can locate the place in your app to enter their Segment writekey.

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Produktly" in the Sources Catalog, select Produktly, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your Produktly account - navigate to [Integrations](https://produktly.com/app/integrations){:target="_blank”}
7. Click on "Segment"
8. Paste the write key in the "Segment write key" field

## Stream

> (delete after reading) Clarify the type of Segment events your integration will send. 

Produktly uses our stream Source component to send Segment event data. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

> (delete after reading) Clarify how your integration includes user identifiers in your event payloads, the example below is from Klaviyo:

The default behavior is for Klaviyo to pass the userId associated with the email recipient as the userId. There are cases in which Klaviyo does not have an associated userId, in which case the email address will be passed in as the anonymousId.

> (delete after reading) For each of the below sections, populate the event and properties that a customer would expect to receive in their downstream tools from your Event Source.

## Events

The table below lists events that Produktly sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Produktly includes the `userId` if available.

| Event Name                  | Description                                 |
| --------------------------- | ------------------------------------------- |
| tour_available              | Tour was available for user                 |     
| tour_start                  | Tour was started by user                    | 
| tour_auto_start             | Tour was automatically started              |       
| tour_continue               | Tour was continued by user                  |     
| tour_finish                 | Tour was finished by user                   |   
| tour_step                   | User saw a specific step of a tour          | 
| checklist_step_completed    | User completed a step of a checklist        |               
| checklist_finished          | User completed all the steps in a checklist |         
| smart_tip_available         | Smart tip was available for user            |           
| smart_tip_open              | Smart tip was opened                        |     
| announcement_shown          | Announcement was shown to user              |         
| announcement_action_clicked | User clicked on announcement action         |                   
| announcement_closed         | Announcement was closed by user             |           
| nps_widget_shown            | NPS widget was shown to user                |       



## Event Properties

The table below list the properties included in the events listed above.

| Property Name   | Description               |
| --------------- | ------------------------- |
| `email_id`      | ID of the email           |
| `from_id`       | Sender email ID           |
| `email_subject` | Subject line of the email |
| `link`          | URL of the link clicked   |
 

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Produktly support team](mailto:support@produktly.com).

> (delete after reading) Congratulations! 🎉 You’ve finished the documentation for your Segment integration. If there’s any additional information or nuance which did not fit in the above template and that you want to share with our mutual customers, feel free to include these as a separate section for us to review. If not, you may now submit this doc to our team.