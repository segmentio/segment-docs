---
title: Journeys Edits & Versioning
plan: engage-foundations
---

Journeys edits and versioning let you make live changes to journeys and preserve previous journey versions.

With Journeys edits, you can adjust journey steps, update campaigns and destinations, and then save your changes while preserving original user flow through the journey.

> info ""
> Journeys edits and versioning is in public beta.

## Before you begin

Keep the following in mind when you edit a journey:

- To edit a live journey, you'll create a new draft based on the current live version. The new draft becomes the latest version of the journey.
- You can only have one live version of a journey. When you edit a journey, Segment prompts you to pause or archive the previous version of the journey. 
- Users in a live journey that you edit can still flow through the original journey, but they cannot enter the latest journey version.
- If you enable version exclusion when you edit a live journey, users in previous versions of the journey won't enter the latest version.


## Edit a live journey

Follow these steps to edit a live journey:

1. From your Engage space, click the **Journeys** tab.
2. From the Journeys table, select the journey you want to edit.
3. On the Journey overview page, select **Edit**. The current version changes to draft mode.
4. Edit your Journey, then select **Publish version**.
    - Segment asks whether you want to pause or archive the Journey. If you choose to pause the journey, users in the original version will continue through the journey.
    - If you choose to archive the journey, users in the original version will **not** continue through the journey.
5.  **(Optional:)** Enable version exclusion.
5. Click **Publish**.

Once you've published your edited journey, users who meet the journey's entry criteria will enter the new journey version.

You can return to the Journeys table to view the new live journey and its previous versions, which are nested under the current version.

## Paused journeys and user flow

If you archive a paused journey after editing it, you could impact the flow of users to the new version of the journey. 

Users in paused journeys still flow through the journey until they meet its exit criteria. If you archive a paused journey that still has users flowing through it, however, those users won't enter the new version of the journey, even if they meet its entry criteria.  Instead, they'll remain in the archived journey indefinitely.

This flow doesn't impact users in archived journeys, however. As a result, when you edit a journey, Segment recommends that you archive the previous version without pausing it. Alternatively, if you choose to pause the journey, avoid archiving the journey until all users in the paused journey have exited.

As a best practice, always enforce exit settings on journeys.