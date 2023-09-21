---
title: Consent in Segment Connections
hidden: true
related:
  - "/privacy/consent-management/"
  - "/privacy/configure-consent-management/"
  - "/privacy/consent-in-unify/"
---

> info "Consent Management is in private beta"
> This means that Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

Segment Connections users can add the [consent object](#consent-object) to their sources to stamp events with the end user consent preferences captured by your consent management platform (CMP) and send them downstream to destinations in categories that an end user consented to share data with. Events without the consent object continue to flow to destinations without consent enforcement. 

For more information about configuring consent categories, see the [Configure Consent Management](/docs/privacy/configure-consent-management/#step-1-create-consent-categories-in-the-segment-app) documentation.

If your sources also contain the integrations object, Segment will look at the consent object first, and then take into account the integrations object according to the table in the [Reconcile consent object and integrations object](#reconcile-consent-object-and-integrations-object-conflicts) documentation.

> info “Unify users must send an additional event to add consent preferences to Profiles”
> If you use Unify, see the [Consent in Unify](/docs/privacy/consent-in-unify) documentation for more information about the Segment Consent Preference event, which Segment uses with the consent object to add consent preference to Profiles.

## Consent object

Segment requires every event from all of your sources to include the end user consent preferences, captured by your CMP or your application logic, in the form of the **consent object**. The consent object is a JSON object with the following format:

```json
{
"context": {
  "consent": {
    "categoryPreferences": {
        "Advertising": true,
        "Analytics": false,
        "Functional": true,
        "DataSharing": false
      }
    }
  }
}

```

<!-- Not currently in scope: The categories consented to by a user and a flag if a [consent conflict](#reconcile-consent-conflicts) exists are pulled from the consent object and are visible as traits on a user's profile in Unify. For more information about Consent in Unify, see the [Consent in Unify](/docs/privacy/consent-management-in-unify) docs.-->

Events without the consent object will continue to flow to destinations without consent enforcement.

## Reconcile consent conflicts

Segment resolves conflicts between your [consent object and your integration object](#reconcile-consent-object-and-integrations-object-conflicts) and between your [CMP and the consent categories you configured in the Segment app](#reconcile-cmp-and-segment-consent-category-conflicts).

### Reconcile consent object and integrations object conflicts

You can add both the integrations object and the consent object to your Segment payloads for greater control over how Segment routes data to your downstream destinations.

> success ""
> For more information about the Integrations object, please see [Filtering your Segment Data](/docs/guides/filtering-data/#filtering-with-the-integrations-object).

If an event includes both an integrations and consent object, Segment will look at the consent object first, and then take into account the integrations object according to the following table:

|  Consent Object                                                                                                  | Integration Object                          | Result |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ |
| Not provided or empty consent object <br><br> `"context": {` <br>`}` <br>OR<br> `"context": {`<br>`     "consent": {`<br>`     }`<br>`}` | Not provided or empty object | Data flows to all destinations. |
| Empty categoryPreference object <br><br> `"context": {`<br>`     "consent": {`<br>`           "categoryPreference": {` <br>`           }`<br>`     }` <br> `}`| Not provided or empty object | Data does **NOT** flow to any mapped destinations - consent is considered to be `false` for all categories. <br> <br> Data flows to all destinations **NOT** mapped to a consent category. |
| Not provided <br><br> `"context": {` <br>`}`                                                                   | `{facebook: true,`<br>`amplitude: false}`   | Data flows to the destinations that are `true` in the integrations object (Facebook). Any metadata provided in the integrations object also flows to your downstream destinations.  |
| Empty consent object <br><br> `"context": {`<br>`     "consent": {`<br>`     }`<br>`}` <br> OR <br> `"context": {`<br>`     "consent": {`<br>`           "categoryPreference": {` <br>`           }`<br>`     }` <br> `}`| `{facebook: true,`<br>`amplitude: false}` | Data does **NOT** flow to any mapped destinations - consent is considered to be `false` for all categories. <br><br> Data flows to all destinations **NOT** mapped to a consent category, destinations set to `true` in the integrations object, and destinations not included in the integrations object.   |
| `{ad: true,` <br>`analytics: false}`<br> <br>_Segment has no category-to-destination mapping for ad and analytics_ | Provided, not provided, or empty object | Data flows to all destinations, as all destinations are unmapped. If the integrations object is present, data flow may be impacted. |
| `{ad: true,` <br>`analytics: false}`<br> <br>_ad = facebook, google-ads_ <br>                                   | Not provided or empty object                | Data flows to destinations that map to a consented purpose. In this case, data flows to all ad destinations (Facebook and Google Ads).<br><br> No data flows to analytics destinations. |
| `{ad: true,` <br>`analytics: false}`<br><br>_ad = facebook, google-ads_ <br> _analytics = amplitude_ | `{facebook: true,`<br>`amplitude: false}` | Data flows to all ad destinations, even though Google Ads is not present in the integrations object.<br><br> Data does **NOT** flow to analytics destinations. |
| `{ad: true,` <br>`analytics: false}`<br><br>_ad = facebook, google-ads_ <br> _analytics = amplitude_  | `{facebook: false,`<br>`amplitude: false}` | Data only flows to Google Ads and not to Facebook, which is `false` in the integrations object. <br><br> Data does **NOT** flow to analytics destinations. |
| `{ad: true,` <br>`analytics: false}`<br><br>_ad = facebook, google-ads_ <br> _analytics = facebook, amplitude_  | `{facebook: true,`<br>`amplitude: false}` | When destinations are mapped to multiple categories, data only flows if consent is `true` for all categories. In this case, data only flows to Google Ads and not to Facebook. <br><br>Data does **NOT** flow to analytics destinations. |
| `{ad: true,` <br>`analytics: true}`<br><br>_ad = facebook, google-ads_ <br> _analytics = facebook, amplitude_  | `{facebook: true,`<br>`amplitude: false}` | When destinations are mapped to multiple categories, data only flows if consent is `true` for all categories. In this case, data flows to Google Ads and Facebook. No data flows to Amplitude because it is `false` in the integrations object. |
| `{ad: false,` <br>`analytics: true}` <br><br>_ad = facebook, google-ads_ <br> _analytics = facebook, amplitude_ | `{facebook: true,`<br>`amplitude: false}` | When destinations are mapped to multiple categories, data only flows if consent is `true` for all categories. <br><br>In this example, data does **NOT** flow to any destination because of the interaction between the integrations and consent objects. |

### Reconcile CMP and Segment consent category conflicts

If you have a category configured in your consent management tool (for example, `advertising`) and there is no category with the same ID in Segment, the data will flow to unmapped destinations. If destinations are mapped to a different category in the Segment app, data flow will honor end user consent for that category.

If there is a category configured in Segment (`functional`) that is not mapped in your CMP, data will not flow to destinations mapped to the `functional` category.

## Content observability

Events discarded due to consent preferences appear in [Delivery Overview](/docs/connections/delivery-overview/) at the "Filtered at destination" step with the discard reason *Filtered by end user consent*.