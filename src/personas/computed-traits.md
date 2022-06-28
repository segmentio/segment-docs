---
title: Personas Computed Traits
---



Computed Traits allow you to quickly create user or account-level calculations that Segment keeps up-to-date over time. These can be computations like the `total_num_orders` a customer has completed, the `lifetime_revenue` of a customer, the `most_frequent_user` to determine which user is most active in an account, or the `unique_visitors_count` to assess how many visitors from a single domain. These computations are based on your events and event properties that you are sending through Segment on the [page](/docs/connections/spec/page/) and [track](/docs/connections/spec/track) calls.

## Types of Computed Traits

Personas currently supports the following types of computed traits:
- [Types of Computed Traits](#types-of-computed-traits)
  - [Event Counter](#event-counter)
  - [Aggregation](#aggregation)
  - [Most Frequent](#most-frequent)
  - [First](#first)
  - [Last](#last)
  - [Unique List](#unique-list)
  - [Unique List Count](#unique-list-count)
- [Conditions](#conditions)
- [Connecting your Computed Trait to a Destination](#connecting-your-computed-trait-to-a-destination)
- [Accessing your Computed Traits using the Profiles API](#accessing-your-computed-traits-using-the-profiles-api)
- [Downloading your Computed Trait as a CSV](#downloading-your-computed-trait-as-a-csv)

### Event Counter

An Event Counter trait stores a count of an **event** over a period of time. For example, you can create a trait called `number_logins_90_days` based on a `User Logged In` event. You can also use event properties to only specific types of events.

User-level examples:
- Orders Completed Last 30 Days
- Pricing Page Views Last 30 Days

Account-level examples:
- Total Logins by Account 30 Days
- Emails Opened by Account 90 Days

![An event counter trait run over the course of a week](images/1525835194991.png)

### Aggregation

An aggregation computes a **sum, average, minimum, or maximum** of a numeric **event property**. A good example is a `sum_cosmetics_revenue_90_days` if you're sending an `Order Completed` event with a `revenue` property. In the example we're refining the revenue even further based on another event property: `category = 'cosmetics'`. Note that you can only compute an aggregation trait for event properties that have a numeric value.

User-level examples:
- Order Revenue Last 14 Days
- Max Ride Distance Last 60 Days

Account-level use cases
- Total Minutes Watched 30 Days
- Avg Order Size Last 180 Days

![An aggregation trait run over the course of 90 days](images/1525835663131.png)

### Most Frequent

A most frequent user-level computed trait will return the **most common value** for an **event property**.  This is  helpful to create traits like `preferred_product_viewed`  or `most_commonly_viewed_category` that tell you what a user's preferred product, or content category might be. Note that the most frequent computed trait requires the event property to have been tracked at least twice. In the case of a tie, Segment returns the first alphabetical value. For account-level computed traits, you can also return the most frequent **user trait**. This is helpful when you want to determine which user has performed an event the most frequently. For example, you might to return the email of the user in an account most actively viewing your app.

User-level examples:
- Favorite Blog Post
- Top Purchase Category

![A most frequent product-viewed trait](images/1525836239527.png)

Account-level examples:
- Most frequent product viewed
- Most active user

![A most frequent order-completed trait](images/1542073415630.png)

### First

The first user-level trait returns the first event property value Segment has seen. This is common for creating traits like `first_page_visited` based on the page name. For accounts, the first computed trait could also return a trait like `first_user_signup`, to calculate the first user to use your product.

User-level examples:
- First seen timestamp
- First utm parameter

Account-level examples:
- First email opened
- First user signup

![The first event-seen trait builder](images/1525836568474.png)

### Last

The last trait returns the last event property value Segment has seen. This is common for creating traits like `last_utm_campaign` to help you calculate last-touch attribution for paid advertising.

User-level examples:
- Last seen at
- Last utm parameter

![The last event-seen trait builder](images/1525836818177.png)

Account-level examples:
- Last unsubscribe timestamp
- Last user active

![An account-level last page-viewed trait](images/1542073887657.png)

### Unique List

Unique list computed traits will output a **list of unique values** for an **event property**. This is helpful to understand the different types of products or content that a customer or users in an account have interacted with or purchased. Customers are creating traits like `unique_product_categories_viewed` and sending them to email marketing tools and accessing them through the Profiles API for in-app personalization.

Example use cases:
- Unique products purchased
- Unique categories
- Unique games played

![The unique list trait builder](images/1525837083070.png)


### Unique List Count

Unique list count computed traits will output a **count of the unique list of values** for an **event property**. Customers are creating traits like `unique_product_categories_viewed_count` to understand the variety of products that a customer is viewing. At the account-level, customers are creating traits like `unique_visitors_count` to calculate the number of unique visitors by ip address.

User-level examples:
- Unique products viewed count
- Unique categories count

![The unique list count builder](images/1525837374378.png)

Account-level examples:
- Unique products viewed
- Unique visitors count

![An account-level unique list trait](images/1542074153487.png)

## Conditions

All computed trait types support a common "Add Conditions" section. Conditions defined here restrict the messages considered when calculating the final value of the computed trait by looking at a property of the events. For example, you could limits events to only those where "price" is greater than 30.00 or where "page.url" contains "pricing".

The following operators are available.
- equals
- not equals -
- less than
- greater than
- less than or equal
- greater than or equal
- contains
- does not contain
- starts with
- ends with
- exists
- not exists
- before date
- after date

## Connecting your Computed Trait to a Destination

Personas sends user-level computed Traits to destinations using the [Identify call](/docs/connections/spec/identify/) for user traits, or using the [Track call](/docs/connections/spec/track/) for event properties. Segment includes the trait value and property in the identify and track calls.

For example, the name of a computed trait is added to the user profile as a trait, and the trait's value is set to the value of the computed trait. Segment sends an identify or track call when the trait is computed, depending on the destination configuration. If a computed trait counts the number of times a user visits your pricing page, and the user visits your pricing page five times, Segment sends an identify call with the property `pricing_page_visits: 5`.

Learn more about [Computed trait generated events here](/docs/personas/using-personas-data/#computed-trait-generated-events). The trait name corresponds to the snake cased name that you see in the trait settings, for example `most_viewed_page_category`. See the [list of Personas-compatible destinations](/docs/personas/using-personas-data/#compatible-personas-destinations)

![Editing a computed trait's settings](images/1525837601768.png)

For account-level computed traits, you have the option to send either a [group](/docs/connections/spec/group/) call and/or [identify](/docs/connections/spec/identify/) call. Group calls will send one event per account, whereas identify calls will send an identify call for each user in the account. This means that even if a user hasn't performed an event, Segment will still set the account-level computed trait on that user. Because most marketing tools are still based at the user level, it is often important to map this account-level trait onto each user within an account. See [Account-level Audiences](/docs/personas/audiences/account-audiences) for more information.

## Editing Realtime Traits

Personas supports the editing of realtime Traits, which allows you to make nuanced changes to existing Traits in situations where cloning or building from scratch may not suit your use case.

To edit a realtime Trait, follow these steps:

1. In your Personas Space, select the **Computed Traits** tab.
2. Select the realtime Trait you want to edit.
3. Select the **Builder** tab and make your edits.
4. Select **Save Computed Trait** to confirm your edits.

Personas then processes your Trait edits. While the edit task runs, the trait remains locked and you can't make further changes. Once Personas has finished incorporating your changes, you'll be able to access your updated Trait.


## Accessing your Computed Traits using the Profiles API

You can access your computed traits using the Profile API by querying the `/traits` endpoint. For example, if you can query for the `emails_opened_last_30_days` with the following GET request:

```
https://profiles.segment.com/v1/spaces/<workspace_id>/collections/users/profiles/email:john.doe@segment.com/traits?include=emails_opened_last_30_days
```

returns:
```json
    {
        "traits": {
            "emails_opened_last_30_days": 255
        },
        "cursor": {
            "url": "",
            "has_more": false,
            "next": "",
            "limit": 100
        }
    }
```

You can read the [full Profile API docs](/docs/personas/profile-api/) to learn more.

## Downloading your Computed Trait as a CSV file

You can download a copy of your trait by visiting the the computed trait overview page.
![Downloading a CSV file of computed traits in Segment](images/trait_overview.png)
Computed Trait CSVs are generated on demand. Before you can download the CSV, you will need to generate it. There are three different options for formatting:
- **Unformatted:** Contains three columns. The first contains the user or account key, the second contains the trait value and the third is a JSON object containing the external IDs. Generating this CSV is by far the fastest of the three options. [Download example unformatted CSV](files/trait_csv_format_a.csv)
- **Distinct columns for unique external IDs (with indexed columns for ID types with multiple values):** Contains the same first three columns as the unformatted CSV. Additional columns are added for each distinct external ID type. When a single row has more than one value for a given external ID type, for example a user with three email addresses, _additional columns with indexed headers are added_, (`email`, `email_1`, `email_2`). [Download example formatted CSV with indexed columns](files/trait_csv_format_b.csv)
- **Distinct columns for unique external IDs (with additional rows for ID types with multiple values):** Contains the same first three columns as the unformatted CSV. Additional columns are added for each distinct external ID type. When a single row has more than one value for a given external ID type, for example a user with two email addresses, _additional rows are added with the first three columns repeated (user or account key, trait value and external IDs JSON)._ [Download example formatted CSV with additional rows](files/trait_csv_format_c.csv)
<table>
    <tr>
        <td>![Handling large CSV file downloads](images/large_trait_csv.png)</td>
        <td width="45%">Generating a CSV can take a substantial amount of time for large traits (around 30 seconds for a formatted CSV with 1 million rows). For CSVs that are expected to take over 20 seconds, the Segment app displays an estimated generation time. After clicking Generate, it is recommended that you leave the modal and page open while the CSV is created.
        (If the trait recalculates between when you click Generate and when you download the file, you might want to regenerate the file. The CSV is a snapshot from when you clicked Generate, and could be outdated.)</td>
    </tr>
</table>
