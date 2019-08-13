---
title: Extole
---

## Getting Started

When you enable Extole in Segment, this is what happens:

- Our CDN is updated within 5-10 minutes. Then our snippet will start asynchronously loading Extole's `core.js` onto your page. This means you should remove Extole's snippet from your page.
- Because Extole tracks custom user data, no data will appear in Extole until you [`identify`](#identify) the current user.


- - -


## Identify

When you call `identify`, we keep track of the current user and will include identifying information (`userId` and `email`) with all `track` calls sent to Extole.

## Track

Segment supports Extole events in our client-side library through the `track` method.

**Note:** Remember, because Extole tracks custom user data, be sure to call [`identify`](#identify) before attempting to call [`track`](#track).

{% include content/integration-foot.md %}
