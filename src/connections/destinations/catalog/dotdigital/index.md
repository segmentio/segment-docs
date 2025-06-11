---
title: Dotdigital Destination
---
{% include content/plan-grid.md name="actions" %}

[Dotdigital](https://dotdigital.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is an all-in-one customer experience and data platform (CXDP) that empowers marketing teams to exceed customer expectations with highly personalized cross-channel journeys.

This destination is maintained by Dotdigital. For any issues with the destination, [contact their Support team](mailto:support@dotdigital.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Dotdigital".
2. Select Dotdigital and click **Add Destination**.
3. Select an existing Source to connect to Dotdigital (Actions).
4. Log in to your [Dotdigital account](https://login.dotdigital.com/){:target="_blank"}. Expand the User menu in the bottom left and go to Settings > Access > API users.
5. Note your API region (r1, r2 or r3) for step 7.
6. Create a [new API user](https://developer.dotdigital.com/docs/setting-up-an-api-user). 
7. In Segment, select your Dotdigital account region and paste the **API user** and **API password** in the Dotdigital destination settings.

{% include components/actions-fields.html %}

## Action notes

### Add Contact to List

_Lists_
- [Create a contact list in Dotdigital](https://support.dotdigital.com/en/articles/8198769-create-a-contact-list).
- Select your list from the dropdown in the Segment event mapping.

_Data Fields_
- [Create or edit your data fields in Dotdigital](https://support.dotdigital.com/en/articles/8198833-create-delete-and-edit-custom-data-fields).
- Map Segment properties to Dotdigital data fields in the Segment event mapping.

### Enrol Contact to Program
- The action will create a contact in Dotdigital for the identifier you provide, if they don't exist already.
