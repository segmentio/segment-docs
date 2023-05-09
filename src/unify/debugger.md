---
title: Using the Profile Source Debugger
plan: unify
redirect_from:
  - "/personas/debugger"
---

The Profile Source Debugger enables you to inspect and monitor events that Segment sends downstream

Because Segment generates a unique source for every destination connected to a Space, the Debugger gives you insight into how Segment sends events before they reach their destination. Even when a destination is removed, you can't delete and shouldn't disable this source for Segment to function as designed. The source will be reused by Segment as needed.

The Debugger provides you with the payload information you need to troubleshoot potential formatting issues and ensure Segment sends events as your destinations expect.

## Working with the Debugger

Navigate to the Debugger tab on the Unify settings page of the space you want to debug. Select the source you want to inspect in the Debugger.

The Debugger presents a stream of incoming events. The event inspector displays three tabs for each event:

* **Pretty view** shows the actual API call Segment sends to your destination.
* **Raw view** shows the full JSON object Segment sends to your destination from the calls you sent, including timestamps, properties, traits, and ids.
* **Violations** displays any violations triggered by the event.

Similar to the Connections Debugger, you can search through events using information contained within the event's payload.
