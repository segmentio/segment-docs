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

## Advanced settings

### Badge count settings

Badge counts appear in the corner of an app icon on your user's device. Badge counts show the number of unread notifications. During push notification setup, you can set badge count behavior from the badge count dropdown.

Choose from these badge count settings:

- **Increase by**: for each new notification, the badge count increases by the number you enter. **Increase by** is the standard behavior for badge counts.
- **Decrease by**: for each new notification, the previous badge count decreases by the number you enter. Use **Decrease by** to send notifications quietly.
- **Set to**: replaces all previous sent notifications with the number you enter.

### Action buttons

Action buttons sit below a push notification and let your users take action on the push. You can use action buttons to encourage users to make a purchase, visit a website, or share content on social media, for example.

Follow these steps to add an action button:

1. Under **Advanced Settings**, click **+ Add action button**.
2. Enter an action button identifier.
3. Enter the action button text. This is the text the user will see on the action button.
4. Choose an open action. You can choose from open app, open URL, or a custom action.

You can add up to three action buttons for each push notification.

## Personalize with merge tags

Personalize mobile push content in Engage using profile traits as merge tags in your messages.

To personalize a mobile push, click **Add merge tags** in the template builder and select the profile traits to include in your message.

Engage inserts the selected traits inside merge tags based on cursor placement in the message. This allows you to personalize each mobile push you send to recipients. You can also use [liquid templating](https://liquidjs.com/tags/if.html){:target="blank"} to create dynamic content in the template editor. 

> info ""
> To learn more about profile traits, visit Segment's [Computed Traits](/docs/unify/traits/computed-traits/) and [SQL Traits](/docs/unify/traits/sql-traits/) documentation.

{% include content/engage-folders.md %}

## Next steps

Now that you've built a mobile push template, you're ready to begin [sending mobile push campaigns](/docs/engage/campaigns/mobile-push/push-campaigns/). 