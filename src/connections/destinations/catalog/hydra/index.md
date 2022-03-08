---
title: Hydra Destination
rewrite: true
id: 5cd30f824e267500018a1063
---
[Hydra](https://hydra.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps marketing, sales operations and customer success teams implement holistic predictive analytics tailored to their own business without writing a single line of code. Hydra is capable of scanning a wide range of sources such as product usage, user demographic data, firmographic data, chat conversations, help desk tickets, emails and marketing engagement to discover signals and make predictions.

This destination is maintained by Hydra. For any issues with the destination, [contact the Hydra Support team](mailto:hello@hydra.ai).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}


1. From the Segment web app, click **Catalog**.
2. Search for Hydra in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "Hydra API Key" into your Segment Settings UI which you can find from Hydra's [Settings screen, under the integrations tab](https://app.hydra.ai/settings#api_info).

If you would like to use `track` event data, create a `Segment Product Usage Scanner` by visiting the [Scanners screen](https://app.hydra.ai/scanners) in Hydra app. See `track` event details below for more information.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  title: 'VP of Happiness'
});
```

Identify calls will be sent to Hydra as an `identify` event. Upon receiving an Identify event, Hydra will do the following:

1. Create or update a person record
2. Create or update the associated company record
3. Source additional data points about the newly created person and company
4. Run any scanners triggered by person creation (e.g. persona scanner, role scanner)
5. Run any scanners triggered by company creation (e.g. Ideal Customer Profile scanner)


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Device deploy started',
  "properties": {
    "feature": "Device management",
    "eventFlag": "Positive"
  })
```

Track calls will be sent to Hydra as a `track` event. If you haven't already, make sure to create a `Segment Product Usage Scanner` by visiting the [Scanners screen](https://app.hydra.ai/scanners) in Hydra app.

Hydra uses the `feature` property to group events and the `eventFlag` property to weigh event importance. You can send any of the following as the value for the `eventFlag`: negative, neutral, positive. If you send anything other than these values, Hydra will consider the `eventFlag` to be neutral. Within Hydra, you will see this information populate in the following areas:

1. Top features chart in person details
2. Usage trend in the person details
3. Pattern labels (these take time) inside the insights widget
