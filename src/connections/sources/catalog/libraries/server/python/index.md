---
title: Analytics for Python
id: XRksQPCr7X
---
Segment's Python library lets you record analytics data from your Python code. The requests hit Segment's servers, and then we route your data to any analytics service you enable on your destinations page.

This library is open-source, so you can [check it out on GitHub](https://github.com/segmentio/analytics-python).

All of Segment's server-side libraries are built for high-performance, so you can use them in your web server controller code. This library uses an internal queue to make `identify` and `track` calls non-blocking and fast. It also batches messages and flushes asynchronously to our servers using a separate thread.

Want to stay updated on releases? Subscribe to the [release feed](https://github.com/segmentio/analytics-python/releases.atom).

## Getting Started

Install `segment-analytics-python` using pip:

```
pip install segment-analytics-python
```

If you're using a system for managing dependencies, you'll want to pin the library to `1.X` to avoid breaking changes when the library is updated

Inside your app, you'll want to **set your `write_key`** before making any analytics calls:

```python
import analytics

analytics.write_key = 'YOUR_WRITE_KEY'
```

**Note:** If you need to send data to multiple Segment sources, you can initialize a new Client for each `write_key`.

### Development Settings

The default initialization settings are production-ready and queue messages to be processed by a background thread.

In development you might want to enable some settings to make it easier to spot problems. Enabling `analytics.debug` will log debugging info to the Python logger. You can also add an `on_error` handler to specifically print out the response you're seeing from our API.

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
For Business plans with access to [Regional Segment](/docs/guides/regional-segment), you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `api.segment.io/v1`
2. Dublin — `events.eu1.segmentapis.com/v1/`

## Identify

> note ""
> **Good to know**: For any of the different methods described on this page, you can replace the properties and traits in the code samples with variables that represent the data collected.

The `identify` lets you tie a user to their actions and record traits about them.  It includes a unique User ID and any optional traits you know about them.

We recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change.

Example `identify` call:

```python
analytics.identify('019mr8mf4r', {
    'email': 'john@example.com',
    'name': 'John Smith',
    'friends': 30
})
```

The example `identify` call is identifying John by his unique User ID (the one you know him by in your database) and labeling him with `email`, `name` and `friends` traits.

The `identify` call has the following fields:

<table class="api-table">
  <tr>
    <td>`user_id` _string or int_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`traits` _dict, optional_</td>
    <td>A dict of traits you know about the user. Things like: `email`, `name` or `friends`.</td>
  </tr>
  <tr>
    <td>`context` _dict, optional_</td>
    <td>A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
  <tr>
    <td>`timestamp` _datetime, optional_</td>
    <td>A `datetime` object representing when the `identify` took place. This is most useful if you're importing historical data. If the `identify` just happened, leave it blank and we'll use the server's time.</td>
  </tr>
  <tr>
    <td>`anonymous_id` _string or int, optional_</td>
    <td>An anonymous session ID for this user.</td>
  </tr>
  <tr>
    <td>`integrations` _dict, optional_</td>
    <td>A dictionary of destinations to enable or disable</td>
  </tr>
</table>

Find details on the **identify method payload** in our [Spec](/docs/connections/spec/identify/).

## Track

`track` lets you record the actions your users perform. Every action triggers what we call an "event", which can also have associated properties.

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Example `track` call:

```python
analytics.track('f4ca124298', 'Signed Up', {
  'plan': 'Enterprise'
})
```
This call is telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan.

`track` event properties can be anything you want to record, for example:

```python
analytics.track('f4ca124298', 'Article Bookmarked', {
    'title': 'Snow Fall',
    'subtitle': 'The Avalance at Tunnel Creek',
    'author': 'John Branch'
})
```

The `track` method has the following fields:

<table class="api-table">
  <tr>
    <td>`user_id` _string_</td>
    <td>The ID for this user in your database.</td>
  </tr>
  <tr>
    <td>`event` _string_</td>
    <td>The name of the event you're tracking. We recommend human-readable names like **Song Played** or **Status Updated**.</td>
  </tr>
  <tr>
    <td>`properties` _dict, optional_</td>
    <td>A dictionary of properties for the event. If the event was **Product Added**, it might have properties like `price` or `product`.</td>
  </tr>
  <tr>
    <td>`context` _dict, optional_</td>
    <td>A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
  <tr>
    <td>`timestamp` _datetime, optional_</td>
    <td>A `datetime` object representing when the `track` took place. This is most useful if you're importing historical data. If the `track` just happened, leave it blank and we'll use the server's time.</td>
  </tr>
  <tr>
    <td>`anonymous_id` _string or int, optional_</td>
    <td>An anonymous session ID for this user.</td>
  </tr>
  <tr>
    <td>`integrations` _dict, optional_</td>
    <td>A dictionary of destinations to enable or disable</td>
  </tr>
</table>

Find details on **best practices in event naming** as well as the **`track` method payload** in our [Spec](/docs/connections/spec/track/).

## Page

The [`page`](/docs/connections/spec/page) method lets you record page views on your website, along with optional extra information about the page being viewed.

If you're using our client-side set up in combination with the Python library, page calls are **already tracked for you** by default. However, if you want to record your own page views manually and aren't using our client-side library, read on!

Example `page` call:

```python
analytics.page('user_id', 'Docs', 'Python', {
  'url': 'http://segment.com'
})
```
The `page` call has the following fields:

<table class="api-table">
  <tr>
    <td>`user_id` _string</td>
    <td>The ID for the user that is a part of the group.</td>
  </tr>
  <tr>
    <td>`category` _string, optional_</td>
    <td>The category of the page. Useful for things like ecommerce where many pages often live under a larger category.</td>
  </tr>
  <tr>
    <td>`name` _string, optional_</td>
    <td>The name of the page, for example **Signup** or **Home**.</td>
  </tr>
  <tr>
    <td>`properties` _dict, optional_</td>
    <td>The page properties. To see a reference of reserved page properties that we've standardized, check out our spec [here](https://segment.com/docs/connections/spec/page/#properties).</td>
  </tr>
  <tr>
    <td>`context` _dict, optional_</td>
    <td>A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
  <tr>
    <td>`timestamp` _datetime, optional_</td>
    <td>A `datetime` object representing when the `page` took place. This is most useful if you're importing historical data. If the `page` just happened, leave it blank and we'll use the server's time.</td>
  </tr>
  <tr>
    <td>`anonymous_id` _string or int, optional_</td>
    <td>An anonymous session ID for this user.</td>
  </tr>
  <tr>
    <td>`integrations` _dict, optional_</td>
    <td>A dictionary of destinations to enable or disable</td>
  </tr>
</table>

Find details on the **`page` method payload** in our [Spec](/docs/connections/spec/page/).

## Screen

The [`screen`](/docs/connections/spec/screen) method lets you record screen views on your mobile app, along with optional extra information about the screen being viewed.

If you're using our mobile SDK in combination with the library, screen calls are **already tracked for you** by default. However, if you want to record your own screen views manually and aren't using our SDK library, read on!

Example `screen` call:

```python
analytics.screen('user_id', 'Settings', 'Brightness', {
  'from': 'Home Screen'
})
```

The `screen` call has the following fields:

<table class="api-table">
  <tr>
    <td>`user_id` _string or number_</td>
    <td>The ID for the user that is a part of the group.</td>
  </tr>
  <tr>
    <td>`category` _string, optional_</td>
    <td>The category of the page. Useful for things like ecommerce where many pages often live under a larger category.</td>
  </tr>
  <tr>
    <td>`name` _string, optional_</td>
    <td>The name of the page, for example **Signup** or **Home**.</td>
  </tr>
  <tr>
    <td>`properties` _dict, optional_</td>
    <td>A dictionary of properties of the screen.</td>
  </tr>
  <tr>
    <td>`context` _dict, optional_</td>
    <td>A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
  <tr>
    <td>`timestamp` _datetime, optional_</td>
    <td>A `datetime` object representing when the `screen` took place. This is most useful if you're importing historical data. If the `screen` just happened, leave it blank and we'll use the server's time.</td>
  </tr>
  <tr>
    <td>`anonymous_id` _string or int, optional_</td>
    <td>An anonymous session ID for this user.</td>
  </tr>
  <tr>
    <td>`integrations` _dict, optional_</td>
    <td>A dictionary of destinations to enable or disable</td>
  </tr>
</table>

Find details on the **`screen` method payload** in our [Spec](/docs/connections/spec/screen/).

---
## Group

`group` lets you associate an [identified user](/docs/connections/sources/catalog/libraries/server/python/#identify) with a group. A group could be a company, organization, account, project or team! It also lets you record custom traits about the group, like industry or number of employees.

This is useful for tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.

Example `group` call:

```python
analytics.group('user_id', 'group_id', {
  'name': 'Initech',
  'domain': 'Accounting Software'
})
```

The `group` call has the following fields:

<table class="api-table">
  <tr>
    <td>`user_id` _string or number_</td>
    <td>The ID for the user that is a part of the group.</td>
  </tr>
  <tr>
    <td>`group_id` _string or number_</td>
    <td>The ID of the group.</td>
  </tr>
  <tr>
    <td>`traits` _dict, optional_</td>
    <td>A dict of traits you know about the group. For a company, they might be things like `name`, `address`, or `phone`.</td>
  </tr>
  <tr>
    <td>`context` _dict, optional_</td>
    <td>A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
  <tr>
    <td>`timestamp` _datetime, optional_</td>
    <td>A `datetime` object representing when the `group` took place. This is most useful if you're importing historical data. If the `group` just happened, leave it blank and we'll use the server's time.
    </td>
  </tr>
  <tr>
    <td>`anonymous_id` _string or int, optional_</td>
    <td>An anonymous session ID for this user.</td>
  </tr>
  <tr>
    <td>`integrations` _dict, optional_</td>
    <td>A dictionary of destinations to enable or disable</td>
  </tr>
</table>

Find more details about `group` including the **`group` method payload** in our [Spec](/docs/connections/spec/group/).

## Alias

`alias` is how you associate one identity with another. This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations.

In [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias) it's used to associate an anonymous user with an identified user once they sign up. For [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias) if your user switches IDs, you can use 'alias' to rename the 'userId'.

Example `alias` call:

```python
analytics.alias(previous_id, user_id)
```
The `alias` call has the following fields:

<table class="api-table">
  <tr>
    <td>`previous_id` _string_</td>
    <td>The previous ID for this user to alias from.</td>
  </tr>
  <tr>
    <td>`user_id` _string_</td>
    <td>The user ID to alias to.</td>
  </tr>
  <tr>
    <td>`context` _dict, optional_</td>
    <td>A dict containing any context about the request. To see the full reference of supported keys, check them out in the [context reference](/docs/connections/spec/common/#context)</td>
  </tr>
  <tr>
    <td>`timestamp` _datetime, optional_</td>
    <td>A `datetime` object representing when the `track` took place. This is most useful if you're importing historical data. If the `track` just happened, leave it blank and we'll use the server's time.</td>
  </tr>
  <tr>
    <td>`integrations` _dict, optional_</td>
    <td>A dictionary of destinations to enable or disable</td>
  </tr>
</table>

Here's a full example of how we might use the `alias` call:

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

For more details about `alias` including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

---

## Historical Import

You can import historical data by adding the `timestamp` argument to any of your method calls. This can be helpful if you've just switched to Segment.

Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, Kissmetrics, etc. can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics since their API cannot accept historical data.

**Note:** If you're tracking things that are happening right now, leave out the `timestamp` and our servers will timestamp the requests for you.

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

We created an aware datetime object in our example above using the `tzinfo` argument to the `datetime` constructor. Note that if we'd omitted the argument, we wouldn't have passed along timezone info:

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

If you find yourself with a naive object, and know what timezone it should be in, you can also use [pytz](http://pytz.sourceforge.net/) to create an aware `datetime` object from the naive one:

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

The [pytz documentation](http://pytz.sourceforge.net/#example-usage) contains some good additional information on timezone usage, as well as how to handle some of the more interesting edge cases.

Whatever your method, make sure you use aware `datetime` objects when importing your data or it will be in the wrong timezone.

```python
# Check that a datetime object d is aware
assert d.tzinfo is not None and d.tzinfo.utcoffset(d) is not None
```

### Server Logs Example

```python
import dateutil.parser

import analytics
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

## Selecting Destinations

The `alias`, `group`, `identify`, `page` and `track` calls can all be passed an object of `integrations` that lets you turn certain destinations on or off. By default all destinations are enabled.

Here's an example `track` call with the `integrations` object shown.

```python
analytics.track('9742', 'Song Played', integrations={
  'all': False,
  'Kissmetrics': True,
  'Google Analytics': False
})
```

In this case, we're specifying that we want this identify to only go to Kissmetrics. `'all': False` says that no destination should be enabled unless otherwise specified. `'Kissmetrics': True` turns on Kissmetrics, etc.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**Note:**

- Available at the business level, filtering track calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

- If you are on a grandfathered plan, events sent server-side that are filtered through the Segment dashboard will still count towards your API usage.

## Batching

Our libraries are built to support high performance environments. That means it is safe to use analytics-python on a web server that's serving hundreds of requests per second.

Every method you call **does not** result in an HTTP request, but is queued in memory instead. Messages are flushed in batch in the background, which allows for much faster operation.

By default, our library will flush:

+ every 100 messages (control with `upload_size`)
+ if 0.5 seconds has passed since the last flush (control with `upload_interval`)

There is a maximum of `500KB` per batch request and `32KB` per call.

{% include content/tracking-api-limit.md %}


### What happens if there are just too many messages?

If the module detects that it can't flush faster than it's receiving messages, it'll simply stop accepting messages. This means your program will never crash because of a backed up analytics queue. The default `max_queue_size` is `10000`.

### How do I flush right now?!

You can also flush on demand. For example, at the end of your program, you'll want to flush to make sure there's nothing left in the queue. Just call the `flush` method:

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

<table class="api-table">
  <tr>
    <td>`debug` _bool_</td>
    <td>`True` to log more verbosely, `False` by default.</td>
  </tr>
  <tr>
    <td>`send` _bool_</td>
    <td>`False` to avoid sending data to Segment, `True` by default.</td>
  </tr>
  <tr>
    <td>`on_error` _function_</td>
    <td>Set an error handler to be called whenever errors occur</td>
  </tr>
  <tr>
    <td>`max_queue_size` _int_</td>
    <td>Maximum number of elements allowed in the queue. If this condition is ever reached, that means you're identifying / tracking faster than you can flush. If this happens, [let us know](https://segment.com/help/contact/)!</td>
  </tr>
  <tr>
    <td>`upload_interval` _float_</td>
    <td>The frequency, in seconds, to send data to Segment. Default value is 0.5.</td>
  </tr>
  <tr>
    <td>`upload_size` _int_</td>
    <td>Number of items in a batch to upload. Default value is 100.</td>
  </tr>
  <tr>
    <td>`gzip` _bool_</td>
    <td>`True` to compress data with gzip before sending, `False` by default.</td>
  </tr>
  <tr>
    <td>`sync_mode` _bool_</td>
    <td>`True` to disable threading and send all request synchronously, `False` by default. Experimental, see [Background threads and synchronous mode](#background-threads-and-synchronous-mode).</td>
  </tr>
</table>

---

## Django

To add analytics to your Django web server, you need to include the initialization code in the [`ready()` method](https://docs.djangoproject.com/en/dev/ref/applications/#django.apps.AppConfig.ready) of a custom `AppConfig` object for one of the apps in your project. This method is responsible for performing initialization tasks for your project.

`myapp/apps.py` file:

```python
from django.apps import AppConfig
import analytics

class MyAppConfig(AppConfig):

    def ready(self):
        analytics.write_key = 'YOUR_WRITE_KEY'
```

`myapp/__init__.py` file:

```python
default_app_config = 'myapp.apps.MyAppConfig'
```

### Will this work in production / uWSGI / gUnicorn?

Yes!


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
import analytics

analytics.debug = True # turn on debug logging
analytics.write_key = 'YOUR_WRITE_KEY'
```

## Google App Engine

We have heard from our customers that Google App Engine does not resolve project dependencies, so you'll need to get [requests](https://github.com/kennethreitz/requests) and [python-dateutil](https://github.com/paxan/python-dateutil) and add it into your project so that analytics-python can find it.

If you're having issues with threads outliving your request, check [Background threads and synchronous mode](#background-threads-and-synchronous-mode)

## Troubleshooting

### Request Size Limits

{% include content/tracking-api-limit.md %}


{% include content/troubleshooting-intro.md %}
{% include content/troubleshooting-server-debugger.md %}
{% include content/troubleshooting-server-integration.md %}

### Overriding Context Value

In some cases, you will want to manually pass in `ip` or `userAgent` values. Since we do not automatically send these in, you will manually pass these through the `context` object like so:

```
analytics.track('9742', 'Song Played', context={
  'ip': 1234,
  'userAgent': 'Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30'
})
```

Be sure to see the full [reference of supported keys](/docs/connections/spec/common/#context).

### Versioning

Check that you have the most recent version.

```
python -c "import analytics; print analytics.VERSION"
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

In some cases, you will want to disable threads and send each request synchronously. To do so, you can use the `sync_mode` option:

```python
import analytics

analytics.write_key = 'YOUR_WRITE_KEY'
analytics.sync_mode = True
```
