---
title: "Event Tester"
---


Segment's Event Tester enables you to test your connections between Segment and your destination. You can inspect both the request sent from Segment and the response you receive back from the destination. You can use the Event Tester to: 

*   An event successfully arrives to a specific destination
*   Your new destination is configured correctly

The Event Tester sends a real event that appears in your end tool alongside your existing data. 


> info ""
> This feature is only available for server-side, [cloud-mode](/docs/connections/destinations/#connection-modes) integrations. It doesn't work for client-side, [device-mode](/docs/connections/destinations/#connection-modes) integrations. 

## How it works

> info ""
> You must have write access in your Segment workspace to use the Event Tester. 

> warning ""
> Make sure you have mappings enabled for your destination. The event tester only tests the enabled mappings for the destination. 

To use the Event Tester: 
1. Navigate to **Connections > Destinations** and select your destination.
2. Click the **Event Tester** tab. 
3. Select the type of test event. You can choose from: Track, Identify, Page, Screen, Group. 
4. Enter your test event payload. You can type in your own event or choose from **Load event from source** or **Generate sample event**.
   * **Load event from source**: Segment loads an event based on your source. 
   * **Generate sample event**: Segment generates a sample event for you. 
5. Click **Send test event to destination**. 
  
If your test event successfully sends to the destination, you can see in the **View test outcome** section:
* The request and the response
* How many of your mappings matched
* The total number of API calls that were made as one test event can result in multiple API calls. 
* Which mappings were successful and which ones failed

![Screenshot of the Event Tester with a Track test event that resulted in 4 API calls](images/event-tester2025.png)

## FAQs

#### Why can't I see the Event Tester when I log into my workspace?

The Event Tester is only accessible to users with write access in their Segment workspace (read-only users will not see the Event Tester in their workspace). 

#### The Event Tester experienced an error when sending my event. Why did this happen?

If you experience an error, [let Segment know](mailto:friends@segment.com) and the Segment team will help you troubleshoot the issue.

#### Is this feature available for Data Lakes?

The Event Tester is not available for Data Lakes.

#### Why are my destination filters being ignored?

Events passed into the Event Tester bypass destination filters. Destination filters are applied to events as they are sent to specific destinations. However, the Event Tester is designed to help you troubleshoot your Sources, their configuration, and their downstream destinations by showing a sample of the data available. It allows you to check that data is being sent, and that it's in the correct format without the filters being applied. This means that when you use the Event Tester, you're seeing the data before any destination filters or other processing rules are applied, providing a clear view of the raw event data as it comes from the source.
