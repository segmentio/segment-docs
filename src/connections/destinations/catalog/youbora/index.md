---
title: Youbora Destination
id: 59c04bd6432df886f42eea37
---
### Web Destination

When you enable Youbora in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Youbora's JavaScript onto your page. (This means you should remove Youbora's snippet from your page.)

Youbora automatically starts recording data.

## Tracking Video Events

Segment can keep track of events occurring on any number of video players on your
page. **You must include the `session_id` property with every video event you want to send to Youbora so Segment can keep track of which player to attribute the events to.**


### Video Playback Started

When a user starts playback of a video, use the [Video Playback Started](/docs/connections/spec/video/#playback-events) event. Segment maps the properties from the Video Playback Started event to the following Youbora video metadata fields:

| Youbora Parameter | Segment Property        | Data Type |
| ----------------- | ----------------------- | --------- |
| `content.isLive`  | `properties.livestream` | Boolean   |
| Resource          | `context.page.url`      | String    |


### Video Content Started

When the video content actually begins playing, use the [Video Content Started](/docs/connections/spec/video/#content-events) event. Segment maps the properties from the Video Playback Started event to the following Youbora video metadata fields:

| Youbora Parameter             | Segment Property          | Data Type |
|:----------------------------- |:------------------------- |:--------- |
| `content.title`               | `properties.title`        | String    |
| `content.title2`              | `properties.program`      | String    |
| `content.duration`            | `properties.total_length` | Integer   |
| `content.metadata.content_id` | `properties.asset_id`     | String    |
| `content.metadata.genre`      | `properties.genre`        | String    |
| `content.metadata.owner`      | `properties.publisher`    | String    |

Youbora calculates the join time using the time difference between `Video Playback Started` and `Video Content Started`,

### Video Playback Paused/Resumed

When a user pauses or resumes playback of a video, use the [Video Playback Paused](/docs/connections/spec/video/#playback-events) and [Video Playback Resumed](/docs/connections/spec/video/#playback-events) events.

If the user pauses during an ad, fill the `properties.ad_asset_id` field from the spec for **both** calls, as Segment uses its
presence to determine whether the pause is occurring during an ad or not.

**Example**

```js
analytics.track('Video Playback Paused', {
    session_id: '1',
    ad_asset_id: '12345'
});

analytics.track('Video Playback Resumed', {
    session_id: '1',
    ad_asset_id: '12345'
});
```

### Video Playback Seek Started/Completed

When the video content actually begins playing, use the [Video Playback Seek Started](/docs/connections/spec/video/#playback-events) and [Video Playback Seek Completed](/docs/connections/spec/video/#playback-events) events. Youbora internally calculates the duration of the seek but if you would prefer to provide this value yourself you can pass it as the integration-specific option `duration`.

**Example**

```js
analytics.track('Video Playback Seek Started');

analytics.track('Video Playback Seek Completed');
```

### Video Playback Buffer Started/Completed

When the video content buffers during playback, use the [Video
Playback Buffer Started](/docs/connections/spec/video/#playback-events) and [Video Playback
Buffer Completed](/docs/connections/spec/video/#playback-events) events. Segment maps the
properties from these events to the following Youbora video metadata fields:

**Example**

```js
analytics.track('Video Playback Buffer Started', { session_id: 1 });

analytics.track('Video Playback Buffer Completed', { session_id: 1 });
```

If the user pauses during an ad, fill the `properties.ad_asset_id` field from the spec for **both** calls, as Segment uses its
presence to determine whether the pause is occurring during an ad or not.

### Video Playback Interrupted

When playback of a video is interrupted, use the [Video Playback Interrupted](/docs/connections/spec/video/#playback-events) event.

### Video Playback Completed

To track the completion of the video playback session, use the [Video Playback Completed](/docs/connections/spec/video/#playback-events) event.

**Example**

```js
analytics.track('Video Playback Completed', { session_id: 1 });
```

### Video Ad Started

When an ad begins to load, use the [Video Ad Started](/docs/connections/spec/video/#ad-events) event. Segment maps the properties from
these events to the following Youbora video metadata fields:

| Youbora Parameter | Segment Property   | Data Type |
| ----------------- | ------------------ | --------- |
| `ad.title`        | `properties.title` | String    |


**Example**

```js
analytics.track('Video Ad Started', { session_id: 1, title: 'Test Ad Title', ad_asset_id: 1 });
```

### Video Ad Completed

To track the completion of an ad, use the [Video Ad Completed](/docs/connections/spec/video/#ad-events) event.

**Example**

```js
analytics.track('Video Ad Completed', { session_id: 1, ad_asset_id: 1 });
```

### Video Ad Clicked

To track an ad click, track an event with event name 'Video Ad Clicked'.

**Example**

```js
analytics.track('Video Ad Clicked', { session_id: 1, ad_asset_id: 1 });
```

## Automatic Video Player Tracking
Youbora supports automatic video tracking for the following video players:
- DashJS
- HTML5
- JWPlayer
- TheoPlayer
- ThePlatform
- VideoJS

However, relying solely on Youbora auto tracking will not send your video events to Segment downstream destinations, including a raw data warehouse. To track data to downstream tools, Segment recommends either manually implementing all video player events or manually implementing all events alongside Youbora.

If you employ the latter method, you should indicate explicitly that your Segment events should not flow to Youbora (because they've already been auto-tracked by the Youbora library).

```javascript
analytics.track('Video Playback Started', { // empty properties object
  }, {
  integrations: {
    'Youbora': false
  }
});
```

Use the following steps to track a player that falls in one of the previous categories:

1. Ensure you have the latest snippet on your page.
2. If your snippet is in the `head` of your page, move it to the very bottom of
   your `body`, right before the `</body>` tag.
3. Replace the `load` method in your snippet with the following (you can delete
   any of the categories you won't be using):
```js
  analytics.load(<YOUR WRITE KEY HERE>, {
    integrations: {
      Youbora: {
        players: {
          videojs: [],
          html5: [],
          jwplayer: [],
          theoplayer: [],
          theplatform: [],
          videojs: []
        }
      }
    }
  });
```
4. Add players inside the appropriate category in the following format:
```js
{
    player: video player object or video player id,
    options: {
        YOUBORA OPTIONS HERE
    }
}
```

In the `player` field, pass the video player object, or the ID of the
video player element in the case of HTML5.

In the `options` field, you can pass options the same way you would [pass them natively to Youbora](http://developer.nicepeopleatwork.com/plugins/general/setting-youbora-options/){:target="_blank"}.

The following example shows a working implementation:

```js
  <script>
    var vplayer = videojs('html5player')

      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";

      analytics.load("YOUR_WRITE_KEY", {
        integrations: {
          Youbora: {
            players: {
              videojs: [
                {
                  player: vplayer,
                  options: {
                    'content.title': 'My Awesome Content'
                  }
                }
              ],
              html5: [
                {
                  player: 'html5-player',
                  options: {}
              ]
            }
          }
        }
      });
      analytics.page();
    }}();

  </script>
```
