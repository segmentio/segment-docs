---
title: Engage Audiences Overview
plan: engage-foundations
redirect_from:
  - '/personas/audiences'
---




Audiences let you group users or accounts based on event behavior and traits that Segment tracks.

You can build Audiences from core **tracking events**, **traits**, and **computed traits**. You can then sync Audiences to hundreds of [Destinations](/docs/connections/destinations/) or access them with the [Profile API](/docs/unify/profile-api).

## Building an Audience

You can build an Audience from existing events, traits, computed traits, or other Audiences.

![Creating an Engage Audience from the conditions list](/docs/engage/images/audience_condition_list.png)

> info ""
> The **Include Anonymous Users** checkbox determines which external IDs need to exist on a profile for Segment to include the user in the audience:
> - **Include Anonymous Users** not selected: `user_id`, `email`, `android.idfa`, or `ios.idfa`
> - **Include Anonymous Users** selected: `user_id`, `email`, `android.idfa`, `ios.idfa`, or `anonymous_id`

> warning ""
> Editing an audience before the initial backfill is complete can create technical errors.

### Events

You can build an Audience from any events that are connected to Engage, including [Track](/docs/connections/spec/track), [Page](/docs/connections/spec/page), and [Screen](/docs/connections/spec/screen) calls. You can use the `property` button to refine the audience on specific event properties, as well. 

> info ""
> The Audience builder doesn't return every property value in the Constant value or Traits drop-downs. Segment displays a portion of values from the incoming data stream. However, if you don't see the value you're looking for, you can manually enter it.

Select `and not who` to indicate users that have not performed an event. For example, you might want to look at all users that have viewed a product above a certain price point but not completed the order.

![Creating an Audience of users who viewed a product without buying it](/docs/engage/images/audience_builder.png)

You can also specify two different types of time-windows, `within` and `in between`. The `within` property lets you specify an event that occurred in the last `x` number of days, while `in between` lets you specify events that occurred over a rolling time window in the past. A common use case is to look at all customers that were active 30 to 90 days ago, but have not completed an action in the last 30 days.

### Custom Traits 

You can also build Audiences based on [custom traits](/docs/unify/traits/custom-traits/). These traits can be collected from your apps when a user completes a form or signs up using an [Identify](/docs/connections/spec/identify) call. You can view these traits in the Profile explorer, as well. Custom Traits are mutable and update to the latest value seen by the user's Identify events. 

> info ""
> When an audience that previously generated Identify events is deleted, the data for the audience key is still attached to profiles that entered the audience, and becomes visible in Segment as a custom trait.

### Computed Traits

You can also use computed traits in an Audience definition. For example, you can create a `total_revenue` computed trait and use it to generate an audience of `big_spender` customers that exceed a certain threshold.

> info ""
> Engage supports nested traits, but the Audience builder doesn’t support accessing objects nested in arrays. When you send arrays of objects, they are flattened into strings. As a result, the same conditions that work on strings will work on the array. Within the builder, you can only use string operations like `contains` and `does not contain` to look for individual characters or a set of characters in the flattened array.

### Time comparison

You can use the following time comparison operators in your audience definition: 
- `before date`
- `after date`
- `within last`
- `within next` 
- `before last`
- `after next` 

Only ISO timestamps can be used with these operators. Additionally, these time comparison operators exclusively apply to custom traits.
If the timestamp is not a valid ISO timestamp (for example, a trailing `Z` is missing), Segment won't process the audience in real-time. Learn more about [real-time compute compared to batch](#real-time-compute-compared-to-batch).

### Funnel Audiences

Funnel audiences allow you to specify strict ordering between two events. This might be the case if you want an event to happen or not happen within a specific time window, as in the following example:

![An Audience funnel of users who, in the last week, began checkout without completing it](/docs/engage/images/funnel_audiences1.png)

### Dynamic property references

Dynamic Property references give you more flexibility over funnel audiences. Instead of specifying a constant value in both events, like `product_id = 123` for both Product Viewed and Order Completed events, you can specify that a child event references an event property of a parent event. You can also compare an event property to a trait variable.

