---
title: "Event Tester"
---


Segment has an Event Tester that enables you to test your connections between Segment and your destination. You can access the Event Tester from your Source Debugger, or from your destination settings.   

> info "Available for server-side event streaming destinations only"
> This feature is only available for server-side integrations (also known as cloud-mode destinations). You can't use this for client-side integrations (also known as device-mode destinations). 

## Use Cases

There are two scenarios where you might want to use the Event Tester:

*   ensuring an event is successfully making it to a specific destination
*   ensuring your new destination is configured correctly


## Ensuring an event is successfully making it to a specific destination

**1. Choose an event from the Source Debugger that you want to debug and select "Validate"**

Go to your Source Debugger, select an event and in the top right hand side of the debugger view, select "Validate".

![Screenshot of the Debugger tab, with a Checkout Started event selected and an error pointing to the Validate button.](images/event-tester_GgyOswJA.png)

**2. Choose the destination you want to test with**

Select the destination that you want to test this event with. At this time, you can only use the Event Tester for cloud-mode (server side) destinations.

![A screenshot of the destination selection pop up modal](images/event-tester_2JfoKddf.png)

**3. Send event to destination**

The event payload from your debugger that you just selected will automatically load in the JSON view. You have the option to edit the payload if you want. Assuming it looks good, select "Send Event" at the bottom right of the screen. 

![A screenshot of the Event Tester, with a track event selected](images/event-tester_J7TEDYvY.png)

**4. Ensure you're happy to send the test event to the destination**

This is a real event that will appear in your end tool alongside your existing data. If you're not comfortable with this, then select "Cancel" and do not send the event. 

![Screenshot of the popup that appears when you click the Send test event button.](/docs/guides/images/asset_Yxw1DJqb.png)

**5. View the Partner API response**

On the right hand side of the Event Tester you will see the response from the partner API. At the top, Segment provide of summary of the response. Below is the raw response payload Segment received that you can use for further debugging if necessary. 

![A screenshot of the Event Tester with a successful response from the destination](images/event-tester_il6mvexS.png)

If you are receiving an error and are unsure how to fix the issue, visit the partner docs (for example [https://developers.google.com/analytics/devguides/reporting/core/v3/errors](https://developers.google.com/analytics/devguides/reporting/core/v3/errors){:target="_blank”}) or contact the partner support team. 

## FAQ

#### Why can't I see the Event Tester when I log into my workspace?

The Event Tester is only accessible to users with write access in their Segment workspace (read-only users will not see the Event Tester in their workspace). 

#### The Event Tester experienced an error when sending my event. Why did this happen?

If you experience an error, [let Segment know](mailto:friends@segment.com) and the Segment team will help you troubleshoot the issue.

#### Is this feature available for Data Lakes?

The Event Tester is not available for Data Lakes.

#### Do Destination Filters or Destination Insert Functions affect events sent from the Event Tester?

No——events sent from the Event Tester will bypass all Destinations Filters and Destination Insert Functions.
