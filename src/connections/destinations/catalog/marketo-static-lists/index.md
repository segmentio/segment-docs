---
title: Marketo Static Lists Destination
hide-boilerplate: true
strat: adobe
id: 5b73515e6170785a5e62978c
---
> info "Marketo vs Marketo Static Lists Destinations"
> This page is about the **Marketo Static Lists** destination developed specifically for use with Engage. Marketo has strict API usage limits on the [main Marketo destination](/docs/connections/destinations/catalog/marketo-v2/), so although the main destination can receive events from Engage, use the Marketo *Static Lists* destination with Engage instead.

## Overview

The Marketo Static Lists destination lets you sync audiences created using [Engage](/docs/engage) into Marketo as a **List**. Once you create the audience, Segment sends that list of users to Marketo, and keeps it up to date as users enter and exit the audience specification.

This allows you to run email campaigns in Marketo without having to manually find and upload a refreshed csv of users. This documentation explains how to set up Marketo in Segment, and what to expect in your Marketo UI.


## Details

- **Supports Engage**: Yes
- **Engage Destination type**: List
- **Must create audience_name field before Engage can update those values?**: No. You don't need to create the _list_ in Marketo, however you do need to create the folder Segment will create the list in.
- **Audience appears as**: A list in the folder you created, in the Marketo Lead Database under Group Lists.
- **Destination rate limit**: 100 calls per 20 seconds, which is shared among all third-party API services
- **Lookback window allowed**: Yes
- **Identifiers required**: Email
- **Identifiers accepted**: Email
- **Client or Server-Side Connection**: Server-side


## How it works

Every time you create an audience in Engage and connect it to Marketo Static Lists, Segment does the following:

1. Creates a list with the same name as the Engage audience in the folder designated for Engage.
2. Adds any users to that list who both fit the audience definition and have an email address.
3. If a user has multiple email addresses on their identity graph, each email address becomes a unique entry on the list.
4. After the audience is configured, Segment checks which users still fit the audience definition, and adds or removes users from the audience.
{% include content/sync-frequency-note.md %}

## Configuring Marketo Static Lists

> success "Good to know:"
> To set up Marketo to receive Engage data, you need Marketo administrator access. If you don't have that access, work with the administrator for your organization.

### Step 1: Create an API-Only Marketo user

In this step, you'll create an API-Only Marketo user with both Access API and Lead Database access.

1. You can use an existing role with these permissions, or create a new role that has both Access API and Access Lead Database permissions. (Do this in Marketo by going to **Admin**→ **Users & Roles** → **Roles**).

   ![A screenshot of the Marketo Create New Role popup.](images/marketosl-create-new-role.png)

2. Go to **Admin**→ **Users & Roles** → **Users** → **Invite New User** and create a new **API Only user** with the role that has both Access API and Lead Database permissions. **Be sure to check the API Only box.**

   ![A screenshot of the Marketo Invite New User page, with the roles Marketo Static List and API only selected.](images/marketosl-perms.png)


### Step 2: Create a Marketo Launchpoint Service for Engage

1. Go to **Admin** → **Integration**→ **LaunchPoint** → **New**
2. Create a new service. In the Service field, select `Custom`, and in the **API Only User** field, select the user you created in step 1.
3. Write down the **Client Id** and **Client Secret** for this service, as you will need it in Step 4.

![A screenshot of the New Service popup in Marketo.](images/marketosl-newservice.png)



### Step 3: Create a Marketo Lead Database folder and get your Marketo Endpoint

1. Go to your Marketo Lead Database and create a new folder under Group Lists. Once connected, each Engage audience shows up as a list in this folder.


   ![A screenshot of the Marketo Lead Database, with a New Folder menu item selected.](images/marketosl-newfolder.png)

2. Before you continue to the next step, in Marketo, go to **Admin → Web Services**, and copy or write down the REST API Endpoint. **Be sure to copy the REST endpoint and not the SOAP endpoint.** You'll need that in the next step.

> warning "Warning:"
> Do not create a list in the folder for the audience. Segment creates the list for you!

### Step 4: Set up the Marketo Static Lists destination in Engage

1. From your Segment workspace, go to **Engage → Engage Settings → Destinations→ Add Destination** and then Search for Marketo Static Lists.
2. In the destination settings, enter the **Client Id**, **Client Secret**, **Endpoint** and **Folder Name** from the LaunchPoint service and folder you created in Steps 2 and 3. For **Endpoint**, note the Endpoint from Step 3.
3. Click the toggle to enable the Marketo Static Lists destination.

### Step 5: Create Engage audiences and add Marketo Static Lists as a destination

1. Navigate to the Engage Audiences tab and create a new audience.
2. Give your audience a name, some event and trait criteria, then click **Preview**.
3. Select Marketo Static Lists as a destination for the Audience.

> info ""
> Only users with an email address appear in the list in Marketo. Users with multiple email addresses as external ids appear in the list once for each email address.

![A screenshot of the Marketo Lead Database Audience page.](images/marketosl-leads.png)

You can view the audience in Marketo by going to **Lead Database→ Group Lists→Name of folder you created in Step 3 → Audience name**


## Troubleshooting

#### Not seeing an audience in Marketo

Check that you followed all of the set-up steps.

Wait six or more hours after setup for your audience to start appearing in Marketo.

Check that you didn't create a list in the folder for the audience - Segment creates the list for you, and an existing one can conflict.

Check that the audience members you expect have an email address on their profile.

#### Audience size is smaller than expected
Only users in the audience who also have an email address are uploaded to the list.

You might need to adjust your query to filter out users without an email so you can get a better estimate of how many users will appear on the list. In the example below, we added an AND condition where users have a Custom trait of `email` which `exists`.

![A screenshot of the Audiences page in Segment.](images/personas-add-emailtrait.png)

If a user has multiple email addresses, each address appears once in the Marketo lists. 
