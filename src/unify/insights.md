---
title: Profile Insights 
plan: unify
---

With Profile Insights, you can troubleshoot event data with transparent insight into your [Unify profiles](/docs/unify/). View errors and violations, success logs, and an audit trail for events that flow into your profiles. You can also learn more about why certain issues occur, and take preventative action against future errors.

## Getting started

To get started with Profile Insights, navigate to **Unify** > **Profiles insights**.

From the Profiles insights page, you can navigate to the [Errors and violations](#errors-and-violations), [Success logs](#success-logs), and [Audit trail](#audit-trail) tabs.

## Errors and violations

Use the errors and violations tab to view and help you troubleshoot any errors and violations that have occurred in your space.

You can filter results by ID type, time range, specific violations, and more.

### Errors

Errors occur when a message didn't resolve to a profile because Segment didn't find an identifier or the system behaved unexpectedly.

Click on an error log to view the error and next steps that Segment recommends.

| Error     | Description                                   |
|---------------|-----------------------------------------------|
| `No matching identifiers on event`  |  The event didn't have any identifier types that matched your [ID Resolution Settings](/docs/unify/identity-resolution/identity-resolution-settings). As a result, the event didn't resolve to a profile.                          |

### Violations

Violations occur when incoming events do not comply with your [Identity Resolution settings](/docs/unify/identity-resolution/identity-resolution-settings). For example, when Segment drops an anonymous ID (lower priority) to resolve an event based on a matching user ID (higher priority), it results in a violation. 

For any violations, Segment may drop lower priority identifiers or the identifiers that violate Identity Resolution Settings. From the grid, you can click a log name to view the violation details and next steps. 

Use the **Message Payload** tab to view the raw messages for Track events and see exactly where the violation occured.

Profile Insights flags the following violations:

| Violation     | Description                                   |
|---------------|-----------------------------------------------|
| `Identifier value limit exceeded`  |  A lower priority identifier wasn't added to the associated profile(s) because the maximum number of values for identifier type exceeds the limit.                           |
| `Identifier value time limit exceeded` | A lower priority identifier wasn't added to the associated profile(s) because there's a limit to how many identifier type values can be added in a period of time.                         |
| `ID value blocked`                     | The identifier wasn't added to a profile because it's a blocked value.                         |
| `Profile merge limit exceeded`         | The profile exceeds the system imposed merge limit. The default limit is 100.                       |
| `Identifier mapping limit exceeded`    |  The profile exceeds the system imposed mapping limit. The default limit is 1,000.                         |
| `Identifier value set to unique (legacy)` |  The profile exceeds the cardinality limit of an identifier type set to be unique. This violation only appears for existing spaces that have the `enforce_unique` field configured.                      |
| `Identifier value limit exceeded (legacy)` | The profile exceeds the cardinality limit of an identifier type. The cardinality limit used for this violation is the `limit` field in the identifier space.                     |

## Success logs

Success logs provide visibility into a profile's journey from creation to the point of merging into other profiles. Segment logs successful events, such as profile merges, or adding identifiers from incoming events to profiles. 

Use the success logs to view:
- Profiles that Segment has merged
- Identifiers that Segment has mapped to a profile 

You can filter results by ID type, time range, incoming event type, and more.

When you click a specific log, Segment displays merge or mapping details along with the message payload.


## Audit trail

The Audit trail displays all audit actions that occur in your Unify space. This can include, for example, a user creating an access token or modifying Unify settings.

Click an audit log link to view the user who initiated the action, timestamp, and log details.


