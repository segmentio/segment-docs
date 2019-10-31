---
title: "Why do some mobile destinations require packaging their SDKs?"
---

When it comes to Mobile SDKs, we know that minimizing size and complexity is a priority for our customers. That’s why our core Mobile SDKs are small and offload as much work as possible in handling destinations to our servers. When you install our light-weight SDK, you have access to our entire suite of server-side destinations.

### Why do some destinations require bundling their SDKs?

We bundle certain SDKs, instead of just proxying your data to them through our servers, so that you have access to their deeper features that requires direct client manipulation (A/B testing, user surveys, touch heatmapping, etc) or access to rich data such as CPU usage, network data, or raised exceptions. For those types of features, we still need to bundle their native SDK for you so you can make the most of them.

We’ve worked hard to make our mobile SDKs as modular as possible so that you only need to include the SDKs for tools you plan to use.

Custom builds allow us to offer the native functionality of all of our destinations without having to include hefty third-party SDKs by default. This gives you control over size and method bloat. Check out how to use custom builds for both [Android](https://segment.com/docs/sources/mobile/android/quickstart/#step-1-install-the-sdk) and [iOS](https://segment.com/docs/tutorials/quickstart-ios/#step-1-install-the-sdk).

### Which SDKs are bundled?

To check if an destination is bundled or not, take a look at our [documentation](https://segment.com/docs/integrations/) for that specific destination.
