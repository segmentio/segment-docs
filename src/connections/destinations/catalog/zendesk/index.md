---
title: Zendesk
---

[Zendesk](https://www.zendesk.com/support/documentation/) is a premier, cloud-based customer service application. It was designed with one purpose in mind: to improve communication between a company and its customers. Their products allow businesses to be more reliable, flexible, and scalable. They help improve communication and make sense of massive amounts of data. Above all, they work together to build the best experience for your customers.

This document was last updated on April 30, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [please let us know!](https://segment.com/help/contact)


## Getting Started

{% include content/connection-modes.md %}


1. From your Segment UI’s Destinations page click on "Add Destination".
2. Search for "Zendesk" within the Destinations Catalog and confirm the Source you’d like to connect to.
3. There are two ways to authenticate your Zendesk account with Segment:
   * Use the standard email and password you use to Sign In to your Zendesk account. In the Zendesk settings, add your email in the **Email** setting and your password in the **Password** setting.
   * Use Zendesk OAuth with a unique token. Get the corresponding token from your Zendesk account: **Settings > Channels > API** and under the Settings Tab choose the corresponding token from the "Active API Tokens" list. In the Zendesk settings, add your `email/token` in the **Email** setting (i.e. `peter@intech.com/token` - use the actual word token in your email address) and add the actual token in the **Password** setting.
4. Add your Zendesk subdomain in the **Subdomain** setting (not including `.zendesk.com`).

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```js
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@initech.com",
  plan: "premium",
  logins: 5
});
```

When you call `identify` we will insert or update a user record in Zendesk. We'll use the user email in `traits.email` to match user records in Zendesk. If there are multiple users matching the email, then no updates are submitted. Note that you must provide a trait for either `name` or `first_name` and `last_name` in order for the `identify` call to send to Zendesk. If you provide a `name`, we will parse this into the `first_name` and `last_name` fields.

Here's an example:

{% comment %}\{\{\{api-example '{
  "action": "identify",
  "userId": "12345",
  "traits": {
    "name": "Kobe Bryant",
    "email": "kobe@lakers.com",
    "timezone": "America/Los_Angeles",
    "organizationId": 6789,
    "phone": "763-555-2342"
  }
}' {% endcomment %}

By default, Users in Zendesk have many standard attributes associated with a single User record. Segment, at this time, is mapping to a subset of these. If you attempt to send data to a Zendesk attribute that we have not yet mapped, it will create a custom field for this (it will not update the existing attribute).

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


### Zendesk Verification Email at User Creation

To limit identified users from receiving a verification email from Zendesk, simply enable the **"Create Users as Verified"** option in the Zendesk destination settings. We will send `verified` as either true or false for each request based on this setting (you cannot overwrite this on a per-request basis).

### Zendesk Custom User Fields

You may map to custom user fields within Zendesk by passing your custom field key-value pair as a trait in the Identify call. When passing traits within the identify event, Segment will first try and map the trait to a known, existing field in Zendesk - either the canned standard fields described above or to a custom field (user_fields). We format the field name from either camelCaseFormat or snake_case_format into snake_case_format. If you're finding that your custom fields are not populating in Zendesk as you would expect please check the name formatting with this in mind.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```js
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
```

**Important:** To make track calls, you must sign up for Zendesk's [User Events API early access program](https://develop.zendesk.com/hc/en-us/community/topics/360000030527)

When you call `track` we will send data about a user's activity to Zendesk.

We will only send `track` events when the following two conditions are met:

1. The call is listed in the "Events" setting.
2. A `userId` is included.
  - **Note:** If the `userId` doesn't match any existing users in Zendesk, we will return an error.

## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/spec/group/) does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

**Important:** To make group calls, you _must_ be an Administrator in Zendesk.

When you call `group` we will insert or update an organization in Zendesk. We'll use the `groupId` you include in the call to match organization records in Zendesk. If there are multiple organizations matching the name, then no updates are submitted.

Here's an example:

{% comment %}\{\{\{api-example '{
  "action": "group",
  "groupId": "908172409",
  "userId": "6789",
  "traits": {
    "name": "LA Lakers",
    "url": "https://lakers.com",
    "deleted": false
  }
}' {% endcomment %}

Every time you call group, we will also link the organization to the user making the request.

By default, Organizations in Zendesk have many standard attributes associated with a single Organization record. Segment, at this time, is mapping to a subset of these. If you attempt to send data to a Zendesk attribute that we have not yet mapped, it will create a custom field for this (it will not update the existing attribute).

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

You may map to custom organization fields within Zendesk by passing your custom field key-value pair as a trait in the Group call. When passing traits within the group event, Segment will first try and map the trait to a known, existing field in Zendesk - either the canned standard fields described above or to a custom field (organization_fields). We format the field name from either camelCaseFormat or snake_case_format into snake_case_format. If you're finding that your custom fields are not populating in Zendesk as you would expect please check the name formatting with this in mind.
