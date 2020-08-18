---
title: How can I ignore internet bots?
---

## But wait, I don't even know what a bot is!

If you stumbled onto this page by accident and don't know what a bot is or are just curious to learn more, the following Wikipedia article provides an awesome summary: [https://en.wikipedia.org/wiki/Internet\_bot](https://en.wikipedia.org/wiki/Internet_bot).

Surprisingly, more than half of all web traffic is made up of bots. While a fraction of them are good bots with a regulated pattern, and therefore beneficial to all online businesses, the majority of them have malicious intents and are mostly unregulated.

## Got it! So is it possible to ignore bad bots?

Now that we're level-set on what a bot is, unfortunately Segment does not offer any out-of-the-box feature to filter/ignore bot traffic.

As such, you generally have two options:

**Handle the filtering at a destination-level:** some of our destination partners, [like Mixpanel](https://help.mixpanel.com/hc/en-us/articles/115004567946-Exclude-Bot-Activity-Web-JavaScript-), filter bots automatically. Whereas others [such as Hubspot](https://knowledge.hubspot.com/getting-started-with-hubspot-v2/how-to-filter-out-traffic-from-your-website-analytics) allow you to set up bot filtering manually. The advantage of filtering bots at a destination level is that it allows you to implement a robust, easy-to-maintain solution. However, as it pertains to Segment, the downside is that bot traffic will _still_ make it to Segment, [affecting your MTU count.](https://segment.com/docs/guides/usage-and-billing/mtus-and-throughput/#how-does-segment-calculate-mtus)

**Write custom logic that suppresses bot activity from being sent to Segment:** if you want to prevent bot traffic from making it to Segment in the first place, another option is to write your own custom code. The logic, in pseudo-code, would look something like this if you know a particular characteristic of the bot traffic to filter out, such as the userAgent:

```js
var robots = [useragent1, useragent2]
if ! window.navigator.userAgent in robots
  // send analytics calls
  analytics.track
```

The benefit here of course is that you would be able to limit the impact that bots have on your MTU count. However, on the flip side, it's much harder to implement and maintain a custom filter.

## If we see a massive MTU spike because of bots, can we apply for a refund?

As a matter of policy, we typically do not provide refunds for bot-related MTU spikes, as bot traffic is out of our control. However for extenuating circumstances, [you can petition for a refund](https://segment.com/contact/billing), assuming you're able to provide proof of the bot's effect.

## I'm seeing a lot of browser traffic from Boardman; isn't that from Segment?

We do indeed use Amazon's hosting services, which are based in Boardman, Oregon. However [many bots also originate from AWS in Boardman as well](https://productforums.google.com/forum/#!topic/webmasters/Ow5baxkjiPI).

One way you can confirm whether or not traffic is coming from Segment vs. a bot is to check the userAgent of the inbound call. Ours is:

```js
'Mozilla/5.0 (' + deviceModel.slice(0, -3) + '; CPU ' + osName + ' ' +
osVersion.replace(/\./g, '_') + ' like Mac OS X) AppleWebKit/600.1.4 (KHTML,
like Gecko) Version/' + osVersion.charAt(0) + '.0 Mobile/10B329 Safari/8536.25'
```
