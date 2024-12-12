---
title: Responsys (Actions) Destination
id: 6578a19fbd1201d21f035156
---

[Responsys](https://www.oracle.com/marketingcloud/products/cross-channel-orchestration/){:target="_blank"} is a cloud-based marketing platform that enables businesses to deliver personalized customer experiences across email, mobile, social, display, and web. Responsys is part of the Oracle Marketing Cloud.

This destination can be used with Connections Sources and with Engage Audiences. It supports these actions:

- **Send Audience as PET**: Sends an Audience to a Profile Extension Table (PET) in Responsys. This action is used with Engage Audiences.
- **Send to PET**: Sends a record to a Profile Extension Table (PET) in Responsys. This action is used with Connections Sources.
- **Upsert List Member**: Adds or updates a record in a Profile List in Responsys. This action is used with either Connections Sources or Engage Audiences.

Segment maintains this destination. For any issues with the destination, [contact the Segment Support team](mailto:friends@segment.com). 

## Getting started

Before you enable Responsys in your destinations page, there are a few things in your Segment destination settings you must set up. Once the setup is complete, you'll be able to use identify and track calls to add records to **Profile Lists** and **Profile Extension Tables**.

1. From the Segment web app, click **Catalog**.
2. Search for **Responsys** in the Catalog and select it.
3. Choose which of your sources to connect the destination to.
3. Under Settings, give the destination a name, and enter your Responsys username and password. You can find these credentials in the Responsys dashboard under **Account > User Management > Users**. Optionally, you can provide the Source Write Key and its corresponding region to receive partial events from this destination, such as sync statuses and errors. For more information, see the [Source Write Key documentation](/docs/connections/find-writekey/).
5. Configure your destination for these settings: 
   
   Setting | Details
   ------- | --------
   Responsys endpoint URL | Enter the URL of the Responsys API endpoint you want to send data to. This is typically in the format `https://<instance>-api.responsys.ocs.oraclecloud.com`. This is provided by your Responsys account manager.
   List Name | Enter the name of the Profile List you want to send data to. A Profile List in Responsys is the equivalent of a Segment Unify Space. You can create a new Profile List in the Responsys dashboard under **Data > Profile Lists**, if needed.
   Insert On No Match | If enabled, the destination will insert a new record into the Profile List if no match is found. If disabled, the destination will not insert a new record if no match is found.
   First Column Match | The first column in the Profile List that the destination will use to match records. This is typically the email address.
   Second Column Match | The second column in the Profile List that the destination will use to match records. This is typically the customer ID.
   Update On Match | Controls how the existing record should be updated. The default is "Replace All".
   Default Permission Status | The default permission status for the record. This is typically "Opt Out". If set as "Opt In", every new profile added into a Profile List will be set to receive marketing communications. This can be overridden in mappings.
   Profile Extension Table Name | The name of the Default Profile Extension Table (PET) you want to send data to. A Profile Extension Table in Responsys is the equivalent of a Segment Audience (if used in Engage with the `Send Audience as PET` action), or of a traits extension table (if used with the `Send to PET` action). For either Actions, Segment creates the corresponding PET in Responsys if it doesn't already exist. This parameter can be overidden in mappings.

6. Click **Save**. 

Once you have entered these required settings, you're ready to integrate your Oracle Responsys account through the Segment platform.

## Identify

There are two things you can do with Segment's Identify calls in regards to Responsys:

1. Upsert records to a **Profile List**.
2. Extend a record by upserting a corresponding record in a **Profile Extension Table**.

In case #2, the Profile Extension Table can either represent profiles' subscription statuses in an Audience, or it can represent additional traits about the profiles.

If you want to update records in a Profile List, you can use the following Identify call:

```js
// analytics.js

analytics.identify('rick', {
  email: 'wubba-lubba-dub-dub@morty.com',
  seasonTwo: true,
  phone: '4012221738',
  address: {
    street: '19 Forest Lane',
    city: 'East Greenwich',
    state: 'RI',
    postalCode: '02818',
    country: 'USA'
  }
});
```

> info ""
> In order to merge records properly, this destination requires that all Identify calls contain at least `userId` or `traits.email`.

If mapping the above call for any action, the destination first tries to find an existing record in the provided Profile List with a matching `userId` of `'rick'` and/or `email` of `'wubba-lubba-dub-dub@morty.com'`. If a record is found, the destination updates the rest of the columns as long as you pass the information in the corresponding mapping. Segment's semantic [Identify spec](/docs/connections/spec/identify) recommends the following mappings:

Segment Trait Name | Responsys Profile List Column Names
------------------ | ------------------------------------
userId | `CUSTOMER_ID_`
email | `EMAIL_ADDRESS_`
phone | `MOBILE_NUMBER_`
address.street | `POSTAL_ADDRESS_1_`
address.city | `CITY_`
address.state | `STATE_`
address.postalCode | `POSTAL_CODE_`
address.country | `COUNTRY_`

#### Email and Mobile Permission Statuses

If you want to keep track of users who are opting in or out of marketing communications in your apps and websites, make sure to map values of custom traits to Responsys `EMAIL_PERMISSION_STATUS_` or `MOBILE_PERMISSION_STATUS_` fields. 

> info ""
> The value of this custom trait key _must_ be a boolean. When the value is `true` that indicates the user wants to opt in. When the value is `false`, this indicates the user wants to opt out. Segment will transform that boolean into the appropriate Responsys accepted format (`I` or `O` are the defaults. You can change these under **Settings**).

### Merging Records to a Profile Extension Table

If you want to send records to a **Profile Extension Table (PET)**, through `Send to PET` action, this destination can either create the PET for you, or you can simply enter the name of any of your existing PETs. The match column name will be the `userId` and/or `email` (you must send at least one), so be sure to include the `userId` or `traits.email` in your Identify calls. If the PET already exists, make sure that all the columns you are sending in the Identify call are already present in the PET.

#### Creating a Profile Extension Table through Segment:

Enter the desired name of your PET, either in your Segment destination settings, or directly in your `Send to PET` action mapping.

Say the following is your first Identify call after you've entered the PET name that does not exist yet in your Responsys Profile List:

```js
// analytics.js

analytics.identify('rick', {
  email: 'wubba-lubba-dub-dub@morty.com',
  name: 'rick',
  age: 60,
  genius: true
});
```

This would create a PET where its columns would be `NAME`, `AGE` and `GENIUS`. Since `email` is mapped already in your Profile List, we won't create a duplicate column in your PET. We will also automatically set the column type according to the value of the trait you've sent. Every corresponding column in a PET will have the `STR500` column type.

#### Merging Records to Existing Profile Extension Table

If you already have a Profile Extension Table you'd like to use, enter the name of the list in your settings. Note that we will _only_ send traits with matching column names in your schema, meaning that we will drop any traits that are not pre-defined in your PET before sending the request.

### Overriding Default Folder and List Names

If you need more flexibility or need to add different users to various Folders or Profile Lists/Extension Tables, you can override the default settings through mappings. For example, if you want to send a user to a different Profile List, you can do so by mapping a trait or property `listName` (or any other name) to the desired Profile List name.

