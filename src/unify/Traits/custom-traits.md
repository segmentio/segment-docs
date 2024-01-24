---
title: Custom Traits 

---

Custom traits are user or account traits collected from the Identify calls you send to Segment. For example, these could be demographics like `age` or `gender`, account-specific like `plan`, or even things like whether a user has seen a particular A/B test variation. From your sources, send custom traits as pieces of information that you know about a user in an Identify call.

As opposed to [computed traits](/docs/unify/traits/computed-traits/) which are computed from your source or warehouse data, custom traits are created from source events you pass into Segment.

## Using custom traits 

Here's the payload of a typical Identify call with custom traits (with most [common fields](/docs/connections/spec/common/) removed):

```json
{
  "type": "identify",
  "traits": {
    "name": "John Smith",
    "email": "john@example.com",
    "plan": "premium",
    "logins": 5
  },
  "userId": "97980cfea0067"
}
```

And here's the corresponding JavaScript event that would generate the above payload:

```js
analytics.identify("97980cfea0067", {
  name: "John Smith",
  email: "john@example.com",
  plan: "premium",
  logins: 5
});
```

> success ""
> Any source event where there's a `traits` object and key value pairs generates custom traits.

Custom traits are mutable and update to the latest value seen by the user's Identify events. 

When an audience that previously generated Identify events is deleted, the data for the audience key is still attached to profiles that entered the audience and becomes visible in Segment as a custom trait. 

Use the Profile explorer (**Unify > Profile explorer**) to view custom traits attached to a profile.
 

## Reserved custom traits

Segment has reserved some custom traits that have semantic meanings for users, and will handle them in special ways. For example, Segment always expects `email` to be a string of the user's email address. Segment sends this on to destinations like _Mailchimp_ that require an email address for their tracking.

You should **only use reserved custom traits for their intended meaning**.

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


To learn more about using an Identify call to tie custom traits to profiles, [visit Segment's Spec docs](/docs/connections/spec/identify/).


