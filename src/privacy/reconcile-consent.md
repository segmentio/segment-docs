---
title: Reconciling Consent Conflicts
hidden: true
---

Segment sends data only to destinations in categories consented to by the end user. When conflicts arise between the consent object and integrations object or your consent management tool, Segment reconciles consent according to the following tables.

> info "Consent Management is in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

## Reconcile consent category trait conflicts

Segment detects when there are conflicting consent categories for a user and 

<!--- ask Emma about table/edge cases --->

## Reconcile a user's conflicting preferences

If a user has conflicting preferences (for example, they consented yes for a category on mobile, but not on the web, or consented differently using two different emails) Segment routes data according to the following table:

| Category | Consent on mobile | Consent on the web |
| -------- | ----------------- | ------------------ | 

<!--- can you treat mobile/web data differently? -->

## Reconcile consent object and integrations object conflicts

You can add the integrations object and the consent object to your Segment payloads to control how Segment routes data to your downstream destinations. 

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


## Reconcile Consent Management tool and Segment tool conflicts

If there is a mismatch in consent categories between your consent management tool and the Segment app, Segment reconciles the consent object according to the following table:

| Consent Management Tool                                | Segment App                                                              | Result |
| ------------------------------------------------------ | ------------------------------------------------------------------------ | ------ |
| `{ad: true}`                                           | There is no "ad" category                                                | No data is shared to destinations that the customer may think of as "ad" destinations or may have been mapped in the consent management tool |
| `{person: true}`                                       | There is no category `person`, but there is a `personalization` category | No data is shared to destinations the customer may consider `person` or the mapped `personalization` category |
| `{ad: true`, <br>`person: true`,<br> `analytics:true}` | The `ad`, `person`, `analytics`, and `functional` categories are mapped  | Data will be shared with consenting categories of ad, person, and analytics. <br><br>No data will be shared with destinations mapped to `functional`, because this content is considered to be false. |

