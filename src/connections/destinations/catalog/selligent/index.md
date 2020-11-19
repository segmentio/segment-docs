---
beta: true
title: Selligent Destination
hidden: true
---
<!-- Paul Y - Apr 29,2020, add hidden flag as it's deprecated & being replaced with a new version-->
This destination is built and supported by Selligent. If you run into any issues with the destination, contact the Selligent Support Team.

## Getting Started

Once the Segment Connector is integrated with Message Studio,
the Segment API shall support receiving Segment's &quot;Identify&quot; and
&quot;Track&quot; event data. Message Studio translates these events as follows:</p>


>Identify: add records to an Internal Data Source (IDS)

>Track: add records to an Interaction Extension

These records can be used to enhance the targeting and
personalization of your email messages within the Message Studio platform.</p>


## Identify

When you identify a user, we'll pass that user's information to
Message Studio as a record in the configured Internal Data Source.&nbsp; Since
the Internal Data Source schema is flexible, each customer's destination with
Segment will require unique mapping of the Internal Data Source fields.&nbsp;
Customers should contact their Selligent Relationship Manager so we can work
with them to configure the mapping to best meet their needs.


### Example Internal Data Source Schema

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>customer_id
(primary key)</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>email_address
(email)</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>first_name</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>last_name</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>address_street_1</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>address_street_2</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>address_city</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>address_state</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>address_zip</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>country</p>


## Track

When you track an event, we pass that event to Message Studio
as a record in the configured Interaction Extension. Since the Interaction
Extension is flexible, each customer's destination with Segment will require
unique mapping of the Interaction Extension fields.&nbsp; Customers should
contact their Selligent Relationship Manager so we can work with them to
configure the mapping to best meet their needs.

### Example Interaction Extension schema:

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>event_id
(primary key)</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>customer_id
(recipient key)</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>event_type
(event type)</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>event_timestamp
(event timestamp)</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>channel</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>ip_address</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>plan_name</p>

<p class=MsoNormal style='margin-left:.5in;text-indent:-.25in'>_<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>acct_type</p>

<p class=MsoNormal style='margin-top:10.0pt'><a name=h.gpdttka362f6></a>&nbsp;</p>

<p class=MsoNormal style='margin-top:10.0pt'>If you have any questions, 
contact your Selligent Relationship Manager for assistance.</p>
