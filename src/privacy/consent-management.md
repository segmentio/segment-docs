---
title: Consent Management Overview
related:
  - "/privacy/account-deletion/"
  - "/privacy/complying-with-the-gdpr/"
---
> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

Segment works with your third party consent management platform to collect the categories an end user consents to, map each of your Segment destinations to a consent category, and route events only to the categories consented to by a user.

![Diagram outlining information flowing from an end user to Segment destinations](/images/consent-overview.png)

When an end user visits your site, they set **consent preferences**, or make decisions about the types of data they want you to collect, use, and share. These consent preferences are typically presented as a set list of categories that describe how your company intends to use that data. Common categories include personalization, advertising, and site performance.

After a user sets their consent preferences, Segment updates the [consent object](#consent-object) with a user's preferences. The events are then sent downstream to any destinations in categories that a user consents to sharing data with.

> success ""
> Segment collects consent for both registered users and anonymous users.

If a **consent conflict** exists (for example, one user on two different devices consented to two different categories), Segment resolves the conflict according to the [Reconcile Consent](/docs/privacy/reconcile-consent) documentation.

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

Once you've added the consent object to your web libraries and started collecting user data, you can use the Consent Management tab in the Segment app to [map your destinations to the consent categories](/docs/src/privacy/configure-consent-management) you set up in your third-party consent management platform.