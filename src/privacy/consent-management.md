---
title: Consent Management Overview
hidden: true
related:
  - "/privacy/account-deletion/"
  - "/privacy/complying-with-the-gdpr/"
---
> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

When an end user visits your site, they set **consent preferences**, or make decisions about the types of data they want you to collect, use, and share. These consent preferences are typically presented as a set list of categories that describe how your company intends to use that data. Common categories include personalization, advertising, and site performance.

Segment works with your third-party consent management platform (CMP) or bespoke consent solution to capture an end user's consent preferences and enforce those preferences by only routing events to the categories consented to by an end user. 

![Diagram outlining information flowing from an end user to Segment destinations](/docs/privacy/images/consent-overview.png)

After a user sets their consent preferences, Segment captures them with the [Analytics.js Consent Tools wrapper](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-tools) and updates the [consent object](#consent-object). The events are then sent downstream to any streaming destinations in categories that a user consented to share data with.

> success ""
> Segment collects consent for both registered users and anonymous users.

## Enforce consent
Segment routes events with a consent object to the destinations in categories consented to by a user and to destinations that do not have a consent category.

If a user changes the categories they consent to or if they consent using a different device or identifier, any events they generate after updating their consent preferences will contain the updated consent information and will be sent only to the destinations in the categories that are currently consented to.

> warning "Segment recommends mapping all destinations to a category"
> Any destinations without a mapping are assumed to not require user consent and will receive all events containing a consent object. 


<!--- out of scope for Q2: For example, if a user agreed to share their information with you for all categories on their first visit to your site, and then on their next visit to the site only consented to sharing data for functional and advertising purposes but not for analytics or data sharing, a [Track call](/docs/connections/spec/track/) demonstrating their new consent preferences would have the following format:

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
      "consentPreferences" : {
   "Advertising": true,
   "Analytics": false,
   "Functional": true,
   "DataSharing": false
}
    }
  }
}
```

> info "Segment Consent Preference is a reserved event name"
> Segment has standardized a series of reserved event names that have special semantic meaning and maps these events to tools that support them. 
>
> See the [Semantic Events](/docs/connections/spec/semantic/) docs for more details.

--->

To learn more about configuring consent categories in your workspace, see the [Configure Consent Management documentation](/docs/privacy/configure-consent-management/).

## Consent object

Segment requires every event from all of your sources to include the end-user consent preferences, captured by your consent management tools or your application logic, in the form of the **consent object**. The consent object is a JSON object with the following format:

```json
{
  "consent" {
     "consentPreferences": {
        "Advertising": true,
        "Analytics": false,
        "Functional": true,
        "DataSharing": false
       }
   }
}


```

<!--- Q3 scope: A consent conflict flag and the categories consented to by a user are both pulled from the consent object and are visible as traits on a user's profile in Unify. --->

### Reconcile consent object and integrations object conflicts

You can add both the integrations object and the consent object to your Segment payloads for greater control over how Segment routes data to your downstream destinations. 

> success " "
> For more information about the Integrations object, please see [Filtering your Segment Data](/docs/guides/filtering-data/#filtering-with-the-integrations-object).

If an event includes both an integrations and consent object, Segment will look at the consent object first, and then take into account the integrations object according to the following table:

| Consent Object                                                                                                  | Integration Object                          | Result |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ |
| Not provided or empty object                                                                                    | Not provided or empty object                | Message delivered to all destinations |
| `context {consent{}}` <br> OR <br> `context {consent {categoryPreference{}}}`                 | Not provided or empty object | Data **NOT** delivered - consent is considered to be `false` for all categories |
| Not provided or empty object <br><br> `context{}`                                                                   | `{facebook: true,`<br>`amplitude: false}`   | Message and metadata delivered to Facebook |
| Empty consent object <br>`context {consent{}}` <br> OR <br> `context {``consent {``categoryPreference{}``}}`     | `{facebook: true,`<br>`amplitude: false}` | Data **NOT** delivered - consent is considered to be `false` for all categories |
| `{ad: true,` <br>`analytics: false}`<br> <br>_Segment has no category-to-destination mapping for ad and analytics_ | Provided, not provided, or empty object | Data **NOT** delivered |
| `{ad: true,` <br>`analytics: false}`<br> <br>_ad = facebook, google ads_ <br>                                   | Not provided or empty object                | Data delivered to destinations that map to consented purpose. In this case, data is delivered to all ad destinations (Facebook and Google Ads).<br><br> No data delivered to analytics destinations |
| `{ad: true,` <br>`analytics: false}`<br><br>_ad = facebook, google ads_ <br> _analytics = amplitude_ | `{facebook: true,`<br>`amplitude: false}` | Data delivered to all ad destinations even though Google Ads is not present in the integrations object.<br> Metadata is sent from Facebook. <br><br> Data **NOT** delivered to analytics destinations. |
| `{ad: true,` <br>`analytics: false}`<br><br>_ad = facebook, google ads_ <br> _analytics = amplitude_  | `{facebook: false,`<br>`amplitude: false}` | Data delivered only to Google Ads, not to Facebook. Data **NOT** delivered to analytics destinations. |
| `{ad: true,` <br>`analytics: true}`<br><br>_ad = facebook, google ads_ <br> _analytics = facebook, amplitude_ | `{facebook: true,`<br>`amplitude: false}` | Data delivered to all ad destinations, including Facebook, because analytics is true. <br> Metadata is sent from Facebook. <br> No data is sent to Amplitude because it is `false` in the integrations object. |
| `{ad: false,` <br>`analytics: true}` <br><br>_ad = facebook, google ads_ <br> _analytics = facebook, amplitude_ | `{facebook: true,`<br>`amplitude: false}` | Data **NOT** delivered to ad destinations. Data delivered to Facebook for analytics only and not to Amplitude. |



## Consent observability

<!--- You can view consent preference events in your [Tracking Plan](/docs/protocols/tracking-plan/create/) and view discarded events in [Delivery Overview](/docs/connections/delivery-overview/). ---> 
<!---### Tracking Plan
### Delivery Overview
out of current scope--->
Events discarded due to consent preferences appear in [Delivery Overview](/docs/connections/delivery-overview/) at the "Filtered at destination" step with the discard reason __Filtered by end user consent__.