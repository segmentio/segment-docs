---
title: Iterable Lists (Actions) Destination
strat: iterable
hide-boilerplate: true
id: 66a7c28810bbaf446695d27d
hide-dossier: true
engage: true
---

The Iterable Lists destination allows users to upload lists of users to Iterable, in the form of audiences. For more information on this destination's features, visit [Iterable's lists documentation](https://support.iterable.com/hc/en-us/articles/115000770906-Adding-Users-and-Creating-Lists){:target="_blank"}.

This is an [Engage Destination](/docs/engage/using-engage-data/#engage-destination-types-event-vs-list), which means it can be used to send data to Iterable Lists from Segment Engage Audiences.

## How it works

**Every time you create an audience in Engage and connect it to the Iterable Lists destination, Segment does the following:**

1. When the audience is created, Segment will create a new list in Iterable with the audience key as the list name;
2. When a user enters the audience, Segment will add the user to the list in Iterable;
3. When a user exits the audience, Segment will remove the user from the list in Iterable.

{% include content/sync-frequency-note.md %}

## Getting started

### Prerequisites

* An Iterable API Key: can be found in your Iterable account under `Settings > API Keys`;
* An [Engage Audience](/docs/engage/audiences/) configured which you can connect to this destination.

### Connect Iterable Lists to Segment

1. From the Segment web app, click on **Engage**, then click on **Engage Settings**;
2. Click on **Destinations**, then click on **Add Destination**;
3. Search for **Iterable Lists** and click on it;
4. Click on **Add destination**, then click on **Confirm Source**;
5. Under Basic Settings, enter a name for your destination (for instance "Iterable Lists Prod Space"), your Iterable API Key, enable the destination, and click on **Save**;
6. In your audience, on the Destinations panel, click on **Add Destination** and select the Iterable Lists destination you just created;
7. Additional configurations can be provided in the destination settings, such as the Campaign ID, whether the unsubscribe operation is global, and whether only existing users can be updated in the list;
8. This destination supports the `identify` and `track` methods, having "Audience Entered" and "Audience Exited" as the default events;
9. This destination also supports a default setup (where `email` is considered as the primary identifier) or a custom setup (where you can define the primary identifier and additional fields to be sent to Iterable);
10. Click on **Save** to apply the changes, then click on **Add 1 Destination** to save the destination configuration;
11. Iterable Lists will be listed under Destinations table with 0 mappings. Click on the **Add mapping** button, that will open a side modal. On the side modal, click on **Add mapping**;
12. Click on **Sync to Iterable Lists** (the only Action available);
13. Under "Define event trigger", make sure to select the event the the proper conditions defined in the Destination Settings in the Audience, that will trigger the audience upload to Iterable Lists. It's a good practice to define a test event for the next mapping steps and testing;
14. If needed, you can define Linked Events enrichments under step 2, "Linked Events: enrich event stream with entities";
15. Under step 3 ("Map Fields"), you can map the event fields to Iterable fields, like `email`, `userId`, and additional fields;
16. Optionally, you can test the mapping by clicking on **Test Mapping**;
17. Click on **Next**;
18. Under the last step ("Settings"), give this mapping a name, and click on **Save and enable**, if you want to enable the mapping right away, or **Save**, if you want to enable it later.
