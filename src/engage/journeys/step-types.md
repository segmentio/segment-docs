---
title: Journeys Step Types
plan: engage-foundations
---

On this page, you'll find information about the steps you can add to a Journey.

## Conditions and delays

Journeys has two steps that you can use to determine how and when users move to the following step.

#### Add a condition

The **Add a condition** step defines the conditions that a user must satisfy to move from one step to the next. You can define new conditions or import conditions from an existing audience.

#### Add a delay

The **Add a delay** step defines the length of time in minutes, hours, days, or weeks that a user must wait before moving to the next step.

## Flow control steps

Journeys offers four steps that help you control how users flow through your Journey.

### True/false splits

A true/false split divides the previous step's user group into two branches, based on Boolean logic against a defined condition. Users who satisfy the condition(s) move to the **True** branch. Otherwise, they move to the **False** branch. To enforce mutual exclusivity, Journeys evaluates true/false conditions when a user reaches the relevant step.

You can add Step Names to describe the users who end up in both the True and False branches.

### Multi-branch splits

**Multi-branch split** divides the group of users from a previous step into two or more branches based on each branch's defined conditions.

Define the number of branches you want to create, then add an **Add a condition** step to define each branch's condition.

> info ""
> Journeys doesn't enforce mutual exclusivity in branch conditions. For more information about ensuring branch exclusivity, see [Best Practices](#).

### Randomized splits

A randomized split lets you experiment with and test the performance of a Journey's branches. When you create a randomized split, you add up to five Journey branches, each with a different step. Journeys then sends eligible users down one of the branches at random. Each branch receives a portion of the eligible users based on percentages that you assign to the branches.

To test your messaging channels, for example, you might create a randomized split with three different branches, assigning 40% of users to an email campaign, 40% to an SMS campaign, and 20% to a control group. Once users flow through the split, you can determine the success of the email and SMS campaigns compared to each other and the control group.

#### Add a randomized split

Follow these steps to add a randomized split to a Journey:

