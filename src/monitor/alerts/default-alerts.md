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
- [Protocols](#protocol-alerts)
- [Unify](#unify-alerts) 
- [Engage](#engage-alerts)
- [Functions](#functions-alerts)
- [Reverse ETL](#reverse-etl-alerts)
- [Data Graph](#data-graph-alerts)

The Alerting table includes the following information about each event: 
- **Alert name**: The type of alert, for example, "Audience created" or "Audience deleted".
- **Last triggered**: The most recent date and time, in your local time zone, that the alert was triggered. 
- **Status**: Either **enabled**, if the alert is currently configured in your workspace, or **disabled**, if you're not configured to receive alerts for an event.
- **Notification channels**: Icons describing what notification channels you'll receive the alerts on - through a Slack webhook, email, or in-app notification.
- **Actions**: By selecting the menu icon for an individual alert, you can edit or delete it from the Alerting page.

## Create a new alert

To create a new alert: 
1. From the Segment app, navigate to the **Monitor** tab and select **Alerts**. 
2. On the **Default** tab, identify the event you'd like to be alerted for and select the menu icon under the **Actions** tab. 
3. Click **Enable alert**. 

## Alert descriptions

View a brief description of each alert type. 

### Source alerts
- **New Event Blocked**: Segment blocked an event not previously specified in your [Source Schema](/docs/connections/sources/schema/) from entering a downstream destination. 
- **New Forbidden Event Property**: 
- **Source Created**: A user in your workspace created a new source.
- **Source Deleted**: A user in your workspace deleted a source. 
- **Source Disabled**: A source was disabled, either by a user in your workspace or by Segment. Segment automatically disables a source after 14 days if the source isn't connected to an enabled destination. 
- **Source Run Failed**: After Segment fails to extract data from your source 3 consecutive times, you'll be notified. 
- **Source Settings Modified**: A user in your workspace modified the settings for one of your sources.

> info "Custom Source alerts"
> During the Monitor public beta, you can configure custom [source volume alerts](/docs/connections/alerting/#source-volume-alerts), but these alerts won't appear in the Monitor tab. 

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
> During the Monitor public beta, you can configure custom [Successful delivery rate alerts](/docs/connections/alerting/#successful-delivery-rate-alerts), but these alerts won't appear in the Monitor tab. 

## Storage Destination alerts
- **Storage Destination Created**: A user in your workspace created a new instance of a storage destination. 
- **Storage Destination Deleted**: A user in your workspace deleted a storage destination. 
- **Storage Destination Disabled**: A user in your workspace disabled a storage destination. 
- **Storage Destination Modified**: A user in your workspace modified an existing storage destination. 
- **Storage Destination Sync Failed**: Segment failed to sync any rows of data from your source to your storage destination. 
- **Storage Destination Sync Partially Succeeded**: Segment encountered some notices and was only able to sync some of your data from your source to your storage destination. 
- **Storage Destination Sync Skipped**: Segment skipped a scheduled sync to your storage destination. This might happen if the previous sync wasn't complete by the time the next sync was scheduled to begin. 


## Protocol alerts
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
- **Audience Run Failed**: Segment was unable to compute your Audience. To resolve this error, please [contact Segment support](https://segment.com/help/contact/){:target="_blank”}.

> info "Custom Engage alerts"
> During the Monitor public beta, you can configure custom [Activation event health spikes or drops](/docs/engage/audiences/#activation-event-health-spikes-or-drops) alerts, but these alerts won't appear in the Monitor tab. 

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
> During the Monitor public beta, you can configure custom Reverse ETL alerts for [failed or partially successful syncs](/docs/connections/reverse-etl/manage-retl/#failed-or-partially-successful-syncs) and [mapping-level successful delivery rate fluctuations](/docs/connections/reverse-etl/manage-retl/#mapping-level-successful-delivery-rate-fluctuations), but these alerts won't appear in the Monitor tab. 

## Data Graph alerts
- **Data Graph Breaking Change**: A change in your warehouse broke components of your Data Graph. For more information about breaking changes, see the [Data Graph docs](/docs/unify/data-graph/#detect-warehouse-breaking-changes). 