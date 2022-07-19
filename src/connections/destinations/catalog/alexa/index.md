---
rewrite: true
title: Alexa Destination
id: 54521fd525e721e32a72ee90
---
[Alexa](https://www.alexa.com/) helps improve your website's SEO and conduct competitive analysis. They help your business get better marketing results. The Alexa Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-alexa).


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Alexa" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Fill in your "Account ID" which you can find in the Alexa JavaScript snippet. It appears as atrk_acct: 'XXXXXXX'.
4. Fill in your "Domain" which you can find in the Alexa JavaScript snippet. It appears as domain: 'example.com'.


Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading the Alexa JavaScript snippet on your page and sending data.

Alexa starts tracking your website to help optimize your SEO and understand your web traffic. There's nothing further you need to do in Segment!

## Troubleshooting

### Alexa could not find the Certify Code

Alexa's installation detector does not actually execute JavaScript on the page (our Analytics.js JavaScript needs to run to insert their JavaScript). Instead, its detector looks for the snippet/image tag directly and therefore, misses the detection. This should not impact your utilization of Alexa.
