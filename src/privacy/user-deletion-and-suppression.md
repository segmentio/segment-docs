---
title: "User Deletion and Suppression"
---

In keeping with Segment's commitment to GDPR and CCPA readiness, Segment offers the ability to delete and suppress data about end-users when they are identifiable by a `userId`, should they revoke or alter consent to data collection. For example, if an end-user invokes the Right to Object or Right to Erasure under the GDPR or CCPA, you can use these features to block ongoing data collection about that user and delete all historical data about them from Segment's systems, connected S3 buckets and warehouses, and supported downstream partners.

[Contact Support](https://segment.com/help/contact/) if you need to process more than 100,000 users within a 30 day period.

> info "Business Plan Customers"
> If you use this feature to delete data, you can not Replay the deleted data. For standard Replay requests, you must wait for any pending deletions to complete, and you cannot submit new deletion requests for the period of time that Segment replays data for you.

> info ""
> The legacy GraphQL APIs for user deletion and suppression are deprecated. Instead, use the [Segment Public API](https://docs.segmentapis.com/tag/Deletion-and-Suppression){:target="_blank"} to interact with the User Deletion and Suppression system.

## Overview

All deletion and suppression actions in Segment are asynchronous and categorized as Regulations. Regulations are requests to Segment to control your data flow. You can issue Regulations from:
 - Your Segment Workspace (Settings > End User Privacy)
 - [Segment's Public API](https://docs.segmentapis.com/tag/Deletion-and-Suppression){:target="_blank"}

You can programmatically interact with the User Deletion and Suppression system using the [Public API](https://docs.segmentapis.com/tag/Deletion-and-Suppression){:target="_blank"}.

With Regulations, you can issue a single request to delete and suppress data about a user by `userId`. Segment scopes Regulations to your workspace (which targets all sources within the workspace), to a specific source, or to a cloud source.

The following regulation types are available:

 - SUPPRESS_ONLY
 - UNSUPPRESS
 - SUPPRESS_WITH_DELETE
 - DELETE_INTERNAL
 - DELETE_ONLY

## Suppression Support and the Right to Revoke Consent

`SUPPRESS` regulations add a user to your suppression list by the `userId`. Segment blocks suppressed users across all sources; messages you send to Segment with a suppressed `userId` are blocked at the API. These messages do not appear in the debugger, are not saved in archives and systems, and are not sent to any downstream server-side destinations. However, if you set up a destination in [device-mode](/docs/connections/destinations/#connection-modes), the events are sent directly to destinations as well. In this case, Suppression doesn't suppress the events.

When a customer exercises the right to erasure, they expect that you stop collecting data about them. Suppression regulations ensure that regardless of how you're sending data to Segment, if a user opts out, Segment respects their wishes on an ongoing basis and across applications.

**Suppression is not a substitute for gathering affirmative, unambiguous consent about data collection and its uses.**

Segment offers suppression tools to help you manage the challenge of users opting-out across different channels and platforms. Segment encourages and expects that you design your systems and applications so you don't collect or forward data to Segment until you have unambiguous, specific, informed consent or have established another lawful legal basis to do so.

To remove a user from the suppression list, create an `UNSUPPRESS` regulation.

## Deletion Support and the Right to Be Forgotten

When you create a `SUPPRESS_WITH_DELETE` regulation, the user is actively suppressed, and Segment begins permanently deleting all data associated with this user from your workspace. This includes scanning and removing all messages related to that `userId` from all storage mediums that don't automatically expire data within 30 days, including archives, databases, and intermediary stores.

Segment deletes messages with this `userId` from connected raw data Destinations, including Redshift, BigQuery, Postgres, Snowflake, and Amazon S3. Warehouse deletions occur using a DML run against your cluster or instance, and Segment delete from S3 by "recopying" clean versions of any files in your bucket that included data about that `userId`.

Segment forwards these deletion requests to a [growing list of supported partners](/docs/privacy/faq/#which-destinations-can-i-send-deletion-requests-to).

Note that Segment has a 30-day SLA for submitted deletion requests. Additionally, Segment's deletion manager can only accommodate 100,000 users within a 30-day period and cannot guarantee a 30-day SLA if there are more than 100,000 deletion requests submitted within those 30 days. [Contact Support](https://segment.com/help/contact/){:target="_blank"} if you need to process more than 100,000 users within a 30 day period.

**Segment cannot guarantee that data is deleted from your Destinations.**

Segment forwards deletion requests to [supported Destinations](/docs/privacy/faq/#which-destinations-can-i-send-deletion-requests-to) (such as Braze, Intercom, and Amplitude) but you should confirm that each partner fulfills the request.

You will also need to contact any unsupported Destinations separately to manage user data deletion.

Note that if you later **UNSUPPRESS** a user, the deletion functionality does not clean up data sent after removing the user from the suppression list.

## Suppressed users

The Suppressed Users tab in Segment App (Settings > End User Privacy) allows you to create new Suppression requests and also shows an list of `userId`s which are **actively** being suppressed. It can take a few hours/days for the suppression to become active, depending on the number of requests that are in the queue for your workspace. Once the request is active, Segment blocks data about these users across all sources. 

Note that list only includes `SUPPRESS_ONLY` regulations. If you created a User Deletion request using UI, you will need to check the **Deletion Requests** tab, as those are `SUPPRESS_WITH_DELETE` regulation types.

### Suppress a new user

To create a suppression regulation and add a `userId` to this list, click **Suppress New User**, and enter the `userId` in the field that appears. Then click **Request Suppression**.

Segment creates a `SUPPRESS` regulation, and adds the `userId` to your suppression list, mostly processed within 24 hours. In some cases, the suppression request can take up to 30 days to process.

### Remove a user from the suppression list

To remove a user from the suppression list, click the ellipses (**...**) icon on the `userId` row, and click **Remove**.

This creates an `UNSUPPRESS` regulation, and removes the `userId` from your suppression list, mostly processed within 24 hours.

## Deletion requests

The deletion requests tab shows a log of all regulations with a deletion element along with status. The deletion requests can take up to 30 days to process.

In the Segment App (Settings > End User Privacy > Deletion Requests), you can click a userId to view its status in Segment internal systems, and in the connected destinations.

The deletion request can have one of the following statuses:
1. `FAILED`
2. `FINISHED`
3. `INITIALIZED`
4. `INVALID`
5. `NOT_SUPPORTED`
6. `PARTIAL_SUCCESS`
7. `RUNNING`

When checking the status of deletion requests using Segment's API, the deletion will report an overall status of all of the deletion processes. As a result, Segment returns a `FAILED` status because of a failure on an unsupported destination, even if the deletion from the Segment Internal Systems and supported destinations were completed successfully.

### Regulate User from a single Source in a Workspace

Refer to [Create Source Regulation](https://docs.segmentapis.com/tag/Deletion-and-Suppression#operation/createSourceRegulation){:target="_blank"} in the Public API.

### Delete Object from a Cloud Source

Refer to the [Create Cloud Source Regulation](https://docs.segmentapis.com/tag/Deletion-and-Suppression#operation/createCloudSourceRegulation){:target="_blank"} Public API endpoint.

Cloud Sources sync objects to Segment. As a result, Cloud Sources are regulated based on an `objectId` instead of a `userId`.
Before you delete the object from Segment, you should delete it from the upstream system first.

### List Suppressed Users for your Workspace

Refer to [List Suppressions](https://docs.segmentapis.com/tag/Deletion-and-Suppression#operation/listSuppressions){:target="_blank"} method in the Public API.

### List Deletion Requests for your Workspace

Refer to the [List Regulations from Source](https://docs.segmentapis.com/tag/Deletion-and-Suppression#operation/listRegulationsFromSource){:target="_blank"} Public API method.

## Data retention

Segment stores a copy of all event data received in Segment’s secure event archives on S3. By default, all workspaces store data for an unlimited period of time, but you can modify the lifecycle policies for the data stored internally. Segment uses this data for [data replays](/docs/guides/what-is-replay/) and for troubleshooting purposes.

Segment recommends keeping your data for at least 30 days to enable [replays](/docs/guides/what-is-replay/) of your data.

To change your data retention settings, navigate to **Privacy > Settings > Data Retention** in Segment.

### Workspace Default Archive Retention Period

Select the default retention period for the workspace in this setting. This value applies to all sources in the workspace, unless overridden in the [Source-Level Archive Retention Periods](#source-level-archive-retention-periods) setting.

You can select from the following Archive Retention time periods:

- 7 days
- 30 days
- 90 days
- 180 days
- 365 days
- Unlimited (**default**)

### Source-Level Archive Retention Periods

Override the workspace default retention period on a per-source level.

You can select from the following Archive Retention time periods:

- Default (This is the default value you set in the [Workspace Default Archive Retention Period](#workspace-default-archive-retention-period))
- 7 days
- 30 days
- 90 days
- 180 days
- 365 days
- Unlimited
