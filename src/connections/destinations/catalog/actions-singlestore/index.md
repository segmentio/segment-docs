---
title: SingleStore (Actions) Destination
id: 6720ddceaa24532723b39d63
---

{% include content/plan-grid.md name="actions" %}

[SingleStore](https://singlestore.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a high-performance, cloud-native database designed for real-time analytics and applications. By integrating SingleStore and Segment, you can ingest, analyze, and act on your customer data instantly, unlocking faster insights for your business.
* **Real-Time Analytics:** Handle streaming and transactional data simultaneously with ultra-low latency.
* **Advanced Data Science:** Run complex data science and machine learning models directly within the database.
* **Seamless Integration:** Consolidate data from Segment and other sources to enable responsive, real-time experiences.
* **Scalability:** Effortlessly support complex queries and high-velocity data without compromising on speed or cost efficiency.

This destination is maintained by SingleStore. For any issues with the destination, [contact the SingleStore Support team](https://support.singlestore.com/){:target="_blank”}.

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "SingleStore".
2. Select "SingleStore" and click **Add Destination**.
3. Select an existing Source to connect to SingleStore (Actions).
4. Enter a name for your SingleStore (Actions) destination, update any additional settings, then click **Save**. 
6. Navigate to the Mappings tab for your SingleStore destination and click **New Mapping**.
7. Select **Send Data**. 
8. In the Map fields section, select your database from the list presented.
9. Click **Next** and then **Save**.  

{% include components/actions-fields.html %}

### Finding your SingleStore connection settings
To find your SingleStore connection settings, head to the [SingleStore Portal](https://portal.singlestore.com){:target="_blank”} and complete the following steps:
1. Select **Deployments**.
2. Choose your Workspace and Database within the list of Deployments
3. From the Connect dropdown, select **Connect to your own app**. SingleStore will display the the key settings you need to connect your SingleStore database to Segment. 

## Database structure
Segment creates a table called `segment_raw_data` and writes data to your SingleStore database using the following schema:

| Column |	Type	| Description |
| -------- | ------ |  ----------- |
| `message` |	JSON (utf8_bin) |	The entire message received from Segment, in JSON format |
| `timestamp` |	datetime |	The timestamp of when the event was generated |
| `event` |	VARCHAR(255) |	The event name (for Track events) |
| `messageId` |	VARCHAR(255) |	The unique identifier of the event to ensure there is no duplication |
| `type` |	VARCHAR(255) |	The type of the event (for example, Identify, Track, Page, Group) |


### Accessing nested data
To query specific data from the Segment event within SingleStore, you can de-reference the JSON pointer within the message column. For example:

```sql
SELECT message::properties FROM segment_raw_data;
```

This query retrieves the properties object from the JSON message, allowing you to work with nested event data.

## Troubleshooting

### Connection Errors
If you're unable to connect to the SingleStore database:
* Verify that the Host and Port are correct.
* Ensure that your SingleStore database is accessible from Segment’s servers.
* Check firewall settings and network configurations.

### Authentication Failures
If you encounter authentication errors when Segment attempts to connect:
* Confirm that the Username and Password are correct.
* Ensure that the user has the necessary permissions to write to the database.

### Data Not Appearing in SingleStore
If events are not recorded in the `segment_raw_data` table:
* Verify that your sources are correctly sending data to Segment.
* Check the event types to ensure they are supported.
* Review your SingleStore database logs for any errors.

## Frequently Asked Questions
### Can I customize the schema used in SingleStore?

By default, the mappings store the complete raw Segment events in the `segment_raw_data` table. If you prefer, within the mapping, you can choose to selectively include or exclude specific fields to be sent and written into SingleStore.

### How does SingleStore handle data types from Segment?

All event data is stored natively as JSON in the message column. This allows for flexible schema management and easy access to nested properties using SQL queries.  SingleStore's ability to dynamically and quickly parse the JSON allows all types of complex events to be queried or used in notebooks.

### Is the data ingestion process real-time?

Yes, Segment forwards data to SingleStore in real-time, enabling immediate analysis and action on your customer data.  Generally data is available in the SingleStore database within a few seconds of Segment sending the event.