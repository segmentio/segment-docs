---
title: [SendGrid Lists (Actions)] Destination
---

{% include content/plan-grid.md name="actions" %}

[SendGrid Lists (Actions)](https://mc.sendgrid.com/contacts/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} help customers organize their email recipients into targeted groups, enabling them to send personalized, relevant content to specific audiences. This improves engagement, increases email deliverability, and streamlines campaign management.

This destination is maintained by Segment. For any issues with the destination [contact the Segment Support team](mailto:friends@segment.com).

## Getting started

**SendGrid Lists (Actions)** is designed to work with **Engage Audiences** only. The steps below outline how to create and connect the Destination to Engage and then to an Engage Audience. **SendGrid Lists (Actions)** is not designed to connect to regular Connections Sources. 

### Create a SendGrid API Key
1. Sign in to your SendGrid account, then navigate to **Settings** > **API Keys**.
2. Click **Create API Key** and follow the instructions to generate a new API key. Ensure Full Access permission is selected. 
3. Save the API key value securely, as you will need it in later steps.

### Create and connect 'SendGrid Lists (Actions)' to an Engage Space

1. From your Segment workspace's home page, click on **Engage** > **Engage Settings** > **Settings**. Click the **Add destination** button. 
2. Search for **SendGrid Lists (Actions)** and select its tile. Click **Add Destination** and then **Confirm Source**.
3. On the Basic Settings screen provide **Name** and **API Key** values in the specified fields. Enable the Destination. 

### Create a Mapping

1. From your Segment workspace's home page, click **Connections** > **Destinations**, then search for the **Destination** created in previous steps and click on its tile.
2. Click on **Mappings** > **New Mapping** > **Sync Audience** > **Save**. 
3. On the next screen, enable the Mapping using the **Status** toggle.

### Connect an Audience

1. From your Segment workspace's home page, navigate to the Audience you'd like to sync to SendGrid by clicking on **Engage** > **Audiences**, then selecting the Audience to connect. 
2. Click **Add Destination**, then search for the **SendGrid Lists (Actions)** instance you created earlier and select its tile. 
3. Enter a **List Name**, select **Default Setup**, and click **Save**. On the following screen, click **Add 1 Destination**. 

The **SendGrid Lists (Actions)** will now start to sync the **Engage Audience** to a **SendGrid List**.

{% include components/actions-fields.html %}


## Additional information

### Does Segment create Lists in SendGrid?
Segment automatically creates Lists in SendGrid. The List will be named with the value provided in the **Name** field. If no name is provided in the **Name** field Segment will default to using the Audience's **Audience Key** value. 

### Does Segment create new Contacts in SendGrid?
Segment will create Contacts in SendGrid if a Contact doesn't already exist.

### Will Segment delete Contacts from SendGrid?
Segment doesn't delete Contacts from SendGrid. If you remove a user from an Engage Audience, Segment does remove the Contact from the associated SendGrid List, but doesn't delete the Contact from SendGrid. 

### Sending additional user traits
Segment supports sending Engage user profile traits to SendGrid Contact User Attributes. The following additional manual configuration steps are required: 

1. Use [Trait Enrichment](/docs/engage/trait-activation/trait-enrichment/) to include specific user profile traits when syncing users to a SendGrid List. 
2. Standard User Attributes: Use the [Sync Audience Action](#sync-audience-action)'s User Attributes field to map the following [Contact Profile Fields](https://www.twilio.com/docs/sendgrid/ui/managing-contacts/segmenting-your-contacts#contact-profile-fields){:target="_blank”} to SendGrid:
 - First Name
 - Last Name
 - Address Line 1
 - Address Line 2
 - City
 - State/Province/Region
 - Country
 - Postal Code
3. Custom User Attributes: Define a custom User Attribute in SendGrid, then use [Sync Audience ](#sync-audience-action) Action to send custom User Attributes to SendGrid using the Custom Fields field. You can only send string, number, and date values to SendGrid with this method.

### Supported identifiers 
Segment can sync members of an Engage Audience to a SendGrid List using any of the following identifier types:
 - Email Address
 - Anonymous ID
 - Phone Number ID
 - External ID 
 
 To sync Engage users to a list using Anonymous ID, Phone Number ID, and External ID identifier types, complete the following configuration steps: 

1. Configure [ID Sync](/docs/engage/trait-activation/id-sync/) to include Anonymous ID, Phone Number ID, or External ID identifiers when syncing users from an Engage Audience to the SendGrid List. 
2. Map the Anonymous ID, Phone Number ID, and External ID identifiers using the [Sync Audience ](#sync-audience-action) Action's Anonymous ID, Phone Number ID, and External ID fields. 