---
title: Configure Consent Management
---
> info "Consent Management is currently in private beta"
> This means that the Consent Management features are in active development, and some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.
>
> During the private beta, Consent Management only supports website sources and event streaming destinations. All other sources and destinations are not impacted.

After setting up a third-party consent management platform (CMP,) you can enforce the consent collected from your users by configuring consent categories in your your Segment workspace and adding the [consent object](/docs/privacy/consent-management/#consent-object) to your web libraries. After you've configured consent in the Segment app, your events will be routed only to those streaming destinations consented to by your users.

<!--- note to include: how to find your category ID in tools other than onetrust-->
<!--- Folks need to do some prereq setup, there are two docs - read through and setup ourselves before including information -->

## Prerequisites

Before you can configure consent in Segment, take the following steps:
- **Access your consent management tool and set up consent categories**. You need a list of your consent categories and the key or ID associated with each topic.
- **Know how your company maps each destination**. You need to know which destinations map to which categories. 
- **Update your web libraries with the consent object**. You need access to your web libraries so you can include the consent object in every event.

## Step 1: Create consent categories

<!-- Add note that category ID is case sensitive--->

1. From the [Segment homepage](https://app.segment.com/goto-my-workspace/){:target="_blank”}, select the Privacy tab and click **Consent Management**.
2. On the Consent management page, click **Get started**.
3. 


## Step 2: Map destinations to consent categories

<br/>
> warning "Segment recommends mapping all destinations to a category"
> Any destination that doesn't have a mapping won't receive events with a consent object. 


## Step 3: Add the consent object to your web libraries


> error "After adding the consent object to your events, your data is immediately impacted"
> If you disable a consent category, events are not sent to mapped destinations.
>  
> If a destination is mapped to multiple categories, and the end user has conflicting preferences, data will be sent to the destination.
> 
> If Segment receives an API call with both an integrations object and a consent object, the consent object takes preference.

## Ingesting consent data