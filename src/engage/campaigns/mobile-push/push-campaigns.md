---
title: Mobile Push Campaigns
plan: engage-premier
---

With Twilio Engage, you can send campaigns to users who have opted in to receive your marketing materials. On this page, you’ll learn how to create and send a mobile push campaign.

Some knowledge of the Journeys product will benefit you as you read through this guide. If you’re new to Journeys, the [Journeys documentation](/docs/personas/journeys/) will bring you up to speed.

## How Engage campaigns work

Twilio Engage uses Journeys to campaigns.  With Journeys, you add conditions and steps that trigger actions like sending an email, an SMS, or a mobile push.

You’ll build and then send your campaign in three stages:

1. Create a journey.
2. Add a journey condition.
3. Create, test, and publish your mobile push campaign.

### Create a journey

Because Engage campaigns exist within Journeys, begin by creating a journey:

1. In Engage, select **Journeys**, then click **New Journey**.
2. Name your journey and select its entry settings.
3. Click **Build Journey** to create the Journey.

### Add a Journey condition

With your Journey created, you’ll now create a [condition](/docs/engage/journeys/step-types/) that will trigger your campaign:

1. Within the Journey builder, click **+ Add Entry Condition**.
2. In the Add Entry Condition pane, give the step a name.
3. Click **+ Add Condition**, select your desired condition, then click **Save**.

With your entry condition added, you’re now ready to create your mobile push campaign. 

### Create, test, and publish your mobile push campaign

Follow these steps to create a mobile push campaign:

1. Within the Journey builder, click the **+** node below your new condition.
2. From the **Add step** window, click **Send a Push**.
3. In the **Send a Push** window, select the mobile push template you want to use, or click **Create new template** to [build a new template](/docs/engage/content/mobile-push/).
4. Review your template's content and click behavior, then click [Test](#test-your-mobile-push-template) or **Continue**.
5. In the **Send a Push** modal, give the step a name, choose a messaging service, add any conversion goals, then click **Save**.
6. In the Journey builder, click **Publish**.

Your mobile push campaign is now live. Users who trigger the mobile push step’s parent Journey condition will receive your campaign.

## Test your mobile push template

> info "Push tokens"
> Push tokens are unique identifiers Segment associates with each profile. For mobile push, you'll need to configure identity resolution settings for the push tokens `ios.push_token` and `android.push_token`. Using the Profile explorer, you can find a profile's push tokens by opening a profile and then selecting the Identities tab. You can only send mobile pushes to profiles with push tokens enabled.

Follow these steps to test your mobile push:

1. Choose a template to test:
    - For new templates, select **Test** once you've finished building a template. 
    - For existing templates, navigate to **Engage > Content > Push**, select the template you want to test, then click **Test**.
    - Mobile push templates have a content size limit of 4KB.
2. Choose a messaging service and add a recipient.
    - You can add recipients using an email address or user ID. 
3. Click **Send test push**.

Segment verifies that the the profile you're sending a test to has push tokens enabled, then sends the test. If the test push doesn't work as expected, confirm that the profile you're sending to has enabled push tokens.
