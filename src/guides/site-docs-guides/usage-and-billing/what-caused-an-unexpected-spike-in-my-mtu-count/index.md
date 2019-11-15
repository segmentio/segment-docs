---
title: "What caused an unexpected spike in my MTU count?"
---

Typically, MTU counts increase when you have an increase in users or visitors on instrumented parts of your application. Occasionally, a big press release or marketing campaign can lead to an influx of visitors.

The other potential cause of big increases is that you added tracking to new parts of your site or workflow, maybe it's a marketing site that didn't have tracking before, or ramp-up in the number of interactions you have with your users outside your app (emails, help desk, push notifications, etc). Since you are now tracking users you weren't tracking before, your MTU count will go up. If you're already tracking those users elsewhere with Segment, we won't double-count them.

There are also some scenarios in which MTU numbers may be higher than expected because a new anonymousId or userId may be generated for a single user.

1) Analytics.reset() was called

2) If the user already had a userId assigned (aka user\_id was NOT null), and then identify(xxx) was called with a different userId value

3) If the anonymousId is changed manually, via analytics.user().anonymousId(xxx)

4) If the user goes from one page to another, and each page has a different domain- in this case the 2nd page will have a different anonymousId

5) If the user goes from one page to another and the second page exists within an iFrame

6) If the user visits the website from a different browser - each browser will generate a different anonymousId

7) If the user visits the page incognito

8) If the user clears their cookies

If you suspect there is an implementation error causing your MTU number to rise please contact us immediately and we are happy to help you resolve the issue.
