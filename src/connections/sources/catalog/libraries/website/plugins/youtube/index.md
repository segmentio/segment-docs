---
title: analytics.js YouTube Plugin
hidden: true
---

With the analytics.js YouTube Plugin you can easily collect YouTube player events into the Segment ecosystem.

## Prerequisites
The Segment YouTube Plugin requires the YouTube player JavaScript object as an input, so your YouTube player embed must use the [YouTube IFrame player API](https://developers.google.com/youtube/iframe_api_reference#Getting_Started).

To begin, generate an API Key for the Segment YouTube plugin, which it uses to access metadata about the video content being played. To do this, create a new project in the Google Developer Console, then create a new API Key in that project for the Segment YouTube plugin. You can read more about this process in the YouTube documentation on [registering an application](https://developers.google.com/youtube/registering_an_application).

## Getting Started

After you've generated the API key:

1. Enable a new plugin.
- Navigate to **Connections > Sources** and choose the right source you want to connect your Youtube plugin to. Go to the **Settings** tab of your source and select **Plugins**. You can enable the YouTube plugin from this menu:

    ![the plugins setting screen](./images/youtube-vimeo-plugins-beta-2021-06-04.png)

    **Note:** At this time, only Javascript sources support plugins.

2. Initialize the plugin by giving it access to the YouTube video player instance(s) running on your page.
- Use the initialize method in the YouTube `onYouTubeIframeAPIReady()` function to register and initialize the plugin with the player instance and your API key:

```
var player;
      function onYouTubeIframeAPIReady() {
              player = new YT.Player('player', {
              height: '390',
              width: '640',
              videoId: 'M7lc1UVf-VE'
        });
	      analytics.ready(function () {
    var ytAnalytics = new window.analytics.plugins.YouTubeAnalytics(player, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX0365')
   ytAnalytics.initialize()
      })}
```

That's it! The plugin listens to the YouTube player for events, and fires the corresponding [Segment Video Spec](https://segment.com/docs/connections/spec/video/) events on analytics.js.

## Supported Events
The following [Segment Video Spec](https://segment.com/docs/connections/spec/video/) events are tracked by this plugin:

Event | Details
----- | -------
Video Playback Started | When a user presses Play; after the last user action required for playback to begin (eg, after user login/authentication). <br><br> - If playing a single video, this fires when the video starts. <br> - If playing a playlist, this fires when the first video in the playlist starts.
Video Playback Completed | When playback is complete and only when the session is finished. <br><br>- If playing a single video, this fires when the video finishes. <br>- If playing a playlist, this event fires when the final video in the playlist finishes.
Video Playback Paused/Resumed | When playback is resumed, by the user, after being paused.
Video Playback Buffer Started/Completed | When playback starts and finishes buffering content or an ad.
Video Playback Seek Started/Completed | When a user manually seeks a certain position of the content or ad in the playback.
Video Content Started/Completed | When a video content segment starts and completes playing within a playback. <br><br>- If playing a playlist, these events get fired for each individual video.

## Supported Properties
The following [Segment Video Spec](https://segment.com/docs/connections/spec/video/) properties are automatically attached to the above events:

**'Playback' Events**
- Total Length
- Position
- Quality
- Video Player
- Sound

**'Content' Events**
- Title
- Description
- Keywords
- Channel
- Airdate
- Duration
