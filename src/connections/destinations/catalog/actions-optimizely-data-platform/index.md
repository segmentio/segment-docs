---
title: Optimizely Data Platform Destination
beta: true
hidden: true
id: 6512d7f86bdccc3829fc4ac3
---

Sync your Twilio Segment customer data to Optimizely Data Platform (ODP) for real-time segmentation, reporting, and to enrich customer profiles in ODP.

After you set up your Optimizely Data Platform destination, Segment syncs your customer data to ODP in near real-time.

## Prerequisites

*   Twilio Segment account
*   ODP or [ODP Lite](https://support.optimizely.com/hc/en-us/articles/8359093735309-Welcome-to-ODP-Lite) account

## Enable the integration

1.  In ODP, go to the **App Directory**.
2.  Select the **Twilio Segment** app.
3.  Click **Install App**.
4.  On the **Settings** tab, click **Generate** and copy the token that displays.
5.  In Twilio Segment, go to **Connections > Destinations**.
6.  Search for and select **Optimizely Data Platform**.
7.  Complete the following fields on the **Settings** tab:
	- **Name** – Enter a name for the destination, like _Optimizely Data Platform_.
	- **Api Key** – Paste your ODP API token from step 4.
	- **Region** – Select your region.
	- **Enable Destination** – Toggle to **On**.
8.	Click **Save Changes**.

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
> In ODP, each event requires an ID, timestamp, and event type. The event action is optional. See ODP's [Events](https://docs.developers.optimizely.com/optimizely-data-platform/docs/thebasics-events) documentation for more details.

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

