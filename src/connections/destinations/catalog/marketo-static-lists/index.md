---
rewrite: true
title: Marketo Static Lists Destination
---

> note "Note on Marketo Destinations"
> This documentation is specifically about the Marketo Static Lists that is supported by Segment Personas. For documentation on other Marketo destinations, see the doc pages linked below. Marketo has strict API usage limits, and we strongly recommend using Personas with the Marketo *Static List* destination instead of the main Marketo destination.

| **Marketo Destination**                                          | **Supported by Personas** |
| ---------------------------------------------------------------- | ------------------------- |
| [Marketo V2](/docs/connections/destinations/catalog/marketo-v2/) | Yes - Event Destination   |
| Marketo Static Lists                                             | Yes                       |



## Overview

The Marketo Static Lists destination lets you sync audiences created using [Segment Personas](/docs/personas) into Marketo as a **List.** Once you create the audience, Segment sends that list of users to Marketo, and keeps it up to date as users enter and exit the audience specification.

This allows you to run email campaigns in Marketo without having to manually find and upload a refreshed a csv of users. This documentation explains how to set up Marketo in Segment, and what to expect in your Marketo UI.

**Note**: You must have access to Personas as part of your Segment plan to use this destination. [Contact our sales team](https://segment.com/demo/) to try this out.


## Quick Info

| **Support for Personas**                                                                | Yes                                                                                                                                                                               |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Personas Destination Method**                                                         | List                                                                                                                                                                              |
| **Must create audience_name field in the tool before Personas can update those values** | No. You do not have to create list in Marketo before Segment sends the audience to Marketo. However, you do need the pre-create the folder in which Segment will create the list. |
| **How does the audience appear within the destination?**                                | Marketo Lead Database → Group Lists → within a custom folder as a list                                                                                                            |
| **Are there rate limits?**                                                              | Yes, 100 calls per 20 seconds, which is shared among all third-party API services                                                                                                 |
| **Lookback window allowed by Destination**                                              | Yes                                                                                                                                                                               |
| **Identifiers Required**                                                                | email                                                                                                                                                                             |
| **Identifiers Accepted**                                                                | email                                                                                                                                                                             |
| **Client vs. Server-Side Connection**                                                   | Server-side                                                                                                                                                                       |

## Set up

> success "Good to know:"
> To set up Marketo to receive Personas data, you need Marketo administrator access. If you don’t have that access, work with the administrator for your organization.

**1. Create an API-Only Marketo user with both Access API and Lead Database access.**

- You can use an existing role with these permissions, or create a new role that has both Access API and Access Lead Database permissions. (Do this in Marketo by going to **Admin**→ **Users & Roles** → **Roles**).
![](https://paper-attachments.dropbox.com/s_922D4790BF2E567EEC7C01232A3E24E0813696324324CD76FD4EEC3A4E7110FE_1584417578779_Screen+Shot+2020-03-17+at+2.58.33+PM.png)



- Go to **Admin**→ **Users & Roles** → **Users** → **Invite New User** and create a new **API Only user** with the role that has both Access API and Lead Database permissions.


![](https://paper-attachments.dropbox.com/s_922D4790BF2E567EEC7C01232A3E24E0813696324324CD76FD4EEC3A4E7110FE_1584417717415_Screen+Shot+2020-03-17+at+3.00.44+PM.png)


**2. Create a** **Marketo Launchpoint Service for Segment Personas**

- Go to **Admin** → **Integrations**→ **Launchpoint** → **New**
- Create a new service. In the Service field, select `Custom`, and in the **API Only User** field, select the user you created in step 1.
- Write down the **Client Id** and **Client Secret** for this service, as you will need it in Step 4.


![](https://paper-attachments.dropbox.com/s_922D4790BF2E567EEC7C01232A3E24E0813696324324CD76FD4EEC3A4E7110FE_1584418128934_Screen+Shot+2020-03-17+at+3.07.57+PM.png)



3. **Create a Marketo Lead Database folder and g****et your** **Marketo Endpoint**
- Go to your Marketo Lead Database and create a new folder under Group Lists. Once connected, each Personas audience shows up as a list in this folder.


![](https://paper-attachments.dropbox.com/s_922D4790BF2E567EEC7C01232A3E24E0813696324324CD76FD4EEC3A4E7110FE_1584446964942_Screen+Shot+2020-03-17+at+3.16.01+PM.png)

- Before you continue to the next step, in Marketo, go to **Admin → Web Services**, and copy or write down the REST API Endpoint. You’ll need that in the next step.

Warning: Do not create a list in the folder for the audience. Segment creates the list for you!

**4****.** **Set up the Marketo Static Lists destination in Segment Personas**

- From your Segment workspace, go to **Personas → Destinations→ Add Destination** and then Search for Marketo Static Lists.
- In the destination settings, enter the **Client Id**, **Client Secret**, **Endpoint** and **Folder Name** ****from the LaunchPoint service and folder you created in Steps 2 and 3. For **Endpoint**, note the Endpoint from Step 3.
- Click the toggle to enable the Marketo Static Lists destination.



5. **Create Personas audiences and add Marketo Static Lists as a destination**
- Navigate to the Personas Audiences tab or go to  `https://app.segment.com/goto-my-workspace``/personas/audiences` and create a new audience.
- Give your audience a name, some event and trait criteria, then click **Preview**.
- Select Marketo Static Lists as a destination for the Audience.
> Note: Only users with an email address appear in the list in Marketo. Users with multiple email addresses as external ids appear in the list once for each email address.




![](https://paper-attachments.dropbox.com/s_922D4790BF2E567EEC7C01232A3E24E0813696324324CD76FD4EEC3A4E7110FE_1584532273298_Screen+Shot+2020-03-18+at+10.47.05+PM.png)


You can view the audience in Marketo by going to **Lead Database→ Group Lists→Name of folder you created in Step 3 → Audience name**



## How it works

**Every time** **you create** **an audience in Personas and connect** **it** **to** **Marketo Static Lists****,** ******Segment** **do****es** **the following:**

1. Creates a list with the same name as the Personas audience in the folder designated for Personas.
2. Adds any users to that list who fit the audience definition, and who also have an email address.
3. If a user has multiple email addresses on their identity graph, each email address becomes a unique entry on the list.
4. After the audience is configured, Segment checks which users still fit the audience definition, and adds or removes users from the audience, once every hour.


## Troubleshooting

**Not seeing an audience in** **Marketo**
Check that you followed all of the set-up steps.
Check that you didn’t create a list in the folder for the audience - Segment creates the list for you, and an existing one can conflict.
Check that the audience members you expect have an email address on their profile.

**Audience size** **is** **smaller than expected**
Only users in the audience who also have an email address are uploaded to the list. You might need to adjust your query to filter out users without an email so you can get a better estimate of how many users will appear on the list. In the example below, we added an AND condition where users have a Custom trait of `email` which `exists`.

![](https://paper-attachments.dropbox.com/s_922D4790BF2E567EEC7C01232A3E24E0813696324324CD76FD4EEC3A4E7110FE_1585015931841_Screen_Shot_2020-03-24_at_1_11_09_PM.png)


A user with multiple email addresses appears once per email address in the Marketo lists.
