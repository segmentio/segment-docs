---
title: Consent Management Overview
related:
  - "/privacy/account-deletion/"
  - "/privacy/complying-with-the-gdpr/"
---
> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

Consent management is a [description]

> warning "Website sources and event streaming destinations are available to map to consent categories"
> During the private beta, you can map website sources and event streaming destinations to a consent category. All other sources and destinations will not be affected by consent mappings.

When an end-user visits your site, they set consent preferences, or make decisions about the types of data they want you to collect, use, and share. These consent preferences are typically presented as a set list of categories (for example, personalization, advertising, and site performance) that describe how your company intends to use that data.

After a user sets their consent preferences, Segment updates the [consent object](#consent-object) with a user's preferences. The events are then sent downstream to any destinations in categories consented to by the user.

> success ""
> Segment collects consent for both registered users and anonymous users.

If a **consent conflict** exists <!-- expand on this better lmao---> Segment resolves them according to the [Enforce Consent](/docs/privacy/enforce-consent) documentation.

## Consent object

Segment requires every event from all of your sources to include the end-user consent preferences, captured by your consent management tool, in the form of the **consent object**. The consent object is a JSON object with the following format:

```json
context {
		consentCategories {
			"functional" : true,
			“advertising” : true,
      "personalization" : false
		}
	}
```

The Segment consent object is 