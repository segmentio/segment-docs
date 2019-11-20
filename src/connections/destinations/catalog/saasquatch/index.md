---
title: SaaSquatch Destination
---

[Our Saasquatch destination code](https://github.com/segment-integrations/analytics.js-integration-saasquatch) is all open-source on GitHub if you want to check it out.

## Getting Started

All you need to get started is your SaaSquatch Tenant Alias. Enter that into your Segment Destinations settings for SaaSquatch and you're good to go!

Here's a quick video on what you need to do:

<iframe width="560" height="315" src="https://www.youtube.com/embed/dvNJb3G316E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- - -


## Identify

The only Segment tracking method supported for Referral SaaSquatch is `identify`.

Here's a full example that includes all the traits we send to SaaSquatch automatically:

```javascript
analytics.identify( 'u1234', {
    firstName: 'Joe',
    lastName: 'Tester',
    email: 'joe.tester@example.com',
    avatar: 'http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    accountId: 'a5678',
    referralImage: 'http://www.example.com/logo.png',
    checksum: 'arbPDAcedO38Qw/qdJLCqd2tlRQ='
});
```

For more information about Referral SaaSquatch check out [their docs](http://docs.referralsaasquatch.com/segment-io)!
