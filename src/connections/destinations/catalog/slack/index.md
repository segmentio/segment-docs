---
rewrite: true
title: Slack Destination
maintenance: true
id: 56748689e954a874ca44ccfb
---
[Slack](https://slack.com/) is a team collaboration tool where work flows. It's where the people you need, the information you share, and the tools you use come together to get things done.

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Slack" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In your Slack custom integration settings, create a new [Incoming Webhook](https://my.slack.com/services/new/incoming-webhook/) URL by selecting a Slack channel associated with your account.
4. Enter this in your Segment UI settings under 'Incoming Webhook URL'. The Slack channel you selected will be the default channel which will receive events.

## Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

### Whitelisted Traits
By default, your `identify` calls will not be sent through to Slack unless you have whitelisted a `trait` and the `identify` call contains that `trait`. If you allowlist multiple `traits` in the Segment app's destination settings under "Whitelisted Traits", then the `identify` call must contain all of them in order to be sent into your Slack. Following the code example above, we can allowlist the trait names of `name` and `email`.

### Identify Template
Once you've saved your whitelisted traits, you can now use them alongside [Handlebars expressions](https://handlebarsjs.com/guide/expressions.html#expressions) syntax within a template. Make sure you reference the spec for the [Identify method](/docs/connections/spec/identify/) and [common object](/docs/connections/spec/common/). `Identify` events that contain the whitelisted `traits` will appear as a Slack message with the following default template:
```
{% raw %}
Identified user {{name}}. \n\{{traits}}
{% endraw %}
```
where "name" is the first found of the following:
* `context.traits.name`
* `context.traits.firstName` + `context.traits.lastName`
* `context.traits.username`
* `properties.email`
* `context.traits.email`
* `User + userId`
* `Anonymous user + anonymousId`

Using the above code example, you can create the following template:

```
{% raw %}
The user {{name}} has an email of {{email}}
{% endraw %}
```

Which would result in the following message within your Slack channel:

```
The user John Doe has an email of john.doe@example.com
```

## Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call using the analytics.js library would look like:

```javascript
analytics.track('Email Opened', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

### Event Channels
By default, all `track` events are sent to the default Slack channel configured in the Segment UI when [getting started](/docs/connections/destinations/catalog/slack/#getting-started). To prevent events from sending you will need to modify your track call to use [selective integrations](/docs/connections/sources/catalog/libraries/website/javascript/#selecting-destinations-with-the-integrations-object). Business Tier customers also have the option to filter the events within the "Schema" section of the Segment UI.

If you would like to have specific events be sent to a particular channel (#channel) or user (@user) using a direct message, you can specify this in the "Events Channels" settings within the Segment UI.


### Event Templates
Event templates also use [Handlebars expressions](https://handlebarsjs.com/guide/expressions.html) syntax. Make sure you reference the spec for the [Track method](/docs/connections/spec/track/) and [common object](/docs/connections/spec/common/). `Track` events will trigger a Slack message with the following default template:

```
{% raw %}
{{name}} did {{event}}.
{% endraw %}
```

"event" is the event name and "name" is found with the same logic as that of the "name" in the [Identify template](/docs/connections/destinations/catalog/slack/#identify-template).

The basic Track structure:

```json
{
  "type": "track",
  "event": "Email Opened",
  "properties": {
    "plan": "Pro Annual",
    "custom" : "Bay Area",
    "name": "Peter Reinhardt"
  }
}
```

Using the above code example, you can enter the event name `Email Opened`
and create the following template:

```js
{% raw %}
{{name}} opened an email from {{properties.name}} ({{properties.email}})
{% endraw %}
```

Which would result in the following message within your Slack channel depending on how "name" was set:

```
Jane opened an email from John Doe (john.doe@example.com)
```

### Regex Matching
In addition to exact event names, you can also enter regex patterns for channels and templates to map multiple events to a single channel or template rather than creating a mapping for each individual event. An example which captures all event names in both lower and upper case ending in "-ing" would look like:

```regex
/[a-zA-Z]+ing$/g
```

More information on regex can be found [here](http://www.zytrax.com/tech/web/regex.htm).


## Troubleshooting

### Page, Identify, Group calls are not showing up
The Slack Destination does not support `page` or `group` calls. Only `track` events are supported by default. Remember that [`track.properties` object](/docs/connections/sources/catalog/libraries/website/javascript/#track) is an open dictionary and may include any data you choose.

In order for `identify` events to work, make sure you [whitelist the traits](/docs/connections/destinations/catalog/slack/#whitelisted-traits).

### I see [object Object] in my Slack message
If you try to print an object (for example, {% raw %} `{{properties}}` {% endraw %} ), you will see [object Object] in Slack. Drill down to a primitive type value (for example, `properties.plan`).
