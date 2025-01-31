---
title: CleverTap (Actions) Destination
hide-boilerplate: true
hide-dossier: true
id: 61d7456b078e79929de4ee8c
---


{% include content/plan-grid.md name="actions" %}

[CleverTap](https://clevertap.com/){:target="_blank"} is a retention cloud that empowers digital consumer brands to increase customer retention and lifetime value. CleverTap drives contextual individualization with the help of a unified and deep data layer, AI/ML-powered insights, and automation enabling brands to offer hyper-personalized and delightful experiences to their customers.

## Advantages of CleverTap (Actions) Destination
The following are the advantages of setting up CleverTap (Actions) Destination:
* Upload User Profile
* Delete User Profile

## Set up CleverTap (Actions) Destination
To set up CleverTap (Actions) Destination:

1. From the Segment web app, click **Catalog** and then click **Destinations**.
2. Select **Destinations Actions** under Categories from the left navigation.
3. Click **CleverTap (Actions)**.
4. Click **Configure CleverTap (Actions)**.
5. Select an existing **Source** to connect to CleverTap (Actions).
6. Enter the following project details to authorize the connection:
  * Project ID
  * Passcode
  * Region

   Find these details on the *Settings* > *Project* page of the CleverTap dashboard.
   To identify the region of your account, check the URL of your CleverTap account.

   Refer to the following table to identify the region for your account:

   | CleverTap Dashboard URL                                                                              | Region    |
   | ---------------------------------------------------------------------------------------------------- | --------- |
   | [https://eu1.dashboard.clevertap.com/login.html#/](https://eu1.dashboard.clevertap.com/login.html#/){:target="_blank"} | EU        |
   | [https://in1.dashboard.clevertap.com/login.html#/](https://in1.dashboard.clevertap.com/login.html#/){:target="_blank"} | IN        |
   | [https://us1.dashboard.clevertap.com/login.html#/](https://us1.dashboard.clevertap.com/login.html#/){:target="_blank"} | US        |
   | [https://sg1.dashboard.clevertap.com/login.html#/](https://sg1.dashboard.clevertap.com/login.html#/){:target="_blank"} | Singapore |

7. Select *Quick Setup* to start with pre-populated subscriptions, or *Customized Setup* to configure each action from scratch.
8. Click **Configure Actions**.

{% include components/actions-fields.html %}

## Conversion Timestamps
When mapping actions, you will see a *Convert Timestamps* setting. When enabled, it converts attributes containing ISO-8601 timestamps to Unix timestamps.

For example, if you send an event with a timestamp of 2006-01-02T18:04:07Z. It is converted to 1136253847. If the timestamp is not in ISO-8601 format, it is not converted. This avoids converting attributes such as phone numbers or IDs.
