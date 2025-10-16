---
title: Framed.io Destination
---

## Getting Started

Once your application is set up and instrumented with Segment, turn on Framed in your Segment destinations page. After that, log in to your Framed account and select Segment in the Integrations menu. You'll see an API key that you'll have to paste back into the Framed configuration page on Segment.

Framed supports the `identify` and `track` methods.


## Identify

When you `identify` a user, we'll pass that user's information to Framed with `userId` as Framed's External User ID. Segment's special traits recognized as Framed's standard user profile fields (in parentheses) are:

- `firstName` (`first_name`)
- `lastName` (`last_name`)
- `email` (`email`)
- `gender` (`gender`)
- `userID` (`userID`)

All other traits will be sent to Framed as custom attributes.

## Track

When you `track` an event, we will send that event to Framed as a user event. Events must have the following:

- `userID` (`userID`)
- `event_name` (`event_name`)
- Any properties of the event will be passed onto Framed as custom properties of the event itself.
