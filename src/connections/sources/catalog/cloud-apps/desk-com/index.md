---
title: Desk.com Source
rewrite: true
redirect_from: '/connections/sources/catalog/cloud-apps/desk/'
hidden: true
---

> error ""
> Desk.com ended operations on March 13th 2020. This page is for historical reference purposes only.

{% include content/source-region-unsupported.md %}

[Desk.com](http://www.desk.com/), previously known as Assistly, is a SaaS help desk and customer support product owned by Salesforce.com and accessible through the cloud.

Desk.com is specifically implemented to targets small businesses with its features and functions. This tool can help you combining your support data with website activity and product usage data, as well as analyzing it using your favorite business intelligence and SQL querying tools.


## Getting Started

### Permissions

You will need a Desk.com account with administrator privileges.

### Add a new Desk.com source

1. From your workspace's `sources` page, click `add source`.
3. Choose Desk.com.
4. Choose a name for your Desk.com source to identify it within your workspace.
5. Enter your connection credentials
6. Add a warehouse or connect Intercom to an already existing warehouse in your workspace

## Components

The Desk.com source is built with a sync component, which means we'll make requests to their API on your behalf on a 3 hour interval to pull the latest data into Segment. In the initial sync, we'll grab all the Desk.com objects (and their corresponding properties) according to the Collections Table below. The objects will be written into a separate schema, corresponding to the source instance's schema name you designated upon creation (ie. `desk_com.cases`).

Our sync component uses an upsert API, so the data in your warehouse loaded using sync will reflect the latest state of the corresponding resource in Desk.com. For example, if `priority` goes from `2` to `4` between syncs, on its next sync that priority value will be `4`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources will sync with Segment every 3 hours. Depending on your Warehouses plan, we will push the Source data to your warehouse on the interval associated with your billing plan.


## Collections

| Collection  | Type   |
| ----------- | ------ |
| `articles`  | object |
| `brands`    | object |
| `cases`     | object |
| `companies` | object |
| `customers` | object |
| `users`     | object |
| `feedbacks` | object |

## Collection Properties

### Articles

| Property Name          | Description                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| subject                | The subject of the article                                                               |
| position               | The position of the article as displayed in the support center                           |
| quickcode              | Code used in the agent to quickly add article content to a case                          |
| keywords               | Keywords in the article                                                                  |
| publish_at             | Date the article is to be published                                                      |
| created_at             | Date the article was created                                                             |
| updated_at             | Date the article was updated                                                             |
| body                   | The content of the article (HTML formatted)                                              |
| body_email             | Email specific content                                                                   |
| body_email_auto        | True/false to use content from body                                                      |
| body_chat              | Chat specific content                                                                    |
| body_chat_auto         | True/false to use content from body                                                      |
| body_web_callback      | Chat specific content                                                                    |
| body_web_callback_auto | True/false to use content from body                                                      |
| body_twitter           | Twitter specific content                                                                 |
| body_twitter_auto      | True/false to use content from body                                                      |
| body_qna               | QNA specific content                                                                     |
| body_qna_auto          | True/false to use content from body                                                      |
| body_phone             | Phone specific content                                                                   |
| body_phone_auto        | True/false to use content from body                                                      |
| body_facebook          | Facebook specific content                                                                |
| body_facebook_auto     | True/false to use content from body                                                      |
| rating                 | The percentage of people who found the article helpful                                   |
| rating_count           | The number of ratings given to the article                                               |
| rating_score           | The number of people who found the article helpful                                       |
| public_url             | The publicly accessible URL for this article                                             |
| in_support_center      | True/false to display the article in the support center                                  |
| internal_notes         | Notes to the agent using the article                                                     |
| locale                 | The ISO language code of the article                                                     |
| available_locales      | A list of ISO language codes corresponding to all available translations for the article |

### Brands

| Property Name | Description                     |
| ------------- | ------------------------------- |
| name          | Name of the brand               |
| created_at    | When the brand was created      |
| updated_at    | When the brand was last updated |

### Cases

| Property Name     | Description                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                | integer identifier for this object                                                                                                                                                                                                                                                                                                                                                                                                   |
| external_id       | unique external identifier to reference this case to an external system                                                                                                                                                                                                                                                                                                                                                              |
| blurb             | Short summary of, or excerpt from, the case                                                                                                                                                                                                                                                                                                                                                                                          |
| subject           | Subject of the case                                                                                                                                                                                                                                                                                                                                                                                                                  |
| priority          | Number between 1 and 10, 1 being lowest priority                                                                                                                                                                                                                                                                                                                                                                                     |
| Description       | Description or background information                                                                                                                                                                                                                                                                                                                                                                                                |
| status            | Current state of the case, one of: `new`, `open`, `pending`, `resolved`, `closed`, `deleted`                                                                                                                                                                                                                                                                                                                                         |
| type              | Channel of the case, one of: chat, twitter, email, qna, facebook, phone                                                                                                                                                                                                                                                                                                                                                              |
| labels            | Array of labels associated with this case                                                                                                                                                                                                                                                                                                                                                                                            |
| label_ids         | Array of label ids associated with this case                                                                                                                                                                                                                                                                                                                                                                                         |
| language          | The case's ISO language code, which returns the site's default language (or nil if not set) unless multi-lingual support is enabled                                                                                                                                                                                                                                                                                                  |
| custom_fields     | Hash of values for custom fields                                                                                                                                                                                                                                                                                                                                                                                                     |
| created_at        | When this record was created                                                                                                                                                                                                                                                                                                                                                                                                         |
| updated_at        | When this record was last updated by any action                                                                                                                                                                                                                                                                                                                                                                                      |
| changed_at        | When this case was last updated by a user                                                                                                                                                                                                                                                                                                                                                                                            |
| active_at         | When this case was last active                                                                                                                                                                                                                                                                                                                                                                                                       |
| received_at       | When the most recent message was received                                                                                                                                                                                                                                                                                                                                                                                            |
| locked_until      | When the lock on this case will expire                                                                                                                                                                                                                                                                                                                                                                                               |
| first_opened_at   | When this case was first opened                                                                                                                                                                                                                                                                                                                                                                                                      |
| opened_at         | When this case was most recently opened                                                                                                                                                                                                                                                                                                                                                                                              |
| first_resolved_at | When this case was first resolved                                                                                                                                                                                                                                                                                                                                                                                                    |
| resolved_at       | When this case was most recently resolved                                                                                                                                                                                                                                                                                                                                                                                            |
| suppress_rules    | Set to `true` to disable rule processing when creating or updating this case                                                                                                                                                                                                                                                                                                                                                         |
| route_status      | Current routing status of the case. this field only appears when routing is enabled for the first time. there are four values: `added` when a case is first added to desk. this switches to available after a few seconds. `available` case is not in use and can be routed. `assigned` case is being presented to a specific user to accept. `active` a case is open and in edit mode. doesn't necessarily have to have been routed |

### Companies

| Property Name | Description                                                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name          | Name of the company                                                                                                                                                                           |
| domains       | Array of top level domain names (ie. desk.com, british.co.uk). Pass an array of domains to replace the set of domains for the company. An empty array will clear all domains from the company |
| created_at    | When the company was created                                                                                                                                                                  |
| updated_at    | When the company was last updated                                                                                                                                                             |
| custom_fields | Hash of values for custom fields                                                                                                                                                              |

### Customers

| Property Name         | Description                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| first_name            | Customer's first name                                                                                         |
| last_name             | Customer's last name                                                                                          |
| company               | Customer's company                                                                                            |
| title                 | Customer's title                                                                                              |
| avatar                | Customer's avatar URL - image sourced from Twitter, Facebook or Gravatar. See note on avatar_size param below |
| uid                   | Customer's Multipass SSO UID                                                                                  |
| external_id           | Unique external identifier to reference this customer to an external system                                   |
| background            | Any background information for the customer                                                                   |
| language              | Customer's ISO language code, nil unless multi-lingual support is enabled                                     |
| locked_until          | Time in which the lock on this customer will expire                                                           |
| created_at            | Time when customer was created                                                                                |
| updated_at            | Time when customer was last updated at                                                                        |
| emails                | Array of email objects, each specifying the contact type and value of the email address                       |
| phone_numbers         | Array of phone number objects, each specifying the contact type and value of the phone number                 |
| addresses             | Array of address objects, each specifying the contact type and value of the location                          |
| custom_fields         | Hash of values for custom fields                                                                              |
| access_private_portal | Whether or not customer can access private portal                                                             |
| access_company_cases  | Whether or not customer can access company cases                                                              |


### Users

| Property Name    | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| name             | Name of the user                                                   |
| public_name      | Public facing name of the user                                     |
| email            | User's email                                                       |
| email_verified   | Indicates if an email address has been verified                    |
| avatar           | User's avatar URL - image sourced from Gravatar.                   |
| level            | User's permission level                                            |
| created_at       | When this record was created                                       |
| updated_at       | When this record was last updated                                  |
| current_login_at | When this user most recently logged in                             |
| last_login_at    | When this user last logged in                                      |
| available        | `true` when user is online with routing enabeld, `false` otherwise |

### Feedbacks

| Property Name       | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| rating              | Numeric rating left by customer                                        |
| rating_type         | Rating type used to generate this feedback, either yes_no or four_star |
| additional_feedback | An optional additional feedback text field                             |
| created_at          | Date the feedback was created                                          |
| updated_at          | Date the feedback was updated                                          |
| user                | The user who created this feedback                                     |
| case                | The case to which this feedback is assigned                            |


## Adding Destinations

Currently, Warehouses are the only supported destination for object-cloud sources.
