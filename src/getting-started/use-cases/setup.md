---
title: Use Cases Setup
---

Use Cases help you onboard quickly and efficiently to Segment by guiding you through specific steps tailored to your business needs.

This page walks you through the steps to set up a use case in your Segment instance.

> info "Permissions"
> To implement a use case, you'll need to be a Workspace Owner for your Segment account. See the [Roles](/docs/segment-app/iam/roles/) documentation for more information. 

> info ""
> You can onboard to Segment with a Use Case if you’re a new Business Tier customer or haven’t yet connected a source and destination.

## Use case setup overview

From a high level, setting Segment up with a use case takes place in four stages:

1. **Pick your business goal**. What do you want to achieve?  Choose from 4 common business goals like optimizing advertising, personalizing first conversions, boosting retention, and increasing customer retention. 
2. **Select a use case**. After you pick your business goal, Segment shows you several potential use cases from which to choose. 
3. **Follow the in-app guide**. With your use case chosen, Segment shows you an interactive checklist of events to track, as well as sources and destinations that Segment recommends you connect. You'll carry these steps out in a sandboxed development environment.
4. **Test and launch your setup**. Push your connections to a production environment and verify that events flow as expected through the debugger. After you're done, your Segment instance is up and running.

## Example setup: Personalize winback

This section provides a detailed, step-by-step guide to setting up the **Personalize Winback** use case from the **Personalize communications and product experiences** business goal in your Segment account. All use cases follow this same setup flow.

### Step 1: Navigate to Use Cases

1. Log in to your Segment account.
2. If you see the **Welcome to Segment** screen, click **Get Started**. If logging in takes you to your Segment workspace, click **Guided Setup**.

### Step 2: Pick your business goal and select a use case

> info "Choosing a use case"
> Segment lets you implement one use case. If you're not sure which use case to choose, view [Choosing a Use Case](/docs/getting-started/use-cases/guide).

1. In the **What is your business goal?** screen, select **Personalize communications and product experiences**, then click **Next**.
2. Segment moves you to the **Which use case would you like to set up?** screen. Choose **Personalize winback**, then click **Next**.
3. Segment shows you information about `dev` and `prod` labels. After you've read it, click **Next**.
4. Segment takes you to the **Setup checklist** page. <!--PW, 6/20/24: this is erroneously spelled in the app so I'm using their "set up" spelling for now"-->

#### Working with dev and prod environments

For most cases, you'll want to start with development or staging sources to test and debug your Segment implementation. This approach lets you verify that everything is working correctly before sending live data downstream. To facilitate this, Segment automatically creates development (dev) and production (prod) spaces for you and labels your sources accordingly to simplify tracking.

Segment strongly recommends beginning your setup in the dev environment. This allows for thorough testing and debugging of your configuration. Once you’re confident in your dev setup, Segment will guide you on how to apply these configurations to your live production sources.

### Step 3: Review suggested events

> warning "Changing your use case"
> Once you've reviewed the suggested events for a use case, you won't be able to change the use case. If you want to see a full breakdown of each use case before commiting to one, click **Change use case** to begin the use case flow again. You can also view the [Use Cases Reference guide](/docs/getting-started/use-cases/reference/) to see what Segment recommends for each use case.

On the **Setup checklist** page, you'll see the full checklist for the use case you've chosen. This checklist applies to all use cases, though the suggested events, sources, and destinations differ between use cases.

1. In the **Review suggested events** list item, click **Review**. 
2. Segment shows you the recommended events and properties typically tracked for your use case. 
3. Set up event tracking based on the events and properties Segment shows.

This table shows Segment's recommended events and properties for the Personalize winback use case:

| Events          | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Page Viewed     | `page_category`, `page_name`                                                                             |
| Page Scrolled   | `pct_scrolled`, `page_category`                                                                          |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

Make sure that you're tracking these events to get the most of the Personalize winback campaign. For more information on event tracking, see [Data Collection Best Practices](/docs/protocols/tracking-plan/best-practices/).

### Step 4: Connect dev sources 

You're now ready to connect sources to your dev environment. 

1. In the **Connect dev sources** step, Segment shows you the recommended sources you should connect. For Personalized winback, these include Website, Mobile, and Reverse ETL.
2. Review the recommended sources, then click **Connect**.
3. Segment takes you to the **Add a source** setup. Choose the source(s) you want to add, then click **Next**.
4. Name your source, then click **Create source**. 
5. Carry out the source-specific steps, then click **Next**.
6. Test your connection and troubleshoot it, if necessary. Click **Done**.
7. (Optional:) Click **Connect More** and repeat steps 2 through 6 to add more sources.

