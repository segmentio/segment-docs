---
title: Alexa
redirect_from: '/integrations/alexa/'
---
[Alexa](https://www.alexa.com/) helps improve your website's SEO and conduct competitive analysis. They help your business get better marketing results. The {{integration.name}} Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-alexa).

This document was last updated on October 16, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for “Alexa” within the Destinations Catalog and confirm the Source you’d like to connect to.
3. Fill in your "Account ID" which you can find in the Alexa Javascript snippet. It appears as atrk_acct: 'XXXXXXX'.
4. Fill in your "Domain" which you can find in the Alexa Javascript snippet. It appears as domain: 'example.com'.
5. In about 5-10 minutes the CDN will be updated and the Alexa Javascript snippet will be initialized onto your page.

Alexa will now start tracking your website to help optimize your SEO and understand your web traffic. There's nothing further you will need to do within Segment!

## Troubleshooting

### Alexa could not find the Certify Code

Alexa's installation detector does not actually execute Javascript on the page (our Analytics.js Javascript needs to run to insert their Javascript). Instead, its detector looks for the snippet/image tag directly and therefore, misses the detection. This should not impact your utilization of Alexa.
