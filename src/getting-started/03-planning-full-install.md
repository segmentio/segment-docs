---
title: Planning a full installation
---

Source: https://segment.com/docs/protocols/data-quality/

## Data Collection Best Practices

Let’s face it, figuring out what events to track in Segment can feel overwhelming. Fortunately, we’ve helped thousands of customers through this process and have lots of resources to help you get started. Whether you’re a small team just getting your app off the ground, or a highly complex enterprise with hundreds of stakeholders, these resources can help!
That being said, be prepared to invest time defining how you want to track data. Any investment in improving data quality will reap massive rewards, and compound over time by allowing your analytics teams to produce better insights, your marketing teams to run better campaigns and so much more.

## Data Tracking Philosophy

Tracking is about learning and taking action. Think about what you want to know about your product or customers. Think about what assumptions need to be tested and what theories need to be proven true or false. Think about the unknowns. Here are some helpful questions to get started:

- What kind of events or data best illustrate or explain how your customers use your product?
- How do people discover, start using, and paying for your product?
- What are the most important steps in a customer's journey?

## Define Business Objectives

While it may seem obvious, we highly recommend documenting your high level business objectives (see [Goals tab in Google Sheet Tracking Plan](https://docs.google.com/spreadsheets/d/1ZHGfNrCxBQbEyevmVxNoU0DGjb8cJMro1iwIRZLWjPw/view) template). More specifically, ask yourself: what are the measurable business outcomes you want to achieve this year? Do you want to acquire new customers? Generate more new sign-ups, drive more incremental revenue among your current customer base? The best way to answer this question is to interview stakeholders in your organization who will consume the data.

With your business goals documented, the next step is to map user actions to those business goals. For example, if one of your goals is to activate new signups, you want to think about which activities are related to a signup. Ask yourself, what actions do people take _before_ signing up? Do specific actions predict a user signing up?

As an example, you may end up with a list like the following:

- Ad Campaign Clicked
- Link Clicked
- Article Completed
- Campaign Opened
- From Initiated
- Form Submitted
- User Signed Up

While the list above represents a small portion of the total user actions you _could_ track, it gives a list focused on your top business objectives. This helps break up the huge project of data collection into smaller chunks.

## Decide what to collect

With your business objectives documented and mapped to user actions, it’s time to build standards that you can use when deciding what to track.

Our most successful customers limit their tracking plan to a small number of core events, adding many properties that provide context about those events. We generally see more success with the “less is more” philosophy of tracking data, but you might also decide to take a more liberal “track more and analyze later” approach. Like everything, each alternative has pros and cons that are important to consider especially as it relates to your company’s needs.

TODO: this doesn't actually give an action they can do, or explain what would be in a collection standard? did we miss a bit when importing?

## Formalize naming standards

Regardless of approach, here are some important best practices to keep in mind:

- **Pick a casing convention:** We recommend *Title Case* for event names and *snake_case* for property names. Make sure you pick a casing standard and enforce it across your events and properties.

- **Pick an event name structure:** As you may have noticed from our [specs](https://segment.com/docs/connections/spec/semantic/), we’re big fans of the Object (`Blog Post`) + Action (`Read`) framework for event names. Pick a convention and stick to it!

- **Don’t create event names dynamically:** Avoid creating events that pull a dynamic value into the event name (for example, `User Signed Up (11-01-2019)`). If and when you send these to a warehouse for analysis, you end up with huge numbers of tables and schema bloat!

- **Don’t create events to track properties:** Avoid adding values to event names when they could be a property. Instead, add values as a property. For example, rather than having an event called "Read Blog Post - Best Tracking Plans Ever", create a "Blog Post Read" event and with a property like `"blog_post_title":"Best Tracking Plans Ever"`.

- **Don’t create property keys dynamically:** Avoid creating property names like `"feature_1":"true"`,`"feature_2":"false"` as these are ambiguous and very difficult to analyze

![](https://segment.com/docs/protocols/data-quality/images/asset_nVdJ3ZyA.png)

## Review Use Cases

(TODO: Should all of the "semantic"/business-use-case spec info go here? We also talk about this in the next chapter.)

### B2B
Source: https://segment.com/academy/collecting-data/tracking-plans-for-b2b-companies/

Companies that sell a product or service to other businesses have a different need than most companies when it comes to analytics and marketing. They need to understand their customers' behavior both at the user-level, and also at the aggregate company or team-level. We face this challenge internally at Segment. We need to understand where users are getting stuck in the funnel, but also where the workspace, with one or more users, are at. In this article we will take a closer look at setting up your tracking to model these more complicated business relationships.

## Create a Tracking Plan

Great! You’re now ready to develop a Tracking Plan.

Source: https://segment.com/docs/protocols/data-quality/whats-a-tracking-plan/ or https://segment.com/docs/protocols/tracking-plan/

## What's a Tracking Plan?

A [tracking plan](https://segment.com/blog/whats-a-tracking-plan) clarifies what events to track, where those events live in the code base, and why those events are necessary from a business perspective. Prior to Protocols, tracking plans typically lived in a spreadsheet. The tracking plan served as a project management tool to align an entire organization around data as the basis on which to make decisions. The tracking plan helps marketers, product managers, engineers, analysts, etc. get on the same page. It represents the single source of truth for what data to collect and why.

The tracking plan is so important to help organizations understand their own data efforts that we invested years of product development to create [Protocols](https://segment.com/docs/protocols/).

In the following, we share how to build a tracking plan from the ground up using a Google Sheet template. Note that you can use any tool to create the tracking plan!

## Tracking Plan Google Sheets Template

To help you get started, we developed a Tracking Plan template in [Google Sheets](https://docs.google.com/spreadsheets/d/1ZHGfNrCxBQbEyevmVxNoU0DGjb8cJMro1iwIRZLWjPw/view).

The template includes all of our "semantic" specs (business-case tailored specifications) including [eCommerce](https://segment.com/docs/connections/spec/ecommerce/v2/), [B2B SaaS](https://segment.com/docs/connections/spec/mobile/), [Mobile](https://segment.com/docs/connections/spec/mobile/) and [Video](https://segment.com/docs/connections/spec/video/), and a collection of common properties.

TODO: we really need to get moving on standardizing away from the term "semantic" for these specs so we can normalize across all docs and help content

We highly recommend you start by [defining your business objectives](https://segment.com/docs/protocols/data-quality/whats-a-tracking-plan/#define-business-objectives), and have included a template in the **Goals** tab to guide that process.

With your business goals defined, start by defining how you want to track Page/Screen, Identify and Group events. Most customers use [default page tracking](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#page) and skip over that tab. The identify tab is where you specify which user traits you intend to collect like `first_name`, `last_name`, `email`, etc. Read more about the [identify call below](https://segment.com/docs/protocols/data-quality/whats-a-tracking-plan/#identifying-your-users).

From there, we recommend you specify Track events in the **Track (Custom)** tab. In the template we included preexisting events with different numbers of grouped properties (1 Prop Event, 2 Prop Event, etc). While more challenging to manage at first, this structure allows you to use the **Minimize Rows** button at the top to organize and view all events.

Once completed, you can share the Google Sheet tracking plan with stakeholders to either review, comment, edit or simply reference for implementation. And if you decide to purchase Protocols in the future, you’ll be able to upload the tracking plan into Segment [using the Config API](https://segment.com/docs/protocols/apis-and-extensions/#google-sheets-tracking-plan-uploader).

## Identify your users

The `Identify` call is important, because it updates all records of the user with a set of traits. But how do you choose which traits to include?
Here is a sample `.identify()` call (with [analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/)) for Segment:

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

## Define your Track events

After you’ve documented your [event naming and collection standards](https://segment.com/docs/protocols/data-quality/whats-a-tracking-plan/#formalize-your-naming-and-collection-standards) it’s time to add events to your tracking plan.

We recommend starting with fewer events that are directly tied to one of your [business objectives](https://segment.com/docs/protocols/data-quality/whats-a-tracking-plan/#define-business-objectives). This focused effort helps avoid a situation where you become overwhelmed by endless number of possible actions to track. As you get more comfortable, you can add more events to your tracking plan that can answer peripheral questions.


At Segment, we started out tracking these events:

- **User Signed Up**
- **Source Data Sent**
- **Subscription Started**

Then we added some peripheral events to to better understand how we’re performing, for the following reasons:

- **User Invited** When users invite more people to their organization, it’s a good indicator that they’re engaged and serious about using the product. This helps us measure growth in organizations.
- **Destination Enabled** Turning on a destination is a key value driver for our customers.
- **Debugger Call Expanded** When we see that a certain customer has used the live event stream feature a number of times, we can reach out to see if we can help them debug.

For an ecommerce company, however, the main events might be something like:

- **Account Created**
- **Product Added**
- **Order Completed**

Note that Segment has a set of “reserved” event names specifically for ecommerce, called our [ecommerce spec](https://segment.com/docs/connections/spec/ecommerce/v2). Check it out to see which events we cover and how they are used in our downstream destinations.

For a community, on the other hand, there is an entirely different set of actions that indicate engagement listed below. For example, a community like [GrowthHackers](https://growthhackers.com/) might want to track actions like:

- **Content Viewed**
- **Content Shared**
- **Comment Submitted**
- **Content Produced**
- **Content Curated**

With this, they’re able to develop metrics around engagement, and understand how users are moving towards their ultimate conversion event: curation content for others. For more information, check out [this article](https://segment.com/blog/growthhackers-community-metrics/) from GrowthHackers about the events they track and why.

## Define your Track event properties

Each `.track()` call can accept an optional dictionary of `properties`, which can contain any key-value pair. These `properties` act as dimensions that allow your end tool to group, filter, and analyze the events. They give you additional detail on broader events.

As mentioned earlier, events should be generic and high level, whereas properties are specific and detailed. For example, at Segment, `Business Tier Workspace Created` is a horrible event name. Instead, we used `Workspace Created` with a `property` of `account_tier` and value of `business` :

```js
analytics.track('Workspace Created', {
  account_tier: 'business'
})
```

Similar to the traits in the `.identify()` call, the properties provide a column that you can pivot against or filter on in your analytics tools or allow you to create a cohort of users in email tools.

TODO: this is a very databse-centric way of explaining. need to unpack.

Don't create dynamically generated `key`s in the `properties` dictionary, as each `key` creates a new column in your downstream tools. Dynamically generated keys clutter your tools with tons of data that makes it difficult and confusing to use later.

Here is Segment’s `Lead Captured` `.track()` call:

```js
analytics.track(userId, 'Lead Captured', {
  email: 'email',
  location: 'header navbar'
  url: 'https://segment.com/'
});
```

The high level event is **Lead Captured** and all of the details are tucked into the `properties` dictionary. In our downstream tools, we’ll be able to easily look at how many leads were captured in different locations on our site.

If you want to learn more about how properties are used by downstream tools, check out [The Anatomy of a Track Call](https://segment.com/academy/collecting-data/the-anatomy-of-a-track-call/).
Want a free consultation from our Customer Success Managers on how they simplify our customer’s analytics? [Request a demo of Segment](https://segment.com/contact/demo).


## Think about destinations

TODO: section covering how the customer should plan where they are going to send data?  use /docs/utils comparison charts.



Draft outline content below


### Tracking Plans ← Planning a full impl

Now that we’ve shown it working, let’s step back and think through your installation:

→ You can use the tracking plan template we provide ←

(Goal of this section: provide a DIY/less overwhelming version of the tracking plan spreadsheet)

You might want to start a page in a spreadsheet for each of these questions:

- Think about the business goals and questions you ask of your data
  - What are your company metrics? What data do you base each one on?
  - How do you define a user?
  - What tools do you use to analyze your data?


- List the tools you use. For each, write down:
  - The tool name
  - What questions is answers, or what business purpose it serves
  - What data it uses/consumes
  - The team that “owns” it
  - The team(s) that use it (if different)


- Think about your digital property/properties
  - Is it a website, mobile app, both?
  - What interactive items are on each? pages, buttons, login systems, user accounts, group accounts, carts, players, etc. For each item:
      - Map it to a Segment method: Which best fits that item? page/screen, event, identify
      - List any important information (properties and traits) you want to collect about that item
  - Are there backend or server components you want to track from?
  - Do you have data living in other tools (cloud-apps) that would be useful to enrich your data with?


### Plan your Implementation

Go back to your lists.

On sheet one, for each business question:

- Map these items to the actual interactions (in sheet three) that they run on
- Write down which tools you use to answer each of these questions

On sheet two, find the list of tools, and look up which methods, and which connection modes they support using these two charts:

- https://segment.com/docs/connections/destinations/cmodes-compare/  - This list will tell you what source types you need
- https://segment.com/docs/connections/destinations/methods-compare/ - This list will tell you which methods you can use.









<div class="double">
  {% include components/media-icon.html  href="/getting-started/02-simple-install/" icon="symbols/arrow-left.svg" title="Back to A Simple Installation" content=" " variant="related" %}

  {% include components/media-icon.html  href="/getting-started/04-full-install/" icon="symbols/arrow-right.svg" title="Next page: A full Segment implementation" content=" " variant="related" %}
</div>
