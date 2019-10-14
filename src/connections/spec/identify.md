---
title: 'Spec: Identify'
sidebar: Identify
contributors:
  - name: Paul Mccall
    position: Lead Developer
    image_path: paul-mccall.png
    date: 23.08.2019
related:
  - "/connections/sources/catalog/"
  - "/connections/sources/faq/"
  - "/connections/sources/guides/"
---

## Identify

`identify` lets you tie a user to their actions and record traits about them.  It includes a unique User ID and any optional traits you know about them like their email, name, etc.

Our recommendation for when and how often you should call identify is as follows:

- After a user registers
- After a user logs in
- When a user updates their info (eg changes or adds a new address)
- Upon loading any pages that are accessible by a logged in user (optional)

The first three examples are pretty self-explanatory, but many might ask: why you would call identify on every page load if we’re storing the userId in the cookie/local storage?

Let’s imagine this scenario:

I log into your app. Identify is called. For whatever reason, I close the browser and don’t return until later. There’s no way of knowing where I will reenter your app from. I could start my session from anywhere. And because there are many tools out there that require an initial identify call for certain features (e.g. Intercom chat widget) it’s important to tell your end tools who the user is when they first start their session.

Calling `identify` in one of our [libraries](/docs/sources/) is one of the first steps to getting started with Segment. Please refer to library-specific documentation for more details.

Here's the payload of a typical `identify` call with most [common fields](/docs/spec/common/) removed:

```json
{
  "type": "identify",
  "traits": {
    "name": "Peter Gibbons",
    "email": "peter@initech.com",
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
  email: "peter@initech.com",
  plan: "premium",
  logins: 5
});
```

Beyond the common fields, an `identify` call has the following fields:

| Field                             | Type        | Description       |
| ---                               | ---         | ---               |
| `traits` <br> optional            | Object      | Free-form dictionary of traits of the user, like `email` or `name`. <br> See the [Traits field docs](/docs/spec/identify#traits) |
| `userId` <br> optional/required   | String      | Unique identifier for the user in your database. A userId or an anonymousId is required.<br> See the [Identities docs](/docs/spec/identify#identities) for more detail. |

{% include components/alert.html type="success" content="Your message has been sent successfully. This is a paragraph showing alert box. Indicates a successful or positive action." %}

## Example

Here's a complete example of an `identify` call:

```json
{
  "type": "identify",
  "traits": {
    "name": "Peter Gibbons",
    "email": "peter@initech.com",
    "plan": "premium",
    "logins": 5
  },
  "userId": "97980cfea0067"
}
```

## Identities

The `identify` call specifies a customer identity that you can reference across the customer's whole lifetime. **Every `identify` call must have a [User ID](/docs/spec/identify#user-id) or an [Anonymous ID](/docs/spec/identify#anonymous-id)**, depending on how much you know about the user in question.

{% include components/alert.html type="info" content="Please read the comments carefully. This is a paragraph showing information box. Indicates a neutral informative change or action." %}

### Anonymous ID

There are certain cases where you don't actually know who the user is according to your database, but you still want to be able to tie them to traits, events or page views. For example, you may not know who a user is when tracking newsletter signups or anonymous page views.

In these cases, you should use an Anonymous ID.

{% include components/alert.html type="warning" content="There was a problem with your network connection. Indicates a warning that might need attention. This is a paragraph showing warning box." %}

The Anonymous ID can be any pseudo-unique identifier. For example, on your servers you can use a session id. If you don't have any readily available identifier, you can always generate a new random one—we recommend [UUIDs](http://en.wikipedia.org/wiki/Universally_unique_identifier).

{% capture AnonymousID_note %}
  Our [browser and mobile libraries](/docs/sources/) **automatically** use Anonymous IDs under the covers to keep track of users as they navigate around your website or app, so you don’t need to worry about them when using those libraries.
{% endcapture %}
{% include components/note.html content=AnonymousID_note %}

### User ID

User IDs are a more permanent and robust identifier, like a database ID. Since these IDs are consistent across a customer's lifetime, `identify` calls should include a User ID as often as possible.

A User ID is usually the unique identifier that you recognize a user by in your own database. For example, if you're using MongoDB it might look something like `507f191e810c19729de860ea`.

We recommend using database IDs instead of simple email addresses or usernames, because database IDs _never_ change. That guarantees that even if the user changes their email address, you can still recognize them as the same person in all of your analytics tools. And even better, you'll be able to correlate analytics data with your own internal database.

**Instead of using an email address or a username as a User ID, send them along as [traits](/docs/spec/identify#traits).**

![](../images/user-id.png)

## Traits

Traits are pieces of information you know about a user that are included in an `identify` call. These could be demographics like `age` or `gender`, account-specific like `plan`, or even things like whether a user has seen a particular A/B test variation. Up to you!

We've reserved some traits that have semantic meanings for users, and we handle them in special ways. For example, we always expect `email` to be a string of the user's email address. We'll send this on to destinations like _Mailchimp_ that require an email address for their tracking.

You should **only use reserved traits for their intended meaning**.

Reserved traits we've standardized:

| Trait         | Type            | Description             |
| ---           | ---             | ---                     |
| `address`     | Object          | Street address of a user optionally containing:  `city`, `country`, `postalCode`, `state` or `street` |
| `age`         | Number          | Age of a user           |
| `avatar`      | String          | URL to an avatar image for the user |
| `birthday`    | Date            | User's birthday         |
| `company`     | Object          | Company the user represents, optionally containing: `name` (a String), `id` (a String or Number), `industry` (a String), `employee_count` (a Number) or `plan` (a String) |
| `createdAt`   | Date            | Date the user's account was first created <br> We recommend [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) date strings. |
| `description` | String          | Description of the user |
| `email`       | String          | Email address of a user |
| `firstName`   | String          | First name of a user    |
| `gender`      | String          | Gender of a user        |
| `id`          | String          | Unique ID in your database for a user |
| `lastName`    | String          | Last name of a user     |
| `name`        | String          | Full name of a user <br> If you only pass a first and last name we'll automatically fill in the full name for you. |
| `phone`       | String          | Phone number of a user  |
| `title`       | String          | Title of a user, usually related to their position at a specific company <br> Example: "VP of Engineering" |
| `username`    | String          | User's username <br> This should be unique to each user, like the usernames of Twitter or GitHub. |
| `website`     | String          | Website of a user |

{% capture Traits_note %}
  You might be used to some destinations recognizing special traits by slightly different names. For example, Mixpanel recognizes a `$created` trait when the user's account was first created, while Intercom recognizes the same trait as `created_at` instead.  Luckily, you don't have to worry about those inconsistencies. Just pass us `createdAt`. **We’ll handle all of the destination-specific conversions for you automatically.**  Same goes for the rest of the reserved traits.
  **You can pass these reserved traits using camelCase or snake_case**, so in Javascript you can match the rest of your camel-case code by sending `firstName`, while in Ruby you can match your snake-case code by sending `first_name`. That way the API never seems alien to your code base. Keep in mind that not all destinations support these reserved traits, so sending these traits in camelCase and snake_case can result in two sets of traits in other destinations.
{% endcapture %}

{% include components/note.html content=Traits_note %}
