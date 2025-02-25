---
title: Consent in Unify
plan: consent-management
redirect_from: "/privacy/consent-in-unify"
---

> info "Consent in Unify and Twilio Engage is currently unavailable."
> However, Segment's OneTrust consent wrappers automatically generate the Segment Consent Preference Updated Track event, which will be required for future integrations with Unify and Twilio Engage.

Segment uses Profiles in [Unify](/docs/unify/) as the source of truth of an end user's consent preference when enforcing consent in Twilio Engage. To get consent preference on the Profile, Segment requires the use of the [Segment Consent Preference Updated event](#segment-consent-preference-updated-event) and [Identify](/docs/connections/spec/Identify) events to route events to Unify. The Segment Consent Preference Updated and Identify events should include the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object).

## Segment Consent Preference Updated event
Every time an end user provides or updates their consent preferences, Segment requires you to generate a **Segment Consent Preference Updated** event. If you are using [Segment's OneTrust consent wrappers](/docs/privacy/consent-management/configure-consent-management/#step-2-integrating-your-cmp-with-segment), Segment automatically generates a Segment Consent Preference Updated event. This event is required to add the end user’s consent preference on their Profile in Unify.

For example, if an end user agreed to share their information for functional and advertising purposes but not for analytics or data sharing, the Segment Consent Preference Updated [Track call](/docs/connections/spec/track/) demonstrating their new consent preferences would have the following format:

``` json
{
  "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
  "type": "track",
  "event": "Segment Consent Preference Updated",
  "userId": "u123",
  "traits": {
     "email": "peter@example.com",
     "phone": "555-555-5555",
  }
  "timestamp": "2023-01-01T00:00:00.000Z",
  "context": {
    "consent": {
      "categoryPreferences" : {
        "Advertising": true,
        "Analytics": false,
        "Functional": true,
        "DataSharing": false
      }
    }
  }
}
```

If you use Protocols, the Segment app automatically adds the Segment Consent Preference Updated event to all your existing Tracking Plans and for every new Tracking Plan. Segment recommends you don’t edit or delete the default fields in the Segment Consent Preference Updated events, but you can add new fields as needed.

> info "Segment Consent Preference Updated is a reserved event name"
> Segment has standardized a series of reserved event names that have special semantic meaning and maps these events to tools that support them.
>
> See the [Semantic Events](/docs/connections/spec/semantic/) docs for more details.

### Sharing consent with Actions destinations

In addition to enforcing consent in Connections, you may want these preferences to flow to each destination so your destinations can be aware when an end-user revokes their consent. You can use the [Destination Actions framework](/docs/connections/destinations/actions) to edit the destination's mapping and copy the consent preferences from the Segment Consent Preference Updated event to a destination-specified consent field. 

If you use Destination Actions to send consent information to your destinations, the Segment Consent Preference Updated event should **only** include information about a user's consent preferences because this event is sent regardless of an end-user's consent preferences. 

> info "Sharing consent with Classic Destinations is not available"
> Segment only supports sharing consent with Actions Destinations. 