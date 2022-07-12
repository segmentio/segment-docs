---
title: Public Beta Checklist
---

> info ""
> The Developer Center is currently not accepting new components. Segment is committed to redeveloping the Developer Center and a new version will be launched in the future. Include [your information here](https://airtable.com/shrvZzQ6NTTwsc6rQ){:target="_blank"} to join the waitlist!


The purpose of this checklist is to give you a window into the full integration lifecycle, from how you first get started with Developer Center, to how we'll test your app before it goes live.

## 1. Partner Access

First you will need a Segment account and access to Dev Center.

Start on the [Developer Center Partner page](https://airtable.com/shrvZzQ6NTTwsc6rQ) to request access during sign-up. If you already have an account you can log in and go to the [request access to developer center](https://airtable.com/shrvZzQ6NTTwsc6rQ) page.

Make sure to sign up with your company email address and to answer all the survey questions to expedite approval.

- Create Segment account and request access for Dev Center ([link](https://airtable.com/shrvZzQ6NTTwsc6rQ))


- Complete partner survey
    - Company Name
    - Company Website
    - How do your customers get data into your tool?
    - Where will data sent by Segment go and how will it show up in your tool?
    - Explain what your customers use your tool to do
    - How did you hear about Segment?


- Agree to the [Segment Partner Program Agreement](https://segment.com/legal/partnersagreement/) and [Privacy Policy](https://segment.com/legal/privacy/)

While waiting for approval (~1 business day), we encourage you to:

- Try Segment
- [Read partner docs](https://segment.com/docs/partners/)

## 2. Segment Access Approval

To maintain the quality of the partner integrations catalog, Segment reviews partner companies before gaining access. We will verify that you:

- Represent a legitimate company
- Have use cases that align with the Segment platform
- Have a service that can integrate with Segment
- Are not a Segment customer or security researcher

## 3. Segment → Partner Communications

The Segment Dev Center team is here to help you every step of the way. You can expect to hear from us using email or Slack for key events:

- Email
    - Welcome
    - Submission acknowledgement
    - Request for replay compatibility info
    - Request to implement OAuth
    - Private beta approval

## 4. Partner Build

Once you are approved you can start building your Segment App. In a nutshell you will build a webhook service or write JavaScript code to process data from Segment, or write a browser JavaScript SDK plugin to collect data or modify a website. You can [refer to the docs for full details about building and testing Segment App Components](https://segment.com/docs/partners/).

Building your integration consists of a few different choices. You'll want to decide…

- How do you want to collect data? Web plugins only run in-browser, while subscriptions capture data from everywhere.
- How do you want to process data? Webhooks allow you to build a traditional web service to receive Segment data. Functions allow you to write JavaScript code that translates data to an existing API.

Once you've decided, you can:

- Create a Segment App for your company name


- Build one or more components
    - Subscription webhook
    - Subscription function
    - Web plugin


- Test component with the Dev Center Test Suite and get all green or yellow tests

We also highly encourage you to build a 1-click enablement of your tool with OAuth and the Segment Config API. Partners who have implemented "Enable with Segment" button in their sign-up flows have reported 2X increase in conversions. You can [refer to the docs for full details about building an Enable with Segment button](https://segment.com/docs/partners/enable-with-segment/).

- Implement one-click set up using Enable with Segment / OAuth

> Note: If you are time constrained, you may skip the above step for now. Once we see at-least 5 customers using your public beta integration, it's a hard requirement to build "Enable with Segment" button in your sign-up flows or app/settings page for general availability. By building this, we are making it super easy for future customers to turn ON your Integration. Not doing so, will result in de-listing your Integration from the Segment Catalog.

## 5. Partner Test

The ultimate goal is for Partners like yourself to create and publish high quality Destinations in [the Segment Catalog](https://segment.com/catalog/). Your Segment account doubles as a sandbox account to test your destination while you are still in a private "building" state.

- Add your Component to a Workspace
    - In Developer Center "Test in your workspace" section, select your personal workspace and click "view"
    - Click "Configure <App>"
    - Select a Source and click "Confirm Source"
    - Fill in settings like "API Key" then click the button to enable the component
    - Click the "Event Tester" tab and click "Send Event"


- Login to your service and verify data


This verifies that your component is connected to a workspace and data is flowing to your service

- Test your Component with the Segment SDK
    - For the Source that you connected to, click the "Settings" then "API Key" tab and get the "Write Key"
    - Configure a Segment SDK with the write key
    - Generate real-world analytics events


- Login to your service and verify data

This is the real test to see how a lot of a Segment Users real-world data is reflected in your tool.

## 6. Partner Docs

To provide a great experience for users, and to help us test your integration, you need to document your integration. Segment expects docs both on your site about Segment, and on Segment's site about your integration. We provide templates for our docs to help you get started.

We also encourage marketing content that showcases how easy and powerful your integration is to set up and use thru Segment.


- Write docs
    - For your docs site about Segment integration
    - For https://segment.com/docs/ about your integration ([HackMD template](https://hackmd.io/t7amLXluS7-39rg7ARZgSA))
    - For https://segment.com/catalog/ about your integration ([Google Docs template](https://docs.google.com/document/d/1kKvqYtZeDPnBjvCrtQSuO3BBH70b_CLO13hYrYIOOtA/edit))


- Write launch marketing content
    - Blog post
    - Or email announcement

## 7. Partner Metadata

Before Segment can publish your app in the public catalog for all users to see (aka public beta), we need more metadata about your company, service and integration.

- Catalog metadata
    - Description
    - Website
    - Categories
    - Logos


- Docs links
    - For your docs
    - For Segment's docs
    - For Segment's public catalog

The Segment Dev Center team also needs an account to easily test your integration.

- Provision a test account in your service


- Login metadata
    - Username
    - Password
    - Additional notes for logging in and testing your service

## 8. Partner Submission

Once you have built your components, written docs, and filled in all the required metadata, you can submit your app for approval.

- Finish the developer center in-app checklist items
- Click "Submit for Review"

## 9. Segment Public Beta Approval

To maintain the quality of the partner integrations catalog, the Segment Developer Center team will carefully test your App once you have submitted it for review. The steps we take are outlined below so you can test everything yourself during building.

- Verify data delivery with Dev Center Test Suite
    - Log into partner service with provided username / password metadata
    - Get API key with provided catalog instructions
    - Run Test Suite with API key and get all green or yellow (e.g. "event not supported") results
    - Verify data flow to partner tool - in particular, if the partner UI is complicated, where different data types appear are clearly documented


- Review documentation partner submitted using [HackMD Template](https://hackmd.io/t7amLXluS7-39rg7ARZgSA?both=)
    - All sign-up, API key and data delivery matches test


- Review catalog information partner submitted using [Google Docs Template](https://docs.google.com/document/d/1kKvqYtZeDPnBjvCrtQSuO3BBH70b_CLO13hYrYIOOtA/edit)


- Verify that in-app catalog entry renders correctly
    - Browse to https://app.segment.com/goto-my-workspace/destinations/catalog/{partner-slug}
    - Categories are accurate
    - Logos render correctly
    - Description is accurate

If we find any problems in testing we let you know and help correct them. We are looking forward to your new entry in the Segment Integrations Catalog!
