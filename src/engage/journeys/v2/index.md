---
title: Event-Triggered Journeys
plan: engage-foundations
redirect_from:
  - "/engage/journeys/event-triggered-journeys"
---

With Event-Triggered Journeys, you can build real-time, event-based marketing workflows to automate and personalize customer journeys. 

Unlike traditional audience-based journeys that rely on pre-defined user segments, event-triggered journeys start automatically when users perform specific actions on your website or app.

On this page, you'll learn how to create an event-triggered journey, configure entry conditions, and work with published event-triggered journeys.

## Overview

Event-triggered journeys help you create a responsive approach for time-sensitive use cases, like cart abandonment campaigns and transactional messages. 

Where [audience-based journeys](/docs/engage/journeys/build-journey/) activate based on aggregated conditions, event-triggered journeys respond instantly to individual events, delivering personalized experiences based on the full context of each event.

Opt for an event-triggered journey in situations like these:

- When campaigns require real-time action in response to user behavior.
- For transactional messages (like receipts and confirmations) that require specific event-based triggers.
- In abandonment campaigns where a follow-up is needed if a corresponding completion event doesn’t occur.

## Build an event-triggered journey

> info "Before you begin"
> Before you start building an event-triggered journey, make sure that you've enabled all [destinations](/docs/connections/destinations/) you plan to send data to and that the events you want to use as triggers are already available in your Segment workspace.

To set up an event-triggered journey:

1. In your Segment workspace, navigate to **Engage > Journeys**, then click **+ Create journey**.
2. On the **Create journey** page, select **User performs an event**, then click **Next**.
3. Give your new journey a name and, optionally, a description.
4. Select entry event:
   - Choose the event that will trigger user entry into the journey.
   - (*Optional*) Use an audience filter to restrict entry to users who are already part of a specific audience when they perform the triggering event.
   - (*Optional*) Apply filters based on event property values to refine entry conditions. For example, enter only if `{property} = value A, value B, or value C`.
5. Configure entry rules:
   - **Re-enter every time event occurs** (*default*): Users enter the journey each time they trigger the specified event.
   - **Enter one time**: Users enter the journey once only, regardless of repeated event triggers.
