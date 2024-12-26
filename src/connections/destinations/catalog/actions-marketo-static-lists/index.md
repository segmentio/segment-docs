---
title: Marketo Static Lists (Actions) Destination
hide-boilerplate: true
strat: adobe
id: 65302a514ce4a2f0f14cd426
---
> info "Marketo Static Lists vs Marketo Static Lists (Actions) Destinations"
>
> Marketo Static Lists (Actions) is a rebuild of the classic destination that provides the following benefits:
> 
> - **Streamlined setup process** - Marketo Static Lists (Actions) has a streamlined default setup process, making it faster to get started in a way that "just works".
> - **More control** - Actions-based destinations allow you to define the mapping between the data Segment receives from your sources, and the data Segment sends to Marketo.
> - **Default property mappings** - Default mappings from the Segment like event, timestamp, and more allows data to be mapped correctly without any setup required.

## Overview

The Marketo Static Lists (Actions) destination lets you sync users into Marketo as a **List**, allowing you to run email campaigns in Marketo without having to manually find and upload a refreshed csv of users. This documentation explains how to set up Marketo in Segment, and what to expect in your Marketo UI.

## Details

- **Supports Engage**: Yes
- **Supports RETL**: Yes
- **Engage Destination type**: List
- **Must create audience_name field before Engage can update those values?**: No. You don't need to create the _list_ in Marketo, however you do need to create the folder Segment will create the list in.
- **Audience appears as**: A list in the folder you created, in the Marketo Lead Database under Group Lists.
- **Destination rate limit**: 100 calls per 20 seconds, which is shared among all third-party API services
- **Lookback window allowed**: Yes
- **Client or Server-Side Connection**: Server-side

> info "Real-time to batch destination sync frequency"
> You can expect a sync frequency of 15 to 18 hours for real-time audience connections to Marketo Static Lists (Actions).

## Configuring Marketo Static Lists

> success "Good to know:"
> To set up Marketo, you need Marketo administrator access. If you don't have that access, work with the administrator for your organization.

### Step 1: Create an API-Only Marketo user

In this step, you'll create an API-Only Marketo user with both Access API and Lead Database access.

1. You can use an existing role with these permissions, or create a new role that has both Access API and Access Lead Database permissions. (Do this in Marketo by going to **Admin**→ **Users & Roles** → **Roles**).
2. Go to **Admin** → **Users & Roles** → **Users** → **Invite New User** and create a new **API Only user** with the role that has both Access API and Lead Database permissions. **Be sure to check the API Only box.**

### Step 2: Create a Marketo Launchpoint Service

1. Go to **Admin** → **Integration** → **LaunchPoint** → **New**
2. Create a new service. In the Service field, select `Custom`, and in the **API Only User** field, select the user you created in step 1.
3. Write down the **Client Id** and **Client Secret** for this service, as you will need it when configuring the destination settings.

### Step 3: Create a Marketo Lead Database folder and get your Marketo Endpoint

1. Go to your Marketo Lead Database, and create a new folder under Group Lists. After connecting, each Engage audience shows up as a list in this folder.

2. Before you continue to the next step, in Marketo, go to **Admin → Web Services**, and copy or write down the REST API Endpoint. **Be sure to copy the REST endpoint and not the SOAP endpoint.** You'll need that in the next step.

> warning "Warning:"
> Do not create a list in the folder for the audience. Segment creates the list for you!

### Using Marketo Static Lists (Actions) with the Event Tester
This destination keeps track of a `List Id` field for you on the backend. That field is added to payloads as Segment processes them. This means that the Event Tester can't be used out-of-the-box as it can with most destinations. To test an event using the Event Tester for Marketo Static Lists (Actions), you'll need to add a valid `List Id` to the payload at the `context.personas.external_audience_id` key.

### Using Marketo Static Lists (Actions) destination with Engage

1. From your Segment workspace, go to **Engage → Engage Settings → Destinations → Add Destination**, and then Search for Marketo Static Lists (Actions).
2. In the destination settings, enter the **Client Id**, **Client Secret**, **Endpoint**, and **Folder Name** from the LaunchPoint service and folder you created in Steps 2 and 3. For **Endpoint**, note the Endpoint from Step 3 above.
3. Select the toggle to enable the Marketo Static Lists (Actions) destination.
4. Navigate to the **Mappings** tab, click **Add Mapping**, and select **Add to List**. 
6. Click **Save**, and make sure to enable the mapping. 
7. On the **Mappings** tab, click **Add Mapping**, and select **Remove from List**. 
8. Click **Save**, and make sure you enable the mapping. 
9. Navigate to the Engage Audiences tab, and create a new audience.
10. Give your audience a name, some event and trait criteria, then click **Preview**.
11. Select **Marketo Static Lists** as a destination for the Audience.
12. In the settings that appear in the side panel, toggle the **Send Track** option on, and don't change the **Audience Entered/Audience Exited** event names.
13. Click **Save Settings**.

### Using Marketo Static Lists (Actions) destination with RETL

1. Navigate to your data warehouse, and add Marketo Static Lists (Actions) as a destination.
2. From your model, click **Add Mapping**, and select your Marketo Marketo Static Lists (Actions) destination, and the **Add to List** Action.
3. If you already have a list created in Marketo, fill in the List ID field. If you want Segment to create a list in Marketo, fill in the List name field. 
4. Finish setting up the rest of the action.
5. Click **Save Mapping**.

When you save the mapping, a list is created in Marketo. You can update the list the mapping syncs to at any time. 

> info ""
> Only users with an email address appear in the list in Marketo. Users with multiple email addresses as external ids appear in the list once for each email address.

You can view the audience in Marketo by going to **Lead Database→ Group Lists→Name of folder you created in Step 3 → Audience name**

{% include components/actions-fields.html %}

## Troubleshooting

#### Not seeing an audience in Marketo?
Check that you followed all of the set up steps. Wait six or more hours after setup for your audience to start appearing in Marketo. Check that you didn't create a list in the folder for the audience - Segment creates the list for you, and an existing one can conflict. Check that the audience members you expect have an email address on their profile.

#### Audience size is smaller than expected
Only users in the audience who also have an email address are uploaded to the list. You may need to adjust your query to filter out users without an email so you can get a better estimate of how many users will appear on the list. In the example below, we added an AND condition where users have a Custom trait of `email` which `exists`.

If a user has multiple email addresses, each address appears once in the Marketo list. 
