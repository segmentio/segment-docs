---
title: Antavo (Actions) Destination
hidden: true
---

The Antavo (Actions) Destination allows you to sync profile updates in Segment and trigger loyalty events.
This destination is maintained by Antavo. For any issues with the destination, [contact the Antavo support team](mailto:support@antavo.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for **Antavo (Actions)**.
2. Click **Add Destination**.
3. Select an existing Source to connect to Antavo (Actions).
4. Log in to Antavo and go to the **Settings > API Settings** and copy your Antavo **API key**.
5. Paste the **API Key** in the destination settings in Segment.
6. Configure your mappings to set events you want to sync to Antavo. You can choose from 2 actions: Send Loyalty Event and Send Profile Update.
      - If the multi-account extension is enabled in Antavo, make sure to include the account ID.
      - If customer attributes are included in the Data section - make sure attribute names match your Antavo settings.
7. If you haven’t configured the Segment integration in Antavo, go to the **Modules** menu and enable the Twilio Segment Extension in Antavo.

{% include components/actions-fields.html %}
