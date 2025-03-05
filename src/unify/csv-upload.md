---
title: Add or Update Profiles and Traits with a CSV
plan: unify
---
You can use the Profiles CSV Uploader to add or update user profiles and traits. This page contains guidelines for your CSV upload and explains how to upload a CSV file to Unify.

> warning "Consent preferences cannot be updated using the Profiles CSV Uploader"
> If you need to update consent preferences for your profiles, you must generate a [Segment Consent Preference Updated](/docs/privacy/consent-management/consent-in-unify/#segment-consent-preference-updated-event) event. For more information, see the [Consent on the Profile](/docs/privacy/consent-management/consent-in-unify/) documentation. 

## CSV file upload guidelines

Keep the following guidelines in mind as you upload CSV files:

- You can only upload `.csv` files.
- Files can't be empty and must have at least one header and one row.
- You can't have multiple columns with the same header.
- CSV files cannot exceed 1 million rows (plus one header row), 299 columns, or 100 MB in file size.
- You can only upload one file at a time.
- Add an identifier column or `anonymous_id` in your identity resolution configuration.
- Leave any unknown values blank to avoid bad data. Segment can create a user profile from a single identifier in your CSV.
- The template won't include duplicate custom traits, traits with trailing, leading, or multiple consecutive spaces between characters, or [unallowed characters](#allowed-csv-file-characters).
- Custom traits column headers are case-sensitive. For example, `first Name`, `FIRST Name`, and `First Name` would all be different traits in the template.
- Trailing, leading, or multiple consecutive spaces between characters are not allowed.
- The CSV uploader shares [Unify product limits](/docs/unify/product-limits/).

## Upload a CSV file

Use the **Upload CSV** page to upload a CSV file in your Segment space:

1. Navigate to **Unify > Profile explorer** or **Engage > Audiences > Profile explorer**.
2. Click **+Add Profiles**.
3. Download and fill out the CSV template.
4. Upload your CSV file.

### 1. Download your CSV template

Click **Download Template** to download a CSV template with identifier columns from your identity resolution configuration. 

### 2. Fill out your CSV file

Enter values for the identifiers in your CSV file. 

### 3. Upload your CSV file

You can upload a CSV file in two ways:
- Drag and drop the CSV file in the dropzone.
- Click **Browse** to locate the CSV file.

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

### Validation errors

The following table lists validation errors you may run into with your profiles and traits CSV upload:

| Error                                                    | Error Message                                                                                                                                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Invalid file types                                       | You can upload only .csv files. Change your file format, then try again.                                                                                                                         |
| Empty files                                              | This file contains no data. Add data to your CSV, then try again.                                                                                                                                |
| CSV parsing error                                        | We encountered an issue while parsing your CSV file. Validate the CSV file and try again.                                                                                                        |
| Unexpected/fallback                                      | Something went wrong. Try again later.                                                                                                                                                           |
| Empty header row                                         | This file contains empty header(s). Remove the empty header(s), then try again.                                                                                                                  |
| File exceeds one million rows                            | Too many rows. You can upload up to 1000000 rows.                                                                                                                                                |
| File exceeds 299 columns                                 | Your CSV file is exceeding the limit of 299 columns.                                                                                                                                             |
| File exceeds 100 MB                                      | Files can be up to 100 MB.                                                                                                                                                                       |
| File contains a header with unallowed spaces             | This file contains leading, trailing or consecutive spaces. Remove leading, trailing or consecutive spaces, then try again.                                                                      |
| File contains duplicate headers                          | This file contains duplicate header(s). Remove duplicate header(s), then try again.                                                                                                              |
| File contains invalid characters                         | This file contains invalid character(s). Remove invalid character(s), then try again.                                                                                                            |
| Unconfigured `anonymous_id` or missing Identifier column | This file is missing an identifier column and does not have `anonymous_id` configured. Add an identifier column or add `anonymous_id` in your identity resolution configuration, then try again. |