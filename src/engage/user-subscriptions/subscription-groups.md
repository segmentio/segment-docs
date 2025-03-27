---
title: Subscription Groups  
plan: engage-premier
---
> info "Engage Premier End of Sale"
> Engage Premier entered an End of Sale (EOS) period effective June 10, 2024 and is no longer available for new customers. Existing Segment customers have access to and support for Engage Premier until Segment announces an end-of-life (EOL) date. Segment recommends exploring [Twilio Marketing Campaigns](https://www.twilio.com/en-us/sendgrid/marketing-campaigns){:target="_blank"}, as well as Segment's preferred ISV partners, including [Airship](https://www.twilio.com/en-us/blog/airship-integrated-customer-experience){:target="_blank"}, [Braze](https://www.twilio.com/en-us/blog/braze-conversational-marketing-campaigns){:target="_blank"}, [Klaviyo](https://www.twilio.com/en-us/blog/klaviyo-powering-smarter-digital-relationships){:target="_blank"}, [Bloomreach](https://www.twilio.com/en-us/blog/bloomreach-ecommerce-personalization){:target="_blank"}, and [Insider](https://www.twilio.com/en-us/blog/insider-cross-channel-customer-experience){:target="_blank"}.

Subscription groups let your users choose the emails they want to receive from you. This page introduces subscription groups and explains how you can use them with [Engage email campaigns](/docs/engage/campaigns/email-campaigns/).

## About subscription groups

A subscription group lets you send email campaigns to specific groups of users. Subscription groups also give your customers the ability to manage their email preferences, ensuring they only get emails they want to receive.

For example, you may want to create a subscription group that will receive only promotional email campaigns. Should a customer decide to opt out of your promotional campaigns, they'll still be able to receive email campaigns from other subscription groups you've created and to which they've subscribed.

### What your users experience

With subscription groups, your customers can opt in and out of groups on an individual basis instead of unsubscribing from all your campaigns.

Your customers will have the chance to opt in and out of subscription groups on both a subscription preferences page and on the landing page that launches when they unsubscribe. 

Customers can access these pages through the [unsubscribe and manage preference links](/docs/engage/content/email/editor/#add-unsubscribe-links) that you include in your [email templates](/docs/engage/content/email/template/).

![The subscription preferences page users see when opting in and out of subscription groups](../images/subscription_groups.png)

## Using subscription groups

To use a subscription group, you'll need to first create the group, add subscribers, then create a new email template.

### Create a subscription group

Follow these steps to create a subscription group:

1. Navigate to **Engage > Engage settings > Subscriptions**. 
2. Click **+Create subscription group**.
3. Add a name and description for the group, then click **Next**.
4. (Optional:) Add subscribers to your group with a CSV file upload, then click **Next**.
5. Review your new subscription group, then click **Create Subscription Group**.

### Add group subscribers

In addition to adding group subscribers when you first create a subscription group, you can also add subscribers to existing groups with a CSV file upload with these steps:

1. Navigate to **Engage > Engage settings > Subscriptions**. 
2. From the Subscription groups table, select the more options icon, then click **Add group subscribers**.
3. Download the template CSV file, then fill it out by entering email addresses and subscription groups. The subscription group should follow the format `[group_name]_subscription_status`.
4. Upload the CSV file, then click **Add Subscribers**.

### Validation errors

The following table lists validation errors you may run into with your CSV upload:

| Error                                | Error Message                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Invalid file types                   | You can upload only .csv files. Change your file format, then try again.                           |
| Empty files                          | This file contains no data. Add data to your CSV, then try again.                                  |
| CSV parsing error                    | We encountered an issue while parsing your CSV file. Validate the CSV file and try again.          |
| Unexpected/fallback                  | Something went wrong. Try again later.                                                             |
| Empty header row                     | This file contains empty header(s). Remove the empty header(s), then try again.                    |
| File exceeds one million rows        | Too many rows. You can upload up to 1000000 rows.                                                  |
| File exceeds 100 MB                  | Files can be up to 100 MB.                                                                         |
| Extraneous columns/column name typos | This file has columns that do not match the identifiers in your identity resolution configuration. |

### View update history

Use the Update History page to view CSV file uploads in your workspace over the last 30 days.

To view the Update History page:

1. Navigate to **Unify > Profile explorer** or **Engage > Engage settings > Subscriptions**.
2. From the **Subscription groups** table, click the three dots icon, then click **View update history**.
3. From the **Upload history** table, click the file name link to download the [error reports](#error-reports).

Engage uses the following error codes on the report:

| Error code                  | Description                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| INVALID_EMAIL               | The email address isn't formatted correctly.                                                                                                                 |
| INVALID_PHONE               | The phone number is invalid.                                                                                                                                 |
| INVALID_SUBSCRIPTION_STATUS | The subscription status is invalid. Check the status or leave it blank.                                                                                      |
| CONFIGURATION_ERROR         | Your SendGrid settings are not configured correctly. [Contact Segment support](https://app.segment.com/workspaces?contact=1){:target="_blank"} for help.     |
| SYSTEM_ERROR                | Something went wrong. Please try again.                                                                                                                      |
| UNABLE_TO_SUBSCRIBE         | You can't update the subscription status for this phone number because the user unsubscribed by replying `STOP`. The user must reply `START` to resubscribe. |
| GLOBAL_STATE_NOT_SUBSCRIBED | Global state isn't subscribed or set, so Segment can't update subscription states.                                                                           |


#### Subscription group CSV upload limits

Please note the following limits as you upload CSV files to Twilio Engage:
- You can only upload .csv files.
- Files can't be empty and must have at least one header and one row.
- You can't have multiple columns with the same header.
- Upload CSV files with up to 1 million rows (plus one header row).
- You can only upload one file at a time.
- The CSV file size can't exceed 100 MB.
- If you upload the same email or phone number with different subscription states in a single CSV file, Engage doesn't guarantee the subscription status result.
- The `phone` and `email` identifiers must be valid phone numbers and email addresses, otherwise they'll process as errors.
- The subscription group CSV uploader only honors group subscriptions, so `sms_subscription_status`, `whatsapp_subscription_status`, and `email_subscription_status` aren't allowed.
- Other than `[group_name]_subscription_status`, you should set up all columns in your identity resolution configuration.

### Create a new email template and send an email

> info ""
> To use subscription groups, you'll need to create a new email template with new unsubscribe and manage preference links.

Once you've created a subscription group and added subscribers to it, follow these steps to send to the group:

1. [Build a new email template](/docs/engage/content/email/template/#build-an-email-template). The template should include both unsubscribe and manage preferences links. For more on special links, view [Add unsubscribe links](/docs/engage/content/email/editor/#add-unsubscribe-links).
2. During email setup, select the subscription group you want to send to from the **Which subscription states should receive this message?** dropdown, then finish [setting up and publishing your campaign](/docs/engage/campaigns/email-campaigns/#create-test-and-publish-your-email-campaign).

## Set subscription group status with the Identify call

Segment supports subscription groups for email. You can send statuses for email subscription groups using the [Identify call](/docs/connections/spec/identify/). 

To set susbcription groups with the Identify call, you'll need to include a key-value pair of `"type": "EMAIL"` and the `groups` object, like in the following sample payload:

```json
{
  "userId": "12aBCDeFg4hIjKlM5OPq67RS8Tu",
  "context": {
    "messaging_subscriptions": [
      {
        "key": "(123) 555-5555",
        "type": "SMS",
        "status": "SUBSCRIBED" | "UNSUBSCRIBED" | "DID_NOT_SUBSCRIBE"
      },
      {
        "key": "(123) 555-5555",
        "type": "WhatsApp",
        "status": "SUBSCRIBED" | "UNSUBSCRIBED" | "DID_NOT_SUBSCRIBE"
      },
      {
        "key": "test@example.com",
        "type": "EMAIL",
        "status": "SUBSCRIBED" | "UNSUBSCRIBED" | "DID_NOT_SUBSCRIBE",
        "groups": [
            {
               "name": "newsletter",
               "status": "SUBSCRIBED" | "UNSUBSCRIBED" | "DID_NOT_SUBSCRIBE"
            },
            {
               "name": "marketing updates",
               "status": "SUBSCRIBED" | "UNSUBSCRIBED" | "DID_NOT_SUBSCRIBE"
            }
        ]
      }
    ],
    "externalIds": [
      {
        "id": "(123) 555-5555",
        "type": "phone",
        "collection": "users",
        "encoding": "none"
      }
    ],
    "traits": {
       "email": "test@example.com"
    }
  },
  "integrations": {},
  "traits": {}
}
```

## FAQs

#### How many subscription groups can I have? 

Your Engage space includes up to 25 subscription groups.

#### Can I use subscription groups with templates I've already built? 

No. Templates you've previously created aren't compatible with subscription groups. To use subscription groups, you'll need to create new templates that include new unsubscribe and manage preference links.

#### What happens if I delete a subscription group?

If you delete a subscription group, Engage will still maintain the preferences of the group's end users. 

#### What subscription group events does the Engage Channels Source send? 

The [Engage Events Source](/docs/connections/sources/catalog/cloud-apps/engage-events/) tracks four subscription group events: `Email Unsubscribed`, `Email Group Unsubscribed`, `Channel Subscription Updated`, and `Group Subscription Updated`.

#### How can users opt back in if they've unsubscribed from all groups? 
If a user unsubscribes from all of your subscription groups, they'll need to re-subscribe by explicitly opting back in to each group.

#### Do subscription preference links work in test emails? 

Yes. Test emails include fully functional unsubscribe and subscription preference links. If a test email recipient unsubscribes using a test email, Segment updates that user's subscription state. <br><br>

Test emails temporarily override an email subscription state. This means that an unsubscribed email address can receive a test email but won't receive regular email campaigns from which they've unsubscribed.

#### Should I follow any conventions when naming a subscription group? 

Yes. Keep the following table in mind when you name a subscription group:

<br>

| Field                                         | Convention                                                          |
| --------------------------------------------- | ------------------------------------------------------------------- |
| Group Name Character Limit                    | Limited to 75 characters, including spaces                          |
| Group Description Character Limit             | Limited to 500 characters, including spaces                         |
| Spaces in Group Names                         | Spaces aren't allowed at the beginning and/or end of the Group name |
| Unsupported characters for Group Names        | `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`                               |
| Unsupported accent characters for Group Names | `á, é, í, ó, ú, à, è, ì, ò, ù, ë, ï, ã`                             |
