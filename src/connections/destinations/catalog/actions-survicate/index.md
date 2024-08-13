---
title: Survicate (Actions) Destination
id: 65a6ac19ea6d3ced628be00b
---
[Survicate](https://survicate.com/integrations/segment-survey/?utm_source=segment&utm_medium=referral){:target="_blank”} is a complete toolkit for customer feedback. 

This destination is maintained by Survicate. For any issues with the destination, [contact the Survicate Support team](mailto:help@survicate.com).


## Getting Started

1. From the Segment web app, click **Destinations**.
2. Search for "Survicate (Actions)" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "Workspace Key" into your Segment Settings UI which you can find from your [Survicate Workspace Settings](https://panel.survicate.com/o/0/w/0/settings/web-surveys){:target="_blank"}.
{% include components/actions-fields.html %}
## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  jobTitle: 'CEO',
  companySize: '50'
});
```

When you call Identify, we pass Segment traits as respondents' attributes to Survicate. They can be used to trigger web surveys or filter survey results.

All traits passed in Identify calls will be available in Survicate - once you view a respondent profile or export survey data.

All `camelCase` attribute keys are translated to `snake_case`.

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

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

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

## Track

A Segment track call, f.ex:
```
analytics.track('plan_purchased', {
    plan: 'Pro Annual',
    accountType : 'Facebook'
});
```

will trigger a Survicate call that sends the event name and properties to Survicate.

If you want to trigger your survey on a Segment event, you are able to do that by setting that condition in the panel in the targeting tab in the section: "When a user triggers an event" under "Where would you like to show the survey".

When the Segment event fires and other targeting conditions you've set in the panel are met - your survey will show. 

Event properties are optional. 

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
