---
title: LaunchDarkly (Actions) Destination
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[LaunchDarkly](https://launchdarkly.com) is a feature management platform that empowers development teams to safely deliver and control software through feature flags.

With LaunchDarkly, you can run experiments on any feature flag, with custom events as metrics. You can look for an existing custom event from Segment, and start recording data against it as a metric in your LaunchDarkly experiment.

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) <destination_name> Segment destination. There's also a page about the [non-Actions <destination_name> destination](/docs/connections/destinations/catalog/<destination_name>/). Both of these destinations receives data from Segment.

<!-- This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

{% include content/ajs-upgrade.md %}

<!-- In the section below, explain the value of this actions-based destination over the classic version, if applicable. If you don't have a classic version of the destination, remove this section. -->

## Benefits of LaunchDarkly (Actions) vs LaunchDarkly Classic

LaunchDarkly (Actions) provides the following benefits over the classic LaunchDarkly destination:

- **Improved customization**. You determine the mapping between the data Segment receives from your source and the data Segment sends to LaunchDarkly. For example, you can map an arbitrary event property to the LaunchDarkly metric key.
- **Increased transparency**. You can see the data that is sent to LaunchDarkly and when Segment sends it. Additionally, the you can subscribe to alerts when the delivery rate to LaunchDarkly dips below a configurable threshold.

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

1. In LaunchDarkly, navigate to [Account settings](https://app.launchdarkly.com/settings/projects) and copy the client-side ID for the project and environment that you would like to connect to Segment.
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Find the Destinations Actions item in the left navigation, and click it.
4. Click **Configure LaunchDarkly**.
5. Select an existing Source to connect to LaunchDarkly (Actions).
6. Paste the LaunchDarkly client-side ID you copied in step 1. into the **LaunchDarkly client-side ID** field in the destination settings page.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

<!--
Additional Context

Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.
-->

<!-- If applicable, add information regarding the migration from a classic destination to an Actions-based version below -->

## Migration from the classic <destination_name> destination

<!-- Include any pertinent information here. -->
