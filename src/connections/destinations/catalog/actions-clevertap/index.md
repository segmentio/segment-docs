---
# The end name should be similar to `Slack  Destination`
title: CleverTap (Actions)
hide-boilerplate: true
hide-dossier: true
---

<!-- This template is meant for Actions-based destinations that do not have an existing Classic or non-Actions-based version. For Actions Destinations that are a new version of a classic destination, see the doc-template-update.md template. -->

{% include content/plan-grid.md name="actions" %}

<!-- Include a brief description of the destination here, along with a link to your website. -->

<!-- This include describes the requirement of A.js 2.0 or higher for Actions compatibility, and is required if your destination has a web component. -->

{% include content/ajs-upgrade.md %}

<!-- In the section below, explain the value of this actions-based destination. If you don't have a classic version of the destination, remove this section. -->

# Overview

[CleverTap](https://clevertap.com/) is the World’s No.1 retention cloud that empowers digital consumer brands to increase customer retention and lifetime value. CleverTap drives contextual individualization with the help of a unified and deep data layer, AI/ML-powered insights, and automation enabling brands to offer hyper-personalized and delightful experiences to their customers.

# Advantages of CleverTap (Actions) Destination
The following are the advantages of setting up CleverTap (Actions) Destination:
* Upload User Profile
* Delete User Profile

# Set up CleverTap (Actions) Destination
To set up CleverTap (Actions) Destination:

1. From the Segment web app, click **Catalog** and then click **Destinations**.
2. Select *Destinations Actions* under Categories from the left navigation.

   <kbd> <img width="600" alt="Navigation" src="https://user-images.githubusercontent.com/116852355/198419599-bd9322bc-4410-4a30-b7bd-5309c01a7ff3.png" style="border: 1px solid black"> </kbd>
3. Click *CleverTap (Actions)*.
4. Click **Configure CleverTap (Actions)**.

   <kbd><img width="600" alt="Click Configure CleverTap Action" src="https://user-images.githubusercontent.com/116852355/199408316-3ba4d30b-255c-4899-ba73-ba8878ec0606.png"></kbd>

5. Select an existing *Source* to connect to CleverTap (Actions).
6. Enter the following project details to authorize the connection:
  * Project ID
  * Passcode
  * Region

   These details are obtained by navigating to the *Settings* > *Project* page of the CleverTap dashboard.
   To identify the region of your account, check the URL of your CleverTap account.

    <kbd> <img width="600" alt="CT_Project_Details" src="https://user-images.githubusercontent.com/116852355/198419815-d2565bbe-6a5e-4b31-8b2a-364872ba01a9.png"> </kbd>

   Refer to the following table to identify the region for your account:

   | CleverTap Dashboard URL | Region |
      | --- | --- |
   | [https://eu1.dashboard.clevertap.com/login.html#/](https://eu1.dashboard.clevertap.com/login.html#/) | EU |
   | [https://in1.dashboard.clevertap.com/login.html#/](https://in1.dashboard.clevertap.com/login.html#/) | IN |
   | [https://us1.dashboard.clevertap.com/login.html#/](https://us1.dashboard.clevertap.com/login.html#/) | US |
   | [https://sg1.dashboard.clevertap.com/login.html#/](https://sg1.dashboard.clevertap.com/login.html#/) | Singapore |

7. Select *Quick Setup* to start with pre-populated subscriptions, or *Customized Setup* to configure each action from scratch.
8. Click **Configure Actions**.

# Available Presets
CleverTap (Actions) has the following presets:

| Preset Name | Trigger |  Default Action |
| --- | --- | --- |
| User Upload | Event type = "identify" | Uploads User Profile to CleverTap dashboard |
| User Delete | Event event = "delete user" | Deletes user profile |

# Available Actions
Combine supported triggers with the following CleverTap-supported actions:

## User Upload
Create a profile on the CleverTap dashboard or update it if it exists.

| Field | Type | Description |
| --- | --- | --- |
| Identity | String | <ul><li>This field is mandatory.</li><li>It is used to recognize a unique user.</li><li>It can be the user’s email, a phone number, or any other identifier that you are using to tag your users.</li></ul> |
| Created At | ts | <ul><li>This field is optional.</li><li>It denotes the date and time when the user profile was created.</li><li>Defaults to the current timestamp, if omitted.</li><li>For more information about converting this timestamp to Unix timestamps, refer to [Conversion Timestamps](#conversion-timestamps).</li></ul> |
| Person Attributes | object | <ul><li>This field is mandatory.</li><li>It consists of user profile properties.</li><li>It is passed as key/value pairs.</li><li>properties[“Phone”] must be formatted as +[country code][phone number].</li></ul> |

## Delete User
Deletes the user profile on the CleverTap dashboard.

| Field | Type | Description |
| --- | --- | --- |
| Identity | String | <ul><li>This field is mandatory.</li><li>It is used to recognize a unique user.</li><li>It can be the user’s email, a phone number, or any other identifier that you are using to tag your users.</li></ul> |

# Conversion Timestamps
When mapping actions, you will see a *Convert Timestamps* setting. When enabled, it converts attributes containing ISO-8601 timestamps to Unix timestamps.

For example, if you send an event with a timestamp of 2006-01-02T18:04:07Z. It is converted to 1136253847. If the timestamp is not in ISO-8601 format, it is not converted. This avoids converting attributes such as phone numbers or IDs.
