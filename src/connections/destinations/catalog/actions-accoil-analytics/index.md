---
title: Accoil Analytics Destination
hide-boilerplate: true
hide-dossier: false
id: 65cb48feaca9d46bf269ac4a
---

{% include content/plan-grid.md name="actions" %}


[Accoil](https://www.accoil.com){:target="_blank”} is a product analytics platform built specifically for B2B go-to-market (GTM) teams, like product, sales, marketing, customer success, and support. It enables you to track feature adoption, monitor user journeys, and enhance activation and conversion rates. By sending your product event data to Accoil using Segment, you unlock actionable insights that drive informed decisions across your organization.

For any questions or help with Accoil, [contact the Accoil support team](https://help.accoil.com){:target="_blank”}.


## Benefits of integrating with Accoil

- **Comprehensive Analytics**: Gain detailed insights into your product's performance across features, customer segments, and stages of the user journey.
- **Enhanced Collaboration**: Create account- and user-level audiences that trigger timely actions across tools like Slack, Intercom, HubSpot, and more.
- **Actionable Insights**: Teams from sales to customer success can leverage Accoil’s data to make informed decisions, improve engagement, and uncover growth opportunities.
- **Seamless Integration**: Accoil integrates effortlessly with popular tools like HubSpot, Intercom, Slack, and Segment itself, making it easy to utilize your product data within your existing workflows.
- **User-Friendly Interface**: Designed to be intuitive, Accoil allows any team to build and use product engagement profiles without needing advanced analytical skills.

## How it works

Accoil is most effective when used with Segment. Here’s how it functions:

1. **Send event data**: Use Segment to funnel your product event data into Accoil. Focus on the events that are most significant to your product and users.
2. **Build engagement profiles**: Teams can easily create and manage product engagement profiles, helping monitor feature adoption, user engagement, and buyer journey stages.
3. **Connect to your tools**: Once your profiles are set up, Accoil connects to your GTM tools—like Slack, Intercom, HubSpot, and more. With detailed account and user insights, teams can take meaningful actions, like alerting sales about accounts that have reached key milestones or notifying customer success about potential churn risks.

## Getting Started

To start using the Accoil destination:

1. In your Segment workspace, navigate to the [Catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog/){:target="_blank"} and search for "Accoil Analytics".
2. Select Accoil Analytics from the results and click **Add Destination**.
3. Choose the Segment source you want to connect to Accoil.
4. Navigate to your Accoil dashboard and find your API Key under **General Account Settings**. Copy this API Key.
5. Paste the API Key into the Accoil destination settings within Segment, then click "Connect" to complete the integration.


{% include components/actions-fields.html %}


## Supported methods

Accoil supports the following Segment methods, which map directly to Accoil’s API:

### Identify

Identify calls recognize individual users and their attributes.

Example Call:
   ```javascript
   analytics.identify('userId123', {
     email: 'user@example.com',
     name: 'John Doe',
     createdAt: '2023-05-12T08:00:00Z'  // ISO 8601 or Unix timestamp format
   });
   ```

### Group

Group calls link users to accounts and records account-level attributes.

Example Call:
   ```javascript
   analytics.group('accountId123', {
     name: 'Example Company',
     createdAt: '2021-03-15T09:00:00Z',  // ISO 8601 or Unix timestamp format
     mrr: 3000,
     status: 'active'
   });
   ```

### Track

Track calls record specific user actions, like "Login" or "Purchase".

Use the "Noun_Verb" format to name your events, for example, `Report Created` or `Purchase Completed`.

Example Call:
   ```javascript
   analytics.track('Purchase Completed', {
     item: 'Book',
     price: 25.00
   });
   ```

### Page and Screen

Page and Screen calls convert navigation calls into Track events to monitor user interactions within your product.

Example Calls:
   ```javascript
   analytics.page('Home Page');
   analytics.screen('Dashboard');
   ```

## Key Notes

- **Created At Date**: Ensure the `createdAt` field for users and accounts is in ISO 8601 or Unix timestamp format for accurate tenure tracking.
- **Trait Handling**: Accoil stores traits sent with Identify and Group calls, but traits passed with Track calls are not stored. Only event names and counts are recorded.
- **Event Aggregation**: Accoil simplifies event tracking by aggregating daily event counts.
- **Page and Screen Calls**: These calls are automatically converted into Track events for easier monitoring of user navigation.

This integration empowers your team to make data-driven decisions, improving your product and customer experiences. For further assistance, please [contact the Accoil support team](https://help.accoil.com){:target="_blank”}.
