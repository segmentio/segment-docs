---
title: Engage FAQs
plan: engage-foundations
redirect_from:
  - '/personas/faqs'
---


### Do you have an Audiences API?

Yes. You can learn more about the Audience API by visiting the [Segment Public API documentation](https://docs.segmentapis.com/tag/Audiences){:target="_blank"}.

### Can I programmatically determine if a user belongs to a particular audience?

Yes. Eecause Engage creates a trait with the same name as your audience, you can query the Profile API to determine if a user belongs to a particular audience. For example, to determine if the user with an email address of `bob@example.com` is a member of your `high_value_users` audience, you could query the following Profile API URL:

```
https://profiles.segment.com/v1/namespaces/<namespace_id>/collections/users/profiles/email:bob@segment.com/traits?include=high_value_users
```

The following response indicates that Bob is a high-value user:

```json
{
  "traits": {
    "high_value_users": true,
  },
  "cursor": {
    "has_more": false,
  }
}
```

For more information on profile queries, visit the [Profile API documentation](/docs/unify/profile-api).

### Can I modify audience keys?

You can't change the audience key after it's created. To change the key, you need to re-create the audience.
 

### Can I reuse audience keys?

Avoid using the same audience key twice, even if you've deleted the key's original audience. Downstream tools and destinations might have trouble distinguishing between different audiences that once shared the same key. This may create mismatch in audience size between Segment and the destination because the destination may count users of the old audience, resulting in a larger audience size.

### How do historical lookback windows work?

Engage allows you to compute new traits and audiences of your users based on their entire customer journey, and all historical data you've tracked with Segment.

When you create a new computed trait or audience, you include a lookback window that determines how far back into the past the trait or audiences will be computed.

![The historical look back settings in the Audience builder](images/historical_lookback.png)


Some important things to keep in mind when setting a lookback window:

Historical lookback windows are based on the event `timestamp` field.

Lookback windows are precise down to the hour, so a 90-day lookback window will include any events with a `timestamp` timestamp within the last 2,160 hours (24 hr/day * 90 days).

The trait and audience will automatically update going forward as historical events exceed the lookback window.

### What are Funnel Audiences?
Funnel Audiences allow you to use **strict, relative ordering** for your audience conditions. Common use cases for these audiences are Cart Abandonment (users that triggered the Product Added event but did not trigger the Order Completed event after the Product Added event occurred) and onboarding steps (users that Added Credit Card but did not Subscribe afterward).

To get started with Funnel Audiences, go to:

**Audiences > New > Select Funnel Condition** ("and then did not"/"and then did")

The funnel condition will now be relative to the parent condition.

The audience in the image below includes all users that have Product Added in the last week, but not Order Completed within a day of doing so.

![Funnel condition](images/funnel_audience.png "A screenshot of using funnel conditions in the Engage Audience builder")

> info ""
> Funnel Audiences compute based on all instances of the parent event within the lookback period. This means that if you have a user that Product Added ⟶ Order Completed ⟶ Product Added, this user would be entered into the Abandoned Cart state despite having previously completed an order.

### What is Engage Merge Protection?
Engage's merge protection algorithm protects your identity graph from unnecessary merges by finding and removing untrusted external IDs. Here's an example:

![Merge protection](images/merge_protection.png "An image representing the merge protection flow")

In this example, `anonymous_id: a1` is not reset during a `User Logout`. Without merge protection rules, Segment would merge `user_id u1` and `user_id u2`. Instead, the identity resolution algorithm detects that such a merge would break `user_id` uniqueness and prevents the merge.

This is especially helpful for preventing "blob users" that are merged together by non-unique anonymous IDs or by common group emails like `team@company.com`.

### Which destinations support syncing the identity graph?
Most destinations on the Segment Platform are built up around a user model. They assume that a user will have a single userId. Further, most Destinations are not built to handle anonymous traffic.

By default, Segment doesn't sync the output of the Identity Graph to Destinations. However, Segment computed traits and audiences are based on the entire user profile, including anonymous and merged data. Segment syncs the value of these computations (for example, `blog_posts_ready_30_days: 10`) using all `userIds` on the profile.

For Destinations that support an `alias` call (for example, Mixpanel), you can emit an `alias` call on merge.

### What Sources can I sync to Engage?

The following list shows just some data sources you can sync to Engage:

- Website ([Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/))
- Mobile SDKs ([iOS](/docs/connections/sources/catalog/libraries/mobile/ios), [Android](/docs/connections/sources/catalog/libraries/mobile/android), [AMP](/docs/connections/sources/catalog/libraries/mobile/amp))
- Server-side libraries ([Go](/docs/connections/sources/catalog/libraries/server/go), [Node](/docs/connections/sources/catalog/libraries/server/node/), [Java](/docs/connections/sources/catalog/libraries/server/java), [PHP](/docs/connections/sources/catalog/libraries/server/php/), [Python](/docs/connections/sources/catalog/libraries/server/python), [Ruby](/docs/connections/sources/catalog/libraries/server/ruby), [.NET](/docs/connections/sources/catalog/libraries/server/net))
- [Facebook Lead Ads](/docs/connections/sources/catalog/cloud-apps/facebook-lead-ads/)
- [ActiveCampaign](/docs/connections/sources/catalog/cloud-apps/activecampaign/)
- [Customer.io](/docs/connections/sources/catalog/cloud-apps/customer.io/)
- [Drip](/docs/connections/sources/catalog/cloud-apps/drip/)
- [Iterable](/docs/connections/sources/catalog/cloud-apps/iterable/)
- [Klaviyo](/docs/connections/sources/catalog/cloud-apps/klaviyo/)
- [Mailjet](/docs/connections/sources/catalog/cloud-apps/mailjet/)
- [Nudgespot](/docs/connections/sources/catalog/cloud-apps/nudgespot/)
- [Vero](/docs/connections/sources/catalog/cloud-apps/vero/)
- [Blueshift](/docs/connections/sources/catalog/cloud-apps/blueshift/)
- [Delighted](/docs/connections/sources/catalog/cloud-apps/delighted/)
- [Braze](/docs/connections/sources/catalog/cloud-apps/braze/)
- [Looker](/docs/connections/sources/catalog/cloud-apps/looker/)
- [Radar](/docs/connections/sources/catalog/cloud-apps/radar/)
- [Autopilot](/docs/connections/sources/catalog/cloud-apps/autopilothq/)
- [Friendbuy](/docs/connections/sources/catalog/cloud-apps/friendbuy/)


### Can I send audiences to multiple destination accounts?

Yes, Engage supports the ability to send an audience or computed trait to two or more accounts of the same partner. The most common use case is multiple Facebook, or Adwords ad accounts.


### Why am I getting alerts about an audience/computed trait sync failure, but when I look at the specific audience/computed trait it shows a successful sync?

An audience/computed trait run or sync may fail on its first attempt, but Engage will retry up to five times before considering it a hard failure that displays on the audience/compute trait's overview page. As long as the runs/syncs within the specific audience's overview page indicate success, you can ignore any failure alerts. 

**How things work internally:**
Segment's Engage scheduler fetches audiences/traits from the compute service and then handles the logic of generating tasks. These compute/sync tasks get scheduled and executed by another worker. These tasks are a list of steps to be executed. Each task has a series of steps that Segment marks as complete by saving a timestamp for the completion. If something disrupts the worker, it picks up at the latest step without a `completed_at` timestamp. In some cases, the step or entire task might fail due to timeout or worker disruption. No matter the cause, Segment will retry any failures. 

The audit trail's configuration notifies about every task failure, even if the failure later succeeds. In most cases, you won't need to track these failures, unless you notice actual computation or sync failures. 

If you don't want to receive notifications for temporary failures, **[reach out to support](https://segment.com/help/contact/)**. Upon request, Segment can disable temporary failure notifications, which will reduce the number of notifications your workspace receives.

### Why is the user count in a journey step greater than the entry/previous step of the journey?

Each step of a Journey is an Engage audience under the hood. The conditions stack, so a user must be a member of the previous step (audience) and meet all conditions to be added to subsequent steps. However, if the user no longer meets entry conditions for a particular step, they'll exit and you'll see the user count reduced. For any subsequent steps a user is still a part of, they'll remain until they no longer meet entry conditions. 

### Why were multiple audience-entered events triggered for the same user?

Multiple audience events can trigger for a user if any of the following conditions occur:
1) There is a merge on the user.
2) An [`external_id`](/docs/engage/using-engage-data/#new-external-identifiers-added-to-a-profile) was added to the profile.
3) The user has [multiple identifiers of the same type](/docs/engage/using-engage-data/#multiple-identifiers-of-the-same-type). Segment sends one event per identifier for each audience or computed trait event.
4) The `include anonymous users` option is selected for an audience. Segment sends an event for every `anonymousId` on the user profile.

