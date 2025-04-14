---
title: LinkedIn Conversions API Destination
id: 652e765dbea0a2319209d193
---

The LinkedIn Conversions API (CAPI) is a conversion tracking tool that creates a direct connection between marketing data from an advertiser’s server and LinkedIn. This integration enables advertisers to measure the performance of their LinkedIn marketing campaigns no matter where the conversion happens and use this data to power campaign optimization. The Conversions API can help strengthen performance and decrease cost per action with more complete attribution, improved reliability, and optimized delivery.

This destination is maintained by Segment. For any issues with the destination, [contact the Segment Support team](mailto:friends@segment.com).

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “LinkedIn Conversions API” in the Destinations Catalog, and select the destination.
3. On the LinkedIn Conversions API overview page, click **Add destination**.
4. Select the source that you want to connect to the LinkedIn Conversions API and click **Next**.
5. Enter a name for your destination and click **Create destination**. 
6. On the Settings tab, click Connect to `[destination-name]` and follow the prompts to authenticate with LinkedIn using OAuth. 
7. Enable the destination and click **Save Changes**.

### Set up a mapping to Stream Conversion Events

Follow the steps in the Destination Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings). You must create 1 mapping for every conversion rule. After you create a conversion rule, you cannot update the connected LinkedIn Ad account.  

1. On the Mappings tab, click on **+ New Mapping** and Select **Stream Conversion Event**. 
2. Select the events you'd like to map and send to your LinkedIn Conversions API destination.
3. Create a conversion rule or enter the link to an existing rule. _If you chose to create a new conversion rule, Segment creates the conversion rule as soon as you click **Save**._  
4. Configure the mappings to map event fields and user attributes from your source to the Conversion API. 
5. Click **Save**. 

After you've created a Stream Conversion Event mapping, Segment displays the connected rule for each mapping on the Mappings tab. To update the conversion rule you created, select the menu icon for the mapping you'd like to update and click **Edit Mapping**. Scroll to section 3, Create a Conversion Rule, and select **Edit your configuration**. After making changes to your conversion rule, click **Save** to save your changes. You can make changes to all fields except for the Ad account field. After you save your changes, Segment updates the conversion rule in LinkedIn. 

{% include components/actions-fields.html %}

## FAQ and troubleshooting

### Why are my inputs failing?

Your inputs must meet the following criteria: 
- Contains a valid URN with the following format: <br> `urn:lla:llaPartnerConversion:id`
- The authenticated user must have write access to the ad account used to create conversion rules
- Contains a userInfo combination that requires firstName and lastName **OR** a userId mapped to at least one of the following idTypes: 
  - `SHA256_EMAIL`
  - `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID`
  - `ACXIOM_ID`
  - `ORACLE_MOAT_ID`
- `conversionHappenedAt` must be a valid epoch timestamp (milliseconds since epoch) and must have happened in the past 90 days. Segment additionally accepts [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} formatted timestamps, and converts it to a valid epoch timestamp.

Any deviations from this specification might lead to failed inputs.

### Why does LinkedIn show "no integration data" after I successfully sent the data?

One reason may be that your events are missing currency and amount fields. LinkdedIn’s API itself won't reject events due to the lack of currency and amount data, but their platform will silently drop these events later in LinkedIn’s processing. Please ensure your payload has those fields with valid values.
