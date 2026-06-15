---
title: MNTN Audiences Destination
---

{% include content/plan-grid.md name="actions" %}

[MNTN](https://mountain.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a Connected TV advertising platform that helps performance marketers reach targeted audiences and measure campaign results across streaming TV.

This destination is maintained by MNTN. For any issues with the destination, [contact their Support team](mailto:support@mountain.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "MNTN Audiences".
2. Select **MNTN Audiences** and click **Add Destination**.
3. Select an existing Engage Audience as the Source to connect to MNTN Audiences.
4. Log in to the [MNTN Integrations Marketplace](https://mountain.com/integrations){:target="_blank"} and generate an **API Key** for the Segment integration.
5. Enter the **API Key** in the MNTN Audiences destination settings in Segment.
6. Connect the destination to an Engage Audience. MNTN will automatically create a new audience segment in your MNTN account when the connection is first enabled. If you want to sync to a pre-existing MNTN segment instead, enter its **Segment ID** in the audience-level settings.

{% include components/actions-fields.html %}

## Additional context

### Audience segment creation

When an Engage audience is connected to this destination, Segment calls MNTN's Audience API to create a new audience segment automatically and stores the returned segment ID. That segment ID is then used for all subsequent Sync Audience calls — no manual configuration is required.

If you already have a MNTN segment you want to sync to, enter its ID in the **MNTN Segment ID** field under the audience-level settings when configuring the destination. This bypasses automatic creation and uses your existing segment instead.

### Identity signals

The Sync Audience action sends all available identity signals to MNTN to maximize audience match rates. Signals are read from event traits (for identify calls) or properties (for track calls).

| Signal | Field | Notes |
|--------|-------|-------|
| Email | `traits.email` or `context.traits.email` | Lowercased before sending. Sent as both plaintext and SHA-256 hash. |
| Phone | `traits.phone` or `properties.phone` | All non-numeric characters (including `+`) are stripped automatically before sending. Sent as both plaintext and SHA-256 hash. |
| IP Address | `traits.ip` or `properties.ip` | Sent as plaintext IPv4. |
| Mobile Advertising ID | `traits.advertisingId` or `properties.advertisingId` | IDFA on iOS or GAID on Android. |

At least one identity signal should be present for effective audience matching. Providing more signals increases match rates in MNTN campaigns.

### Adding and removing users

A single **Sync Audience** action handles both adding and removing users from a MNTN segment. Segment Engage passes the audience membership status with each event — users are added to the segment when they enter the audience and removed when they exit. No separate configuration is needed to handle both cases.
