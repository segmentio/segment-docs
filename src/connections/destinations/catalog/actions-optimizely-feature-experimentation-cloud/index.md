---
title: 'Optimizely Feature Experimentation (Actions) Destination'
id: 641d5acea88fa531b9068608
hide-personas-partial: true
hide-boilerplate: false
hide-dossier: true
hidden: true
---

[Optimizely Feature Experimentation](https://www.optimizely.com/products/experiment/feature-experimentation/){:target="_blank"} is a feature flagging and experimentation platform for websites, mobile apps, chatbots, APIs, smart devices and anything else with a network connection.

With the Optimizely SDK you can deploy code behind feature flags, experiment with A/B tests and use percentage deliveries to roll out or roll back flags immediately.

Segment’s Optimizely Feature Experimentation (Actions) destination supports tracking of conversion events.
Segment supports one action (event): trackEvent. [TrackEvent](https://docs.developers.optimizely.com/experimentation/v4.0.0-full-stack/docs/track-event-javascript-node){:target="_blank"} sends user conversion events for active experiments. Segment sends data using Optimizely's [Event API](https://docs.developers.optimizely.com/experimentation-data/reference/post_events){:target="_blank"}.

## Prerequisites

Optimizely works differently than other Segment destinations: it requires that customers implement some Optimizely functionality native to make sure your experiment logic runs correctly.

Segment maps `track` events to Optimizely's `track` method. You must implement all Optimizely decision-based methods, such as `activate` and `isFeatureEnabled`. Segment sends data using Optimizely's  [Event API](https://docs.developers.optimizely.com/experimentation-data/reference/post_events){:target="_blank"}.
Segment's API does not include methods that correspond to decision-based methods.

This requires that customers include a native Optimizely implementation before their Segment implementation on pages or in mobile apps where Optimizely experiments run.

## Getting started

Before connecting to the Optimizely Feature Experimentation destination, you must have a [Optimizely Feature Experimentation](https://www.optimizely.com/products/experiment/feature-experimentation/){:target="_blank"} account, Account ID and Datafile URL.

To connect the Optimizely Feature Experimentation destination:

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for **Optimizely Feature Experimentation** in the Destinations Catalog, and select the destination.
3. Click **Configure Optimizely Feature Experimentation (Actions)** in the top-right corner of the screen.
4. Select the source that will send data to Optimizely Feature Experimentation and follow the steps to name your destination.
5. On the **Settings** tab, input your `datafile` URL and your Account Id. Toggle “Enable Destination” on and click  **Save Changes**.
6. Navigate to the **Mappings** tab, click **New Mapping**, and select **Track Event**.
7. Under Select mappings, select the event key from the dropdown or input the event manually as the "event" and select the other mappings. Click **Save** and toggle to enable the mapping.
     * **Note:** The conversion event will only be sent if the configured event key exactly matches the name of an active experiment metric set up in the Optimizely dashboard.
     * **Note:** The current user should activate a running experiment with the associated metric before sending track events to Segment.

### Track

Upon invocation of a Segment `track` event, Segment maps the event to an Optimizely `track` event:
* If the Segment event name matches exactly the name of an active experiment `metric` set up in the Optimizely dashboard;
* If the experiment `metric` is associated with a running experiment;
* If the current user has been assigned a `userId` using Segment's `identify` method (for example,  `analytics.identify('123')`);
* If the current user is activated in a running experiment with the associated `metric`.

Segment also handles the following mapping:
* Segment maps `track` events to Optimizely `eventName`.
* Segment maps `track` event, `properties`, to Optimizely `eventTags`.
* Segment maps `track` event, `context.traits`, to Optimizely `attributes`.

`revenue` values should be passed as a Segment `property`. The value should be an integer and represent the value in cents, so, for example, $1 should be represented by `100`.

## GDPR Support
Segment supports deleting/suppressing users in Optimizely Feature Experimentation (Actions) using the [Segment app](/docs/privacy/user-deletion-and-suppression/). Before deleting/suppressing a user, create a [Personal Access Token](https://developers.optimizely.com/x/authentication/personal-token/) in Optimizely and provide it as the value of the Personal Access Token setting.

{% include components/actions-fields.html settings="true"%}