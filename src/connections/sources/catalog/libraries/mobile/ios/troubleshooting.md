---
title: Troubleshooting Analytics-iOS
strat: ios
---

## Target has transitive dependencies that include static binaries

This was due to an old [CocoaPods limitation](https://github.com/CocoaPods/CocoaPods/issues/2926).

1. Verify you are not using any previously needed workarounds
2. Verify you are using at least CocoaPods 1.4
    ```ruby
    $ pod --version
    1.5.3
    ```
3. Verify you are using the latest Segment pods
    ```bash 
    $ pod outdated 
    The following pod updates are available:
      Segment-GoogleAnalytics 1.1.7 -> 1.1.7 (latest version 1.1.8)
    ```

## No events in my debugger

1. Verify you have followed all [Getting Started](/docs/connections/sources/catalog/libraries/mobile/ios/#getting-started) steps
2. Verify you have entered the correct writeKey for your source
    - If the writeKey you have entered is something other than a string or an empty string your app may crash
    - If the writeKey you have entered is a valid form but not the correct writeKey for your specific source, you will not see an error response. Data will be accepted by Segment but not able to be correctly routed to your source (debugger).
3. [Enable logging](/docs/connections/sources/catalog/libraries/mobile/ios/#logging) to confirm if call is being sent to Segment


## No events in my destinations

1. Verify that your destination is enabled
2. Verify your destination credentials entered in your Segment dashboard are correct
3. Make sure the destination can accept what you're sending:
    - Does the integration have device-mode/cloud-mode support? Confirm you are sending using the correct connection mode.
    - Does the destination accept the type of call you are sending? Not all destinations accept all calls: page, track, etc.
4. If you are still not seeing data in your destination, continue debugging based on which type of connection mode you are using.


## Debugging device-mode destinations

If you are using device-mode, you should see the value of that integration set to false in the `integrations` object. That means that the data is being sent from the device to the destination SDK, and not through Segment's servers. This is expected if you chose to use a device-mode destination's SDK with Segment's during installation.

Enable verbose [logging](/docs/connections/sources/catalog/libraries/mobile/ios/#logging) and trigger the call in question. You should see a call to Segment triggered as well as to the partner SDK. It will show you exactly which partner method was invoked and the arguments it was invoked with!


## Debugging cloud-mode destinations

Look at the raw JSON in your debugger. Does the call look like what is expected?

Read through [the docs for that destination](/docs/connections/destinations/) to see expected event format, behavior and caveats for that destination.

{% comment %}
## Migrating to v4 from earlier releases

// @Brandon S I think we need to update this entire section [here](/docs/connections/sources/catalog/libraries/mobile/ios/troubleshooting/#migrating-to-v3-from-earlier-releases) to speak for v4 but I am not sure of all changes that need to be listed here. can you help look at the og public doc and write bullets for what we need to cover under v4 🙏 

{% endcomment %}

## Still having issues?

Contact [Segment Product Support](https://segment.com/help/contact/) with the following information:

- The version of our SDK you are using
- Whether you are using device- or cloud-mode
- Logs of the call in question
- Screenshots of the event in the Segment debugger
- Screenshots of what you are seeing in your destination

