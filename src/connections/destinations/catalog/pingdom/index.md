---
title: Pingdom Destination
---

## Getting Started

When you toggle on Pingdom in Segment, this is what happens:

+ The Segment CDN updates in about 45 minutes, and starts asynchronously loading Pingdom's javascript onto your page. This means you should remove Pingdom's snippet from your page if had previously put it there.
+ Pingdom will automatically start recording page load times. Go to [Pingdom](https://my.pingdom.com/rum) to view your page load performance data.

Since Pingdom only records data about page load performance, it does not collect any of the data represented by our API.
