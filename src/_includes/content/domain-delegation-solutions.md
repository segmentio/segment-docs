## Segment's domain delegation solutions

Segment offers two domain delegation solutions: [Custom Proxy](/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy) and [Custom Domain](/docs/connections/sources/custom-domain). 

| Service | How it works | Infrastructure management | Availability |
| ------- | ------------ | ------------------------- | ------------ | 
| Custom Domain | A Segment service that allows your website to use your own subdomain to load Analytics.js securely over HTTPS and send event data. It is not limited to Analytics.js and is also compatible with server libraries. It uses a DNS subdomain that you delegate to Segment.<sup>*</sup> | **Segment manages all related infrastructure**, including applying security updates, managing the SSL certificate lifecycle, and monitoring. | Available to users on a Business Tier plan. |
| Custom Proxy | This approach uses a Cannonical Name (CNAME) to map an alias name to the actual or 'cannonical' domain name. The CNAME record allows you to alias one domain name to another. | You must create a CNAME record to alias a subdomain that points to the Segment domain. <br><br> Customers are responsible for maintaining their own proxy infrastructure.  | Available to all Segment users. | 


<sup>*</sup>_If it's not possible for you to delegate subdomains to Segment, you can use a CNAME instead. Segment encourages users to delegate a DNS subdomain rather than use use CNAME aliasing due to the evolving privacy standards in browsers, but CNAME aliasing remains an option for users not interested in using nameservers._

_Implementing a Custom Domain using CNAME delegation requires you to add a CNAME and record for two domains that Segment generates on your behalf: one for the Segment CDN and a second for the Tracking API. You must add a CNAME and DNS record for both domains._ 

_Customers using CNAME for Custom Domain must generate their own certificates and manage certificate renewals._