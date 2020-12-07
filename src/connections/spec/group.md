---
title: 'Spec: Group'
---

The `group` API call is how you associate an individual user with a group—be it a company, organization, account, project, team or whatever other crazy name you came up with for the same concept!

{% include components/reference-button.html href="https://university.segment.com/introduction-to-segment/324252?reg=1&referrer=docs" icon="media/academy.svg" title="Segment University: The Segment Methods" description="Check out our high-level overview of these APIs in Segment University. (Must be logged in to access.)" %}

A user can be in more than one group; however, not all platforms support multiple groups. It also lets you record custom traits about the group, like industry or number of employees.  Calling `group` is a slightly more advanced feature, but it's helpful if you have accounts with multiple users.

Here's the payload of a typical `group` call, with most [common fields](/docs/connections/spec/common/) removed:

```json
{
  "type": "group",
  "groupId": "0e8c78ea9d97a7b8185e8632",
  "traits": {
    "name": "Initech",
    "industry": "Technology",
    "employees": 329,
    "plan": "enterprise",
    "total billed": 830
  }
}
```

And here's the corresponding Javascript event that would generate the above payload:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

Beyond the common fields, the `group` call takes the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-group-id.md %}
  {% include content/spec-field-group-traits.md %}
</table>


## Example

Here's a complete example of a `group` call:

```js
{
  "anonymousId": "507f191e810c19729de860ea",
  "channel": "browser",
  "context": {
    "ip": "8.8.8.8",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36"
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "receivedAt": "2015-02-23T22:28:55.387Z",
  "sentAt": "2015-02-23T22:28:55.111Z",
  "timestamp": "2015-02-23T22:28:55.111Z",
  "traits": {
    "name": "Initech",
    "industry": "Technology",
    "employees": 329,
    "plan": "enterprise",
    "total billed": 830
  },
  "type": "group",
  "userId": "97980cfea0067",
  "groupId": "0e8c78ea9d97a7b8185e8632",
  "version": "1.1"
}
```

## Identities

{% include content/spec-identities.md %}

## Group ID

A Group ID is the unique identifier which you recognize a group by in your own database. For example, if you're using MongoDB it might look something like `507f191e810c19729de860ea`.


## Traits

Traits are pieces of information you know about a group that are passed along with the `group` call, like `employees` or `website`.

We've reserved some traits that have semantic meanings for groups, and we handle them in special ways. You should **only use reserved traits for their intended meaning**.

The following are the reserved traits we have standardized:

<table>
  <tr>
    <td>**Trait**</td>
    <td>**Type**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>`address`</td>
    <td>Object</td>
    <td>Street address of a group
      This should be a dictionary containing optional `city`, `country`, `postalCode`, `state` or `street`.</td>
  </tr>
  <tr>
    <td>`avatar`</td>
    <td>String</td>
    <td>URL to an avatar image for the group</td>
  </tr>
  <tr>
    <td>`createdAt`</td>
    <td>Date</td>
    <td>Date the group's account was first created
    We recommend [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) date strings.</td>
  </tr>
  <tr>
    <td>`description`</td>
    <td>String</td>
    <td>Description of the group, like their personal bio</td>
  </tr>
  <tr>
    <td>`email`</td>
    <td>String</td>
    <td>Email address of group</td>
  </tr>
  <tr>
    <td>`employees`</td>
    <td>String</td>
    <td>Number of employees of a group, typically used for companies</td>
  </tr>
  <tr>
    <td>`id`</td>
    <td>String</td>
    <td>Unique ID in your database for a group</td>
  </tr>
  <tr>
    <td>`industry`</td>
    <td>String</td>
    <td>Industry a user works in, or a group is part of</td>
  </tr>
  <tr>
    <td>`name`</td>
    <td>String</td>
    <td>Name of a group</td>
  </tr>
  <tr>
    <td>`phone`</td>
    <td>String</td>
    <td>Phone number of a group</td>
  </tr>
  <tr>
    <td>`website`</td>
    <td>String</td>
    <td>Website of a group</td>
  </tr>
  <tr>
    <td>`plan`</td>
    <td>String</td>
    <td>Plan that a group is in</td>
  </tr>
</table>

**Note:** You might be used to some destinations recognizing special properties differently. For example, Mixpanel has a special `track_charges` method for accepting revenue. Luckily, you don't have to worry about those inconsistencies. Just pass us `revenue`.  **We'll handle all of the destination-specific conversions for you automatically.** Same goes for the rest of the reserved properties.

**Traits are case-insensitive**, so in Javascript you can match the rest of your camel-case code by sending `createdAt`, and in Ruby you can match your snake-case code by sending `created_at`. That way the API never seems alien to your code base.
