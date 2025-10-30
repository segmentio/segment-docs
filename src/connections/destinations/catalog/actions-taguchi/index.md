---
title: Taguchi (Actions)Destination
---

{% include content/plan-grid.md name="actions" %}

[Taguchi](https://taguchi.com.au){:target="_blank”} is a distributed customer engagement platform that allows you to communicate with your customers the way you’ve always wanted, but never thought you could. We offer advanced solutions across various industries, including digital marketing, customer engagement, loyalty, marketing automation, customer re-targeting campaigns, and local area digital marketing

This destination is maintained by Taguchi. For any issues with the destination, [contact their Support team](mailto:support@taguchi.com).


## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog) search for "taguchi".
2. Select taguchi and click **Add Destination**.
3. Select an existing Source to connect to Taguchi (Actions).
4. Go to the [Taguchi credential dashboard](https://login.taguchi.com.au/<organization>/settings/credentials), add and copy this new credential **API key** to be used in APIv5 integration for Segment.
5. Enter the **API Key** in the Taguchi destination settings in Segment.
6. Go to the [Taguchi integration dashboard](https://login.taguchi.com.au/<organization>/settings/integration), and proceed to create a new integration. 
- Fill in appropriate IntegrationName
- select API: V5 endpoint(authenticated) type
-  Select the newly created credential in step 4 in the credential to use drop down
-  Select the External ID (ref) in the identify profiles by drop down
- Tick the required and appropriate checkboxes 
- Once the above steps are completed, proceed to save and activate this newly created integration
7. Copy the ***Production Endpoint URL*** in the integration created in the previous step to the Taguchi destination settings in Segment
8. Fill in the organization ID found in taguchi dashboard to the ***Organization ID*** field in the Taguchi destination settings in Segment.

{% include components/actions-fields.html settings="true" %}

## Identify (Sync User Profile)
1. To sync identify profiles from segment to Taguchi, we will select ***Sync User Profile*** in the set up mapping.
2. Select ***event type*** is ***Identify*** in the define event trigger section where each of the user recorded traits on Segment will be mapped to the corresponding Taguchi fields and send to Taguchi as subscriber profile.

## Track (Sync Event)
1. To sync identify profiles actions from segment to Taguchi, we will select ***Sync Event*** in the set up mapping.
2. Select ***event type*** is ***Track*** in the define event trigger section where each of the user recorded action on Segment will be mapped to the corresponding Taguchi fields and send to Taguchi as subscriber event.