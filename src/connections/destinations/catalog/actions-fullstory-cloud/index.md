---
title: FullStory Cloud Mode (Actions)
hide-boilerplate: true
hide-dossier: false
id: 62d9aa9899b06480f83e8a66
versions:
  - name: FullStory (Classic)
    link: /docs/connections/destinations/catalog/fullstory
  - name: FullStory Device Mode (Actions)
    link: /docs/connections/destinations/catalog/actions-fullstory
---
{% include content/plan-grid.md name="actions" %}

[FullStory](https://www.fullstory.com/){:target="_blank"} lets product and support teams easily understand everything about the customer experience. The Segment integration for FullStory helps accurately identify your customers within FullStory.

FullStory’s cloud mode Segment integration allows you to enrich FullStory data by sending user properties and events from your servers and Cloud Apps so that you apply it to your analysis throughout FullStory. For example, you could build a funnel to analyze drop-off of users who engaged with a certain marketing campaign.

FullStory’s cloud mode destination requires that you also use FullStory’s tagless autocapture, available through the [FullStory Device Mode (Actions) web destination](/docs/connections/destinations/catalog/actions-fullstory/). However, if you want to enrich the autocapture data with custom user properties and events from other [server-side sources](/docs/connections/sources/#server) or [cloud apps](/docs/connections/sources/#cloud-apps), such as recurring subscription purchases, use this cloud mode destination.

### Overview

The FullStory cloud mode destination sends information about your users and related events to FullStory. It uses [FullStory’s REST APIs](https://developer.fullstory.com){:target="_blank"}.

- **Identify User:** Converts Segment [Identify](/docs/connections/spec/identify/) calls to [FullStory Set User Properties API calls](https://developer.fullstory.com/set-user-properties){:target="_blank"}. Use this to set custom attributes which can be used to search and segment within FullStory.
- **Track Custom Event**: Converts Segment [Track](/docs/connections/spec/track/) calls to [FullStory custom event API calls](https://developer.fullstory.com/server-events){:target="_blank"}. Use this to capture more context about your user’s experience on your site or to capture user’s actions in other applications to build a more complete understanding of your user’s overall experience.

### Benefits of FullStory Cloud Mode (Actions)

- Enrich autocapture data with FullStory’s latest data capture APIs
- Ability to send custom events from new sources
- Use [Destination Filters](/docs/connections/destinations/destination-filters/) to selectively send certain events or user properties to FullStory

### Getting Started

1. You need a FullStory API Key to use the FullStory cloud mode destination. Refer to [this article](https://help.fullstory.com/hc/en-us/articles/360052021773-Managing-API-Keys){:target="_blank"} to learn how to generate a new API Key within FullStory.
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Find “FullStory Cloud Mode (Actions)” in the Destinations list and click it.
4. Click **Configure FullStory Cloud Mode (Actions)**.
5. Select an existing Source to connect to FullStory Cloud Mode (Actions).
6. Provide a Destination Name and select **Fill in settings manually.** Ensure the “Actions” destinations framework is selected and click **Save.**
7. On the **Basic Settings** page, enter your FullStory API Key from step 1 and click **Save Changes**.
8. On the **Mappings** tab, you can view default mappings as well as add, modify, or disable mappings. Confirm that the "User ID" FullStory property is mapped to the ID previously used to identify the user. For more information, please refer to the [API documentation](https://developer.fullstory.com/server-events){:target="_blank"}.

> info ""
> Events that you send through to FullStory through a Cloud-mode connection count towards your FullStory server event quota. To see your company’s current quota allotment, view the Subscription information on the Account Settings page in FullStory.

## Troubleshooting

### Why am I getting a ‘404 Not Found’ error?

The user for which the API request is being made can not be found in the identified set of users within your FullStory organization. If you expect that user to already exist, you can search for that User ID in FullStory to confirm. Also, double check that you are using an API key from the same organization.

Data sent server-side for users must match an already existing userId that was sent from a client-side connection.

{% include components/actions-fields.html %}
