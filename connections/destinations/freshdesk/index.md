## Identify

When you call [`identify`](/docs/spec/identify/) we will insert or update a user record in Freshdesk. We’ll use the user email in `traits.email` to match users in Freshdesk.

**Note:** You must provide `traits.email` in order for the `identify` call to send to Freshdesk.

If you want to update custom fields mapped with users in Freshdesk,
you must pass this as a trait without the `cf_` prefix. For e.g. if you have a custom field in Freshdesk with the API name `cf_department`, you should send `department`.

Here’s an example:

{% comment %}\{\{\{api-example '{
  "user_id": "019mr8mf4r",
  "action": "identify",
  "traits": {
    "name": "Peter Gibbons",
    "email": "pgibbons@initech.com",
    "plan": "developer",
    "department": "Marketing",
    "created_at": "2013-01-07"
  },
  "context": {
    "timezone": "Europe/Amsterdam",
    "locale": "en-US"
  }
}' {% endcomment %}

## Group

When you call [`group`](/docs/spec/group/) we will insert or update an organization in Freshdesk. If you want to update custom fields mapped with an organization, you must pass this as a trait without the `cf_` prefix. For e.g. if you have a custom field in Freshdesk with the API name `cf_plan`, you should send `plan`.

Here’s an example:

{% comment %}\{\{\{api-example '{
  "user_id": "019mr8mf4r",
  "group_id": "0e8c78ea9d97a7b8185e8632",
  "action": "group",
  "traits": {
    "name": "Initech",
    "industry": "Technology",
    "employees": 329,
    "plan": "enterprise",
    "total billed": 830,
    "createdAt": "2014-12-01"
  },
  "context": {
    "timezone": "Europe/Amsterdam",
    "locale": "en-US"
  }
}' {% endcomment %}
