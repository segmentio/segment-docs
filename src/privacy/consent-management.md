---
title: Consent Management Overview
related:
  - "/privacy/account-deletion/"
  - "/privacy/complying-with-the-gdpr/"
---
> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

Segment works with your third party consent management platform to capture the categories consented to by an end user, map each of your Segment destinations to a consent category, and route events only to the appropriate categories.

![Diagram outlining information flowing from an end user to Segment destinations](/docs/privacy/images/consent-overview.png)

When an end user visits your site, they set **consent preferences**, or make decisions about the types of data they want you to collect, use, and share. These consent preferences are typically presented as a set list of categories that describe how your company intends to use that data. Common categories include personalization, advertising, and site performance.

After a user sets their consent preferences, Segment updates the [consent object](#consent-object) with a user's preferences. The events are then sent downstream to any destinations in categories that a user consented to share data with.

> success ""
> Segment collects consent for both registered users and anonymous users.

If a user changes the categories they consent to or if they consent using a different device or identifier, Segment sends the information about their consent, using a [Track call](/docs/connections/spec/track), to your downstream destinations and storage destinations.

For example: 

``` json
{
  "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
  "type": "track",
  "event": "Consent Change",
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

If a **consent conflict** exists (for example, one user on two different devices consented to two different categories), Segment resolves the conflict according to the [Reconcile Consent](/docs/privacy/reconcile-consent) documentation.

Consent information and a consent conflict flag are visible as traits on a user's profile in Unify.

## Consent object

Segment requires every event from all of your sources to include the end-user consent preferences, captured by your consent management tools or your application logic, in the form of the **consent object**. The consent object is a JSON object with the following format:

```json
context {
		consentCategories {
			"functional": true,
			“advertising”: true,
      "personalization": false
		}
	}
```

<!-- settings are here: https://github.com/segmentio/analytics-schemas/commit/3497903b49664c82d1e6749fbb1d794f2f197f6d--->

Once you've added the consent object to your web libraries and started collecting user data, you can use the Consent Management tab in the Segment app to [map your destinations to the consent categories](/docs/src/privacy/configure-consent-management) you set up in your third-party consent management platform.