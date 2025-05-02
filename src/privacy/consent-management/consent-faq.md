---
title: Frequently Asked Questions
plan: consent-management
---

## Is Segment's Consent Manager part of Consent Management?

No. Segment's deprecated [open-source Consent Manager](https://github.com/segmentio/consent-manager){:target="_blank”}, which **captures** end user cookie consent, is not part of Segment's Consent Management product, which focuses only on **enforcing** end user consent. Enforcing end user consent means sharing your end users' data with only the destinations they consented to share data with and blocking the flow of their data to all other destinations.

Segment recommends moving from the deprecated, open-source Consent Manager to one that meets your legal compliance requirements. 

## What destinations support consent enforcement? 

All event streams destinations, with the exception of AWS S3 and Engage destinations, support consent enforcement. 

## Can I share current end user consent preferences with my destinations? 

You can use the [Destination Actions framework](/docs/connections/destinations/actions/) to share the current status of your end-users' consent with your Actions destinations. 

For more information, see the [Sharing consent with Actions destinations](/docs/privacy/consent-management/consent-in-unify/#sharing-consent-with-actions-destinations) documentation. 

## Why is my event failing ingestion with the error "context.consent.categoryPreferences object is required"?

An `context.consent.categoryPreferences object is required` error occurs when you send the Segment Consent Preference Updated event without the `context.consent.categoryPreferences` object. Segment performs a validation on the Segment Consent Preference Updated event to ensure that you've correctly structured your end users' consent preferences. If the required object is missing, Segment won't ingest the event and the event won't appear in downstream tools.

Other events, like Track, Identify, or Group, are not subject to the same consent validation and do not require the `context.consent.categoryPreferences` object. 

If you're using a Consent Management Platform (CMP) integration other than [Segment's Analytics.js OneTrust wrapper](/docs/privacy/consent-management/onetrust-wrapper/), you must ensure your Segment Consent Preference Updated events contain the `context.consent.categoryPreferences` object.

## Can I use a CMP other than OneTrust to collect consent from my end users?

Yes, you can use any commercially available CMP or custom solution to collect consent from your end users. If you use a CMP other than OneTrust, you must generate your own wrapper or other mechanism to add the following objects to the events collected from your sources:
- Includes the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object) on every event
- Generates the [Segment Consent Preference Updated](/docs/privacy/consent-management/consent-in-unify/#segment-consent-preference-updated-event) event every time a user provides or updates their consent preferences. This event must contain their anonymousId or userId.

Segment provides guidance about creating your own wrapper in the [@segment/analytics-consent-tools](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-tools){:target="_blank"} GitHub repository. 