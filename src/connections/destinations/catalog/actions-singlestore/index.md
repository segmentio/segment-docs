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
To connect Segment to SingleStore, use the SingleStore Data API (typically on port 443). Follow these steps to enable and locate your Data API connection settings:

1. Head to the [SingleStore Portal](https://portal.singlestore.com){:target="_blank"}.
2. Select **Deployments**.
3. Choose your Workspace and Database within the list of Deployments
4. From the Connect dropdown, select **Connect to your own app**. SingleStore will display the the key settings you need to connect your SingleStore database to Segment. 

**Note:**  
- The Data API is enabled by default for all SingleStore Cloud workspaces.  
- Segment always uses the Data API (typically on port 443).  
- If you are using a self-hosted or development SingleStore deployment (such as the SingleStore-dev image), the Data API may run on a different port. Refer to your deployment’s documentation or settings to confirm the correct port.

For more details, see the [SingleStore Data API documentation](https://docs.singlestore.com/cloud/reference/data-api/){:target="_blank"}.

## Database structure
Segment writes data to your specified table in SingleStore (by default, this is `segment_data`) using the following schema:

| Column |	Type	| Description |
| -------- | ------ |  ----------- |
| `messageId` |	TEXT |	A unique identifier for the event to ensure there is no duplication. |
| `timestamp` |	Datetime(6) |	The timestamp of when the event was generated |
| `type` |	TEXT |	The type of the event (e.g., "track", "identify", "page", "screen", "group", "alias"). |
| `event` |	TEXT |	The name of the event. Only required for "track" events. |
| `name` |	TEXT |	The name of the page or screen. |
| `properties` | JSON |	The properties of the track, page or screen event. |
| `userId` |	TEXT |	The user ID associated with the event. |
| `anonymousId` |  TEXT |	The anonymous ID associated with the event. |
| `groupId` |  TEXT |	The group ID associated with the event. |
| `traits` |  JSON |	The traits of the user associated with the event. |
| `context` |	JSON |	The context of the event. Contains user environment information. |


### Accessing data
To query specific data from the Segment event within SingleStore, you can select columns directly. For example, to retrieve the `properties` object:

```sql
SELECT properties FROM your_table_name;
```

This query retrieves the `properties` object from the specified table, allowing you to work with event data.

## Troubleshooting

> **Note:**  
> The SingleStore Data API has a limit of 1MB per request. If a batch of events sent by Segment exceeds this limit, you may see an error similar to:
> 
> ```
> Error reading request body: http: request body too large
> ```
> 
> If you encounter this error, reduce the batch size in your Segment destination settings.


### Connection Errors
If you're unable to connect to the SingleStore database:
* Verify that the credentials are correct.
* Ensure that your SingleStore database is accessible from Segment’s servers.
* Check firewall settings and network configurations.

### Authentication Failures
If you encounter authentication errors when Segment attempts to connect:
* Confirm that the Username and Password are correct.
* Ensure that the user has the necessary permissions to write to the database.

### Data Not Appearing in SingleStore
If events are not recorded in the specified table:
* Verify that your sources are correctly sending data to Segment.
* Check the event types to ensure they are supported.
* Review your SingleStore database logs for any errors.

## Frequently Asked Questions
### Can I customize the schema used in SingleStore?

By default, the mapping stores all fields from the Segment event in separate columns in the `segment_data` table. If you prefer, you can customize the mapping to selectively include or exclude specific fields to be sent and written into SingleStore.

### How does SingleStore handle data types from Segment?

All event data is stored natively as JSON in the message column. This allows for flexible schema management and easy access to nested properties using SQL queries.  SingleStore's ability to dynamically and quickly parse the JSON allows all types of complex events to be queried or used in notebooks.

### Is the data ingestion process real-time?

Yes, Segment forwards data to SingleStore in near real-time, enabling immediate analysis and action on your customer data. Generally, data is available in the SingleStore database within approximately 30 seconds of Segment sending the event.