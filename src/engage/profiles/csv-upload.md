---
title: Update Audiences with a CSV
layout: engage
engage: true
---
Use the CSV Uploader to add or update user profiles and set subscription states.

When you upload a CSV file, Twilio Engage adds new users and updates existing user profiles. CSV rows correspond to a user and columns to an identifier trait in your [identity resolution configuration](/docs/personas/identity-resolution/identity-resolution-settings/).

You can also use the CSV Uploader to set email and SMS [subscription states](#set-user-subscriptions) to track email addresses and phone numbers that you have permission to market to.

## Upload a CSV file

To upload a CSV file, navigate to **Personas > Profiles** and click **Update Users**.

### 1. Download a CSV template with identifiers

Click **Download Template** to download a CSV template with identifier columns from your identity resolution configuration. Engage adds subscription columns next to email and SMS identifiers, where you can update subscription states for email addresses and phone numbers.

> info ""
> CSV files can only have a single **email** and **phone** identifier column. Include any additional email addresses or phone numbers for a user profile as a separate row.

Navigate to **Personas > Settings** and select the **Identity Resolution** tab to view or add identifiers in your Segment workspace.

### 2. Upload a CSV file

Upload a CSV file to Twilio Engage in two ways:
- Drag and drop the CSV file in the dropzone.
- Click **Browse** to locate the CSV file.

Engage processes CSV rows sequentially. Column values, except for a blank subscription status, override previous values for a user profile.

A blank subscription status in the CSV doesn't overwrite current **email** or **phone** [subscription states](/docs/engage/profiles/user-subscriptions/subscription-states/) in your Segment space.

### 3. Name the custom trait

Every time you upload a file, you have the option to add a custom trait to user profiles in the CSV. Use custom traits to help you create audiences or send messages to a specific group of users. You can also add an existing custom trait name from your Segment workspace to the list of users in the CSV file.

Custom traits display in the Custom Traits tab of a User Profile in the User Explorer.

## View upload history

Use the Upload History page to view CSV file uploads in your workspace over the last 30 days.

Navigate to **Personas > Profiles** and click **Upload History**.

Select links to view CSV files and any associated [error reports](#error-reports). View the status of the file upload and the custom trait name added to user profiles in the CSV upload.

### Error reports

Use error reports to fix invalid rows and quickly re-upload data.

From the Upload History page:

1. Select the link in the **Report** column to download an error report CSV. All rows not present in the error report were processed successfully.
2. Correct data in the invalid rows and remove any extra columns.
3. Click **Update Users** and re-upload the CSV file.

## Set user subscriptions

Use the CSV Uploader to set subscription states for user email addresses or phone numbers. Subscription states help you track which email addresses and numbers you have permission to market to.

> info ""
> Each user profile in a Segment workspace can have multiple email addresses and phone numbers, all with different subscription states.

For each CSV file, Engage adds:
- An `email_subscription_status` column next to **Email** columns.
- An `sms_subscription_status` column next to **SMS** columns.

In the `email_subscription_status` and `sms_subscription_status` columns, set subscription states for email and phone numbers with the following values:

- `Subscribed`: The user has actively subscribed.
- `Unsubscribed`: The user has actively unsubscribed.
- `Did Not Subscribe`: The user has provided their contact information but didn't actively subscribe or unsubscribe.
- **No Subscription Status (blank value)**: The user's profile exists in Segment, but they haven't explicitly provided their contact information, and no subscription information is available.

> success ""
> Only contact users that subscribe to your communications. View [User Subscription States](/docs/engage/profiles/user-subscriptions/subscription-states/) to learn more.

## CSV upload limits

Please note the following limits as you upload CSV files to Twilio Engage:
- You can only upload .csv files.
- Files can't be empty and must have at least one header and one row.
- You can't have multiple columns with the same header.
- CSV files can't contain extraneous column headers.
- Upload CSV files with up to 1 million rows (plus one header row).
- You can only upload one file at a time.
- The CSV file size can't exceed 15 MB.

> warning ""
> At this time, the following beta limitations apply:
> - Email addresses and phone numbers that unsubscribe from your campaigns can't be re-subscribed.
> - If you upload the same email or phone number with different subscription states in a CSV file, the resulting subscription status isn't guaranteed.

## Message consent

Only send messages to subscribed users. If a recipient deletes or flags an unwanted message as spam, inbox providers might start to filter your messages straight to spam folders. View more SendGrid delivery [Best Practices](https://sendgrid.com/blog/why-are-my-emails-going-to-spam/){:target="_blank"} to prevent email from going to spam.
