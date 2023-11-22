---
title: Movable Ink (Actions) Destination
id: 6537b55db9e94b2e110c9cf9
beta: true
---

[Movable Ink](https://movableink.com/){:target="_blank"} lets email marketers deliver jaw-dropping customer experiences. Our cloud-based software activates any data to generate intelligent content at the moment of open.

This destination enables you to send Segment event data which can be used to automatically generate personalized creative at scale across email and mobile experiences.

info: This destination is maintained by Movable Ink. For any issues with the destination, please reach out to your Movable Ink Client Experience team.

## Pre-Requisites

A Movable Ink Stories license is required to leverage this integration. Please reach out to your Movable Ink client experience team with any questions.

You will need to share sample event payloads with your Movable Ink Client Experience team before enabling the destination in Segment. Your Client Experience team will then work with a Solutions Architect to map the event within Movable Ink and share an endpoint URL, access key ID and access secret. This event mapping in Movable Ink and API credentials are required for a successful response. 

### To find sample event payloads within Segment:

1. To locate sample event payloads in Segment if you plan on sending an entire existing event:
2. Navigate to ‘Sources’ and click on the source you’d like to stream data from.
3. Click ‘Debugger’. You will see a list of incoming sample events.
4. Click on the event you’re interested in. Click ‘Raw’ on the right-hand side of the screen to view a full sample payload
5. Copy and paste this sample payload and share with your client experience team.

Your client experience manager will then provide you with a Movable Ink endpoint URL, access Key ID and access secret. 

## Getting Started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for **Movable Ink (Actions)** and select it.
3. Click **Add Destination**
4. Within the Settings of your new destination input your Movable Ink API credentials into the following fields:
- Username: paste your Movable Ink Access Key ID
- Access Secret: paste your Movable Ink Access Secret
- Movable Ink URL: paste your Movable Ink Endpoint URL

## Select events and event properties to stream to Movable Ink

1. Navigate to the 'Mappings' section and create a new mapping.
2. Choose the events to be sent:
- Select the events you’d like to send to Movable Ink by adding or removing any event types (ex. Track, Identify, etc.) you’d like to send. 
- Optionally, specify events using 'Add Condition' and rules based on Event Names.
3. Preview the data:
- Load a test event from the source or use a sample event for data preview.
- Map specific fields (optional):
4. Click 'Test Mapping' to send a test event and identify any potential issues.
5. Return to the Mappings overview page and enable your mapping.
6. Finalize the setup by navigating to your integration’s Settings page and activating the integration by toggling on 'Enable Destination.'

Note: In case of unexpected errors, contact your Movable Ink client experience team with the full sample payload.

{% include components/actions-fields.html %}