---
title: Extensible Webhooks Destination
id: 66b1f528d26440823fb27af9
beta: true
hidden: true
---

{% include content/plan-grid.md name="actions" %}

Segment's Extensible Webhooks destination lets you send custom data payloads to any webhook endpoint. With support for flexible payload configuration, multiple authentication methods, and real-time data flow, Extensible Webhooks can help you integrate with internal systems or tools not covered by Segment’s standard destinations.

Segment maintains this destination. For any issues, [contact Segment Support](friends@segment.com).

## Overview

To set up and use Extensible Webhooks, you'll follow these four main stages:

1. **Create the new destination**: Add the Extensible Webhooks destination to your workspace and link it to a source.
2. **Set up authentication**: Configure the required authentication settings to activate the destination.
3. **Map and configure data**: Define how data flows from Segment to your webhook endpoints by mapping fields and customizing the payload.
4. **Enable the destination**: Complete the setup by enabling the destination to start sending data.

## 1. Create a new Extensible Webhooks destination

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Extensible Webhooks."
2. Select **Extensible Webhook** and Click **Add destination**.
3. Select an existing source to connect to the destination.
4. Enter a name for the destination and click **Create destination.**

By default, **the new destination is disabled**. You'll enable it in the next section.

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
     - Scopes
4. Save the settings, then click **Connect** to activate the connection.

You've now completed setup, and your destination is ready for event mapping and data configuration.

## 3. Mapping and data configuration 

With authentication in place, you can now define how data flows from Segment to your webhook endpoints. Follow these steps to configure mappings and test the setup:

1. From your destination's settings page, click **Mappings**, then **+New Mapping**.
2. On the Activate data screen, select the action you want to use.
3. Define your event trigger, then click **Load Test Event From Source**.
4. In the Map field section, define the API endpoint (URL) and the HTTP method (`POST`, `PATCH`, `PUT`).
5. Map payload fields:
   - Map individual fields or select a specific object from a test event. Segment supports batching the entire payload but not specific objects within the payload.
   - (Optional) Use a [destination insert function](/docs/connections/functions/insert-functions/) to transform the payload according to the API specification.
6. Configure optional parameters:
   - **Batch size**: Specify the batch size if the API supports batching entire payloads.
   - **Headers**: Add required headers (for example, `content-type`, which is required, defaults to `application/json`).
7. Send a test event to validate the setup. Segment logs the response from your destination so that you can debug any errors (which are usually related to the payload configuration or authentication issues).
8. Click **Save**, then click **Next**.
9. Give your mapping a name, then click **Save and enable**.

Your mapping is now enabled. Go to the next section to finish setup.

## 4. Enable the destination

Follow these steps to enable your new destination:

1. Return to **Basic Settings** in your destination's **Settings** tab.
2. Toggle **Enable Destination** to on, then click **Save Changes**.

Your Extensible Webhooks destination is now set up and ready to send data to your webhook endpoints.