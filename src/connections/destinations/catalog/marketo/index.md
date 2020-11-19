---
title: Marketo Destination
---

## Getting Started

When you enable Marketo in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Marketo's Munchkin onto your page. This means you should remove Marketo's snippet from your page.
+ Marketo starts automatically recording visitor information.

### Important Note:
Our client-side and server-side destinations each require **different** credentials for authentication. Read through the information below on `identify` calls for further information.

- - -

## Page and Track

For [`Page`](/docs/connections/spec/page/) or [`Track`](/docs/connections/spec/track/) methods, Segment uses [Marketo's Munchkin.js `visitWebPage` method](http://developers.marketo.com/javascript-api/lead-tracking/api-reference/#munchkin_visitwebpage). The URL is built from the Segment event and properties object into the form Marketo expects, so no need to worry about doing that yourself.

To associate Track events to a particular Lead in Marketo from a server side library, you will need to pass the Munchkin.js cookie with your track calls.

## Identify

### Client-side

When you call [`identify`](/docs/connections/spec/identify/) on Analytics.js, we call Marketo's [`associateLead`](http://developers.marketo.com/documentation/websites/lead-tracking-munchkin-js/). Marketo **requires an email address** for this function, so if  the `traits` object you include in [`identify`](/docs/connections/spec/identify/) doesn't have an email, the request won't go through. Marketo's client-side library, [Munchkin](http://developers.marketo.com/documentation/websites/lead-tracking-munchkin-js/), **requires your API private key** for authentication along with your email, so make sure that you have provided it in your Segment settings. We will not change the casing of traits on client-side identify calls.

```javascript
analytics.identify('1234', {
  email: 'example@example.com',
  name: 'Jake Peterson',
  company: 'Segment',
  favoriteColor: 'Blue'
});
```

In order to properly sign the `associateLead` request while keeping your account and data secure, we make a request to our API that calculates the appropriate SHA1 security hash for the user you're identifying. We use this hash to sign the `associateLead` request to Marketo.

Note that we will automatically send `userId` as a trait. Normally, the `userId` was sent as an `id` inside the traits but Marketo silently ignores that field as they use it for their own purposes. So if you create a custom field inside Marketo for `userId`, your leads will automatically have that field populated.

### Server Side

When you can [`identify`](/docs/connections/spec/identify/) with a `traits` object on any of the server-side languages, we make a call to Marketo's `syncLead` SOAP API action. This call either creates or a updates `traits` on a lead based on the email address either in `userId` or `traits.email`.

We will attempt to PascalCase server-side traits. So if you send `secondFavoriteColor` as a trait, we will convert that to `SecondFavoriteColor`, so you should set the trait **API name** in Marketo to `SecondFavoriteColor`. If you send the trait as `second_favorite_color`, we will convert that to `Second_favorite_color`, so you should set the API name to be `Second_favorite_color` (this is less than ideal; however, we plan to update this behavior in v2 of our Marketo destination, so stay tuned!).

Note that leads can only be synced every 30 seconds using the SOAP API. If you exceed the allowed request amount, you will see `Exceeded lock attempts` errors in your debugger.

Our server side destination with Marketo **requires your encryption key** along with your email for authentication, make sure you have provided it in your Segment settings.

Remember to provide an email with every call as either the `userId` or as a trait labeled "email". Here's a java example of that:

```java
Analytics.identify("hj2kf92ds212",
    new Traits()
        .put("email", "tom@example.com")
        .put("name", "Tom Smykowski"));
```

Marketo uses cookies to keep track of visitors and their sessions while visiting your website. The cookie data is stored in the visitor's browser, and is sent along to Marketo every time a new event occurs. This allows them to show a single unique lead between multiple page reloads.

Your servers also have access to this cookie, so they can re-use it when you send server-side events to Segment. If you don't use the existing cookie Segment will use either the userId or sessionId to make the server-side request to Marketo. When we create a new cookie, the client-side and server-side events from the same user will look like two distinct leads when viewed in Marketo. The cookieId takes precedence over all other keys, so if you send both the cookieId and the userId - the cookieId will match first and the userId for that lead will be updated.

To associate leads in server-side Marketo, there are currently three options with Segment:

1. Pass your Marketo cookies to Segment.
2. Use the userId or sessionId when associating leads in Marketo.
3. Ignore the additional visitors generated by passing different types of ids for each call (i.e. cookieId once, then the userId for the same user the second time).

If you choose to pass the cookie with your calls, it will look like this:

```
id:561-HYG-937&token:_mch-marketo.com-1374552656411-90718
```

If you want our server-side destination to use your user's Marketo Cookie, pass it to us in the `context['Marketo'].marketoCookie` object.

Here's a Ruby example:

```ruby
Analytics.identify(
  user_id: '019mr8mf4r',
  traits: {
    email: 'Jake@segment.com',
    firstName: 'Jake',
    lastName: 'Peterson'
  },
  context: {
    'Marketo' => {
        marketoCookie: 'id:561-HYG-937&token:_mch-marketo.com-1374552656411-90718'
    }
  }
)
```

**Note:** If you choose to use the cookie approach, make sure to send the cookie along in your `track` calls as well, as Marketo will need it on subsequent calls to tie activity to that user.

A `track` call might look like this:

```ruby
Analytics.track(
  user_id: '019mr8mf4r',
  event: 'Update Buying Period',
  properties: {
    newPeriod: '2016-01-01',
    lastName: 'Peterson',
    email: 'Jake@segment.com'
  },
  context: {
    'Marketo' => {
        marketoCookie: 'id:561-HYG-937&token:_mch-marketo.com-1374552656411-90718'
    }
  }
)
```

For more information about syncronising your Marketo leads, [visit their documentation](http://developers.marketo.com/documentation/soap/synclead/).

### Custom Fields

To create a custom field in Marketo, follow Marketo's [documentation for creating a custom field](http://docs.marketo.com/display/public/DOCS/Create+a+Custom+Field+in+Marketo). Be sure that the **API Name** is `PascalCase`'d, as our destination will account for Marketo's Pascal trait standards.

For instance, if you configure `SomeTrait` in the **API Name** field (the **Name** value does not matter), you can pass in this field as `someTrait`, and we will convert this to `SomeTrait` when sending into Marketo. Note that if you configured **API Name** to be `someTrait`, and passed it in as `someTrait` in your call, this would fail to send.
