---
title: Personas Facebook Ads
---

## Overview

The destination lets you sync audiences created through [Segment Personas](/docs/personas) into Facebook Custom Audiences as a **User-List**. Once you've created the audience, Segment will take care of sending that list of users to Facebook and keeping it up to date as users enter and exit the audience specification.

This will allow you to run advertising campaigns in Facebook without having to bug your data or engineering team for a csv of users. This doc lays out how authorize Facebook in Segment, how to create an audience, and what to expect in your Facebook Ads UI. Note that you must add Personas to your Segment plan to use this destination. Please [contact](https://segment.com/contact/demo) our sales team if you want to try this out.

**Use Cases**

* [Retarget users on Facebook by potential return on ad spend (ROAS)](https://segment.com/recipes/facebook-retargeting-by-roas/)

## Getting Started


### 1. Authorize Facebook Custom Audiences
![](images/facebook_auth.gif)


Steps:
- Go to `https://app.segment.com/<your-workspace-slug>/destinations/catalog/personas-facebook-ads`
- Configure FB on the personas source that we’ve pre-created for you (should be called `Personas default`)
- Authorize Facebook Ads (NOTE: If you’ve already authorized FB before in your Segment workspace, the flow will skip the part where it redirects to Facebook to authorize Segment)
![](images/_1515622618588.png)
- Make sure that you select a Facebook ad account id to sync to. *Note that you should have ad account 'Advertiser' or 'Admin' access for Personas to be able to send custom audiences*.


### 2. Create an audience in Segment & connect to Facebook
![](images/facebook_setup.gif)


Steps:
- Go to `https://app.segment.com/<your-workspace-slug>/personas/audiences` & create a new audience
- Give your audience a name, some event and trait criteria, then click Preview
- Connect your audience to Facebook
- Give your audience a name, and hit create


### 3. Check FB for audience, should sync within a couple of minutes
![](http://g.recordit.co/njhDdn1o3E.gif)


- Inside Facebook go to Business Manager > All tools > Assets > Audiences
- Click on the audience with the same name as in the Segment UI, and check the Audience History for how many users have been added
- NOTE: our Facebook Custom Audiences integration supports matching users based off of email, and their mobile advertising identifiers (IDFA, Google advertising id)

## Troubleshooting

### Not seeing an audience in Facebook

Make sure you have authorized Facebook and selected an account id. You can review & re-authorize this connection directly here: https://app.segment.com/<your_workspace_slug>/destinations/personas-facebook-ads/sources/personas_default/configuration

### Audience size smaller than expected

We attempt to match users in your audience with the identifiers that Facebook supports. This includes email, and their mobile advertising identifiers (IDFA, Google advertising id). Please ensure you are tracking these through Segment to have a successful match rate in Facebook.

## FAQ

## How do lookalikes work?

You can create a seed audience in Personas and then sync that to Facebook. For example, you might want to create a group of high-value users that have spent a certain amount of money on your product. In Facebook, you can then create a lookalike based on that audience.
