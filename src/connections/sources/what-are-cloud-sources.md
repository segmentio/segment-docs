---
title: "How do cloud sources work?"
---

Sources are functionally comprised of either one or both of the following components: a "sync" component and a "streaming" component. They work together to populate logical collections of data based on upstream resource availability and following data normalization best practices. These collections may be either events (append only data streams, akin to "facts" in data warehousing parlance) or objects (dimensional values that may be updated based on changes in state upstream).

**Sync**

When you enable a source and grant us access by pasting an API key or authenticating with OAuth, we begin running a scheduled job on your behalf which makes requests to the downstream tool, normalizes and transforms the data, and forwards the data to our API. We make an effort to use as few API calls as possible, opting to fetch only data that has changed since the previous sync where possible. This can be an intensive process, especially on first sync, so we have lots of affordances in place for retries and to respect rate limits imposed by the partner.

**API Call Usage and Collection Selection**

We make an effort to be respectful of your API call allotments and limits. For example, in the case of Salesforce, we issue only one query per collection per run, using the absolute minimum number of API calls possible (typically about 350/day).

Moreover, we're deliberate about which collections we pull, striking a balance between allowing you to get a full picture of your users and reducing extraneous data (like administrative and metadata tables).

Soon, we'll allow you to specify which collections you care about during the source setup phase, so if you need to cut down on calls, you'll be able to just deselect collections.

**Streaming**

Streaming components are used to listen in real time to webhooks from downstream cloud sources, normalize and transform the data, and forward it to our APIs.

Both sync and streaming components can forward data to our event tracking and objects upsertion API processing layers, but generally sync components are used to fetch objects and streaming components listen for events.


## What are object cloud sources?

To use object cloud sources (Salesforce, Zendesk, Stripe, etc.), you must also have a warehouse setup in your Segment account. In the app data from website, mobile, and server sources can go to a warehouse **or** to destinations. Object cloud source data can **only** go to Warehouses.

### What do you need to get started?

To make use of these of cloud sources, we suggest going through the following steps.

1.  Get cloud source credentials
2.  Get warehouse credentials
3.  Choose your preferred sync time


Before you connect a source, check out the [sources documentation](https://segment.com/docs/sources/). See what kind of credentials you will need to enable the source. Different sources require different levels of permissioning.

Next, you'll also need to get the credentials for your [warehouse](https://segment.com/docs/warehouses/).

Once you have the necessary credentials (or are logged in to OAuth for your cloud source), you should be ready to go! Go to the "sources catalog" in the app, choose your preferred source and you will be prompted to enter your credentials or OAuth. Then, go to the "warehouses" tab and enter the credentials for your warehouse if you don't already have one connected to Segment.

Based on your plan, you will be able to schedule a certain number of syncs per day. We suggest setting these up so your dashboards and reports are fresh for reporting, but not at the same time of day that a lot of people are querying your database.


## How do I handle common cloud source errors?

The most common reasons why sources will have trouble is due to authentication or permission issues. When the issue is authentication-related, you'll see a connection error in your source run pane that tells you that access was denied. In these cases, we'll quit the process early and not make any further attempts on any collections.

When you successfully authenticate but your user lacks requisite permissions (for example, if you use an agent login instead of an administrator for Zendesk), we will make an effort to pull each collection and report errors on a per-collection basis that let you know why your source runs are failing. This is because sometimes permission based denials are scoped to specific resources from the upstream tool.

We try to make the errors that are surfaced directly in the UI clear enough to negate the need for a document like this, so if it's not clear what to do to remediate the errors from the UI, please [contact support](https://segment.com/help/contact/) and let them know.

Sometimes, when the sync job fails due to an unhandled error or is mysteriously hanging for too long, we'll kill the job and report a failure with instructions to contact support. When this happens, our support and engineering teams have already been notified of the failure and have the complete set of logs to set about debugging and remediating the issue, but please don't hesitate to get in touch so they can keep you in the loop!
