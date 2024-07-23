---
title: Segment-Managed Custom Domain
plan: custom-domain
hidden: true
---

Custom Domain is a fully-managed service that enables you to configure a first-party subdomain over HTTPS to track event requests through your domain (for example, `cdp.mydomain.com`), instead of tracking events through Segment's default domain (`segment.com`). Tracking events through your domain lets you reclaim some of the first-party data lost to end user ad-blockers and browser privacy controls that block Segment's default domain. With complete first-party data comes a more complete view of your customer's behaviors, and can lead to more robust profiles, more accurate attribution, and, ultimately, greater ROAS. 

![A graphic that shows how Internet traffic moves back and forth from your domain, to your custom domain, then to Segment's CDN and Ingest APIs.](images/custom-domain.png)

> success ""
> Segment recommends configuring Custom Domain alongside [Consent Management](/docs/privacy/consent-management/) to ensure you are respectful of your end users' consent preferences.

{% include content/domain-delegation-solutions.md %}

### How DNS subdomain delegation works
DNS subdomain delegation is a process where the control of a specific subdomain is assigned to another DNS server, allowing that server to manage the DNS records for the subdomain. This delegation is useful for distributing the management of DNS records and enables specialized handling of subdomain traffic.

### How CNAME records work
When a user tries to access the alias domain, the DNS resolver looks up the CNAME record, finds the canonical name, and resolves it to the IP address of the target. For example, you could alias your subdomain to point to the Segment domain. If a user accesses your site, they are redirected to the Segment domain, but their browser's address bar still shows the alias domain.

CNAME records provide flexibility and centralized management, making it easier to handle domain redirections and subdomain configurations. 

Implementing a Custom Domain using CNAME delegation requires you to add a CNAME and record for two domains that Segment generates on your behalf: one for the Segment CDN and a second for the Tracking API. You must add a CNAME and DNS record for both domains. 

## Supported sources

Custom Domain supports the following sources: 
- [Analytics.js](docs/connections/sources/catalog/libraries/website/javascript/)
- [Clojure](/docs/connections/sources/catalog/libraries/server/clojure/)
- [Go](/docs/connections/sources/catalog/libraries/server/go/)
- [Java](/docs/connections/sources/catalog/libraries/server/java/)
- [Node.js](/docs/connections/sources/catalog/libraries/server/node/)
- [PHP](/docs/connections/sources/catalog/libraries/server/php/)
- [Python](/docs/connections/sources/catalog/libraries/server/python/)
- [Ruby](/docs/connections/sources/catalog/libraries/server/ruby/)
- [.NET](/docs/connections/sources/catalog/libraries/server/net/)

## Getting started

> info "Custom Domain is only available to Business Tier customers"
> Customers not on the Business Tier but who have interest in Custom Domain should [contact Segment's sales team](https://segment.com/demo/){:target="_blank”} for assistance with upgrading to a Business Tier plan. Segment also offers an alternative DNS record service, [Custom Proxy](/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy/).

To configure Custom Domain:
1. Select the subdomain you'd like Segment to use for event request tracking (for example, `cdp.domain.com`).
2. Sign into the Segment app, select your user avatar, and click **Contact Support**. 
3. Create a support request with the following fields: 
  - **Topic**: Select **Custom Domain**.
  - **Subject**: Enter a subject line for your support request.
  - **Domain Name**: Enter the subdomain that Segment should use for event request tracking.
  - **Additional Domain Name**: If applicable, add an additional subdomain. This field is optional.
  - **Source names**: Select the sources you would like to use for Custom Domain. For a list of all sources that support Custom Domain, see [Supported sources](#supported-sources).
  - **Is the domain name enabled for Content Policy**: Select either Yes or No. You are not required to create a Content Policy prior to requesting Custom Domain. 
  - **Description**: Enter an optional description for your service request. If you are requesting Custom Domain for multiple workspaces, enter any additional workspace slugs and source names into this field. 
4. Segment provides you with a list of nameservers you should add to your DNS. Once you receive the nameservers from Segment, update your DNS. 
5. After you've updated your DNS, Segment verifies that you've made all required updates and then provides you with two custom domains, one for the Tracking API and a second for your CDN. 
6. Update your JavaScript snippet to reference the new subdomains or use the new Tracking API custom domain as your endpoint for server library sources. 

## FAQ

### What sources can I use with Custom Domain?
Custom Domain was largely developed to support JavaScript sources. It helps with comprehensive collection of first-party data from your website when accessed over any platform (desktop, mobile, and more). You can use the subdomain for all other non-JavaScript sources as well, for consistency, but it will have no impact on data collection for those sources.  

Once Custom Domain is enabled for your workspace, the Segment app generates a new JavaScript source code snippet for you to copy-paste into the header of your website. For non-JavaScript sources, you can use the sub-domain as an endpoint when using the Tracking API.

### Is this a fully-managed solution? What servers or infrastructure do I need to set up on my side for this proxy? 
Yes, Custom Domain is a fully-managed solution. 

You must be able to delegate a DNS subdomain to Segment and add the name servers Segment provides to your DNS. 

First, decide on your subdomain and then delegate it to Segment. Segment then asks you to add a DNS NS record to your DNS with specific values to complete the DNS delegation. From there on, Segment fully manages the infrastructure for serving Analytics.js and ingesting events data through the subdomain.

### Can I change my Segment subdomain after the initial setup?
Segment does not recommended that you change the subdomain after the initial setup. If you change the subdomain, Segment must revoke the older certificates for your subdomain and you are required to redo the entire onboarding process, as several underlying components, like certificates, would need to be recreated and reassociated. 

### Who is responsible for managing the SSL certificate for the Custom Domain?
Segment hosts and manages SSL Certificate on the Custom Domain. At this time, Segment does not support importing a certificate you may already have, as Segment must request a SSL certificate on your behalf using AWS Certificate Manager (ACM) when initially setting up your Custom Domain. 

Segment also uses AWS Certificate Manager (ACM) to manage and renew certificates.

### Can you rename `window.analytics` with Custom Domain?
Yes, Custom Domain allows Segment to rename `window.analytics` to a unique name to avoid being blocked by some ad blocking software. 

Customers who have access to the Custom Domain feature can rename analytics to `<workspaceid>/<sourceid>.js` by choosing an Alias for Analytics.js within the source settings that are available after the workspace is enabled for Custom Domain. 