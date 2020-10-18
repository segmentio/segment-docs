---
title: 'Troubleshooting Analytics-Android'
strat: android
---

## No events in my debugger

1. Check that you followed all of the [Getting Started](/docs/connections/sources/catalog/libraries/mobile/android/#getting-started) steps correctly
2. Check that you entered the correct `writeKey` for the source you're using.
    - The `writekey` might change when you make changes to the source from the Segment web app.
    - If the `writeKey` you entered is something other than a string or an empty string your app may crash
    - If the `writeKey` you entered is a valid form but not the correct writeKey for your specific source, you won't see an error response. Segment receives the data, but cannot route it to your source (debugger).
3. [Enable logging](/docs/connections/sources/catalog/libraries/mobile/android/#debugging) to confirm if call is being sent to Segment


## No events in my destinations

1. Check that the destination is actually enabled in the Segment app.
2. Check that you entered your credentials for the destination correctly in the Segment app, and that you added them for the correct Source in the correct Workspace.
3. Make sure the destination can accept the data that you're sending:
   - Does the [destination support device-mode or cloud-mode support](/docs/utils/cmodes-compare/)? Confirm you are sending using the correct connection mode.
   - Does the destination [accept the type of call you are sending](/docs/utils/methods-compare/)? Not all destinations accept all calls: page, track, etc.


If you still don't see data getting to your destination, continue debugging based on the type of connection mode, using the sections below.


## Debugging Device-mode Destinations

Inspect one of your data payloads. If you are using device-mode for a specific destination, the value of that integration should be set to `false` in the `integrations` object. That means that the data is being sent from the device directly to the destination's API endpoints, and not through Segment's servers. This is expected if you chose to use a device-mode destination's SDK with Segment's during installation.

Enable verbose [logging](/docs/connections/sources/catalog/libraries/mobile/android/#debugging) and trigger the call in question. You should see a call to Segment, and one going to the partner SDK.  It will show you exactly which partner method was invoked and the arguments it was invoked with!

## Debugging Cloud-mode Destinations

Look at the raw JSON in your debugger.  Does the call look like what you expect?

Read through [the docs for that destination](/docs/connections/destinations/catalog/) to see expected event format, behavior and caveats for that destination.

## Still having issues?

[contact our Product Support team](https://segment.com/help/contact/) with the following information:

- The version of our SDK you are using
- Whether you are using device- or cloud-mode
- Logs of the call in question
- Screenshots of the event in the Segment debugger
- Screenshots of what you are seeing in your destination
