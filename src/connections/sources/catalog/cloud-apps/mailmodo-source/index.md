
## Mailmodo Source


[Mailmodo](https://www.mailmodo.com) is an email marketing platform that helps you create interactive emails powered by AMP. With our no-code editor, you can create interactive email in minutes and send engaging and personalized emails that boost conversions.

This source is maintained by Mailmodo. For any issues with the source, [contact their Support team](mailto:support@mailmodo.com).


## Getting Started

#### Step 1: Add a new Mailmodo Source to Segment
1. From your workspace’s [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click Add Source.
2. Search for “Mailmodo” in the Sources Catalog, select click Mailmodo, and click Add Source.
3. On the next screen, give the Source a nickname and configure any other settings.
4. The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes it amongst your environments (e.g. Mailmodo_Campaigns).
5. Click Add Source to save your settings.
6. Copy the Write key from the Segment UI. You will need to input this key on the Mailmodo integration page.

#### Step 2: Enter connection details on Mailmodo
1. Look for the Segment Source option on the Mailmodo Integration page. Click on the "Click to configure" option
2. Enter your Write Key copied from Step 1 and select a Segment Region
3. Click on "Test and Save" to complete the setup. 
4. If the provided write key is valid, Mailmodo will now act as a Segment source. To confirm the same, you can check the source debugger within Segment to see if the event arrived. 

#### Step 3: Adding destination to Mailmodo Source
Now that your Source is set up, you can connect it with Destinations.


Log in to your downstream tools and make sure that the events are populating in your Debugger and that they contain all of the properties you expect. If something isn’t working as you expect, see the Destination docs for troubleshooting.


If there are problems with how the events arrive at Segment, [contact the Mailmodo Support team]((mailto:support@mailmodo.com)).

## Events

The following table lists events that Mailmodo sends to Segment. These events show up as tables in your Warehouse and as regular events in your other Destinations. Mailmodo will send campaign activity data only for those contacts for whom we have received identify calls previously from Segment.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Email Sent</td>
   <td>An email was successfully sent.</td>
  </tr>
  <tr>
   <td>Email Opened</td>
   <td>Contact opened an email.</td>
  </tr>
  <tr>
   <td>Link Clicked</td>
   <td>Contact clicked a link in an email.</td>
  </tr>
  <tr>
   <td>Email Form Submitted</td>
   <td>Contact submitted form or widget in an email.</td>
  </tr>
  <tr>
   <td>Email Marked as Spam</td>
   <td>Contact marked an email as spam.</td>
  </tr>
  <tr>
   <td>Email Bounced</td>
   <td>Contact email was bounced.</td>
  </tr>
  <tr>
   <td>Email Unsubscribed</td>
   <td>Contact unsubscribed from the email.</td>
  </tr>
</table>

## Event Properties

This table lists event-specific properties Mailmodo sends to Segment:

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>email_id</td>
   <td>The guid of email address identifier stored in the Mailmodo system</td>
  </tr>
  <tr>
   <td>email_subject</td>
   <td>	The subject line used for the email campaign</td>
  </tr>
  <tr>
   <td>email_type</td>
   <td>The email type used for the template</td>
  </tr>
  <tr>
   <td>template_id</td>
   <td>The unique identifier for the template</td>
  </tr>
  <tr>
   <td>template_name</td>
   <td>	The name of the template used in the campaign</td>
  </tr>
  <tr>
   <td>campaign_id</td>
   <td>	The unique identifier for the campaign</td>
  </tr>
  <tr>
   <td>campaign_name</td>
   <td>The name of the campaign</td>
  </tr>
  <tr>
   <td>campaign_type</td>
   <td>	The value represents the type of campaign. Value can be - CONTACT_LIST (for the bulk campaign) or TRIGGERED (for the triggered campaign)</td>
  </tr>
  <tr>
   <td>campaign_trigger_source</td>
   <td>Applicable only for triggered campaigns. This field highlights the source of the triggered campaign (e.g. Journey, Rest API, etc.) </td>
  </tr>
  <tr>
   <td>apple_privacy_open</td>
   <td> Applicable only for email open events. This field informs whether the contact has opened the email on the Apple Mail client. The value can be true or false. </td>
  </tr>
  <tr>
   <td>link_id</td>
   <td>	The unique identifier for the link in the template</td>
  </tr>
  <tr>
   <td>link_url</td>
   <td>The actual URL link in the template</td>
  </tr>
  <tr>
   <td>form_id</td>
   <td>	The unique identifier of the form or widget submitted in the email </td>
  </tr>
  <tr>
   <td>form_name</td>
   <td>	The name of the form or widget submitted in the email</td>
  </tr>
  <tr>
   <td>submission_type</td>
   <td>	This field informs whether the submission was made via AMP or the web (aka HTML fallback)</td>
  </tr>
  <tr>
   <td>reason</td>
   <td>	The field provides the reason for unsubscribed or bounced. </td>
  </tr>
  <tr>
   <td>is_hard_bounce</td>
   <td>The field informs if the bounce was a hard bounce. </td>
  </tr>
</table>

## Sending Data To Mailmodo

The Mailmodo Source works only when you also connect Mailmodo as a Destination. With the Mailmodo Destination, you can use Segment to send identify and track calls to Mailmodo so you can target customers with interactive emails. 


Want to start sending data to Mailmodo? Learn how by reading the [Mailmodo Destination docs](https://support.mailmodo.com/en/support/solutions/articles/84000351518).
