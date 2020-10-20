---
title: 'Spec: Identify'
related:
  - "/docs/connections/sources/catalog/"
---

`identify` lets you tie a user to their actions and record traits about them.  It includes a unique User ID and any optional traits you know about them like their email, name, etc.

{% include components/media-icon.html href="https://university.segment.com/introduction-to-segment/299968?reg=1&referrer=docs" icon="media/icon-academy.svg" title="Segment University: The Identify Method" content="Check out our high-level overview of the Identify method in Segment University. (Must be logged in to access.)" %}

Our recommendation for when and how often you should call `identify` is as follows:

- After a user registers
- After a user logs in
- When a user updates their info (eg changes or adds a new address)
- Upon loading any pages that are accessible by a logged in user (optional)

The first three examples are pretty self-explanatory, but many might ask: why you would call identify on every page load if we're storing the userId in the cookie/local storage?

Let's imagine this scenario:

I log into your app. Identify is called. For whatever reason, I close the browser and don't return until later. There's no way of knowing where I will reenter your app from. I could start my session from anywhere. And because there are many tools out there that require an initial identify call for certain features (e.g. Intercom chat widget) it's important to tell your end tools who the user is when they first start their session.

Calling `identify` in one of our [libraries](/docs/connections/sources/) is one of the first steps to getting started with Segment. Refer to library-specific documentation for more details.

Here's the payload of a typical `identify` call with most [common fields](/docs/connections/spec/common/) removed:

```json
{
  "type": "identify",
  "traits": {
    "name": "Peter Gibbons",
    "email": "peter@example.com",
    "plan": "premium",
    "logins": 5
  },
  "userId": "97980cfea0067"
}
```

And here's the corresponding Javascript event that would generate the above payload:

```js
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@example.com",
  plan: "premium",
  logins: 5
});
```

Beyond the common fields, an `identify` call has the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-identify-traits.md %}
  {% include content/spec-field-user-id.md %}
</table>


## Example

Here's a complete example of an `identify` call:

```json
{
  "anonymousId": "507f191e810c19729de860ea",
  "channel": "browser",
  "context": {
    "ip": "8.8.8.8",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36"
  },
  "integrations": {
    "All": false,
    "Mixpanel": true,
    "Salesforce": true
  },
  "messageId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db",
  "receivedAt": "2015-02-23T22:28:55.387Z",
  "sentAt": "2015-02-23T22:28:55.111Z",
  "timestamp": "2015-02-23T22:28:55.111Z",
  "traits": {
    "name": "Peter Gibbons",
    "email": "peter@example.com",
    "plan": "premium",
    "logins": 5,
    "address": {
      "street": "6th St",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94103",
      "country": "USA"
    }
  },
  "type": "identify",
  "userId": "97980cfea0067",
  "version": "1.1"
}
```

## Identities

The `identify` call specifies a customer identity that you can reference across the customer's whole lifetime. **Every `identify` call must have a [User ID](/docs/connections/spec/identify#user-id) or an [Anonymous ID](/docs/connections/spec/identify#anonymous-id)**, depending on how much you know about the user in question.

### Anonymous ID

There are certain cases where you don't actually know who the user is according to your database, but you still want to be able to tie them to traits, events or page views. For example, you may not know who a user is when tracking newsletter signups or anonymous page views.

In these cases, you should use an Anonymous ID.

The Anonymous ID can be any pseudo-unique identifier. For example, on your servers you can use a session id. If you don't have any readily available identifier, you can always generate a new random one—we recommend [UUIDs](http://en.wikipedia.org/wiki/Universally_unique_identifier).

**Note:** Our [browser and mobile libraries](/docs/connections/sources/) **automatically** use Anonymous IDs under the covers to keep track of users as they navigate around your website or app, so you don't need to worry about them when using those libraries.

Here's an example of a Javascript event for an anonymous user:

```js
analytics.identify({
  subscriptionStatus: 'inactive'
});
```

### User ID

User IDs are a more permanent and robust identifier, like a database ID. Since these IDs are consistent across a customer's lifetime, `identify` calls should include a User ID as often as possible.

A User ID is usually the unique identifier that you recognize a user by in your own database. For example, if you're using MongoDB it might look something like `507f191e810c19729de860ea`.

