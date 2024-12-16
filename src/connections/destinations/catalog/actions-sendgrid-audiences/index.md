---
title: SendGrid Lists (Actions) Destination
engage: true
id: 67338e95bf70aed334093dae
hidden: true
---

{% include content/plan-grid.md name="actions" %}

[SendGrid Lists (Actions)](https://mc.sendgrid.com/contacts/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} helps customers organize their email recipients into targeted groups, enabling them to send personalized, relevant content to specific audiences. This improves engagement, increases email deliverability, and streamlines campaign management.

This destination is maintained by Segment. For any issues with the destination, [contact the Segment Support team](mailto:friends@segment.com).

## Getting started

SendGrid Lists (Actions) is designed to work with Engage Audiences only. The steps below outline how to create and connect the Destination to Engage and then to an Engage Audience. SendGrid Lists (Actions) is not designed to connect to Connections Sources. 

### Create a SendGrid API Key
1. Sign in to your SendGrid account, then navigate to **Settings** > **API Keys**.
2. Click **Create API Key** and follow the instructions to generate a new API key. Be sure to grant the API key **Full Access** permission. 
3. Save the API key value in a secure location, as you will need it in later steps.

### Connect a SendGrid Lists (Actions) destination to an Engage Space

1. From your Segment workspace's home page, navigate to **Engage** > **Engage Settings** > **Settings** and click **Add destination**. 
2. Search for SendGrid Lists (Actions) and select the SendGrid Lists (Action) tile. Click **Add Destination** and **Confirm Source**.
3. On the Basic Settings screen, provide **Name** and **API Key** values in the specified fields, toggle "Enable destination" to on, and then click **Save Changes**. 

### Create a Mapping

1. From your Segment workspace's home page, click **Connections** > **Destinations** and select the SendGrid Lists (Actions) destination you previously created.
2. Click on **Mappings** > **New Mapping** > **Sync Audience** > **Save**. 
3. On the next screen, enable the Mapping using the **Status** toggle.

### Connect an Audience

1. From your Segment workspace's home page, navigate to **Engage** > **Audiences** and select the Audience you'd like to sync to SendGrid. 
2. Click **Add Destination**, and select the SendGrid Lists (Actions) destination you previously created.
3. Enter a **List Name**, select **Default Setup**, and click **Save**. When prompted, select **Add 1 Destination**. 

The SendGrid Lists (Actions) destination will now start to sync your Engage Audience to a SendGrid List.

{% include components/actions-fields.html %}


## Troubleshooting

### Does Segment create Lists in SendGrid?
Segment automatically creates Lists in SendGrid. If you provide a value in the **Name** field, Segment names the List the value you provided. If you do not provide a name in the  **Name** field, Segment gives the List the Engage Audience's **Audience Key** value. 

### Does Segment create new Contacts in SendGrid?
Segment creates Contacts in SendGrid if a Contact doesn't already exist for the user.

### Does Segment delete Contacts from SendGrid?
Segment doesn't delete Contacts from SendGrid. If you remove a user from an Engage Audience, Segment does remove the Contact from the associated SendGrid List, but doesn't delete the Contact from SendGrid. 

## Best practices

### Sending additional user traits
Segment supports sending Engage user profile traits to SendGrid Contact User Attributes. The following additional manual configuration steps are required: 

1. Use [Trait Enrichment](/docs/engage/trait-activation/trait-enrichment/) to include specific user profile traits when syncing users to a SendGrid List. 
2. Standard User Attributes: Use the [Sync Audience Action](#sync-audience-action)'s User Attributes field to map the following [Contact Profile Fields](https://www.twilio.com/docs/sendgrid/ui/managing-contacts/segmenting-your-contacts#contact-profile-fields){:target="_blank”} to SendGrid:
 - First Name
 - Last Name
 - Phone Number (must be in [E.164](https://www.twilio.com/docs/glossary/what-e164) format)
 - Address Line 1
 - Address Line 2
 - City
 - State/Province/Region
 - Country
 - Postal Code
3. Custom User Attributes: Define a custom User Attribute in SendGrid, then use [Sync Audience ](#sync-audience-action) Action to send custom User Attributes to SendGrid using the Custom Fields field. You can only send string, number, and date values to SendGrid with this method.

### Supported identifiers 
At least one of the following identifier types is required when syncing members of an Engage Audience to a SendGrid List:
 - Email Address (must be a valid email address)
 - Anonymous ID
 - Phone Number ID (must be in [E.164](https://www.twilio.com/docs/glossary/what-e164) format)
 - External ID 
 
To sync Engage users to a list using Anonymous ID, Phone Number ID, and External ID identifier types, complete the following configuration steps: 

1. Configure [ID Sync](/docs/engage/trait-activation/id-sync/) to include Anonymous ID, Phone Number ID, or External ID identifiers when syncing users from an Engage Audience to the SendGrid List. 
2. Map the Anonymous ID, Phone Number ID, and External ID identifiers using the [Sync Audience ](#sync-audience-action) Action's Anonymous ID, Phone Number ID, and External ID fields. 