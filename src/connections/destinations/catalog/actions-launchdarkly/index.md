---
title: LaunchDarkly (Actions) Destination
hide-boilerplate: true
hide-dossier: true
id: 624dddd054ced46facfdb9c0
---

{% include content/plan-grid.md name="actions" %}

[LaunchDarkly](https://launchdarkly.com) is a feature management platform that empowers development teams to safely deliver, control, and measure their software through feature flags.

With LaunchDarkly, you can run experiments on any feature flag. This destination allows you to connect existing Segment events to LaunchDarkly custom metrics for use in LaunchDarkly experiments.

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) LaunchDarkly Segment destination. There's also a page about the [non-Actions LaunchDarkly destination](/docs/connections/destinations/catalog/launchdarkly-events/). Both of these destinations receives data from Segment.

<!-- This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

{% include content/ajs-upgrade.md %}

<!-- In the section below, explain the value of this actions-based destination over the classic version, if applicable. If you don't have a classic version of the destination, remove this section. -->

## Benefits of LaunchDarkly (Actions) vs LaunchDarkly Classic

LaunchDarkly (Actions) provides the following benefits over the classic LaunchDarkly destination:

- **Improved customization**. You determine the mapping between the data Segment receives from your source and the data Segment sends to LaunchDarkly. For example, you can map an arbitrary event property to the LaunchDarkly metric key.
- **Increased transparency**. You can see the data that is sent to LaunchDarkly and when Segment sends it. Additionally, you can subscribe to alerts when the delivery rate to LaunchDarkly dips below a configurable threshold.

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

To get started with LaunchDarkly (Actions):
1. In LaunchDarkly, navigate to [Account settings](https://app.launchdarkly.com/settings/projects) and copy the client-side ID for the project and environment that you would like to connect to Segment.
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Search for **LaunchDarkly (Actions)** and select it.
4. Click **Configure LaunchDarkly**.
5. Select the Source you want to connect to LaunchDarkly (Actions).
6. Paste the LaunchDarkly client-side ID you copied in step 1 into the **LaunchDarkly client-side ID** field on the destination settings page.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

## Creating LaunchDarkly metrics

In order to take full-advantage of the LaunchDarkly (Actions) Destination, you need to create metrics in LaunchDarkly that correspond to Segment track events. Read [Creating metrics](https://docs.launchdarkly.com/home/experimentation/metrics){:target="_blank"} to learn how to create metrics in LaunchDarkly.

<!-- If applicable, add information regarding the migration from a classic destination to an Actions-based version below -->

## Migration from the classic LaunchDarkly destination

Be sure to disconnect the classic LaunchDarkly destination before enabling the LaunchDarkly (Actions) destination to avoid duplicate experimentation events in LaunchDarkly.
