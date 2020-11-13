---
title: Troubleshooting Analytics-React
strat: react-native
---

## No events in the debugger

1. Verify you followed all [Getting Started](/docs/connections/sources/catalog/libraries/mobile/react-native/#getting-started) steps
2. Check that you entered the correct `writeKey` for your source
    - If the `writeKey` you entered is something other than a string or an empty string, your app might crash.
    - If the `writeKey` you entered is a valid format, but not the correct `writeKey` for your specific source, you won't see an error response. Segment accepts the data, but can't route it to your source's debugger.
3. [Enable logging](/docs/connections/sources/catalog/libraries/mobile/react-native/#logging) to confirm if call is being sent to Segment


## No events in my destinations
1. Verify that your destination is enabled
2. Verify the destination credentials you entered in the Segment app are correct
3. Make sure the destination can accept the data you're sending in the way you're sending it.
   - Does the integration have device-mode/cloud-mode support? Confirm you are sending using the correct connection mode.
   - Does the destination accept the type of call you are sending? Not all destinations accept all calls: page, track, etc.
4. If you still don't see data in your destination, continue debugging based on which type of connection mode you are using.


## Debugging Device-mode Destinations

If you are using device-mode, you should see the value of that integration set to false in the `integrations` object. That means that the data is being sent from the device to the destination SDK, and not through Segment's servers. This is expected if you chose to use a device-mode destination's SDK with Segment's during installation.

Enable verbose [logging](/docs/connections/sources/catalog/libraries/mobile/react-native/#logging) and trigger the call in question. You should see a call to Segment triggered as well as to the partner SDK.  It will show you exactly which partner method was invoked and the arguments it was invoked with!

## Debugging Cloud-mode Destinations

Look at the raw JSON in your debugger.  Does the call look like what is expected?

Read through [the docs for that destination](/docs/connections/destinations/) to see expected event format, behavior and caveats for that destination.


## Still having issues?

[Contact Segment's Product Support team](https://segment.com/help/contact/) with the following information:

- The version of our SDK you are using
- Whether you are using device- or cloud-mode
- Logs of the call in question
- Screenshots of the event in the Segment debugger
- Screenshots of what you are seeing in your destination
