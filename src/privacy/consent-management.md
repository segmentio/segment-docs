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

Segment works with your third-party consent management platform (CMP) or bespoke consent solution to capture an end user's consent preferences and enforce those preferences by routing events to the categories consented to by an end user. 

![Diagram outlining information flowing from an end user to Segment destinations](/docs/privacy/images/consent-overview.png)

After a user sets their consent preferences, Segment captures them with the [Analytics.js Consent Tools wrapper](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-tools) and updates the [consent object](#consent-object). The events are then sent downstream to any streaming destinations in categories that a user consented to share data with.

> success ""
> Segment collects consent for both registered users and anonymous users.

If a user changes the categories they consent to or if they consent using a different device or identifier, any events they generate after updating their consent preferences will contain the updated consent information. 

For example, if a user agreed to share their information with you for functional and advertising purposes, but not for analytics or data sharing, a [Track call](/docs/connections/spec/track/) demonstrating their new consent preferences would have the following format:

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

To learn more about configuring consent categories in your workspace, see the [Configure Consent Management documentation](/docs/src/privacy/configure-consent-management).

## Consent object

Segment requires every event from all of your sources to include the end-user consent preferences, captured by your consent management tools or your application logic, in the form of the **consent object**. The consent object is a JSON object with the following format:

```json
{
  "consentPreferences" : {
    "Advertising": true,
    "Analytics": false,
    "Functional": true,
    "DataSharing": false
  }
}

```

A consent conflict flag and the categories consented to by a user are both pulled from the consent object and are visible as traits on a user's profile in Unify.

### Reconcile consent object and integrations object conflicts

You can add both the integrations object and the consent object to your Segment payloads for greater control over how Segment routes data to your downstream destinations. 

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
| `{ad: true,` <br>`analytics: false}`<br> <br>//ad = facebook, google ads<br> //analytics = facebook, snowflake |  `{facebook: false,`<br>`amplitude: false}` | Message delivered to all ad destinations (even though Facebook belongs to analytics and user is not consenting to analytics.) Use metadata if provided for Facebook (current behavior)<br>No data delivered to analytics destinations (Snowflake) |