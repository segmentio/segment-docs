---
title: Collecting Data on the Client or Server
---

One of the most common questions we receive is: "Should I use one of your client-side libraries or one of your server-side libraries?"


This is such an important topic that we've written up an in-depth article in our Analytics Academy:  [When to Track on the Client vs Server](https://segment.com/academy/collecting-data/when-to-track-on-the-client-vs-server/). It's worth a read! Below, you can also read some quick logic around why you may want to choose either option.

### Client-side

#### Not stored in your database

Good things to send from the client-side are things that you wouldn't usually store in your database. Things like page views, button clicks, page scroll length, mouse movements, social shares and likes.

#### Easier to send client-side

Things like UTM tags, operating system, device type, or cookied data like returning visitors are all easiest to track client-side. Of course, some things like mouse movements are only available on the client-side so you should definitely track that there.

#### Events needed for client-side only destinations

Some destinations can only accept data when the event is sent from the browser. They require events on the client since they rely on cookies and most of those tools do not have an API that Segment can send server-side data to. More on this in our Analytics.js docs.

### Server-side

#### Payment events

Charging customers often happens when they aren't online, and accuracy for payments is so important. Server-side tracking tends to be more accurate than user devices since it's a more controlled environment.

#### Accuracy

In general client-side data is fine for watching general trending, but it's never going to be perfect. Especially if your customers are likely to use things like adblock or old/non-standard browsers.

For example, if you're sending triggered emails based on events, it's probably a good idea to make sure your user profiles are sent through our servers so no one gets left out or mis-emailed.

#### Calculated from your database

Another good type of data to send server-side are things that need to be calculated from a database query. This might be something like "Friend Count" if your site or app is a social network.

#### Sensitive information

Sensitive information is also best kept out of browsers. Any data you don't want exposed to users should be sent server-side.

### Selecting Destinations

Each Segment library allows an `integrations` object either as a top level object or nested in options object. [Check your library docs](https://segment.com/docs/connections/sources/) for details; look for the section titled ["Selecting Destinations"](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#selecting-destinations-with-the-integrations-object).

This flag may be especially useful in Legacy source types, where an event might be triggered on both the client & server for various reasons. The following will cause the payload to be sent to all enabled tools EXCEPT Facebook Pixel:

```js
    analytics.identify('user_123', {
      email: 'jane.kim@example.com',
      name: 'Jane Kim'
      }, {
        integrations: {
          'Facebook Pixel': false
        }
      });
```
