---
title: Responsys (Actions) Destination
id: 6578a19fbd1201d21f035156
---

[Responsys](https://www.oracle.com/marketingcloud/products/cross-channel-orchestration/){:target="_blank"} is a cloud-based marketing platform that enables businesses to deliver personalized customer experiences across email, mobile, social, display, and web. Responsys is part of the Oracle Marketing Cloud.

This destination can be used with Connections Sources and with Engage Audiences. It supports the following actions:

- **Send Audience as PET**: Sends an Audience to a Profile Extension Table (PET) in Responsys. This action is used with Engage Audiences.
- **Send to PET**: Sends a record to a Profile Extension Table (PET) in Responsys. This action is used with Connections Sources.
- **Upsert List Member**: Adds or updates a record in a Profile List in Responsys. This action is used with either Connections Sources or Engage Audiences.

This destination is maintained by Segment. For any issues with the destination, [contact the Segment Support team](mailto:friends@segment.com). 

## Getting Started

Before you enable Responsys in your destinations page, there are a few things in your Segment destination settings you must set up. Once the set up is complete, you'll be able to use `.identify()` and `.track()` calls to add records to **Profile Lists** and **Profile Extension Tables**.

1. From the Segment web app, click **Catalog**.
2. Search for "Responsys" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Under Settings, give the destination a name, and enter your Responsys "Username" and "Password". You can find these credentials in the Responsys dashboard under Account > User Management > Users.
4. Optionally, you can provide and Source Write Key and its corresponding region to receive partial events from this destination, such as sync statuses and errors. For more information, see the [Source Write Key documentation](https://segment.com/docs/connections/sources/catalog/#destination-write-keys).
5. Under **Responsys endpoint URL**, enter the URL of the Responsys API endpoint you want to send data to. This is typically in the format `
https://<instance>-api.responsys.ocs.oraclecloud.com`. This is provided by your Responsys account manager.
6. Under **List Name**, enter the name of the Profile List you want to send data to. A Profile List in Responsys is the equivalent of a Segment Unify Space. You can create a new Profile List in the Responsys dashboard under Data > Profile Lists, if needed.
7. **Insert On No Match** toggle: If enabled, the destination will insert a new record into the Profile List if no match is found. If disabled, the destination will not insert a new record if no match is found.
8. **First Column Match**: The first column in the Profile List that the destination will use to match records. This is typically the email address.
9. **Second Column Match**: The second column in the Profile List that the destination will use to match records. This is typically the customer ID.
10. **Update On Match** option: Controls how the existing record should be updated. The default is "Replace All".
11. **Default Permission Status**: The default permission status for the record. This is typically "Opt Out". If set as "Opt In", every new profile added into a Profile List will be set to receive marketing communications. This can be overridden in mappings.
12. **Profile Extension Table Name**: The name of the Default Profile Extension Table (PET) you want to send data to. A Profile Extension Table in Responsys is the equivalent of a Segment Audience (if used in Engage with the `Send Audience as PET` action), or of a traits extension table (if used with the `Send to PET` action). For either Actions, Segment creates the corresponding PET in Responsys if it doesn't already exist. This parameter can be overidden in mappings.
13. Change any optional parameters as needed.
14. Click **Save**.

Once you have entered these required settings, you are ready to integrate your Oracle Responsys account through the Segment platform!

## Identify

There are two things you can do with Segment's `.identify()` calls in regards to Responsys:

1. Upsert records to a **Profile List**.
2. Extend that record by upserting a corresponding record in a **Profile Extension Table**.

In case 2, the Profile Extension Table can either represent profiles' subscription statuses in an Audience, or it can represent additional traits about the profiles.

If you just want to update records in a Profile List, you can use the following `.identify()` call:

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

**IMPORTANT**: In order to merge records properly, our destination requires that all `.identify()`  contain at least `userId` or `traits.email`.

If mapping the above call any action, the destination will try to first find an existing record in the provided Profile List with a matching `userId` of `'rick'` and/or `email` of `'wubba-lubba-dub-dub@morty.com'`. If a record is found, the destional will update the rest of the columns so long as you pass the information in the corresponding mapping. Our semantic [identify spec](/docs/connections/spec/identify) recommends the following mappings:

<table>
  <tr>
    <td>Segment Trait Name</td>
    <td>Responsys Profile List Column Names</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>`CUSTOMER_ID_`</td>
  </tr>
  <tr>
    <td>email</td>
    <td>`EMAIL_ADDRESS_`</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>`MOBILE_NUMBER_`</td>
  </tr>
  <tr>
    <td>address.street</td>
    <td>`POSTAL_ADDRESS_1_`</td>
  </tr>
  <tr>
    <td>address.city</td>
    <td>`CITY_`</td>
  </tr>
  <tr>
    <td>address.state</td>
    <td>`STATE_`</td>
  </tr>
  <tr>
    <td>address.postalCode</td>
    <td>`POSTAL_CODE_`</td>
  </tr>
  <tr>
    <td>address.country</td>
    <td>`COUNTRY_`</td>
  </tr>
</table>

#### Email and Mobile Permission Statuses

If you would like to keep track of users who are opting in or out of marketing communications in your apps and websites, make sure to map values of custom traits to Responsys `EMAIL_PERMISSION_STATUS_` or `MOBILE_PERMISSION_STATUS_` fields. 

**NOTE:** The value of this custom trait key _must_ be a boolean. When the value is `true` that indicates the user wants to opt in and `false` indicates the user wants to opt out. Segment will transform that boolean into the appropriate Responsys accepted format (`I` or `O` are the defaults, and can be changed under Settings).

### Merging Records to a Profile Extension Table

If you would like to send records to a **Profile Extension Table (PET)**, through `Send to PET` action, this destination can either create the PET for you, or you can simply enter the name of any of your existing PETs. The match column name will be the `userId` and/or `email` (must send at least one), so be sure to include the `userId` or `traits.email` in your `.identify()` calls. If the PET already exists, please make sure that all the columns you are sending in the `.identify()` call are already present in the PET.

#### Creating a Profile Extension Table through Segment:

All you have to do is enter the desired name of your PET, either in your Segment destination settings, or directly in your `Send to PET` action mapping.

Say the following is your first `.identify()` call after you've entered the PET name that does not exist yet in your Responsys Profile List:

```js
// analytics.js

analytics.identify('rick', {
  email: 'wubba-lubba-dub-dub@morty.com',
  name: 'rick',
  age: 60,
  genius: true
});
```

This would create a PET where its columns would be `NAME`, `AGE` and `GENIUS`. Since `email` is mapped already in your Profile List, we will not create a duplicate column in your PET. We will also automatically set the column type according to the value of the trait you've sent. Every corresponding column in a PET will have the `STR500` column type.

#### Merging Records to Existing Profile Extension Table

If you already have a Profile Extension Table you'd like to use, simply enter the name of the list in your settings. Note that we will _only_ send traits with matching column names in your schema, meaning that we will drop any traits that are not pre-defined in your PET before sending the request.

### Overriding Default Folder and List Names

If you need more flexibility or need to add different users to various Folders or Profile Lists/Extension Tables, you can override the default settings through mappings. For example, if you want to send a user to a different Profile List, you can do so by mapping a trait or property `listName` (or any other name) to the desired Profile List name.