1. Create a new Journey, and [add an entry condition](/docs/engage/journeys/build-journey/#adding-the-entry-condition).
2. Select the **+** icon to add a step, then select **Create a randomized split**.
3. Name the randomized split step, then add up to five branches.
4. Set the distribution percentage for each branch, then select **Save**.
5. For each branch in the split, select the child **+** icon and add a step.
3. Save and publish your Journey.

Users who meet the Journey's entry condition will then enter the Journey and flow through the randomized split.

#### Act on the split's results

Once users complete your Journey's randomized split step, you'll have insight into how each split performed. You can take action on the results by cloning the Journey and sending a new set of users through the highest performing branch.

### Connecting to existing steps

You can merge split Journey branches by using the **Connect to existing steps** option. Connecting to existing steps lets you apply a single step to more than one group. For example, you may want to target some Journey group members with email campaigns while targeting others with ad campaigns. Instead of duplicating steps, you can connect these steps to steps that already exist.

Keep the following in mind when connecting to existing steps:

- You can only connect the end of a branch to another branch.
- You cannot link back or loop back to previous steps.
- If you connect multiple non-exclusive branches, the user will only be sent to a Destination the first time they reach it.

Follow the instructions below to connect branches to an existing step:

1. Within an existing Journey, click the **Edit** button.
2. Click the **+** icon below an existing step to add a new step.
3. From the **Select a Step** window, select **Connect to existing step**.
4. Choose the existing step you want to connect.
5. Click **Save** to confirm.

## Actions steps

With Journey actions steps, you can send marketing campaigns to groups of users and deliver Journey information to downstream tools.

### Show an ad

The **Show an ad** step lets you send users to an advertising destination. You can also configure exit settings that remove users from the ad step after specific periods of time.

For example, you may want to show an ad for only one week to users who abandoned a cart during a purchase. With the Show an ad step, you can remove users from the ad destination seven days after they enter it.

> info "Ad-based exit settings"
> Ad step exit settings don't impact other Journey steps. A user can exit an ad step but remain in the overall Journey. For more on Journeys exit settings, view [Journey exit and re-entry times](/docs/engage/journeys/build-journey/#exit-and-re-entry-times).

Follow these steps to add a Show an ad step to a Journey:

1. From the Journey builder, select the **+** icon to add a step, then select **Show an ad**.
2. Name the step, then select **+ Add destination**.
4. Choose the ad destination that Segment will sync to.
5. To specify how long users will remain in the step, choose one of the following options:
    1. If you want users to exit the destination, select the checkbox next to **Remove users from the destination after**. Set a time frame in minutes, hours, days, or weeks.
    2. If you want users to stay in the ad destination indefinitely, leave the checkbox empty.
6. Select **Save** to finish creating the step.

### Channels steps

The **Send an email**, **Send an SMS**, and **Send a WhatsApp** steps are only available on [Engage Premier](/docs/engage/onboarding/).

#### Send an email

Use Twilio Engage to send email as a step in a Journey.

> note ""
> To send email in Engage, you must connect a [SendGrid subuser account](https://docs.sendgrid.com/ui/account-and-settings/subusers#create-a-subuser){:target="blank"} to your Segment space. Visit the [onboarding steps](/docs/engage/onboarding/) for more information.

1. From the **Add step** window, **Send an email**.
2. Build an email from scratch, or use an existing template as a starting point. You can use an existing template as a base to build the email, but any changes made from within Journeys won't be saved in the original email template. Click **Manage Templates** to visit the Email Templates page.
3. Configure the email step.
    1. Add a step name.
    2. Add the sender's email address and name. Emails can only be sent from a verified domain.
    3. Indicate if you want to send replies back to the sender. If not, add a reply to email and name.
    4. Add email addresses to receive a blind carbon copy of your email.
    5. Add preview text and the subject line. Use merge tags to personalize the email template with user profile traits.
    6. Design and test the email in the Body section. Be sure to include an unsubscribe link in your message.
    7. Add conversion goals.
4. Click **Save** to add the email step to your Journey.

`Subscribed` users will receive an email upon entering the step. Visit [Email Campaigns](/docs/engage/campaigns/email-campaigns/) for more information.

#### Send an SMS

Use Twilio Engage to send an SMS message as a step in a Journey.

> note ""
> To send SMS in Engage, you must connect a Twilio messaging service to your Segment workspace. Visit the [onboarding steps](/docs/engage/onboarding/) for more information.

1. From the **Add step** window, click **Send an SMS**.
2. Build an SMS template from scratch, or select a previously built template. Click **Manage Templates** to visit the SMS Templates page.
3. Configure the Send SMS step.
    1. Add a name to describe the step.
    2. Select a [Twilio Engage messaging service](https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services){:target="blank"} to use.
    3. Add the body of the SMS. Include an opt-out message such as "Reply STOP to unsubscribe" in the text.
    4. Use merge tags to personalize your text, and test the SMS message.
    5. Add a conversion goal to track message success.
4. Click **Save** to add the SMS step to your Journey.

As soon as a `subscribed` user enters the Send SMS step, they'll receive the text. Visit [SMS Campaigns](/docs/engage/campaigns/sms-campaigns/) for more information.

#### Send a WhatsApp

Use Twilio Engage to send a WhatsApp message as a step in a Journey.

> info "WhatsApp Public Beta"
> WhatsApp as an Engage channel is in public beta. 

1. From the **Add step** window, click **Send a WhatsApp**.
3. Pick an approved template from the template list, then choose **Select**.
4. Give the WhatsApp message step a name.
5. In the **Sender** field, choose **WhatsApp**, then click **Save** to add the WhatsApp message to your Journey.


### Send to Destinations

The **Send to Destinations** step delivers information about the Journey to the selected Destination. For more information, see [Send data to Destinations](/docs/engage/journeys/send-data).
