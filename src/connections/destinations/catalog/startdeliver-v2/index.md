---
title: Startdeliver-v2 Destination
id: 65ccc6147108efc0cf5c6fe1
---
[Startdeliver](https://startdeliver.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} connects data from a variety of sources to provide a customer view optimized to Customer Success Managers.

Startdeliver maintains this destination. For any issues with the destination, [contact their support team](mailto:support@startdeliver.com).


## Getting started

 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Startdeliver** in the Destinations Catalog, and select the **Startdeliver** destination.
3. Choose which source should send data to the Startdeliver destination.
4. Go to the [API keys](https://app.startdeliver.com/settings/apikeys){:target="_blank"} in your Startdeliver dashboard, generate an API key, make it active and grant it admin permissions.
5. Enter the API Key in the Startdeliver destination settings in Segment.
6. Create a User custom field you want to match a Segment event on [in your settings](https://app.startdeliver.com/settings/fields){:target="_blank"}. You will need a field's alias during the next step.
7. Enter the Startdeliver user custom field to match on in the Startdeliver destination settings in Segment.

You have to [identify](/docs/connections/spec/identify/) your user with a proper `userId` so that Startdeliver can match your Segments events with correct Startdeliver users.

Startdeliver attaches any matched events to existing users. If no matched users are found, Startdeliver creates a new user. Startdeliver uses a custom field you specified during the seventh step of the Getting Started section to match a user.

For example, you have a user in Startdeliver and you want to attach your Segment events to that user.

To do this, create a User custom field, like `externalId`. Now you should update your Startdeliver user with a proper value, for example, `97980cfea0067` (this is your user's ID). Don't forget to set this custom field in 7th step of the "Getting Started" section.

When this user goes to your app, you should [identify](/docs/connections/spec/identify/) them:

```js
analytics.identify('97980cfea0067')
```

After this, you can send either Page or Track events:

```js
analytics.track('Login Button Clicked')
```

This event is matched with a Startdeliver user that has ID `97980cfea0067` set in a custom field `externalId`.

Segment events will appear on Customer and User views in Startdeliver. The views will be created instantly within Startdeliver.

For more information, view the [Startdeliver documentation](https://app.startdeliver.com/dev/app/Segment){:target="_blank"}.


## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page('Home')
```

Segment sends Page calls to Startdeliver as a `page` event. 

## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```js
analytics.screen('Home')
```

Segment sends Page calls to Startdeliver as a `page` event. 


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Startdeliver as a `track` event.

## Identify & Group

To enable parsing of Identify and Group events in Startdeliver, you have to enable it in the [Segment app configuration in your Startdeliver-account](https://app.startdeliver.com/settings/app/segment){:target="_blank"}.

For Startdeliver to manage Identify and Group events, you must configure the Matching and Mapping variables in Startdeliver settings in order to choose which fields should map to a User or a Customer respectively when these events are received. If a User or a Customer is found based on these parameters it will be updated or otherwise created in Startdeliver.

The configuration is cached for 10 minutes, so any changes made in the configuration will take up to 10 minutes to update.

`startdeliverMatchingField` should contain an object with a Field alias that you want to match your User towards in Startdeliver, as well as a target format type.
`externalMatchingField` should be the field name from which the value will be matched towards the field above.

This also applies to `startdeliverCustomerField` and `externalCustomerField` if you have any Customer data that you want to use to connect the user to a customer, as well as update or create a customer in Startdeliver.

`userMapping` and `customerMapping` contains any field values that you want to append to your User or Customer respectively. This array of objects should contain a Target field-alias, source-field alias as well as a Target-type.

```js
{
	startdeliverMatchingField: {
		field: 'customfieldMatchingId',
		type: 'text'
	},
	externalMatchingField: {
		field: 'userId'
	},
	startdeliverCustomerField: {
		field: 'customfieldCustomId',
		type: 'number'
	},
	externalCustomerField: {
		field: 'traits.customerId'
	},
	userMapping: [
		{
			field: 'name',
			externalField: 'traits.trait2',
			type: 'text'
		},
		{
			field: 'customfieldNumber',
			externalField: 'traits.trait1',
			type: 'number'
		},
		{
			field: 'email',
			externalField: 'email',
			type: 'text'
		}
	],
	customerMapping: [
		{
			field: 'name',
			externalField: 'traits.customerName',
			type: 'text'
		}
	]
}
```
