---
title: Self Hosting or Proxying Analytics.js
redirect_from: '/connections/sources/custom-domains/'
strat: ajs
---

Custom domains allow you to proxy Analytics.js and proxy all tracking event requests through your domain.

## Custom Proxy Prerequisites

To set up a custom domain, you need:

- Access to your site DNS settings
- A CDN you can serve assets from
- Access to the CDN settings
- A security certificate for the proxy domain

> info "Custom Proxy Troubleshooting"
> If you experience issues configuring a custom proxy, contact your organization's IT department for help. Segment does not have access to the resources you need to configure a custom proxy.

This guide explains how to set up a custom domain in CloudFront. You can apply these principles to almost any modern CDN that supports proxies.

You need to set up two important parts, regardless of the CDN provider you use:

- Proxy to Segment CDN (`cdn.segment.com`)
- Proxy to Segment tracking API (`api.segment.io`)

> warning ""
> If you are using a [Regional Workspace](/docs/guides/regional-segment/#client-side-sources), please note that instead of using `api.segment.io` to proxy the Tracking API, you'll be using `events.eu1.segmentapis.com`

> info ""
> Segment only has the ability to enable the proxy setting for the Web (Analytics.js) source. Details for mobile source proxies are in the [Analytics for iOS](/docs/connections/sources/catalog/libraries/mobile/ios/#proxy-https-calls) and [Analytics for Android](/docs/connections/sources/catalog/libraries/mobile/android/#proxying-http-calls) documentation.  It is not currently possible to set up a proxy for server sources using the Segment UI.

## Custom Proxy Set up

There are 2 options you can choose from when you set up your custom domain proxy.
1. [CloudFront](#cloudfront)
2. [Custom CDN or API proxy](#custom-cdn--api-proxy)

Follow the directions listed for [CloudFront](#cloudfront) or [use your own CDN setup](#custom-cdn--api-proxy). Once you complete those steps and verify that your proxy works for both `cdn.segment.com` and `api.segment.io`, [contact Segment Product Support](https://segment.com/help/contact/) with the following template email:

```text
Hi,

This is {person} from {company}. I would like to configure a proxy for the following source(s):

* Source URL with Source ID
* Source URL with Source ID
```

- **Source URL**: link to the source in your Segment workspace (for example, `https://app.segment.com/<your_slug>/sources/<source>/overview`)
- **Source ID**: navigate to **API Keys** on the left-hand side of the source **Settings** and provide the Source ID

Double-check the Source URL and the Source ID.

A Segment Customer Success team member will respond that they have enabled this option for your account. When you receive this confirmation, open the source in your workspace, and navigate to Settings > Analytics.js. Update the **Host Address** setting from `api.segment.io/v1` to `[your proxy host]/v1`.

> info ""
> The **Host Address** field does not appear in source settings until it's enabled by Segment Customer Success.


## Custom CDN / API Proxy
Follow these instructions after setting up a proxy such as [CloudFront](#cloudfront). Choose between the [snippet instructions](#snippet-instructions) or the [npm instructions](#npm-instructions).  

### Snippet instructions
If you're a snippet user, you need to modify the [analytics snippet](/docs/getting-started/02-simple-install/#step-1-copy-the-snippet) that's inside your `<head>`.

To proxy settings and destination requests that typically go to `https://cdn.segment.com`, replace:
```diff
- t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js"
+ t.src="https://MY-CUSTOM-CDN-PROXY.com" + key + "/analytics.min.js"
```

To proxy tracking calls that typically go to `api.segment.io/v1`, replace:
```diff
- analytics.load("<MY_WRITE_KEY>")
+ analytics.load("<MY_WRITE_KEY>", { integrations: { "Segment.io": { apiHost: "MY-CUSTOM-API-PROXY.com/v1" }}})
```

### npm instructions
See the [`npm` library-users instructions](https://www.npmjs.com/package/@segment/analytics-next){:target="_blank"} for more information.

Proxy settings and destination requests that typically go to `https://cdn.segment.com` through a custom proxy.

```ts
const analytics = AnalyticsBrowser.load({
  writeKey,
  // GET https://MY-CUSTOM-CDN-PROXY.com/v1/project/<writekey>/settings --> proxies to
  // https://cdn.segment.com/v1/projects/<writekey>/settings

  // GET https://MY-CUSTOM-CDN-PROXY.com/next-integrations/actions/...js  --> proxies to
  // https://cdn.segment.com/next-integrations/actions/...js
  cdnURL: 'https://MY-CUSTOM-CDN-PROXY.com'
 })
```

Proxy tracking calls that typically go to `api.segment.io/v1` by configuring `integrations['Segment.io'].apiHost`.
```ts
const analytics = AnalyticsBrowser.load(
    {
      writeKey,
      cdnURL: 'https://MY-CUSTOM-CDN-PROXY.com'
    },
    {
      integrations: {
        'Segment.io': {
          // POST https://MY-CUSTOM-API-PROXY.com/v1/t --> proxies to
          // https://api.segment.io/v1/t
          apiHost: 'MY-CUSTOM-API-PROXY.com/v1',
          protocol: 'https' // optional
        }
      }
    }
  )
```

## Custom Proxy CloudFront

These instructions refer to Amazon CloudFront, but apply more generally to other providers as well.

### CDN Proxy
To set up your CDN Proxy:
1. Log in to the AWS console and navigate to CloudFront.
2. Click **Create Distribution**.
3. Configure the distribution settings. In the Origin section, update the following values:
   - **Origin Domain Name**: `cdn.segment.com`
   - **Protocol**: `HTTPS only`
4. In the Default cache behavior section, configure the following values:
   - **Viewer protocol policy**: `Redirect HTTP to HTTPS`
   - **Allowed HTTP Methods**: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
5. In the Settings section, configure the following values:
   - **Alternate domain name (CNAME)**: `analytics.<yourdomain>.com`
   - **Custom SSL certificate**: Select an existing or new certificate to validate the authorization to use the **Alternate domain name (CNAME)** value. For more information, see Amazon's documentation [Requirements for using alternate domain names](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html#alternate-domain-names-requirements){:target="_blank"}.
 6. Click **Create Distribution**.

Take note of the Domain Name for use in the next step.

#### Add CNAME Record to DNS

To add a CNAME record for the Segment proxy to your organizations DNS settings:
1. Use a name that makes it clear what you are using the subdomain for, for example `analytics.mysite.com`.
2. Go to your domain registrar and add a new record to your DNS of type "CNAME".
3. Configure these values:
    - **Name**: `<subdomain_name>.yourdomain.com`
    - **Value**:  The Domain Name value from CloudFront
4. Save your record. This might take some time to take effect, depending on your TTL settings.
5. Make a `curl` request to your domain to verify that the proxy works.



### Tracking API Proxy

Set up a proxy for the tracking API so that all calls proxy through your domain. To do this, set up a CloudFront distribution that's similar to the one in the previous section, with the exception of the Origin Domain Name:

| Field              | Value            | Description                                  |
| ------------------ | ---------------- | -------------------------------------------- |
| Origin Domain Name | `api.segment.io` | The domain name to which the proxy is served |


#### Add CNAME Record to DNS

To add a CNAME record to your DNS settings:
1. Go to your domain registrar and add a new record to your DNS of type "CNAME". This time use the CloudFront distribution for the tracking API proxy.
2. Enter values for these fields:
   - **Name**: `<subdomain_name>.yourdomain.com`
   - **Value**: Tracking API CloudFront Distribution Domain Name
3. Save your record. This might take some time to take effect, depending on your TTL settings.
4. Run `curl` on your domain to check if the proxy is working correctly.


## Self Hosting Analytics.js

Follow the instructions at [Using Analytics.js as an NPM Package](https://github.com/segmentio/analytics-next/tree/master/packages/browser#-using-as-an-npm-package), to host Analytics.js and eliminate the requirement of downloading it from the CDN file during every page load. This enables you to self-host/import the library itself.

> warning "Keep in mind"
> Segment does not recommend self-hosting, as it requires that you configure integration settings individually and manually redeploy Analytics.js when there are changes to your settings. When you enable third-party libraries in device-mode, Segment loads them, which defeats the purpose of self-hosting. Self-hosting Analytics.js requires 
