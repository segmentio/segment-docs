---
title: Upgrade to A.js 2.0
strat: ajs
---

Analytics.js 2.0 is fully backward compatible with Analytics.js Classic. To upgrade your sources, follow the manual upgrade steps below, or see the schedule for automatic migration.

## Manual upgrade

To upgrade a source to Analytics.js 2.0:

1. In your Segment workspace, open the **Connections** page.
2. Open the Javascript source you will upgrade.
3. On the **Settings** tab, open the **Analytics.js** category.
4. Enable the flag for Analytics 2.0.
5. Within 5 minutes, the source receives Analytics.js 2.0. No code or tag changes required.
6. Open the Debugger to ensure that events are flowing as expected.

## Automatic migration

Analytics.js sources will upgrade to Analytics.js 2.0 on the date below, according to the account tier. On the date listed, Segment will upgrade all Analytics.js sources within the associated account tier.

| Segment Plan | Upgrade Date |
|--------------| -------------|
| Free         | June 15, 2021|
| Team         | July 6, 2021 | 
| Business     | Q3, 2021     |

> info ""
> The plans and dates listed above are subject to change.

## Revert to Analytics.js Classic

Once a source moves to Analytics.js 2.0, you can follow the steps above in [Manual migration](#manual-migration) back to  roll back to Analytics.js Classic.