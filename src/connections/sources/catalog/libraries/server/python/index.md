---
title: Analytics for Python
id: XRksQPCr7X
support_type: maintenance
---
Segment's Python library lets you record analytics data from your Python code. The requests hit Segment's servers, and then Segment routes your data to any analytics service you enable on your destinations page.

This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-python).

All of Segment's server-side libraries are built for high-performance, so you can use them in your web server controller code. This library uses an internal queue to make Identify and Track calls non-blocking and fast. It also batches messages and flushes asynchronously to Segment's servers using a separate thread.

Want to stay updated on releases? Subscribe to the [release feed](https://github.com/segmentio/analytics-python/releases.atom).

## Getting Started

Install `segment-analytics-python` using pip:

```
pip install segment-analytics-python
```

If you're using a system for managing dependencies, you'll want to pin the library to `1.X` to avoid breaking changes when the library is updated

Inside your app, you'll want to **set your `write_key`** before making any analytics calls:

```python
import segment.analytics as analytics

analytics.write_key = 'YOUR_WRITE_KEY'
```

**Note:** If you need to send data to multiple Segment sources, you can initialize a new Client for each `write_key`.

### Development settings

The default initialization settings are production-ready and queue messages to be processed by a background thread.

In development, Segment recommends that you enable the following settings to help spot problems:
- `analytics.debug` to log debugging information to the Python logger
- an `on_error` handler to print the response you receive from Segment's API.

```python
def on_error(error, items):
    print("An error occurred:", error)


analytics.debug = True
analytics.on_error = on_error
```

If you don't want to send information to Segment during testing, add the following code to your test:

```python
analytics.send = False
```

**Using Django?** Check out the [Django docs](/docs/connections/sources/catalog/libraries/server/python/#django).

### Regional configuration
{% include content/regional-config.md %}

## Identify

> success ""
> For any of the different methods described on this page, you can replace the properties and traits in the code samples with variables that represent the data collected.

The Identify method lets you tie a user to their actions and record traits about them.  It includes a unique User ID and any optional traits you know about them.

Segment recommends that you call Identify  once when the user's account is created, and later when their traits change.

Example Identify  call:

```python
analytics.identify('019mr8mf4r', {
    'email': 'john@example.com',
    'name': 'John Smith',
    'friends': 30
})
```

The example Identify  call is identifying John by his unique User ID (the one you know him by in your database) and labeling him with `email`, `name` and `friends` traits.

The Identify  call has the following fields:

| Field                                    | Description                                                                                                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `user_id` _string or int_                | The ID for this user in your database.                                                                                                                                                                       |
| `traits` _dict, optional_                | A dict of traits you know about the user. Things like: `email`, `name` or `friends`.                                                                                                                         |
| `context` _dict, optional_               | A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)                              |
| `timestamp` _datetime, optional_         | A `datetime` object representing when the Identify call took place. This is most useful if you import historical data. If the Identify call just happened, leave it blank and Segment uses the server's time. |
| `anonymous_id` _string or int, optional_ | An anonymous session ID for this user.                                                                                                                                                                       |
| `integrations` _dict, optional_          | A dictionary of destinations to enable or disable                                                                                                                                                            |


Find details on the **Identify  method payload** in the [Segment Spec](/docs/connections/spec/identify/).

## Track

Track lets you record the actions your users perform. Every action triggers what Segment calls an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, Segment recommends tracking just a few important events. You can always add more later.

Example Track call:

```python
analytics.track('f4ca124298', 'Signed Up', {
  'plan': 'Enterprise'
})
```
This call informs Segment that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan.

Track event properties can be anything you want to record, for example:

```python
analytics.track('f4ca124298', 'Article Bookmarked', {
    'title': 'Snow Fall',
    'subtitle': 'The Avalance at Tunnel Creek',
    'author': 'John Branch'
})
```

The Track method has the following fields:

| Field                                    | Description                                                                                                                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id` _string_                       | The ID for this user in your database.                                                                                                                                                        |
| `event` _string_                         | The name of the event you're tracking. Use human-readable names like **Song Played** or **Status Updated**.                                                                                   |
| `properties` _dict, optional_            | A dictionary of properties for the event. If the event was **Product Added**, it might have properties like `price` or `product`.                                                             |
| `context` _dict, optional_               | A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)               |
| `timestamp` _datetime, optional_         | A `datetime` object representing when the Track took place. This is most useful if you're importing historical data. If the Track just happened, leave it blank to use the server's time. |
| `anonymous_id` _string or int, optional_ | An anonymous session ID for this user.                                                                                                                                                        |
| `integrations` _dict, optional_          | A dictionary of destinations to enable or disable                                                                                                                                             |


Find details on **best practices in event naming** as well as the **Track method payload** in the [Segment Spec](/docs/connections/spec/track/).

## Page

The [Page](/docs/connections/spec/page) method lets you record page views on your website, along with optional extra information about the page being viewed.

If you use a client-side set up in combination with the Python library, page calls are **already tracked for you** by default. If you want to record your own page views manually and aren't using a client-side library, read on.

Example Page call:

```python
analytics.page('user_id', 'Docs', 'Python', {
  'url': 'http://segment.com'
})
```
The Page call has the following fields:

| Field                                    | Description                                                                                                                                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id` _string                        | The ID for the user that is a part of the group.                                                                                                                                            |
| `category` _string, optional_            | The category of the page. Useful for industries, like ecommerce, where many pages often live under a larger category.                                                                             |
| `name` _string, optional_                | The name of the page, for example **Signup** or **Home**.                                                                                                                                   |
| `properties` _dict, optional_            | The page properties. To see a reference of reserved page properties, see the [Spec: Page](/docs/connections/spec/page/#properties) documentation.                                                          |
| `context` _dict, optional_               | A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)             |
| `timestamp` _datetime, optional_         | A `datetime` object representing when the Page took place. This is most useful if you're importing historical data. If the Page just happened, leave it blank to use the server's time. |
| `anonymous_id` _string or int, optional_ | An anonymous session ID for this user.                                                                                                                                                      |
| `integrations` _dict, optional_          | A dictionary of destinations to enable or disable                                                                                                                                           |


Find details on the **Page method payload** in the [Segment Spec](/docs/connections/spec/page/).

## Screen

The [Screen](/docs/connections/spec/screen) method lets you record screen views on your mobile app, along with optional extra information about the screen being viewed.

If you use a Segment mobile SDK in combination with the library, screen calls are **already tracked for you** by default.If you want to record your own screen views manually and don't use a Segment SDK library, learn how below.

Example Screen call:

```python
analytics.screen('user_id', 'Settings', 'Brightness', {
  'from': 'Home Screen'
})
```

The Screen call has the following fields:

| Field                                    | Description                                                                                                                                                                                     |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id` _string or number_             | The ID for the user that is a part of the group.                                                                                                                                                |
| `category` _string, optional_            | The category of the page. Useful for things like ecommerce where many pages often live under a larger category.                                                                                 |
| `name` _string, optional_                | The name of the page, for example **Signup** or **Home**.                                                                                                                                       |
| `properties` _dict, optional_            | A dictionary of properties of the screen.                                                                                                                                                       |
| `context` _dict, optional_               | A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)                 |
| `timestamp` _datetime, optional_         | A `datetime` object representing when the Screen took place. This is most useful if you're importing historical data. If the Screen just happened, leave it blank to use the server's time. |
| `anonymous_id` _string or int, optional_ | An anonymous session ID for this user.                                                                                                                                                          |
| `integrations` _dict, optional_          | A dictionary of destinations to enable or disable                                                                                                                                               |


Find details on the **Screen method payload** in the [Segment Spec](/docs/connections/spec/screen/).

---
## Group

Group lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/python/#identify) with a group. A group could be a company, organization, account, project or team. It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example Group call:

```python
analytics.group('user_id', 'group_id', {
  'name': 'Initech',
  'domain': 'Accounting Software'
})
```

The Group call has the following fields:

| Field                                    | Description                                                                                                                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id` _string or number_             | The ID for the user that is a part of the group.                                                                                                                                              |
| `group_id` _string or number_            | The ID of the group.                                                                                                                                                                          |
| `traits` _dict, optional_                | A dict of traits you know about the group. For a company, they might be things like `name`, `address`, or `phone`.                                                                            |
| `context` _dict, optional_               | A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)               |
| `timestamp` _datetime, optional_         | A `datetime` object representing when the Group call took place. This is most useful if you're importing historical data. If the Group call just happened, leave it blank to use the server's time. |
| `anonymous_id` _string or int, optional_ | An anonymous session ID for this user.                                                                                                                                                        |
| `integrations` _dict, optional_          | A dictionary of destinations to enable or disable                                                                                                                                             |


