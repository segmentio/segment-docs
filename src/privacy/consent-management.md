---
title: Consent Management Overview
hidden: true
hide_toc: true
related:
  - "/privacy/configure-consent-management/"
  - "/privacy/consent-in-segment-connections/"
  - "/privacy/consent-in-unify/"
---
> info "Consent Management is in private beta"
> This means that Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

When an end user visits your web or mobile app, they set **consent preferences**, or make decisions about the types of data they want you to collect, use, and share. These consent preferences are typically presented as a set list of categories that describe how your company intends to use that data. Some common categories include personalization, advertising, and site performance.

Segment integrates with your commercial third-party or bespoke consent management platform (CMP) that captures an end user's consent preferences and enforces those preferences by only routing events to the categories consented to by an end user.

![Diagram outlining information flowing from an end user to Segment destinations](/docs/privacy/images/consent-overview.png)

After a user sets their consent preferences on your web or mobile app, Segment requires you to add the [consent object](/docs/privacy/consent-in-segment-connections/#consent-object) to all events. If you are using OneTrust, Segment provides a wrapper for your web and mobile libraries that can add the consent object to your events. If you are using another CMP, you are required to add the consent object to your events by either creating your own wrapper or using another mechanism. For more information, see the [Configure Consent Management documentation](/docs/privacy/configure-consent-management).

The events, stamped with the consent object, are then sent downstream to any destinations in categories that an end user consented to share data with.

> info ""
> Segment collects consent for both registered users and anonymous users.

For more information about consent in Segment Connections, see the [Consent in Segment Connections](/docs/privacy/consent-in-segment-connections) documentation. 

If you are a Unify user, you can also see the [Consent in Unify](/docs/privacy/consent-in-unify) for more information about the Segment Consent Preference event, which Segment uses to add consent preference to the Profile.
