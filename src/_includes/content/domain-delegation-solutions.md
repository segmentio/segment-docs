## Segment's domain delegation solutions

Segment offers two domain delegation solutions: [Custom Proxy](/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy) and [Custom Domain](/docs/connections/sources/custom-domain). 

| Service | How it works | Infrastructure management | Availability |
| ------- | ------------ | ------------------------- | ------------ | 
| Custom Domain | A Segment service that allows your website to use your own subdomain to load Analytics.js securely over HTTPS and send event data. It is not limited to Analytics.js and is also compatible with server libraries. It uses a DNS subdomain that you delegate to Segment. | **Segment manages all related infrastructure**, including applying security updates, managing the SSL certificate lifecycle, and monitoring. | Available to users on a Business Tier plan. |
| Custom Proxy | This approach uses a Cannonical Name (CNAME) to map an alias name to the actual or 'cannonical' domain name. The CNAME record allows you to alias one domain name to another. | You must create a CNAME record to alias a subdomain that points to the Segment domain. <br><br> Customers are responsible for maintaining their own proxy infrastructure.  | Available to all Segment users. | 
