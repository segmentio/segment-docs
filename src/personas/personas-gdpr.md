---
title: Personas and GDPR
---

All [Segment GDPR features](/docs/privacy/complying-with-the-gdpr/) apply to Personas.

Segment never shares or sells user data. Personas inherits Segment's holistic approach to security and privacy, using 256-bit AES standard encryption to safeguard data stores both at rest and in transit.

## User Rights

End-user privacy and the GDPR principles informed the design of Personas, a product powered by first-party data. Personas integrates Segment's existing end-user privacy features with several user rights:


- Right to Erasure
- Right to Object
- Right to Rectification
- Rights to Access and Portability

Below, learn how each of these rights protects the integrity of users and their data.

### Right to Erasure

Using Segment's platform, you can [manage user deletion](/docs/privacy/user-deletion-and-suppression/) across all Segment products and supported Destinations. User deletion requests remove user data from all internal Segment archives and environments, including Personas audiences, within 30 days.

### Right to Object

With [one-click suppression](/docs/privacy/user-deletion-and-suppression/#supressed-users), you can block data collection for specific users. Segment discontinues profile building around suppressed users and prevents them from joining future Personas audiences.

### Right to Rectification

When Segment receives new information, the platform updates user profiles and traits in both Segment and its downstream tools. Use the [Profile API](/docs/personas/profile-api/) to confirm that an update has been processed.

### Rights to Access and Portability

[Identity Resolution](/docs/personas/identity-resolution/) connects information you've gathered about a customer into a single profile. Using the Profile API, you can provide end users with this data. You can also enable raw data integrations and warehouses to share a user's data in a structured format.

## Next Steps

Visit the Segment site to learn [how Segment products simplify GDPR compliance](https://segment.com/product/gdpr), and reference Segment's [complying with the GDPR](/docs/privacy/complying-with-the-gdpr/) documentation to incorporate [GDPR best practices](/docs/privacy/complying-with-the-gdpr/#things-you-can-do-to-address-gdpr) into your workflow.
