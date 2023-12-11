---
title: Mobile Push Template
plan: engage-premier
---

Use Twilio Engage to build mobile push templates to include throughout your marketing campaigns.

## Mobile push template types

You can choose between two mobile push template types:

- **Media**, which contains media and text content
- **Text**, which contains text content 

## Build a mobile push message template

> info ""
> To build mobile push templates in Engage, first [configure Engage for mobile](/docs/engage/campaigns/mobile-push/). 

Follow these steps to build a mobile push template:

1. Navigate to **Engage > Content** and click **Create template**.
2. Select **Push**, then click **Configure**.
3. Enter a template name and select your template's language.
4. Select your template's content type, then click **Next**.
    - For media templates, enter your message's title in the **Title** field, its body in the **Body** field, add the media URL, then add any desired [merge tags](#personalize-with-merge-tags).
    - For text templates, enter your message's title in the **Title** field, its body in the **Body** field, then add any desired merge tags.
5. Select a [click behavior](#click-behaviors).
6. Click [Test](#test-your-mobile-push-template) or **Save** to save your template.


### Click behaviors

When you build a mobile push template, you can choose between three click behaviors, which determine what happens when a user taps on the mobile push:

| Behavior      | Description                                                                                                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Open app      | Opens an app. You can specify a URL to take the user to a specific screen with your app. If you don't enter a URL, this behavior will take the user to the app's home screen.                                                                                                                          |
| Open URL      | Opens the specified URL.                                                                                                                                                                                                                                                                               |
| Custom action | Takes any value as text input. Your app determines how to handle the value. For example, you could enter a custom action of `open_settings`, and then instruct your application to open the settings application when a user taps the push and the push arrives with `click behavior = open_settings`. |

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

Segment verifies that the profile you're sending a test to has a push token, then sends the test. If the test mobile push doesn't work as expected, confirm that the profile you're sending to has a push token.

## Personalize with merge tags

Personalize mobile push content in Engage using profile traits as merge tags in your messages.

To personalize a mobile push, click **Add merge tags** in the template builder and select the profile traits to include in your message.

Engage inserts the selected traits inside merge tags based on cursor placement in the message. This allows you to personalize each mobile push you send to recipients. You can also use [liquid templating](https://liquidjs.com/tags/if.html){:target="blank"} to create dynamic content in the template editor. 

> info ""
> To learn more about profile traits, visit Segment's [Computed Traits](/docs/unify/traits/computed-traits/) and [SQL Traits](/docs/unify/traits/sql-traits/) documentation.

## Organize with template folders

Use folders to organize your Email, SMS/MMS, Push, and Whatsapp content templates. Group related content together to better help you manage and find your marketing resources.
 
From the Templates overview page you can create, update, view, and delete template folders.

> warning ""
> You must have both read and write workspace permissions to create or make changes to folders.

To create a folder:

1. Navigate to **Engage > Content**.
2. Select the tab for the template type (Email, SMS, WhatsApp, or Push) you'd like to create the folder for. 
3. Click **Create**, then select **Folder**.
4. Add a folder name, then click **Create**. 

You can also rename, add templates, or disband your folder from the Templates overview page to. Disbanding a folder returns all templates from the folder to the main template list, without deleting any of the templates.

### Move templates to your folders

From the Templates overview page, you can select individual template(s) to move to your folders. 

After you select the templates you'd like to move:
1. Click **Actions**, and select **Move Templates**.
2. Select the destination folder, then click **Move templates to folder**.

Use the **Actions** button in your folder to remove templates or move them to a different location. When you remove a template, Engage returns the template to the main templates list, without deleting it. 

## Next steps

Now that you've built a mobile push template, you're ready to begin [sending mobile push campaigns](/docs/engage/campaigns/mobile-push/push-campaigns/). 