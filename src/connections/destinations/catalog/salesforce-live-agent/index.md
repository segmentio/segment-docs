---
title: Salesforce Live Agent Destination
strat: salesforce
hide-dossier: true
hidden: true
---

> info ""
> This destination is in Private Beta, and not publicly available. For more information, contact [Segment Support](https://segment.com/help/contact/).

## Getting Started

To get started, follow Salesforce's [instructions](https://help.salesforce.com/articleView?id=live_agent_create_deployments.htm&type=5) to create a live agent deployment. If you have already done this, navigate to the "deployment code" of the Live Agent deployment you would like to have Segment integrate with. It will look something like this:

```html
<script type='text/javascript' src='https://c.la3-c1cs-phx.salesforceliveagent.com/content/g/js/42.0/deployment.js'></script>
<script type='text/javascript'>
liveagent.init('https://d.la3-c1cs-phx.salesforceliveagent.com/chat', '1111D00000000FT', '00D3D000000FObV');
</script>
```

When you enable Salesforce Live Agent in Segment, we'll begin loading the Salesforce Live Agent web SDK on any pages you have Segment deployed. Their accompanying API functionality will be available to interact with however, **we will not initialize their API automatically**. This is because their API has two core functions:

- Control the visual configuration of the chat experience (set the size of the chat window, conditionally display buttons based on whether the chat agent is online/offline, etc.)
- Send data about the `Case`, `Account`, and `Contact` to your chat agent as well as your Salesforce CRM deployment using a pre-chat form

The latter functionality described above is what Segment integrates with. However, Salesforce's API stipulates that you must define the data you want to send to your Agent/Salesforce instance *before* you initialize their SDK.

This presents a problem because this data is generally only available after some kind of form submission by the user. Because Segment has no way of knowing if the page the user is on will contain such a form submission, we cannot decide at page load whether we need to initialize the Live Agent SDK right away (to allow for chat window customization) or wait until sometime after page load (once the user has submitted the information you request).

In short, **our integration cannot proactively initialize the Live Agent SDK on page load on your behalf**. The specific instructions regarding initialization options are outlined below.

## Initialization
In order to begin using the Salesforce Live Agent using Segment, follow these implementation guidelines.

1. On any page where you are not collecting user information, but do want to interact with the Salesforce Live Agent API (to achieve some of the functionality outlined [here](https://developer.salesforce.com/docs/atlas.en-us.live_agent_dev.meta/live_agent_dev/live_agent_chat_buttons_API.htm) for example), you must implement all the Live Agent SDK functionality natively **except** the actual loading of their `deployment.js` JavaScript library (the first line of the sample deployment code shown earlier). This will always be handled by Segment anywhere you are loading our JavaScript SDK.
2. On any page where you *are* collecting user information (using some kind of pre-chat form for example) that you would like to pass to Salesforce and/or your chat agent after the user completes the form, you must ensure you **do not** call `liveagent.init` natively **anywhere on the page** and ensure that you do invoke a properly formatted Identify event, Group event (this is optional), and finally a Live Chat Conversation Started event **in that order**.

## Identify
Calling `identify` does not actually trigger any kind of corresponding functionality in Salesforce Live Agent. Instead, the traits you define in this event are cached in the browser and used anytime a `Live Chat Conversation Started` event is invoked sometime in the future. You can map the [traits](/docs/connections/spec/identify/#traits) you pass in to Salesforce `Contact` fields, as well as information fields for your customer service agent to see in their chat console. These mappings are defined in the Contact Mappings destination setting.

## Group
Similar to calling `identify`, invoking our `group` method does not actually trigger any kind of corresponding functionality in Salesforce Live Agent. Instead, the [traits](/docs/connections/spec/group/#traits) you define in this event are cached in the browser and used anytime a [Live Chat Conversation Started](/docs/connections/destinations/catalog/salesforce-live-agent/#live-chat-conversation-started) event is invoked sometime in the future. You can map these properties to Salesforce `Account` fields, as well as information fields for your customer service agent to see in their chat console. These mappings are defined in the Account Mappings destination setting.

## Live Chat Conversation Started
The [Live Chat Conversation Started](/docs/connections/spec/live-chat/#live-chat-conversation-started) event is a `track` event that is part of our [Live Chat](/docs/connections/spec/live-chat/) event spec. When invoked, Segment will begin looking for any cached user traits (from previous `identify` events) as well as group traits (from previous `group` events) and map them to Salesforce's API based on the mappings you defined in your settings.

The properties that you pass into the `Live Chat Conversation Started` event can also be mapped to a Salesforce `Case` object. These mappings are defined in the Case Mappings destination setting.

**Important:** If you have defined mappings to Salesforce `Contact` and/or `Account` objects in your settings, you must ensure that you have invoked an `identify` event and/or a `group` event sometime prior to invoking the `Live Chat Conversation Started` event.

## Deployment Code Settings
Many of the settings required to allow Segment to integrate with your Live Agent deployment are located in your Live Agent "deployment code" snippet. The following code snippet can be used to reference where you can find the values these settings require (setting names are capitalized):

```html
<script type='text/javascript' src='https://{HOSTNAME}.salesforceliveagent.com/content/g/js/42.0/deployment.js'></script>
<script type='text/javascript'>
liveagent.init('https://{LIVE_AGENT_ENDPOINT_URL}.salesforceliveagent.com/chat', {DEPLOYMENT_ID}, {ORG_ID});
</script>
```
