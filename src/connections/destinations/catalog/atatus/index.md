---
title: 'Atatus Destination'
hidden: true
id: 54c02204db31d978f14a7f6d
---

[Atatus](https://www.atatus.com/) provides visibility into the performance of an application and its underlying infrastructure under a single dashboard. This visibility can help businesses identify and diagnose issues, and take corrective action to prevent or resolve application issues.

## Getting Started
Before you start, make sure Atatus supports the source type and connection mode you’ve chosen to implement. You can learn more about [connection modes here](/docs/connections/destinations/#connection-modes).

1. From the destinations catalog page in the segment web app, click on **Destinations -> Add Destination**.
2. Search for "Atatus" in the destination catalog and select Atatus as the destination.
3. Click on **Configure Atatus**.
4. Choose which **Data Source** should send data to the Atatus destination and click Next.

5. Enter the desired destination and click Save. You will be navigated to the settings page where you will have to add the API key to start receiving insights.
6. You can find the API key in your browser project settings.
7. Enter the **API Key** in the Atatus destination settings in Segment.

## Supported Methods

### Identify

If you’re not familiar with the Segment Specs, take a look to understand what the [Identify](/docs/connections/spec/identify/) method does. An example call would look like this:

```javascript
analytics.identify('userid_123', {
name: "John Doe",
email: "johndoe@example.com"
});
```

When you call Identify, the Atatus SDK calls `atatus.setUser` by passing in the traits you provided. Atatus maps the userId you provide as `traits.id`, which you can use to track user activity and gain a specific user's performance insights.

