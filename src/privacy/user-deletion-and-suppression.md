---
title: User Deletion and Suppression
---

Segment offers you the ability to delete and suppress data about your end-users when they are identifiable by a `userId` to support your compliance with privacy regulations like the GDPR and CCPA. For example, if your end-user invokes the Right to Object or Right to be Forgotten, you can block ongoing data collection about that user and delete all historical data about them from Segment's systems, any of your connected warehouses or S3 buckets, and some supported downstream partners.

> info "Business Plan Customers"
> If you use this feature to delete data, you can not Replay the deleted data. For standard Replay requests, you must wait for any pending deletions to complete, and you cannot submit new deletion requests for the period of time that Segment replays data for you.

## Regulations

All deletion and suppression actions in Segment are asynchronous and categorized as Regulations, or requests to Segment to control your data flow. You can issue Regulations from:

- Your Segment Workspace (Settings > End User Privacy)  
- [Segment's Public API](https://docs.segmentapis.com/tag/Deletion-and-Suppression){:target="_blank"}. You can delete up to 5000 `userId`s per call using the Public API. 

With Regulations, you can issue a single request to delete and suppress data about a user by `userId`. Segment scopes Regulations to all sources in your workspace.

> warning "Data sent to device-mode destinations cannot be suppressed"
> Destinations set up in device mode are sent directly to destinations and bypass the point in the pipeline where Segment suppresses events. 

The following regulation types are available:

- **SUPPRESS_WITH_DELETE_INTERNAL*:** Suppress new data and delete from Segment internal systems only  
- **DELETE_INTERNAL*:** Delete data from Segment internal systems only  
- **SUPPRESS_ONLY***: Suppress new data without deleting existing data  
- **UNSUPPRESS*:** Stop an ongoing suppression  
- **SUPPRESS_WITH_DELETE:** Suppress new data and delete existing data  
- **DELETE_ONLY:** Delete existing data without suppressing any new data

> info "All regulations are rate limited to 110,000 users within a 30-day period"
> To send more than 110,000 `SUPPRESS_ONLY`, `UNSUPRESS`, `DELETE_INTERNAL` and/or `SUPPRESS_WITH_DELETE_INTERNAL` Regulations over a 30 day period, [contact Segment Support](https://segment.com/help/contact/){:target="_blank"}.

## Deletion Support

When you create a `SUPPRESS_WITH_DELETE` and `SUPPRESS_WITH_DELETE_INTERNAL` regulation, Segment begins to suppress new data ingestion for that user, and begins to permanently delete previously ingested data associated with this user from your workspace. This includes scanning and removing all messages related to that `userId` from all data stores that don't automatically expire data within 30 days.

Segment deletes messages with this `userId` from the following warehouses and storage destinations:  
- Redshift
- BigQuery
- Postgres
- Snowflake
- Amazon S3 

Warehouse deletions occur using a DML run against your cluster or instance. Segment deletes from S3 by "recopying" clean versions of any files in your bucket that included data about that `userId`.

<!--- not supported yet > warning "Connected warehouses deletions"
> Segment will attempt to delete messages with the target `userId` from your connected warehouses for 7 days. If, after 7 days, Segment cannot delete all identified messages from your connected data warehouse, Segment displays a status of `unsuccessful`. If Segment is unable to delete all identified messages, you will be responsible for removing any --->

#### Deletion requests tab

The deletion requests tab shows a log of all regulations and their status.

In the Segment App (Settings > End User Privacy > Deletion Requests), you can click a `userId` to view its status in Segment internal systems and in the connected destinations.

The deletion request can have one of the following statuses:

1. `INITIALIZED`  
2. `INVALID`  
3. `NOT_SUPPORTED`  
4. `RUNNING`  
5. `PARTIAL_SUCCESS`  
6. `FAILED`  
7. `FINISHED`

When checking the status of deletion requests using Segment's API, the deletion will report an overall status of all of the deletion processes. As a result, Segment returns a `FAILED` status because of a failure on an unsupported destination, even if the deletion from the Segment Internal Systems and supported destinations were completed successfully.

#### Deletion request SLA

Segment has a 30-day SLA for completing deletion requests in Segment's internal stores for deletion requests of fewer than 110,000 users made over 30 days. Your requests will be rate limited if you submit more than 110,000 deletion requests within 30 days.

> warning "This 30-day SLA is limited to only Segment's internal stores"
> Segment cannot guarantee that deletions in your Amazon S3 instance, your connected data warehouse, or other third-party destinations will be completed during that 30-day period.

Segment forwards your deletion requests to a [growing list of supported partners](/docs/privacy/faq/#which-destinations-can-i-send-deletion-requests-to), but you should confirm that each partner fulfills the request. You will also need to contact any unsupported Destinations separately to manage user data deletion.

> info "Users that you UNSUPPRESS after issuing a deletion request may have remaining data"
> If you **UNSUPPRESS** a user after issuing a deletion request for that user, Segment's deletion functionality does not clean up data sent after removing the user from the suppression list.

## The Right to be Forgotten and Suppression Support

When your customers exercise their Right to be Forgotten, sometimes known as Right to Erasure, they expect you to stop collecting new data and delete all previously collected data from your systems: including from Segment and other downstream tools. 

Segment offers suppression tools to help you manage the challenge of users opting-out across different channels and platforms. Segment encourages and expects that you design your systems and applications so you don't collect or forward data to Segment until you have unambiguous, specific, informed consent or have established another lawful legal basis to do so.

**Suppression is not a substitute for gathering affirmative, unambiguous consent about data collection and its uses.**

### Suppression support

[`SUPPRESS` regulations](#suppress-a-new-user) add a user to your suppression list by the `userId`. Segment blocks suppressed users across all sources, and messages you send to Segment with a suppressed `userId` are blocked at the API. These messages do not appear in the debugger, are not saved in archives and systems, and are not sent to any downstream server-side destinations. 

To [remove a user from the suppression list](#remove-a-user-from-the-suppression-list), create an `UNSUPPRESS` regulation.

##### Suppress a new user

The Suppressed Users tab in Segment App (Settings > End User Privacy) allows you to create new Suppression requests and also shows a list of `userId`s which are **actively** being suppressed.

To create a suppression regulation and add a `userId` to this list, click **Suppress New User**, and enter the `userId` in the field that appears. Then click **Request Suppression**.

Segment creates a `SUPPRESS` regulation, and adds the `userId` to your suppression list, mostly processed within 24 hours. In some cases, the suppression request can take up to 30 days to process, depending on the number of requests that are in the queue for your workspace. Once you've created the request, Segment blocks data about these users across all sources.

> info "SUPPRESS_WITH_DELETE requests"
> The Suppressed Users tab only includes `SUPPRESS_ONLY` regulations. If you created a User Deletion request using the UI, you will need to check the [**Deletion Requests**](#deletion-requests-tab) tab, as those are `SUPPRESS_WITH_DELETE` regulation types.

##### Remove a user from the suppression list {#remove-a-user-from-the-suppression-list}

To remove a user from the suppression list, click the ellipses (**...**) icon on the `userId` row, and click **Remove**.

This creates an `UNSUPPRESS` regulation and removes the `userId` from your suppression list. Segment processes most `UNSUPPRESS` regulations within 24 hours.

## Data retention

Segment stores a copy of all event data received in Segment's secure event archives on S3. By default, all workspaces store data for an unlimited period of time, but you can modify the lifecycle policies for the data stored internally. Segment uses this data for [data replays](/docs/guides/what-is-replay/) and for troubleshooting purposes.

Segment recommends keeping your data for at least 30 days to enable [replays](/docs/guides/what-is-replay/) of your data.

To change your data retention settings, open Segment and navigate to **Privacy > Settings > Data Retention**.

### Workspace Default Archive Retention Period

Select the default retention period for the workspace in this setting. This value applies to all sources in the workspace, unless overridden in the [Source-Level Archive Retention Periods](#source-level-archive-retention-periods) setting.

> warning "7 day Retention Periods will be deprecated on March 6, 2025"
> After March 6, you will no longer be able to set your workspace's retention period to 7 days. All workspaces with 7 day retention periods will be updated to have 14 day retention periods. 

You can select from the following Archive Retention time periods:

- 7 days   
- 30 days  
- 90 days  
- 180 days  
- 365 days  
- Unlimited (**default**)

### Source-Level Archive Retention Periods

> warning "Source-Level Archive Retention Periods will be deprecated on April 15, 2025"
> After April 15, you will no longer be able to override your workspace's default retention period on a source-by-source basis. 

Override the workspace default retention period on a per-source level.

You can select from the following Archive Retention time periods:

- Default (This is the default value you set in the [Workspace Default Archive Retention Period](#workspace-default-archive-retention-period))  
- 7 days  
- 30 days  
- 90 days  
- 180 days  
- 365 days  
- Unlimited