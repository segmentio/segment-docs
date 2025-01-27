---
title: Optimizely Data Platform Destination
id: 6512d7f86bdccc3829fc4ac3
---

Sync your Twilio Segment customer data to Optimizely Data Platform (ODP) for real-time segmentation, reporting, and to enrich customer profiles in ODP.

After you set up your Optimizely Data Platform destination, Segment syncs your customer data to ODP in near real-time.

This destination is maintained by Optimizely. For any issues with the destination, [contact Optimizely Support team](mailto:support@optimizely.com).

## Prerequisites

- Twilio Segment workspace
- ODP or [ODP Lite](https://support.optimizely.com/hc/en-us/articles/8359093735309-Welcome-to-ODP-Lite){:target="_blank”} account

## Enable the integration

1.  In ODP, open the **App Directory**.
2.  Select the **Twilio Segment** app.
3.  Click **Install App**.
4.  On the Settings tab, click **Generate** and copy the displayed token.
5.  Open the Segment app and navigate to the [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”}.
6.  Search for and select **Optimizely Data Platform**.
7.  Click **Add destination** and select a source to connect to the Optimizely Data Platform destination.
8. Enter a name for your destination and click **Create destination**.
9. On the destination's Settings tab, enter the following information:
	- **Api Key** – Paste your ODP API token from step 4
	- **Region** – Select your region
	- **Enable Destination** – Toggle to **On**
10.	Click **Save Changes**.

## Configure event mappings

After you enable the Optimizely Data Platform destination, you must map the events that you want Twilio Segment to send to ODP.

In Twilio Segment, on the **Mappings** tab of the Optimizely Data Platform destination, Segment displays a list of pre-built mappings that you can enable or disable. For example, if you enabled the **Email Opened** mapping, each email opened event Segment ingested after you enabled the mapping would sync to ODP.

If you want to map an event that is not listed:
1. Click **New Mapping > Custom Event**.
2. _(Optional)_: Enter a descriptive name for the event.
3. Select the event that you want to send to ODP.
4. Click **Load Test Event from Source**. This generates the raw data for the selected event and populates your mappings. The ID and timestamp field mappings auto-populate, but you can edit them as desired.
5. Select the event type and, optionally, the event action. For example, if you are configuring a custom event to track button clicks, select _button_ for the event type and _click_ for the event action.

> info "Required fields"
> In ODP, each event requires an ID, timestamp, and event type. The event action is optional. See ODP's [Events](https://docs.developers.optimizely.com/optimizely-data-platform/docs/thebasics-events){:target="_blank”} documentation for more details.

<ol style="counter-reset: none;">
  <li value="6" markdown=1>
  _(Optional)_: To ensure the custom event is configured correctly, click **Send test event to destination**.
  </li>
  <li value="7" markdown=1>
  Click **Save**.
  </li>
  <li value="8" markdown=1>
  Toggle your custom event's status to **Enabled**.
  </li>
</ol>	

The event data sends from Twilio Segment to ODP starting after you enable the mapping in the destination. It does not retroactively send events that occurred prior to configuring the integration and enabling the mappings.

{% include components/actions-fields.html %}
