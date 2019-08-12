---
title: Personyze
---
[Personyze](https://www.personyze.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a complete cross-channel personalization solution for showing highly optimized content in websites, emails, and apps using targeting and recommendation engines, and a variety of content creation, editing, and A/B testing tools.

This destination is maintained by Personyze. For any issues with the destination, please [reach out to their team](mailto:info@personyze.com).

_**NOTE:** Personyze is currently in beta, which means that they are still actively developing the product. This doc was last updated on February 25, 2019. If you are interested in joining their beta program or have any feedback to help improve the Personyze Destination and its documentation, please [let  their team know:](mailto:info@personyze.com)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Personyze" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Personyze dashboard](https://personyze.com/site/tracker/condition/index#cat=Account%20settings%2FMain%20settings%2FIntegrations/conditions) under Account Settings > Integrations > Segment > Get Keys
4. Once you’ve updated the API key in Segment, data from the source you selected will be shown right away in Personyze under “Manage Visitor Profiles”.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to Personyze to update the Visitor Profile. You can see this updated under Dashboard > Users as well as in the Live Visits view.

The following traits are explicitly mapped in Personzyne:

* email
* firstName
* lastName
* phone
* gender
* age
* city
* country
* zip code
* interest
* industry
* role

All other traits will be sent to Personyze as custom string attributes and utilized for targeting. You can edit the default trait type of these traits within Personyze as needed, by going to:
Settings > Visitor Attributes > Visitor Attributes