### Why am I not seeing standard source events on the Engage source, even though it has been connected through "Unify -> Unify Settings -> Profile Sources" page?

Based on Engage behavior, standard source events such as Page, Track and Identify calls aren't visible on the Engage source. The Engage source tracks and manages events related to audiences and computed traits within the Engage space. This includes events generated by changes in audience membership or computed trait calculations or when a user profile has been created in the Engage space. These are distinct from the typical Page calls, Track calls, or Identify calls (user interaction events) that you would observe in a standard Segment source.

### Why can't I connect the audience/computed trait to an existing destination in my workspace?

Engage will not allow you to connect an audience/computed trait to a destination that is already linked to a [Connections-based source](https://segment.com/docs/connections/sources/). Instead, create a new instance of the destination with the correct Engage space selected as the data source.

### If an event fails to send to the destination, such as with the error '429 Too Many Requests', will Segment retry that event?
Engage event destinations have the same retry mechanism that is used by the Connections pipeline (Source <> Destination). If an event results in an error listed on the [Integration Error Codes](https://segment.com/docs/connections/integration_error_codes/) table as `awaiting-retry`, then Segment will try to resend that event (retry) to the connected destination. If the event shows an error from that table as `discarded`, then the event will not be retried and the details for why that event failed should be reviewed and resolved to prevent the error by taking additional measures to ensure that event is acceptable by the destination. Additional measures could include possibly modifying the payload with a [Destination Insert Function](https://segment.com/docs/connections/functions/insert-functions/) or reconfiguring an Actions destination's mappings ([Edit a destination action](https://segment.com/docs/connections/destinations/actions/#edit-a-destination-action) and [Customize Mappings](https://segment.com/docs/connections/destinations/actions/#customize-mappings)).

Segment's systems have a retry mechanism where an event will be retried 9 times over a four-hour period with exponential backoff. The specifics of how events are retried to destinations are as follows : Segment uses randomized exponential backoff to retry failed deliveries. Currently, the minimum delay for the first retry is 1 minute, then the delay increases 2x after each failed delivery. Segment retries delivering messages for 4 hours before assuming that the delivery will fail permanently. This typically results in a total of 9 retries. In the example error of `429 Too Many Requests`, if the destination's rate limit is consistently exceeding the rate-limit established by that destination and the throughput does not become available over the 4 hours of retrying that event, then the event will result in a hard failure where it will not be successfully sent to the destination.

You can find additional information on this topic under this section [Data Deliverability](https://segment.com/docs/connections/destinations/#data-deliverability) in Segment's documentation.
