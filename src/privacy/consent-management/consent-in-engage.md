---
title: Consent in Engage Audiences
plan: consent-management
---

Once an end user's consent preferences are [stored on their Profile](/docs/privacy/consent-management/consent-in-unify#segment-consent-preference-updated-event), you can create Engage Audiences that respect end user consent preferences to better comply with privacy regulations.  

> info "Consent in Engage Profiles Audiences is in public beta"
> Consent in Engage Audiences is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. 
>
> Consent in Engage Audiences does **not** support Engage Accounts Audiences, Linked Audiences, Predictions, Computed Traits, and Journeys.

## Enforce consent preferences in your Audiences

Before enforcing consent preferences in your Profiles Audiences, you must complete the following prerequisites: 
- Set up [Consent in Segment Connections](/docs/privacy/consent-management/configure-consent-management) or [Consent in Reverse ETL](/docs/privacy/consent-management/consent-in-retl) and have events stamped with the [consent object](/docs/privacy/consent-management/consent-in-segment-connections#consent-object) streaming from your source or available in your data warehouse. 
- Map your Engage Destinations to consent categories. Segment assumes all Engage Destinations not mapped to a consent category do not require consent and will recieve all events containing a consent object. 
- Verify that your Profiles have consent preferences by creating an Audience with a consent trait condition. If the majority of Profiles have consent preferences on them, you're ready to enable consent enforcement in your Unify space. 

### Step 1: Enable consent in your Unify space

You can enable Consent Management in each Unify space that you'd like Segment to automatically enforce consent preferences. If you've chosen not to enable Consent Management for a Unify space but have set up Consent Management for Reverse ETL or Segment Connections, Segment continues to stamp consent preferences on your Profiles. 

> info ""
> To enable Consent Management in your Unify space, you must have a [Workspace Owner role](/docs/segment-app/iam/roles/).  

To enable Consent Management in your Unify space: 
1. Navigate to **Privacy > Consent Management** and select the Settings tab.  
2. Enable the toggle under the Status column to turn on Consent Management for your Unify space. 
3. On the **Enable consent enforcement for [Space Name]?** popup, enter the name of your Unify space and click **Enable enforcement**. 

### Step 2: Create your Audience

You can create a Profiles Audiences as you normally would and Segment automatically enforces consent in your downstream destinations. If you don't want Segment to automatically enforce consent, disable consent enforcement in your Unify space and manually add the consent trait Audience condition when building your Audiences.  

> warning "Consent enforcement doesn't automatically apply to Audiences that existed prior to the enablement of Consent Management in your Unify space"
> Audiences that existed before you enabled Consent Management in a Unify space only enforce consent preferences for new Profiles that enter the Audience after you enabled Consent Management. If you want to ensure each of your Audiences only includes consenting Profiles, request a resync. All Audiences created after you enable Consent Management for a space automatically enforce consent preferences when sharing their data with mapped destination(s). 

Destinations mapped to a consent category only receive the Profiles of users who have given consent to that category. Destinations not mapped to a consent category receive all Profiles in an Audience, regardless of the Profile's consent preferences. 

If you opt to send your Audience to multiple destinations belonging to multiple categories, then each destination receives data for the Profiles that have consent to the destination’s mapped category. For example, if you have an audience mapped to Google Ads (mapped to the Advertising consent category) and Snowflake (mapped to the Analytics consent category), then:
* Google Ads receives all profiles that have consented to Advertising consent category, independent of users' who consented to Analytics
* Snowflake receives all profiles that have consented to Analytics, independent of their Advertising preferences.

> info "Consent preferences can affect Audience sync size"
> The number of profiles that sync to your Engage destination(s) depends on the number of end users that consented to their data being shared with the destinations connected to your Audience. To see the impact of consent on your Audience, add consent traits to the Audience builder.

If you have Profiles with consent preferences for some, but not all consent categories, Segment adds all available categories to the `categoryPreferences` object on all Identify and/or Track calls and considers missing consent categories to be `false`. If you have Profiles with no consent preferences, Segment automatically adds an empty `categoryPreferences` object and prevents those Profiles from flowing downstream to your destination. 

## Verify that your Audiences respect consent preferences

After you enable consent management in your Unify space, Segment automatically filters out end users that have not consented to the category that you mapped to your connected destination. 

However, if you'd like to confirm that this behavior is working as intended, you can either [compare an end user Profile against your mapped categories](#compare-an-end-user-profile-to-your-mapped-categories) or verify that [Delivery Overview](#use-delivery-overview) contains a `FILTERED_BY_END_USER_CONSENT` event. 

> warning "Consent enforcement does not automatically apply to Audiences that existed prior to the enablement of Consent Management in your Unify space"
> Audiences that existed before you enabled Consent Management in a Unify space only enforce consent preferences for new Profiles that enter the Audience after you enabled Consent Management. If you want to ensure each of your Audiences only includes consenting Profiles, request a resync. All Audiences created after you enable Consent Management for a space automatically enforce consent preferences when sharing their data with mapped destination(s). 

### Compare an end user Profile to your mapped categories

You can verify that your Audiences are respecting consent preferences by selecting a user Profile, identifying one category they consented to, and confirming that the user's Profile appears in one of the destinations mapped to that category. 

### Use Delivery Overview

You can use [Delivery Overview](/docs/connections/delivery-overview/) to verify that your destination is enforcing your user's consent preferences by checking for the presence of a `FILTERED_BY_END_USER_CONSENT` discard reason. 

To verify that your events are being filtered by end user consent:
1. Select the destination connected to your Engage Audience.
2. On the Delivery Overview page, select **Filtered at destination**. 
3. Search through the table of discarded events until you find an event with a discard reason of `FILTERED_BY_END_USER_CONSENT`.

If the discard reason `FILTERED_BY_END_USER_CONSENT` is present in the point where your destination discards events, your destination is enforcing your end users' consent preferences appropriately.