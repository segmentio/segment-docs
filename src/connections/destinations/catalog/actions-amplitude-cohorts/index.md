---
title: Amplitude Cohorts Destination
slug: actions-amplitude-cohorts
id: 699d9cfc7ddca5bfc98344dc
---

The Amplitude Cohorts destination allows you to sync Segment Engage audiences to Amplitude Cohorts. For more information, visit [Amplitude's cohort
documentation](https://amplitude.com/docs/faq/behavioral-cohorts){:target="_blank"}.

## How it works

When you create an audience in Engage and connect it to the Amplitude Cohorts destination, Segment automatically:

1. Creates a new cohort in Amplitude using the audience name.
2. Adds users to the cohort in Amplitude when they enter the audience.
3. Removes users from the cohort in Amplitude when they exit the audience.

{% include content/sync-frequency-note.md %}

## Getting started

### Prerequisites

Before you begin, make sure you have:

* An Amplitude **API Key** and **Secret Key**, which you can find in the **General** tab of your Amplitude project settings.
* Your Amplitude **App ID**, also found in the **General** tab of your Amplitude project settings.
* A **Cohort Owner Email** address. This is the email of the user who will own the cohorts in Amplitude. 
* An [Engage Audience](/docs/engage/audiences/) that you want to connect to this destination.

### Connect Amplitude Cohorts to Segment Engage

1. In Segment, go to **Engage > Engage Settings**.
2. Click **Destinations**, then click **Add Destination**.
3. Search for **Amplitude Cohorts (Actions)** and click on it.
4. Click **Add destination**, then click **Confirm Source**.
5. Under **Basic Settings**, enter:
    - A name for your destination (for example, "Amplitude Cohorts Prod").
    - Your Amplitude **API Key** and **Secret Key**.
    - Your Amplitude **App ID**.
    - The **Cohort Owner Email** — the Amplitude user who will own all synced cohorts by default.
    - Your **Endpoint Region** (North America or Europe).
6. Enable the destination and click **Save**.

### Set up the Sync To Amplitude Cohort Action

7. Navigate to **Connections > Destinations**, search for the **Amplitude Cohorts (Actions)** destination you created, and click on it.
8. Navigate to **Mappings > New Mapping** and click the **Sync To Amplitude Cohort** tile.
9. Review the default field mappings. The **User ID** field maps to `$.userId` by default. If you plan to sync users by Amplitude ID instead, update the **Amplitude ID** field mapping accordingly.
10. Click **Save**.
11. On the Mappings tab, enable the **Sync To Amplitude Cohort** action.

### Connect Amplitude Cohorts to your Audience

12. Navigate to **Engage > Audiences** and select the Audience you want to sync to Amplitude.
13. Click **Add Destination** and select the **Amplitude Cohorts (Actions)** destination you created.
14. Configure the per-audience settings:
    - **ID Type**: Choose **User ID** to match users by their Segment `userId`, or **Amplitude ID** to match by Amplitude's internal identifier.
    - **Cohort Name** (optional): Override the default cohort name. By default, the Segment audience name is used.
    - **Cohort Owner Email** (optional): Override the default cohort owner set in destination settings.
15. Click **Save**, then click **Add 1 Destination**. Your audience will begin syncing to Amplitude.

## FAQs

### Which ID type should I use?

| ID Type | When to use |
| :--- | :--- |
| User ID | Use when Amplitude users are identified by the same ID as your Segment `userId`. This is the default. |
| Amplitude ID | Use when you want to match users by Amplitude's internal numeric identifier instead of your own user ID. |

### Can I override the cohort owner per audience?

Yes. The **Cohort Owner Email** set in destination settings applies to all synced cohorts by default. You can override it on a per-audience basis using the **Cohort Owner
Email** field in the audience destination settings.

### Which Segment event types does this destination support?

This destination processes `identify` and `track` calls emitted by Engage. Both are handled the same way — the payload is inspected to determine whether the user should be
added to or removed from the Amplitude Cohort. If using `track`, the event name is ignored.

### Which regions are supported?

North America (`amplitude.com`) and Europe (`analytics.eu.amplitude.com`) are both supported. Select the appropriate region in the destination settings to ensure data is
routed to the correct Amplitude data center.