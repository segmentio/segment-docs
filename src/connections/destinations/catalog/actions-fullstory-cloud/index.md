---
title: FullStory Cloud Mode (Actions)
hide-boilerplate: true
hide-dossier: false
id: 62d9aa9899b06480f83e8a66
---
{% include content/plan-grid.md name="actions" %}

[FullStory](https://www.fullstory.com/){:target="_blank"} lets product and support teams easily understand everything about the customer experience. The Segment integration for FullStory helps accurately identify your customers within FullStory.

FullStory’s cloud mode Segment integration allows you send user and event data to FullStory from your servers and Cloud Apps so that you apply it to your analysis throughout FullStory. For example, you could build a funnel to analyze drop-off of users who engaged with a certain marketing campaign.

If you want to use FullStory’s tagless autocapture, use the [FullStory Device Mode (Actions) web destination](https://segment.com/docs/connections/destinations/catalog/actions-fullstory/). However, if you want to capture custom user properties and events from other [server-side sources](https://segment.com/docs/connections/sources/#server) or [cloud apps](https://segment.com/docs/connections/sources/#cloud-apps), such as recurring subscription purchases, use this cloud mode destination.

### Overview

The FullStory cloud mode destination sends information about your users and related events to FullStory. It uses [FullStory’s REST APIs](https://developer.fullstory.com){:target="_blank"}.

- **Identify User:** Converts Segment [Identify](https://segment.com/docs/connections/spec/identify/) calls to [FullStory Set User Properties API calls](https://developer.fullstory.com/set-user-properties){:target="_blank"}. Use this to set custom attributes which can be used to search and segment within FullStory.
- **Track Custom Event**: Converts Segment [Track](https://segment.com/docs/connections/spec/track/) calls to [FullStory custom event API calls](https://developer.fullstory.com/server-events){:target="_blank"}. Use this to capture more context about your user’s experience on your site or to capture user’s actions in other applications to build a more complete understanding of your user’s overall experience.

### Benefits of FullStory Cloud Mode (Actions)

- Works with FullStory’s latest data capture APIs
- Ability to send custom events from new sources
- Use [Destination Filters](https://segment.com/docs/connections/destinations/destination-filters/) to selectively send certain events or user properties to FullStory

### Getting Started

1. You need a FullStory API Key to use the FullStory cloud mode destination. Refer to [this article](https://help.fullstory.com/hc/en-us/articles/360052021773-Managing-API-Keys){:target="_blank"} to learn how to generate a new API Key within FullStory.
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Find “FullStory Cloud Mode (Actions)” in the Destinations list and click it.
4. Click **Configure FullStory Cloud Mode (Actions)**.
5. Select an existing Source to connect to FullStory Cloud Mode (Actions).
6. Provide a Destination Name and select **Fill in settings manually.** Ensure the “Actions” destinations framework is selected and click **Save.**
7. On the **Basic Settings** page, enter your FullStory API Key from step 1 and click **Save Changes**.
8. On the **Mappings** tab, you can view default mappings as well as add, modify, or disable mappings.

{% include components/actions-fields.html %}