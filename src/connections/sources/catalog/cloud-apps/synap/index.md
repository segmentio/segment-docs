---
title: Synap Source
id: OyAdFUfMz9
---

[Synap](https://synap.ac){:target="_blank”} is an online exam platform specialising in the delivery of high stakes exams, assessments and online learning. Synap is used by a wide range of companies and educational institutions to deliver high quality, robust assessments.

This source is maintained by Synap. For any issues with the source, contact Synap via the live chat widget available on your portal, or get in touch with your account manager. Synap also provides more [detailed documentation on their website](https://academy.synap.ac/doc/integrations/segment){:target="_blank”} with specific guides and best practices.

## Getting started

1. From your workspace's Sources page, click **Add source**.

2. Search for and select Synap.

3. Copy the Write key from the Segment UI.

4. Login to your Synap portal as an admin, and go to `/portal-dashboard/settings/integrations`. To navigate to this page via the UI, first click on the 'gears' icon near the bottom left hand side of the screen, then look for the Integrations menu item.

5. Paste your write key into the Segment Write Key box and click **Save** - this verifies and saves your API key.

## Stream

Synap uses their stream Source component to send Segment event data. On the client-side, this source uses Segment's Identify and Page events. On the server-side, it uses Identify and Track events. These events are then available in any Segment destination that accepts client or server-side events and available in a schema in your data warehouse that you can query using SQL.

Synap identifies users based on their Synap User ID, which is sent as the userId in Segment events.

## Events

The table below lists events that Synap sends to Segment. These events appear as tables in your warehouse, and as regular events in other destinations. Synap includes the userId, if available.

| Event Name             | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| Began Test             | User starts a test                                                |
| Submitted Test         | User finishes ('submits') a test (may or may not require marking) |
| Completed Test         | When a Test has been 'completed' (including marking)              |
| Collection Item Viewed | User views a Collection Item                                      |
| User Registered        | User registered an Account                                        |
| Assignment Started     | User starts an Assignment                                         |
| Exam User Registered   | User is enrolled for an Exam                                      |
| User Logged In         | User explicitly logged in to Synap                                |
| User Session Restored  | User opened Synap after a period of in activity                   |

To find the list of properties associated with the events, please refer to the [Synap Segment Documentation](https://academy.synap.ac/doc/integrations/segment){:target="_blank”}. Some of the events, notably those related to Test and Question submission, have relatively large payloads. You might want to review the [Synap Test and Question Analytics Schemas](https://academy.synap.ac/doc/integrations/segment/test-and-question-analytics){:target="_blank"} before tracking these events. 

## Identify

Synap sends an identify() message to Segment which consists of the userId and the user traits.

| Field   | Type   | Description                                                                           |
| ------- | ------ | ------------------------------------------------------------------------------------- |
| userId  | string | Unique identifier for the user in Synap                                               |
| context | object | User [context](https://segment.com/docs/connections/spec/common/#context)             |
| traits  | object | Custom [traits](https://segment.com/docs/connections/spec/common/#traits) of the user |

### Identify traits

| Name                   | Type                                | Description                                                             |
| ---------------------- | ----------------------------------- | ----------------------------------------------------------------------- |
| createdAt              | date                                | The date this user's account was created                                |
| email                  | string                              | The user's email address                                                |
| emailVerified          | boolean                             | Whether or not the user has verified their email address                |
| firstName              | string                              | The user's first name                                                   |
| lastName               | string                              | The user's last name                                                    |
| marketingEmailsConsent | "removed", "pending" or "confirmed" | Enumeration representing the user's consent to receive marketing emails |
| name                   | string                              | The user's full name                                                    |
| profilePicture         | string                              | a URL pointing to the user's profile picture, if provided               |


## Page

Page calls include the page path and unique URL.

| Name   | Type   | Description                              |
| ------ | ------ | ---------------------------------------- |
| name   | string | The name of the page                     |
| path   | string | The relative path to the page            |
| search | string | Any query string parameters from the URL |
| title  | string | The title of the page                    |
| url    | string | The full URL of the page                 |

## Adding destinations

Now that your source is set up, you can connect it to destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the Event Delivery tool, and refer to the destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, contact the Synap support team via the live chat widget which is available to all Admin users of your portal.
