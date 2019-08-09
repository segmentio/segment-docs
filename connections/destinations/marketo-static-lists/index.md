---

---

## Overview

The Marketo Static Lists destination lets you sync audiences created using [Segment Personas](/docs/personas) into Marketo as a **List**. Once you've created the audience, Segment sends that list of users to Marketo and keeps it up to date as users enter and exit the audience specification.

This allows you to run email campaigns in Marketo without having to bug your data or engineering team for a csv of users. This doc explains how to set up Marketo in Segment, and what to expect in your Marketo UI. Note that you must add Personas to your Segment plan to use this destination. Please [contact our sales team](https://segment.com/contact/demo) if you want to try this out.

## Getting Started

### 1. Enter your Marketo Credentials into your Destination settings. You'll need your Client Secret, and Client ID, service endpoint, and folder name

To get your Client Secret and Client ID, you must first create a role that can access the API and the Lead Database, and then create a Service in Marketo. Note that this access is different than the Marketo event destination, which only requires API access.

To create a role with full API access:

1. Click Admin in the top right corner.
2. Click Users & Roles on the left side bar.
3. Click on the Roles tab.
4. Click New Role. Name your role and check the API Access & Lead Database boxes. Click Create.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_0CECB4C5BE2DE2EC3E89C2B2329005B7605E1BB0AD39D650A563F63DC1401240_1535049072312_Screen+Shot+2018-08-23+at+11.30.37+AM.png)


Now that you've created an API role, you have to assign that role to an API only user.

1. Click the Users tab.
2. Click Invite New User and fill out the necessary information in Step 1.
3. Assign the new role you created to this user in Step 2. Click next then Send.

Next, create a Service and get Client Secret and Client ID from that Service.

1. Click LaunchPoint on the left side bar.
2. Click New and then New Service from the drop down.
3. Select Custom for the Service from the drop down.
4. Select the new user you invited.
5. Click View Details on the new service that you've created and a small window will display with your Client Secret and Client ID. Copy and paste them into your Destination's Settings.
![](https://cloudup.com/c3s0qJ-dDSO+)
6. Finally, go to your Lead Database and create a folder under Group Lists. Copy the name of this folder into your Destination Settings in Personas.


### 2. Create an audience in Segment & connect to Marketo

1. Go to `https://app.segment.com/<your-workspace-slug>/personas/audiences` & create a new audience
2. Give your audience a name, some event and trait criteria, then click Preview
3. Connect your audience to Marketo
4. Give your audience a name, and hit create


### 3. Check Marketo for audience, should sync within a couple of minutes

1. Go back into your Lead Database > Group Lists, and select the folder you configured
2. Under People, click on 'View Members of this list' to inspect list members

## Troubleshooting

### Not seeing an audience in Marketo

Make sure you have configured the right service, API user with Lead Database access, and that you have enabled the Marketo Static Lists destination. You can review these settings here: https://app.segment.com/<your_workspace_slug>/destinations/marketo-static-lists/sources/personas_default/configuration. Note that we also have a Marketo event destination which updates user traits. Given Marketo's low API limits, we do not recommend that you use this event destination to send audiences to Marketo.
