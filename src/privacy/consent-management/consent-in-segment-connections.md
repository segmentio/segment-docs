---
title: Consent in Segment Connections
plan: consent-management
redirect_from: "/privacy/consent-in-segment-connections"
---

Segment Connections users can add the [consent object](#consent-object) to their sources to stamp events with the end user consent preferences captured by your consent management platform (CMP). You can then send them downstream to destinations in categories that an end user consented to share data with. Events without the consent object continue to flow to destinations without consent enforcement.

> success ""
> With the [Destination Actions framework](/docs/connections/destinations/destination-actions), you can send current end user consent preferences to flow to your destination alongside customer interactions so your destinations know when an end user revokes their consent. 
>
> For more information about sharing current end user consent preferences with your downstream destinations, see the [Sharing consent with Actions destinations](/docs/privacy/consent-management/consent-in-unify/#sharing-consent-with-actions-destinations) documentation. 

For more information about configuring consent categories, see the [Configure Consent Management](/docs/privacy/consent-management/configure-consent-management/#step-1-create-consent-categories-in-the-segment-app) documentation.

If your sources also contain the integrations object, Segment looks at the consent object first, and then takes into account the integrations object according to the table in the [Reconcile consent object and integrations object](#reconcile-consent-object-and-integrations-object-conflicts) documentation.

> info "Unify users must send an additional event to add consent preferences to Profiles"
> If you use Unify, see the [Consent in Unify](/docs/privacy/consent-management/consent-in-unify) documentation for more information about the Segment Consent Preference Updated event, which Segment uses with the consent object to add consent preference to Profiles.

## Consent object

Segment requires every event from all of your sources to include the end user consent preferences, captured by your CMP or your application logic, in the form of the **consent object**. 

The consent object is a JSON object nestled inside of the [context object](/docs/connections/spec/common/#context) with the following format:


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

> success ""
> The JSON keys in the consent object should represent the `categoryId` for each consent category. 

[Segment's OneTrust wrapper](/docs/privacy/consent-management/configure-consent-management/#step-2-integrating-your-cmp-with-segment) automatically adds the consent object to your events, but you can also manually add the consent object to your events if you're using a different CMP.  

Events without the consent object continue to flow to destinations without consent enforcement. Events that don't include a context object, a consent object, or that include them but leave them empty, don’t affect [Profile-level consent preferences](/docs/privacy/consent-management/consent-in-unify) and flow to all destinations.

## Reconcile consent conflicts

Segment resolves conflicts between your [consent object and your integration object](#reconcile-consent-object-and-integrations-object-conflicts) and between your [CMP and the consent categories you configured in the Segment app](#reconcile-cmp-and-segment-consent-category-conflicts).

### Reconcile consent object and integrations object conflicts

You can add both the integrations object and the consent object to your Segment payloads for greater control over how Segment routes data to your downstream destinations.

> success ""
> For more information about the Integrations object, see [Filtering your Segment Data](/docs/guides/filtering-data/#filtering-with-the-integrations-object).

If an event includes both an integrations and consent object, Segment looks at the consent object first, and then takes into account the integrations object according to the following table:

|  Consent Object                                                                                                  | Integration Object                          | Result |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ |
| Not provided or empty consent object <br><br> `"context": {` <br>`}` <br>OR<br> `"context": {`<br>`     "consent": {`<br>`     }`<br>`}` | Not provided or empty object | Data flows to all destinations. |
| Empty categoryPreferences object <br><br> `"context": {`<br>`     "consent": {`<br>`           "categoryPreferences": {` <br>`           }`<br>`     }` <br> `}`| Not provided or empty object | Data doesn't flow to any mapped destinations - consent is considered to be `false` for all categories. <br> <br> Data flows to all destinations not mapped to a consent category. |
| Not provided <br><br> `"context": {` <br>`}`                                                                   | `{facebook: true,`<br>`amplitude: false}`   | Data flows to the destinations that are `true` in the integrations object (Facebook). Any metadata provided in the integrations object also flows to your downstream destinations.  |
| Empty consent object <br><br> `"context": {`<br>`     "consent": {`<br>`     }`<br>`}` <br> OR <br> `"context": {`<br>`     "consent": {`<br>`           "categoryPreferences": {` <br>`           }`<br>`     }` <br> `}`| `{facebook: true,`<br>`amplitude: false}` | Data doesn't flow to any mapped destinations - consent is considered to be `false` for all categories. <br><br> Data flows to all destinations not mapped to a consent category, destinations set to `true` in the integrations object, and destinations not included in the integrations object.   |
| `{ad: true,` <br>`analytics: false}`<br> <br>_Segment has no category-to-destination mapping for ad and analytics_ | Provided, not provided, or empty object | Data flows to all destinations, as all destinations are unmapped. If the integrations object is present, data flow may be impacted. |
| `{ad: true,` <br>`analytics: false}`<br> <br>_ad = facebook, google-ads_ <br>                                   | Not provided or empty object                | Data flows to destinations that map to a consented purpose. In this case, data flows to all ad destinations (Facebook and Google Ads).<br><br> No data flows to analytics destinations. |
| `{ad: true,` <br>`analytics: false}`<br><br>_ad = facebook, google-ads_ <br> _analytics = amplitude_ | `{facebook: true,`<br>`amplitude: false}` | Data flows to all ad destinations, even though Google Ads is not present in the integrations object.<br><br> Data doesn't flow to analytics destinations. |
| `{ad: true,` <br>`analytics: false}`<br><br>_ad = facebook, google-ads_ <br> _analytics = amplitude_  | `{facebook: false,`<br>`amplitude: false}` | Data only flows to Google Ads and not to Facebook, which is `false` in the integrations object. <br><br> Data doesn't flow to analytics destinations. |
| `{ad: true,` <br>`analytics: false}`<br><br>_ad = facebook, google-ads_ <br> _analytics = facebook, amplitude_  | `{facebook: true,`<br>`amplitude: false}` | When destinations are mapped to multiple categories, data only flows if consent is `true` for all categories. In this case, data only flows to Google Ads and not to Facebook. <br><br>Data doesn't flow to analytics destinations. |
| `{ad: true,` <br>`analytics: true}`<br><br>_ad = facebook, google-ads_ <br> _analytics = facebook, amplitude_  | `{facebook: true,`<br>`amplitude: false}` | When destinations are mapped to multiple categories, data only flows if consent is `true` for all categories. In this case, data flows to Google Ads and Facebook. No data flows to Amplitude because it is `false` in the integrations object. |
| `{ad: false,` <br>`analytics: true}` <br><br>_ad = facebook, google-ads_ <br> _analytics = facebook, amplitude_ | `{facebook: true,`<br>`amplitude: false}` | When destinations are mapped to multiple categories, data only flows if consent is `true` for all categories. <br><br>In this example, data doesn't flow to any destination because of the interaction between the integrations and consent objects. |

### Reconcile CMP and Segment consent category conflicts

If you have a category configured in your consent management tool (for example, `advertising`) and there is no category with the same ID in Segment, the data flows to unmapped destinations. If destinations are mapped to a different category in the Segment app, data flow honors end user consent for that category.

If there is a category configured in Segment (`functional`) that is not mapped in your CMP, data won't flow to destinations mapped to the `functional` category.

## Consent observability

Events discarded due to consent preferences appear in [Delivery Overview](/docs/connections/delivery-overview/) at the **Filtered at destination** step with the discard reason *Filtered by end user consent*.
