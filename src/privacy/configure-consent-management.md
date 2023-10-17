---
title: Configure Consent Management
hidden: true
related:
  - "/privacy/consent-management/"
  - "/privacy/consent-in-segment-connections/"
  - "/privacy/consent-in-unify/"
---
> info "Consent Management is in private beta"
> This means that Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

After setting up your consent management platform (CMP), you can enforce the consent collected from your users by adding the [consent object](/docs/privacy/consent-in-segment-connections/#consent-object) to your events. 

Once you've configured consent in the Segment app and updated your sources to contain consent preference in every event, your events are routed only to the categories your end users consented to share data with. Events without the consent preference will continue to flow to destinations without consent enforcement.

## Prerequisites

> info "Consent management edit and update capabilities limited to Workspace Owners"
> Only users with the Workspace Owner role are able to create, edit, and disable consent categories. All other users have read-only access to Consent Management features. 

Before you can configure consent in Segment, take the following steps:
- **Set up your third-party consent management tool and create consent categories**. Take note of your consent categories and the key or ID associated with each category.
- **Know how your company uses each destination**. You need to know which destinations to map to each category. 
- **Access to your web and mobile libraries**. After you set up consent categories in the Segment app, you need to integrate your CMP and your Segment sources using a wrapper or other solution. 

<!-- TODO: fix above link to mobile consent repository-->

## Step 1: Create consent categories in the Segment app

> info "Limited availability of sources and destinations during private beta"
> During private beta, AWS S3, RETL, and Engage destinations do not enforce consent preferences. 

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent management page, click **Create categories**.
3. Confirm that you have completed the required prerequisites, and click **Next**.
4. On the Create consent categories page, add the following information to the category form:
  - **Category name**: Enter a name that describes your use case for the data sent to this destination. This field only accepts category names that are 20 characters or less.
  - **Category ID**: In OneTrust, this is a string of up to five alphanumeric characters, but other CMPs may have a different format. This field is case sensitive.
  - **Mapped destinations**: Select one or more of your destinations to map to this category. Category mappings apply to all instances of a destination. 
  <br/><br/>**Optional**: Click **Add category** to create another category.
5. Once you've finished setting up your category or categories, click **Save**.

> warning "Segment recommends mapping all destinations to a category"
> Segment assumes all destinations without a mapping do not require user consent and will receive all events containing a consent object. If a destination is mapped to multiple categories, a user must consent to all categories for data to flow to the destination.

## Step 2: Integrating your CMP with Segment

Once you've created consent categories in the Segment app, you need to integrate your CMP with Segment. Segment recommends using a CMP wrapper, but you can use any solution provided it meets the following criteria:
- Reads the end user consent preference from your CMP and includes the [consent object](/docs/privacy/consent-in-segment-connections/#consent-object) in every event
- If using Unify and Engage, generates the [Segment Consent Preference](/docs/privacy/consent-in-unify/#segment-consent-preference-event) event every time a user provides or updates their consent preferences with their anonymousId and userId

Segment provides a OneTrust wrapper for the following sources:
- **Analytics.js**: Please follow the instructions from the README in the [@segment/analytics-consent-wrapper-onetrust repository](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-wrapper-onetrust){:target="_blank"}.
- **Kotlin**: Please follow the instructions from the README in the [@segment-integrations/analytics-kotlin-consent](https://github.com/segment-integrations/analytics-kotlin-consent/blob/main/README.md#getting-started){:target="_blank"} repository.
<!--- will not be released alongside the other two libraries, commenting out for now. - **Swift**: Please follow the instructions from the README in the [@repository](){:target="_blank"}.-->

If you'd like to integrate with any other CMP, Segment requires you to build your own wrapper or use any mechanism provided it meets the above requirements of data and event generation.

> warning "Consent Management is not backwards compatible with Segment's legacy Android library"
> If you are using Segment's legacy Android library, you will need to upgrade to [Kotlin](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/migration/) before using Consent Management.

<!--- 
> warning "Consent Management is not backwards compatible with Segment's legacy iOS and Android libraries"
> If you are using one of Segment's legacy mobile libraries (iOS or Android,) you will need to upgrade to [Swift](/docs/connections/sources/catalog/libraries/mobile/apple/migration/) or [Kotlin](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/migration/) before using Consent Management. 

--->

### Validate your CMP integration

Customers with Analytics.js 2.0 sources can use the [Segment Inspector](/docs/connections/sources/catalog/libraries/website/javascript/#segment-inspector) to confirm that events from their source contain the [consent object](/docs/privacy/consent-in-segment-connections) and, for Unify/Engage users, the [Segment Consent Preference event](/docs/privacy/consent-in-unify/#segment-consent-preference-event) emits every time end users update their consent preferences.

All users can validate their consent integration with Segment by using the [Source Debugger](/docs/connections/sources/debugger/) to confirm that events contain the [consent object](/docs/privacy/consent-in-segment-connections). Unify/Engage users should also confirm their sources emit the [Segment Consent Preference event](/docs/privacy/consent-in-unify/#segment-consent-preference-event) every time end users update their consent preferences.

You can also confirm your events flow to destinations or are blocked from destinations according to the consent categories you created in [Step 1: Create consent categories in the Segment App](#step-1-create-consent-categories-in-the-segment-app).


## Edit consent categories

If you need to make changes to your consent categories, you can edit them on the Consent Management page. You may experience some latency between making the changes and having the changes take effect.

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent Management page, navigate to the consent category you'd like to edit and click **Edit**.
3. On the Edit consent category page, you can make changes to the consent category name, ID, and the destinations connected to a category.
4. When you've made your changes, click **Save**.

## Disable consent categories

Disabling a consent category means that Segment no longer enforces end user consent preferences for the destinations in the disabled category. Other consent categories aren't affected.  

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent Management page, disable the toggle for the category you'd like to disable. 
3. On the "Disable [category-name]?" popup, enter the category name in the Consent category name field and click **Disable category**.
