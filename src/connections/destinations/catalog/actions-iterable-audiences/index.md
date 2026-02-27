---
title: Iterable Lists (Actions) Destination
hide-boilerplate: true
id: 699d9d9b1cf82fb3d614db02
hide-dossier: true
engage: true
---

The Iterable Lists destination allows users to upload lists of users to Iterable, in the form of audiences. For more information on this destination's features, visit [Iterable's lists documentation](https://support.iterable.com/hc/en-us/articles/115000770906-Adding-Users-and-Creating-Lists){:target="_blank"}.

This is an [Engage Destination](/docs/engage/using-engage-data/#engage-destination-types-event-vs-list), which means it can be used to send data to Iterable Lists from Segment Engage Audiences.

## How it works

When you create an audience in Engage and connect it to the Iterable Lists destination, Segment automatically

1. Creates a new list in Iterable using the audience key as the list name.
2. Adds users to the list in Iterable when they enter the audience.
3. Removes users from the list in Iterable when they exit the audience.

{% include content/sync-frequency-note.md %}

## Getting started

### Prerequisites

Before you begin, make sure you have:

* An Iterable API Key, which you can find in your Iterable account under **Settings > API Keys**.
* Know which Iterable Project your Iterable Lists will belong to. See the [the Iterable Project Type Settings FAQ](#iterable-project-type-settings) below for further instructions. 
* A configured [Engage Audience](/docs/engage/audiences/) that you want to connect to this destination.

### Connect Iterable Lists to Segment Engage

1. In Segment, go to **Engage > Engage Settings**.
2. Click on **Destinations**, then click on **Add Destination**.
3. Search for **Iterable Lists (Actions)** and click on it.
4. Click on **Add destination**, then click on **Confirm Source**.
5. Under Basic Settings, enter a name for your destination (for instance, "Iterable Lists Prod Space"), your Iterable API Key, select your Iterable Project Type, then enable the destination and click on **Save**. 
6. Set the **Enable Destination** toggle to on. 

### Set up the Sync Action in your Iterable Lists (Actions) Destination
7. Navigate to **Connections > Destinations** then search for the **Iterable Lists (Actions)** destination you just created, and click on it. 
8. Navigate to **Mappings > New Mapping** and click on the **Sync To Iterable Lists** tile. 
9. Optional: if you plan to sync additional user traits or identifiers to Iterable you should configure mappings for these using the **Additional traits or identifiers** field. 
10. Click **Save**. 
11. Back on the Mappings tab, enable the **Sync to Iterable Lists** Action. 

### Connect Iterable Lists to your Audience
12. Navigate to the **Engage > Audiences**, then select the Audience you'd like to sync to Iterable.
13. Click **Add Destination** then select the **Iterable Lists (Actions)** destination you created in previous steps. 
14. Optional: configure the **Campaign ID**, **Channel Unsubscribe** and **Update existing users only** settings if needed. 
15. Optional: click to **Customised Setup** if you want to tell Engage to sync additional user traits or identifiers to the destination. Note this will require you to have also mapped these traits or identifiers in step 9 above.  
16. This destination supports the `identify` and `track` methods. Both work in the same way. If using `track`, there's no need to set an event name as it will be ignored by the destination. 
17. Click on **Save** to apply the changes, then click on **Add 1 Destination** to save the destination configuration. Your audience will soon start to sync to Iterable. 

## FAQs

### Iterable Project Type Settings 
Iterable projects can be configured to use either **userId**, **email**, or both **userId and email** as user identifiers. You can check which identifiers your Iterable project is configured to use by navigating to **Settings > Project Settings > Unique identifier** in your Iterable app. 

The table below outlines which Segment **Iterable Project Type** destination setting to use based on your Iterable Project Type. 

| Your Iterable Project Type | The correct Segment Settings to use |
| :--- | :--- |
| Email-based project (unique email) | Hybrid Project |
| Hybrid project (unique userId and unique email) | Hybrid Project |
| UserID-based project (unique userId) | User ID Based Project |