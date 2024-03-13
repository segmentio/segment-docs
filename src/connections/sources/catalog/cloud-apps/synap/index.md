---
title: Synap Source
id: OyAdFUfMz9
beta: true
---

[Synap](https://synap.ac){:target="_blank”} is an online exam platform specialising in the delivery of high stakes exams, assessments and online learning. Synap is used by a wide range of companies and educational institutions to deliver high quality, robust assessments.

This source is maintained by Synap. For any issues with the source, contact Synap via the live chat widget available on your portal, or get in touch with your account manager. Synap also provides more detailed documentation with specific guides and best-practices [here](https://academy.synap.ac/doc/integrations/segment){:target="_blank”}.

## Getting started

1. From your workspace's `/sources` page, click `Add source`.

2. Search for and choose Synap.

3. Copy the Write key from the Segment UI.

4. Login to your Synap portal as an admin, and go to `/portal-dashboard/settings/integrations`. To navigate to this page via the UI, first click on the 'gears' icon near the bottom left hand side of the screen, then look for the Integrations menu item

5. Paste your write key into the Segment Write Key box and click Save - this will verify and save your API key.

## Stream

Synap uses our stream Source component to send Segment event data. It uses a server-side identify, track, page and group methods to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

Synap identifies users based on their Synap User ID, which will be sent as the userId in Segment events.

Events
The table below lists events that Synap sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Synap includes the userId if available.

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

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the Event Delivery tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, contact the Synap support team.
