---
title: Consent in Engage Audiences
plan: consent-management
---

Segment uses the [consent object](/docs/privacy/consent-in-unify/#segment-consent-preference-event) on Segment events, including the [Segment Consent Preference Updated](/docs/privacy/consent-in-unify/#segment-consent-preference-updated-event) Track event, to evaluate and store consent preferences on an [end user's Profile](/docs/privacy/consent-management/consent-in-unify#segment-consent-preference-updated-event). 

Once an end user's consent preferences are stored on their Profile, you can create Engage Audiences that respect end user consent preferences to better comply with privacy regulations. 

> info "Consent in Engage Audiences is in public beta"
> Consent in Engage Audiences is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. 
>
> Only Profiles Audiences are supported by Consent in Engage Audiences. Consent in Engage Audiences does **not** support Engage Accounts Audiences, Linked Audiences, Predictions, and Journeys.

## Enforce consent preferences in your Audiences

Before using an end user's consent preferences to create your Audiences, you must complete the following prerequisites: 
- You've previously set up [Consent in Segment Connections](/docs/privacy/consent-management/configure-consent-management) or [Consent in Reverse ETL](/docs/privacy/consent-management/consent-in-retl) and have events stamped with the [consent object](/docs/privacy/consent-management/consent-in-segment-connections#consent-object) streaming from your source or available in your data warehouse.
- You generate the [Segment Consent Preference Updated](/docs/privacy/consent-management/consent-in-unify#segment-consent-preference-updated-event) Track event each time a user updates their consent preferences. This event stamps each Profile with a user's consent preferences. 

### Step 1: Enable consent in your Unify space

Once your consent categories are set up and mapped and each of your Profiles is stamped with your end user's consent preferences, you're ready to enable Consent Management in your Unify space. You must enable Consent Management in each Unify space that you'd like Segment to automatically enforce consent preferences. If you've chosen not to enable Consent Management for a Unify space but you've previously set up Consent Management for Reverse ETL or Segment Connections, Segment continues to stamp consent preferences on your Profiles. If you enable or disable a Unify space, Segment doesn't automatically enforce consent in your Audiences, but continues to store consent preferences on your Profiles.

> info ""
> In order to enable Consent Management in your Unify space, you must have a [Workspace Owner role](/docs/segment-app/iam/roles/).  

Before you enable consent in your Unify space, you can verify that your Profiles have consent preferences by creating an Audience with a consent trait condition. If the majority of Profiles have consent preferences on them, you're ready to enable consent enforcement in your Unify space. 

If you have Profiles with consent preferences for some, but not all consent categories, Segment adds all categories to a `categoryPreferences` object on an Identify or Track call and considers consent categories without current consent preferences to be `false`. If you have Profiles with no consent preferences, Segment automatically adds an empty `categoryPreferences` object on an Identify or Track call and prevents those Profiles from flowing downstream to your destination. 

To enable Consent Management in your Unify space: 
1. Navigate to **Privacy > Consent Management** and select the Settings tab.  
2. Enable the toggle under the Status column to turn on Consent Management for your Unify space. 
3. On the **Enable consent enforcement for [Space Name]?** popup, enter the name of your Unify space and click **Enable enforcement**. 

After you’ve enabled Consent Management in your Unify space, you can create an Audience as you normally would and Segment automatically allows or blocks profiles from flowing to your downstream destinations, based on end-user preferences and your destination mapping. 

> warning "Consent enforcement does not automatically apply to Audiences that existed prior to the enablement of Consent Management in your Unify space"
> Audiences that existed before you enabled Consent Management in a Unify space only enforce consent preferences for new Profiles that enter the Audience after you enabled Consent Management. If you want to ensure each of your Audiences only includes consenting Profiles, request a resync. All Audiences created after you enable Consent Management for a space automatically enforce consent preferences when sharing their data with mapped destination(s). 


### Step 2: Create your Audience

> info "Consent preferences can affect Audience sync size"
> The number of profiles that sync to your Engage destination(s) depends on the number of end users that consented to their data being shared with the destinations connected to your Audience. To see the impact of consent on your Audience, add consent traits to the Audience builder.

During the public beta, you can create a Profiles Audiences as you normally would and Segment automatically enforces consent in your downstream destinations. If you don't want Segment to automatically enforce consent, disable consent enforcement in your Unify space and manually add the consent trait Audience condition when building your Audiences. 

Destinations mapped to a consent category only receive the Profiles of users who have given consent to that category. Destinations not mapped to a consent category receive all Profiles in an Audience, regardless of the Profile's consent preferences. 

If you opt to send your Audience to multiple destinations belonging to multiple categories, then each destination receives data for the Profiles that have consent to the destination’s mapped category. For example, if you have an audience mapped to Google Ads (mapped to the Advertising consent category) and Snowflake (mapped to the Analytics consent category), then:
* Google Ads receives all profiles that have consented to Advertising consent category, independent of users' who consented to Analytics
* Snowflake receives all profiles that have consented to Analytics, independent of their Advertising preferences.

## Verify that your Audiences respect consent preferences

After you enable consent management in your Unify space and create a new audience, Segment automatically filters out data from end users that have not consented to the category that you mapped to your connected destination. 

However, if you'd like to confirm that this behavior is working as intended, you can either [compare an end user profile against your mapped categories](#compare-an-end-user-profile-to-your-mapped-categories) or verify that [Delivery Overview](#use-delivery-overview) contains a `FILTERED_BY_END_USER_CONSENT` event. 

### Compare an end user Profile to your mapped categories

To verify that your end user's consent preferences match the category that you mapped to your destination:
1. Navigate to the connected destination and select a Profile. 
2. Return to Segment and compare the consent preferences of that Profile against the consent category of the connected destination. 
3. Verify that the consent preferences of your selected user match the consent category that you mapped to your destination.

### Use Delivery Overview

You can use Delivery Overview to verify that your destination is enforcing your user's consent preferences by checking for the presence of a `FILTERED_BY_END_USER_CONSENT` discard reason. 

To verify that your events are being filtered by end user consent:
1. Select the destination connected to your Engage Audience.
2. On the Delivery Overview page, select **Filtered at destination**. 
3. Search through the table of discarded events until you find an event with a discard reason of `FILTERED_BY_END_USER_CONSENT`.

If the discard reason `FILTERED_BY_END_USER_CONSENT` is present in the point where your destination discards events, your destination is enforcing your end users' consent preferences appropriately.
