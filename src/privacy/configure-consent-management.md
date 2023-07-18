---
title: Configure Consent Management
---
> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

After setting up a third-party consent management platform (CMP), you can enforce the consent collected from your users by configuring consent categories in your your Segment workspace and adding the [consent object](/docs/privacy/consent-management/#consent-object) to your web libraries. After you've configured consent in the Segment app, your events are routed only to destinations consented to by your users.

## Prerequisites

Before you can configure consent in Segment, take the following steps:
- **Set up your third-party consent management tool and create consent categories**. Take note of your consent categories and the key or ID associated with each topic.
- **Know how your company uses each destination**. You need to know which destinations to map to each category. 
- **A way to update your web libraries with the consent object**. After you set up consent categories in the Segment app, you need to add the Analytics.js snippet to your web libraries so that Segment can receive your end users' preferences. 

## Step 1: Add the analytics-consent-tools package to Analytics.js

Before you can create consent categories in the Segment app, you must add the consent tools to your Analytics.js library. For more information about Analytics.js, see the [Analytics.js documentation](/docs/connections/sources/catalog/libraries/website/javascript/).

Install the `analytics-consent-tools` using either a [snippet](#snippet-users) or [npm](#npm-library-users).

### Snippet users (window.analytics)

To install the package, run the following code in your project:

```ts
// wrapper.js
import { createWrapper, resolveWhen } from '@segment/analytics-consent-tools'

export const withCMP = createWrapper({
  shouldLoad: (ctx) => {
    await resolveWhen(() => 
      window.CMP !== undefined && !window.CMP.popUpVisible(), 500)

    if (noConsentNeeded) {
      ctx.abort({ loadSegmentNormally: true })
    } else if (allTrackingDisabled) {
      ctx.abort({ loadSegmentNormally: false })
    }
  },
  getCategories: () => { 
    // e.g. { Advertising: true, Functional: false }
    return normalizeCategories(window.CMP.consentedCategories()) 
  }
})
```

### npm library users

To install the package using npm, run the following code in your project:

```ts
import { withCMP } from './wrapper'
import { AnalyticsBrowser } from '@segment/analytics-next'

export const analytics = new AnalyticsBrowser()

withCmp(analytics)

analytics.load({
  writeKey: '<MY_WRITE_KEY'>
})
```

### Install the OneTrust consent wrapper

If you're using OneTrust, you can install the OneTrust consent wrapper using a [snippet](#for-snippet-users-windowanalytics) or [npm](#for-npm-library-users). 

#### For snippet users (window.analytics)
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

<!---Ask what the preceding step means in context--->


#### For npm library users

```ts
import { oneTrust } from '@segment/analytics-consent-wrapper-onetrust'
import { AnalyticsBrowser } from '@segment/analytics-next'

export const analytics = new AnalyticsBrowser()

oneTrust(analytics)

analytics.load({ writeKey: '<MY_WRITE_KEY'> })
```


## Step 2: Create consent categories in the Segment app

> info "Limited availability of sources and destinations during private beta"
> During the private beta, you can send events from web sources to consent categories. Enforcement of consent preferences is only available for event streaming destinations, webhooks, and functions. All other sources and destinations are not impacted by consent mappings.

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent management page, click **Create categories**.
3. Confirm that you have completed the required prerequisites, and click **Next**.
4. On the Create consent categories page, add the following information to the category form:
  - **Category name**: Enter a name that describes your use case for the data sent to this destination
  - **Category ID**: In OneTrust, this is a string of up to five alphanumeric characters. Other CMPs may have a different format. This field is case sensitive.
  - **Mapped destinations**: Select one or more of your destinations to map to this category.
  <br/><br/>**Optional**: Click **Add category** to create another category. You can map one destination to multiple categories.
5. Once you have finished setting up your category or categories, click **Save**.

> warning "Segment recommends mapping all destinations to a category"
> For more fine-grained control of your end user consent, Segment recommends that you map all destinations to a consent category. 
> 
> Any destinations without a mapping will receive all events containing a consent object. 


## Step 3: Add the consent object to your web libraries

> error "After adding the consent object to your events, your data is immediately impacted"
> If you disable a consent category, events are not sent to mapped destinations.
>  
> If a destination is mapped to multiple categories and the end user has conflicting preferences, data will not be sent to the destination.

1. 

## Edit consent categories

If you need to make changes to your consent categories, you can edit them on the Consent Management page. 

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent Management page, navigate to the consent category you'd like to edit and click **Edit**.
3. On the Edit consent category page, you can make changes to the consent category name, ID, and the destinations connected to a category.
4. When you have made your changes, click **Save**.

## View discarded events

You can view events that were discarded due to consent preferences in your [Tracking Plan](/docs/protocols/tracking-plan/create/) and in [Delivery Overview](/docs/connections/delivery-overview/). 

### Tracking Plan

<!-- ask for more context on this. "Events that are discarded due to consent preferences are surfaced in Protocols as a new Tracking Plan. While you can edit this Tracking Plan, Segment recommends leaving it intact" <!---why??--->

### Delivery Overview

Events discarded due to consent preferences appear in Delivery Overview at the "Filtered at destination" step with the discard reason "Filtered by end user consent". 