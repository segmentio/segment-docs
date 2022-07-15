---
tile: Boomtrain Destination
beta: true
---

Boomtrain is a predictive intelligence platform for marketers that uses machine learning to drive increased clicks, engagement and revenue through customer communications. [Visit Website](http://boomtrain.com).

The Boomtrain destination with Segment supports the `identify`, `track` and `page` methods.  Our JavaScript destination code is open sourced on GitHub. [Feel free to check it out](https://github.com/boomtrain/segmentio_integration).

## Getting Started


Steps to connect:
 - Turn on Boomtrain using the destinations catalog.
 - Enter your Boomtrain API Key.

If you're not sure where to find your Boomtrain API Key, contact [Boomtrain Support](mailto:support@boomtrain.com) or your Boomtrain CSM directly.

When you enable Boomtrain in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Boomtrain's JavaScript library onto your page.
- Once loaded, the Boomtrain JavaScript library automatically starts sending events to the Boomtrain system indicating that the current page has been viewed.
- When users visit pages on your site, the "viewed" events sent to the Boomtrain system will trigger ingestion of your content and processing by our machine learning algorithms.
- To start sending custom events and user data, use the JavaScript methods described below.

## Identify

When you call [`identify`](/docs/connections/spec/identify/) on analytics.js, we call `person.set` on the Boomtrain JavaScript Library with the `traits` object. A `userId` must be specified.  For additional details about the Boomtrain `person.set` methods see [this article](https://boomtrain.readme.io/docs/set) on the Boomtrain Developer Documentation.

## Track

When you call [`track`](/docs/connections/spec/track/), we will send the `event` you specify to the `track` method on the Boomtrain JavaScript library, along with the properties you provide.

## Settings

Segment lets you change these settings on the destination settings, without having to touch any code.

### App ID
The App ID for your app can be taken from the destination guide provided by Boomtrain to your company.  For additional information about your App ID or destination details, contact your Boomtrain CSM or [support@boomtrain.com](mailto:support@boomtrain.com).


If you have any questions, or suggestions on we can improve this documentation, feel free to [contact us](http://boomtrain.com/contact/).
