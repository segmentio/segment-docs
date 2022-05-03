---
title: Set up a custom domain proxy for Analytics.js
redirect_from: '/connections/sources/custom-domains/'
strat: ajs
---

Custom domains allow you to proxy Analytics.js and proxy all tracking event requests through your domain.

## Prerequisites

To set up a custom domain, you need:

- Access to your site DNS settings
- A CDN you can serve assets from
- Access to the CDN settings
- A security certificate for the proxy domain

This guide explains how to set up a custom domain in CloudFront. You can apply these principles to almost any modern CDN that supports proxies.

You need to set up two important parts, regardless of the CDN provider you use:

- Proxy to Segment CDN (`cdn.segment.com`)
- Proxy to Segment tracking API (`api.segment.io`)

## Set up

Follow the directions listed for CloudFront or use your own CDN setup. Once you complete those steps and verify that your proxy works for both `cdn.segment.com` and `api.segment.io`, [contact Segment Product Support](https://segment.com/help/contact/) with the following template email:

```text
Hi,

This is {person} from {company}. I would like to configure a proxy for the following source(s):

* Source {link to source in Segment} with source ID {source id}
* Source {link to source in Segment} with source ID {source id}
```

Double-check the source link and the Source ID.

A Segment Customer Success team member will respond that they have enabled this option for your account. When you receive this confirmation, open the source in your workspace, and navigate to Settings > Analytics.js. Update the **Host Address** setting from `api.segment.io/v1` to `[your proxy host]/v1`.

> info ""
> The **Host Address** field does not appear in source settings until it's enabled by Segment Customer Success.

## CloudFront

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


