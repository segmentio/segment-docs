---
title: Pardot Destination
name: Pardot
---

## Getting Started

When you enable Pardot in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Pardot's javascript onto your page. This means you should remove Pardot's snippet from your page.
+ Pardot starts automatically collecting anonymous visitor data data on your site.

Pardot is supported on the client-side and server-side.

- - -

### API Access

You'll need to provide API access to Segment using Pardot user credentials. Since Pardot's API [requires](http://developer.pardot.com/kb/api-version-3/authentication) that we provide an email and password to get access to their API, we'll need to store this password in plain text in our database.

Since we don't want to ask for the password of one of your actual user accounts, we recommend you create a new Pardot user account for Segment. Create this user by going to *Admin > Users and Groups > Add User*, and creating an Administrator role user.

Also make sure to disable IP Security in this Pardot user account. First navigate to the [user settings](https://pi.pardot.com/account), then click "Edit Account", and change "Enable IP Security" to "Disabled". Why is this necessary? Segment server IP address(es) may change, meaning we cannot whitelist particular addresses.

If you have web pages with different campaigns, you should follow [Pardot campaign
instructions](http://www.pardot.com/help/faqs/prospects/how-are-prospects-associated-with-campaigns)
and include the `pi_campaign_id` url query parameter in your campaign's web page urls.

Our script will use the most appropriate campaign Id.

### Pardot Version 3 and Version 4

There are currently two active versions of the Pardot platform, version 3 and version 4. The major change in version 4 is the new ability to create multiple prospects in Pardot with the same email address.

Previously, this was not possible. Email was used by Pardot as a distinct identifier. In version 4 however, in order to update an *existing* prospect, you must provide either the Pardot ID for a given user OR the Salesforce FID. If one of these values is not provided in a request, Pardot will create a new prospect. More information is available on their [website](http://developer.pardot.com/kb/api-version-4/).

Our Pardot integration provides two different options to properly support this new funtionality. Read on to learn more.

## Identify

### Version 3

When you call `identify`, we'll create or update a prospect in Pardot. If you are using version 3 of the Pardot platform, all you need to ensure is that you pass an `email` trait so that we can check if that prospect already exists. If it does, we'll simply update it's fields with the `traits` that you provide. Otherwise, we'll create a new prospect.

```javascript
analytics.identify('YOUR_DATABASE_USER_ID', {
    email: 'tom@example.com',
    name: 'Tom Smykowski'
    company: 'Initech, Inc',
    department: 'Customer Service',
    years_in_business: '10',
    notes: 'Working on a "Jump to Conclusions" mat',
    description: 'Im a people person. What the hell is wrong with you people?',
    title: 'VP of Engineering'
});
```

Find other accepted traits in [Pardot's Prospect field reference](http://developer.pardot.com/kb/api-version-3/object-field-references#prospect).

You can provide custom fields, but they won't be updated or visible until you create them in the Pardot user interface by going to **Admin > Configure Fields > Prospect Fields**.

### Version 4

> note ""
> The Segment integration with v4 of the Pardot API is currently in beta, and is only available in cloud-mode.

If you are using version 4, the functionaly is the same as version 3 except you will need to provide some kind of identifier to Segment that we can use to correctly handle either the creation of a new prospect *or* the update of an existing one. There are two options for this.

#### FID or ID Properties

If you are able to access either the **SalesforceFID** or **PardotID** for a given user, you can pass these properties to Segment as [integration specific options](/docs/connections/sources/catalog/libraries/server/node/#selecting-destinations). The properties must be named either `id` to pass a PardotID, or `fid` to pass the Salesforce FID.

```javascript
analytics.identify({
    userId: 'YOUR_DATABASE_USER_ID',
    traits: {
        email: 'bill@segment.com'
    },
    integrations: {
        Pardot: {
            fid: '00339000033ZUR6'
        }
    }
});
```

#### Lookup Field

If you do not have access to a given user's **SalesforceFID** or **PardotID**, you can alternatively specify a custom field in your Pardot instance for us to use to lookup and match a given user on.

For example, if you maintain an internal uuid for each of your users, you could create a field in Pardot with a name of your choosing (`org_id` for example) and in your integration settings, specify this field name. Then, when you send an `identify` event to Segment we will check to see if a prospect exists in Pardot with a value in this custom field that matches the value of a trait property with the same name as the custom field. If the match is successful, we will update that prospect with their proper PardotID. If not, we will create a new prospect.

Here is an example that assumes you have a custom field in Pardot called `org_id`:

```javascript
analytics.identify({
    userId: 'YOUR_DATABASE_USER_ID',
    traits: {
        email: 'bill@segment.com',
        org_id: '1sf324fd53'
    }
});
```

If a user existed in your Pardot instance with a custom field called `org_id` and a value of `1sf324fd53`, the user would be successfully updated. Otherwise, a new user would be created with `org_id` properly populated for future reference.

**Use UserID as Lookup Field Value**

Alternatively, you can specify in your integration settings that we use the `userId` passed in as an argument to the `identify` event to match the user on. Keeping with the above example, if you already were using your internal `org_id` as the `userId` for Segment events, you could enable this option and avoid having to explicitly define it as a trait.

**Important**: If you have users in Pardot that do not have values for the custom field you will be using as a lookup field, you will likely see duplicate prospects being created.

If possible, we recommend you explore bulk updating all existing users to ensure they have a value for this custom field before enabling the integration.

### Client Side

On the client-side browser we load Pardot's javascript snippet to enable [anonymous visitor tracking](http://www.pardot.com/products/marketing-automation/benefits/website-visitor-id-and-anonymous-visitor-tracking/).

### Troubleshooting

#### Updating a prospect's email creates a new prospect

If you are using Version 4 of the API and are using a lookup field to match existing prospects with Segment `identify` events, trying to update a prospect's email will result in a new prospect being created. This is because the Pardot API only allows read operations with email as the query (or PardotID/SaleforceFID but if you were passing those, this issue would be irrelevant to you). What ends up happening is our integration performs a read operation for a prospect matching the new email being passed in. This will not return a lookup field match and thus a new user will be generated.

To update a user's email, you must pass either a PardotID or a SaleforceFID (see above for specifics on how to do this).
