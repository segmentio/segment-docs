---
title: Planning a Full Installation
---

Now that you've seen Segment in action, step back and think through what a full implementation of Segment for your organization would look like. Figuring out what events to track in Segment can feel overwhelming. You should expect this planning process to have the following steps:

<!-- TOC depthFrom:1 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Define Business Objectives](#define-business-objectives)
- [Decide what to collect](#decide-what-to-collect)
  - [Shortcut! Check if a Business Spec meets your needs](#shortcut-check-if-a-business-spec-meets-your-needs)
    - [B2B Spec](#b2b-spec)
    - [Ecommerce Spec](#ecommerce-spec)
    - [Mobile Spec](#mobile-spec)
    - [Video Spec](#video-spec)
- [Create naming conventions](#create-naming-conventions)
- [Develop a Tracking Plan](#develop-a-tracking-plan)
  - [Using the Tracking Plan Google Sheets template](#using-the-tracking-plan-google-sheets-template)
  - [Plan your Identify and Group calls](#plan-your-identify-and-group-calls)
  - [Plan your Track events](#plan-your-track-events)
  - [Define your Track event properties](#define-your-track-event-properties)
- [Plan for destination tools](#plan-for-destination-tools)

<!-- /TOC -->

Be prepared to invest time deciding with stakeholders how to track your data, and planning how you'll analyze it. The time you spend here will save you lots of time in the future, as following Segment's best practices allows you to easily change your tracking later.

## Define Business Objectives

<!-- Source: /docs/protocols/data-quality/ (modified)
-->

Tracking is about learning and taking action. Think about what you want to know about your product or customers. Think about what assumptions need to be tested and what theories need to be proven true or false. Think about the unknowns. Here are some helpful questions to get started:

- What kind of events or data best illustrate or explain how your customers use your product?
- How do people discover, start using, and paying for your product?
- What are the most important steps in a customer's journey?

While it may seem obvious, we highly recommend documenting your high-level business objectives. More specifically, ask yourself: what are the measurable business outcomes you want to achieve this year? Do you want to acquire new customers? Generate more new sign-ups, drive more incremental revenue among your current customer base?

The best way to answer this question is to interview stakeholders in your organization who will consume the data.

With your business goals documented, the next step is to map user actions to those business goals. For example, if one of your goals is to activate new signups, you want to think about which activities are related to a signup. Ask yourself, what actions do people take _before_ signing up? Do specific actions predict a user signing up?

As an example, you might end up with a list like this:

- Ad Campaign Clicked
- Link Clicked
- Article Completed
- Campaign Opened
- From Initiated
- Form Submitted
- User Signed Up

While this list represents a tiny fraction of the user actions you _could_ track, it gives a list focused on your top business objectives. This helps break up the huge project of data collection into smaller chunks.

## Decide what to collect

With your business objectives documented and mapped to user actions, it's time to build standards that you can use when deciding what to track. With your stakeholders, make a list of the actual events (page or screen views, and user actions) that you want to track. Think about all of the ways your users can interact with your site or app

When you're first starting out, we recommend that you limit your tracking plan to a few core events, but add lots of properties to provide context about them. We generally see more success with the “less is more” philosophy of tracking data, but you might also decide to take a more liberal “track more and analyze later” approach. Like everything, each alternative has pros and cons that are important to consider especially as it relates to your company's needs.

### Shortcut! Check if a Business Spec meets your needs

Segment maintains several "Business Specs", which are recommendations based on your type of business that give recommendations on what to track, what additional traits or properties to collect, and how to format them. The two most common are the B2B (business-to-business) Spec, Ecommerce Spec, and our Mobile and Video specs.

If these specs meet your business needs, you're in luck! These specs are built into our tracking plan templates, so you don't need to start from a blank slate.

#### B2B Spec

If your organization sells a product or services to other businesses, you might have different analytics and marketing needs than most companies. You need to understand your customer behaviors both at the user-level, and also at the company or team-level.  You can read more about [how Segment thinks about B2B tracking](https://segment.com/academy/collecting-data/tracking-plans-for-b2b-companies/), and [read more about the B2B Spec](/docs/connections/spec/b2b-saas/).

#### Ecommerce Spec

If your organization sells products online, the E-commerce Spec covers the customer's journey as they browse your store, click on promotions, view products, add those products to a cart, and complete a purchase. It also provides recommendations about off-page interactions, including interactions with email promotions, coupons, and other systems. You can read more about [why companies need an Ecommerce Spec](https://segment.com/blog/2014-08-28-ecommerce-analytics-story/), read more about [Ecommerce tracking plans](/docs/connections/spec/ecommerce-tracking-plan/), and dive directly into our [Ecommerce Spec](/docs/connections/spec/ecommerce/v2/).

#### Mobile Spec

The native Mobile Spec is a common blueprint for the mobile user lifecycle. The Spec outlines the most important events for mobile apps to track, and automatically collects many of these events when you use the [Segment Android and iOS SDKs](/docs/connections/sources/catalog/#mobile). Read more about the [benefits of the native mobile spec](/docs/connections/spec/native-mobile-spec/), or read through [the Native Mobile Spec](/docs/connections/spec/mobile) directly.

#### Video Spec

Segment's video spec helps you understand how customers engage with your video and ad content, including playback events, types of media displayed, and performance metrics. You can [read more about our Video Spec](/docs/connections/spec/video/).



## Create naming conventions

Regardless of approach, here are some important best practices to keep in mind:

- **Pick a casing convention:** We recommend *Title Case* for event names and *snake_case* for property names. Make sure you pick a casing standard and enforce it across your events and properties.

- **Pick an event name structure:** As you may have noticed from our [specs](/docs/connections/spec/semantic/), we're big fans of the Object (`Blog Post`) + Action (`Read`) framework for event names. Pick a convention and stick to it!

- **Don't create event names dynamically:** Avoid creating events that pull a dynamic value into the event name (for example, `User Signed Up (11-01-2019)`). If and when you send these to a warehouse for analysis, you end up with huge numbers of tables and schema bloat!

- **Don't create events to track properties:** Avoid adding values to event names when they could be a property. Instead, add values as a property. For example, rather than having an event called "Read Blog Post - Best Tracking Plans Ever", create a "Blog Post Read" event and with a property like `"blog_post_title":"Best Tracking Plans Ever"`.

- **Don't create property keys dynamically:** Avoid creating property names like `"feature_1":"true"`,`"feature_2":"false"` as these are ambiguous and very difficult to analyze

![An image comparing good and bad naming and collection standards](/docs/protocols/images/asset_nVdJ3ZyA.png)


Got all that? Great! You're now ready to develop a Tracking Plan.

<!--Source: /docs/protocols/data-quality/whats-a-tracking-plan/ or /docs/protocols/tracking-plan/ -->

## Develop a tracking plan

A [tracking plan](https://segment.com/blog/what-is-a-tracking-plan/){:target="_blank"} clarifies what events to track, where those events live in the code base, and why you're tracking those events (from a business perspective). **A good tracking plan represents the single source of truth about what data you collect, and why.**

Your tracking plan is probably maintained in a spreadsheet (unless you use our tracking-plan tool, [Protocols](/docs/protocols/)), and serves as a project management tool to get your organization in agreement about what data to use to make decisions. A tracking plan helps build a shared understanding of the data among marketers, product managers, engineers, analysts, and any other data users.

### Plan your Identify and Group calls

The Identify call updates all records of the user with a set of traits, and so is extremely important for building your understanding of your users. But how do you choose which traits to include?
The example below shows an Identify call using [analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/)) for Segment:

```js
analytics.identify({
  name: 'Jane Kim',
  email: 'janekim@example.com',
  login: 'janekay',
  type: 'user',
  created: '2016-11-07T16:40:52.238Z',
});
```

The traits represent dimensions in your data that you can group or pivot on. For example, in the above, you can easily create cohorts of all types that are `users` or accounts created within a time window of your choosing.

When you plan your deployment, think about what information you can collect as traits that would be useful to you when grouping users together, and plan how you will collect that information.

The Group call is similar to the Identify call, but it adds traits associated with a parent account to the user's profile. If your organization is a B2B company, you should also plan the group traits to collect, and how you'll use them once they're applied to a user account.

### Plan your Track events

We recommend starting with fewer events that are directly tied to one of your [business objectives](/docs/protocols/tracking-plan/best-practices/#define-business-objectives), to help avoid becoming overwhelmed by endless number of possible actions to track. As you get more comfortable, you can add more events to your tracking plan that can answer more specialized questions.

At Segment, we started out tracking these events:

- **User Signed Up**
- **Source Data Sent**
- **Subscription Started**

Then we added some peripheral events to to better understand how we're performing, for the following reasons:

- **User Invited** When users invite more people to their organization, it's a good indicator that they're engaged and serious about using the product. This helps us measure growth in organizations.
- **Destination Enabled** Turning on a destination is a key value driver for our customers.
- **Debugger Call Expanded** When we see that a certain customer has used the live event stream feature a number of times, we can contact see if we can help them debug.

For an Ecommerce company, however, the main events might be something like:

- **Account Created**
- **Product Added**
- **Order Completed**

> success ""
> **Tip**: As we mentioned [above](#shortcut-check-if-a-business-spec-meets-your-needs), Segment has a set of “reserved” event names specifically for ecommerce, called our [Ecommerce Spec](/docs/connections/spec/ecommerce/v2). Check it out to see which events we cover and how they are used in our downstream destinations.

An online community, on the other hand, has an entirely different set of actions that indicate engagement, as listed below. For example, a community might want to track actions like:

- **Content Viewed**
- **Content Shared**
- **Comment Submitted**
- **Content Produced**
- **Content Curated**

With these actions tracked, the community can develop metrics around engagement, and understand how users move towards their ultimate conversion events. You can read more in [this article from the online community GrowthHackers](https://segment.com/blog/growthhackers-community-metrics/){:target="_blank"} about the events they track and why.

### Define your Track event properties

Each Track call can accept an optional dictionary of properties, which can contain any key-value pair. These properties act as dimensions that allow destination tools to group, filter, and analyze the events. They give you additional detail on broader events.

Events should be generic and high-level, but properties should be specific and detailed. For example, at Segment, `Business Tier Workspace Created` is a horrible event name. Instead, we used `Workspace Created` with a `property` of `account_tier` and value of `business` :

```js
analytics.track('Workspace Created', {
  account_tier: 'business'
})
```

Similar to the traits in the Identify call, the properties provide a column that you can pivot against or filter on in your analytics tools or allow you to create a cohort of users in email tools.

<!-- TODO: this is a very databse-centric way of explaining. need to unpack.-->

Don't create dynamically generated property names in the properties dictionary. Each `key` creates a new column in your downstream tools, and dynamically generated keys clutter your tools with fragmented data that makes it difficult and confusing to use later.

Here is Segment's `Lead Captured` Track call:

```js
analytics.track(userId, 'Lead Captured', {
  email: 'email',
  location: 'header navbar'
  url: 'https://segment.com/'
});
```

The high-level event is **Lead Captured**, and all of the details appear in the properties dictionary. Because of this, we can easily see in our downstream tools how many leads were captured, and from which parts of the site.

If you want to learn more about how properties are used by downstream tools, check out [The Anatomy of a Track Call](https://segment.com/academy/collecting-data/the-anatomy-of-a-track-call/).


## Plan for destination tools

Once you've completed your tracking plan, there's one more step you might want to do before you move on to actually implementing Segment. The [Segment destination catalog](/docs/connections/destinations/catalog/) contains hundreds of tools, many of which you'll be familiar with already.

If your organization has an established set of analytics tools, look for those tools in the catalog and bookmark their documentation pages. These docs pages contain important information about how Segment transforms data for the destination tool, and they also contain useful details about troubleshooting, set-up, and implementation considerations.

Once you have an initial list of the destination tools your organization uses, you can also check [which Segment methods those tools accept](/docs/connections/destinations/methods-compare/). This helps you at implementation time to ensure that the calls you use can be consumed by the tools they're intended for.

Additionally, you should check [which connection modes each tool supports](/docs/connections/destinations/cmodes-compare/), so you know ahead of time which destinations may need to be bundled.

> success ""
> **Tip**: If you know you're looking for a tool for a specific purpose, but haven't chosen one yet, you can also check the [Connection Modes by category page](https://segment.com/docs/connections/destinations/category-compare/){:target="_blank"} to see which tools might be compatible with the least implementation changes.




<div class="double">
  {% include components/reference-button.html href="/getting-started/02-simple-install/" newtab="false" icon="symbols/arrow-left.svg" title="A simple Segment installation" description="Walk through a disposable, demo implementation." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/getting-started/04-full-install/" newtab="false" icon="symbols/arrow-right.svg" title="A full Segment implementation" description="Take your plans, and make them real." variant="related" subtitle="next" %}
</div>
