---
title: Google Sheets Destination
hide-boilerplate: true
hide-dossier: false
id: 627ea052118e3cd530d28963
---

The Google Sheets destination allows you to sync your warehouse data to a Google spreadsheet, and update the spreadsheet automatically as your data changes. This destination automates the workflow of exporting CSVs from your warehouse.

The Google Sheets destination can be connected to **Reverse ETL warehouse sources only**. 

## Getting started

### Create a spreadsheet
1. [Create a new Google spreadsheet](https://docs.google.com/spreadsheets/u/0/create?usp=sheets_home&ths=true){:target="_blank"} in your Google account.
2. Copy the spreadsheet ID from the spreadsheet URL. The spreadsheet ID is the value after `d/` and before `/edit`. For example, if your URL is `https://docs.google.com/spreadsheets/d/1ejq5-UVP0SWZezRsdggzFxMqOmaJwZh7NkKPkQfi0Bb/edit#gid=0` the ID is `1ejq5-UVP0SWZezRsdggzFxMqOmaJwZh7NkKPkQfi0Bb`. You will need this ID when you configure the destination.

### Connect Google Sheets
1. Create and configure your Reverse ETL source.
2. Create a model for the data you plan to sync to Google Sheets.
3. Navigate to the **Reverse ETL > Destinations** tab and click **Add Destination**. 
4. Select Google Sheets and click **Next**. Select the source you configured and name the destination.
5. On the **Settings** tab, authenticate the Google Sheets API using OAuth. Select the email account that owns the spreadsheet you created above. Make sure you enable the `See, edit, create, and delete all your Google Sheets spreadsheets` permission. 
6. On the **Mappings** tab, click **Add Mapping** and create a Post Sheet mapping. Within the mapping, configure how warehouse records should map to your Google Sheets spreadsheet.
7. Enable the destination and configured mappings.

> info ""
> The Google Sheets destination only supports sending new or updated rows to your spreadsheet. Deleting rows is not supported.

{% include components/actions-fields.html settings="false"%}

## FAQ

### How does Segment know if a row should be added or updated?

The Record Identifier mapping is used to make a distinction between adding a new row or updating an existing row. If two rows have the same Record Identifier, they are considered to be pertaining the same object and will live in the same row. Please ensure Record Identifier is set to a unique field.

### How do I define the columns in my spreadsheet?

The Fields mapping controls which fields in your model will be written as columns. Input the desired column name(s) on the left, and select the data variable that will populate the value for that column on the right. Please note, at least one field must be configured to send data to Google Sheets otherwise no columns will be created or synced.
