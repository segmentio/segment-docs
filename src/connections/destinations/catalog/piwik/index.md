---
title: Piwik
---
## Getting Started

To get started using Piwik via Segment you'll need your Site ID and Server URL. Both are available in your Piwik snippet.


## Page

Our [`page`](/docs/spec/page) method triggers a call to Piwik's `trackPageView` method.

## Identify

Our [`identify`](/docs/spec/identify) method triggers a call to Piwik's `setUserId` method and will send the `userId`.


## Track

We'll record a Piwik event whenever you make a [`track`](/docs/spec/track) call.

Events can be sent from the browser, your server, or our mobile SDKs. Here's a basic [`track`](/docs/spec/track) example:

```javascript
analytics.track('Logged In');
```

For this example these event attributes are sent to Piwik:

<table>
  <tr>
    <td>**Event Category**</td>
    <td>All</td>
  </tr>
  <tr>
    <td>**Event Action**</td>
    <td>Logged In</td>
  </tr>
</table>

And another [`track`](/docs/spec/track) example, this time with all the available Piwik event parameters:

```javascript
analytics.track('Created Account', {
  category: 'Account',
  label: 'Premium',
  value: 30
})
```

That call will create a Piwik Event with these attributes:

<table>
  <tr>
    <td>**Event Category**</td>
    <td>Account</td>
  </tr>
  <tr>
    <td>**Event Action**</td>
    <td>Logged In</td>
  </tr>
  <tr>
    <td>**Event Name**</td>
    <td>Premium</td>
  </tr>
  <tr>
    <td>**Event Value**</td>
    <td>30</td>
  </tr>
</table>

For **Event Value** you can name the event property `value` or `revenue`. We'll look for `value` first, then fall back to `revenue`.

### Custom Variables

Piwik allows you to set [custom variables](http://piwik.org/docs/custom-variables/) with your pageviews and events. With Segment, you can set page-scoped custom variables with any `track` call you make with analytics.js.

Since these custom variables must be mapped to an index you define, which can change from call to call, the only way we can support these custom variables with full flexibility is to allow you to pass your map in the `context.Piwik.customVars` dictionary of each call.

To take advantage of this feature, your `track` calls should look like this:

```js
analytics.track('event', {
  property: 'property'
}, { integrations: {
  Piwik: {
    customVars: {
      1: ["<variableName>", "<variableValue>"],
      2: ['SubscriptionId', '1234'],
      3: ['PlanName', 'ENTERPRISE']
      }
    }
  }
})
```

### Goals

If you want to flag specific events as Piwik Goals you can do so by mapping those events in your Segment Source Destinations page under Piwik Settings.

![piwik goals settings](images/goals.png)

Fill in the event on the left and the Goal ID from Piwik on the right. Then every time the event happens we'll fire Piwik's `trackGoal` method.

{% include content/integration-foot.md %}
