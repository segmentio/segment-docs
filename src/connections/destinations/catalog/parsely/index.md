---
rewrite: true
title: Parse.ly Destination
---

[Parse.ly](https://www.parse.ly) provides web analyses and content optimization for online publishers by partnering with them to provide clear audience insights through intuitive analytics.

This document was last updated on November 8th, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Parsely" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Enter your Domain and enable the destination in Segment. (To enable this destination, you use your Parsely website domain as your API key.)
4. We'll automatically start recording data.

When Parse.ly is enabled in Segment, our CDN updates within 45 minutes.  Parse.ly's javascript is asynchronously loaded onto your page, so remember to remove the Parse.ly snippet from your page.

Parsely is substantially more useful when you implement JSON-LD metadata across your website as described [here](https://www.parse.ly/help/integration/basic).

## Page

By default, unless you are using [Dynamic Tracking](https://www.parse.ly/help/integration/dynamic/), Parse.ly automatically tracks pageviews in the background, so you do not need to track them separately with Segment's `.page()` method.

If you are using dynamic tracking, you must explicitly let us know in your [integration settings](/docs/connections/destinations/catalog/parsely/#enable-dynamic-tracking). If this setting is enabled, we will disable Parse.ly's autotracking functionality and begin sending their API pageview events only in response to `analytics.page()` events.

**Note:** You can only track pageviews if you are using the Parsely destination with our Javascript Analytics.js library, and not using our server side integration with Parse.ly.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('ze8rt1u89', {
  name: 'Zaphod Kim',
  gender: 'Male',
  email: 'jane.kim@example.com',
  phone: '1-401-826-4421',
  address: {
    city: 'San Francisco',
    state: 'Ca',
    postalCode: '94107'
  }
});
```


## Track

You must adhere to our [video tracking spec](/docs/connections/spec/video/) (and have video tracking enabled in Parse.ly) in order to use this functionality.

Video tracking is possible with either web or server sources.


## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```


## Alias

If you haven't had a chance to review our spec, please take a look to understand what the [Alias method](https://segment.com/docs/connections/spec/alias/) does. An example call would look like:

```js
analytics.alias("507f191e81");
```


### Mapping custom properties to semantic Parsely properties

If you'd like to map certain semantic Parse.ly properties to your own custom properties (ones that do not abide by our [page spec](https://segment.com/docs/connections/spec/page), you can define your mappings in your Segment destination settings! You can put the name of your Segment property on the left and the Parse.ly property on the right hand side.

We currently support mapping the following Parse.ly properties (make sure you spell these correctly on the right hand side of this setting!):

* `articleSection`
* `thumbnailUrl`
* `dateCreated`
* `headline`
* `keywords`
* `creator`
* `url`

**Note**: This feature only works if you also have enabled **Enable In-Pixel Metadata** and **Enable Dynamic Tracking**.


### Video Content Started

When a user starts playback of a video, you should use our [Video Content Started](/docs/connections/spec/video/#content-events) event. We will map the properties from the Video Content Started event to the following Parse.ly video metadata fields:

<table>
    <tr>
      <td>**Parsely Parameter**</td>
      <td>**Segment Property**</td>
      <td>**Data Type**</td>
    </tr>
  <tr>
    <td>videoId</td>
    <td>`properties.assetId`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>metadata.title</td>
    <td>`properties.title`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>metadata.image_url</td>
    <td>`context.integrations.Parsely.imageUrl`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>metadata.pub_date_tmsp</td>
    <td>`properties.airdate`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>metadata.section</td>
    <td>`properties.genre`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>metadata.authors</td>
    <td>`properties.publisher`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>metadata.tags</td>
    <td>`context.integrations.Parsely.tags`</td>
    <td>Array</td>
  </tr>
  <tr>
    <td>urlOveride</td>
    <td>`context.page.url`</td>
    <td>String</td>
  </tr>
</table>

Because `tags` and `imageUrl` are not recognized as properties of a standard Video Content Started event, we ask that you pass those as integration specific options.

**Example**

```js
analytics.track('Video Content Started', {
    assetId: '12345',
    title: 'Magic Eye: The optical illusion, explained',
    airdate: 'Tue May 16 2017 17:02:05 GMT-0700 (PDT)',
    genre: 'Science',
    publisher: 'Vox'
    }, {
    integrations: {
        Parsely: {
            imageUrl: 'https://cdn.cloudfront.com/images/image_file.png'
            tags: ['tags', 'go', 'here']
        }
    }
});
```

### Video Playback Paused

When a user pauses playback of a video, you should use our [Video Playback Paused](/docs/connections/spec/video/#playback-events) event. Assuming the Pause event happens after a Video Content Started event, we will automatically map the video metadata for you.

### Video Playback Interrupted

When a playback of a video is interrupted, you should use our [Video Playback Interrupted](/docs/connections/spec/video/#playback-events) event. This event just takes an `assetId` and maps to Parse.ly's `reset` method (documentation [here](https://www.parse.ly/help/integration/video_v2/)).

**Note:** this event is only relevant for web tracking. Our server side integration does not support this event.

<table>
    <tr>
      <td>**Parsely Parameter**</td>
      <td>**Segment Property**</td>
      <td>**Data Type**</td>
    </tr>
  <tr>
    <td>videoId</td>
    <td>`properties.assetId`</td>
    <td>String</td>
  </tr>
</table>

**Example**

```js
analytics.track('Video Playback Paused', {
    assetId: '12345'
    // Feel free to pass as many other properties as you like here.
    // This is just an example showing what Parse.ly will receive.
});
```

### Video Content Playing

(Note: this event is only required for server side tracking)

When using Parse.ly on the web using our Javascript SDK, video heartbeats are captured by their SDK automatically. However, if you are using this destination with a Server side source, you must pass heartbeat events manually using our [Video Content Playing](https://segment.com/docs/connections/spec/video/#content-events) event.

**Important:** These events must be sent in 10 second increments.

The only required property is the video's `assetId`.

**Example:**

```js
analytics.track({
  userId: '019mr8mf4r',
  event: 'Video Content Playing',
  properties: {
    sessionId: '12345',
    assetId: '0129370',
    podId: 'segA',
    title: 'Interview with Tony Robbins',
    description: 'short description',
    keywords: ['entrepreneurship', 'motivation'],
    season: '2',
    episode: '177',
    genre: 'entrepreneurship',
    program: 'Tim Ferris Show',
    publisher: 'Tim Ferris',
    position: 20,
    totalLength: 360,
    channel: 'espn',
    fullEpisode: true,
    livestream: false,
    airdate: '1991-08-13'
  }
});
```

### Video Content Completed

This event is only required for server side tracking.

To track the completion of a video, please use our [Video Content Completed](https://segment.com/docs/connections/spec/video/#content-events) event.

Please ensure you are sending at minimum, `assetId`, `totalLength`, and `position` as properties.

**Example:**

```js
analytics.track({
  userId: '019mr8mf4r',
  event: 'Video Content Completed',
  properties: {
    sessionId: '12345',
    assetId: '0129370',
    podId: 'segA',
    title: 'Interview with Tony Robbins',
    description: 'short description',
    keywords: ['entrepreneurship', 'motivation'],
    season: '2',
    episode: '177',
    genre: 'entrepreneurship',
    program: 'Tim Ferris Show',
    publisher: 'Tim Ferris',
    position: 20,
    totalLength: 360,
    channel: 'espn',
    fullEpisode: true,
    livestream: false,
    airdate: '1991-08-13'
  }
});
```

#### Track URL

The destination does not currently support Parsely's `trackURL` method. Please [contact us](/contact/requests) if this is important to you.
