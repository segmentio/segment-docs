---
title: Delivery Overview for Audiences
---

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues for any event-streaming destination receiving events from Engage Audiences.

Delivery Overview has three core features:

- [Pipeline view](#pipeline-view): A visual overview of each step your data takes during the delivery process \- from when your source receives audience events to when events are successfully delivered to your connected destination.  
- [Breakdown table](/docs/monitoring/delivery-overview#breakdown-table): If you select a step in the pipeline view, you can see more detail about the events that were processed at each pipeline step.  
- [Discard table](/docs/monitoring/delivery-overview#breakdown-table): If you select an event in a breakdown table, you can see more details about the events that failed or were filtered out of your process and allows you to inspect samples of them.

For more information about the breakdown and discard tables, see the [Delivery Overview](/docs/monitoring/delivery-overview) documentation.

To view Delivery Overview for an Audience:
1. From your Segment workspace's home page, navigate to **Engage > Audiences**.  
2. Find an Audience, click the **(...)** menu, and select Delivery Overview.  
3. On the Delivery Overview page, select the Audience dropdown to filter by a specific Audience, select the Date range dropdown to filter by a specific time period, or toggle the Show metrics as percentages toggle on to view your metrics as percentages.

By default, Segment displays Delivery Overview information for all Audiences connected to your destination. You can filter your Delivery Overview pipeline view by an individual Audience for more granular data.

You can also further refine the data displayed on the pipeline view using the time picker and the metric toggle, located under the destination header. With the time picker, you can specify a time period (last 10 minutes, 1 hour, 24 hours, 7 days, 2 weeks, or a custom date range over the last two weeks) for which you’d like to see data. With the metric toggle, you can switch between seeing metrics represented as percentages (for example, *85% of events* or *an 133% increase in events*) or as counts (*13 events* or *an increase of 145 events*.) Delivery Overview shows percentages by default.

> info "Linked Audiences have additional filtering functionality" 
> Linked Audiences users can filter the Delivery Overview event pipeline by [Linked Audience events](/docs/engage/audiences/linked-audiences/#step-2c-define-how-and-when-to-trigger-an-event-to-your-destination). For more information, see the [Linked Audiences](/docs/engage/audiences/linked-audiences/#delivery-overview-for-linked-audiences) documentation.

Audiences have the following steps in the pipeline view:

- **Events from audience**<sup>*</sup>: Events that Segment created for your activation. The number of events for each compute depends on the changes detected in your audience membership.  
- **Filtered at source**: Events discarded by Protocols: either by the [schema settings](/docs/protocols/enforce/schema-configuration/) or [Tracking Plans](/docs/protocols/tracking-plan/create/).  
- **Filtered at destination**: If any events aren’t eligible to be sent (for example, due to destination filters, insert function logic, and so on), Segment displays them at this step.  
- **Events pending retry**: A step that reveals the number of events that are awaiting retry. Unlike the other steps, you cannot click into this step to view the breakdown table.  
- **Failed delivery**: Events that Segment *attempted* to deliver to your destination, but that ultimately *failed* to be delivered. Failed delivery might indicate an issue with the destination, like invalid credentials, rate limits, or other error statuses received during delivery.  
- **Successful delivery**: Events that Segment successfully delivered to your destination. You’ll see these events in your downstream integrations.

<sup>*</sup>_The "Events from audience" step is currently only available for Linked Audiences._