Find more details about Group, including the **Group method payload**, in the [Segment Spec](/docs/connections/spec/group/).

## Alias

Alias is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of Segment's destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias) if your user switches IDs, you can use Alias to rename the 'userId'.

Example Alias call:

```python
analytics.alias(previous_id, user_id)
```
The Alias call has the following fields:

| Field                            | Description                                                                                                                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `previous_id` _string_           | The previous ID for this user to alias from.                                                                                                                                                  |
| `user_id` _string_               | The user ID to alias to.                                                                                                                                                                      |
| `context` _dict, optional_       | A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)               |
| `timestamp` _datetime, optional_ | A `datetime` object representing when the Alias took place. This is most useful if you're importing historical data. If the Alias just happened, leave it blank to use the server's time. |
| `integrations` _dict, optional_  | A dictionary of destinations to enable or disable                                                                                                                                             |


Here's a full example of how Segment might use the Alias call:

```python
# the anonymous user does actions under an anonymous ID
analytics.track('92734232-2342423423-973945', 'Anonymous Event')

# the anonymous user signs up and is aliased to their new user ID
analytics.alias('92734232-2342423423-973945', '1234')

# the user is identified
analytics.identify('1234', { plan: 'Free' })

# the identified user does actions
analytics.track('1234', 'Identified Action')
```

