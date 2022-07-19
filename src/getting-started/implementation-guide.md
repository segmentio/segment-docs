---
title: Getting Started Guide
---

Welcome to Segment! This doc mirrors Segment's in-product guide, and walks you through each of the tasks to level up your workspace strength and become familiar with Segment.

The guide is broken into three categories of tasks:

- [Basics](#basics): These tasks allow you to send and debug your first data through Segment.
- [Instrumentation](#instrumentation): These tasks allow you to send additional types of data (track & identify) and give you an introduction to creating a data strategy.
- [Optimization](#optimization): These tasks guide you to expand your data coverage and optimize your workspace.

## Basics
The tasks included in Basics help you send and debug your very first data from a [Source](/docs/connections/sources/) (a library that sends data to Segment), and into a [Destination](/docs/connections/destinations/) (tools you use to analyze or act on your data).

The Basic tasks include:

1. [Invite teammates](#invite-teammates)
2. [Add a Source](#add-a-source)
3. [Add page or screen tracking](#add-page-or-screen-tracking)
4. [Add a Destination](#add-a-destination)
5. [Testing and Debugging](#testing-and-debugging)

### Invite Teammates
Segment allows you to invite team members to your workspace. To decide who on your team should be added to Segment, think about who might be responsible for implementing, owning, or using your data in downstream tools.

For example, as a developer, you might invite:
- Marketing colleagues to inform what data might be needed to power campaigns or better understand conversion metrics,
- A data scientist or analyst to help inform data strategy and property structuring,
- Product managers to help debug data flow, and to connect product analytics tools

To invite team members to your workspace:
1. Go to **Settings > Workspace Settings** and click the **Access Management** tab.
2. Click **+ Invite Team Member**.
3. Enter the email addresses of the team members you want to invite separated by a comma.
4. *(Optional)* You can choose to **Add Members to User Groups** so that members inherit roles from user groups, or **Add Individual Roles** to bulk assign individuals roles to all invites.
5. Click **Invite**.

### Add a Source
A Source is a website, server library, mobile SDK, or cloud application which can send data into Segment. It's where your data originates. Add a Source to collect data to understand who your customers are and how they're using your product. Create a source for each website or app you want to track.

To add a Source:
1. Go to **Connections**.
2. Click **Add Source**.
3. Click the Source you'd like to add. *Note:* More than 80% of workspaces start by adding their JavaScript website.
4. Click **Add Source**.
5. Enter a name for your source as well as any information on the setup page.
6. Click **Add Source**.

> info "Learn More"
> - [What is a Source?](/docs/connections/sources/#what-is-a-source)
> - [Create a Source](/docs/getting-started/02-simple-install/#create-a-segment-source)
> - [Sources Catalog](/docs/connections/sources/catalog/)

### Add page or screen tracking
Once you've added your Segment Source, you're ready to send data into Segment. The simplest data to send into Segment is a Page call (for website Sources) or Screen call (for mobile Sources). Page and screen calls send automatically once you install the Segment snippet or SDK on your website or mobile app. Page and screen calls allow you to record whenever a user sees a page of your website or screen of your app, along with any optional properties about the page or screen.

Learn how to [install the Segment snippet or SDK on your website or mobile app](/docs/getting-started/02-simple-install/#installing-segment) to start sending data.

> info "Learn More"
> - [Install Segment](/docs/getting-started/02-simple-install/#installing-segment)
> - [Spec: Page](/docs/connections/spec/page/)
> - [Spec: Screen](/docs/connections/spec/screen/)

### Add a Destination
Destinations are the business tools or apps that Segment forwards your data to. Adding Destinations allow you to act on your data and learn more about your customers in real time.

To add a Destination:
1. Navigate to **Connections**.
2. Click **Add Destination**.
3. Choose the Destination you want to add and click **Configure**. Most users eventually add destinations for: Analytics, Advertising, Email Marketing and/or Live Chat.
4. Select the Source you want to connect to your Destination.
5. Click **Next**.
5. Give you Destination a name.
6. Click **Save**.
7. Configure the settings and enable your destination on the destination settings page.

> info "Learn More"
> - [Sending data to destinations](/docs/getting-started/05-data-to-destinations/)
> - [Destination compatibility](/docs/connections/destinations/methods-compare/)
> - [Destination connection modes](/docs/connections/destinations/#connection-modes)

### Testing and Debugging
The Source Debugger is a real-time tool that helps you validate that API calls made from your website, mobile app, or servers arrive at your source. You can use the Source Debugger to make sure that your source functions properly and your events actively send.

The Debugger shows a live stream of events that flow through your Segment Source, so that you can check that your events send in the correct format. When you click on a specific event, you'll be able to see these two views of an event:
- The Pretty view is a recreation of the API call you made that was sent to Segment.
- The Raw view is the complete JSON object Segment receives from the calls you send. These calls include all the details about what is tracked: timestamps, properties, traits, ids, and contextual information Segment automatically collects the moment the data is sent.

To access your Source Debugger:
1. Navigate to **Connections > Sources** and choose your source.
2. Click on the **Debugger** tab.

> info "Learn More"
> - [Testing and Debugging](/docs/getting-started/06-testing-debugging/)
> - [Using the Source Debugger](/docs/connections/sources/debugger/)
> - [Segment University: Testing and Debugging](https://university.segment.com/series/segment-101/debugging-and-troubleshooting?referrer=docs){:target="_blank"}

## Instrumentation
The tasks in this phase help you create a data strategy and send additional types of data (identify and track calls) to get a clearer picture of who your users are and what actions they're taking.

The Instrumentation tasks include:
1. [Send an Identify call](#send-an-identify-call)
2. [Send a Track call](#send-an-identify-call)
3. [Choose what to track](#choose-what-to-track)
4. [Event anatomy and naming standards](#event-anatomy-and-naming-standards)
5. [Add a data warehouse](#add-a-data-warehouse)
6. [Add more destinations](#add-more-destinations)

### Send an Identify call
The Identify call allows you to tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about the user, like their email, name, and address. Sending an Identify call is your first step towards understanding who your users are.

An example of the types of details you might want to learn and track about your users in an Identify call are:
- Name
- Email
- Address
- Company
- Lifetime Value

> info "Learn More"
> - [Spec: Identify](/docs/connections/spec/identify/)
> - [Plan your identify and group calls](/docs/getting-started/03-planning-full-install/#plan-your-identify-and-group-calls)
> - [Segment University: Identify](https://university.segment.com/introduction-to-segment/299968){:target="_blank"}

### Send a Track call
The Segment Track call allows you to record any actions your users perform, along with any properties that describe the action. Sending a track call is your first step towards understanding what your users are doing.

Each action that a user takes is known as an event. Each event has a name and properties. For example, the User Registered event might have properties like `plan` or `accountType`.

To save time on instrumentation, be sure to check if [one of Segment's Business Specs](/docs/getting-started/03-planning-full-install/#shortcut-check-if-a-business-spec-meets-your-needs) meets your needs.

> info "Learn More"
> - [Spec: Track](/docs/connections/spec/track/)
> - [Best practices for event calls](/docs/connections/spec/best-practices-event/)
> - [Analytics Academy: The anatomy of a track call](https://segment.com/academy/collecting-data/the-anatomy-of-a-track-call/){:target="_blank"}
> - [Segment University: The Track Method](https://university.segment.com/introduction-to-segment/299975?referrer=docs){:target="_blank"}

### Choose what to track
Segment recommends you to create and maintain a Tracking Plan to have data clarity and team alignment about what customer data you need to collect and why. It's best to think about the measurable business outcomes you're trying to track or improve, and then drill down to track the events needed for each business outcome.

For example, if you're looking to reduce cart abandonment, you may want to engage cart abandoners by sending emails and in-app messaging to them using Customer.io and Intercom. You also might want to track events like Product Added or Cart Viewed along this customer journey.

Segment maintains a number of industry or product-specific specs to help you get started:
- [B2B](/docs/connections/spec/b2b-saas/)
- [Ecommerce](/docs/connections/spec/ecommerce/v2/)
- [Video](/docs/connections/spec/video/)
- [Mobile](/docs/connections/spec/mobile/)

> info "Learn More"
> - [Data Collection Best Practices](/docs/protocols/tracking-plan/best-practices/)
> - [Analytics Academy: How to create a successful data tracking plan](https://segment.com/academy/collecting-data/how-to-create-a-tracking-plan/){:target="_blank"}
> - [Segment University: Planning your implementation](https://university.segment.com/data-governance-tracking-plans-the-source-of-truth){:target="_blank"}

### Event anatomy and naming standards
When it comes to data collection, the best way to set your company up for success is to establish consistent naming conventions. This makes your code easier to read, and it helps everyone at your company understand what your events mean.

Segment recommends the best practice of using an “Object Action” (Noun Verb) naming convention for all Track events (for example, Menu Clicked) and using noun_noun snake case for property names (for example, property_name). You can view all the event names you're currently tracking in the Schema view to ensure you're using consistent conventions and casing.

To view your event names in the Source Schema:
1. Navigate to **Connections > Sources**.
2. Click on the Source you want to view.
3. Click on the **Schema** tab.
Your event names are listed in the table.

> info "Learn More"
> - [Event naming best practices](/docs/getting-started/04-full-install/#event-naming-best-practices)
> - [Analytics Academy: Naming conventions for clean data](https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/){:target="_blank"}

### Add a data warehouse
A data warehouse is a central location where you can store your raw customer data from multiple sources. A data warehouse gives you flexibility to query your data, which allows you to answer analytical questions that may not be possible with a standard analytics tool.

A data warehouse also allows you to collect and compile data from third party tools as [Cloud Sources](/docs/connections/sources/about-cloud-sources/) in Segment, to help you gain a 360 view of your customer touchpoints.

> info "Learn More"
> - [What's a warehouse?](/docs/connections/storage/warehouses/)
> - [Warehouse FAQs](/docs/connections/storage/warehouses/faq/)
> - [Analytics Academy: Why you should own your data](https://segment.com/academy/intro/why-you-should-own-your-data/?referrer=docs){:target="_blank"}

### Add more destinations
Adding more destinations allows you to connect all your business tools to run through Segment. This gives you the confidence that they are all acting on the same data. Most users connect a variety of marketing, advertising, product, & analytics tools.

With all your tools acting on the same set of customer data, you can personalize your customer engagement and deliver a consistent message across multiple channels

To add more destinations:
1. Navigate to **Connections**.
2. Click **Add Destination**.
3. Choose the Destination you want to add and click **Configure**. Most users eventually add destinations for: Analytics, Advertising, Email Marketing and/or Live Chat.
4. Select the Source you want to connect to your Destination.
5. Click **Next**.
5. Give you Destination a name.
6. Click **Save**.
7. Configure the settings and enable your destination on the destination settings page.
8. Repeat steps 1-7 for each destination you want to add.

> info "Learn More"
> - [Segment Blog: Recipes](https://segment.com/recipes/){:target="_blank"}
> - [Automating Multi-Channel Re-Engagement Campaigns](/docs/guides/how-to-guides/automated-multichannel-reengagement/)

## Optimization
The tasks in this phase help you to optimize your Segment implementation and take it to the next level.

The optimization tasks include:
1. [Add more sources](#add-more-sources)
2. [Add a cloud source](#add-a-cloud-source)
3. [Explore Protocols](#explore-protocols)
4. [Explore Personas](#explore-personas)

### Add more sources
Adding any additional data sources that you might have, like a mobile app, marketing website, server, or cloud tool will give you a more complete view of your customer.
Each touchpoint you have with your customers is a potential area to gain a better understanding of them.

To add more sources:
1. Go to **Connections**.
2. Click **Add Source**.
3. Click the Source you'd like to add.
4. Click **Add Source**.
5. Enter a name for your source as well as any information on the setup page.
6. Click **Add Source**.
7. Repeat steps 1-6 for all the other sources you want to add.

> info "Learn More"
> - [Tracking users across channels and devices](/docs/guides/how-to-guides/cross-channel-tracking/)
> - [Sources catalog](/docs/connections/sources/catalog/)

### Add a cloud source
Cloud sources allow you to pull in customer data from third-party tools (like Twilio or Stripe) into a data warehouse for complex querying. Consolidating your customer data enables you to eliminate data silos to get a single view of your customer.

Before adding a cloud source, you need to make sure you:
1. Get cloud source credentials.
2. Get warehouse credentials.
3. Choose your preferred sync time.

Once you have the necessary credentials, to add a cloud source:
1. Navigate to **Connections** and click **Add Source**.
2. Click on the cloud source you want to add and click **Add Source**.
3. Give your cloud source a name and click **Authenticate**.
4. Enter your credentials or log in using OAuth.
5. Enable the source.
6. Navigate to **Connections > Destinations** and select your warehouse.
7. On the **Settings** tab of your warehouse, enter the credentials for your warehouse if you don't already have one connected to Segment.

> info "Learn More"
> - [Cloud sources](/docs/connections/sources/about-cloud-sources/)
> - [Comparing Cloud Sources](/docs/connections/sources/sources-compare/)

### Explore Protocols
Protocols automate and scale the [data quality best practices](/docs/protocols/tracking-plan/best-practices/) developed over years of helping users implement Segment. Investing in data quality improves trust in your data, reduces time spent by your engineering and business teams navigating and validating data, and allows your business to grow faster.

There are steps to take when you use Protocols:
1. [Align teams with a Tracking Plan](/docs/protocols/tracking-plan/best-practices/)
2. [Validate data quality with violations](/docs/protocols/validate/connect-sources/)
3. [Enforce data standards with controls](/docs/protocols/enforce/schema-configuration/)
4. [Resolve data issues with transformations](/docs/protocols/transform/)

> info "Learn More"
> - [Protocols Overview](/docs/protocols/)
> - [Protocols FAQs](/docs/protocols/faq/)
> - [Intro to Protocols](https://segment.com/product/protocols/?utm_campaign=gg_nam_dg-demo_search_brand_acquisition&utm_source=google&utm_medium=cpc&utm_content=segment_protocols&utm_term=segment%20protocols&gclid=CjwKCAiAv_KMBhAzEiwAs-rX1KJIZIitjBwLKuSXzUktRFLtQ_LDU5BcEMqB02BOpEmdK-6cauZ9nBoCRf8QAvD_BwE){:target="_blank"}

### Explore Personas
Personas is a powerful personalization platform that enables you to create unified customer profiles in Segment, to build and enrich audiences, and to activate audiences across marketing tools.

Personas allows you to enrich user profiles with custom traits, allowing you to create granular audiences for campaigns, advertising, and analysis.

> info "Learn More"
> - [Segment Blog: Recipes with Personas](https://segment.com/recipes/?categories=&filters=Personas%20(add-on)){:target="_blank"}
> - [Segment University: Personas](https://university.segment.com/personas-course/290634){:target="_blank"}
> - [Segment Personas Overview](https://segment.com/product/personas/){:target="_blank"}
