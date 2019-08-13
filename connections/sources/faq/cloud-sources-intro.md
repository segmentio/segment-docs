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