For more details about Alias, including the **Alias call payload**, see the [Segment Spec](/docs/connections/spec/alias/).


## Historical import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, Kissmetrics, etc. can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

> info ""
> If you track things that are happening right now, omit the `timestamp` and Segment's servers will timestamp the requests for you.

```python
import datetime
from dateutil.tz import tzutc

timestamp = datetime.datetime(2538, 10, 17, 0, 0, 0, 0, tzinfo=tzutc())
analytics.track('019mr8mf4r', 'Bought a game', {
    'game': 'Duke Nukem forever'
}, timestamp=timestamp)
```


### Timezones in Python

Python's `datetime` module supports two types of date and time objects: "naive" objects without timezone information, and "aware" objects that include timezones. By default, newly created `datetime` objects are naive. You'll want to make sure to use timezone aware objects when importing data to be sure the timezone information is sent correctly.

Segment created an aware datetime object in the example above using the `tzinfo` argument to the `datetime` constructor. If the argument were omitted, Segment would not pass timezone info:

```python
>>> naive = datetime.datetime(2015, 1, 5, 0, 0, 0, 0)
>>> aware = datetime.datetime(2015, 1, 5, 0, 0, 0, 0, tzinfo=tzutc())
>>> naive.isoformat()
'2015-01-05T00:00:00'
>>> aware.isoformat()
'2015-01-05T00:00:00+00:00'
```

If you have an ISO format timestamp string that contains timezone information, `dateutil.parser` is capable of creating aware datetime objects:

```python
>>> import dateutil.parser
>>> dateutil.parser.parse('2012-10-17T18:58:57.911Z')
datetime.datetime(2012, 10, 17, 18, 58, 57, 911000, tzinfo=tzutc())
>>> dateutil.parser.parse('2016-06-06T01:46:33.939388+00:00')
datetime.datetime(2016, 6, 6, 1, 46, 33, 939388, tzinfo=tzutc())
>>> dateutil.parser.parse('2016-06-06T01:46:33.939388+07:00')
datetime.datetime(2016, 6, 6, 1, 46, 33, 939388, tzinfo=tzoffset(None, 25200))
>>> dateutil.parser.parse('2016-06-06T01:46:33.939388-07:00')
datetime.datetime(2016, 6, 6, 1, 46, 33, 939388, tzinfo=tzoffset(None, -25200))
```

