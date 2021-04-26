---
title: Forward blocked events
---
{% include content/plan-grid.md name="protocols" %}


If you're concerned about permanently discarding blocked events, you can enable blocked event forwarding on a Segment Source. To set up forwarding, navigate to the settings tab of the Source, then Schema Configuration. 

Select the source you'll forward events to from the Blocked Events and Traits dropdown. Segment recommends that you create a new Source for forwarded events to avoid contaminating production data and enable blocking only when you are confident about the quality of your data.

![](../images/blocked_event_forwarding.png)

> note "" 
> Only blocked events are forwarded to the source. Events with omitted traits are not forwarded. Instead, Segment inserts a `context.protocols` object into the event payload which contains the omitted properties or traits.**

> note ""
> Billing Note: Events forwarded to another Source count towards to your MTU counts. Blocking and discarding events does not contribute to your MTU counts.**
