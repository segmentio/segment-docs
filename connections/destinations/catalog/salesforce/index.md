

## Getting Started

Segment's Salesforce destination allows you to identify leads without using SOAP APIs.

**Use Cases**

* [https://segment.com/recipes/product-summary-emails-salesforce/](https://segment.com/recipes/product-summary-emails-salesforce/)

### API Access

You'll need to provide API access to Segment via a Salesforce user credentials. Since we use Salesforce's SOAP API, you'll need to provide an email, password, and security token to get access to their API.

Since we don't want to ask for the password of one of your actual user accounts, we recommend you create a new Salesforce user account for Segment. We realize an extra user account costs money, so feel free to use an existing account if you wish.

If you decide to create a new user account for the Segment API, please create this user by going to *Setup > Administration Setup > Users > New User*, and creating a new user with a System Administrator profile. This profile is required to give us enough permissions to access the API.

Also make sure that IP Security is disabled in this Salesforce user account. This is because our servers often change and its hard to predict their IPs.

- - -

## Identify

Our destination makes it simple to integrate Salesforce. This destination supports the most important pain point for Salesforce users: getting your prospective customers into Salesforce as Leads from your website or mobile app.

### Identifying a Lead

Let's go through a quick javascript example of identifying a lead:

```javascript
analytics.identify('YOUR_USERS_ID', {
  name: 'Peter Gibbons',
  title: 'VP of Derp',
  email: 'peter.gibbons@initech.com',
  company: 'Initech',
  phone: '570-690-4150',
  state: 'California',
  rating: 'Hot',
  city: 'east greenwich',
  postalCode: '94115',
  country: 'USA',
  street: '19123 forest lane',
  state: 'RI'
}, {
  'integrations': {
    'Salesforce': true
  }
});
```

Additionally, if you're using another destination, like Intercom, that requires the company trait to be an object, you can pass the name of the company as follows and our destination will still map it as expected.

Also, you can send the address data in a object as well.

```javascript
analytics.identify('YOUR_USERS_ID', {
  name: 'Peter Gibbons',
  title: 'VP of Derp',
  email: 'peter.gibbons@initech.com',
  company: {id: 666, name: 'Initech'},
  phone: '570-690-4150',
  state: 'California',
  rating: 'Hot',
  address: {
    city: 'east greenwich',
    postalCode: '94115',
    country: 'USA',
    street: '19123 forest lane',
    state: 'RI'
  }
}, {
  'integrations':{
    'Salesforce': true
  }
});
```

When you call `identify`, we'll check to see if this Lead exists based on the `email` trait. If it does, we'll update the Lead with the traits you've passed in your `identify` call, otherwise we'll create a Salesforce Lead.

**IMPORTANT**: If you're planning to update custom fields in Salesforce with Segment, you need to make sure you create the custom Lead Field inside Salesforce *prior* to sending the data. The [Salesforce API for Leads](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_lead.htm) requires `lastName` and `company`. If either of this fields are not present in a server-side request we will automatically append the string `'n/a'` to each of those fields even if you have provided those fields in a previous request.

For example, if you want to collect a custom trait in Segment called `testProp`, you can create a Field Label called `testProp` which will generate an API Name as `testProp__c`. We will append the `__c` to any custom traits so you don't need to worry about that. Please ensure to stay consistent with your casing. If you create custom fields in camelCase, make sure you send `traits` to Segment in camelCase. If you are creating custom fields in SFDC as `snake_case`, then be sure to send your `traits` in the same format.

**NOTE**: Our Salesforce destination requires **every event to include a 'Salesforce': true in an integrations object**. Segment will not attempt to send any events to Salesforce that do not include this in their payload. The Salesforce SOAP API has very strict API limits so to prevent users from unintentionally hitting their limits, we require this in all events.

By default we do not send identify calls to Salesforce, given their strict API limits, which is why we ask you to explicitly define which identify calls are sent to Salesforce.

## Group

`.group()` calls will now create or update **Account Objects** inside Salesforce. When we receive a group call, similar to the `.identify()` call, we will first check using the `groupId` to see if the Account Object already exists in your SF account. Depending on the response, we will update that object or create a new one.

Take this sample `.group()` call that you might send to Segment:

(analytics.js)
```js
analytics.group('813', {
  name: 'Teemo Industries',
  address: {
    city: 'East Greenwich',
    state: 'RI',
    country: 'US',
    postalCode: '02818',
    street: '9000 Forest Lane'
  },
  phone: '222-333-4444',
  description: 'Makes great husky products',
  employees: 4,
  website: 'https://teemothewolf.com'
}, {
  'integrations': {
    'Salesforce': true
   }
});
```
The above call will be sent like the following, in accordance with [Salesforce's API specs](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_account.htm):

```js
{
  Name: 'Teemo Industries',
  AccountNumber: '813',
  BillingCity: 'East Greenwich',
  BillingCountry: 'US',
  BillingPostalCode: '02818',
  BillingState: 'RI',
  BillingStreet: '9000 Forest Lane',
  NumberOfEmployees: 4,
  Phone: '222-333-4444',
  Website: 'https://teemothewolf.com',
  Description: 'Makes great husky products'
}
```

*NOTE*: By default we will map `address` to the Account's **billing** address. If you'd like to map the address to the Account's **shipping** address, you can do so inside your Salesforce settings in Segment. You can also opt to map it to *both* billing and shipping.

#### Required Steps

- You must be using V2 of this destination.
- You must pass in `traits.name` as this is a required field imposed by Salesforce for Account Objects.
- You must pass `{ 'Salesforce': true }` in the `options`.
- You must include `AccountNumber` as part of your page layout for us to be able to look up for the Account Objects via `groupId`:
  - Log into your Salesforce account and go to `setup`
  - Go to `Build` > `Customize` > `Accounts` > `Page Layout`
  - Drag the `Account Number` Field to the `Account Detail`
  - Click `Save`

#### Custom traits

In order to send custom traits, you must do the same steps as you had done for the `.identify()` call. You have to **predefine** them inside Salesforce. We will send any custom traits by appending `__c`.

## Trait Validation

Salesforce has documented strict validations on their semantic traits. We will trim all of those traits if they go over the limit. Please refer to their docs for [Account Objects](https://developer.salesforce.com/docs/atlas.en-us.200.0.api.meta/api/sforce_api_objects_account.htm#topic-title) and [Lead Objects](https://developer.salesforce.com/docs/atlas.en-us.200.0.api.meta/api/sforce_api_objects_lead.htm) to make sure you are sending the trait values under these limits if you do not want to see them trimmed off.

## Troubleshooting

### Creating Other Resources

To reduce the complexity of our API, our Salesforce destination intentionally only supports creating leads via the `identify` call. We make it extremely easy to create and update leads with our destination.

To create resources of other types, such as Accounts or custom objects, we recommend integrating with Salesforce directly


### Sandbox Mode

To enable an integration with a Salesforce Sandbox instance, toggle the Sandbox setting to true.

### API Call Limits

Salesforce limits both the concurrent amount of requests and the total amount of daily requests we can make to their API on your behalf. Check [these limits](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm). They vary per edition and your number of bought user licenses.

We make two API requests per `identify`. The first request is a SQL query to determine whether this object already exists. The second is to either update or create that object.

Also, every thirty minutes, our servers make two queries: one to renew our connection's sessionId and another to describe your Salesforce object model so to determine which Salesforce objects are available.


### How can I check how many Salesforce API calls I have left today?

Go to `Setup > Administration Setup > Company Profile > Company Information`, and you'll find a field labeled: `API Requests, Last 24 Hours`.


### What do I do if I ran out of calls?

You can either decrease the amount of Salesforce calls Segment makes using context.integrations, or buy more Salesforce user licenses.


### Lookup Fields

You can add whatever lookup fields you want to help us find the object you want to update.


### Custom Fields Aren't Updating

Make sure that the traits you're passing through match the Custom Field's API name and data type!


### Password Expiration

By default, Salesforce user accounts are set to have their passwords expire after 90 days. When this happens, the Salesforce user account that's making API calls on your behalf will no longer be able to make API calls. You'll need to set a new password, get a new security token, and then set both of these in your Segment Salesforce destination settings.

If you want to set your passwords to never expire, you can do so in **Salesforce Setup > Administration Setup > Security Controls > Password Policies**.

### Updating Lead Status

Currently Segment does not support updating the Salesforce Lead Status field due to constraints of the Salesforce API.
