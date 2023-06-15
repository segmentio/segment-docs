
## Mailmodo Source


[Mailmodo](https://www.mailmodo.com) is an email marketing platform that helps you create interactive emails powered by AMP. With our no-code editor, you can create interactive email in minutes and send engaging and personalized emails that boost conversions.

This source is maintained by Mailmodo. For any issues with the source, [contact their Support team](mailto:support@mailmodo.com).


## Getting Started

#### Step 1: Add a new Mailmodo Source to Segment
1. From your workspace’s [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click Add Source.
2. Search for “Mailmodo” in the Sources Catalog, select click Mailmodo, and click Add Source.
3. On the next screen, give the Source a nickname and configure any other settings.
  The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes it amongst your environments (e.g. Mailmodo_Campaigns).
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

| Event Name           | Description                                  |
| -------------------- | -------------------------------------------- |
| Email Sent           | An email was successfully sent               |
| Email Opened         | Contact opened an email                      |
| Link Clicked         | Contact clicked a link in an email           |
| Email Form Submitted | Contact submitted form or widget in an email |
| Email Marked as Spam | Contact marked an email as spam              |
| Email Bounced        | Contact email was bounced                    |
| Email Unsubscribed   | Contact unsubscribed from the email          |

## Event Properties

This table lists event-specific properties Mailmodo sends to Segment:

| Property Name | Description |
| ------------- | ----------- |
| email_id     | The guid of email address identifier stored in the Mailmodo system |
| email_subject | The subject line used for the email campaign |
| email_type | The email type used for the template  |
| template_id | The unique identifier for the template |
| template_name | The name of the template used in the campaign |
| campaign_id | The unique identifier for the campaign |
| campaign_name | The name of the campaign | 
| campaign_type | The value represents the type of campaign. Value can be - CONTACT_LIST (for the bulk campaign) or TRIGGERED (for the triggered campaign) |
| campaign_trigger_source | Applicable only for triggered campaigns. This field highlights the source of the triggered campaign (for example, Journey, Rest API, etc.) |
| apple_privacy_open | Applicable only for email open events. This field informs whether the contact has opened the email on the Apple Mail client. The value can be true or false. |
| link_id | The unique identifier for the link in the template |
| link_url | The actual URL link in the template |
| form_id | The unique identifier of the form or widget submitted in the email |
| form_name | The name of the form or widget submitted in the email |
| submission_type | This field informs whether the submission was made via AMP or the web (aka HTML fallback) |
| reason | The field provides the reason for unsubscribed or bounced. |
| is_hard_bounce | The field informs if the bounce was a hard bounce. |


## Sending Data To Mailmodo

The Mailmodo Source works only when you also connect Mailmodo as a Destination. With the Mailmodo Destination, you can use Segment to send identify and track calls to Mailmodo so you can target customers with interactive emails. 


Want to start sending data to Mailmodo? Learn how by reading the [Mailmodo Destination docs](https://support.mailmodo.com/en/support/solutions/articles/84000351518).
