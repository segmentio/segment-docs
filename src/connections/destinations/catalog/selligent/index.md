---
title: Selligent Destination
hidden: true
---
<!-- Paul Y - Apr 29,2020, add hidden flag as it's deprecated & being replaced with a new version-->
This destination is built and supported by Selligent. If you run into any issues with the destination, contact the Selligent Support Team.

## Getting Started

Once the Segment Connector is integrated with Message Studio,
the Segment API shall support receiving Segment's "Identify" and
"Track" event data. Message Studio translates these events as follows:

- Identify: add records to an Internal Data Source (IDS)
- Track: add records to an Interaction Extension

These records can be used to enhance the targeting and
personalization of your email messages within the Message Studio platform.


## Identify

When you identify a user, we'll pass that user's information to
Message Studio as a record in the configured Internal Data Source. Since
the Internal Data Source schema is flexible, each customer's destination with
Segment will require unique mapping of the Internal Data Source fields. Customers should contact their Selligent Relationship Manager so we can work
with them to configure the mapping to best meet their needs.


### Example Internal Data Source Schema

- customer_id (primary key)
- email_address (email)
- first_name 
- last_name
- address_street_1
- address_street_2
- address_city
- address_state
- address_zip
- country

## Track

When you track an event, we pass that event to Message Studio
as a record in the configured Interaction Extension. Since the Interaction
Extension is flexible, each customer's destination with Segment will require
unique mapping of the Interaction Extension fields. Customers should
contact their Selligent Relationship Manager so we can work with them to
configure the mapping to best meet their needs.

### Example Interaction Extension schema:

- event_id (primary key)
- customer_id (recipient key)
- event_type (event key)
- event_timestamp (event timestamp)
- channel
- ip_address
- plan_name
- acct_type

If you have any questions, contact your Selligent Relationship Manager for assistance.
