---
title: Accoil Destination
hide-boilerplate: true
hide-dossier: false
beta: true
private: true
---

{% include content/plan-grid.md name="actions" %}

<!-- Include a brief description of the destination here, along with a link to your website. -->

[Accoil](https://www.accoil.com) is a product analytics platform built specifically for B2B go-to-market (GTM) teams, including product, sales, marketing, customer success, and support. It enables you to track feature adoption, monitor user journeys, and enhance activation and conversion rates. By sending your product event data to Accoil via Segment, you unlock actionable insights that drive informed decisions across your organization.

Any questions or for help, please [contact us](https://help.accoil.com).

<!-- In the section below, explain the value of this actions-based destination. If you don't have a classic version of the destination, remove this section. -->

## Benefits of Integrating with Accoil

- **Comprehensive Analytics**: Gain detailed insights into your product's performance across features, customer segments, and stages of the user journey.
- **Enhanced Collaboration**: Create account- and user-level audiences that trigger timely actions across tools like Slack, Intercom, HubSpot, and more.
- **Actionable Insights**: Teams from sales to customer success can leverage Accoil’s data to make informed decisions, improve engagement, and uncover growth opportunities.
- **Seamless Integration**: Accoil integrates effortlessly with popular tools such as HubSpot, Intercom, Slack, and Segment itself, making it easy to utilize your product data within your existing workflows.
- **User-Friendly Interface**: Designed to be intuitive, Accoil allows any team to build and use product engagement profiles without needing advanced analytical skills.

## How It Works

Accoil is most effective when used with Segment. Here’s how it functions:

1. **Send Event Data**: Use Segment to funnel your product event data into Accoil. Focus on the events that are most significant to your product and users.
2. **Build Engagement Profiles**: Teams can easily create and manage product engagement profiles, helping monitor feature adoption, user engagement, and buyer journey stages.
3. **Connect to Your Tools**: Once your profiles are set up, Accoil connects to your GTM tools—like Slack, Intercom, HubSpot, and more. With detailed account and user insights, teams can take meaningful actions, such as alerting sales about accounts that have reached key milestones or notifying customer success about potential churn risks.

## Getting Started

To start using the Accoil destination:

1. **Access the Destination Catalog**: In your Segment workspace, navigate to the Catalog page and search for "Accoil."
2. **Add the Destination**: Select Accoil from the results and click "Add Destination."
3. **Connect a Source**: Choose the Segment source you want to connect to Accoil.
4. **API Key Setup**: In your Accoil dashboard, find your API Key under **General Account Settings**. Copy this API Key.
5. **Configure in Segment**: Paste the API Key into the Accoil destination settings within Segment, then click "Connect" to complete the integration.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

<!--
Additional Context

Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.
-->

## Supported Methods

Accoil supports the following Segment methods, which map directly to Accoil’s API:

**1. Identify**

**Purpose**: Recognizes individual users and their attributes.

**Example Call**:
   ```javascript
   analytics.identify('userId123', {
     email: 'user@example.com',
     name: 'John Doe',
     createdAt: '2023-05-12T08:00:00Z'  // ISO 8601 or Unix timestamp format
   });
   ```

**2. Group**

**Purpose**: Links users to accounts and records account-level attributes.

**Example Call**:
   ```javascript
   analytics.group('accountId123', {
     name: 'Example Company',
     createdAt: '2021-03-15T09:00:00Z',  // ISO 8601 or Unix timestamp format
     mrr: 3000,
     status: 'active'
   });
   ```

**3. Track**

**Purpose**: Records specific user actions, such as "Login" or "Purchase."

**Recommendation:** Use the Noun_Verb format to name your events, e.g., `Report Created`, `Purchase Completed`.

**Example Call**:
   ```javascript
   analytics.track('Purchase Completed', {
     item: 'Book',
     price: 25.00
   });
   ```

**4. Page and Screen**

**Purpose**: Converts navigation calls into Track events to monitor user interactions within your product.

**Example Calls**:
   ```javascript
   analytics.page('Home Page');
   analytics.screen('Dashboard');
   ```

**In Accoil**: These calls are transformed into events such as `Page Viewed Home Page` and `Screen Viewed Dashboard`, with the page or screen name as the event name.

## Key Notes

- **Created At Date**: Ensure the `createdAt` field for users and accounts is in ISO 8601 or Unix timestamp format for accurate tenure tracking.
- **Trait Handling**: Accoil stores traits sent with Identify and Group calls, but traits passed with Track calls are not stored. Only event names and counts are recorded.
- **Event Aggregation**: Accoil simplifies event tracking by aggregating daily event counts.
- **Page and Screen Calls**: These calls are automatically converted into Track events for easier monitoring of user navigation.

This integration empowers your team to make data-driven decisions, improving your product and customer experiences. For further assistance, please contact the Accoil Support team.
