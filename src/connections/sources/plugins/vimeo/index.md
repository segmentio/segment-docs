---
title: analytics.js Vimeo Plugin
hidden: true
---

With the analytics.js Vimeo Plugin you can easily collect Vimeo player events into the Segment ecosystem.

## Getting Started
To use the plugin you must first generate an Access Token in Vimeo. The plugin uses this token to access metadata about the video content being played.

Vimeo provides documentation outlining this process [here](https://developer.vimeo.com/api/start#getting-started-step1). Make sure you are carefully selecting your access scopes! The plugin only needs to read information about your video(s).

### 1. Enable

Enable a new plugin by navigating to the settings for your Source and clicking **Plugins**. You can enable the Vimeo plugin from this menu.

![the plugins setting screen](/docs/connections/sources/plugins/plugins-enable.png)

**NOTE:** At this time, only JavaScript sources support plugins.

### 2. Initialize
Initialize the plugin by giving it your Vimeo Access Token, and granting it access to the Vimeo video player instance(s) running on the page. Do this using the initialize method:

```html
<iframe src="https://player.vimeo.com/video/76979871" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<script src="https://player.vimeo.com/api/player.js"></script>
<script>
    var iframe = document.querySelector('iframe');
    var player = new Vimeo.Player(iframe);
    var VimeoAnalytics = window.analyticsPlugins.VimeoAnalytics
    <b>var vimeoAnalytics = new VimeoAnalytics(player, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX0365')
    vimeoAnalytics.initialize()</b>
</script>
```

That's it! The plugin listens to the Vimeo player for events, and responds by firing the corresponding [Segment Video Spec](https://segment.com/docs/connections/spec/video/) events on Analytics.js.

## Supported Events
The following [Segment Video Spec](https://segment.com/docs/connections/spec/video/) events are tracked by this plugin:
- Video Playback Started
- Video Playback Completed
- Video Playback Paused/Resumed
- Video Content Started/Completed

## Supported Properties
The following [Segment Video Spec](https://segment.com/docs/connections/spec/video/) properties are automatically attached to the above events:

**'Playback' Events**
- Total Length
- Position
- Video Player
- Sound

**'Content' Events**
- Title
- Description
- Publisher
