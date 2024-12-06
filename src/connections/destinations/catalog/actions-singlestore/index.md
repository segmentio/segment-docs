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
4. Enter the settings to connect to your SingleStore instance
5. Click "Save"
6. Now go to your "Mappings" and click "New Mapping"
7. Select "Send Data"
8. Within "Map fields", select your database from the list presented
9. Click "Next" and then "Save"
10. Voila!  Your data should start flowing into your SingleStore database within moments.

{% include components/actions-fields.html %}

### Finding your SingleStore connection settings
You can generally find your SingleStore connection settings by heading to the [SingleStore Portal](https://portal.singlestore.com) and following these steps:
1. Select "Deployments"
2. Choose your Workspace and Database within the list of Deployments
3. Click "Connect" dropdown
4. Choose Connect to your own app and that will provide the key settings

## The database structure
Segment creates a table called `segment_raw_data` and writes data to your SingleStore database using the following schema.

### Columns in the segment_raw_data table
|Column|	Type	|Description|
|-|-|-|
|`message`|	JSON (utf8_bin)|	The entire message received from Segment in JSON format|
|`timestamp`|	datetime|	The timestamp of when the event was generated|
|`event`|	VARCHAR(255)|	The event name (for Track events)|
|`messageId`|	VARCHAR(255)|	The unique identifier of the event to ensure there is no duplication|
|`type`|	VARCHAR(255)|	The type of the event (e.g., identify, track, page, group)|


### Accessing Nested Data
To query specific data from the Segment event within SingleStore, you can de-reference the JSON pointer within the message column. For example:
```
SELECT message::properties FROM segment_raw_data;
```
This query retrieves the properties object from the JSON message, allowing you to work with nested event data.

## Troubleshooting

### Connection Errors
**Issue:** Unable to connect to the SingleStore database.

**Solution:**
* Verify that the Host and Port are correct.
* Ensure that your SingleStore database is accessible from Segment’s servers.
* Check firewall settings and network configurations.

### Authentication Failures
**Issue:** Authentication errors when Segment attempts to connect.

**Solution:**
* Confirm that the Username and Password are correct.
* Ensure that the user has the necessary permissions to write to the database.

### Data Not Appearing in SingleStore
**Issue:** Events are not being recorded in the segment_raw_data table.

**Solution:**
* Verify that your sources are correctly sending data to Segment.
* Check the event types to ensure they are supported.
* Review your SingleStore database logs for any errors.

## Frequently Asked Questions
### Can I customize the schema used in SingleStore?

By default, the mapping is predefined to store the complete raw Segment events in the segment_raw_data table. If you prefer, within the mapping, you can choose to selectively include or exclude specific fields to be sent and written into SingleStore.

### How does SingleStore handle data types from Segment?

All event data is stored natively as JSON within the message column. This allows for flexible schema management and easy access to nested properties using SQL queries.  SingleStore's ability to dynamically and quickly parse the JSON allows all types of complex events to be queried or used in notebooks.

### Is the data ingestion process real-time?

Yes, Segment forwards data to SingleStore in real-time, enabling immediate analysis and action on your customer data.  Generally data is available in the SingleStore database within a few seconds of Segment sending the event.