When Segment loads data into your warehouse, each sync goes through the following steps:
1. **Ping:** Segment servers connect to your warehouse. For Redshift warehouses, Segment also runs a query to determine how many slices a cluster has. 
2. **Scan:** Segment finds new events in AWS S3 and updated objects in Dynamo. 
3. **Download:** Segment pulls the events and objects into a staging area.
4. **Process:** The raw Segment event and object archive files are transformed into database-specific formats. The [warehouse schema](/docs/connections/storage/warehouses/schema/) is also defined in this step. 
5. **Load:** Segment de-duplicates the transformed data and loads it into your warehouse. If you have queries set up in your warehouse, they run after the data is loaded into your warehouse. ***This is the only step that connects to your warehouse: all other steps are internal to Segment.*** 