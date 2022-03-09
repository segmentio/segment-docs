---
rewrite: true
title: Personyze Destination
id: 5c6de64f037dcf00014f8f84
---
[Personyze](https://www.personyze.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a complete cross-channel personalization solution for showing highly optimized content in websites, emails, and apps using targeting and recommendation engines, and a variety of content creation, editing, and A/B testing tools.

This destination is maintained by Personyze. For any issues with the destination, [contact the Personyze Support team](mailto:info@personyze.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Personyze" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Personyze dashboard](https://personyze.com/site/tracker/condition/index#cat=Account%20settings%2FMain%20settings%2FIntegrations/conditions) under Account Settings > Integrations > Segment > Get Keys
4. Once you've updated the API key in Segment, data from the source you selected will be shown right away in Personyze under "Manage Visitor Profiles".


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
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

All other traits will be sent to Personyze as custom string attributes and used for targeting. You can edit the default trait type of these traits within Personyze as needed, by going to:
Settings > Visitor Attributes > Visitor Attributes
