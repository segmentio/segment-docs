---
title: Use Profiles and Traits with a CSV file
plan: engage-premier
---
Use the CSV Uploader to add or update user profiles and set subscription states.

When you upload a CSV file, Engage adds new profiles and updates existing user profiles. Each CSV row corresponds to a user profile and columns to an identifier in your [identity resolution configuration](/docs/unify/identity-resolution/identity-resolution-settings/).

You can also [set subscription states](#set-user-subscriptions) for each email and phone number that you upload in the CSV. Subscription states help you track which email addresses and numbers you have permission to market to.

> warning ""
> Uploading a CSV creates new profiles and updates existing profiles. These profile updates may lead to users entering existing audiences or message campaigns.

> info ""
> Using the CSV Uploader to upload user profiles to Engage will **not** increase your MTUs count. [Learn more](/docs/guides/usage-and-billing/mtus-and-throughput/#mtus-and-engage) about MTUs and Engage.


## Upload a CSV file

Use the **Upload CSV** page to upload a CSV file in your Segment space:
1. Navigate to **Unify > Profile explorer** or **Engage > Audiences > Profile explorer**.
2. Click **+Add Profiles**.
3. Download and fill out the CSV template.
4. Upload your CSV file.

### 1. Download your CSV template

Click **Download Template** to download a CSV template with identifier columns from your identity resolution configuration. Engage adds subscription columns next to email and SMS identifiers, where you can update subscription states for email addresses and phone numbers.

> info ""
> CSV files can only have a single **email** and **phone** identifier column. Include any additional email addresses or phone numbers for a user profile as a separate row.

Navigate to **Unify > Unify settings** and select the **Identity resolution** tab to view or add identifiers in your Segment workspace.

### 2. Fill out your CSV file

Enter values for the identifiers in your CSV file. You can also [set email, phone, and WhatsApp subscriptions](#set-user-subscriptions) using the `email_subscription_status`, `sms_subscription_status`, and `whatsapp_subscription_status` columns.

A few guidelines to keep in mind as you fill out your CSV:

- Leave any unknown values blank to avoid bad data. Engage can create a user profile from a single identifier in your CSV.
- Enter phone numbers in your CSV in a format that's consistent with your Segment space. For example, if existing profiles in your workspace are in E.164 format `+15555550123`, enter numbers in your CSV using the same format `+##########`.
- The template won't include duplicate custom traits, traits with trailing, leading, or multiple consecutive spaces between characters, or [unallowed characters](#allowed-csv-file-characters).
- Custom traits column headers are case-sensitive. For example, `first Name`, `FIRST Name`, and `First Name` would all be different traits in the template.
- Trailing, leading, or multiple consecutive spaces between characters are not allowed.
- Make sure you've added an identifier column or `anonymous_id` in your identity resolution configuration.


### 3. Upload your CSV file

Upload a CSV file to Twilio Engage in two ways:
- Drag and drop the CSV file in the dropzone.
- Click **Browse** to locate the CSV file.

Engage processes CSV rows sequentially. Column values, except for a blank subscription status, override previous values for a user profile.

A blank subscription status in the CSV doesn't overwrite current **email** or **phone** [subscription states](/docs/engage/user-subscriptions/subscription-states/) in your Segment space.

### 4. Name your custom trait

Every time you upload a file, you have the option to add a custom trait to user profiles in the CSV. Use custom traits to help you [create audiences](/docs/engage/audiences/#building-an-audience) or send messages to a specific group of users. You can also add an existing custom trait name from your Segment workspace to the list of users in the CSV file.

Custom traits display in the Custom Traits tab of a user profile in the Profile explorer.

## Work with the CSV template

Keep the following in mind as you fill out your CSV template.

### Allowed CSV file characters

You can use these characters in your CSV file:

- Alphabetic English characters in both upper and lower case
- The numerals 0-9
- These special characters: ```!@#$%^&*()_+-=[]{}:\\|.`~<>\/?```
- The following non-English characters:


```àáâäǎæãåāçćčċďðḍèéêëěẽēėęğġgg͟hħḥh̤ìíîïǐĩīıįķk͟hłļľl̥ṁm̐òóôöǒœøõōřṛr̥ɽßşșśšṣs̤s̱sțťþṭt̤ʈùúûüǔũūűůŵýŷÿźžżẓz̤ÀÁ
ÄǍÆÃÅĀÇĆČĊĎÐḌÈÉÊËĚẼĒĖĘĞĠGG͟HĦḤH̤ÌÍÎÏǏĨĪIĮĶK͟HŁĻĽL̥ṀM̐ÒÓÔÖǑŒØÕŌŘṚR̥ɌSẞŚŠŞȘṢS̤S̱ȚŤÞṬT̤ƮÙÚÛÜǓŨŪŰŮŴÝŶŸŹŽŻẒZ```


## View Update History

Use the Update History page to view CSV file uploads in your workspace over the last 30 days.

To view the Update History page:

1. Navigate to **Unify > Profile explorer** or **Engage > Audiences > Profile explorer**.
2. Click **View update history**.

Select links to view CSV files and any associated [error reports](#error-reports). View the status of the file upload and the custom trait name added to user profiles in the CSV upload.


### Error reports

Use error reports to fix invalid rows and quickly re-upload data.

From the Update History page:

1. Select the link in the **Report** column to download an error report CSV. All rows not present in the error report were processed successfully.
2. Correct data in the invalid rows.
3. Remove any extra columns such as `row_number`, `error_message`, and `error_code`.
3. Click **Update subscription statuses**, and select **Upload a CSV** to re-upload the file.

Engage uses the following error codes on the report:

| Error code                  | Description                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| INVALID_EMAIL               | The email address isn't formatted correctly.                                                                                                                 |
| INVALID_PHONE               | The phone number is invalid.                                                                                                                                 |
| INVALID_SUBSCRIPTION_STATUS | The subscription status is invalid. Check the status or leave it blank.                                                                                      |
| CONFIGURATION_ERROR         | Your SendGrid settings are not configured correctly. [Contact Segment support](https://app.segment.com/workspaces?contact=1){:target="_blank"} for help.     |
| SYSTEM_ERROR                | Something went wrong. Please try again.                                                                                                                      |
| UNABLE_TO_SUBSCRIBE         | You can't update the subscription status for this phone number because the user unsubscribed by replying `STOP`. The user must reply `START` to resubscribe. |

You may also encounter the following validation errors:

| Error                                                    | Error Message                                                                                                                                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Invalid file types                                       | You can upload only .csv files. Change your file format, then try again.                                                                                                                         |
| Empty files                                              | This file contains no data. Add data to your CSV, then try again.                                                                                                                                |
| CSV parsing error                                        | We encountered an issue while parsing your CSV file. Validate the CSV file and try again.                                                                                                        |
| Unexpected/fallback                                      | Something went wrong. Try again later.                                                                                                                                                           |
| Empty header row                                         | This file contains empty header(s). Remove the empty header(s), then try again.                                                                                                                  |
| File exceeds one million rows                            | Too many rows. You can upload up to 1000000 rows.                                                                                                                                                |
| File exceeds 1000 columns                                | Your CSV file is exceeding the limit of 1000 columns.                                                                                                                                            |
| File exceeds 100 MB                                      | Files can be up to 100 MB.                                                                                                                                                                       |
| File contains a header with unallowed spaces             | This file contains leading, trailing or consecutive spaces. Remove leading, trailing or consecutive spaces, then try again.                                                                      |
| File contains duplicate headers                          | This file contains duplicate header(s). Remove duplicate header(s), then try again.                                                                                                              |
| File contains invalid characters                         | This file contains invalid character(s). Remove invalid character(s), then try again.                                                                                                            |
| Unconfigured `anonymous_id` or missing Identifier column | This file is missing an identifier column and does not have `anonymous_id` configured. Add an identifier column or add `anonymous_id` in your identity resolution configuration, then try again. |




## Set user subscriptions

Use the CSV Uploader to set subscription states for user email addresses and phone numbers.

> info ""
> Each user profile in a Segment workspace can have multiple email addresses and phone numbers, all with different subscription states.

For each CSV file, Engage adds:
- An `email_subscription_status` column next to the **Email** column.
- `whatsapp_subscription_status` and `sms_subscription_status` columns next to the **Phone** column.

In the `email_subscription_status`, `sms_subscription_status`, and `whatsapp_subscription_status` columns, set subscription states for email and phone numbers with the following values:

- `subscribed`: The user has actively subscribed.
- `unsubscribed`: The user has actively unsubscribed.
- `did-not-subscribe`: The user has provided their contact information but didn't actively subscribe or unsubscribe.
- **No subscription status (blank value)**: The user's profile exists in Segment, but they haven't explicitly provided their contact information, and no subscription information is available.

Engage accepts both uppercase and lowercase subscription status values.

> success ""
> Only contact users that subscribe to your communications. View [User Subscription States](/docs/engage/user-subscriptions/subscription-states/) to learn more.

## CSV upload guidelines

Please note the following limits as you upload CSV files to Twilio Engage:
- You can only upload `.csv` files.
- Files can't be empty and must have at least one header and one row.
- You can't have multiple columns with the same header.
- CSV files can't contain extraneous column headers.
- CSV files cannot exceed 1 million rows (plus one header row), 1000 columns, or 100 MB in file size.
- You can only upload one file at a time.
- If you upload the same email or phone number with different subscription states in a single CSV file, Engage doesn't guarantee the subscription status result.

- Add an identifier column or `anonymous_id` in your identity resolution configuration.

## Message consent

Segment recommends sending to subscribed users. If a recipient deletes or flags an unwanted message as spam, inbox providers might start to filter your messages straight to spam folders. View more SendGrid delivery [Best Practices](https://sendgrid.com/blog/why-are-my-emails-going-to-spam/){:target="_blank"} to prevent email from going to spam.
