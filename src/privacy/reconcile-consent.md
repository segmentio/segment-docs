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

If the consent object and integrations object have conflicting destination information, Segment routes data according to the following table:

<!-- ask Atit if consent object takes precedence over integrations object, except if specifically called out in Integrations object-->

| Consent Object                                                                                                  | Integration Object                          | Result |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ |
| Not provided or empty object                                                                                    | Not provided or empty object                | Message delivered to all enabled destinations |
| Not provided or empty object                                                                                    | `{facebook: true,`<br>`amplitude: false}`   | Message and metadata delivered to Facebook |
| `{ad: true,` <br>`analytics: false}`<br> <br>//ad = facebook, google ads                                        | Not provided or empty object                | Message delivered to the destinations mapped to the consented category. In this case, the message would be delivered to the Ad category (Facebook and Google Ads). No data is delivered to destinations mapped to the analytics category. |
| `{ad: true,` <br>`analytics: false}`<br> <br>//ad = facebook, google ads                                        | `{facebook: true,`<br>`amplitude: false}`   | Message delivered to all ad destinations even though google-ads is not provided in the integrations object. Use metadata if provided for Facebook (the current behavior). No data is delivered to analytics destinations. |
| `{ad: true,` <br>`analytics: false}`<br> <br>//ad = facebook, google ads                                        | `{facebook: false,`<br>`amplitude: false}`  | Message delivered to all ad destinations (Google Ads) but NOT to Facebook. <br> No data delivered to analytics destinations |
| `{ad: true,` <br>`analytics: false}`<br> <br>//ad = facebook, google ads <br> //analytics = facebook, snowflake |  `{facebook: false,`<br>`amplitude: false}` | Message delivered to all ad destinations (even though Facebook belongs to analytics and user is not consenting to analytics.) Use metadata if provided for Facebook (current behavior)<br>No data delivered to analytics destinations (Snowflake) |


## Reconcile Consent Management tool and Segment tool conflicts

If there is a mismatch in consent categories between your consent management tool and the Segment app, Segment reconciles the consent object according to the following table:

| Consent Management Tool                                | Segment App                                                              | Result |
| ------------------------------------------------------ | ------------------------------------------------------------------------ | ------ |
| `{ad: true}`                                           | There is no "ad" category                                                | No data is shared to destinations that the customer may think of as "ad" destinations or may have been mapped in the consent management tool |
| `{person: true}`                                       | There is no category `person`, but there is a `personalization` category | No data is shared to destinations the customer may consider `person` or the mapped `personalization` category |
| `{ad: true`, <br>`person: true`,<br> `analytics:true}` | The `ad`, `person`, `analytics`, and `functional` categories are mapped  | Data will be shared with consenting categories of ad, person, and analytics. <br><br>No data will be shared with destinations mapped to `functional`, because this content is considered to be false. |

