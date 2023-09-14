---
title: Configure Consent Management
hidden: true
---
> info "Consent Management is in private beta"
> This means that Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

After setting up a third-party consent management platform (CMP), you can enforce the consent collected from your users by configuring consent categories in your your Segment workspace and adding the [consent object](/docs/privacy/consent-management/#consent-object) to your web libraries. 

Once you've configured consent in the Segment app and updated your libraries with the consent wrapper, your events are routed only to the categories your end users consented to share data with.

## Prerequisites

> info "Consent management edit and update capabilities limited to Workspace Owners"
> Only users with the Workspace Owner role are able to create, edit, and disable consent categories. All other users have read-only access to Consent Management features. 

Before you can configure consent in Segment, take the following steps:
- **Set up your third-party consent management tool and create consent categories**. Take note of your consent categories and the key or ID associated with each category.
- **Know how your company uses each destination**. You need to know which destinations to map to each category. 
- **Access to your web and mobile libraries**. After you set up consent categories in the Segment app, you need to add a wrapper to your Analytics.js, Swift, or Kotlin libraries so that Segment can receive your end users' preferences. Segment provides a [wrapper for OneTrust](#step-2-add-the-consent-wrapper-to-analyticsjs), or if you're using a different CMP, you can create your own wrapper for Analytics.js using the [instructions provided in the analytics-next repository](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-tools){:target="_blank”} and for your mobile libraries using the [instructions provided in the mobile-consent repository](link.com){:target="_blank”}. 

<!-- TODO: fix above link to mobile consent repository-->

## Step 1: Create consent categories in the Segment app

> info "Limited availability of sources and destinations during private beta"
> During private beta, you can send events from web sources to consent categories. Enforcement of consent preferences is only available for data lakes, warehouses, event streaming destinations, webhooks, and functions. You can map one data lake, warehouse, event streaming destination, webhook, or function to multiple consent categories. All other source and destination types are not impacted by consent mappings.
>
> Blob storage, RETL, and Engage destinations do not enforce consent preferences. 

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
> Segment assumes all destinations without a mapping do not require user consent and will receive all events containing a consent object. 

## Step 2: Add a consent wrapper to your library

You can add a consent wrapper to your analytics-js, Swift, and Kotlin libraries. 

Adding the consent wrapper to another [mobile library](/docs/connections/sources/catalog/#mobile) requires additional configuration. See the README in the [@segment/analytics-consent-wrapper-onetrust repository](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-wrapper-onetrust){:target="_blank"} for more details. 

> info "Consent Management is not backwards compatible with Segment's legacy iOS and Android libraries"
> If you are using one of Segment's legacy mobile libraries (Android or iOS,) you will need to upgrade to [Kotlin](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/migration/) or [Swift](/docs/connections/sources/catalog/libraries/mobile/apple/migration/) before using Consent Management. 

<!--- TODO: replace above link with accurate mobile libraries wrapper link when I have it -->

### Analytics.js

Please follow the instructions from the README in the [@segment/analytics-consent-wrapper-onetrust repository](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-wrapper-onetrust){:target="_blank"}.

### Swift

<!--- TODO: Replace this with the real instructions when I have them -->

Please follow the instructions from the README in the [@segment/analytics-consent-wrapper-onetrust repository](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-wrapper-onetrust){:target="_blank"}.

### Kotlin

<!--- TODO: Replace this with the real instructions when I have them -->

Please follow the instructions from the README in the [@segment/analytics-consent-wrapper-onetrust repository](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-wrapper-onetrust){:target="_blank"}.

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
