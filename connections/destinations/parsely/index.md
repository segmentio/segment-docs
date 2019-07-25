---
rewrite: true
---

[Parse.ly](https://www.parse.ly) provides web analyses and content optimization for online publishers by partnering with them to provide clear audience insights through intuitive analytics.

This document was last updated on November 8th, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!


## Getting Started

<!-- {{>connection-modes}} -->

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Parsely" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Enter your Domain and enable the destination in Segment. (To enable this destination, you use your Parsely website domain as your API key.)
4. We'll automatically start recording data.

When Parse.ly is enabled in Segment, our CDN updates within 5-10 minutes.  Parse.ly's javascript is asynchronously loaded onto your page, so remember to remove the Parse.ly snippet from your page.

Parsely is substantially more useful when you implement JSON-LD metadata across your website as described [here](http://www.parsely.com/docs/integration/metadata/jsonld.html).

## Page

By default, unless you are using [Dynamic Tracking](https://www.parse.ly/help/integration/dynamic/), Parse.ly automatically tracks pageviews in the background so there is no need to worry about integrating with this functionality via Segment's `.page()` method.

If you are using dynamic tracking, you must explicitly let us know in your [integration settings](/docs/destinations/parsely/#enable-dynamic-tracking). If this setting is enabled, we will disable Parse.ly's autotracking functionality and begin sending their API pageview events only in response to `analytics.page()` events.

**Note:** tracking pageviews is only possible if you are using this integration via our Javascript SDK: analytics.js (not via our server side integration with Parse.ly).

### Mapping custom properties to semantic Parsely properties

If you'd like to map certain semantic Parse.ly properties to your own custom properties (ones that do not abide by our [page spec](https://segment.com/docs/spec/page), you can define your mappings in your Segment destination settings! You can put the name of your Segment property on the left and the Parse.ly property on the right hand side.

We currently support mapping the following Parse.ly properties (make sure you spell these correctly on the right hand side of this setting!):

* `articleSection`
* `thumbnailUrl`
* `dateCreated`
* `headline`
* `keywords`
* `creator`
* `url`

**Note**: This feature only works if you also have enabled **Enable In-Pixel Metadata** and **Enable Dynamic Tracking**.

## Track

We integrate with Parse.ly's [video tracking capabilities](https://www.parse.ly/help/integration/video/).  via the use of our `.track()` method. You must adhere to our [video tracking spec](/docs/spec/video/) (and have video tracking enabled in Parse.ly) in order to use this functionality.

Video tracking is possible with either web or server sources.

### Video Content Started

When a user starts playback of a video, you should use our [Video Content Started](/docs/spec/video/#content-events) event. We will map the properties from the Video Content Started event to the following Parse.ly video metadata fields:

<table>
    <tr>
      <th>Parsely Parameter</th>
      <th>Segment Property</th>
      <th>Data Type</th>
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

When a user pauses playback of a video, you should use our [Video Playback Paused](/docs/spec/video/#playback-events) event. Assuming the Pause event happens after a Video Content Started event, we will automatically map the video metadata for you.

### Video Playback Interrupted

When a playback of a video is interrupted, you should use our [Video Playback Interrupted](/docs/spec/video/#playback-events) event. This event just takes an `assetId` and maps to Parse.ly's `reset` method (documentation [here](https://www.parse.ly/help/integration/video_v2/)).

**Note:** this event is only relevant for web tracking. Our server side integration does not support this event.

<table>
    <tr>
      <th>Parsely Parameter</th>
      <th>Segment Property</th>
      <th>Data Type</th>
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

When using Parse.ly on the web via our Javascript SDK, video heartbeats are captured by their SDK automatically. If you are using this integration via a Server side source however, you will need to pass heartbeat events manually via the use of our [Video Content Playing](https://segment.com/docs/spec/video/#content-events) event.

**Important:** please ensure you are sending these events in 10 second increments.

The only required property that we ask you pass is the video's `assetId`.

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

(Note: this event is only required for server side tracking)

To track the completion of a video, please use our [Video Content Completed](https://segment.com/docs/spec/video/#content-events) event.

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
