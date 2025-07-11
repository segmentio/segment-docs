---
title: Consent in Engage Audiences
plan: consent-management
---

Segment uses the [consent object](/docs/privacy/consent-in-unify/#segment-consent-preference-event) on Segment events, including the [Segment Consent Preference Updated](/docs/privacy/consent-in-unify/#segment-consent-preference-updated-event) Track event, to evaluate and store consent preferences on an end user's Profile. 

Once an end user's consent preferences are stored on their Profile, you can create Engage Audiences that respect end user consent preferences to better comply with privacy regulations. 

> warning "Consent in Engage Audiences is in public beta"
> Consent in Engage Audiences is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. 
>
> During the public beta, only Profiles Audiences are supported by Consent in Engage Audiences.  

## Enforce consent preferences in your Audiences

Before using an end user's consent preferences to create your Audiences, you must complete the following prerequisites: 
- You've previously set up [Consent in Segment Connections](/docs/privacy/consent-management/consent-in-segment-connections) or [Consent in Reverse ETL](/docs/privacy/consent-management/consent-in-retl) and have events stamped with the [consent object](/docs/privacy/consent-management/consent-in-segment-connections#consent-object) streaming from your source or available in your data warehouse.
- You've previously set up [Consent in Unify](/docs/privacy/consent-management/consent-in-unify) and stamped all of your Profiles with end user consent preferences.

### Step 1: Enable consent in your Unify space

Once your consent categories are set up and mapped and each of your Profiles is stamped with the consent object, you're ready to enable Consent Management in your Unify space. You must enable Consent Management in each Unify space that you'd like to enforce consent preferences. If you've chosen not to enable Consent Management for a Unify space but you've previously set up Consent Management for Reverse ETL or Segment Connections, Segment will continue to stamp consent preferences on your Profiles. 

> info ""
> In order to enable Consent Management in your Unify space, you must have a [Workspace Owner role](/docs/segment-app/iam/roles/).  

To enable Consent Management in your Unify space: 
1. Navigate to Unify and select the space where you'd like to enable Consent Management. 
2. Select **Unify settings** and navigate to the **Space management** tab. 
3. Select the **Consent management** setting and enable the toggle to turn on Consent Management for your Unify space. 
4. On the **Enable consent enforcement for [Space Name]?** popup, enter the name of your Unify space and click **Enable enforcement**. 

After you've enabled Consent Management in your Unify space, you can create an Audience that only includes users that have consented to the use of their data for a particular purpose. 

> warning "Consent enforcement is not automatically applied to Audiences that existed prior to the enablement of Consent Management in your Unify space"
> Audiences that existed before you enabled Consent Management in a Unify space only enforce consent preferences for new Profiles that enter an Audience after you enable Consent Management. If you want to ensure each of your Audiences only includes consenting Profiles, request a resync: only Profiles that consented to the category mapped to your destination will re-enter the Audience and be sent downstream to your destination. All Audiences created after you enable Consent Management for a space only contain Profiles that consented to the use of their data for the mapped destination. 


### Step 2: Create your Audience

> info "Consent preferences can affect Audience sync size"
> The number of profiles that sync to your Audience depends on the number of end users that consented to their data being shared with the destinations connected to your Audience. To see the impact of consent on your Audience, add consent traits to the Audience builder.

During the public beta, you can create Profiles Audiences from your users' consent preferences. 

To create a Profiles Audience that includes consent traits: 
1. Navigate to **Engage > Audiences** and click **+ New audience**, then select **Audience**. 
2. On the Select Audience Type screen, select **Profiles audience** then click **Next**.
3. Add a condition and select **Have a consent trait**, then select your intended consent category, operator, and true/false value.
4. Continue building your Audience, adding additional conditions as you see fit. When you're satisfied with your Audience conditions, click **Next**. 
5. Select one or more destinations that you'd like to receive your Audience.  

Destinations mapped to a consent category only receive the Profiles of users that have consented to that category. Destinations not mapped to a consent category receive all Profiles in an Audience, regardless of the Profile's consent preferences. If opt to send your Audience to multiple destinations belonging to multiple categories then each destination receives data for the Profiles that have consent to the destination’s mapped category. For example, if you have an audience mapped to Google Ads (mapped to the Ads consent category) and Snowflake (mapped to the Analytics consent category), then Google Ads receives all profiles that have consent to Ads independent of users consent preferences to Analytics, and Snowflake receives all profiles that have consented to Analytics independent of their Ads preferences.

## Verify that your Audiences respect consent preferences

After you've enabled consent management in your Unify space and created a new audience, Segment automatically filters out data from end users that have not consented to the category that you mapped to your connected destination. 

However, if you'd like to confirm that this behavior is working as intended, you can either [compare an end user profile against your mapped categories](#compare-an-end-user-profile-to-your-mapped-categories) or verify that [Delivery Overview](#use-delivery-overview) contains a`FILTERED_BY_END_USER_CONSENT` event. 

### Compare an end user profile to your mapped categories
To verify that your end user's consent preferences match the category that you mapped to your destination:

1. Navigate to the connected destination and select an end user profile. 
2. Return to Segment and compare the consent preferences of that profile against the consent category of the connected destination. 
3. Verify that the consent preferences of your selected user match the consent category that you mapped to your destination.

### Use Delivery Overview

You can use Delivery Overview to verify that your destination is enforcing your user's consent preferences by checking for the presence of a `FILTERED_BY_END_USER_CONSENT` discard reason. 

To verify that your events are being filtered by end user consent:
1. Select the destination connected your Engage Audience.
2. On the Delivery Overview page, select **Filtered at destination**. 
3. Search through the table of discarded events until you find an event with a discard reason of `FILTERED_BY_END_USER_CONSENT`.

If the discard reason `FILTERED_BY_END_USER_CONSENT` is present in the point in your data pipeline where your destination discards events, your destination is enforcing your end users' consent preferences appropriately. If you cannot find a `FILTERED_BY_END_USER_CONSENT` discard reason, either wait a few minutes for more events to flow to your destination before reviewing the discard reasons again or revisit the consent settings for your Unify space. 
