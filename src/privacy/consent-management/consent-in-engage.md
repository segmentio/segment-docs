---
title: Consent in Twilio Engage
plan: consent-management
---

Segment uses the [consent object](/docs/privacy/consent-in-unify/#segment-consent-preference-event) on Segment events, including the [Segment Consent Preference Updated](/docs/privacy/consent-in-unify/#segment-consent-preference-updated-event) Track event, to evaluate and store consent preferences on an end user's Profile. 

Once an end user's consent preferences are stored on their Profile, you can create Audiences that respect end user consent preferences to better comply with privacy regulations. 

> warning "Storing consent on the Profile is in private beta"
> Reach out to your sales contact or [request a demo](https://segment.com/contact/demo){:target="_blank"} to participate in the private beta.

## Enforce consent preferences in your Audience

### Prerequisites

Before using an end user's consent preferences to create your Audiences, you must complete the following prerequisites: 
- 

### Step 1: Enable consent in your Unify space

### Step 2: Create your Audience

> info "Consent preferences can affect Audience sync size" 
> The number of profiles that sync to your Audience depends on the number of end users that consented to their data being shared with the destinations connected to your Audience. 


## Verify that your Audiences respect consent preferences

After you've enabled consent management in your Unify space and created a new audience, Segment automatically filters out data from end users that have not consented to the category that you mapped to your connected destination. 

However, if you'd like to confirm that this behavior is working as intended, you can either [compare an end user profile against your mapped categories](#compare-an-end-user-profile-to-your-mapped-categories) or check Delivery Overview for a "filtered at destination" event. 

### Compare an end user profile to your mapped categories
To verify that your end user's consent preferences match the category that you mapped to your destination:

1. Navigate to the connected destination and select an end user profile. 
2. Return to Segment and compare the consent preferences of that profile against the consent category of the connected destination. 
3. Verify that the consent preferences of your selected user match the consent category that you mapped to your destination.

### Use Delivery Overview

You can use Delivery Overview to verify that your destination is enforcing your user's consent preferences. 

To 

