---
title: HIPAA Eligible Segment
---

Segment is a HIPAA eligible platform, and meets the data privacy and security requirements of healthcare customers and their stakeholders. For more information about Segment becoming HIPAA eligible, see the [announcement blog post](http://segment.com/blog/segment-for-healthcare){:target="_blank"}.


## Business Associate Addendum

> info ""
> Twilio BAA are available to customers on a Business Tier plan.

Before you begin, check that the Segment products and services you'll use for your HIPAA workflows are on the list of Twilio's [HIPAA Eligible Products and Services](https://twil.io/HIPAA-eligible-products-and-services){:target="_blank"}. After you've verified availability, contact your Account Expert to [request a demo](https://segment.com/contact/sales/){:target="_blank"}.

## Verify your Workspace

Ensure your Workspace is eligible for HIPAA before you configure and send any personal health information (PHI).

1. In your Workspace, navigate to **Settings > Workspace Settings**.
2. On the **General Settings** tab, ensure that the HIPAA badge appears. This badge confirms that the Workspace is HIPAA eligible. ![HIPAA Eligible](images/hipaa-eligible.png)

With the BAA signed and Workspace confirmed as eligible, you can start building. For more information about starting a HIPAA compliant implementation, see Twilio's [Architecting for HIPAA on Twilio](https://twil.io/architecting-for-hipaa){:target="_blank"}, which outlines the shared responsibilities and requirements for building and maintaining HIPAA-compliant workflows in Segment.

## HIPAA Auditing
Segment maintains audit logs of every read and update action a user performs in the Segment app that may involve PHI/PII. 

Data captured in the HIPAA audit logs includes:
 - `workspace_id`: unique identifier of the workspace
 - `actor_user_id`: unique identifier Segment assigns to the logged in user
 - `event_type`: The action performed by the user. For example, `Source Debugger Raw Viewed`, `Destination Filter Modified`, or other events
 - `end_user_id`: Segment sometimes assigns this unique identifier to an end-user, event, audience, or journey, depending on the event type
 - `timestamp`: Time, in UTC, when the action occurred

These logs can be provided upon request. For specific requests, please reach out to [friends@segment.com](mailto:friends@segment.com){:target="_blank"}.