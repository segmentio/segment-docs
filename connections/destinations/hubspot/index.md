---
rewrite: true
---

[HubSpot](https://www.hubspot.com/) is an inbound marketing and sales platform that helps companies attract visitors, convert leads, and close customers. The `analytics.js` HubSpot Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-hubspot).

This document was last updated on March 30, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI’s Destinations page click on “Add Destination”. 
2. Search for “HubSpot” within the Destinations Catalog and confirm the Source you’d like to connect to.
3. If you haven't already done so, add your API Key from [HubSpot](https://knowledge.hubspot.com/articles/kcs_article/integrations/how-do-i-get-my-hubspot-api-key) and drop into the "API Key" field within the Segment UI.
4. Navigate to the "Settings" page within the HubSpot UI to find your Hub ID and drop into the "Hub ID" field within the Segment UI.
5. When you activate the destination, our CDN will be updated in about 5-10 minutes and the HubSpot snippet will be initilized and begin recording data.


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:
```
analytics.page()
```
**IMPORTANT:** An initial `page` call is required for data to be sent to HubSpot via Analytics.js. This is included by default in your [Segment snippet](/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet).

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:
```
analytics.identify('user1234', {
  email: 'petergibbon@email.com',
  firstname: 'Peter',
  lastname: 'Gibbon'
})
```
**IMPORTANT:** HubSpot has two conditions for `identify` to successfully create or update a contact. A `traits.email` value must be included and either a `page` or `track` call must be called. You can read more from HubSpot's documentation [here](https://developers.hubspot.com/docs/methods/tracking_code_api/identify_visitor). 

HubSpot does not accept any trait keys that contain uppercases or spaces. So for any custom traits you send we will lowercase them and replace any spaces with an underscore.

Any traits that aren't contact fields in HubSpot will be removed from the request. To find out which fields you can set, check out the custom field names in **Contacts > Contact Settings**. Example field names are "firstname", "lastname", "company", "phone", etc.

If you specify a company name (via `traits.company.name`), it will show up as a *property* of the contact (you can find it in HubSpot's UI via **About [contact] > View > View All Properties**), but it will not show up as the user's company under **[contact]'s Company**.

The following traits are tagged as special fields within HubSpot:

<!-- TODO: facade inject these methods -->

```
- address
- city
- companyName
- email
- firstName
- lastName
- position
- phone
- zip
```


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:
```
analytics.track("Clicked Buy Now button", {
  value: 20.5
})
```

**IMPORTANT:** You must have a HubSpot Enterprise account for traits from an `identify` call to be passed through to your `track` call and be successfully sent as [a custom event to HubSpot](https://knowledge.hubspot.com/events-user-guide-v2/using-custom-events).

The event will appear in your HubSpot UI but may take up to 60 minutes to appear in the graph visualization. 

### Server

When calling from any of our server-side sources you must provide the contact's email as `properties.email` so that HubSpot can tie the event to the appropriate contact. An example call in Python would look like:

```python
analytics.track(
  user_id='YOUR_USER_ID', 
  event='Bought Item', 
  properties={
    'email' : 'peter@initech.com',
  }
)
```

In this case, your HubSpot `eventId` is 'Bought Item'. If you want to use an existing `eventId`, you can use it instead of the event value (ie. `Bought Item`). If you don't want to match an existing `eventId`, you can use any event label and HubSpot will auto-create the event for you.


### Setting Contact Properties on Track

Although we recommend you send `traits` via [`identify`](/docs/spec/identify/), you can also set HubSpot properties on a track call, as allowed by their [events API](http://developers.hubspot.com/docs/methods/enterprise_events/http_api). You might want to use this method if you're running out of API calls on the Identify requests.

Include HubSpot contact properties into the `context.traits` object:

```python
analytics.track(
  user_id='YOUR_USER_ID', 
  event='Bought Item', 
  properties={
    'email': 'peter@initech.com',
  }, 
  context={
    'traits': {
    'firstname': 'Peter',
    'lastname': 'Gibbons'
  }
})
```

## Group

__NOTE: Group calls are not compatible with our Analytics.js library.__

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/spec/group/) does. An example call would look like:

```node
analytics.group({
  groupId: "some_group_id",
  userId: "some_user_id",
  traits: {
    website: "example.com",
    name: "Example Inc."
  }
});
```

Group calls map to the HubSpot [Companies API](https://developers.hubspot.com/docs/methods/companies/companies-overview). Segment's integration is responsible for creating and updating company objects with whatever traits you set, as well as [associating individual contacts to a company](https://developers.hubspot.com/docs/methods/companies/add_contact_to_company).

**IMPORTANT**: There are three requirements to creating companies and associating contacts:

1. Group calls only take effect when called via server-side libraries or mobile libraries, not via our client-side javascript library.
2. Your contact must have been identified and created within HubSpot (called via analytics.identify for this userId first).
3. You must include a `website` trait in your group call, and it must be a full, valid, and complete URL. HubSpot uses the domain of the website trait as a unique identifier for companies. To create a new company you must use the full URL and not just the subdomain.

The following group traits are supported as special properties within HubSpot:

<!-- TODO: facade inject these methods -->

```
- address
- city
- state
- zip
- country
- description
- employees
- industry
- phone
- website
```

## Troubleshooting

### API Call Limits

HubSpot limits the total amount of hourly and monthly requests we can make to their API on your behalf. Read more about these limits [here](https://developers.hubspot.com/apps/api_guidelines).

* Maximum Number of API Calls per Second, per Key or Token: **10**
* Maximum Number of API Calls per Day, per Key or Token: **40,000**

### Sending Dates as Property Values

HubSpot's API has [specific requirements](http://developers.hubspot.com/docs/faq/how-should-timestamps-be-formatted-for-hubspots-apis) regarding how dates should be formatted before they are delivered as contact properties with date types. 

In order to ensure proper transformation of these properties, please pass them to Segment as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) formatted strings and **not** as UNIX timestamps. Here's a Javascript example:

```js
analytics.identify('userid', {
    offerDate: new Date() // not Date.now()!
});
```

### Invalid 'lifecyclestage'

When using any of our server-side sources, our connector will infer `traits.lifecycle_stage` as `lifecyclestage`. If you're using a custom contact property for custom lifecycle stage's, you should give the property a distinct name, such as `custom_lifecycle_stage`.

### Loading Forms SDK
Segment gives you the option to load the [HubSpot Forms SDK](https://developers.hubspot.com/docs/methods/forms/advanced_form_options) alongside their tracking library. This can be done by enabling the **Load Forms SDK** setting when configuring your HubSpot integration.

**Please Note:** The Forms SDK expects to be loaded synchronously but analytics.js is loaded asynchronously. Therefore, in order to interact with the API, you need to run your code inside an [analytics.ready](https://segment.com/docs/sources/website/analytics.js/#ready) callback. Here's an example:

```js
analytics.ready(function(){
  hbspt.forms.create({
    portalId: '',
    formId: '',
    css: '',
    cssRequired: ''
  });
})
```
