---
title: Extensible Webhooks Destination
id: 66b1f528d26440823fb27af9
---

{% include content/plan-grid.md name="actions" %}

Segment's Extensible Webhooks destination lets you send custom data payloads to any webhook endpoint. With support for flexible payload configuration, multiple authentication methods, and real-time data flow, Extensible Webhooks can help you integrate with internal systems or tools not covered by Segment’s standard destinations.

Segment maintains this destination. For any issues, [contact Segment Support](friends@segment.com).

## 1. Create a new Extensible Webhooks destination

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Extensible Webhooks."
2. Select **Extensible Webhook** and Click **Add destination**.
3. Select an existing source to connect to the destination.
4. Enter a name for the destination and click **Create destination.**

By default, the new destination is disabled. You'll enable it in the next section.

## 2. Set up authentication

Before you can enable the new destination, you'll first need to choose an authentication option:

1. On the new destination's page, navigate to **Settings > Authentication.**
2. Choose one of the following authentication options:
   - **No authentication**: Segment doesn't manage authentication.
   - **Bearer token**: Segment automatically includes a bearer token in the API request header.
   - **OAuth 2.0**: Segment manages the OAuth token lifecycle, including fetching and refreshing tokens.
3. For OAuth 2.0, select one of the following flows:
   - **Authorization code**, which requires the following fields:
     - Client ID
     - Client secret
     - Authorize URL
     - Access Token URL
     - Refresh Token URL (usually the same as the Access Token URL)
     - Scopes
   - **Use client credentials**, which requires the following:
     - Client ID
     - Client Secret
     - Access Token URL
     - Refresh Token URL (usually the same as the Access Token URL)
     - Scope
4. Save the settings, then click **Connect** to activate the connection.

You've now completed setup, and your destination is ready for event mapping and data configuration.

## Mapping and data configuration

1. Define the API endpoint (URL) and the HTTP method (POST, PATCH, PUT).
2. Configure optional parameters:
   - **Batch Size**: Specify batch size if the API supports batching entire payloads.
   - **Headers**: Add required headers (e.g., `content-type` defaults to `application/json`).
3. Map payload fields:
   - Map individual fields or select a specific object from a test event.
   - (Optional) Use a destination insert function to transform the payload according to the API specification.
4. Send a test event to validate the setup. Debug any errors related to payload configuration or authentication.

> **Note**: Segment supports batching the entire payload but not specific objects within the payload.

## Known limitations

- **Token Expiration Issue**: If a token expires before a test event is sent, the test event may fail with a 401 error. Workarounds include:
  1. Using the **Event Tester** to validate connections.
  2. Reconnecting OAuth by editing and saving settings to fetch a new token.

## Enabling the destination

1. Enable the destination in the **Settings** page if it is not already enabled.
2. Save the configuration to ensure "Extensible Webhooks" is live.


