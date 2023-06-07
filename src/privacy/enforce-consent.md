---
title: Enforce Consent
---

Segment sends data only to destinations in categories the end user has consented to sending data to.

> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

## Reconcile consent object and integrations object conflicts

If the consent object and integrations object have conflicting destination <!--find an appropriate word-->, Segment reconciles them according to the following table:

| Consent Preference | Integration Object | Result |
| ------------------ | ------------------ | ------ |
| No data            | No data            |        |