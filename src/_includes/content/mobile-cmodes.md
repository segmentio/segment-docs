Segment defaults to using cloud-based [connection mode](/docs/connections/destinations/#connection-modes) ("cloud-mode") for any destination connected to a mobile source, because this can help [decrease the size of your final app package](https://segment.com/blog/mobile-app-size-effect-on-downloads/). When you use cloud-mode, Segment sends messages to the Segment servers, and then translates and forwards that data on to the downstream tools. This way, you only package the Segment mobile library with your app.

However, many destination tools that specifically deal with mobile interactions require that you use a device-based connection mode ("device-mode") so that they can collect information directly on the mobile device. (You can check the full list of destinations and [which connection modes they support](/docs/connections/destinations/cmodes-compare/).)

If you plan to use destinations that require device-mode, you must [package the Segment-integration version of that tool's SDK](#packaging-device-mode-destination-sdks) along with the Segment source library in your app. The Segment-integration SDK allows you to still collect the data with Segment, but also enables any device-based features, and still saves you space.

When you package a tool's device-mode SDK with the Segment SDK, Segment sends the data directly to the tool's API endpoint. Segment then also adds the tool [to the `integrations` object](/docs/guides/filtering-data/#filtering-with-the-integrations-object) and sets it to `false`, so that the data is not sent a second time from Segment servers.

For example, if you bundled the Segment SDK and Segment-Intercom library, you would see this in your payload:

```json
"integrations": {
  "Intercom": false
  },
```

When you package Segment and the Segment-integration SDKs, you _must_ use a dependency manager (such as Cocoapods or Gradle) to ensure that all SDKs are compatible and all of their dependencies are included. Segment does not support bundling mobile SDKs without a dependency manager.
