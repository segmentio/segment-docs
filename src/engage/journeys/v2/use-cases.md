---
title: Journeys (V2) Use Cases
plan: engage-foundations
---

Event-Triggered Journeys give you the tools to create real-time, personalized flows that react to user behavior as it happens. This page explains sample use cases to help you get started with common patterns like confirmations, abandonment campaigns, and re-engagement flows.

Each example includes a short explanation, key steps to configure, and optional sample event payloads.

## Real-time event forwarding

Send a confirmation message immediately after a user takes a key action, like placing an order or submitting a form. This type of journey helps reinforce trust and provides instant feedback by delivering personalized messages based on event details.

This use case is ideal for transactional events that should trigger follow-up communication without delay.

### How to build this journey

1. Set the journey entry condition to `Users perform an event`.
2. Choose the event that represents the user action (for example, `Order_Confirmation`).
3. **(Optional)**: Add event property filters if you only want to trigger the journey under specific conditions.
4. Click **Build**, then add a **Send to Destination** step to forward the event.
5. Configure destination:
   - Select the destination you want to send the payload to.
   - Enrich the payload with profile traits or journey context as needed.
6. Click **Save** to publish the journey.

The following example shows a `Order_Confirmation` event payload that could trigger this journey. You can customize the event name and properties based on your use case.

```json
{
  "userId": "99",
  "context": {},
  "integrations": {},
  "event": "Order_Confirmation",
  "properties": {
    "productId": "001",
    "productName": "T-Shirt",
    "productColor": "green",
    "productSize": "Large",
    "productPrice": "$55.34",
    "event_location": "A",
    "cart_ID": "123456",
    "scenario": "01 Ordered Product"
  }
}
```

## Application abandonment campaign

Send a personalized nudge when a user starts an action (like filling out an application) but doesn’t complete it within a certain time window. This type of journey helps recover drop-offs by checking for a completion event and following up only if it's missing.

This use case is ideal for flows like job applications, signups, demo requests, or onboarding forms.

### How to build this journey

1. Set the journey entry condition to `Users perform an event`.
2. Choose the event that indicates the user started the flow (for example, `Application_Started`).
3. (Optional): Add event property filters if you only want to trigger the journey under specific conditions.
4. Click **Build**, then add a **Hold Until** step.
5. In the Hold Until step:
   - Specify the completion event (for example, `Application_Completed`) as the condition.
   - Set a maximum hold duration.
6. Add a **Send to Destination** step on the "timeout" branch to send a follow-up message.
7. Configure the destination:
   - Select the destination you want to send the payload to.
   - Enrich the payload with profile traits or journey context as needed.
8. Preview the payload that Segment will send to your destination.
9. Publish the journey.

![Screenshot of the journey setup screen showing the Application_Started entry event selected, with re-entry enabled and Application_id set as the unique identifier.](../images/application_started.png)


### Sample entry and evaluation events

The following example shows both the entry event that starts the journey and the evaluation event that cancels the nudge if the user completes the application.

{% codeexample %}
{% codeexampletab Entry event %}
```json
{
  "userId": "88",
  "context": {},
  "integrations": {},
  "event": "Application_Started",
  "properties": {
    "Category": "A",
    "Tier": "Premium",
    "VIP": true,
    "Application_id": "1234",
    "scenario": "Trigger campaign with Application Started"
  }
}
```
{% endcodeexampletab %}

{% codeexampletab Evaluation event %}
```json
{
  "userId": "88",
  "context": {},
  "integrations": {},
  "event": "Application_Completed",
  "properties": {
    "Category": "A",
    "Tier": "Premium",
    "VIP": true,
    "Application_id": "1234",
    "scenario": "Complete campaign without a nudge b/c Application was Completed"
  }
}
```
{% endcodeexampletab %}
{% endcodeexample %}

