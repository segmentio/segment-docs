---
title: LinkedIn Conversions API
id: 652e765dbea0a2319209d193
beta: true
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

1. On the Mappings tab, click on **+ New Mapping** and Select **Stream Conversion Event**. 
2. Select the events you'd like to map and send to your LinkedIn Conversions API destination.
3. Create A Conversion Rule or enter a link to an existing rule.

> warning "Ad account link cannot be updated"
> After you provide a link to your LinkedIn Ad account in this step, you cannot update the Ad account without creating a new LinkedIn Conversions API destination.

<ol style="counter-reset: none;">
  <li value="4" markdown=1>
  Configure the mappings to map event fields and user attributes from your source to the Conversion API. 
  </li>
  <li value="5" markdown=1>
  Click **Save**. 
  </li>
</ol> 

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
- `conversionHappenedAt` must be a valid timestamp (milliseconds since epoch) and must have happened in the past 90 days

Any deviations from this specification might lead to failed inputs.