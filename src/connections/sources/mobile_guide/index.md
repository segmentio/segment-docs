---
hidden: true
redirect_from: '/connections/sources/catalog/libraries/mobile/mobile_guide'
---

## About mobile connection modes

{% include content/mobile-cmodes.md %}


## Bundled SDKs vs. cloud-mode destinations for mobile

When it comes to Mobile SDKs, we know that minimizing size and complexity is a priority for our customers. That's why our core Mobile SDKs are small and offload as much work as possible in handling destinations to our servers. When you install our lightweight SDK, you have access to our entire suite of server-side destinations.

### Why do some destinations require bundling their SDKs?

However, we bundle certain SDKs (instead of just sending your data to them from our servers) so that you have access to their features that require direct client access (A/B testing, user surveys, touch heatmapping, etc) or access to device-data such as CPU usage, network data, or uncaught / raised exceptions. For those types of features, we still need to bundle the destination's native SDK so you can make the most of them.

We work hard to make our mobile SDKs as modular as possible so you only need to include the SDKs for tools you plan to use.

These lightweight Segment-tool-SDKs allow us to offer the native functionality of all of our destinations without having to include hefty third-party SDKs by default. This gives you control over size and helps prevent method bloat. 

Check out how to use custom builds for both [Android](/docs/connections/sources/catalog/libraries/mobile/android/quickstart/#step-1-install-the-sdk) and [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/#step-1-install-the-sdk)

### Which destination's SDKs can be bundled?

To check if a destination can be bundled or not, look at [the connection modes referece page](/docs/connections/destinations/cmodes-compare/) and find the line for that specific destination. 

If a destination has a checkmark in the "Device - Mobile" column, it can be bundled.