If you find yourself with a naive object, and know what timezone it should be in, you can also use [pytz](http://pytz.sourceforge.net/){:target="_blank”} to create an aware `datetime` object from the naive one:

```python
>>> import datetime
>>> import pytz
>>> naive = datetime.datetime.now()
>>> aware = pytz.timezone('US/Pacific').localize(naive)
>>> naive.isoformat()
'2016-06-05T21:52:14.499635'
>>> aware.isoformat()
'2016-06-05T21:52:14.499635-07:00'
```

The [pytz documentation](http://pytz.sourceforge.net/#example-usage){:target="_blank”} contains some good additional information on timezone usage, as well as how to handle some of the more interesting edge cases.

Whatever your method, make sure you use aware `datetime` objects when importing your data or it will be in the wrong timezone.

```python
# Check that a datetime object d is aware
assert d.tzinfo is not None and d.tzinfo.utcoffset(d) is not None
```

### Server logs example

```python
import dateutil.parser

import segment.analytics as analytics
analytics.write_key = 'YOUR_WRITE_KEY'

log = [
    '2012-10-17T18:58:57.911Z 019mr8mf4r /purchased/tshirt'
]

for entry in log:
    timestamp_str, user_id, url = entry.split(' ')
    timestamp = dateutil.parser.parse(timestamp_str)  # resulting datetime.datetime object is aware

    # have a timezone? check yo'self
    assert timestamp.tzinfo is not None and timestamp.tzinfo.utcoffset(timestamp) is not None

    analytics.track(user_id, 'Shirt Bought', {
        'color': 'Blue',
        'revenue': 17.90
    }, timestamp=timestamp)

analytics.flush()
```

---

## Selecting destinations

The Alias, Group, Identify, Page, and Track calls can all be passed an object of `integrations` that lets you turn certain destinations on or off. By default all destinations are enabled.

Here's an example Track call with the `integrations` object shown.

```python
analytics.track('9742', 'Song Played', integrations={
  'all': False,
  'Kissmetrics': True,
  'Google Analytics': False
})
```
This example illustrates that this track call goes only to Kissmetrics. `'all': False` says that no destination should be enabled unless otherwise specified. `'Kissmetrics': True` enables Kissmetrics.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (for example, "AdLearn Open Platform", "awe.sm", or "MailChimp").

## Batching

Segment's libraries are built to support high performance environments. It's safe to use analytics-python on a web server that serves hundreds of requests per second.

Every method you call **does not** result in an HTTP request, but is queued in memory instead. Messages are flushed in batch in the background, which allows for much faster operation.

By default, Segment's Python library will flush:

- every 100 messages (control with `upload_size`)
- if 0.5 seconds has passed since the last flush (control with `upload_interval`)

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}


### What happens if there are just too many messages?

If the module detects that it can't flush faster than it's receiving messages, it'll simply stop accepting messages. This means your program will never crash because of a backed up analytics queue. The default `max_queue_size` is `10000`.

### Flush

You can call the `flush` method at the end of your program to make sure there's nothing left in the queue:

```python
analytics.flush()
```

Calling this method will _block_ the calling thread until there's no messages left in the queue. You'll want to use it as part of your cleanup scripts and avoid using it as part of the request lifecycle.

### How do I gzip requests?

You can compress batched requests before sending them to Segment by setting the `gzip` argument when constructing a Client.

```python
from analytics import Client
Client('YOUR_WRITE_KEY', gzip=True)
```

### Detecting errors

You can listen to events to be called on failed flushes:

```python
def on_error(error, items):
    print('Failure', error)

analytics.on_error = on_error
```

## Logging

analytics-python uses the standard python logging module. By default, logging is enabled and set at the `logging.WARNING` level. If you want it to talk more, you can set a different `log_level`:

```python
import logging
logging.getLogger('segment').setLevel('DEBUG')
```

## Options

If you hate defaults or want to send data to multiple sources, then you can create your own Clients. Keep in mind that each client runs a separate background thread, so you won't want to create these on every request. Check out these gizmos:

```python
from analytics import Client
Client('YOUR_WRITE_KEY', debug=True, on_error=on_error, send=True,
       max_queue_size=100000, upload_interval=5, upload_size=500, gzip=True)
```

| Field                     | Description                                                                                                                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `debug` _bool_            | `True` to log more verbosely, `False` by default.                                                                                                                                                                          |
| `send` _bool_             | `False` to avoid sending data to Segment, `True` by default.                                                                                                                                                               |
| `on_error` _function_     | Set an error handler to be called whenever errors occur                                                                                                                                                                    |
| `max_queue_size` _int_    | Maximum number of elements allowed in the queue. If this condition is ever reached, that means you're identifying / tracking faster than you can flush. If this happens, [let Segment know](https://segment.com/help/contact/). |
| `upload_interval` _float_ | The frequency, in seconds, to send data to Segment. Default value is 0.5.                                                                                                                                                  |
| `upload_size` _int_       | Number of items in a batch to upload. Default value is 100.                                                                                                                                                                |
| `gzip` _bool_             | `True` to compress data with gzip before sending, `False` by default.                                                                                                                                                      |
| `sync_mode` _bool_        | `True` to disable threading and send all request synchronously, `False` by default. Experimental, see [Background threads and synchronous mode](#background-threads-and-synchronous-mode).                                 |



## Django

To add analytics to your Django web server, you need to include the initialization code in the [`ready()` method](https://docs.djangoproject.com/en/dev/ref/applications/#django.apps.AppConfig.ready) of a custom `AppConfig` object for one of the apps in your project. This method is responsible for performing initialization tasks for your project.

`myapp/apps.py` file:

```python
from django.apps import AppConfig
import segment.analytics as analytics

class MyAppConfig(AppConfig):

    def ready(self):
        analytics.write_key = 'YOUR_WRITE_KEY'
```

`myapp/__init__.py` file:

```python
default_app_config = 'myapp.apps.MyAppConfig'
```

### How do I add logging to Django?

If you're troubleshooting your analytics, you'll want to turn on logging.

You need to add the `analytics` logger and handler to your `settings.py`.

```python
LOGGING = {
    'version': 1,
    'formatters': {
        'simple': {
            'format': '%(levelname)s %(message)s'
        }
    },
    'handlers': {
        'console': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'formatter': 'simple'
        }
    },
    'loggers': {
        'segment': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        }
    }
}
```

and turn on module logging in your initialization call in `urls.py`.

```python
import logging
import segment.analytics as analytics

analytics.debug = True # turn on debug logging
analytics.write_key = 'YOUR_WRITE_KEY'
```

## Google App Engine

Google App Engine may not resolve project dependencies. If this is the case add the following to your project alongside analytics-python:
- [requests](https://github.com/kennethreitz/requests){:target="_blank"}
- [python-dateutil](https://github.com/paxan/python-dateutil){:target="_blank"}

If you're having issues with threads outliving your request, check [Background threads and synchronous mode](#background-threads-and-synchronous-mode)

## OAuth 2.0

Enable [OAuth 2.0](/docs/connections/oauth/) in your Segment workspace to guarantee authorized communication between your server environment and Segment's Tracking API. To support the non-interactive server environment, the OAuth workflow used is a signed client assertion JWT.  

You will need a public and private key pair where:
- The public key is uploaded to the Segment dashboard. 
- The private key is kept in your server environment to be used by this SDK. 
Your server will verify its identity by signing a token request and will receive a token that is used to to authorize all communication with the Segment Tracking API.

You'll need to provide the OAuth Application ID and the public key's ID, both of which are provided in the Segment dashboard.  There are also options available to specify the authorization server, custom scope, maximum number of retries, or a custom HTTP client if your environment has special rules for separate segment endpoints.

Be sure to implement handling for Analytics SDK errors. Good logging will help distinguish any configuration issues.

For more information, see the [Segment OAuth 2.0 documentation](/docs/connections/oauth/).

```python
import segment.analytics as analytics
with open("private_key.pem") as f:
    privatekey = f.read()

analytics.write_key = '<YOUR WRITE KEY HERE>'

analytics.oauth_client_id = 'CLIENT_ID' # OAuth application ID from segment dashboard
analytics.oauth_client_key = privatekey # generated as a public/private key pair in PEM format from OpenSSL
analytics.oauth_key_id = 'KEY_ID' # From segment dashboard after uploading public key

def on_error(error, items):
    print("An error occurred: ", error)
analytics.on_error = on_error

analytics.track('AUser', 'track')
analytics.flush()
```

## Troubleshooting

### Request size limits

{% include content/tracking-api-limit.md %}


{% include content/troubleshooting-intro.md %}
{% include content/troubleshooting-server-debugger.md %}
{% include content/server-side-troubleshooting.md %}

### Override context value

In some cases, you will want to manually pass in `ip` or `userAgent` values. Since Segment does not automatically send these, you can pass these through the `context` object as follows:

```python
analytics.track('9742', 'Song Played', context={
  'ip': 1234,
  'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30'
})
```

Be sure to see the full [reference of supported keys](/docs/connections/spec/common/#context).

### Versioning

Check that you have the most recent version.

```
python -c "import segment.analytics as analytics; print analytics.VERSION"
```

Does it match [the most current version](https://github.com/segmentio/analytics-python/blob/master/analytics/version.py#L2)?

If not, update your version.

```
pip install -U segment-analytics-python
```

or

```
easy_install --upgrade segment-analytics-python
```

### Background threads and synchronous mode

*Experimental feature, available since `1.3.0b1`.*

In some cases, you will want to disable threads and send each request synchronously. If your source is managing tasks asynchronously using software like [Celery](https://docs.celeryq.dev/en/stable/getting-started/introduction.html){:target="_blank”}, consider enabling this option to resolve potential conflicts with the Segment Python library's threading system.

To do so, you can use the `sync_mode` option:

```python
import segment.analytics as analytics

analytics.write_key = 'YOUR_WRITE_KEY'
analytics.sync_mode = True
```