![Using dynamic property references with an Audience funnel](/docs/engage/images/dynamic_property_audiences1.png)

### Account-level audiences

If you have a B2B business, you might want to build an Audience of accounts. You can use both account-level traits that you've sent through the [Group](/docs/connections/spec/group) call, or user-level traits and events. For example, you might want to re-engage a list of at-risk accounts defined as companies which are on a business tier plan and where none of the users in that account have logged in recently. When incorporating user-level events or traits, you can specify `None of the users`, `Any users`, or `All users`.

See [Account-level Audiences](/docs/engage/audiences/account-audiences) for more information.


## Send Audiences to Destinations
With the help of Sources and Destinations in Segment's catalog, you can create and send Audiences and computed traits to third-party services.

Segment's Connections pipeline first collects and sends events from your Source to your Destination. Built on top of Connections, Engage then uses the same Source events to let you create Audiences and computed traits within Segment. You can then send the Audience or computed trait you've built to your Destination(s).

> info ""
> Because Engage only sends Audiences and computed traits to Destinations, it doesn't replace a standard event pipeline. Connect a Source directly to a Destination if you want the Destination to receive all events that Segment gathers.

### Connect your audience to a destination

> warning "Audience Keys"
> Avoid using the same Audience key twice, even if you've deleted the original Audience.

Once you've previewed your Audience, you can choose to connect it to a destination or keep the Audience in Segment and export it as a CSV file download.

If you already have destinations set up in Segment, you can import the configuration from one of your existing sources to Engage. You can only connect one destination configuration per destination type.

