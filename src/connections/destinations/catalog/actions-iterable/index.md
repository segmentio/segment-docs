---
title: Iterable (Actions) Destination
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[Iterable](https://www.iterable.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a cross-channel marketing platform that powers unified customer experiences and empowers you to create, optimize and measure every interaction across the entire customer journey.

This destination is maintained by Iterable. For any issues with the destination, [contact the Iterable Support team](mailto:support@iterable.com).

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Iterable Segment destination. There's also a page about the [non-Actions Iterable destination](/docs/connections/destinations/catalog/iterable/). Both of these destinations receive data from Segment.

## Benefits of Iterable (Actions) vs Iterable Classic

Iterable (Actions) provides the following benefit over Iterable Classic:

- **Transparent data mapping**. The Classic Iterable destination receives data from Segment and converts Segment events to Iterable's format using hardcoded mappings that are unable to be adjusted. The Iterable (Actions) destination allows clients to fully define their own mappings of Segment events, ensuring they receive data structured specifically for their needs.

## Getting Started

Follow these steps to connect the Iterable (Actions) destination to your Segment sources:

1. Access the Segment web app and click on **Catalog**.
2. In the Catalog, use the search function to find "Iterable". Select the **Iterable (Actions)** destination from the results, and choose which of your sources to connect the destination to.
3. Configure the Connection Settings by adding the following information:
   - **API Key**: To obtain the API Key, go to the Iterable app and navigate to Integrations > API Keys. Create a new API key with the 'Server-Side' type.

{% include components/actions-fields.html %}

## Important differences from the classic Iterable destination

Since the release of Iterable's Classic Segment destination, Iterable has expanded its support for multiple project types. To determine the appropriate identifier for your project type, please refer to the list of available project types and their respective identifiers found at the following link: [Project Types and Unique Identifiers](https://support.iterable.com/hc/en-us/articles/9216719179796-Project-Types-and-Unique-Identifiers).

### Creating or Updating Users

In Iterable's previous classic destination, when making Identify calls, certain context fields were automatically mapped to user profiles. However, this behavior has been changed. Please note that the following context fields are no longer automatically mapped to Iterable user profiles during Identify calls:

- app
- device
- ip
- locale
- page
- timezone

To include these fields in user profiles, you will now need to explicitly pass them as traits during Identify calls. This change offers more control and customization options for managing user data within Iterable.

Additionally, the integration has been updated to support explicit mappings for updating the `phoneNumber` user profile field, as well as support of the `mergeNestedObject` boolean field in user update calls.

### Commerce Events

In the classic destination of Iterable, cart updates were associated with Segment's `Product Added` and `Product Removed` events. However, in the Action destination, there have been updates to the default mappings. Now, custom events titled `Cart Updated` are routed to Iterable's Update Cart API.
