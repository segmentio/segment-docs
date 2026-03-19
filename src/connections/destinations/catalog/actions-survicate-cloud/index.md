---
title: Survicate Cloud Mode (Actions) Destination

{% include content/plan-grid.md name="actions" %}

[Survicate](https://survicate.com/integrations/segment-survey/?utm_source=segment&utm_medium=referral){:target="_blank”} is a customer feedback platform that helps businesses collect, analyze, and act on customer insights across every channel.

This destination is maintained by Survicate. For any issues with the destination, [contact the Survicate Support team](mailto:support@survicate.com){:target="_blank”}.

## Getting started

1. From the Segment web app, click **Destinations**.
2. Search for "Survicate Cloud Mode (Actions)" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "Destination Key" into your Segment Settings UI, which you can find in [Survicate’s Connect tab of the Segment (Cloud Mode, Actions) integration](https://panel.survicate.com/o/0/w/0/integrations/segment_server_side?tab=connect){:target="_blank"}.

{% include components/actions-fields.html %}

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://github.com/segmentio/segment-docs/blob/develop/src/connections/spec/identify.md) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  jobTitle: 'CEO',
  companySize: '50'
});

```

When you call Identify, Survicate receives Segment traits as respondent attributes. They can be used to trigger web and mobile surveys or filter survey results.

All traits passed in Identify calls will be available in Survicate - once you view a respondent profile or export survey data.

All `camelCase` attribute keys are translated to `snake_case`.

All *object attributes* will be flattened to attributes prefixed by object key. All *array attributes* will be omitted.

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

The above described call creates the following respondent's traits in Survicate:

| **key** | **value** |
| --- | --- |
| id | 1234 |
| address_street | 6th St |
| address_city | San Francisco |
| address_state | CA |
| address_postal_code | 94103 |
| address_country | USA |

*Categories* attribute is omitted as it is an array attribute.

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](https://github.com/segmentio/segment-docs/blob/develop/src/connections/spec/group.md) does. An example call would look like:

```
analytics.group('group123', {
  name: 'Company Inc.'
});

```

All Group traits will be passed to respondent attributes with `group_` prefix. All `camelCase` attribute keys are translated to `snake_case`. All *object attributes* will be flattened to attributes prefixed by object key. All *array attributes* will be omitted.

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

| **key** | **value** |
| --- | --- |
| group_id | group123 |
| group_name | Company Inc. |
| group_address_street | 6th St |
| group_address_city | San Francisco |
| group_address_state | CA |
| group_address_postal_code | 94103 |
| group_address_country | USA |

*Categories* attribute is omitted as it is an array attribute.

## Track

A Segment track call, for example:

```
analytics.track('plan_purchased', {
    plan: 'Pro Annual',
    accountType : 'Facebook'
});

```

will trigger a Survicate call that sends the event name and properties to Survicate.

To trigger a survey on a Segment event, set that condition in the survey's Target tab → Audience → add the event to the active audience targeting conditions.

When the Segment event fires and other targeting conditions you've set in the panel are met - your survey will show.

Event properties are optional.
