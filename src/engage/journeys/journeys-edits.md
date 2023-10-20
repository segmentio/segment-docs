---
title: Journeys Edits & Versioning
plan: engage-foundations
---

With Journeys edits and versioning, you can make changes to live journeys.

## Before you begin

Keep the following in mind when you edit a journey:

- To create a new journey version, you can edit the current, live version or restore a previous version. 
- You can only have one live journey version at any time. When you publish a draft journey version, Segment prompts you to pause or archive the previous version of the journey (if it isn’t archived already). If you pause the previous version, it begins to drain any users left in the version while you paused it.
- If the previous version is in a paused, draining state, users can continue flowing through it until you archive it, or if users successfully exit that version through its exit settings.
- If you enable version exclusion when you edit a live journey, users in previous versions of the journey won't enter the latest version.
- Segment preserves destination sync keys in Segment for destination steps that remain the same between versions. You don’t need to update these keys in your downstream destinations when creating a new journey version that has the same destination step as a previous version. 
- Segment displays a destination key on destination steps where a downstream destination is using a previous version key. Segment also preserves keys between versions even if you create a new draft version from a previously archived version.
- You can create up to 25 versions of a journey. Segment keeps previous journey versions in a journey container, which you can access from the Journeys list page.

## Edit a journey

Follow these steps to edit a journey:

1. From your Engage space, click the **Journeys** tab.
2. From the Journeys list page, select the journey version you want to edit.
3. On the Journey overview page, select **Edit**. Segment creates a new version in draft mode.
4. Edit your Journey, then select **Publish version**.
    - If the previous version is live, Segment asks whether you want to pause or archive the previous version.
    - If you pause the previous version, users can continue through the journey version, but no new users can enter. You will not be able to resume this journey version if it is paused this way.
    - If you archive the previous version, users **won't** continue through the journey version.
5. (Optional:) Enable version exclusion.
6. Click **Publish**.

After you’ve published, users who meet the entry criteria can enter the new journey version.

You can return to the Journeys list page to view the new live journey and its previous versions, which are nested under the journey container.

## Working with Journeys versioning

### Exit settings and user flow between journeys

Exit settings determine how users flow between journey versions.

Suppose you have a journey with exit settings enabled. The following table lists the actions you can take with the journey, as well as the results: 

| Action                                                                                        | Result                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pause Version 1 and publish Version 2                                                         | Users will flow through Version 1 until they meet its exit settings. <br><br>  Once users exit Version 1, they can enter Version 2 upon meeting its entry criteria.                                                                                                                                                                                                                                                                                 |
| Archive Version 1 and publish Version 2                                                       | Users can enter Version 2 when they meet its entry criteria.                                                                                                                                                                                                                                                                                                                                                                                     |
| Pause Version 1, publish Version 2, then archive Version 1 before users have exited Version 1 | Users won’t be able to enter Version 2. Users must successfully exit the paused Version 1 before entering Version 2.  <br><br> In this situation, Segment recommends that you wait until users have exited the journey through exit settings before archiving the version. <br><br> Alternatively, instead of pausing and archiving a version, Segment recommends that you archive the previous version when you publish the subsequent version. |

Suppose you have a journey **without** enabled exit settings. If you pause or archive Version 1 when publishing Version 2 of that journey, then users can immediately enter Version 2 when they meet its entry criteria, even if they’re still in Version 1.

> info "Version exclusion"
> To prevent users from a previous journey from ever entering a new journey version, enable version exclusion when you create the new journey version.


### List destinations

Adding a list destination to a journey version creates a new record in Segment’s systems. This process can take up to ten hours. During this time, you’ll be unable to publish new versions of a journey.

For example, if you add a list destination to Version 1 of a journey, and users begin flowing into the version, then Segment will begin creating the new record. If you create a Version 2 draft from Version 1 of the journey while Segment is still creating the new record, you won’t be able to publish Version 2 until this process is completed. 

If the version has a list destination but no users have flowed into the version, though, Segment won't create a new record for that list destination and you won't have to wait to publish a new journey version.