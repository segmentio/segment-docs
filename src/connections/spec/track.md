---
title: 'Spec: Track'
---

The `track` API call is how you record any actions your users perform, along with any properties that describe the action.

{% include components/reference-button.html href="https://university.segment.com/introduction-to-segment/299975?reg=1&referrer=docs" icon="media/academy.svg" title="Segment University: The Track Method" description="Check out our high-level overview of the Track method in Segment University. (Must be logged in to access.)" %}

Each action is known as an event. Each event has a name, like **User Registered**, and properties. For example, a **User Registered** event might have properties like `plan` or `accountType`. Calling `track` in one of our [sources](/docs/connections/sources/) is one of the first steps to getting started with Segment.

Here's the payload of a typical `track` call with most [common fields](/docs/connections/spec/common/) removed:

```json
{
  "type": "track",
  "event": "User Registered",
  "properties": {
    "plan": "Pro Annual",
    "accountType" : "Facebook"
  }
}
```

And here's the corresponding JavaScript event that would generate the above payload:

```js
analytics.track("User Registered", {
  plan: "Pro Annual",
  accountType: "Facebook"
});
```
{% include content/syntax-note.md %}

Beyond the common fields, the `track` call has the following fields:

<table>
  {% include content/spec-table-header.md %}
  {% include content/spec-field-event.md %}
  {% include content/spec-field-event-properties.md %}
</table>

## Example

Here's a complete example of a `track` call:

```json
{
  "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
  "context": {
    "library": {
      "name": "analytics.js",
      "version": "2.11.1"
    },
    "page": {
      "path": "/academy/",
      "referrer": "",
      "search": "",
      "title": "Analytics Academy",
      "url": "https://segment.com/academy/"
    },
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36",
    "ip": "108.0.78.21"
  },
  "event": "Course Clicked",
  "integrations": {},
  "messageId": "ajs-f8ca1e4de5024d9430b3928bd8ac6b96",
  "properties": {
    "title": "Intro to Analytics"
  },
  "receivedAt": "2015-12-12T19:11:01.266Z",
  "sentAt": "2015-12-12T19:11:01.169Z",
  "timestamp": "2015-12-12T19:11:01.249Z",
  "type": "track",
  "userId": "AiUGstSDIg",
  "originalTimestamp": "2015-12-12T19:11:01.152Z"
}
```

## Identities

{% include content/spec-identities.md %}

## Event

Every `track` call records a single user action. Segment calls these "events", and recommend that you make your event names human-readable, so that everyone on your team (even you, after all that caffeine) can know what they mean instantly.

Don't use nondescript names like **Event 12** or **TMDropd**. Instead, use unique but recognizable names like **Video Recorded** and **Order Completed**.

**Segment recommends event names built from a noun and past-tense verb.**
For more information about best practices in event naming, check out Segment's [Analytics Academy lesson on best practices for naming conventions for clean data](https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/){:target="_blank"}.

Segment has standardized a series of reserved event names that have special semantic meaning. We map these events to tools that support them whenever possible. See the [Semantic Events docs](/docs/connections/spec/semantic/) for more detail.

## Properties

Properties are extra pieces of information you can tie to events you track. They can be anything that will be useful while analyzing the events later. Segment recommends sending properties whenever possible because they give you a more complete picture of what your users are doing.

Segment has reserved some properties that have semantic meanings, and handle them in special ways. For example, we always expect `revenue` to be a dollar amount that we send to tools that handle revenue tracking.

You should **only use reserved properties for their intended meaning**.

The following are all of the reserved properties Segment has standardized that apply to all events. Check out the [Semantic Events docs](/docs/connections/spec/semantic/) for properties specific to individual reserved events.

| **Property** | **Type** | **Description**     |
|--------------|----------|---------------------|
| `revenue`    | Number   | Amount of revenue an event resulted in. This should be a decimal value, so a shirt worth $19.99 would result in a `revenue` of `19.99`.    |
| `currency`   | String   | Currency of the revenue an event resulted in. This should be sent in the [ISO 4127 format](http://en.wikipedia.org/wiki/ISO_4217){:target="_blank"}. If this isn't set, Segment assumes the revenue to be in US dollars. |
| `value`      | Number   | An abstract "value" to associate with an event. This is typically used in situations where the event doesn't generate real-dollar revenue, but has an intrinsic value to a marketing team, like newsletter signups.       |

**Note:** You might be used to some destinations recognizing special properties differently. For example, Mixpanel has a special `track_charges` method for accepting revenue. Luckily, you don't have to worry about those inconsistencies. Just pass along `revenue`.  **Segment will handle all of the destination-specific conversions for you automatically.** Same goes for the rest of the reserved properties.
