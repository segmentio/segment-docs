---
title: Youbora Destination
---

### Web Destination

When you toggle on Youbora for a website in Segment, this is what happens:

+ Our CDN is updated within 45 minutes. Then our snippet will start
  asynchronously loading Youbora's Javascript onto your page. This means you
  should remove Youbora's snippet from your page.
+ Youbora will automatically start recording data.

## Tracking Video Events
Segment can keep track of events occuring on any number of video players on your
page. **Note that it is required to include the property `session_id` with every
single video event you wish to send to the Youbora<->Segment integration so that
we can keep track of which player to attribute events to.**


### Video Playback Started

When a user starts playback of a video, you should use our [Video Playback
Started](/docs/connections/spec/video/#playback-events) event. We will map the properties
from the Video Playback Started event to the following Youbora video metadata
fields:

<table>
    <tr>
      <td>**Youbora Parameter**</td>
      <td>**Segment Property**</td>
      <td>**Data Type**</td>
    </tr>
  <tr>
    <td>'content.isLive'</td>
    <td>`properties.livestream`</td>
    <td>Boolean</td>
  </tr>
  <tr>
    <td>Resource</td>
    <td>`context.page.url`</td>
    <td>String</td>
  </tr>
</table>

### Video Content Started

When the video content actully begins playing, you should use our [Video Content
Started](/docs/connections/spec/video/#content-events) event. We will map the properties
from the Video Playback Started event to the following Youbora video metadata
fields:

<table>
    <tr>
      <td>**Youbora Parameter**</td>
      <td>**Segment Property**</td>
      <td>**Data Type**</td>
    </tr>
  <tr>
    <td>'content.title'</td>
    <td>`properties.title`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>'content.title2'</td>
    <td>`properties.program`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>'content.duration'</td>
    <td>`properties.total_length`</td>
    <td>Integer</td>
  </tr>
  <tr>
    <td>'content.metadata.content_id'</td>
    <td>`properties.asset_id`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>'content.metadata.genre'</td>
    <td>`properties.genre`</td>
    <td>String</td>
  </tr>
  <tr>
    <td>'content.metadata.owner'</td>
    <td>`properties.publisher`</td>
    <td>String</td>
  </tr>
</table>

Using the difference in time between when `Video Playback Started` and `Video
Content Started`, Youbora will calculate the join time for you.

### Video Playback Paused/Resumed

When a user pauses/resumes playback of a video, you should use our [Video
Playback Paused](/docs/connections/spec/video/#playback-events) and [Video Playback
Resumed](/docs/connections/spec/video/#playback-events) events.

If the user pauses during an ad, please be sure to fill the
`properties.ad_asset_id` field from our spec for **both** calls, as we use its
presence to determine whether the pause is occuring during an ad or not.

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

When the video content actully begins playing, you should use our [Video
Playback Seek Started](/docs/connections/spec/video/#playback-events) and [Video Playback
Seek Completed](/docs/connections/spec/video/#playback-events) events. Youbora internally
calculates the duration of the seek but if you would prefer to provide this
value yourself you can pass it as the integration-specific option `duration`.

**Example**

```js
analytics.track('Video Playback Seek Started');

analytics.track('Video Playback Seek Completed');
```

### Video Playback Buffer Started/Completed

When the video content buffers during playback, you should use our [Video
Playback Buffer Started](/docs/connections/spec/video/#playback-events) and [Video Playback
Buffer Completed](/docs/connections/spec/video/#playback-events) events. We will map the
properties from these events to the following Youbora video metadata fields:

If the buffer occurs during an ad, please be sure to fill the
`properties.ad_asset_id` field from our spec for **both** calls, as we use its
presence to determine whether the buffer is occuring during an ad or not.

**Example**

```js
analytics.track('Video Playback Buffer Started', { session_id: 1 });

analytics.track('Video Playback Buffer Completed', { session_id: 1 });
```

### Video Playback Interrupted

When playback of a video is interrupted, you should use our [Video Playback
Interrupted](/docs/connections/spec/video/#playback-events) event.

### Video Playback Completed

To track the completion of the video playback session, please use our [Video
Playback Completed](https://segment.com/docs/connections/spec/video/#playback-events) event.

**Example**

```js
analytics.track('Video Playback Completed', { session_id: 1 });
```

### Video Ad Started

When an ad begins to load, you should use our [Video Ad
Started](/docs/connections/spec/video/#ad-events) event. We will map the properties from
these events to the following Youbora video metadata fields:

<table>
    <tr>
        <td>**Youbora Parameter**</td>
        <td>**Segment Property**</td>
        <td>**Data Type**</td>
    </tr>
    <tr>
        <td>'ad.title'</td>
        <td>`properties.title`</td>
        <td>String</td>
    </tr>
</table>

**Example**

```js
analytics.track('Video Ad Started', { session_id: 1, title: 'Test Ad Title', ad_asset_id: 1 });
```

### Video Ad Completed

To track the completion of an ad, please use our [Video Ad
Completed](https://segment.com/docs/connections/spec/video/#ad-events) event.

**Example**

```js
analytics.track('Video Ad Completed', { session_id: 1, ad_asset_id: 1 });
```

### Video Ad Clicked

To track an ad click, please track an event with event name 'Video Ad Clicked'.

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

However, note that relying solely on Youbora auto tracking will not send your
video events to Segment downstream destinations, including a raw data warehouse.
To track data to downstream tools, we recommend either manually implementing all
video player events or manually implementing all events alongside Youbora. If
you employ the latter method, you should indicate explicitly that your Segment
events should not flow to Youbora (because they've already been auto-tracked by
the Youbora library).

```javascript
analytics.track('Video Playback Started', { // empty properties object
  }, {
  integrations: {
    'Youbora': false
  }
});
```

In order to track a player that falls in one of the above categories, follow the
below steps:

1. Ensure you have the latest snippet on your page (Updated 2/6/18).
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

In the `player` field, please pass the video player object, or the ID of the
video player element in the case of HTML5.

In the `options` field, you can pass options the same way you would pass them
natively to Youbora as documented
[here](http://developer.nicepeopleatwork.com/plugins/general/setting-youbora-options/).

See the below example for what a working implementation looks like:

```js
  <script>
    var vplayer = videojs('html5player')

    !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var
      e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,o){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src="http://localhost:3000/analytics.js/v1/"+t+"/analytics.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n);analytics._loadOptions = o;};analytics.SNIPPET_VERSION="4.0.0";
      analytics.load("K3wz25G4iMGTJcsHFOWeuAWk6BBfwF3e", {
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