6. **If you chose Re-enter every time event occurs in Step 5**, select a [unique identifier](#unique-identifiers).
7. Build your journey using logical operators.
8. Configure event delivery to destinations by selecting a destination or setting up a custom destination function.
9. Preview the contextual payload that Segment will send to your destination(s).
10. After you've finished setting up your journey, click **Publish**, then click **Publish** again in the popup.

### Send data to downstream destinations

When a journey instance reaches a **Send to Destination** step, you can configure how data is sent to your desired destination. This step allows you to define where the data goes, what actions are performed, and how information is mapped, giving you control over the integration. Event-Triggered Journeys currently supports all [Actions Destinations](docs/connections/destinations/actions/).

For other destinations or more complex logic, you can use [Destination Functions](/docs/connections/functions/destination-functions/).

#### Configure the Destination Send Step

1. **Select a Destination**  
   Choose the destination where you want to send data. Currently, only [Actions Destinations](docs/connections/destinations/actions/) and [Destination Functions](/docs/connections/functions/destination-functions/) are supported.

2. **Choose an Action**  
   Specify the action to take within the selected destination. For example, you might update a user profile, trigger an email, or log an event.

3. **Define the Event Name**  
    Add a descriptive event name to send to your destination.
    
4. **Define the Payload Attributes**  
   - The **journey context** provides a set of attributes from the entry event or events used in the Hold Until operator that can be included in the payload.
   - You may also add a user's profile traits to the destination payload.
   - Review the available attributes and decide which ones to include in your data send.

5. **Map Attributes to Destination Keys**  
   - Use the mapping interface to link payload attributes to the appropriate keys required by the destination.  
   - For example, map `user_email` from the journey context to the `email` field expected by the destination.

6. **Test the Integration**  
   - Send a **test event** to validate the configuration.  
   - Ensure that the data is received correctly by the destination and mapped as expected.

When a journey reaches this step, the Segment prepares and sends the payload based on your configuration. The integration ensures compatibility with the selected destination’s API, allowing seamless data transfer and execution of the specified action.

### Journey setup configuration options

Event-Triggered Journeys includes advanced options to help you tailor journey behavior and customize data delivery to downstream destinations.

#### Unique identifiers

Unique identifiers in event-triggered journeys help you manage multiple journey instances when a user triggers the same event more than once. 

When you select **Re-enter every time event occurs** when you create an event-triggered journey, you can choose an event property as a unique identifier. Selecting this option does two things:

- It creates a separate journey instance for each unique identifier value, allowing multiple instances to run in parallel for the same user.
- It ensures that any follow-up events link back to the right journey instance, preserving context for tracking and personalization. 

For example, in an abandonment journey, suppose a user starts two applications (like `application_started`), each with a different `application_id`. By setting `application_id` as the unique identifier, Segment can match follow-up events (like `application_completed`) to the correct application journey. As a result, each journey instance only receives the completion event for its specific application.

### Notes and limitations

- **Supported destinations:** Only Actions Destinations in the Segment catalog are supported.  
- **Data mapping:** Ensure all required keys for the destination are properly mapped to avoid errors.

## Duplicate a journey

To save time and avoid recreating steps from scratch, you can duplicate any existing journey.

Duplicating a journey creates a copy of the configuration and opens it in **Draft** mode. You can duplicate both draft and published journeys, but journey names must be unique.

### What gets copied

When you duplicate a journey, Segment copies the following:

- Entry conditions and filters  
- All journey steps and structure  
- Destination actions, including:
  - Event names
  - Payload configuration
  - Trait and context enrichment
  - Attribute mappings

Segment **doesn't** copy the following:

- Journey name (you must enter a new, unique name)
- Activation destination keys (Segment will regenerate these)

> warning ""
> If a destination action was disabled in the original journey, it will be enabled by default in the duplicated version.

### How to duplicate a journey

1. Go to **Engage > Journeys** and find the journey you want to duplicate.
2. Click the **•••** (Options menu), either in the list view or from within the journey.
3. Select **Duplicate**.
4. Enter a new name when prompted.
5. Review the duplicated journey and make any needed changes.
6. If your journey includes destination sends, be sure to copy the new destination keys into your destination system.

> warning ""
> Currently, you can only duplicate journeys within the same Engage space. Duplicating across spaces or workspaces is not supported.

## Best practices

Follow the best practices in this table to optimize your event-triggered journeys:

| Recommendation                          | Details                                                                                                                                                                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use specific event filters              | When you configure entry events, apply precise filters based on event property values to refine which users enter the journey. This helps target specific user actions and improves the journey's relevance.                           |
| Use unique identifiers                  | If a journey allows users to enter multiple times, set a unique identifier to track each instance accurately. Using an identifier like `application_id` ensures that follow-up events stay associated with the right journey instance. |
| Preview payloads before publishing      | Review the journey payload to verify that it includes all necessary context from the triggering event. This helps confirm that the data reaching destinations matches your campaign needs.                                             |
| Test journey after publishing           | Consider setting up a live test right after publishing to confirm that the journey behaves as expected and that data flows correctly to destinations.                                                                                  |


## Working with Event-Triggered Journeys

Segment built Event-Triggered Journeys to respond instantly to events, offering real-time capabilities with a few considerations in mind.

- **Entry event requirements**: The entry event you use must already exist in your Segment workspace for it to appear as a selection in journey setup. Make sure that you've already created the event before setting up your journey.
- **Event property filters**: You can filter event properties using the `equals` or `equals any of` operators. When you apply multiple conditions, filters operate with `AND` logic, meaning all conditions must be true for the event to trigger entry into the journey.
- **Audience filtering**: You can only use active, pre-existing audience records as filters. For more complex filtering, like specific profile traits or multiple audiences, first [create the audience](/docs/engage/audiences/#building-an-audience) in **Engage > Audiences**, then apply it as a filter once it’s live.
- **Destination options**: Event-Triggered Journeys support all [actions-based destinations](/docs/connections/destinations/actions/) and Destination Functions.
- **Event payload structure**: Each payload sent to a destination includes a unique key to identify the specific send step within the journey, rather than the journey instance itself. You can also set a custom event name to make it easier to identify the specific event instance you want to track in your destination.
- **Real-time delivery**: Event-Triggered Journeys aim for an expected delivery time of under 5 minutes from the moment an event is performed to when the payload reaches the destination, assuming there is no delay step in the journey. However, external factors outside of Segment's control may occasionally introduce latency.

## Observability

Segment provides built-in tools to help you understand how users move through your journeys. These features let you debug issues, verify behavior, and review step-by-step activity for individual users.

### Profile explorer: Journeys tab

From Profile explorer, you can view the journeys a user entered. For Event-Triggered Journeys (V2), you’ll see the total number of times the user has entered each journey; V1 journeys display only the current step.

To access Profile explorer:

1. From your Segment workspace, go to **Unify > Profile explorer** and open a user profile.
2. Click the **Journeys** tab.

### Journey instance timeline

When you need to understand how a specific user moved through a journey, the Journey Instance Timeline shows a detailed, step-by-step view of the user’s path.

This view is useful for troubleshooting, testing, or verifying behavior after launch. You’ll see the exact sequence of events and timing for a single journey instance. Follow these steps to access the instance timeline:

- **Option 1**:
  1. Open a user profile from the Profile explorer.
  2. Click the **Journeys** tab, then click the name of the journey.
- **Option 2**:
  1. From your Segment workspace, go to **Engage > Journeys**, then open the **Overview** tab.
  2. Use the **Search for a profile** field to look up the user by email or ID.
  3. Select a journey instance to view its full timeline.

### Profile activity

Use the **Profile activity** tab on the journey overview page to see a high-level log of entries, exits, and transitions across all users. This is helpful for filtering activity by time, user, or step, especially when you want to confirm how different users have moved through a journey.

Follow these steps to access Profile activity:

1. Go to **Engage > Journeys**.
2. Select a journey and click the **Profile activity** tab.
3. Use the filters to narrow down the results by user, time range, event type, or step name.

## Use cases

Event-Triggered Journeys can power a variety of real-time, personalized experiences. This section details some common scenarios to help you see how they might work in practice.

### Real-time event forwarding

Suppose you want to instantly send a personalized message whenever a user completes a specific action on your site, like filling out a form or subscribing to a service. With Event-Triggered Journeys, you can configure the journey to trigger each time this entry event occurs. Segment will forward the event data, including all relevant details, to your connected destination in real-time.

### Real-time abandonment Campaigns

Imagine you’re running an e-commerce site and want to follow up with users who start the checkout process but don’t complete it within a certain timeframe. You can create an event-triggered Journey to watch for abandonment cases like these.

Start by setting the `checkout_started` event as the trigger and specify a unique identifier like `session_id` to track each user’s journey instance. Then, configure the journey to check for the `purchase_completed` event within a defined window (for example, 1 hour). If the user doesn’t complete the purchase, the journey can automatically send a nudge to encourage them to finish their order.

### Personalized follow-up Messages

Say you want to follow up with users after they engage with specific content, like downloading an e-book or watching a demo video. Event-Triggered Journeys can help you send timely, personalized messages based on these interactions.

To do this, set the entry event to `content_downloaded` or `video_watched` and configure the journey to send a follow-up email. You could even personalize the email with details from the triggering event, like the content title or timestamp, by configuring your destination payload to enrich the message with event-specific context.

For detailed instructions on setting up journeys for these use cases, see [Journeys (V2) Use Cases](/docs/engage/journeys/v2/use-cases)