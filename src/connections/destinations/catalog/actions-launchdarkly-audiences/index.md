---
title: LaunchDarkly Audiences Destination
id: 64e72a310da9ebedf99c8937
beta: true
---

{% include content/plan-grid.md name="actions" %}

[LaunchDarkly](https://launchdarkly.com){:target="_blank"} is a feature management platform that empowers development teams to safely deliver, control, and measure their software through feature flags.

With LaunchDarkly, you can release features that target specific groups, such as beta users, and premium accounts, using segments. This destination allows you to sync Engage Audiences to LaunchDarkly segments, letting you concentrate more on deploying features and less on managing end users between platforms.

This destination is maintained by LaunchDarkly. For any issues with the destination, [contact their Support team](mailto:support@launchdarkly.com).

{% include content/ajs-upgrade.md %}

## Getting started

1. In LaunchDarkly, navigate to [Account settings](https://app.launchdarkly.com/settings/projects){:target="_blank"} and copy the client-side ID for the project and environment where you would like to create a Engage Audience synced segment.
2. In LaunchDarkly, create a service token with either a Writer role or a custom role. If your service token has a custom role, it must have the actions `createSegment` and `updateIncluded` to sync a segment from and Engage Audience. To learn how to create a service token, read [Creating API access tokens](https://docs.launchdarkly.com/home/account-security/api-access-tokens#creating-api-access-tokens){:target="_blank"}.
3. From the Segment web app, navigate to **Engage > Audiences**. Ensure you are in the Engage space you plan to use with the LaunchDarkly Audiences destination. Either choose an existing Engage audience or create a new one. This is the audience you plan to sync with LaunchDarkly.
4. Navigate to **Engage > Engage Settings** and click **Destinations**. Please ensure you are still in the correct Engage space.
5. Search for LaunchDarkly Audiences” and select the destination. Click **Add destination**.
6. On the Select Source screen, your Engage space should already be selected as the source. Click **Confirm Source**.
7. On the Destination **Settings** tab, name your destination and provide your LaunchDarkly client-side ID and service token.
8. Toggle “Enable Destination” on and click **Save Changes**.
9. Navigate to the **Mappings** tab, click **New Mapping**, and select the **Sync Engage Audience to LaunchDarkly** pre-built mapping.
10. Under Select mappings, modify the default mappings as needed. In most cases you should not need to make any changes.
11. Click **Save**.
12. Ensure the **Status** toggle on the **Mappings** tab is enabled.

{% include components/actions-fields.html %}