We recommend using database IDs instead of simple email addresses or usernames, because database IDs _never_ change. That guarantees that even if the user changes their email address, you can still recognize them as the same person in all of your analytics tools. And even better, you'll be able to correlate analytics data with your own internal database.

**Instead of using an email address or a username as a User ID, send them along as [traits](/docs/connections/spec/identify#traits).**

## Traits

Traits are pieces of information you know about a user that are included in an `identify` call. These could be demographics like `age` or `gender`, account-specific like `plan`, or even things like whether a user has seen a particular A/B test variation. Up to you!

We've reserved some traits that have semantic meanings for users, and we handle them in special ways. For example, we always expect `email` to be a string of the user's email address. We'll send this on to destinations like _Mailchimp_ that require an email address for their tracking.

You should **only use reserved traits for their intended meaning**.

Reserved traits we've standardized:

<table>
  <tr>
    <td>**Trait**</td>
    <td>**Type**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>`address`</td>
    <td>Object</td>
    <td>Street address of a user optionally containing:  `city`, `country`, `postalCode`, `state` or `street`</td>
  </tr>
  <tr>
    <td>`age`</td>
    <td>Number</td>
    <td>Age of a user</td>
  </tr>
  <tr>
    <td>`avatar`</td>
    <td>String</td>
    <td>URL to an avatar image for the user</td>
  </tr>
  <tr>
    <td>`birthday`</td>
    <td>Date</td>
    <td>User's birthday</td>
  </tr>
  <tr>
  <td>`company`</td>
  <td>Object</td>
  <td>Company the user represents, optionally containing: `name` (a String), `id` (a String or Number), `industry` (a String), `employee_count` (a Number) or `plan` (a String)</td>
  </tr>
  <tr>
    <td>`createdAt`</td>
    <td>Date</td>
    <td>Date the user's account was first created. We recommend [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) date strings.</td>
  </tr>
  <tr>
    <td>`description`</td>
    <td>String</td>
    <td>Description of the user</td>
  </tr>
  <tr>
    <td>`email`</td>
    <td>String</td>
    <td>Email address of a user</td>
  </tr>
  <tr>
    <td>`firstName`</td>
    <td>String</td>
    <td>First name of a user</td>
  </tr>
  <tr>
    <td>`gender`</td>
    <td>String</td>
    <td>Gender of a user</td>
  </tr>
  <tr>
    <td>`id`</td>
    <td>String</td>
    <td>Unique ID in your database for a user</td>
  </tr>
  <tr>
    <td>`lastName`</td>
    <td>String</td>
    <td>Last name of a user</td>
  </tr>
  <tr>
    <td>`name`</td>
    <td>String</td>
    <td>Full name of a user. If you only pass a first and last name Segment automatically fills in the full name for you.
    </td>
  </tr>
  <tr>
    <td>`phone`</td>
    <td>String</td>
    <td>Phone number of a user</td>
  </tr>
  <tr>
    <td>`title`</td>
    <td>String</td>
    <td>Title of a user, usually related to their position at a specific company. Example: "VP of Engineering"
    </td>
  </tr>
  <tr>
    <td>`username`</td>
    <td>String</td>
    <td>User's username. This should be unique to each user, like the usernames of Twitter or GitHub.</td>
  </tr>
  <tr>
    <td>`website`</td>
    <td>String</td>
    <td>Website of a user</td>
  </tr>
</table>

**Note:** You might be used to some destinations recognizing special traits by slightly different names. For example, Mixpanel recognizes a `$created` trait when the user's account was first created, while Intercom recognizes the same trait as `created_at` instead.  Luckily, you don't have to worry about those inconsistencies. Just pass us `createdAt`. **We'll handle all of the destination-specific conversions for you automatically.**  Same goes for the rest of the reserved traits.

**You can pass these reserved traits using camelCase or snake_case**, so in Javascript you can match the rest of your camel-case code by sending `firstName`, while in Ruby you can match your snake-case code by sending `first_name`. That way the API never seems alien to your code base. Keep in mind that not all destinations support these reserved traits, so sending these traits in camelCase and snake_case can result in two sets of traits in other destinations.
