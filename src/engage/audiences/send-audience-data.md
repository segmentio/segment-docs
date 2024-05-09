---
title: Send Audience Data to Destinations
plan: engage-foundations
---

Once you've built an audience in Engage, you can connect it to a destination or keep the audience.

## Connect your audience to a destination

If you already have Destinations set up in Segment, you can import the configuration from one of your existing sources to Engage. You can only connect one destination configuration per destination type.

Follow these steps to connect an audience to a destination:

1. Navigate to **Engage > Audiences**, then select the audience you want to connect.
2. From the audience's overview page, click **+ Add destination**.
3. Select the destination you want to connect to, then click **Add destination**. 
4. Segment then begins its initial sync to the destination.

You can view a list of an audience's connected destinations in the destination list table of the audience overview tab.

### Working with mappings

You can add and access mappings within your audience's connected destination by following these steps:

1. Navigate to **Engage > Audiences**.
2. From the Destinations list, click the destination you want to work with, or click **+Add mapping**.
3. In the destination's side panel, click **Matching mappings**.
4. In the **Add Mapping** popup, select the mapping that you want to add.
5. Segment then opens the destination's mappings tab. Add the mapping(s) you want, then click **Save**.
6. Segment then returns you to the audience's destination side panel, which shows your new mapping(s).

## Understanding audience destinations

When you create an audience, Segment starts syncing your Audience to the destination(s) you selected. Audiences are either sent to destinations as a boolean user-property or a user-list, depending on what the destination supports. Read more about [supported Destinations](/docs/engage/using-engage-data/#compatible-engage-destinations) in the Engage documentation.

For account-level audiences, you can send either a [Group](/docs/connections/spec/group) call and/or [Identify](/docs/connections/spec/identify) call. Group calls will send one event per account, whereas Identify calls will send an Identify call for each user in the account. This means that even if a user hasn't performed an event, Segment will still set the account-level computed trait on that user.

Because most marketing tools are still based at the user level, it is often important to map this account-level trait onto each user within an account. See [Account-level Audiences](/docs/engage/audiences/account-audiences) for more information.

> info ""
> When you connect a new Destination to an existing Audience, Engage will backfill historical data for that Audience to the new Destination.