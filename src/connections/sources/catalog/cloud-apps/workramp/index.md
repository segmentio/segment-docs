---
title: WorkRamp Source
beta: true
id: 7GmYZcBQyw
---
{% include content/source-region-unsupported.md %}

[WorkRamp](https://www.workramp.com/products/external-learning/customer-academy/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the All-in-One Platform that powers learning as a growth engine for the modern enterprise.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but also federate data into other enabled Segment Destinations.

This source is maintained by WorkRamp. For any issues with the source, [contact the WorkRamp support team](mailto:support@workramp.com).

> info "The WorkRamp source is in Beta"
> WorkRamp are actively developing the source. This doc was last updated on June 2, 2022. If you are interested in joining their beta program or have any feedback to help improve the WorkRamp Source and its documentation, contact [support@workramp.com](mailto:support@workramp.com)



## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "WorkRamp" in the Sources Catalog, select WorkRamp, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings. 
   * The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse.  The nickname can be anything, but Segment recommends something that reflects the source itself and distinguishes amongst your academies or environments (for example, `WorkRamp_CustomerAcademy`, `WorkRamp_PartnerAcademy`, `WorkRamp_staging`).
5. Click **Add Source** to save your settings.
6. Copy the Write key from Segment, in your Source's Settings > API Key. 
7. Log in to your WorkRamp account - navigate to Academies > Your Academy > Integrations (for example, `https://app.workramp.com/admin/academies/[academy_id]/integrations`), toggle on the Segment integration, then paste your Segment Write Key in the "Write Key" field to connect. 


## Events

The table below lists events tracking user interaction in  WorkRamp Academy. WorkRamp sends these events to Segment, which appear as tables in your warehouse, and as regular events in other Destinations.

| Event Name                              | Description                                                                                                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registers                               | The user registers for academy. All custom registration fields appear under user unless they are marked as “hidden” or a password.                                                |
| Signed In                               | The user logs into academy.                                                                                                                                                       |
| Signed Out                              | The user clicks **Logout** from the User menu.                                                                                                                                    |
| Search                                  | The user types a query into the Search bar.                                                                                                                                       |
| Search Result Clicked                   | The user clicks on a search result from the Search bar.                                                                                                                           |
| Starts Training                         | The user clicks **Get Started** from `/training/:training_id/overview/`.                                                                                                          |
| Enters Path Training                    | The user clicks **Get Started** or **Continue** from `/paths/:path_id`.                                                                                                           |
| Enters Certification Training           | The user clicks **Get Started** or **Continue** from `/certifications/:certification_id`.                                                                                         |
| Resumes Training                        | The user clicks **Continue** from `/training/:training_id/overview`.                                                                                                              |
| Reviews Training                        | The user clicks on search result from the Search bar.                                                                                                                             |
| Checkout Initiated                      | The user clicks **Purchase Guide: [Price]** from `/training/:training_id/overview/`.                                                                                              |
| Task Viewed                             | The user visits `/guides/:guide_id/tasks/:task_id/`.                                                                                                                              |
| Completes Training                      | The user clicks **Finish** in a Course. Similar to **Exits Course**, this event populates the fields of `certificationId/pathId` depending on the content type.                   |
| Completes Path                          | The user clicks **Finish** within a Course. Similar to **Exits Course**, this event populates the fields of `certificationId/pathId` depending on the content type.               |
| Completes Certification                 | The user clicks **Finish** within a Certification Course. Similar to **Exits Course**, this event populates the fields of `certificationId/pathId` depending on the content type. |
| Copies Public Link to Certification     | The user clicks **Copy Public Link** on `/certifications/:certification_id`.                                                                                                      |
| Clicks “Adds Certification to LinkedIn” | The user clicks **Add to LinkedIn** on `/certifications/:certification_id/`.                                                                                                      |
| Downloads Certification                 | The user clicks **Download** on `/certifications/:certification_id/`.                                                                                                             |
| Exits Course                            | The user clicks the back arrow within a Training. If the course is part of path or certification, the associated fields will populate.                                            |
| Views Content                           | The user clicks **Show Content**.                                                                                                                                                 |
| Hides Content                           | The user clicks **Hide Content**.                                                                                                                                                 |
| Views Event                             | The user visits `/events/:event_id`.                                                                                                                                              |
| Clicks Session URL                      | The user clicks **Register Now** (the session URL) from the events page.                                                                                                          |





## Event properties

The table below list the properties included in the events listed above.

| Property Name                                      | Description                                                           |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| `academyTitle`                                     | Name of the Academy.                                                  |
| `timeStamp`                                        | Time captured for the event, for example, '2022-05-25T21:29:53.429Z'. |
| `accessedDate`                                     | Timestamp for when the content was started by user.                   |
| `id`                                               | The user’s ID.                                                        |
| `email_subject`                                    | Subject line of the email.                                            |
| `email`                                            | The user’s Email Address.                                             |
| `name`                                             | The user’s Name.                                                      |
| Custom registration fields  `department`, `title`) | URL of the link clicked.                                              |
| `searchTerm`                                       | Query entered in search bar.                                          |
| `contentId`                                        | ID for the content (for example, guide ID).                           |
| `contentTitle`                                     | Name of the content (for example, guide name).                        |
| `contentType`                                      | Type of content (for example, guide).                                 |
| `certificationId`                                  | ID for the Certification.                                             |
| `certificationShortId`                             | Public facing awarded certification URL.                              |
| `pathId`                                           | ID for the Path.                                                      |
| `taskId`                                           | ID for the Task.                                                      |
| `assignmentScore`                                  | Score user received on content.                                       |



## Adding destinations

Once the source is configured, you can connect it to Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the WorkRamp support team](mailto:support@workramp.com).