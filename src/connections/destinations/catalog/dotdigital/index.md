---
title: Dotdigital Destination
id: 68370e58cb330586908573b7
beta: true
redirect_from: "/docs/connections/destinations/catalog/actions-dotdigital/"
---
{% include content/plan-grid.md name="actions" %}

[Dotdigital](https://dotdigital.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is an all-in-one customer experience and data platform (CXDP) that empowers marketing teams to exceed customer expectations with highly personalized cross-channel journeys.

This destination is maintained by Dotdigital. For any issues with the destination, [contact the Dotdigital Support team](mailto:support@dotdigital.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "Dotdigital".
2. Select Dotdigital and click **Add Destination**.
3. Select an existing Source to connect to Dotdigital (Actions).
4. Log in to your [Dotdigital account](https://login.dotdigital.com/){:target="_blank"}. Expand the User menu in the bottom left and go to Settings > Access > API users.
5. Note your API region (r1, r2 or r3) for step 7.
6. Create a [new API user](https://developer.dotdigital.com/docs/setting-up-an-api-user){:target="_blank"}. 
7. In Segment, select your Dotdigital account region and paste the **API user** and **API password** in the Dotdigital destination settings.

{% include components/actions-fields.html %}

## Additional context

### Add Contact to List
Before using the Add Context to List Action, complete the following prerequisites: 

- **Lists**: [Create a contact list in Dotdigital](https://support.dotdigital.com/en/articles/8198769-create-a-contact-list) {:target="_blank"}. After you've created a list in Dotdigital, return to the Segment app and select your list from the dropdown in the Segment event mapping.
- **Data Fields**: [Create or edit your data fields in Dotdigital](https://support.dotdigital.com/en/articles/8198833-create-delete-and-edit-custom-data-fields){:target="_blank"}, then return to the Segment app, open the event mapping, and map Segment properties to Dotdigital data fields.

### Enroll Contact to Program
When you use the Enroll Contact to Program action, Dotdigital creates a contact for the identifier you provide, if the contact doesn't already exist. 

### Send SMS
Only valid mobile numbers with an international dialing prefix in E.164 format will be accepted. This format is a combination of `+[country code][phone number]`. For example: `+12133734253`.

### Send Transactional SMS
- Only valid mobile numbers with an international dialing prefix in E.164 format will be accepted. This format is a combination of `+[country code][phone number]`. For example: `+12133734253`.
- You must have SMS pay-as-you-go enabled to use this action. Learn more about how to enable SMS pay-as-you-go in [Dotdigital's documentation](https://support.dotdigital.com/en/articles/8199154-understand-sms-pay-as-you-go-and-spend-limit){:target="_blank"}.
