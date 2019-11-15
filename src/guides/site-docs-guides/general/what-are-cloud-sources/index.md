---
title: "What are object cloud sources?"
---

To use object cloud sources (Salesforce, Zendesk, Stripe, etc.), you must also have a warehouse setup in your Segment account. In the app data from website, mobile, and server sources can go to a warehouse **or** to destinations. Object cloud source data can **only** go to Warehouses.

## What do you need to get started?

To make use of these of cloud sources, we suggest going through the following steps.

1.  Get cloud source credentials
    
2.  Get warehouse credentials
    
3.  Choose your preferred sync time
    

Before you connect a source, check out the [sources documentation](https://segment.com/docs/sources/). See what kind of credentials you will need to enable the source. Different sources require different levels of permissioning.

Next, you'll also need to get the credentials for your [warehouse](https://segment.com/docs/warehouses/).

Once you have the necessary credentials (or are logged in to OAuth for your cloud source), you should be ready to go! Go to the "sources catalog" in the app, choose your preferred source and you will be prompted to enter your credentials or OAuth. Then, go to the "warehouses" tab and enter the credentials for your warehouse if you don't already have one connected to Segment.

Based on your plan, you will be able to schedule a certain number of syncs per day. We suggest setting these up so your dashboards and reports are fresh for reporting, but not at the same time of day that a lot of people are querying your database.