When you create an audience, Segment starts syncing your audience to the destinations you selected. Audiences either send to destinations as a boolean user-property or a user-list, depending on what the destination supports. Read more about [supported destinations](/docs/engage/using-engage-data/#compatible-engage-destinations) in the Engage documentation.

For account-level audiences, you can send either a [Group](/docs/connections/spec/group) call and/or a [Identify](/docs/connections/spec/identify) call. Group calls send one event per account, whereas Identify calls send an Identify call for each user in the account. This means that even if a user hasn't performed an event, Segment still sets the account-level computed trait on that user.

Because most marketing tools are still based at the user level, it is often important to map this account-level trait onto each user within an account. See [Account-level Audiences](/docs/engage/audiences/account-audiences) for more information.

> info ""
> When you connect a new destination to an existing Audience, Engage backfills historical data for that Audience to the new destination.

In order to connect your audience to a destination, follow these steps:
1. [Add destination to your Engage space](#step-1-add-a-destination-to-your-engage-space)
2. [Create an audience and add a destination](#step-2-create-an-audience-and-add-a-destination)

#### Step 1: Add a destination to your Engage space
In order to connect your audience to a destination, you must first connect your destination to your Engage space. To add a destination to your Engage space:
1. Navigate to **Engage > Engage settings** and select the **Destinations** tab. 
2. Click **+ Add destination**. 
3. Search for the destination in the catalog you want to connect to and select it. 
4. Click **Add destination**.
5. Select the source you want to connect to and click **Confirm Source**.
6. Add the configuration details for the destination. 
7. Select the toggle to enable the destination. 

#### Step 2: Create an audience and add a destination
After you've added a destination to your Engage space, you can create an audience and add a destination to it. To create an audience and add a destination:
1. Navigate to **Engage > Audiences**.
2. Click **+ New audience** and choose **Audience**.
3. Select the **Audience Type** and click **Next**. 
4. Configure and preview your audience. 
5. Click the toggle to enable your audience.
6. Connect destinations to your audience by clicking **+ Add Destination**. 
7. Select the destination you want to add. 
8. Toggle on the traits you want to send in the **Connection settings** section. 
9. Click **Add destination**.

## Understanding compute times

Because a number of factors (like system load, backfills, or user bases) determine the complexity of an Audience, some compute times take longer than others.

As a result, **Segment recommends waiting at least 24 hours for an Audience to finish computing** before you resume working with the Audience.

From the Overview page, you can view Audience details including the current compute status and a progress bar for real-time and batch Audiences. Engage updates the progress bar and status for real-time computations approximately every 10 minutes.

> info "Viewing compute progress"
> When you create a real-time Audience, you'll see a progress bar, computed percentage, and status updates. For existing Audiences that you edit, Engage displays the compute status but not the progress bar or percentage.

> warning ""
> Engage syncs the Overview page for an individual audience more frequently than the Engage Audiences page (**Engage > Audiences**). As a result, you might see temporary discrepancies in Audience details, such as user counts, between these two pages.

### Refresh real-time Audiences and Traits

For real-time computations, you can click **Refresh Audience** or **Refresh Trait** to update user counts, status, and compute progress.

### Compute statuses

Engage displays the following compute statuses for Audiences and Traits.

#### Real-time computations

| Computation status        | Description                           |
|---------------------------|---------------------------------------|
| Preparing                 | Engage is preparing the computation.  |
| Computing                 | Engage is computing the Audience or Trait.           |
| Live                      | The Audience or Trait is live. Users will enter in real-time as they meet entry criteria.        |
| Disabled                  | The Audience or Trait is disabled.                   |
| Failed                    | The computation was cancelled or failed to compute. Please contact [Segment support](https://segment.com/help/contact/){:target="_blank"}.            |


#### Batch computations

| Computation status        | Description                           |
|---------------------------|---------------------------------------|
| Preparing                 | Engage is preparing the computation.  |
| Computing                 | Engage is computing the Audience or Trait.  |
| Live                      | The Audience or Trait is up-to-date, based on the most recent sync cadence. When you edit a batch Audience or Trait, Engage displays the compute status as `Live` and incorporates your edits in the next scheduled sync.                 |
| Not Computing             | Engage displays this status when there are no destinations connected or `Compute without connected destinations` isn't selected.         |
| Disabled                  | The Audience or Trait is disabled.    |
| Failed                    | The computation was cancelled or failed to compute. Please contact [Segment support](https://segment.com/help/contact/){:target="_blank"}.    |


## Real-time compute compared to batch

Real-time Compute allows you to update traits and Audiences as Segment receives new events. Real-time Compute unlocks exciting use cases:

- **Intra-Session App Personalization:** change your app experience with personalized onboarding, product recommendations, and faster funnels based on a user entering and exiting an audience.
- **Instant Messaging:** Trigger messages in email, live chat, and push notifications instantly, to deliver immediate experiences across channels.
- **Operational Workflows:** Supercharge your sales and support teams by responding to customer needs faster, based on the latest understanding of a user.

> warning ""
> Real-time Compute doesn't support time window conditions. Segment creates Audiences using time window conditions as batch computations. Additionally, Segment creates [Funnel Audiences](#funnel-audiences) as batch computations.

To create a new Audience or Trait:

1. Go to your **Computed Traits** or **Audiences** tab in Engage and select **Create**.

2. Configure and preview your Audience or Trait.
- A lightning bolt next to `Realtime Enabled` indicates that the computation updates in real-time.
- By default, Segment queries all historical data to set the current value of the computed trait and Audience. Backfill computes historical data up to the point of audience creation. You can uncheck **Include Historical Data** to compute values for the Audience or trait without historical data. With backfill disabled, the trait or Audience only uses the data that arrives after you create it.

3. Select destinations to connect, then review and create your Audience or Trait.

While Engage is computing, use the Audience Explorer to see users or accounts that enter your Audience. Engage displays the Audience as computing in the Explorer until at least one user or account enters.

> warning ""
> [Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/), [Marketo Lists](/docs/connections/destinations/catalog/marketo-static-lists/), and [Adwords Remarking Lists](/docs/connections/destinations/catalog/adwords-remarketing-lists) impose rate limits on how quickly Segment can update an Audience. Segment syncs at the highest frequency allowed by the tool, which is between one and six hours.

> warning ""
> Real-time computations connected to List destinations use a separate sync process that can take 12-15 hours to send changes present in the most recent computation.

### Editing Realtime Audiences and Traits

Engage supports the editing of realtime Audiences and Traits, which allows you to make nuanced changes to existing Traits and Audiences in situations where cloning or building from scratch may not suit your use case.

To edit a realtime Trait or Audience, follow these steps:

1. In your Engage Space, select the **Computed Traits** or **Audiences** tab.
2. Select the realtime Audience or Trait you want to edit.
3. Select the **Builder** tab and make your edits.
4. Preview the results, then select **Create Audience** to confirm your edits.

Engage then processes your realtime Audience or Trait edits. While the edit task runs, the audience remains locked and you can't make further changes. Once Engage incorporates your changes, you'll be able to access your updated Audience or Trait.

> warning ""
> If your audience includes historical data (Historical Backfill is enabled), editing an audience creates a new backfill task. The backfill task, and therefore the edit task, take longer to process if the audience is connected to a destination with rate limits. Rate-limited destinations dictate how fast Engage can backfill. View a list of [rate-limited destinations](/docs/engage/using-engage-data/#rate-limits-on-engage-event-destinations).

> warning ""
> It is not possible to edit an audience to convert it from real-time to batch, or vice-versa. If the computation type needs to be changed, you will need to recreate the audience with the appropriate conditions.

> warning ""
> You can't edit an audience to include anonymous users. If you need to include anonymous profiles, recreate the audience with the appropriate conditions

## Access your Audiences using the Profiles API

You can access your Audiences using the Profile API by querying the `/traits` endpoint. For example, you can query for `high_value_user` property with the following `GET` request:

```
https://profiles.segment.com/v1/spaces/<workspace_id>/collections/users/profiles/email:alex@segment.com/traits?limit=100&include=high_value_user
```

The query would return the following payload:

```json
    {
        "traits": {
            "high_value_user": true
        },
        "cursor": {
            "url": "",
            "has_more": false,
            "next": "",
            "limit": 100
        }
    }
```
You can read the [full Profile API docs](/docs/unify/profile-api/) to learn more.

## Download your Audience as a CSV file

You can download a copy of your Audience by visiting the Audiences overview page. 

1. Navigate to **Engage > Audiences**.
2. Select the Audience you'd like to download as a CSV, then click **Download CSV**.
3. Select the data fields that you'd like to include in your CSV as columns.
- Your CSV will contain all users in this audience with the selected fields. You can filter by  `External ID`, `SQL trait`, `Computed Trait`, and `Custom Trait`.
4. Click **Next**.
5. Before you can download the CSV, you'll need to generate it. There are two different options for formatting:
- **Formatted:** Displays external IDs and traits as distinct columns.  
- **Unformatted:** Contains the following columns: a user/account key, a JSON object containing the external IDs (optional, if selected), and a JSON object containing the traits (optional, if selected).
6. Click **Generate CSV**.

Once Segment generates the CSV, you can download the file directly. You'll receive an email notification of the CSV completion, with a URL to the Audience overview page. 

Note the following limits for the CSV downloader:
- You can't download more than one CSV for the same audience at the same time.
- You can only generate one CSV every five minutes. 

> info ""
> Generating a CSV can take a substantial amount of time for large audiences. After you generate the CSV file, leave the modal window open while Segment creates the file. (If the audience recalculates between when you click Generate and when you download the file, you might want to regenerate the file. The CSV is a snapshot from when you clicked Generate, and could be outdated.)

> warning ""
> You can't add account traits and identifiers using the CSV downloader with account level audiences. This is because every row listed in the CSV file is a user, and since account traits and identifiers only exist on accounts, they wouldn't exist as a user's custom trait and appear on the CSV.

## Identifier Breakdown

The audience summary is a breakdown of the percentages of external_ids of users in the audience. These are the default IDs that Segment includes in the Identity resolution configuration. Segment displays the percentage of the audience with each identifier, which you can use to verify the audience size and profiles are correct.

> info ""
> The Identifier Breakdown won't show custom IDs included in the Identity resolution configuration. Segment only displays external IDs in the breakdown.

## FAQ

### Why do I get a different user count when I use `$` on a field?**
Segment recommends using the `$` operator when you deal with array properties. However, the `$` causes logical conditions to apply independently to each array entry independently. As a result, you'll get more accurate results by using the `equals one of` condition:

![$ operator](https://github.com/segmentio/segment-docs/assets/68755692/7b0b6923-a4ad-4290-8aa6-bbbc7cb1ee1b)
