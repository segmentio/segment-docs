---
title: Hotjar
---

[Hotjar](https://help.hotjar.com/hc/en-us) enables you to understand how "vistors are really using your website" by offering a full set of user experience tools: heat maps, session recordings, and form analytics.

This document was last updated on April 28, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI’s Destinations page click on “Add Destination”.

2. Search for “Hotjar” within the Destinations Catalog and confirm the Javascript source you’d like to connect to.

3. Add your Hotjar Site ID - which you can find under Settings and Sites & Organizations in our Hotjar dashboard - to your Destination settings. It should be a whole number (e.g. 123456).

4. We’ll automatically load Hotjar's tracking snippet, along with your Site ID, onto the page once analytics.js loads. Please remove Hotjar's snippet from your code.

5. Once our CDN updates in 5-10 minutes, Hotjar will automatically start tracking visits and bound page events in accordance with how you've defined them in your Hotjar profile. Keep in mind that the Hotjar triggers that you've defined in your Hotjar profile and placed in your website **should stay where they are**; they will continue to function normally.
