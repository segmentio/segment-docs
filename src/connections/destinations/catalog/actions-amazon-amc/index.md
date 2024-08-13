---
title: Amazon Ads DSP and AMC Destination
id: 66543798b2fb3cb3e9ff992c
---

{% include content/plan-grid.md name="actions" %}

[Amazon Ads](https://advertising.amazon.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} can help you achieve your marketing goals, whether that's building brand awareness, driving sales, or increasing customer loyalty. 

The Segment - Amazon Ads DSP and AMC integration allows users to connect their Engage Audiences to Amazon Ads to run ads based on certain attributes & audiences defined in Segment, like the people who have visited your site.
 
This destination is maintained by Segment. For any issues with the destination, [contact the Segment Support team](mailto:friends@segment.com).

## Getting started

### Add the destination to your Engage Space. 

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Amazon Ads DSP and AMC".
2. Select Amazon Ads DSP and AMC and click **Add Destination**.
3. Select the **Engage Space** you'd like to add the destination to.
4. Once added, view and input the settings you'd need to complete to configure the destination. 
  - **Connection**: Click **Connect to Amazon Ads DSP and AMC** to authenticate your destination with Amazon.
  - **Region**: Select the Amazon Region to deliver data to: NA, EU, or FE.
  - **Enable the destination**: Switch the toggle to on to enable your destination. 

### Connect your Engage Audience(s) to the destination

1. Navigate to the desired Audience in Engage, and select **Add Destination**.
2. Select the **Amazon Ads DSP and AMC** destination you just created.
4. After adding your destination to the Engage audience, click on the destination from the audience page to view and complete the [audience-specific settings](https://advertising.amazon.com/API/docs/en-us/amc-advertiser-audience#tag/Audience-Metadata){:target="_blank"}. 
  - **Advertiser ID**:
  - [**Country Code**](https://advertising.amazon.com/API/docs/en-us/guides/amazon-marketing-cloud/audiences/audience-management-service#country-code){:target="_blank"}: A 2-character string in the ISO 3166 format that will be applied for all records within the audience.
  - (Optional) **CPM Cents**: Cost per thousand impressions (CPM), in cents. For example, $1.00 = 100 cents.
  - (Optional) **Currency**:
  - **Description**: The audience description. Must be an alphanumeric, non-null string between 0 to 1000 characters in length.
  - **External Audience ID**: The user-defined audience identifier. This should be a unique, user-defined audience identifier (For example., "audience-id-for-device").
  - **TTL**: Time-to-live, in seconds. The amount of time the record is associated with the audience. Values allowed are 0 .. 34300800 (For example, 2592000 for 30 days, 34300800 for 397 days). 

### Configure your mappings

1. Click on the destination from the audience page, and navigate to **Matching Mappings** from the destination side view.
2. Click **Add mapping**.
3. Configure the mapping fields.
4. Save and enable the mapping.
5. When Segment computes the audience, you can see the created audience and records delivered to Amazon.

{% include components/actions-fields.html %}

