---
rewrite: true
title: Experiments by Growthhackers Destination
redirect_from: '/connections/destinations/catalog/northstar-by-growthhackers/'
id: 5cc205876b9a830001432515
---
[Experiments by Growthhackers](http://growthhackers.com/software) provides a project management tool for growth teams, allowing companies to create and prioritize ideas, run experiments and gather data to learn upon!

This destination is maintained by Experiments by Growthhackers. For any issues with the destination, [contact the Growthhackers Support team](mailto:tech@growthhackers.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Experiments by Growthhackers" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find following the path: "Integrations" > "Segment" > "Settings".

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Clicked Login Button')
```

Track calls will be sent to Experiments by Growthhackers as a `track` event.

Once the integration is completed, your events will always be available in your cards, all you have to do is select the ones that best help you validate your hypothesis. For further information and visual guidance of how it's going to look like, check [this article](https://www.notion.so/Integrate-Experiments-with-Segment-77843e36055d4288b1d8c85e1aa5f96e).
