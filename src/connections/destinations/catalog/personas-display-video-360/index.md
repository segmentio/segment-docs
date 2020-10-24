---
title: Personas Google Display & Video 360 Destination
strat: google
hide-settings: true
---

Google's [Display & Video (DV360)](https://marketingplatform.google.com/about/display-video-360/) service is an end-to-end campaign management tool that enables enterprise customers to plan, measure, and run display and video advertisements. 

> info ""
> **Note**: You can connect to a Google Ad Manager account. For more information, see [4. Create an audience and finish DV360 configuration](#) below.

Segment's integration with DV360 enables Segment customers to sync audiences created in Personas with DV360 to enable centralized audience management and improved retargeting.

> warning ""
> **Important**: You must meet certain implementation criteria to use the DV360 integration:
> - For web traffic, you must have a client-side `analytics.js` source.
> - For mobile app traffic, you must have a mobile source.

> info ""
> **Note**: Since the release of `analytics-ios` version 4, Segment no longer collects IDFA automatically. To collect and pass IDFA to your DV360 integration, follow the steps for Ad Tracking and IDFA in the [Analytics-iOS mobile source](/docs/connections/sources/catalog/libraries/mobile/ios#ad-tracking-and-idfa) documentation.

## Quick info

<table>
<tr>
<td>
**Requirements**
</td>
<td>

   - Business tier Segment customers with Personas
   - One of the following sources, depending on type:
   - For web: analytics.js
   - For mobile app: a mobile source that passes an advertising identifier
   - A personas space. Non-Personas spaces are not compatible with DV360.
   - A Google Marketing Platform account


</td>
</tr>
<tr>
<td>
**Audience appears as**
</td>
<td>
An audience list with the name of your Personas Audience on the DV360 **All Audiences** screen
</td>
</tr>
</table>