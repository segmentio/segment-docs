---
title: Use Cases Setup
hidden: true
---

Use Cases help you onboard quickly and efficiently to Segment by guiding you through specific steps tailored to your business needs.

## What's a use case?

Use Cases provide a structured approach to configuring Segment. Think of Use Cases as pre-built setup guides tailored to common business goals. 

When you select a use case, you'll get a customized checklist of steps to follow. These steps take the guesswork out of configuration, ensuring that you set up Segment correctly and align Segment features to your business objectives.

Use Cases help you get up and running with Segment. Here's why you should start your Segment journey with a use case:

- **Guided setup**: Follow clear, concise steps.
- **Time-saving**: Build your Segment instance through a streamlined process.
- **Proven practices**: Follow Segment best practices from the get-go.
- **Reduced errors**: Minimize mistakes with our guided process.

> info "Permissions"
> To implement a use case, you'll need to be a workspace owner for your Segment account.

## Use case setup overview

From a high level, setting Segment up with a use case takes place in four stages:

1. **Pick your business goal**. What do you want to achieve?  Choose from goals like optimizing advertising, personalizing first conversions, and increasing customer retention.
2. **Select a use case**. After you pick your business goal, Segment shows you several potential use cases from which to choose. 
3. **Follow the in-app guide**. With your use case chosen, Segment shows you an interactive checklist of events to track, as well as sources and destinations that Segment recommends you connect. You'll carry these steps out in a sandboxed development environment.
4. **Test and launch your setup**. Push your connections to a production environment and verify that events flow as expected through the debugger.

## Example setup: Personalize winback

This section provides a detailed, step-by-step guide to setting up the **Personalize Winback** use case from the **Personalize communications and product experiences** business goal in your Segment account.

### Step 1: Navigate to Use Cases

1. Log in to your Segment account.
2. If you see the **Welcome to Segment** screen, click **Get Started**. If logging in takes you to your Segment workspace, click **Guided Setup**.

### Step 2: Pick your business goal and select a use case

1. In the **What is your business goal?** screen, select **Personalize communications and product experiences**, then click **Next**.
2. Segment moves you to the **Which use case would you like to set up?** screen. Choose **Personalize winback**, then click **Next**.
3. Segment shows you information about `dev` and `prod` labels. After you've read it, click **Next**.
4. Segment takes you to the **Setup checklist** page. <!--PW, 6/20/24: this is erroneously spelled in the app so I'm using their "set up" spelling for now">

#### Working with dev and prod environments

For most cases, you'll want to start with development or staging sources to test and debug your Segment implementation. This approach lets you verify that everything is working correctly before sending live data downstream. To facilitate this, Segment automatically creates development (dev) and production (prod) spaces for you and labels your sources accordingly to simplify tracking.

Segment strongly recommends beginning your setup in the dev environment. This allows for thorough testing and debugging of your configuration. Once you’re confident in your dev setup, Segment will guide you on how to apply these configurations to your live production sources.

### Step 3: Review suggested events

> warning "Changing your use case"
> Once you've reviewed the suggested events for a use case, you won't be able to change the use case. If you want to see a full breakdown of each use case before commiting to one, click **Change use case** to begin the use case flow again. You can also view the [Use Cases Reference guide](/docs/getting-started/use-cases/reference/) to see what Segment recommends for each use case.

On the **Set up checklist** page, you'll see the full checklist for the use case you've chosen. This checklist applies to all use cases, though the suggested events, sources, and destinations differ between use cases.

1. In the **Review suggested events** list item, click **Review**. 
2. Segment shows you the recommended events and properties typically tracked for your use case. 

For the Personalize winback tracking plan, this table shows Segment's recommended events and properties:

| Events          | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Page Viewed     | `page_category`, `page_name`                                                                             |
| Page Scrolled   | `pct_scrolled`, `page_category`                                                                          |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

You'll want to make sure that you're tracking these events to get the most of the Personalize winback campaign. For more information on event tracking, see [Data Collection Best Practices][/docs/protocols/tracking-plan/best-practices/].

<!-- What's next, engage/unify demos
info about only having oen use case for now>