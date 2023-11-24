---
title: Attio (Actions) Destination
hide-boilerplate: true
id: 64c031541451bb784943f809
beta: true
---

{% include content/plan-grid.md name="actions" %}

Powerful, flexible and data-driven, [Attio](https://attio.com){:target="_blank”} makes it easy to build the
exact CRM that your business needs.

This destination allows you to use your existing Segment events to create or update
records in Attio, for example creating Attio User records from Segment Identify events.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for **Attio (Actions)** and select it.
3. Click **Add destination**, then follow the setup instructions.
4. Click **Connect to (destination name)** to select the Attio Workspace you'd like to connect to.

<!-- The following sections should be populated with config from destination, once published, and can be refined later -->

## Identify User

Create or update a **Person** using the provided email address, then create or update a
related **User** using the same address. By default, this mapping runs for `identify`
events.

*This mapping is a special form of [Assert Record](#assert-record), because it asserts
both a Person and User and links them together. If you only need to assert either a Person
or User, you should configure [Assert Record](#assert-record) instead.*

In Attio, a **Person** represents a human. People have names, email addresses, Twitter
profiles, email and calendar interactions, etc.

Meanwhile, a **User** is a user of your product. Users might have feature flags,
permission levels, etc. A Person can have multiple Users, for example if they exist in
different workspaces or have different sets of permissions, but are ultimately the same
Person.

> info ""
> To use the User standard object, you'll need to make sure it's activated first. Visit
> your [Workspace Settings > Objects](https://app.attio.com/_/settings/data/objects){:target="_blank”} page
> and click the "Activate" button next to the Users object.

This mapping makes the assumption that your Segment event includes two properties:

  1. An `email_address` property, to create or update a Person
  2. A `id` property, to create or update an associated User

 You can specify additional attributes to be mapped on the **Edit Mapping** page.

For example, you could set some additional properties on the Person using these Mapping
Fields under "Additional Person attributes". The column on the left should contain
properties from your event, or custom text, and the column on the right should reference
attributes on that object type in Attio, represented by their slug.

> info ""
> Every Attio attribute has both an ID and a slug, and you can use either to reference
> those attributes in this action. To find this value, on the object settings page, select
> the "Attributes" tab, locate your attribute, then click on the **︙** button and select
> "Copy slug".

Here's an example configuration that sets the `description`, `name` and `company`
attributes on the Person object:

| Select event variable                   | Enter key name | Notes                                                              |
|-----------------------------------------|----------------|--------------------------------------------------------------------|
| `traits.description`                    | description    |                                                                    |
| `traits.last_name`, `traits.first_name` | name           | Person names must be formatted as `Last name(s), First name(s)`    |
| `traits.domain`                         | company        | A Company relationship can be populated using the Company's domain |

You can also use the same approach to specify additional properties on the User object.
Please note that by default, the User object doesn't specify many attributes; the
expectation is that you'll add your own that make the most sense for your product. All
custom attributes can be specified here, please see [attribute types](#attribute-types)
below for more information.

## Group Workspace

Create or update a **Company** using the provided domain, then create or update a
**Workspace** using the provided name. By default, this mapping runs for `group` events.

*This mapping is a special form of [Assert Record](#assert-record), because it asserts
both a Company and Workspace and links them together. If you only need to assert either a
Company or Workspace, you should configure [Assert Record](#assert-record) instead.*

In Attio, a **Company** can have names and domains, as well as enriched properties like
ARR or category.

Meanwhile, a **Workspace** represents a group of Users in your product. Workspaces might
have feature flags, billing configurations, customer support representatives, etc. A
Company can have many Workspaces.

> info ""
> To use the Workspace standard object, you'll need to make sure it's activated first. Visit
> your [Workspace Settings > Objects](https://app.attio.com/_/settings/data/objects) page
> and click the "Activate" button next to the Workspaces object.

This mapping makes the assumption that your Segment event includes two properties:

  1. A `domain` property, to create or update a Company
  2. A `id` property, to create or update an associated Workspace

You can specify additional attributes to be mapped on the **Edit Mapping** page.

For example, you could set some additional properties on the Company using these Mapping
Fields under "Additional Company attributes". The column on the left should contain
properties from your event, or custom text, and the column on the right should reference
attributes on that object type in Attio, represented by their slug. For example:

| Select event variable                   | Enter key name |
|-----------------------------------------|----------------|
| `traits.twitter_handle`                 | twitter        |

Similarly, you can also set some additional properties on the Workspace. All
custom attributes can be specified here, please see [attribute types](#attribute-types)
below for more information.

## Assert Record

Create or update a single type of Object, given a matching attribute name and value. For
example, you could assert that a Company exists using a given `domain` property.

This mapping makes the assumption that your data includes the matching property. For the
following example, assume you have domain and twitter properties, like so:

```json
{
    "type": "identify",
    "traits": {
        "domain": "app.attio.com",
        "twitter_handle": "@attio"
    }
}
```

First, you'll need to set the "Attio Object" property - it should pre-populate with all of
the activated objects in your Attio instance. Then, you'll need to set the "Matching
Attribute" property. This is the slug for the attribute in Attio, and must also be present
in your "Attributes" mapping in the next form. In this example, you'll select "Company" as
the Attio Object, and "domains" as the Matching Attribute.

You would then need to ensure the Attributes mapping is populated like so:

| Select event variable                   | Enter key name |
|-----------------------------------------|----------------|
| `traits.domain`                         | domains        |
| `traits.twitter_handle`                 | twitter        |

When this mapping runs, Attio will try to find an existing Company where one of the
domains matches the one you've provided here. If it finds it, it will update the `twitter`
attribute with the value `"@attio"`. If it doesn't find it, a new Company will be created
with both the domain and twitter handles above.


## Attribute types

The Attio Action can write all types of attribute to Attio. Below is an example of the
format that each attribute must be; please note that you'll get validation failures if any
of these are incorrect. To unset an attribute, you can also pass `null` as the value.

| `type`               | Format                                                                                  | Example values                                              |
|----------------------|-----------------------------------------------------------------------------------------|-------------------------------------------------------------|
| `actor-reference`    | An email address of a workspace member                                                  | `"alice@attio.com"`                                         |
| `checkbox`           | Boolean                                                                                 | `true`, `false`                                             |
| `currency`           | Number with up to 4 decimal places                                                      | `99`, `29.9999`                                             |
| `date`               | YYYY-MM-DD                                                                              | `"2023-09-28"`                                              |
| `domain`             | `{domain}.{tld}`                                                                        | `"app.attio.com"`, `"www.example.com"`                      |
| `email`              | A valid email address                                                                   | `"person@example.com"`                                      |
| `location`           | String with all valid address parts combined                                            | "1 Infinite Loop, Cupertino, CA, US"                        |
| `number`             | Number, stored as a 64 bit float                                                        | `42.192`, `17`                                              |
| `personal-name`      | Last name(s), First name(s) *(note the comma in the middle)*                            | `"Bloggs, Joe"`                                             |
| `phone-number`       | [E.164 format](https://en.wikipedia.org/wiki/E.164), starting with `+...`               | `"+15558675309"`                                            |
| `pipeline`           | A UUID or title representing the status                                                 | `"open"`, `"closed"`                                        |
| `rating`             | Integer from 0 to 5                                                                     | `0`, `5`                                                    |
| `record-reference`   | To a person, an email. To a company, a domain. UUID of other entity always supported.   | `"person@example.com"`, `"app.attio.com"`, `"0677efa..."`   |
| `select`             | A UUID or title representing the option                                                 | `"open"`                                                    |
| `text`               | String                                                                                  | `"A piece of text"`                                         |
| `timestamp`          | ISO8601, e.g. YYYY-MM-DDTHH:MM:SS                                                       | `"2023-09-28 04:39:17.000"`                                 |
