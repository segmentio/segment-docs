---
title: Transcend Integration
---

[Transcend](https://transcend.io/){:target="_blank"} is a next-generation data privacy platform that helps companies reduce risk, increase operational efficiency, enable business innovation, and build customer trust by embedding privacy directly into their business systems. 

Integrating with Transcend makes it easy to locate and orchestrate personal data across Segment without custom code. Transcend allows businesses to automatically manage data in compliance with privacy regulations like GDPR and CCPA, helping with tasks like locating, deleting, or opting out of data sharing.

This integration is maintained by Transcend. For support, please [contact the Transcend Support team](mailto:support@transcend.io).

## Prerequisites

### Identify your Segment subdomain
1. Navigate to the Segment workspace you want to integrate with Transcend.
3. Find the unique workspace identifier, or subdomain, in your URL. For example, if your workspace URL is `https://app.segment.com/your-workspace-subdomain/home`, then `your-workspace-subdomain` is your subdomain. Remember this value or copy it to a safe place, as you will need it to set up your Transcend integration.

### Create an API key
1. Open your Segment workspace and navigate to **Settings** at the bottom of the left navigation bar.
2. Under **Workspace Settings**, select **Access Management**.
3. In the **User Access Management** pane, switch from **User** to **Tokens** view.
4. Click **Create Token** and select the **Public API** token type.
5. Assign the Public API token the following permissions:

    - **Privacy Permissions**: Workspace Owner level permissions for handling erasure requests.
    - **Data Silo Discovery Permissions**: Workspace Member level permissions with "function read-only" access for all functions.

## Connect with Transcend

1. In Transcend, add the Segment integration from the Transcend catalog.
2. Enter your Segment subdomain and API key in the provided input fields.
3. Connect the integration.
4. Configure data points if using the integration for privacy requests. Erasure and tracking opt-out for Segment data are enabled by default.
5. If needed, enable the **Data Silo Discovery** plugin in the **Configuration** tab.

## Privacy requests
Transcend facilitates privacy requests using Segment's API, including erasure and tracking opt-out for Segment users. Note that this integration only manages requests within Segment. To delete data from upstream systems, you should connect those systems directly to Transcend.

### Erasure requests
Transcend will:
- Use the provided Segment `userID` to delete historical data.
- Send a `SUPPRESS_ONLY` regulation request to Segment. *For more information about Segment's regulation requests, see the [User Deletion and Suppression](/docs/privacy/user-deletion-and-suppression/) documentation.* 
- Follow up with a `DELETE_INTERNAL` regulation request and poll until completion. *For more information about Segment's regulation requests, see the [User Deletion and Suppression](/docs/privacy/user-deletion-and-suppression/) documentation.* 
  
Segment's dashboard currently does not display `DELETE_INTERNAL` regulations: they are only accessible through Segment's API.

### Enrichment
Transcend can identify Segment users based on a defined `userId`. Configure identifiers in Transcend to track users within Segment.

### Data mapping
The Segment integration includes a **Data Silo Discovery** plugin to identify additional services your company uses. This helps build a comprehensive data map. Enabling silo discovery allows Transcend to scan Segment’s sources and destinations, identifying app names and domains. 

Note: If you are only using Data Mapping, the Transcend integration does not need access to employee or customer personal data.
