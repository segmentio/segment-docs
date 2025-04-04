---
rewrite: true
title: Zendesk Destination
id: 54521fdc25e721e32a72ef06
---
[Zendesk](https://www.zendesk.com/support/documentation/){:target="_blank"} is a premier, cloud-based customer service application. It was designed with one purpose in mind: to improve communication between a company and its customers. Their products allow businesses to be more reliable, flexible, and scalable. They help improve communication and make sense of massive amounts of data. Above all, they work together to build the best experience for your customers.


## Getting Started




1. From the Segment web app, click **Catalog**.
2. Search for "Zendesk" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter your Zendesk domain (not including `.zendesk.com`) and click **Connect**. The Zendesk OAuth login opens in a new tab. Sign in with your Zendesk credentials to authenticate and allow the Segment integration.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@example.com",
  plan: "premium",
  logins: 5
});
```

When you call `identify`, Segment inserts or updates a user record in Zendesk and uses the user email in `traits.email` to match user records in Zendesk. If there are multiple users matching the email, then no updates are submitted. Note that you must provide a trait for either `name` or `first_name` and `last_name` in order for the `identify` call to send to Zendesk. If you provide a `name`, Segment parses this into the `first_name` and `last_name` fields. If you provide `name`, but are missing the `last_name` field, this will still send successfully to Zendesk.

Here's an example:

{% comment %} api-example '{
  "action": "identify",
  "userId": "12345",
  "traits": {
    "name": "Kobe Bryant",
    "email": "kobe@lakers.com",
    "timezone": "America/Los_Angeles",
    "organizationId": 6789,
    "phone": "763-555-2342"
  }
}'}}} {% endcomment %}

```js
{
  "action": "identify",
  "userId": "12345",
  "traits": {
    "name": "Pikachu",
    "email": "pikachu@pakemon.com",
    "timezone": "America/Los_Angeles",
    "organizationId": 6789,
    "phone": "763-555-2342"
  }
}
```

By default, Users in Zendesk have many standard attributes associated with a single User record. Segment, at this time, is mapping to a subset of these. If you attempt to send data to a Zendesk attribute that are not yet mapped, it will create a custom field for this (it will not update the existing attribute).

Here are the Zendesk User Attributes Segment maps to and their syntax.

| Segment Field Name | Zendesk Field Name |
|--------------------|--------------------|
| email              | email              |
| name               | name               |
| organizationId     | organization_id    |
| timezone           | time_zone          |
| phone              | phone              |
| userId             | user_id            |
| userId             | external_id        |

**Note on Name:** If `name` is provided, Segment will parse `firstName` and `lastName` from this, or you can send `firstName` and `lastName`separately and they will be concatenated to `name`.

### Removing Users from a Zendesk Organization Membership on Segment Identify

To remove a user from an organization, navigate to your Zendesk destination settings and click **Enable Removing Users from Organizations** . When this setting is enabled, Segment detects when you pass an identify events with `traits.company.id` where `traits.company.remove: true`, and then sends a request to the Zendesk API to remove the user from the organization. If you enable the setting in your Zendesk destination settings but do not pass the correct trait values, Segment defaults to the standard `identify` behavior, which creates or updates a user.

Here's an example:
```js
{
  "action": "identify",
  "userId": "12345",
  "traits": {
    "name": "Pikachu",
    "email": "pikachu@pokemon.com",
    "timezone": "America/Los_Angeles",
    "organizationId": 6789,
    "phone": "763-555-2342",
    "company": {
      "id": "6789",
      "remove": true
    }
  }
}
```

> info ""
> **Note**: When a request is made to remove a user from an organization, Zendesk schedules a job to unassign all working tickets currently assigned to the user and organization combination. The `organization_id` of the unassigned tickets is set to `null`.

### Zendesk Verification Email at User Creation

To limit identified users from receiving a verification email from Zendesk, simply enable the **"Create Users as Verified"** option in the Zendesk destination settings. Segment sends `verified` as either true or false for each request based on this setting (you cannot overwrite this on a per-request basis).

### Zendesk Custom User Fields

You may map to custom user fields within Zendesk by passing your custom field key-value pair as a trait in the Identify call. When passing traits within the identify event, Segment will first try and map the trait to a known, existing field in Zendesk - either the canned standard fields described above or to a custom field (user_fields). Segment formats the field name from either camelCaseFormat or snake_case_format into snake_case_format. If you're finding that your custom fields are not populating in Zendesk as you would expect check the name formatting with this in mind.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
```

> info ""
> You must have a Zendesk [Sunshine plan](https://www.zendesk.com/pricing/?variant=a#platform){:target="blank"} to make track calls.

When you make a Track call, Segment sends data about the user's activity to Zendesk.

Segment only sends `track` events when the following two conditions are met:
1. The call is listed in the **Events** setting.
2. A `userId` is included.
  - **Note:** If the `userId` doesn't match any existing users in Zendesk, the destination returns an error.

> warning ""
> The Zendesk destination Event Tester doesn't work for Track events and only sends the initial GET request. Even if the user ID doesn't match an existing user in Zendesk, it results in a 200 response.

**Mapping Users to an Email**: To map a Segment track event to a Zendesk Sunshine event by email, add the user's email address in the Track call as `properties.email`. This allows Zendesk to tie the event to the user. If there is no `properties.email`, Segment sends the `userId` as `external_id`. If the email is provided in the track call, a JavaScript call may look like the example below.

```js
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
  properties: {
    email : 'user@example.com',
  }
});
```

> warning "Zendesk API Limit"
> Track calls to Zendesk must reference a user identifier of less than 61 characters. While you may create a user with an identifier of greater than 60 characters, track calls that reference that user return a 400 error. This is due to a limitation in the Zendesk Sunshine API.

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

> info ""
>  To make group calls, you _must_ be an Administrator in Zendesk.

When you call `group` Segment inserts or update an organization in Zendesk and uses the `groupId` you include in the call to match organization records in Zendesk. If there are multiple organizations matching the name, then no updates are submitted.

Here's an example:

```js
{
  "action": "group",
  "groupId": "908172409",
  "userId": "6789",
  "traits": {
    "name": "LA Lakers",
    "url": "https://lakers.com",
    "deleted": false
  }
}
```

Every time you call group, Segment links the organization to the user making the request.

By default, Organizations in Zendesk have many standard attributes associated with a single Organization record. Segment, at this time, is mapping to a subset of these. If you attempt to send data to a Zendesk attribute that are not yet mapped, it will create a custom field for this (it will not update the existing attribute).

Here are the Zendesk Organization Attributes Segment maps to and their syntax.

| Segment Field Name | Zendesk Field Name |
|--------------------|--------------------|
| name               | name               |
| domainNames        | domain_names       |
| tags               | tags               |
| groupId            | external_id        |
| url                | url                |
| deleted            | deleted            |


### Zendesk Custom Organization Fields

You may map to custom organization fields within Zendesk by passing your custom field key-value pair as a trait in the Group call. When passing traits within the group event, Segment will first try and map the trait to a known, existing field in Zendesk - either the canned standard fields described above or to a custom field (organization_fields). Segment formats the field name from either camelCaseFormat or snake_case_format into snake_case_format. If you're finding that your custom fields are not populating in Zendesk as you would expect check the name formatting with this in mind.