> info "Adding a warehouse as a souce"
> If you connect a warehouse as a source, Segment automatically creates a Profiles destination that shows up in the **Connect your data** tab. Do not delete this destination, as Segment requires this destination to create profiles from your warehouse. 

> info "Cloud object sources"
> If you connect a cloud object source, you'll need to create a warehouse to sync profiles into Segment. For more information, see [Cloud Sources](/docs/connections/sources/about-cloud-sources/).

### Step 5: Connect dev destinations 

With sources connected, you can now connect destinations to your dev environment.

1. Under the **Connect dev destinations** step, Segment shows you the recommended sources you should connect. For Personalize winback, these include Reverse ETL, Personalization, and Analytics.
2. Review the recommended destinations, then click **Connect**.
3. Segment takes you to the **Choose a Destination** setup. Choose the destination(s) you want to add, then click **Next**.
4. Name your destination, then click **Create Destination**.
4. Choose a source to connect to the destination, then click **Next**. 
5. Carry out the destination-specific steps, then click **Done**.
7. (Optional:) Click **Connect More** and repeat steps 2 through 6 to add more destinations.

### Step 6: Publish your setup to a prod environment

Until this point, you've set up event tracking and connected sources and destinations to a development environment. 

After you've confirmed that data is flowing from your sources into your destinations as expected, you're ready to publish your setup to a production environment.

1. On the Setup checklist page, click the **Prod environment** tab.
2. On the **Connect 1 prod source** radio button, click **Connect**. 
3. Segment shows you the sources you previously connected in your dev environment. Click the source you want to connect to prod, then click **Continue**.
4. Carry out any additional steps in the Add a Source page, click **Create Source**, then click **Next**. Segment returns you to the Prod environment tab.
5. Publish the events set up in your dev environment sources to production. Check the debugger to verify that data is flowing into Segment correctly, then click **Mark as complete**.
6. On the **Connect 1 prod destination** bullet, click **Connect**. 
7. Segment shows you the destinations you previously connected in your dev environment. Click the source you want to connect to prod, then click **Continue**.
8. Choose a source to connect to the destination, then click **Next**.
9. Name your destination, then click **Create Destination**.

> success ""
> Your data is now in production, and you've successfully configured Segment.

## Activate your data with Unify and Engage

Now that you've successfully set up Connections and Destinations, you can build upon your Segment implementation with Unify and Engage. 

> info "Accessing Unify and Engage"
> Unify and Engage may not yet be enabled for your account. To add Engage to your Segment workspace, click **Request a demo** in the Unify and Engage tabs on the Guided Setup page.

### Step 1: Set up identifiers with Unify

1. In the Guided Setup page, click **Build profiles from your data**.
2. Click **Add default identifiers**. Segment displays the **Select Identifiers** popup.
3. Select as many of the recommended identifiers that best fit your use case; Segment recommends selecting all identifiers. Click **Save**. 
4. On the Guided Setup page, click **Mark complete**.

Your identifiers are now set up in your dev space, though it could take a few minutes for Segment to create profiles from your selected identifiers.

For more information, see the [Unify documentation](/docs/unify/).

### Step 2: Create audiences with Engage

1. Click the **Engage customers with your data tab**, then click **Create audience**. Segment takes you to the New Audience Builder.
2. On the **Select Audience Type** page, select either Users or Accounts, then click **Next**.
3. Configure, preview, and create your audience. 

Segment then begins sending your new audience(s) to the destinations in your dev environment. Verify in those destinations that the audiences are coming through as intended, then click **Mark complete**.

For more information on Audiences, see the [Engage documentation](/docs/engage/).

### Step 3: Republish to a prod environment

At this point, you'll have already published your initial setup to a prod environment. Next, you'll publish your Unify and Engage setup to the same prod environment.

1. Return to the Prod environment tab.
2. In the **Build profiles from your data** tab, click **Import rules**.
3. Review the rules that Segment will import, then click **Import**.
4. In the **Engage customers with your data** tab, click **Create audience**
5. Configure, preview, and create your audience. Segment returns you to the Guided Setup page.

Segment then begins sending your new audience(s) to the destinations in your dev environment. Verify in those destinations that your audiences are coming through as intended, then click **Mark complete**.

## Next steps

Use Cases pulls together a number of core Segment features, like [Sources](/docs/connections/sources), [Destinations](/docs/connections/destinations/), [data collection](/docs/protocols/tracking-plan/best-practices/), and [Reverse ETL](/docs/connections/reverse-etl/). View the documentation for each to learn how you can continue to expand and build on what you've alreay achieved.