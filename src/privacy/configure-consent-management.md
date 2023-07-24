---
title: Configure Consent Management
hidden: true
---
> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

After setting up a third-party consent management platform (CMP), you can enforce the consent collected from your users by configuring consent categories in your your Segment workspace and adding the [consent object](/docs/privacy/consent-management/#consent-object) to your web libraries. 

Once you've configured consent in the Segment app, your events are routed only to the categories your end users consented to share data with.

## Prerequisites

Before you can configure consent in Segment, take the following steps:
- **Set up your third-party consent management tool and create consent categories**. Take note of your consent categories and the key or ID associated with each category.
- **Know how your company uses each destination**. You need to know which destinations to map to each category. 
- **Access to your web libraries**. After you set up consent categories in the Segment app, you need to add a wrapper to your Analytics.js snippet so that Segment can receive your end users' preferences. Segment provides a [wrapper for OneTrust](#step-2-add-the-consent-wrapper-to-analyticsjs), or if you're using a different CMP, you can create your own wrapper using the [instructions provided in the analytics-next repository](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-tools){:target="_blank”}. 

## Step 1: Create consent categories in the Segment app

> info "Limited availability of sources and destinations during private beta"
> During the private beta, you can send events from web sources to consent categories. Enforcement of consent preferences is only available for event streaming destinations, webhooks, and functions. You can map one event streaming destination, webhook, or function to multiple consent categories. All other source and destination types are not impacted by consent mappings. 

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent management page, click **Create categories**.
3. Confirm that you have completed the required prerequisites, and click **Next**.
4. On the Create consent categories page, add the following information to the category form:
  - **Category name**: Enter a name that describes your use case for the data sent to this destination
  - **Category ID**: In OneTrust, this is a string of up to five alphanumeric characters, but other CMPs may have a different format. This field is case sensitive.
  - **Mapped destinations**: Select one or more of your destinations to map to this category. Category mappings apply to all instances of a destination. 
  <br/><br/>**Optional**: Click **Add category** to create another category.
5. Once you have finished setting up your category or categories, click **Save**.

> warning "Segment recommends mapping all destinations to a category"
> Any destinations without a mapping are assumed to not require user consent and will receive all events containing a consent object. 

## Step 2: Add the consent wrapper to Analytics.js

If you're using OneTrust as your CMP, you can install the OneTrust integration consent wrapper (`@segment/analytics-wrapper-onetrust`) using a [snippet](#onetrust-for-snippet-users-windowanalytics) or [npm](#onetrust-for-npm-library-users).

If you have a CMP other than OneTrust, you can install the `@segment/analytics-consent-tools` package using the [instructions in the analytics-next repository](https://github.com/segmentio/analytics-next/tree/master/packages/consent/consent-tools){:target="_blank”}. 

> error "After adding the consent object to your events, your data is immediately impacted"
> If you disable a consent category, end user consent preferences for that category will not be enforced.
>  
> If a destination is mapped to more than one other consent category, and an end user's consent preferences is "false" for either category, data will not get sent.
>
> If an event includes both an integrations object and a consent object, Segment will look at the consent object first, and then take into account the integrations object.

### OneTrust for snippet users (window.analytics)
Use the following initialization code: 
```ts
import { oneTrust } from '@segment/analytics-consent-wrapper-onetrust'


// snippet users
oneTrust(window.analytics)
window.analytics.load('<WRITE_KEY>')
```

Delete the `analytics.load()` line from the snippet

```diff
- analytics.load("<MY_WRITE_KEY>");
```

### OneTrust for npm library users

```ts
import { oneTrust } from '@segment/analytics-consent-wrapper-onetrust'
import { AnalyticsBrowser } from '@segment/analytics-next'

export const analytics = new AnalyticsBrowser()

oneTrust(analytics)

analytics.load({ writeKey: '<MY_WRITE_KEY'> })
```

## Edit consent categories

If you need to make changes to your consent categories, you can edit them on the Consent Management page. You may experience some latency between making the changes and having the changes take effect.

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent Management page, navigate to the consent category you'd like to edit and click **Edit**.
3. On the Edit consent category page, you can make changes to the consent category name, ID, and the destinations connected to a category.
4. When you have made your changes, click **Save**.

## Disable consent categories

Disabling a consent category means that Segment no longer enforces end user consent preferences for the destinations in the disabled category. Other consent categories are not affected.  

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent Management page, disable the toggle for the category you'd like to disable. 
3. On the "Disable [category-name]?" popup, enter the category name in the Consent category name field and click **Disable category**.
