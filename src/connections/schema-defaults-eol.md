---
title: Schema Defaults and Event Requirements Removal FAQs
hidden: true
---

## Schema Defaults Removal FAQs

Schema Defaults allows you to block new events and traits by default. This feature was launched to Private Beta in 2017 as an exploration feature before the introduction of Protocols.

#### What happens after Schema Defaults is removed?
Any events and traits that were blocked by Schema Defaults will continue to be blocked. Any new events and traits will automatically be allowed.

If you still want to block new events and traits by default, you can connect a [Protocols Tracking Plan](/docs/protocols/) to your source.

#### What happens if a source with Schema Defaults enabled has a Tracking Plan connected to it?
Tracking Plans _replace_ Schema Defaults, so these sources will continue to behave the same.


## Event Requirements Removal FAQs

Event Requirements allow you to define rules for an event property and block violating events. This feature was launched to Private Beta in 2017 as an exploratory feature before the introduction of Protocols.

#### What happens after Event Requirements is removed?
Events that violate the rules set up in Event Requirements will no longer be blocked. The Event Requirements UI will be removed from the Segment web app, and you won’t be able to interact with the feature settings.

If you still want to block the events that you set up in Event Requirements, you can connect a [Protocols Tracking Plan](/docs/protocols/tracking-plan/) to your source.

#### What happens if a source with Event Requirements enabled has a Tracking Plan connected to it?
[Tracking Plans](/docs/protocols/tracking-plan/) replace any Event Requirements, so these sources will continue to behave the same.
