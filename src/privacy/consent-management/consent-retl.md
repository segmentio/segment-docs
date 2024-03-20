---
title: Consent in Reverse ETL
plan: consent-management
related:
  - "/privacy/consent-management/"
  - "/privacy/consent-management/configure-consent-management/"
  - "/privacy/consent-management/consent-in-segment-connections/"
  - "/privacy/consent-management/consent-in-unify"
---

With Consent Management in RETL, you can enforce your end-users' consent preferences that are captured by your consent management platform (CMP) and stored in your warehouse. 

You can enforce consent stored in warehouse data using one of the following methods: 
- **Filter the model based on consent preferences**: Filtering the data based on consent preferences is only possible for users who set up a model after they configured Consent Management in Segment. This method also limits how you can use your warehouse data, as the model can't be used for multiple use cases where consent flows to destinations mapped to multiple categories
- **Configure consent using the procedure outlined below**: Find a name for this procedure, provide limitations, etc. 

### Prerequisites
- A way of capturing end-user consent
- End-user consent stored in a warehouse that [Segment supports for RETL](/docs/connections/reverse-etl/#step-1-add-a-source)


### Step 1: Create consent categories in the Segment app

> info "Limited availability of destinations"
> AWS S3, RETL, and Engage destinations do not enforce consent preferences. 

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
> Segment assumes all destinations without a mapping do not require user consent and will receive all events containing a consent object. If a destination is mapped to multiple categories, a user must consent to all categories for data to flow to the destination.