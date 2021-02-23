---
title: Personas and GDPR
---
{% include content/plan-grid.md name="personas" %}



## Is Personas compatible with Segment's GDPR features?
Yes! Personas is compatible with Segment's GDPR features. Personas was designed with the GDPR principles and end-user privacy in mind, and is powered by first-party data.

As a company, we take a holistic approach to security and privacy, and never share or sell user data. These principles also extend to the Personas product. Personas' data stores are encrypted in transit and at rest with 256-bit AES standard encryption.

Here's how Segment's existing end-user privacy features work with Personas:

### Right to Erasure

Segment enables you to manage user deletion across Segment (including Personas) and supported Destinations. Issuing a user deletion request will delete that user's data from all of Segment's internal archives and environments within 30 days. The user will also be deleted from any audiences created by Personas.

### Right to Object

With Segment, you can block data collection for specific users with one-click suppression. Suppressed users will no longer have profiles built around them. This also means they will not be added to any future audiences.

### Right to Rectification

We automatically update user profiles and traits in Segment and in downstream tools whenever new information is received. For auditing purposes, you can use the Profile API to confirm that the update has been processed.

### Rights to Access and Portability

Identity Resolution enables you to aggregate all the information you've collected about a customer, and the Profile API can be used to provide the end user with their data. As an alternative, you can enable a raw data integration or warehouse to organize data about a given user to easily share it in a structured format if requested.

You can learn more about our end-user privacy features and how we help our customers simplify GDPR compliance [here](https://segment.com/product/gdpr).
