---
title: How does Segment work?
---

Segment is a single platform that collects, stores, and routes your user data to hundreds of tools with the flick of a switch.

We take care of the messy analytics installation process for you, so you can spend more time using your data and less time tracking it down.

## Start a workspace

Segment has [Sources](docs/connections/sources/) and [Destinations](docs/connections/destinations/). Sources send data _into_ Segment, while Destinations receive data _from_ Segment.

## Collect data with Sources

Segment has four types of sources: Web (Analytics.js), Mobile, Server, and Cloud App. Web, Mobile, and Server sources send first-party data from your digital properties. Cloud-app sources send data about your users from your connected web apps, for example a ticketing system such as [Zendesk](/docs/connections/sources/catalog/cloud-apps/zendesk/), a payments system such as [Stripe](/docs/connections/sources/catalog/cloud-apps/stripe/), or a marketing tool like [Braze](/docs/connections/sources/catalog/cloud-apps/braze/).

## Let Segment translate the data in the cloud or on your devices

Our Web source (Analytics.js), and our native client-side libraries (iOs, Android, react-native) allow you to choose how you send data to Segment from your website or app. Two ways are available:

- **Cloud-mode**: in this mode, the sources send data directly to the Segment servers, which then translate it for each connected downstream destination, and send it on. Translation is done on the Segment servers, keeping your page size, method count, and load time small.

- **Device-mode**: in this mode, you include additional code on your website or mobile app, which allows Segment to translate the data you collected on the device, and then send it directly to your destinations without sending it to the Segment servers first. (You still send your data to the Segment servers, but this occurs asynchronously.) This is also called "wrapping" or "bundling", and it might be required when the source has to be loaded on the page to work, or loaded directly on the device to function correctly.

> note "Note:"
> If you use Server source libraries, they only send data directly to Segment in Cloud-mode. (Server libraries don't as a rule have an additional device to push translation to.)
