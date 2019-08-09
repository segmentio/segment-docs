---
title: BugHerd
---
[BugHerd](http://bugherd.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a bug tracking software that lets users report bugs right in your interface. Once reported, you get a Trello-like management interface for taking care of the issues. The `analytics.js` BugHerd Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-bugherd).

This document was last updated on November 26, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. From your Segment UI’s Destinations page click on “Add Destination”.
  2. Search for “BugHerd” within the Destinations Catalog and confirm the Source you’d like to connect to.
  3. Drop in your `API Key` as retrieved from the Install BugHerd tab on your BugHerd Project page.
  4. Our CDN is updated within 5-10 minutes. Then our snippet will start asynchronously loading BugHerd onto your page. This means you should remove BugHerd's snippet from your page.
  5. The BugHerd Destination doesn’t utilize any Segment API calls (e.g. identify, track, etc) so, once it's loaded, it’s good to go! Your BugHerd sidebar will begin appearing for your team.
