---
title: BugHerd Destination
rewrite: true
---
[BugHerd](http://bugherd.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a bug tracking software that lets users report bugs right in your interface. Once reported, you get a Trello-like management interface for taking care of the issues. The `analytics.js` BugHerd Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-bugherd).

This document was last updated on November 26, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. From the Segment web app, click **Catalog**.
  2. Search for "BugHerd" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. In the destination settings, enter your `API Key` as retrieved from the Install BugHerd tab on your BugHerd Project page.
  4. Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading BugHerd onto your page. This means you should remove BugHerd's snippet from your page.
  5. The BugHerd Destination doesn't use any Segment API calls (e.g. identify, track, etc) so, once it's loaded, it's good to go! Your BugHerd sidebar will begin appearing for your team.
