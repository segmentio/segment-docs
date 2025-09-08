---
title: Configure Consent Management
plan: consent-management
redirect_from: "/privacy/configure-consent-management"
---

After setting up your consent management platform (CMP), you can enforce the consent collected from your users by adding the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object) to your events. 

Once you've configured consent in the Segment app and updated your sources to contain consent preference in every event, your events are routed only to the categories your end users consented to share data with. Events without the consent preference will continue to flow to destinations without consent enforcement.

## Prerequisites

> info "Consent management edit and update capabilities limited to Workspace Owners"
> Only users with the Workspace Owner role are able to create, edit, and disable consent categories. All other users have read-only access to Consent Management features. 

Before you can configure consent in Segment, take the following steps:
- **Set up your third-party consent management tool and create consent categories**. Take note of your consent categories and the key or ID associated with each category.
- **Know how your company uses each destination**. You need to know which destinations to map to each category. 
- **Access to your web and mobile libraries**. After you set up consent categories in the Segment app, you need to integrate your CMP and your Segment sources using a wrapper or other solution. 
- _For Analytics.js sources only_ : Navigate to your Analytics.js source. Select  **Settings > Analytics.js** and enable **Destination Filters**.


## Step 1: Create consent categories in the Segment app

> info "Limited availability of destinations"
> AWS S3 and Engage destinations do not enforce consent preferences. 

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent management page, click **Create categories**.
3. Confirm that you have completed the required prerequisites, and click **Next**.
4. On the Create consent categories page, add the following information to the category form:
  - **Category name**: Enter a name that describes your use case for the data sent to this destination.
  - **Category ID**: In OneTrust, this is a string of up to five alphanumeric characters, but other CMPs may have a different format. This field is case sensitive, cannot start with a number, and must have fewer than 35 characters.
  - **Mapped destinations**: Select one or more of your destinations to map to this category. Category mappings apply to all instances of a destination. 
5. After you've finished setting up your category or categories, click **Save**.

> warning "Segment recommends mapping all destinations to a category"
> Segment assumes all destinations without a mapping do not require user consent and will receive all events containing a consent object. If a destination is mapped to multiple categories, a user must consent to all categories for data to flow to the destination.

## Step 2: Integrating your CMP with Segment

Once you've created consent categories in the Segment app, you need to integrate your CMP with Segment. 

Segment supports the following CMPs:

| Consent Management Platform | Supported web libraries    | Supported mobile libraries   | Contact       |
| --------------------------- | -------------------------- | ---------------------------- | ------------- |
| OneTrust                    |![supported](/docs/images/supported.svg) [Analytics.js](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-wrapper-onetrust){:target="_blank"}<sup>*</sup> | ![supported](/docs/images/supported.svg) [Kotlin](https://github.com/segment-integrations/analytics-kotlin-consent/blob/main/README.md#getting-started){:target="_blank"} <br> ![supported](/docs/images/supported.svg) [Swift](https://github.com/segment-integrations/analytics-swift-consent#segment-consent-management){:target="_blank"} <br> ![supported](/docs/images/supported.svg) [React Native](https://github.com/segmentio/analytics-react-native/tree/master/packages/plugins/plugin-onetrust){:target="_blank"} | For support and troubleshooting, contact [Segment](mailto:friends@segment.com){:target="_blank"}. |
| TrustArc                   | ![supported](/docs/images/supported.svg) [Analytics.js](https://github.com/trustarc/trustarc-segment-wrapper){:target="_blank"} | ![unsupported](/docs/images/unsupported.svg) | For support and troubleshooting, contact [TrustArc](https://trustarc.com/contact/){:target="_blank"}. |
| Ketch                      | ![supported](/docs/images/supported.svg) [Analytics.js](https://docs.ketch.com/ketch/docs/segment-tag-management-automation){:target="_blank"} | ![unsupported](/docs/images/unsupported.svg) | For support and troubleshooting, contact [Ketch](https://www.ketch.com/contact-us){:target="_blank"}. |

<sup>*</sup>_If you send data to device-mode destinations connected to your Analytics.js source, you must navigate to your Analytics.js source in the Segment app, select **Settings > Analytics.js**, and enable Destination Filters._ 

> success ""
> For more information about Segment’s Analytics.js OneTrust wrapper, see the [Analytics.js OneTrust Wrapper](/docs/privacy/consent-management/onetrust-wrapper/) documentation. 

If you'd like to integrate with any other CMP, Segment requires you to build your own wrapper or use any mechanism provided it meets the following requirements for data and event generation:
  - Reads the end user consent preference from your CMP and includes the [consent object](/docs/privacy/consent-management/consent-in-segment-connections/#consent-object) in every event
  - If using Unify and Engage, generates the [Segment Consent Preference Updated](/docs/privacy/consent-management/consent-in-unify/#segment-consent-preference-updated-event) event every time a user provides or updates their consent preferences with their anonymousId and userId

To get started building your own wrapper, follow the instructions in the [@segment/analytics-consent-tools](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-tools){:target="_blank"} repository. 

> warning "Consent Management is not backwards compatible with Segment's legacy iOS and Android libraries"
> If you are using one of Segment's legacy mobile libraries (iOS or Android,) you will need to upgrade to [Swift](/docs/connections/sources/catalog/libraries/mobile/apple/migration/) or [Kotlin](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/migration/) before using Consent Management. 

### Validate your CMP integration

Customers with Analytics.js 2.0 sources can use the [Segment Inspector](/docs/connections/sources/catalog/libraries/website/javascript/#segment-inspector) to confirm that events from their source contain the [consent object](/docs/privacy/consent-management/consent-in-segment-connections). Unify and Engage users can also verify that the [Segment Consent Preference Updated event](/docs/privacy/consent-management/consent-in-unify/#segment-consent-preference-updated-event) emits every time end users update their consent preferences.

All users can validate that events contain the consent object and that the Segment Consent Preference Updated event is present using Segment's [Source Debugger](/docs/connections/sources/debugger/). 

You can also confirm your events flow to destinations or are blocked from destinations according to the consent categories you created in [Step 1: Create consent categories in the Segment App](#step-1-create-consent-categories-in-the-segment-app), if already connected to the destination. 


## Edit consent categories

If you need to make changes to your consent categories, you can edit them on the Consent Management page. You may experience some latency between making the changes and having the changes take effect.

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent Management page, navigate to the consent category you'd like to edit and click **Edit**.
3. On the Edit consent category page, you can make changes to the consent category name, ID, and the destinations connected to a category.
4. When you've made your changes, click **Save**.

> success ""
> The [Audit Trail](/docs/segment-app/iam/audit-trail/) surfaces information about when a consent category is created, modified, or disabled, and when consent mappings are created or removed.

## Turn off consent categories

Turning off a consent category means that Segment no longer enforces end user consent preferences for the destinations in the deactivated category. Other consent categories aren't affected. 

To turn off consent categories:

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, navigate to **Privacy > Consent Management**.
2. On the Consent Management page, disaturn off the toggle for the category you'd like to turn off. 
3. On the "Disable [category-name]?" popup, enter the category name in the Consent category name field and click **Disable category**.