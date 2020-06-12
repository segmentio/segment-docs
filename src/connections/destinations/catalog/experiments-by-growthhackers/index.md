---
rewrite: true
title: Experiments by Growthhackers Destination
---
[Experiments by Growthhackers](http://growthhackers.com/software) provides a project management tool for growth teams, allowing companies to create and prioritize ideas, run experiments and gather data to learn upon!

This destination is maintained by Experiments by Growthhackers. For any issues with the destination, [contact their team](mailto:tech@growthhackers.com).

_**NOTE:** The Experiments by Growthhackers Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on June 26, 2019. If you are interested in joining their beta program or have any feedback to help improve the Experiments by Growthhackers Destination and its documentation, [let their team know](mailto:tech@growthhackers.com)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Experiments by Growthhackers" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find following the path: "Integrations" > "Segment" > "Settings".

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Clicked Login Button')
```

Track calls will be sent to Experiments by Growthhackers as a `track` event.

Once the integration is completed, your events will always be available in your cards, all you have to do is select the ones that best help you validate your hypothesis. For further information and visual guidance of how it's going to look like, check [this article](https://www.notion.so/Integrate-Experiments-with-Segment-77843e36055d4288b1d8c85e1aa5f96e).
