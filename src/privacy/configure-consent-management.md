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

> error "After adding the consent object to your events, your data is immediately impacted"
> If you disable a consent category, events are not sent to mapped destinations.
>  
> If a destination is mapped to multiple categories, and the end user has conflicted preferences, data will be sent to the destination.
> 
> If Segment receives an API call with both an integrations object and a consent object, the consent object takes preference.

## Step 1: Access the Consent Management feature

## Step 2: Create consent categories 

> info "Segment recommends mapping all destinations to a category"
> Each destination should be mapped to a category <!---why though?---> to ensure completeness of data in your downstream destinations. Any destination that doesn't have a mapping will not receive events with a consent object. 

## Step 3: 

## Ingesting consent data