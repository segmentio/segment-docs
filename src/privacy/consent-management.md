---
title: Consent Management Overview
hidden: true
related:
  - "/privacy/account-deletion/"
  - "/privacy/complying-with-the-gdpr/"
---
> info "Consent Management is in private beta"
> This means that Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

When an end user visits your site or app, they set **consent preferences**, or make decisions about the types of data they want you to collect, use, and share. These consent preferences are typically presented as a set list of categories that describe how your company intends to use that data. Common categories include personalization, advertising, and site performance.

Segment works with your third-party consent management platform (CMP) or bespoke consent solution to capture an end user's consent preferences and enforce those preferences by only routing events to the categories consented to by an end user. 

![Diagram outlining information flowing from an end user to Segment destinations](/docs/privacy/images/consent-overview.png)

After a user sets their consent preferences on your website or mobile app, Segment requires you to add the [consent object](#consent-object) to all events. If you are using OneTrust, Segment provides a wrapper for your mobile and web libraries that can add the consent object to your events. If you are using another CMP, you are required to add the consent object to your events by creating your own wrapper. For more information, see the [Configure Consent Management documentation](/docs/privacy/configure-consent-management). 

The events, stamped with the consent object, are then sent downstream to any destinations in categories that an end user consented to share data with.

> info ""
> Segment collects consent for both registered users and anonymous users.

## Consent object

Segment requires every event from all of your sources to include the end-user consent preferences, captured by your consent management tools or your application logic, in the form of the **consent object**. The consent object is a JSON object with the following format:

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

<!-- Not currently in scope The categories consented to by a user and a flag if a [consent conflict](#reconcile-consent-conflicts) exists are pulled from the consent object and are visible as traits on a user's profile in Unify.--> 

## Enforce consent
Segment routes events with a consent object to the destinations in categories consented to by a user and to destinations that do not have a consent category. Segment requires the use of the [Segment Consent Preference event](#segment-consent-preference-event) to route events to Unify and Engage. 

If you are using Segment's OneTrust consent wrappers, Segment automatically generates a Segment Consent Preference event.

If you do not use OneTrust as your CMP and you only use Segment Connections, you do not have to generate a Segment Consent Preference event.

If you use Unify and Engage in your Segment instance, you must generate the Segment Consent Preference event, regardless of what consent management solution you use.

### Segment Consent Preference event 
If an end user consents for the first time or changes the categories they consent to, Segment requires you to generate a **Segment Consent Preference** Track event. This event is automatically generated if you are using one of Segment's [OneTrust consent wrappers](/docs/privacy/configure-consent-management/#step-2-add-the-consent-wrapper-to-analyticsjs), or you can generate it using a wrapper you created on your own. 

For example, if an end user agreed to share their information for functional and advertising purposes but not for analytics or data sharing, the Segment Consent Preference [Track call](/docs/connections/spec/track/) demonstrating their new consent preferences would have the following format:

``` json
{
  "anonymousId": "23adfd82-aa0f-45a7-a756-24f2a7a4c895",
  "type": "track",
  "event": "Segment Consent Preference",
  "userId": "u123",
  "traits": {
     "email": "peter@example.com",
     "phone": "555-555-5555",
  }
  "timestamp": "2023-01-01T00:00:00.000Z",
  "context": {
    "consent": {
      "categoryPreferences" : {
        "Advertising": true,
        "Analytics": false,
        "Functional": true,
        "DataSharing": false
      }
    }
  }
}
```

If you use Protocols, the Segment app automatically adds the Segment Consent Preference Track event to all your existing Tracking Plans and for every new Tracking Plan. Segment recommends you don’t delete or edit the default fields in the Segment Consent Preference Track events, but you can add new fields as needed.

> info "Segment Consent Preference is a reserved event name"
> Segment has standardized a series of reserved event names that have special semantic meaning and maps these events to tools that support them. 
>
> See the [Semantic Events](/docs/connections/spec/semantic/) docs for more details.

## Reconcile consent conflicts

Segment resolves conflicts between your [consent object and your integration object](#reconcile-consent-object-and-integrations-object-conflicts) and between your [CMP and the consent categories you configured in the Segment app](#reconcile-cmp-and-segment-consent-category-conflicts). 

### Reconcile consent object and integrations object conflicts

You can add both the integrations object and the consent object to your Segment payloads for greater control over how Segment routes data to your downstream destinations. 

> success " "
> For more information about the Integrations object, please see [Filtering your Segment Data](/docs/guides/filtering-data/#filtering-with-the-integrations-object).

If an event includes both an integrations and consent object, Segment will look at the consent object first, and then take into account the integrations object according to the following table:

| Consent Object                                                                                                  | Integration Object                          | Result |
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

## Consent observability

<!--- You can view consent preference events in your [Tracking Plan](/docs/protocols/tracking-plan/create/) and view discarded events in [Delivery Overview](/docs/connections/delivery-overview/). ---> 
<!---### Tracking Plan
### Delivery Overview
out of current scope--->
Events discarded due to consent preferences appear in [Delivery Overview](/docs/connections/delivery-overview/) at the "Filtered at destination" step with the discard reason __Filtered by end user consent__.