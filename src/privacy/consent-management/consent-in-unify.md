---
title: Consent Stored on the Profile
plan: consent-management
redirect_from: "/privacy/consent-in-unify"
---

Segment uses Profiles in [Unify](/docs/unify/) as the source of truth of an end user's consent preference when enforcing consent in Twilio Engage or Linked Audiences. To get consent preference on the Profile, Segment requires the use of the [Segment Consent Preference Updated event](#segment-consent-preference-updated-event) and [Identify](/docs/connections/spec/Identify) events to route events to Unify. The Segment Consent Preference Updated and Identify events should include the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object).

> info "Consent in the Profile is in public beta"
> This means it is actively in development and some things may change before it becomes generally available.


## Segment Consent Preference Updated event

> success ""
> The Segment Consent Preference Updated event is generally available (GA). 

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

## Profile conflicts

### Profile-level conflict
A Profile-level conflict occurs when two distinct userIDs with different consent preferences are merged into one Unify Profile. A Profile-level conflict can also occur when a userID and an anonymousID (one without a linked userID) are linked to the same Profile by an external ID, like an email address or phone number, and the consent preferences of both profiles do not match. 

![A diagram showing different users linked to one Profile.](images/profile-level-consent-conflict.png)

To avoid Profile-level conflicts, Segment recommends that you take the following steps:
1. **Use `user_id` to identify a Profile or person.** Using other identifiers, like a phone number, email, or `anonymous_id`, can result in a Profile-level conflict. 
2. **Set `user_id` as the highest priority identifier in the [Identity Resolution](/docs/unify/identity-resolution/identity-resolution-settings/#priority) settings.**
3. **Maintain the default `reset()` behavior.** When a user explicitly logs out of your application, call `analytics.reset()` to prevent any further event activity from being associated with the logged out user and generate a new `anonymousId` for subsequent activity (until the user logs in again).

> success ""
> Profile conflicts only impact profiles used in Engage spaces.

### Device-level conflicts
A device-level conflict occurs when conflicting consent preferences linked to one user ID are collected from two distinct devices.

You can select from one of the following options to manage device-level conflicts:
- **Rely on a single source of truth for consent preferences**: Apply the consent preferences found in your single source of truth across all of a user's devices.
- **Use latest consent preferences**: Ask a user for consent preference information and apply their preferences across all of a user's devices. If this new request for consent preferences results in a [Profile conflict](#reconcile-profile-conflicts), your user will be prompted to resolve the conflict.

![A diagram showing different consent preferences being reconciled for a single Profile.](images/device-level-consent-conflcit.png)

## Sharing consent with Actions destinations

In addition to enforcing consent in Connections, you may want these preferences to flow to each destination so your destinations can be aware when an end-user revokes their consent. You can use the [Destination Actions framework](/docs/connections/destinations/destination-actions) to edit the destination's mapping and copy the consent preferences from the Segment Consent Preference Updated event to a destination-specified consent field. 

If you use Destination Actions to send consent information to your destinations, the Segment Consent Preference Updated event should **only** include information about a user's consent preferences because this event is sent regardless of an end-user's consent preferences. 

> info "Sharing consent with Classic Destinations is not available"
> Segment only supports sharing consent with Actions Destinations. 

## Sharing consent with Unify and Twilio Engage

Consent enforcement across Unify and Twilio Engage is currently unavailable during the public beta. However, Segment's OneTrust consent wrappers automatically generate the Segment Consent Preference Updated Track event, which will be required for future integrations with Unify and Twilio Engage.

During the public beta, Segment stores consent preferences as traits on the Profile. These traits may be used like any other when building Audiences/Journeys in Twilio Engage and Linked Audiences. 

> warning ""
> Consent stored on the Profile does not automatically enforce consent in Twilio Engage or Linked Audiences.

## Validating consent preferences stored on a Profile

You can validate consent is present on the Profile by looking for the consent trait provided for a Profile on the consent tab.

- **If the value is `true`**: Consent preferences are recorded for this Profile
- **If the value is `false`**: No consent preferences are recorded for this Profile
- **If the value is `conflict`**: At the time this Profile was merged, there was a conflict in the consent preferences recorded for a consent category. For more information about consent conflicts, see the [Profile conflicts](#profile-conflicts) documentation.


## Troubleshooting consent preferences stored on the Profile

### If I have 2 sources connected to a Unify space and only 1 is set up to collect consent, which consent preferences does Segment record?

Consent preferences collected in the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object) from the source are used to store consent on the Profile. Sources with no consent object do not impact what is stored on the Profile. If the source generates an empty consent object, Segment interprets this as an end-user failing to consent to any category. As a result, the consent preference will be updated to `false` for all consent categories.