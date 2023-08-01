---
title: Bento Destination
id: 5ff25116284da6d5091e21b1
---

[Bento](https://www.trybento.co/) allows you to create embedded onboarding solutions to support your users as they get started with your product, and beyond. Using your customer data you can tailor user experiences providing a personalized journey through your product.

This destination is maintained by Bento. For any issues with the destination, [contact the Bento Support team](mailto:support@trybento.co).


## Getting Started

 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Bento" in the Destinations Catalog, and select the "Bento" destination.
3. Choose which Source should send data to the "Bento" destination.
4. Go to Org settings in [Bento](https://everboarding.trybento.co/settings/organization){:target="_blank"}, under Integrations copy the Segment **API Key**. 
5. Enter the Bento API Key in the Bento's destination settings.
6. Make sure your account's unique ID always sends under Segment's context. Bento requires the [groupId](/docs/connections/spec/group/#group-id) as part of the payload.


## Supported methods

Bento supports the following methods, as specified in the [Segment Spec](/docs/connections/spec). You can see what data has been passed into Bento in the Bento [Data dashboard](https://everboarding.trybento.co/data){:target="_blank"}.

### Identify

Send [Identify](/docs/connections/sources/catalog/libraries/website/javascript/#identify) calls to identify a user in your application, along with traits around that user. This is usually called after a user has signed in to your application, or when a user's attributes have been updated.. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Bento as an `identify` event.


### Track

Send [Track](/docs/connections/sources/catalog/libraries/website/javascript/#track) calls to capture some user action being taking in your application.  This is often called when a user performs some action, like Button Clicked or Onboarding Completed. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Bento as a `track` event.

### Group

Send [Group](/docs/connections/sources/catalog/libraries/website/javascript/#group) calls for clusters of users. For example:

```js
analytics.group("0e8c78ea9d9dsasahjg", {
  name: "group_name",
  employees: 3,
  plan: "enterprise",
  industry: "Technology"
});
```

Segment sends Group calls to Bento as a `group` event.

---
