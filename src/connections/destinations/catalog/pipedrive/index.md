---
title: Actions Pipedrive
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

The Actions Pipedrive destination is an integration that allows customers to share events from Segment directly to Pipedrive.
When you use Pipedrive with Segment, you don’t need to manually export and upload data to Pipedrive. Your customer data will remain up to date in real time and across all enabled integrations.
Every tool you use to interact with leads and customers will land in Pipedrive, so you can always have a clear picture in front of you.

{% include content/ajs-upgrade.md %}

## Benefits of Actions Pipedrive

Actions Pipedrive provides the following benefits:

- **Clear mapping of data**.  Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to Pipedrive.
- **Maximum event measurement**. Capture more events with improved accuracy across different browsers, apps, and devices to get a unified view of your customer’s journey from page view to purchase.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure "Actions Pipedrive"**.
4. Select an existing Source to connect to "Actions Pipedrive".
5. When adding Pipedrive as a destination, you will be redirected to the basic settings page, where you need to enter the destination name as well as Pipedrive's domain and API token.
6. To complete the installation process, switch to advanced settings and enter your Pipedrive IDs.

To set up the Segment integration with your Pipedrive account, go to either your Marketplace menu within your settings or directly to Pipedrive's Marketplace.
From there, search for Segment and click on "Install now"
A new window will pop up and prompt you to allow Segment to connect with Pipedrive.
Choose the Pipedrive account you wish to connect to. Then, click "Allow and Install".
Once the installation is successful, you will be redirected to Segment for account authentication.

{% include components/actions-fields.html %}

## Available Actions
Build your own Mappings! Combine supported triggers with the following Pipedrive -supported actions:
- **Create or update a person**
- **Create or update an activity**
- **Create or update a lead**
- **Create or update a note**
- **Create or update a deal**
- **Create or update an organization**.

### Identify
Segment sends Identify calls to Pipedrive as an identify event. When you identify a new user, Pipedrive creates a new User or Company. If the Use or Company already exists, Pipedrive updates the properties.

### Track
Segment sends Track calls to Pipedrive as a track event. They can be used in Pipedrive as event sources. You can create an Activity, or update Custom Fields or store it in the notes for the Deals or create/update the Deal.
