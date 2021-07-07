# TDO Docs Draft

## What’s included in the Twilio Developer Plan?

The Twilio Developer Plan allows you to collect and process your data at scale, consolidating your data from up to 3 sources into a single warehouse for complex querying. 

**How is this offer different from Segment’s Free Plan?** 
The Twilio Developer Plan allows for 10,000 Monthly Tracked Users (MTUs), whereas Segment’s Free Plan limits MTUs to 1,000. 

The Twilio Developer Plan is limited to 1 warehouse destination, whereas all other Segment plans also allow you to send data in real time to more than 300 destinations (all the analytics, marketing, advertising, and A/B testing tools you already use). 

Need more destinations or more MTUs? Upgrade to our [Team Plan](https://segment.com/pricing) for unlimited destinations and scaled MTU pricing. 


## What is a data source? 

In Segment, you create a source for each website, app, or cloud-based tool that you’d like to collect data from. 

[Learn more about Sources here](https://segment.com/docs/connections/sources/).


## Warehouse Destinations

A warehouse is a central repository of data collected from one or more sources. This is what commonly comes to mind when you think about a relational database: structured data that fits neatly into rows and columns.

[Learn more about Data Storage Destinations here](https://segment.com/docs/connections/storage/). 


## How are Monthly Tracked Users (MTUs) calculated? 

Segment counts the number of **unique** `userId`s, and then adds the number of **unique** `anonymousId`s that were not associated with a `userId` during the billing period. Segment counts these IDs over all calls made from all sources in your workspace, over a billing month. Segment only counts each user once per month, even if they perform more than one action or are active across more than one source.

[Learn more about MTUs and billing here](https://segment.com/docs/guides/usage-and-billing/mtus-and-throughput/#what-is-an-mtu).


## Common Questions

**What happens if I exceed the 10,000 MTU limit?** 
If you exceed the 10,000 MTU limit once in a 6-month period, Segment locks access to your account, but data is still able to flow through Segment. To unlock your account, you can choose from these options:

- **Option 1**: Wait for a full billing cycle (1 month) to go by without any overages. This will automatically unlock your account if the MTU numbers are able to go back down on their own.
- **Option 2**: Upgrade to the [Team plan](https://segment.com/pricing/). This starts a 2-week free trial that gives you 14 days to fix your implementation to decrease the traffic.
- **Option 3:** Upgrade to a [Business plan](https://segment.com/pricing/). Business plans are custom built for customers and typically have higher MTU limits than Team plans. [Click here](https://segment.com/demo) to schedule time with a Segment representative to see if a Business plan is a good fit for you.

If you exceed the 10,000 MTU limit twice in a 6-month period, Segment locks access to your account and also stops sending and receiving data. You can unlock your account by following option 2 or 3 above to upgrade your plan.

**How do I get more out of Segment?** 
Segment can help you simplify data collection, personalize user interactions, protect data integrity, and respect user privacy. Explore the [Destinations Catalog](https://segment.com/docs/connections/destinations/catalog/) to see all the tools you can send data to once you get data into Segment. 

On Business plans, Segment also offers two add-on products called [Protocols](https://segment.com/docs/protocols/) and [Personas](https://segment.com/docs/personas/).   

- **Protocols** helps you automate and scale the [data quality best practices](https://segment.com/docs/protocols/tracking-plan/best-practices/) to improve data quality and trust across your company.
- **Personas** is a powerful personalization platform that enables you to create unified customer profiles in Segment, to build and enrich audiences, and to activate audiences across marketing tools.

