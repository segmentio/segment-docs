---
# Hyperengage Destination
title: Hyperengage Destination
hide-boilerplate: true
hide-dossier: true
---

<!-- This template is meant for Actions-based destinations that do not have an existing Classic or non-Actions-based version. For Actions Destinations that are a new version of a classic destination, see the doc-template-update.md template. -->

{% include content/plan-grid.md name="actions" %}

<!-- Include a brief description of the destination here, along with a link to your website. -->
<!-- In the section below, explain the value of this actions-based destination. If you don't have a classic version of the destination, remove this section. -->
[Hyperengage](https://hyperengage.io/){:target="_blank"} tracks thousands of data points to trigger smart alerts on hidden opportunities when the accounts are ready for upsell, or likely to churn. By integrating product data into your GTM strategy, our platform empowers CSM’s and AE’s to achieve up to 5x higher lead conversion and better retention and adoption.

## Benefits of Hyperengage (Actions)

Hyperengage (Actions) offers several advantages:

- **Seamless Data Mapping**: Hyperengage streamlines the process of syncing your user and account data. When you link your data with Segment, Hyperengage automatically processes Segment's Identify, Track, and Group calls, eliminating the need for manual API integrations.
- **Pre-configured Mappings**: The Hyperengage (Actions) Destination has prebuilt mappings tailored for Hyperengage with all the necessary parameters, reducing the need for manual customization.
- **Direct Data Transfer**: Data moves straight from Segment to Hyperengage, eliminating the need for third-party intermediaries.
- **Event Tracking and User Identification**: With Segment's Actions-based destination, you can keep track of events and identify users and organizations in Hyperengage.

<!-- The section below describes how to activate and set up the destination. Include any additional configuration steps not mentioned. For example, acquiring an API key from your system and any setup steps needed to establish a connection to the destination. -->

## Getting Started

1. Navigate to the Segment web app and select **Catalog**, then pick **Destinations**.
2. In the Destinations Catalog, search for "Hyperengage" and select the Hyperengage (Actions) destination.
3. Click **Add destination**.
4. Choose an existing Source to connect to Hyperengage (Actions) and click **Next**.
5. Enter a name for your destination and click **Create destination**.
6. Open the [Hyperengage App](https://hyperengage.io/){:target="_blank"}, proceed to **Integration Settings**, and copy the API Key and Workspace Identifier.
7. Open the Segment app, navigate to your Hyperengage (Actions) destination, and paste the API Key and Workspace Identifier into the destination's settings page.

<!-- The line below will render a table of connection settings (if they exist), Pre-built Mappings, and potential actions. -->

{% include components/actions-fields.html %}

<!--
Additional Context

Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.
-->