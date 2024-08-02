IP Allowlisting uses a NAT gateway to route traffic from Segment's servers to your destination through a limited range of IP addresses, which can prevent malicious actors from establishing TCP and UDP connections with your integrations.

IP Allowlisting is available for customers on Business Tier plans. 

## Supported destinations
Segment supports IP Allowlisting in all Classic and Actions destinations except for the following:
- [LiveRamp](/docs/connections/destinations/catalog/actions-liveramp-audiences/)
- [TradeDesk](/docs/connections/destinations/catalog/actions-the-trade-desk-crm/)
- [Amazon Kinesis](/docs/connections/destinations/catalog/amazon-kinesis/)
- [Destination Functions](/docs/connections/functions/destination-functions/)
- [Destination Insert Functions](/docs/connections/functions/insert-functions/)

Destinations that are not supported receive traffic from randomly assigned IP addresses. 

## Getting started
To enable IP Allowlisting for your workspace:
1. From your Segment workspace, navigate to **[Settings > Workspace settings > Destination IP settings](https://app.segment.com/goto-my-workspace/settings/destination-ip-settings){:target="_blank”}**. 
2. On the Destination IP settings page, click **Enable IP allowlisting**. 
3. The page displays the IP address ranges that Segment uses to route data from Segment's internal systems to your destination. Note these ranges, as you'll need these ranges to enforce IP restriction in your downstream destinations. 
4. Open each of your downstream tools and configure IP restriction for each destination. For more information, refer to the documentation for your downstream tool. 

*IP restriction might not be supported in all destinations.*