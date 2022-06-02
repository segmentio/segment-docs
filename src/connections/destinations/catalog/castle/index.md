---
title: Castle Destination
id: 56a8f566e954a874ca44d3b0
---
Once you enable the Castle integration, the [Castle JavaScript snippet](https://docs.castle.io/docs/sdk-browser) is placed on your website, and user data starts appearing in the Castle dashboard.
Client-side tracking works out of the box, however **your existing server-side calls need to be extended** with data from the incoming request.

Castle supports calling `identify`, `page`, `screen`, and `group`. Castle does *not* support the `alias` call.

## Integration steps
1. Track successful and failed logins
1. Extend server-side tracking with request properties
1. `identify`, preferably on the server-side
1. _Optional:_ Use Castle's `authenticate` API to request a risk score
1. _Recommended:_ Secure Mode

## Tracking successful and failed logins
A baseline integration of Castle includes tracking [successful and failed login attempts](https://docs.castle.io/docs/failed-logins). If you track these events using a Segment integration, you can use [Event Mapping](https://dashboard.castle.io/settings/events) to indicate which events correspond to Castle reserved events.

> info ""
> If you request a Castle risk score for the "Logged in" event, you should **not** map that event to Castle's reserved `$login.succeeded`. Instead, [`authenticate`](https://docs.castle.io/docs/authentication-method) that event through Castle. See next section on _Requesting a risk score_.

Here are two Ruby examples on how to track successful and failed login attempts (`context` and `integration` have been omitted for brevity):

```ruby
analytics.track(
  user_id: '019mr8mf4r',
  event: 'Logged in'
)
```

When you track failed logins, you can protect against account threats such as password guessing. If you don't know which user that generated the failed login, omit the `user_id`. Instead, whenever you have access to the user-submitted email field, add this to the event properties as `email` or `username` depending on how you identify your users. Sending both `user_id` and `email` at the same time does not cause any data problems.

```ruby
# known user
analytics.track(
  user_id: '019mr8mf4r',
  event: 'Failed to log in'
)
# unknown user
analytics.track(
  anonymous_id: UUID.generate,
  event: 'Failed to log in',
  properties: {
    email: 'johan@example.com'
  }
)
```

> info ""
> Segment requires either `user_id` or `anonymous_id` for the request to be processed. If you don't know which user generated the failed login create a UUID and provide it as `anonymous_id`

## Extending server-side tracking with request properties
Tracking events from your server-side is crucial to prevent requests from getting blocked by malicious actors. This is recommended for all [Castle's reserved events](https://docs.castle.io/docs/events), such as logins and password changes.

> warning "" 
> Server-side `track` events are dropped by Castle unless they contain the properties listed below. `identify` calls still create or update a user, but don't create a device if these properties are missing:
> - `context.ip`. The user's IP address, i.e. not your server's internal IP
> - `context.user_agent`, alternatively `context.headers` containing at least the `user_agent` field.
> - `context.client_id`. The _Client ID_ forwarded by the web or mobile SDK.

These properties are described in detail in the next section.

If you aren't tracking the properties above, you can still make the event appear in the user timeline by configuring it to _Force Track_ in the [Castle dashboard](https://dashboard.castle.io/settings/events). However, it does not attach to a device or contribute to the risk score.

Here's a Ruby example of a server-side `track` call extended with request properties:

```ruby
analytics.track(
  user_id: '019mr8mf4r',
  event: 'Logged in'
  context: {
    ip: '8.8.8.8',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
    client_id: '7a31b5a1-7e01-4377-b086-5a488ec8a0ca',
    headers: {
      accept_language: 'da, en-gb;q=0.8, en;q=0.7',
      ...
    }
  })
```

> **Note:** If you're concerned about sending `client_id` and `headers` to all of your active Segment integrations, instead include them in the `integrations.Castle` object to keep them private to your Castle integration.

### The `client_id` property
By forwarding a client identifier from the client-side to the server-side, you can link activity from the two sources to form a strong protection against attacks where this link is not present.

The Castle JavaScript SDK (loaded by Analytics.js) forwards the client identifier as a browser cookie named `__cid`.

The Castle [iOS](https://docs.castle.io/docs/sdk-ios) and [Android](https://docs.castle.io/docs/sdk-android) SDKs forward it as the HTTP header `X-Castle-Client-Id`. See the respective documentation pages for instructions on how to configure the header forwarding.

Here's a Ruby example on how to extract the Client ID on your server-side:

```ruby
client_id =
  request.cookies['__cid'] ||
  request.headers['X-Castle-Client-Id']
```

On **iOS**, forward the device UUID as client identifier:

```objc
[request setValue:uuid forHTTPHeaderField:@"X-Castle-Client-Id"];
NSURL *url = [NSURL URLWithString:@"https://api.yoursite.com/login"];
NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url];
NSString *uuid = [UIDevice currentDevice].identifierForVendor.UUIDString;
```

On **Android**, forward the device identifier from Segment's `Utils` package as client identifier:

```java
// com.segment.analytics.internal.Utils
String uuid = Utils.getDeviceId();
OkHttpClient client = new OkHttpClient();
Request request = new Request.Builder()
  .url("https://api.yoursite.com/login")
  .header("X-Castle-Client-Id", uuid)
  .build();
```

> **Note**: If you have a client-less integration, for instance if you're using Castle to protect a customer-facing API, set `client_id` to `false`.

### The `headers` property
By forwarding HTTP request headers from the server-side, Castle is able to build a richer device fingerprint and prevent malicious actors from spoofing the client environment.
For privacy reasons, **you do not want to send the "Cookie" header to Castle**, so make sure you delete if from the list of headers.

```
{
  user_agent: 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  accept_language: 'en-us,en;q=0.5',
  accept_encoding: 'gzip,deflate',
  accept_charset: 'ISO-8859-1,utf-8;q=0.7,*;q=0.7'
}
```

There are example implementations on how to extract request headers in [PHP](https://github.com/castle/castle-php/blob/e93de1532ef28af17b8bf2bef350e6995a580085/lib/Castle/Request.php#L31), [Ruby](https://github.com/castle/castle-ruby), and [Java](https://github.com/castle/castle-java/blob/96cdc7469aa0995a836100c3dfd370b10f299e8c/src/main/java/io/castle/client/objects/UserInfoHeader.java#L148).

## Identify
When you call [`identify`](/docs/connections/spec/identify), a user will be created in Castle. The Segment special traits `email`, `username`, `name`, `createdAt`, `phone`, and `address` are mapped to Castle's reserved user traits.

Any additional traits will be stored on the Castle user model as _custom traits_.

> **Recommended:** Prevent `identify` from getting blocked in the client during an account takeover by calling `identify` from your server.

Here's a complete JavaScript example of an `identify` call:

```javascript
analytics.identify('1234', {
  email: 'johan@example.com', // recommended
  createdAt: '2015-02-23T22:28:55.387Z', // recommended
  name: 'Johan Brissmyr', // for display
  username: 'brissmyr', // for display
  balance: 1350, // custom trait
  phone: '+1 415 254 9225', // improved risk scoring
  address: { // improved risk scoring
    street: '60 Rausch St',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94103',
    country: 'USA'
  }
});
```

> **Note:** If you call `authenticate` to obtain a risk score, you do *not* need to call `identify` from the server-side. Instead, `authenticate` provides a way to attach `traits` in the same call.

## Secure Mode
Enable Secure Mode to prevent fraudsters from impersonating your users.

> **Note:** Secure Mode is highly encouraged for production deployments, but can wait until after a completed proof a concept.
To enable Secure Mode in Analytics.js, you pass in the `secure` variable by rendering it in your server-side templates. The `secure` field should be a SHA256 hash of your Castle API Secret and the user ID.

Here's an JavaScript example of an `identify` call with Secure Mode being rendered with Ruby server-side templating language:

```javascript
analytics.identify('1234', {
  email: 'johan@example.com',
  createdAt: '2015-02-23T22:28:55.387Z',
}, {
  integrations: {
    Castle: {
      secure: '<%%= OpenSSL::HMAC.hexdigest("sha256", "YOUR_CASTLE_API_SECRET", current_user.id.to_s) %>'
    }
  }
});
```

To use secure mode in your mobile app, you will need to first fetch the secure token from your server-side, for example:

```ruby
# GET https://api.yoursite.com/token
def user_token(user_id)
  OpenSSL::HMAC.hexdigest("sha256", "YOUR_CASTLE_API_SECRET", user_id.to_s)
end
```

## Requesting a risk score
Castle's adaptive authentication tells you whether to allow access, initiate a second factor of authentication, or log out the user.

Since all Segment calls are called asynchronously, you'll need to use Castle's native SDKs to perform [adaptive authentication](https://docs.castle.io/docs/authentication-method).
