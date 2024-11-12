---
title: Transcend Integration
---

[Transcend](https://transcend.io/){:target="_blank"} is a next-generation data privacy platform that helps companies reduce risk, increase operational efficiency, enable business innovation, and build customer trust by embedding privacy directly into their business systems. 

Integrating with Transcend makes it easy to locate and orchestrate personal data across Segment without custom code. Transcend allows businesses to automatically manage data in compliance with privacy regulations like GDPR and CCPA, helping with tasks such as locating, deleting, or opting out of data sharing.

This integration is maintained by Transcend. For support, please [contact their Support team](mailto:support@transcend.io).

## Prerequisites

### Find Your Segment Subdomain
1. Navigate to your Segment workspace.
2. Select the workspace you wish to integrate with Transcend.
3. The subdomain is the unique workspace identifier in your URL. For example, if your workspace URL is `https://app.segment.com/your-workspace-subdomain/home`, then `your-workspace-subdomain` is the value Transcend requires.

### Create an API Key
1. In your workspace, go to **Settings** at the bottom of the left navigation bar.
2. Under **Workspace Settings**, select **Access Management**.
3. In the **User Access Management** pane, switch from **User** to **Tokens** view.
4. Click **Create Token** and select the **Public API** token type.
5. Assign minimal permissions needed for data mapping, with additional permissions for privacy and data governance:

    - **Privacy Permissions**: Workspace Owner level permissions for handling erasure requests.
    - **Data Silo Discovery Permissions**: Workspace Member level permissions with "function read-only" access for all functions.

## Steps to Connect

1. Enter your Segment subdomain and API key in Transcend.
2. Connect the integration.
3. Configure data points if using the integration for privacy requests (e.g., erasure and tracking opt-out for Segment data are enabled by default).
4. If needed, enable the **Data Silo Discovery** plugin in the **Configuration** tab.

## Privacy Requests
Transcend facilitates privacy requests via Segment's API, including erasure and tracking opt-out for Segment users. Note that this integration only manages requests within Segment. To delete data from upstream systems, you should connect those systems directly to Transcend.

### Note on Erasure Requests
Transcend will:
- Use the provided Segment User ID to delete historical data.
- Send a Suppress regulation request to Segment, then wait until processed.
- Follow up with a Delete_Internal regulation request and poll until completion.
  
As of 6/25/2021, Segment's dashboard does not display Delete_Internal regulations; they are only accessible via API.

### Enrichment
Transcend can identify Segment users based on a defined `userId`. Configure identifiers in Transcend for tracking users within Segment.

### Data Mapping
The Segment integration includes a **Data Silo Discovery** plugin to identify additional services your company uses. This helps build a comprehensive data map. Enabling silo discovery allows Transcend to scan Segment’s sources and destinations, identifying app names and domains. Note: if solely using Data Mapping, the integration does not need access to employee or customer personal data.
