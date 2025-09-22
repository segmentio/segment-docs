---
title: Reddit Audiences
id: 66f2b0f961bb2128729079bb
redirect_from: '/connections/destinations/catalog/reddit-audiences/' 
---

{% include content/plan-grid.md name="actions" %}

The Reddit Audiences destination allows advertisers to send Engage audiences from Segment to Reddit to use as [Custom Audiences](https://business.reddithelp.com/s/article/custom-audiences?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}, which can be used for Reddit Ads features like audience targeting, retargeting, creating lookalike audiences, and engagement retargeting.

This destination is maintained by Reddit. For any issues with the destination, [contact their Support team](mailto:adsapi-partner-support@reddit.com).

### Reddit Requirements 
- **Create a Reddit Ads account.** Find your ad account ID in [Accounts](https://ads.reddit.com/accounts){:target="_blank"}. 

### Connect Reddit Ads to your workspace

## Getting started

1. In your Segment workspace, click **Engage** in the left navigation bar, then select your space.
2. Click **Engage Settings** and select the **Destinations** tab.
3. Search for `Reddit Audiences`.
4. Click **Add Destination**.
5. Confirm the source. By default, this is the source connected to the Enage Space to which you’re adding the destination.
6. In the **Settings** tab, click **Connect to Reddit Audiences** and authenticate the connection between Segment and Reddit.
7. Provide your ad account ID for **Ad Account ID**.
8. Toggle **Enable Destination** on and click **Save Changes**.
9. Add a **Sync Audience** Mapping using the Mapping tab in the *Reddit Audiences* destination you just created, and enable the Mapping. 
9. Navigate to the engage space that contains the audience, and select it in the **Audiences** tab.
10. Click **Add Destination**.

> warning ""
> Reddit Audiences destination automatically hashes `email`, `iOS Ad ID` and `Android Ad ID` fields when syncing the audience to Reddit.

{% include components/actions-fields.html %}
