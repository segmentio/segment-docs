---
title: Taguchi (Actions) Destination
id: 68b6ddcd033b3f6d006d8e1f
beta: true
---

{% include content/plan-grid.md name="actions" %}

[Taguchi](https://taguchi.com.au){:target="_blank”} is a distributed customer engagement platform designed to help you communicate with customers. Taguchi provides tools for digital marketing, customer engagement, loyalty, marketing automation, targeting campaigns, and localized digital marketing.

This destination is maintained by Taguchi. For any issues with the destination, [contact the Taguchi support team](mailto:support@taguchi.com){:target="_blank”}.

## Getting started

1. In your Segment workspace, go to the [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog) and search for "Taguchi".
2. Select the Taguchi (Actions) destination and click **Add Destination**.
3. Select an existing source to connect to Taguchi (Actions).
4. Go to the [Taguchi credential dashboard](https://login.taguchi.com.au/<organization>/settings/credentials){:target="_blank”}. Create a new credential and copy the **API key**.
5. In Segment, paste the **API Key** in the Taguchi destination settings.
6. Next, go to the [Taguchi integration dashboard](https://login.taguchi.com.au/<organization>/settings/integration){:target="_blank”} and create a new integration.
7. Configure the integration:
- Give it an appropriate `IntegrationName`.
- Select API: **V5 endpoint (authenticated)** type.
- Select the credential in Step 4 from the credential dropdown.
- Select the **External ID (ref)** option in the Identify Profiles dropdown.
- Enable the required checkboxes.
8. Save and activate the integration.
9. Copy the **Production Endpoint URL** from Taguchi. Return to Segment and paste the **Production Endpoint URL** in the Taguchi destination settings.
10. Enter the **Organization ID** (found in the Taguchi dashboard). 

{% include components/actions-fields.html settings="true" %}

## Identify (Sync User Profile)

Use [Identify](docs/connections/spec/identify) calls to sync user profile data toTaguchi. When configuring mappings in the destination setup:

1. Select **Sync User Profile**.
2. Define the **Event type** as **Identify**.

Segment maps user traits to corresponding Taguchi fields, sending them to Taguchi as a subscriber profile.

## Track (Sync Event)

Use [Track](docs/connections/spec/track/) calls to sync event data to Taguchi. When configuring mappings in the destination setup:

1. Select **Sync Event**.
2. Define the **Event type*** as **Track**.

Segment maps user actions to corresponding Taguchi fields, sending them to Taguchi as subscriber events.
