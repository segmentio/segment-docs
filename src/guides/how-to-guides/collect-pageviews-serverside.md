---
title: Collecting Pageviews on the Server Side
---

Segment believes that client-side collection is appropriate for collection of basic pageviews.

If you'd like to track `page` calls from your server to Segment, Segment recommends doing it in addition to any client side tracking you're doing with analytics.js, and doing it in a separate "source" so that you can configure where to send the (probably redundant, albeit higher-fidelity) data.

With this approach, you might use a request "middleware" to log a `pageview` with every page load from your server.

There are a few things to be mindful of if you want to make sure you can attribute these (anonymous) page views to the appropriate user in your client-side source (eg, for effectively joining these tables together to do down-funnel behavioral attribution). You'll want to ensure they share an `anonymousId` by respecting one if it's already there, and setting it yourself if not. To do that, you can read and modify the `ajs_anonymous_id` cookie value in the request.

Be sure to pass through as many fields as you can in our [page](https://segment.com/docs/connections/spec/page/) and [context](https://segment.com/docs/connections/spec/common/) spec, so that you get full functionality in any downstream tools you choose to enable. We recommend specifically ensuring you pass the **url, path, host, title, query, and referrer** in the message `properties` and **ip and user-agent** in the message `context` .

Here's an example of an express middleware function that covers all those edge cases!

If you have any questions or would like help generally adopting this method for other languages and frameworks, be sure to [get in touch](https://segment.com/help/contact/).

```js
import express from 'express'
import Analytics from 'analytics-node'
import { stringify } from 'qs'

const app = express()
const analytics = new Analytics('write-key')

app.use((req, res, next) => {
  const { query, cookies, url, path, ip, host } = req

  // populate campaign object with any utm params
  const campaign = {}
  if (query.utm_content) campaign.content = query.utm_content
  if (query.utm_campaign) campaign.name = query.utm_campaign
  if (query.utm_medium) campaign.medium = query.utm_medium
  if (query.utm_source) campaign.source = query.utm_source
  if (query.utm_term) campaign.keyword = query.utm_term

  // grab userId if present
  let userId = null
  if (cookies.ajs_user_id) userId = cookies.ajs_user_id

  // if no anonymousId, send a randomly generated one
  // otherwise grab existing to include in call to segment
  let anonymousId
  if (cookies.ajs_anonymous_id) {
    anonymousId = cookies.ajs_anonymous_id
  } else {
    anonymousId = = uuid.v4()
    res.cookie('ajs_anonymous_id', anonymousId )
  }

  const referrer = req.get('Referrer')
  const userAgent = req.get('User-Agent')

  const properties = {
    query: stringify(query)
    referrer,
    path,
    host,
    url
    /* ++ any custom props (eg. title) */
  }

  const context = {
    campaign,
    userAgent,
    ip
  }

  // send a call to segment
  analytics.page(
    anonymousId, // either random (matching cookie) or from client
    userId, // might be null
    properties,
    context
  )

  // proceed!
  next()
})
```
