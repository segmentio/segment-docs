---
title: Configure Consent Management
---
> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

<!--- note to include: how to find your category ID in tools other than onetrust-->

## Prerequisites

Before you can configure consent in Segment, you'll need to take the following steps:
- **Access your consent management tool**. You'll need a list of your consent categories and the key or ID associated with each topic.
- **Know how your company maps each destination**. You'll need to know which destinations map to each categories. 
- **Update your web libraries with the consent object**. To ensure Segment is receiving your end-user consent preferences, you'll need access to your web libraries so you can include the consent object to every event.

<!-- Ask Aaron about consent object order of ops/can it be tested??? Can you undo or pause this?? -->

> error "After adding the consent object to your events, your data is immediately impacted"
> If you disable a consent category, events are not sent to mapped destinations.
>  
> If a destination is mapped to multiple categories, and the end user has conflicting preferences, data will be sent to the destination.
> 
> If Segment receives an API call with both an integrations object and a consent object, the consent object takes preference.

<!-- does this need to be added to multiple pages-->

## Step 1: Create consent categories

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent management page, click **Get started**.
3. 


<br/>
> warning "Segment recommends mapping all destinations to a category"
> Any destination that doesn't have a mapping won't receive events with a consent object. 

<!-- does it get backfilled???--->

## Step 2: 


## Step 3: 

## Ingesting consent data