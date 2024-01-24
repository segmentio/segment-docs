---
title: 'Spec: Identify'
---

The Segment Identify call lets you tie a user to their actions and record traits about them.  It includes a unique User ID and any optional traits you know about the user, like their email, name, and more.

{% include components/reference-button.html href="https://university.segment.com/introduction-to-segment/299968?reg=1&referrer=docs" icon="media/academy.svg" title="Segment University: The Identify Method" description="Check out our high-level overview of the Identify method in Segment University. (Must be logged in to access.)" %}

Segment recommends that you make an Identify call:

- After a user first registers
- After a user logs in
- When a user updates their info (for example, they change or add a new address)

The first three examples are pretty self-explanatory, but many might ask: why you would call Identify on every page load if you're storing the `userId` in the cookie/local storage?

Calling Identify in one of Segment's [libraries](/docs/connections/sources/) is one of the first steps to getting started with Segment. Refer to library-specific documentation for more details.

Here's the payload of a typical Identify call with most [common fields](/docs/connections/spec/common/) removed:

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

And here's the corresponding JavaScript event that would generate the above payload:

```js
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@example.com",
  plan: "premium",
  logins: 5
});
```
{% include content/syntax-note.md %}

Beyond the common fields, an Identify call has the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-identify-traits.md %}
  {% include content/spec-field-user-id.md %}
</table>

> info ""
> Note that these traits coming in from your source events are called [custom traits](/docs/unify/traits/custom-traits/).

## Example

Here's a complete example of an Identify call:

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
### Create your own Identify call

Use the following interactive code pen to see what your Identify calls would look like with user-provided information:

{% include components/codepens/identify-spec.html %}

## Identities

The Identify call specifies a customer identity that you can reference across the customer's whole lifetime. **Every Identify call must have a [User ID](/docs/connections/spec/identify#user-id) or an [Anonymous ID](/docs/connections/spec/identify#anonymous-id)**, depending on how much you know about the user in question.

### Anonymous ID

There are certain cases where you don't actually know who the user is according to your database, but you still want to be able to tie them to traits, events, or page views. For example, you may not know who a user is when tracking newsletter signups or anonymous page views.

In these cases, you should use an Anonymous ID.

The Anonymous ID can be any pseudo-unique identifier. For example, on your servers you can use a session id. If you don't have any readily available identifier, you can always generate a new random one—Segment recommends [UUIDs](http://en.wikipedia.org/wiki/Universally_unique_identifier){:target="_blank"}.

> info ""
> Segment's [browser and mobile libraries](/docs/connections/sources/) automatically use Anonymous IDs to keep track of users as they navigate around your website or app, so you don't need to worry about them when using those libraries.

Here's an example of a JavaScript event for an anonymous user:

```js
analytics.identify({
  subscriptionStatus: 'inactive'
});
```

### User ID

User IDs are a more permanent and robust identifier, like a database ID. Since these IDs are consistent across a customer's lifetime, Identify calls should include a User ID as often as possible.

A User ID is usually the unique identifier that you recognize a user by in your own database. For example, if you're using MongoDB it might look something like `507f191e810c19729de860ea`.

Segment recommends using database IDs instead of simple email addresses or usernames, because database IDs _never_ change. That guarantees that even if the user changes their email address, you can still recognize them as the same person in all of your analytics tools. And even better, you'll be able to correlate analytics data with your own internal database.

> success ""
> Instead of using an email address or a username as a User ID, send them along as [custom traits](/docs/unify/traits/custom-traits/).

## Custom traits

[Custom traits](/docs/unify/traits/custom-traits/) are pieces of information you know about a user that are included in an Identify call. These could be demographics like `age` or `gender`, account-specific like `plan`, or even things like whether a user has seen a particular A/B test variation.

Segment has reserved some custom traits that have semantic meanings for users, and will handle them in special ways. For example, Segment always expects `email` to be a string of the user's email address. Segment sends this on to destinations like _Mailchimp_ that require an email address for their tracking.

You should **only use reserved traits for their intended meaning**.

Reserved custom traits Segment has standardized:

| **Trait**     | **Type** | **Description**          |
|---------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `address`     | Object   | Street address of a user optionally containing:  `city`, `country`, `postalCode`, `state`, or `street`   |
| `age`         | Number   | Age of a user           |
| `avatar`      | String   | URL to an avatar image for the user  |
| `birthday`    | Date     | User's birthday         |
| `company`     | Object   | Company the user represents, optionally containing: `name` (String), `id` (String or Number), `industry` (String), `employee_count` (Number) or `plan` (String) |
| `createdAt`   | Date     | Date the user's account was first created. Segment recommends using [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} date strings.       |
| `description` | String   | Description of the user |
| `email`       | String   | Email address of a user |
| `firstName`   | String   | First name of a user    |
| `gender`      | String   | Gender of a user        |
| `id`          | String   | Unique ID in your database for a user      |
| `lastName`    | String   | Last name of a user     |
| `name`        | String   | Full name of a user. If you only pass a first and last name Segment automatically fills in the full name for you.      |
| `phone`       | String   | Phone number of a user  |
| `title`       | String   | Title of a user, usually related to their position at a specific company. Example: "VP of Engineering"                                  |
| `username`    | String   | User's username. This should be unique to each user, like the usernames of Twitter or GitHub.             |
| `website`     | String   | Website of a user       |

> info ""
> You might be used to some destinations recognizing special traits by slightly different names. For example, Mixpanel recognizes a `$created` trait when the user's account was first created, while Intercom recognizes the same trait as `created_at` instead. Segment attempts to handle all the destination-specific conversions for you automatically. If you need help understanding if a specific field will be converted to a destination, take a look at Segment's [open source integration code](https://github.com/segment-integrations?q=&type=all&language=&sort=){:target="_blank"}, view the destination's documentation, or [contact Segment support](https://app.segment.com/workspaces?contact=1){:target="_blank"}.

**You can pass these reserved traits using camelCase or snake_case**, so in JavaScript you can match the rest of your camel-case code by sending `firstName`, while in Ruby you can match your snake-case code by sending `first_name`. That way the API never seems alien to your code base. Keep in mind that not all destinations support these reserved traits, so sending these traits in camelCase and snake_case can result in two sets of traits in other destinations.
