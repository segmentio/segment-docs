---
title: Schema Defaults and Event Requirements Removal FAQs
hidden: true
---

## Schema Defaults Removal FAQs

#### What is Schema Defaults?
Schema Defaults enables users to block new events and traits by default. This feature was launched to Private Beta in 2017 as a pre-cursor feature to Protocols.

#### How do I know if I’m using Schema Defaults?
Navigate to **Connections** and choose your source. In the **Settings** tab under **Schema Configuration**, if you see the **Schema Defaults** section and have any events or traits that are marked **Block** or **Omit**, you have enabled Schema Defaults.

![Schema Defaults](./images/schema-defaults-eol-1.png)

#### When will Schema Defaults be removed?
Schema Defaults will be removed on August 11, 2021.

#### What happens after Schema Defaults is removed?
Any events and traits that were blocked by Schema Defaults will continue to be blocked. Any new events and traits will automatically be allowed.

You can change to allow or block individual events/properties/traits through the Source Schema by following these steps:

1. Go to the **Schema** tab of your source.
2. Use the toggle to allow or block the different events/properties/traits.

![toggling schema defaults](./images/schema-defaults-eol-2.png)

#### What happens if a source with Schema Defaults enabled has a Tracking Plan connected to it?
As Tracking Plans replace Schema Defaults, there will be no impact to these sources as they’ll continue to behave the same.

#### How should I prepare for the removal of Schema Defaults?
If you would still like to block new events and traits by default, you can connect a [Protocols](/docs/protocols/) Tracking Plan to your source.

## Event Requirements Removal FAQs

#### What are Event Requirements?
Event Requirements allow you to define rules for an event property and block violating events. This feature was launched to Private Beta in 2017 as a pre-cursor feature to Protocols.

#### How do I know if I’m using Event Requirements?
Navigate to **Connections** and choose your source. Go to the **Schema** tab and click on an event. If you’re able to click on an event and view the properties and rules for it, you’re using Event Requirements.

![Event Requirements](./images/schema-defaults-eol-3.png)

#### When will Event Requirements be removed?
Event Requirements will be removed on August 11, 2021.

#### What happens after Event Requirements is removed?
Events that violate the rules designated within Event Requirements will no longer be blocked. You also won’t be able to interact with the feature anymore as all UI components for Event Requirements will be removed from Segment.

#### What happens if a source with Event Requirements enabled has a Tracking Plan connected to it?
As Tracking Plans replace any Event Requirements, there will be no impact to these sources as they’ll continue to behave the same.

#### How should I prepare for the removal of Event Requirements?
If you would still like to block events that you set up in Event Requirements, you can connect a [Protocols](/docs/protocols/) Tracking Plan to your source.
