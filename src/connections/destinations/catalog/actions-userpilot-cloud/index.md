
---
title: Userpilot Cloud (Actions) Destination
id: <integration_id>
---

{% include content/plan-grid.md name="actions" %}

Userpilot helps product teams deliver personalized in-app experiences to increase growth metrics at every stage of the user journey. When you integrate Userpilot with Segment, you can send your Segment events to Userpilot, which allows you to create more personalized experiences for your users.


This destination is maintained by Userpilot. For any issues with the destination, [contact their Support team](mailto:support@userpilot.co).

{% include content/ajs-upgrade.md %}

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure Userpilot Cloud (Actions)**.
4. Select an existing Source to connect to Userpilot Cloud (Actions).
5. Find your Userpilot API key and API endpoint in the [environment dashboard](https://run.userpilot.io/environment){:target="_blank"}.

### Overview

The Userpilot cloud mode destination utilizes [Userpilot’s REST APIs](https://docs.userpilot.com/article/195-identify-users-and-track-api){:target="_blank"} to transmit user data and associated events directly to Userpilot. This enables you to leverage Userpilot’s capabilities based on the real-time data received from your application.

- **User Identification** Send [Identify](/docs/connections/spec/identify/) calls from Segment to Userpilot for identifying or updating user and company properties. This data is dispatched directly from your backend servers and can be used for segmenting users and triggering personalized content in real-time

- **Event Tracking:** Segment [Track](/docs/connections/spec/track/) calls are converted into Userpilot events. This feature captures user actions on your web application, allowing you to build a comprehensive understanding of your user's overall experience. You can trigger live, targeted content based on certain user actions like clicking a button or completing a transaction.


It's important to remember that each Identify and Track call is sent to Userpilot’s server directly without being affected by the user’s browser settings. This direct server-to-server communication enables a more reliable and secure data transfer.

Remember to follow Segment’s API rate limits to ensure your data is being sent at an acceptable rate. Always check Userpilot’s API documentation for the most recent information on how to set up Userpilot as a Cloud Mode Destination in Segment.

{% include components/actions-fields.html %}


## Troubleshooting

If you experience any issues while setting up Userpilot as a destination, follow these steps:

- Check your Userpilot API Key. Make sure it's correctly entered in Segment.
- Verify that you've enabled Userpilot as a destination in Segment.
- If you're still having trouble, contact Segment's support team for further assistance.

