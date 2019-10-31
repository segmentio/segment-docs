---
title: ConvertFlow
---
[ConvertFlow](https://www.convertflow.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the all-in-one platform for converting your website visitors. From one builder, you can create, personalize and launch dynamic website content, forms, popups, sticky bars, surveys, quizzes and landing pages, without coding.

This destination is maintained by ConvertFlow. For any issues with the destination, please [reach out to their team](mailto:support@convertflow.com).

_**NOTE:** The ConvertFlow Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 23, 2019. If you are interested in joining their beta program or have any feedback to help improve the ConvertFlow Destination and its documentation, please [let  their team know](mailto:support@convertflow.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "ConvertFlow" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Paste in your ConvertFlow website's ID into your Segment Settings UI, which you can find by heading into your [ConvertFlow account](https://app.convertflow.com/), selecting a website and copying the website ID from the website dashboard's URL. This will enable the ConvertFlow website's tracking snippet as a Destination for your selected Segment source. Your ConvertFlow website campaigns can then be fully managed from the ConvertFlow dashboard.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

**IMPORTANT:** The _email_ trait is a required field for the Identify call to reach ConvertFlow.

Upon identification, ConvertFlow will perform a 2-way sync with any email service providers (ESPs/CRMs) integrated with your ConvertFlow website, so you can begin targeting and personalizing for identified contacts on your website based on their segmentation in your ESP/CRM.

Contact records created by the `identify` function can be found in your ConvertFlow website dashboard in the "contacts" page.
