---
title: Klime (Actions) Destination
slug: actions-klime
---

{% include content/plan-grid.md name="actions" %}

[Klime](https://klime.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} Klime watches your analytics and CRM for you, alerting you to customers who need your attention.

This destination is maintained by Klime. For any issues with the destination, [contact their Support team](mailto:support@klime.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "Klime".
2. Select **Klime (Actions)** and click **Add Destination**.
3. Select an existing Source to connect to Klime (Actions).
4. Log in to your [Klime dashboard](https://klime.com/dashboard/setting){:target="_blank"} and copy your **Write Key**.
5. In the Klime destination settings in Segment, enter your **Write Key**.
6. Optionally, update the **API Endpoint** if you have been provided a custom endpoint by Klime. The default is `https://i.klime.com`.

{% include components/actions-fields.html %}

## Actions

### Track Event

Sends a `track` call to Klime. Use this to record actions users perform in your product, along with any properties that describe the action.

### Identify User

Sends an `identify` call to Klime. Use this to associate traits — such as name, email, or plan — with a user.

### Track Group

Sends a `group` call to Klime. Use this to associate a user with a group or organization and record traits about that group.