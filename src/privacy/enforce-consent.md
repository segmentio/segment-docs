---
title: Enforce Consent
---

Segment sends data only to destinations in categories the end user has consented to sending data to.

> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

## Reconcile consent object and integrations object conflicts

### Integrations object
The Integrations object is a JSON object you can add to your Segment payloads to control how Segment routes data to your destinations. The Integrations object filters `track`, `page`, `group`, `identify` and `screen` events from client and cloud based sources, and routes or prevents them from going to listed destinations.

> success " "
> For more information about the Integrations object, please see [Filtering your Segment Data](/docs/guides/filtering-data/#filtering-with-the-integrations-object).

If the consent object and integrations object have conflicting destination information, Segment routes data according to the following table:

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