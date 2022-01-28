---
# The end name should be similar to `Slack (Actions) Destination`
title: Sprig (Actions) Destination
hide-boilerplate: true
hide-dossier: true
hidden: true
redirect_from:
  - '/connections/destinations/catalog/sprig-web'
---

<!-- In the section above, edit the `title` field. For example, Slack (Actions) Destination -->

{% include content/plan-grid.md name="actions" %}

[Sprig (formerly UserLeap)](https://sprig.com/?&utm_source=segmentio&utm_medium=docs_actions&utm_campaign=integration){:target="_blank"} is an in-context user research platform that makes it fast and effortless for product teams to learn from their actual customers in real-time, through microsurveys, concept tests, and video questions.

Sprig maintains this destination. For any issues with the destination, consult [Sprig's documentation](https://docs.sprig.com/docs/segment-web) or contact [support@sprig.com](mailto:support@sprig.com).


<!-- In the section below, add your destination name where indicated. If you have a classic version of the destination, ensure that its documentation is linked as well. If you don't have a classic version of the destination, remove the second and third sentences. -->

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Sprig Segment destination. There's also a page about the [non-Actions Sprig Cloud (formerly UserLeap) destination](/docs/connections/destinations/catalog/userleap/). Both of these destinations receive data from Segment.

<!-- In the section below, explain the value of this actions-based destination over the classic version, if applicable. If you don't have a classic version of the destination, remove this section. -->

## Benefits of Sprig (Actions) vs Sprig Classic

Sprig (Actions) provides the following benefits over the classic Sprig destination:

- **Trigger microsurveys**. Because Sprig (Actions) hooks into your browser-based, JavaScript Segment source, it can be used to trigger Sprig microsurveys.
- **Code-free Sprig installation**. The Sprig (Actions) destination can install the Sprig SDK onto your website, without you having to update any code.

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Use the navigation on the left to locate and select Sprig (Actions).
3. Click **Configure Sprig (Actions)**.
4. Select an existing JavaScript website source to connect to Sprig (Actions).
5. Find your Environment ID on [Sprig Dashboard > Connect > JavaScript](https://app.sprig.com/connect){:target="_blank"}. Use the Development Environment ID for a testing environment, and the Production Environment ID for your live website environment. When you configure the destination, input the appropriate Environment ID.  
6. Select **Quick Setup** to start with pre-populated subscriptions, or **Customized Setup** to configure each action from scratch. Click **Configure Actions** to complete setup.

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

## Pre-built subscriptions

By default, a new Sprig (Actions) destination comes with the following subscriptions.

Select these subscriptions by choosing **Quick Setup** when you first configure the destination. You can enable, edit, or disable them from the screen that appears.

| Subscription Name  | Default Trigger                                   | Sprig Action |
| ------------------ | ----------------------------------------- | ------------------------- |
| Identify User | All events with type **Identify**. | Set User ID, email, and other traits. |
| Sign Out User | Events with name **Signed Out** and type **Track**. | Log out user on Sprig so that future actions are not associated with them. |
| Track Event | All events with type **Track**, except **Signed Out**. | Track this event name for this user, and potentially display a matching microsurvey. |
| Update User ID | All events with type **Alias**. | Update the User ID for the current user. |

## Available Sprig actions

Combine the supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following Sprig-supported actions:

- [Identify User](#identify-user)
- [Sign Out User](#sign-out-user)
- [Track Event](#track-event)
- [Update User ID](#update-user-id)

<!-- If applicable, add information regarding the migration from a classic destination to an Actions-based version below -->

## Migration from the classic Sprig destination

To prevent duplicate events being created in Sprig, ensure that for each Segment source, this destination and the Sprig Cloud destination are not both enabled at the same time.


