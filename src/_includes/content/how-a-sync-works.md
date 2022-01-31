When Segment loads data into your warehouse, each sync goes through the following steps:
1. **Ping:** Segment servers try to connect to your warehouse. 
2. **Scan:** Segment finds new events and updated objects. 
3. **Download:** Segment pulls events and objects from AWS S3 or Dynamo into a staging area.
4. **Process:** The raw Segment event and object archive files are pulled from the staging area and transformed into database-specific formats. The [warehouse schema](schema/) is also defined in this step. 
5. **Load:** Segment de-duplicates the transformed data and loads it into your warehouse. If you have queries set up in your warehouse, they run after the data was loaded into your warehouse. 