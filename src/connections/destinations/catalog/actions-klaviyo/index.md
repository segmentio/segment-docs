---
title: Klaviyo (Actions) Destination
id: 650bdf1a62fb34ef0a8058e1
---

{% include content/plan-grid.md name="actions" %}

[Klaviyo](https://www.klaviyo.com){:target="_blank"} is a powerful email platform focused on ecommerce that helps companies make more money. It supports segmentation based on category and event triggers like product bought, page viewed, email engagement, or amount spent.

It measures opens, clicks, revenue generated, breakdown of generated revenue based on custom attributes (like campaign type or amount gained per recipient), and provides trend reports, cohort analysis, and subscriber growth.

Klaviyo lets you send personalized newsletters, automates triggered emails, product recommendations, welcome campaigns, order announcements, push notifications, and syncs your data to Facebook custom audiences.

## Benefits of Klaviyo (Actions)

Klaviyo (Actions) provides the following benefits:

- **Simple setup** - Klaviyo (Actions) has a streamlined default setup process making it easier to get started in a way that "just works".
- **More control** - Actions-based destinations enable you to define the mapping between the data Segment receives from your sources and the data Segment sends to Klaviyo.
- **Default property mappings** - Default mappings from the Segment like event, timestamp, and more, allow data to be mapped correctly without any setup required.

> info ""
> Segment automatically migrated all classic Klaviyo destinations configured in Cloud mode to the Klaviyo (Actions) destination in June 2024.
> 
> If you are a Klaviyo classic user, view information about steps you might need to take in the [Migrate to the Klaviyo (Actions) destination](/docs/connections/destinations/catalog/klaviyo#migrate-to-the-klaviyo-actions-destination) documentation. 

## Getting started

1. From the Segment web app, click **Catalog**.
2. Search for **Klaviyo (Actions)** in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Navigate to [Account > Settings > API Keys](https://www.klaviyo.com/account#api-keys-tab){:target="_blank"} in Klaviyo's UI and copy your API Key into the Segment Settings UI.

> info "Generate a Private API Key with full access to Klaviyo's Accounts, Campaigns, Events, List, Profiles, Segments, and Subscriptions APIs"
> Create a key by going to Klaviyo's UI and clicking [Account > Settings > API Keys > Create API Key](https://www.klaviyo.com/account#api-keys-tab){:target="_blank"} to generate a Private API Key. After you've created a key, copy it into the Segment Settings UI.

{% include components/actions-fields.html %}

## Using Klaviyo with Reverse ETL

Klaviyo (Actions) Destination can accept [Reverse ETL](/docs/connections/reverse-etl/) data from your data warehouse sources. Follow the steps in Segment's [Reverse ETL setup guide](/docs/connections/reverse-etl/setup/#step-1-add-a-source) to create your data warehouse source and set up models.

| Action              | Added                                                   | Updated                                                   | Deleted                                                        |
| ------------------- | ------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Order Completed     | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" />      |
| Track Event         | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" />      |
| Upsert Profile      | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" />   | <img class="inline" src="/docs/images/unsupported.svg" />      |
| Remove Profile      | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> | <img class="inline" src="/docs/images/supported.svg" />        |
| Subscribe Profile   | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> **\*** |
| Unsubscribe Profile | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> | <img class="inline" src="/docs/images/supported.svg" />        |

> info ""
> **\*** Though technically possible, this may not be the most intuitive approach to using Reverse ETL.

In order to add users to a list, use the **Upsert Profile** Action and fill out the **List** field with the Klaviyo list you'd like to add the profile to.

Follow these steps to create a list in Klaviyo:

1. Navigate to **Audience > Lists & Segments**.
2. Click **Create List/Segment**.
3. Choose **List**.
4. Give your list a name and add any applicable tags.
5. Click **Create List**.

## Using Klaviyo with Engage

Klaviyo (Actions) Destination can accept your [Engage](/docs/engage/) data. If you want to add a profile to a list associated with an Engage `audienceId`, you **don't** need to create a list in Klaviyo. During the first sync with the **Add Profile To List (Engage)** Mapping, Segment creates a list with the same ID as your audience.

To add and remove profiles in Klaviyo with Engage Audience data:

1. Create and configure your Engage Audience.
2. Navigate to **Engage > Engage Settings > Destinations** and click **Add Destination**.
3. Select **Klaviyo (Actions)**.
4. Select your Audience Space as the source, and name your destination.
5. On the **Mappings** tab, click **Add Mapping** and select **Add Profile To List (Engage)**.
6. Click **Save** and make sure to enable the mapping.
7. On the **Mappings** tab, click **Add Mapping** and select **Remove Profile from List (Engage)**.
8. Click **Save** and make sure you enable the mapping.
9. Enable the destination.
10. On the **Engage > Audiences > (your audience)** page, click **Add Destination** and select the destination created.
11. In the settings that appear in the side panel, toggle the **Send Track** option on, and don't change the **Audience Entered/Audience Exited** event names.
12. Click **Save Settings**.


#### Update opt-in settings

You must update opt-in settings (`Single opt-in` or `Double opt-in`) through the Klaviyo UI. Double opt-in is a process through which a new subscriber must confirm their subscription before being subscribed to a given list in Klaviyo. 

To learn more about opt-in settings, visit [Understanding the double opt-in process](https://help.klaviyo.com/hc/en-us/articles/115005251108#h_01HZ5G5ZQB825T0HDN5E2FA80G){:target="_blank"}.


## FAQ

#### Dealing with error responses from Klaviyo's API
 
##### `429` Too Many Requests

If you're seeing `429` rate limit errors, try enabling batching for the impacted Action. In the mapping configuration, set "Batch data to Klaviyo" to `Yes` to help reduce rate limits.

If `429` errors persist, Segment automatically adjusts the event delivery rate. There’s no fixed rate limit for the Klaviyo destination; Segment adapts based on Klaviyo’s capacity:

- If Klaviyo allows more traffic, Segment increases the send rate.
- If Klaviyo returns `429` or other retryable errors, Segment slows down.
- As more events are successfully delivered, the system gradually speeds up.

Retryable errors tell Segment to slow down, while successful deliveries let Segment send events faster.

##### 409 Conflict
In most cases, you can safely ignore a `409` error code. 

When you use the [Upsert Profile](/docs/connections/destinations/catalog/actions-klaviyo/#upsert-profile) mapping to send Identify events, Segment first attempts to [create a new profile in Klaviyo](https://developers.klaviyo.com/en/reference/create_profile){:target="_blank”}. If the first request returns with a `409` error code, Segment sends a second request to [update the existing profile with the given profile ID](https://developers.klaviyo.com/en/reference/update_profile){:target="_blank”}.

#### 403 Forbidden

Some customers experience 403 errors when sending audience data to Klaviyo through Segment. This occurs due to Klaviyo's security measures blocking requests from shared IPs, which are common when using cloud-hosted platforms, like Segment, that use dynamically generated IP addresses.

To reduce the number of `403` errors that you encounter, enable [IP Allowlisting](/docs/connections/destinations/#ip-allowlisting) for your workspace. For more information the range of IP addresses Klaviyo uses for integration traffic, see Klaviyo's [How to allowlist Klaviyo integration traffic IP addresses](https://help.klaviyo.com/hc/en-us/articles/19143781289115){:target="_blank”} documentation. 

#### How can I unsuppress a profile when adding it to a list?

When adding a user to a list, our action make use of the [Bulk Profile Import](https://developers.klaviyo.com/en/reference/spawn_bulk_profile_import_job){:target="_blank”} endpoint (when batching is enabled), and the [Add Profile To List](https://developers.klaviyo.com/en/reference/create_list_relationships){:target="_blank”} endpoint for non-batched requests. Both of which will not update a users suppression status if they were previously suppressed. 

To unsuppress a previously suppressed profile in Klaviyo, use the **Subscribe Profile** action. This action automatically removes the suppression status for the user when they are subscribed. You can also pair this action with other mappings to suit your workflow.

If this approach doesn't address your use case, [reach out to Segment](mailto:friends@segment.com) to discuss your specific requirements.

#### Can batching be enabled for the entire Klaviyo (Actions) destination?

Batching is only available for events sent through the Upsert Profile action mapping. Other actions in the Klaviyo (Actions) destination don't support batching.

####  Do I need to configure these event names in Klaviyo?

Yes. Event names, including Event Name, Metric Name, and Product Event Name, must be preconfigured in Klaviyo. If an event name isn't set up in Klaviyo, it won’t be processed or linked to user profiles.

####  How do I configure event names in Klaviyo?

To configure event names in Klaviyo:
1. Log in to your Klaviyo account.
2. Go to **Analytics > Metrics**.
3. Add or verify the event names (Event Name, Metric Name and Product Event Name) you plan to use in Segment.
4. Event names are case-sensitive. Ensure the names exactly match the ones used in your Segment integration.
