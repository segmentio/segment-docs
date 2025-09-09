---
title: Default Alerts
---

Segment's default alerts have a preset trigger and are often used to detect changes users make to the integrations in your workspace.

On the **Monitor** tab, you can see all of your alerts, separated by product area, in a tabular format.

> info "Only Workspace Owners can view and edit all alerts"
> Users with other roles can see all alerts in a workspace, but can only edit or see the configured details for alerts that they created.

You can create alerts for the following product areas: 
- [Sources](#source-alerts)
- [Destinations](#destination-alerts)
- [Storage Destinations](#storage-destination-alerts)
- [Protocols](#protocols-alerts)
- [Unify](#unify-alerts) 
- [Engage](#engage-alerts)
- [Users](#users-alerts)
- [Functions](#functions-alerts)
- [Reverse ETL](#reverse-etl-alerts)
- [Data Graph](#data-graph-alerts)

The Alerting table includes the following information about each event: 
- **Alert name**: The type of alert; for example, "Audience created" or "Audience deleted".
- **Last triggered**: The most recent date and time, in your local time zone, that the alert was triggered. Some alerts, like **Violations Detected**, trigger only once per day. 
- **Status**: Either **enabled**, if the alert is currently configured in your workspace, or **disabled**, if you're not configured to receive alerts for an event.
- **Notification channels**: Icons describing what notification channels you'll receive the alerts on - through a Slack webhook, Slack workflow, email, or in-app notification.
- **Actions**: By selecting the menu icon for an individual alert, you can edit or delete it from the Alerting page.

## Create a new alert

To create a new alert: 
1. From the Segment app, navigate to the **Monitor** tab and select **Alerts**. 
2. On the **Default** tab, identify the event you'd like to be alerted for and select the menu icon under the **Actions** tab. 
3. Click **Enable alert**. 

> info "Slack and mailing list notification channels require additional setup"
> Before sending an alert to Slack, you must first create a Slack webhook. For more information about Slack webhooks, see Slack's [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks){:target="_blank”} documentation.
>
> While you can only enter one email address at a time when signing up for email alerts, you can send the alert to multiple users by entering the email address of a mailing list. To create a mailing list, refer to the documentation for your email provider, like Google's [Create a group & choose group settings](https://support.google.com/groups/answer/2464926?hl=en){:target="_blank”} for Gmail or Microsoft's [Create and manage distribution groups](https://support.microsoft.com/en-us/office/distribution-groups-e8ba58a8-fab2-4aaf-8aa1-2a304052d2de#bkmk_create){:target="_blank”} for Outlook. 

## Alert descriptions

View a brief description of each alert type. 

### Source alerts
- **New Event Blocked**: Segment blocked an event not previously specified in your [Source Schema](/docs/connections/sources/schema/) from entering a downstream destination. 
- **New Forbidden Event Property**: Segment blocked an event property that was not specified in your [Source Schema](/docs/connections/sources/schema/) from entering a downstream destination.
- **Source Created**: A user in your workspace created a new source.
- **Source Deleted**: A user in your workspace deleted a source. 
- **Source Disabled**: A source was disabled, either by a user in your workspace or by Segment. Segment automatically disables a source after 14 days if the source isn't connected to an enabled destination. 
- **Source Run Failed**: After Segment fails to extract data from your source 3 consecutive times, you'll be notified. 
- **Source Settings Modified**: A user in your workspace modified the settings for one of your sources.

> info "Custom Source alerts"
> You can also configure custom [source volume alerts](/docs/monitor/alerts/custom-alerts/#source-volume-alert).

## Destination alerts
- **Destination Disabled**: A user in your workspace disabled a destination. 
- **Destination Enabled**: A user in your workspace enabled a destination. 
- **Destination Filter Created**: A user in your workspace created a [destination filter](/docs/connections/destinations/destination-filters/). 
- **Destination Filter Deleted**: A user in your workspace deleted a [destination filter](/docs/connections/destinations/destination-filters/). 
- **Destination Filter Disabled**: A user in your workspace disabled a [destination filter](/docs/connections/destinations/destination-filters/). 
- **Destination Filter Enabled**: A user in your workspace enabled a [destination filter](/docs/connections/destinations/destination-filters/). 
- **Destination Filter Modified**: A user in your workspace modified a [destination filter](/docs/connections/destinations/destination-filters/). 
- **Destination Modified**: A user in your workspace made changes to a destination. 

> info "Custom Destination alerts"
> You can also configure custom [Successful delivery rate alerts](/docs/monitor/alerts/custom-alerts/#successful-delivery-rate-alert) and [Audience size change alerts](/docs/monitor/alerts/custom-alerts/#audience-size-change). 

## Storage Destination alerts
- **Storage Destination Created**: A user in your workspace created a new instance of a storage destination. 
- **Storage Destination Deleted**: A user in your workspace deleted a storage destination. 
- **Storage Destination Disabled**: A user in your workspace disabled a storage destination. 
- **Storage Destination Modified**: A user in your workspace modified an existing storage destination. 
- **Storage Destination Sync Failed**<sup>*</sup>: Segment failed to sync any rows of data from your source to your storage destination. 
- **Storage Destination Sync Partially Succeeded**<sup>*</sup>: Segment encountered some notices and was only able to sync some of your data from your source to your storage destination. 
- **Storage Destination Sync Skipped**<sup>*</sup>: Segment skipped a scheduled sync to your storage destination. This might happen if the previous sync wasn't complete by the time the next sync was scheduled to begin. 

_<sup>*</sup>The alerts for skipped, partially successful, or failed syncs apply across all storage destinations in your workspace and allow you to set a threshold after which you'd be notified. For example, you could choose to be notified after 1 failed sync, 5 skipped syncs, or 10 partially successful syncs across all storage destinations in your workspace. You can view the threshold you set in the **Sync threshold** column in the Storage Destinations tab of the Default alerts table._ 


## Protocols alerts
- **Source Connected To Tracking Plan**: A user in your workspace connected a source to one of your Tracking Plans. 
- **Source Disconnected From Tracking Plan**: A user in your workspace disconnected a source from one of your Tracking Plans. 
- **Tracking Plan Created**: A user in your workspace created a new Tracking Plan. 
- **Tracking Plan Deleted**: A user in your workspace deleted a Tracking Plan. 
- **Tracking Plan Inferred**: Segment inferred the data type for an event. 
- **Tracking Plan Modified**: A user in your workspace modified a Tracking Plan. 
- **Tracking Plan New Event Allowed**: An unplanned event was allowed by your [Schema Controls](/docs/protocols/enforce/schema-configuration/). 
- **Tracking Plan New Event Blocked**: An unplanned event was allowed by your [Schema Controls](/docs/protocols/enforce/schema-configuration/). 
- **Tracking Plan New Group Trait Omitted**: A new trait attached to a Group call was was omitted from an event. 
- **Tracking Plan New Identify Trait Omitted**: A new trait attached to a [Identify call was was omitted from an event](/docs/protocols/enforce/schema-configuration/#identify-calls---unplanned-traits). 
- **Tracking Plan New Track Property Omitted**: A new trait attached to a [Track call was was omitted from an event](/docs/protocols/enforce/schema-configuration/#track-calls---unplanned-properties). 
- **Violations Detected**: Segment detected [data that does not confirm to your Tracking Plan](/docs/protocols/validate/forward-violations/). 

## Unify alerts
- **Computed Trait CSV Downloaded**: A user in your workspace [downloaded a CSV file of all users that have a Computed Trait](/docs/unify/Traits/computed-traits/#downloading-your-computed-trait-as-a-csv-file). 
- **Computed Trait Created**: A user in your workspace created a new [Computed Trait](/docs/unify/Traits/computed-traits/#types-of-computed-traits). 
- **Computed Trait Deleted**: A user in your workspace deleted an existing [Computed Trait](/docs/unify/Traits/computed-traits/#types-of-computed-traits).
- **Computed Trait Destination Sync Failed**: Segment failed to sync [Computed Trait generated events](/docs/engage/using-engage-data/#computed-trait-generated-events) with your downstream destination. 
- **Computed Trait Modified**: A user in your workspace made changes to an existing Computed Trait. 
- **Computed Trait Run Failed**: Segment was unable to compute your trait. To resolve this error, please [contact Segment support](https://segment.com/help/contact/){:target="_blank”}. 
- **Profiles Sync Historical Backfill Completed**: Segment completed [backfilling profile data from your data warehouse](/docs/unify/profiles-sync/profiles-sync-setup/#using-historical-backfill).
- **Profiles Sync Warehouse Created**: A user in your workspace [connected a data warehouse to Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/#step-2-connect-the-warehouse-and-enable-profiles-sync). 
- **Profiles Sync Warehouse Deleted**: A user in your workspace [deleted the data warehouse connected to Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/#disable-or-delete-a-warehouse). 
- **Profiles Sync Warehouse Disabled**: A user in your workspace [disabled the data warehouse connected to Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/#disable-or-delete-a-warehouse). 
- **Profiles Sync Warehouse Modified**: A user in your workspace [modified the data warehouse connected to Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/#settings-and-maintenance). 
- **Profiles Sync Warehouse Sync Failed**: Segment failed to sync any of 
your identity-resolved profiles to your data warehouse. 
- **Source Connected To Space**: A user in your workspace connected a source to your Unify space. 
- **Source Disconnected From Space**: A user in your workspace disconnected a source from your Unify space. 

## Engage alerts
- **Audience CSV Downloaded**: A user in your workspace [downloaded an Audience as a CSV file](/docs/engage/audiences/#download-your-audience-as-a-csv-file). 
- **Audience Created**: A user in your workspace [created a new Audience](/docs/engage/audiences/#building-an-audience).
- **Audience Deleted**: A user in your workspace deleted an Audience.
- **Audience Destination Sync Failed**: Segment was unable to sync your Audience with a connected destination. 
- **Audience Modified**: A user in your workspace modified an Audience.
- **Audience Run Complete**: Segment computed your Audience. For more information about how long it takes Segment to compute an Audience, see the [Engage Audiences Overview](/docs/engage/audiences/#understanding-compute-times) docs. 
- **Audience Run Failed**: Segment was unable to compute your Audience. To resolve this error, please [contact Segment support](https://segment.com/help/contact/){:target="_blank”}.

> info "Custom Engage alerts"
> You can also configure custom [Activation event health spikes or drops](/docs/engage/audiences/#activation-event-health-spikes-or-drops) alerts.

## Users alerts
- **Access Request Created**: A user in your workspace requested access to a resource that they don't currently have permission to view. For more information, see the [Request Access](/docs/segment-app/iam/membership/#request-access) documentation. 
- **Public API Tokens Without Owners Detected**: Segment detected that the user that created one of your Public API tokens is no longer in your workspace. Workspace Owners receive the alert on the day that Segment detects the token's owner is no longer in the workspace and then again 30 days after the last alert. 
- **Users Invited**: Someone [invited a new Team Member](/docs/segment-app/iam/membership/#invite-a-new-team-member) to your workspace. 

## Functions alerts
- **Destination Filter Created**: A user in your workspace created a [destination filter](/docs/connections/destinations/destination-filters/). 
- **Destination Filter Deleted**: A user in your workspace deleted a [destination filter](/docs/connections/destinations/destination-filters/). 
- **Destination Filter Modified**: A user in your workspace modified a [destination filter](/docs/connections/destinations/destination-filters/). 
- **Source Function Created**: A user in your workspace created a [source function](/docs/connections/functions/source-functions/).
- **Source Function Deleted**: A user in your workspace deleted a [source function](/docs/connections/functions/source-functions/).
- **Source Function Modified**: A user in your workspace modified a [source function](/docs/connections/functions/source-functions/).

## Reverse ETL alerts
- **Reverse ETL Sync Failed**: Segment failed to sync any of your records from your warehouse to your downstream destination. 
- **Reverse ETL Sync Partial Success**: Segment was able to sync some, but not all, of your records from your data warehouse with your downstream destination. 

> info "Custom Reverse ETL alerts"
> You can also configure custom Reverse ETL alerts for [mapping-level successful delivery rate fluctuations](/docs/monitor/alerts/custom-alerts/#mapping-level-successful-delivery-rate-fluctuations). 

## Data Graph alerts
- **Data Graph Breaking Change**: A change in your warehouse broke components of your Data Graph. For more information about breaking changes, see the [Data Graph docs](/docs/unify/data-graph/#detect-warehouse-breaking-changes). 