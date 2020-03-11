---
rewrite: true
title: Survicate Destination
---
[Survicate](https://survicate.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a complete toolkit for customer feedback. From website optimization and customer satisfaction surveys to complex customer insight processes integrated with your email campaigns.

This destination is maintained by Survicate. For any issues with the destination, please [reach out to their team](mailto:help@survicate.com).

_**NOTE:** The Survicate Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 15, 2019. If you are interested in joining their beta program or have any feedback to help improve the Survicate Destination and its documentation, please [let their team know](mailto:help@survicate.com)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Survicate" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "Workspace Key" into your Segment Settings UI which you can find from your [Survicate Workspace Settings](https://panel.survicate.com/).

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  jobTitle: 'CEO',
  companySize: '50'
});
```
When you call Identify, we pass Segment traits as respondents' attributes to Survicate. They can be used to trigger website surveys or filter survey results.

All traits passed in Identify calls will be available in Survicate - once you view a respondent profile or export survey data.

All `camelCase` attribute keys are translated to `snake_case`.

Attributes which are standardized in Survicate include: `first_name`, `last_name`, `email`, `organization`, `department`, `job_title`, `phone`, `website`, `country`, `address_one`, `address_two`, `city`, `state`, `zip`, `fax`, `annual_revenue`, `employees`

All *object attributes* will be flattened to attributes prefixed by object key. All *array attributes* will be omitted.

```
analytics.identify('1234', {
    address: {
        street: '6th St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94103',
        country: 'USA'
    },
    categories: ['startup','SaaS']
});
```

The above described call creates following respondent's traits in Survicate:

| key                 | value         |
| ------------------- | ------------- |
| id                  | 1234          |
| address_street      | 6th St        |
| address_city        | San Francisco |
| address_state       | CA            |
| address_postal_code | 94103         |
| address_country     | USA           |

*Categories* attribute is omitted as it is an array attribute.

## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```
analytics.group('group123', {
  name: 'Company Inc.'
});
```

All Group traits will be passed to respondent attributes with `group_` prefix. All `camelCase` attribute keys are translated to `snake_case`. All *object attributes* will be flattened to attributes prefixed by object key. All *array attributes* will be omitted.

```
analytics.group('group123', {
    name: 'Company Inc.',
    address: {
        street: '6th St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94103',
        country: 'USA'
    },
    categories: ['startup','SaaS']
});
```

The above described call creates the following respondent's traits in Survicate:

| key                       | value         |
| ------------------------- | ------------- |
| group_id                  | group123      |
| group_name                | Company Inc.  |
| group_address_street      | 6th St        |
| group_address_city        | San Francisco |
| group_address_state       | CA            |
| group_address_postal_code | 94103         |
| group_address_country     | USA           |

*Categories* attribute is omitted as it is an array attribute.

### Sending survey answers to Segment

Once the Segment integration is enabled in Survicate Integrations tab, it starts sending track events from your client-side source. Here's a sample call that will be triggered when a survey is answered.

```
analytics.track('survicate_survey_answered', {
  answer: 'Great suppport!',
  answer_type: 'text',
  question: 'What makes us stand out from the competition?',
  survey: 'Advantages Over Competition Research',
});
```
