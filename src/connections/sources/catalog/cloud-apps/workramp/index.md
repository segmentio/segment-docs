---
Title: WorkRamp
beta: true
id: 7GmYZcBQyw
---
{% include content/source-region-unsupported.md %}

[WorkRamp](https://www.workramp.com/products/external-learning/customer-academy/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the All-in-One Platform that powers learning as a growth engine for the modern enterprise.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but also federate data into other enabled Segment Destinations.

This source is maintained by WorkRamp. For any issues with the source, [contact the WorkRamp support team](mailto:support@workramp.com).


_**NOTE:** The WorkRamp Source is currently in beta, which means that they are still actively developing the source. This doc was last updated on June 2, 2022. If you are interested in joining their beta program or have any feedback to help improve the WorkRamp Source and its documentation, [let the WorkRamp team know](mailto:support@workramp.com)!_


## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "WorkRamp" in the Sources Catalog, select WorkRamp, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings. 
   * The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse.  The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your academies or enviornments (eg. WorkRamp_CustomerAcademy, WorkRamp_PartnerAcademy, WorkRamp_staging).
5. Click **Add Source** to save your settings.
6. Copy the Write key from Segment, in your Source's Settings > API Key. 
7. Log in to your WorkRamp account - navigate to Academies > Your Academy > Integrations (i.e. `https://app.workramp.com/admin/academies/[academy_id]/integrations`), toggle on the Segment integration, then paste your Segment Write Key in the "Write Key" field to connect. 


## Events

The table below lists events tracking user interaction in your WorkRamp Academy. WorkRamp sends these events to Segment, which appear as tables in your warehouse, and as regular events in other Destinations.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Registers</td>
   <td>User registers for academy<br><i>Note: All custom registration fields will appear under user unless they are marked as “hidden” or a password</i></td>

  </tr>
  <tr>
   <td>Signed In</td>
   <td>User logs into academy</td>
  </tr>
  <tr>
   <td>Signed Out</td>
   <td>User clicks “Logout” from user menu</td>
  </tr>
  <tr>
   <td>Search</td>
   <td>	User types query into search bar</td>
  </tr>
  <tr>
   <td>Search Result Clicked</td>
   <td>User clicks on search result from search bar</td>
  </tr>
  <tr>
   <td>Starts Training</td>
   <td>User clicks “Get Started” from  <code>/training/:training_id/overview</td>
  </tr>
    </tr>
  <tr>
   <td>Enters Path Training</td>
   <td>User clicks “Get Started” from <code>/paths/:path_id
       </code><br>OR<br>
       User clicks “Continue” from <code>/paths/:path_id</code>

</td>
  </tr>
  <tr>
   <td>Enters Certification Training</td>
   <td>User clicks “Get Started” from <code>/certfications/:certification_id
       </code><br>OR<br>
       User clicks “Continue” from <code>/certfications/:certification_id</code>
  </tr>
  <tr>
   <td>Resumes Training</td>
    <td>User clicks “Continue” from <code>/training/:training_id/overview</code></td>
  </tr>
  <tr>
   <td>Reviews Training</td>
   <td>User clicks on search result from search bar</td>
  </tr>
  <tr>
   <td>Checkout Initiated</td>
   <td>User clicks “Purchase Guide: [Price]” from <code>/training/:training_id/overview</code></td>
  </tr>
    <tr>
   <td>Task Viewed</td>
   <td>User visits <code>/guides/:guide_id/tasks/:task_id</code></td>
  </tr>
     <td>Task completed</td>
   <td>User clicks “Next” from Task Viewed</td>
  </tr>
  <tr>
   <td>Completes Training</td>
   <td>User clicks “Finish” within Course<br>
       <i>Note: Similar to “Exits Course”, this will populate the fields of certificationId/pathId depending on the content type</i></td>
  </tr>
  <tr>
   <td>Completes Path</td>
   <td>	User clicks “Finish” within Course<br>
<i>Note: Similar to “Exits Course”, this will populate the fields of certificationId/pathId depending on the content type</i></td>
  </tr>
  <tr>
   <td>Completes Certification</td>
   <td>User clicks “Finish” within Certification Course<br>
       <i>Note: Similar to “Exits Course”, this will populate the fields of certificationId/pathId depending on the content type</i></td>
  </tr>
  <tr>
   <td>Copies Public Link to Certification</td>
   <td>User clicks “Copy Public Link” via <code>/certifications/:certification_id</td>
  </tr>
    </tr>
  <tr>
   <td>Clicks “Adds Certification to Linkedin”</td>
   <td>User clicks “Add to LinkedIn” via <code>/certifications/:certification_id</code></td>
  </tr>
  <tr>
   <td>Downloads Certification</td>
   <td>User clicks “Download” via <code>/certifications/:certification_id</code></td>
  </tr>
  <tr>
   <td>Exits Course</td>
   <td>User clicks back arrow within Training.

<i>Note: Depending if course is part of a path or certification/ those fields will be populated or not</i></td>
  </tr>
  <tr>
   <td>Views Content</td>
   <td>	
User clicks “Show Content”</td>
  </tr>
  <tr>
   <td>Hides Content</td>
   <td>User clicks “Hide Content”</td>
  </tr>
    <tr>
   <td>Views Event</td>
   <td>User visits  <code>/events/:event_id</td>
  </tr>
     <td>User clicks Session URL</td>
   <td>User clicks "Register Now" (the Session URL) from the events page
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
   <td>`academyTitle`</td>
   <td>Name of the Academy</td>
  </tr>
  <tr>
   <td>`timeStamp`</td>
   <td>Time captured for the event
i.e. '2022-05-25T21:29:53.429Z'</td>
  </tr>
  <tr>
   <td>`accessedDate`</td>
   <td>Timestamp for when the content was started by user</td>
  </tr>
  <tr>
   <td>`id`</td>
   <td>User’s ID</td>
  </tr>
  <tr>
   <td>`email_subject`</td>
   <td>Subject line of the email</td>
  </tr>
  <tr>
   <td>`email`</td>
   <td>User’s Email Address</td>
  </tr>
  <tr>
   <td>`name`</td>
   <td>User’s Name</td>
  </tr>
  <tr>
   <td>Custom registration fields (e.g. `department`, `title`)</td>
   <td>URL of the link clicked</td>
  </tr>
<tr>
   <td>`searchTerm`</td>
   <td>Query entered in search bar</td>
  </tr>
  <tr>
   <td>`contentId`</td>
   <td>ID for the content (e.g. guide ID)</td>
  </tr>
  <tr>
   <td>`contentTitle`</td>
   <td>Name of the content (e.g. guide name)</td>
  </tr>
  <tr>
   <td>`contentType`</td>
   <td>Type of content (e.g. guide)</td>
  </tr>
  <tr>
   <td>`certificationId`</td>
   <td>ID for the Certification</td>
  </tr>
  <tr>
   <td>`certificationShortId`</td>
   <td>Public facing awarded certification URL</td>
  </tr>
  <tr>
   <td>`pathId`</td>
   <td>ID for the Path</td>
  </tr>
  <tr>
   <td>`taskId`</td>
   <td>	ID for the Task</td>
  </tr>
  <tr>
   <td>`assignmentScore`</td>
   <td>Score user received on content</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the WorkRamp support team](mailto:support@workramp.com).
