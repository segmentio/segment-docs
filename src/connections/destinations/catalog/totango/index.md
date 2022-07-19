---
title: Totango Destination
id: 54521fdb25e721e32a72eefa
---
Our Totango destination code is all open-source on GitHub if you want to check it out: [JavaScript](https://github.com/segment-integrations/analytics.js-integration-totango), [Server](https://github.com/segmentio/integration-totango).

## Getting Started

To get started with Totango and Segment, toggle Totango on in your Segment destinations and add your **Service ID**, which you can find in your Totango settings.

Once you've done that, those new settings will propagate to our CDN (that usually takes around 45 minutes) and Totango will be live on your site! Since Totango is all about identified users, the next thing you'll want to do is add a few API calls with exactly the information Totango needs. We'll show you how..

**Note:** As part of setup, you should know the user and call `identify` before the `group` call. Remember that every `page` and `track` call that you want to show up in Totango must be tied to a `groupId` (Totango calls this Account ID). , however.

For our client-side Javascript library (Analytics.js) that means you need to call `group` at least once with a `groupId` and we will cache it and attach it to future calls to other methods.

For server-side and mobile libraries you must include `context.groupId` in every call you want to be sent through to Totango so they can connect the dots between a call made to Segment and an account in their system.

- - -

## Group

Totango also needs to know what "account" the user belongs to. To record this, you'd use our [`group`](/docs/connections/spec/group/) method. Group also takes a unique ID (for the group this time!) and a dictionary of properties about the group. It looks like this:

A call to `group` is required before any `track` calls will be sent to Totango.

```js
analytics.group('sjsj2hdj2', {
  name: 'Initech',
  website: 'http://www.example.com'
});
```

Making a call like that will add the current user to the group, which maps directly to Totango's "accounts".

You should always call [`group`](/docs/connections/spec/group/) after your call to [`identify`](/docs/connections/spec/identify/), so that we know which user you want to associate with the group. To learn more about how [`group`](/docs/connections/spec/group/) works, check out our [Group docs](/docs/connections/spec/group/).

## Page

Totango allows you to split your application into functional sections known as `modules`. By default, Totango pulls this module out of the users current URL. You can customize this behavior by using our [`page`](/docs/connections/spec/page) method. You can pass `category` as a property to [`page`](/docs/connections/spec/page) and we'll set that as the `module` in Totango.

[`page`](/docs/connections/spec/page) takes the category of the page, the name of the page and any optional properties you want to associate with the pageview. The [`page`](/docs/connections/spec/page) call is included by default in your snippet, since it's a required call. Modify the [`page`](/docs/connections/spec/page) call inside the snippet or move it elsewhere, but don't delete it.

It looks like this:

```js
// Names and categorizes the page... sets the totango module to "Blog"
analytics.page('Blog', '15,000 Ways to Increase Conversion');
```

You can label as many categories / modules as you need, but as a best practice you'll probably want to have around 5 for a small – medium sized app to 20 for a very large web-application.


## Identify

The first thing Totango needs to know is "who is the user browsing your site?" You record this with our [`identify`](/docs/connections/spec/identify/) method. Identify takes the unique ID of a user and any traits you know about them. It looks like this:

```js
analytics.identify('29ej29d', {
  email: 'lawrence@example.com',
  name: 'Lawrence Drywall',
  age: 42
});
```

To learn more about how [`identify`](/docs/connections/spec/identify/) works, check out our [Identify docs](/docs/connections/spec/identify/). For example, `email` and `name` are two of our [special traits](/docs/connections/spec/identify/#traits) that we recognize semantically.

**If you're sending data using the server-side or mobile libraries**, you'll need to include `context.groupId`. Check out the [server-side](#server-side-methods-require-group-id) section to see how.


### Special Properties

Totango recognizes a few special properties for accounts that mean very specific things. For example, an account's `plan` indicates whether they are paying you or not. Here are the special properties for the [`group`](/docs/connections/spec/group/) method that Segment will recognize and translate for you automatically:

<table>
  <tr>
    <td>`created` _Date or String_</td>
    <td>The date when the account was first created. We will automatically change this from `created` to `'Create Date'` for the Totango API, but you should send it to us as `created`. If you don't provide this, Totango will default to the current date.</td>
  </tr>
  <tr>
    <td>`plan` _String_, _optional_</td>
    <td>The "Free" or "Paying" plan of the account. You can set up extra types of plans in your Totango settings if "Free" and "Paying" don't suit your needs. If you don't provide this, we'll default it to `"Free"`.</td>
  </tr>
</table>

To use the rest of the Totango's special properties, just pass them exactly like you would normally to Totango and we'll send them straight through!


## Track

Totango also lets you record any events a user triggers in your interface. To do that with Segment you'd use our [`track`](/docs/connections/spec/track/) method. If you're just starting out with events, we usually recommend recording 5-10 of your business's most important events. You can always add more later!

[`track`](/docs/connections/spec/track/) takes the name of the event and any optional properties you want to associate with the event. If you'd like to add a `category` to your `track` calls in addition to your `page` calls, you can add them as `properties`. It looks like this:

```js
analytics.track('Completed Purchase', {
  revenue: 42.99,
  shippingMethod: '2-day',
  category: 'Conversion'
});
```

To learn more about how [`track`](/docs/connections/spec/track/) works check out our [Track docs](/docs/connections/spec/identify/). For example, `revenue` is a special property that lets you semantically describe how much money you're making.

**If you're sending data using the server-side or mobile libraries**, you'll need to include `context.groupId`. Check out the [troubleshooting](#troubleshooting) section to see how.

- - -


## Troubleshooting


### Server-side Methods Require Group ID

Totango requires `groupId` on every `identify`, `page` and `track` call, so you'll need to pass it using `context.groupId`.

Here's a node `identify` example to get you started:

```js
analytics.identify({
  userId: '29ej29d',
  traits: {
    email: 'lawrence@example.com',
    name: 'Lawrence Drywall',
    age: 42
  },
  context: {
    groupId: 'sjsj2hdj2'
  }
});
```
