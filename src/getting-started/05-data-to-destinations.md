---
title: Sending data to destinations
---

Once you've got data flowing _into_ Segment, what do you do with it? The Segment Destination catalog lists all of the places we can send your data.

## Routing data to destinations

When you enable a destination in the Segment App, you link it to a specific source (or sources). By default, Segment first processes the data from the selected source(s), then translates it and routes it from the Segment servers to to the API endpoint for that destination.

This means that if you previously had loaded code or a snippet for that tool on your website or app, you should remove it once you have Segment implemented so you don't send duplicate data.

You might also want to enable tools that need to be loaded on the user's device (either a computer or mobile device) in order to function properly. For our Analytics.js library, you can make these changes from the Segment App, and the Segment systems then update the bundle of code served when users request the page to include code required by the destination. You can read more about this in our [documentation on Connection Modes](/docs/connections/destinations/#connection-modes).


## Adding new destinations

Adding a destination is quick and easy from the Segment App. You'll need a token or API key for the tool, or some way to confirm your account in the tool.

1. From your Segment workspace, click **Add destination**.
   You can find this option on the Connections home page, from the Destinations list, or from a Source overview page.
2. Search for the destination in the Catalog, and click the destination's tile.
3. From the destination summary page that appears, click **Configure**.
4. Choose which source should send data to this destination, and click **Confirm source**.
5. In the **Connection Settings** that appear, enter any required fields.
   These might be an API key, an account ID, a token, or you might be prompted to log in to the tool.
6. If needed, click the toggle to enable the destination so it begins receiving data.


### Recommended destinations

If you're just starting out, we know the [catalog](https://app.segment.com/catalog){:target="_blank"} can be really overwhelming. How do you choose from all of the available destinations?

We've written a lot about [how to choose your tools](https://segment.com/academy/choosing-stack/), but as a start, we recommend that you have one tool from each of the following categories:

- Analytics
- Email marketing
- Live-chat

If you're adding more destinations after you've done your Segment instrumentation, you might want to check that the destinations you choose [can accept the methods](/docs/connections/destinations/methods-compare/) you're already using, and that they can [use the Connection Modes](https://segment.com/docs/connections/destinations/cmodes-compare/) you're already using.

We also feel that it's really important to have a data warehouse, so you can get a [clearer view of all of your data](https://segment.com/academy/intro/when-to-use-sql-for-analysis/) for analytics purposes. More on that just below.

## Adding a warehouse

Warehouses are a special type of destination which receive streaming data from your Segment sources, and store it in a table [schema based on your Segment calls](/docs/connections/storage/warehouses/schema/). This allows you to do a lot of interesting analytics work to answer your own questions about what your users are doing and why.

> note ""
> All customers can connect a data warehouse to Segment. Free and Team customers can connect one, while Business customers can connect as many as needed.

You should spend a bit of time [considering the benefits and tradeoffs of the warehouse options](https://segment.com/academy/choosing-stack/how-to-choose-the-right-data-warehouse/), and then choose one from our [warehouse catalog](/docs/connections/storage/catalog/).

When you choose a warehouse, you can then use the steps in the documentation to connect it. This may require that you create a new dedicated user (or "service user") to allow Segment to access the database.

Once your warehouse is configured and running, you can connect to it using a Business Intelligence (BI) tool (such as Looker, Mode, Tableau, or others) to analyze your data in-depth.

There are also a number of Business tier features you can then use with your warehouse, including [selective sync](/docs/connections/storage/warehouses/warehouse-syncs/#warehouse-selective-sync) and [Replay](/docs/guides/what-is-replay/).



{% include components/reference-button.html href="https://university.segment.com/series/segment-101/destinations-warehouses?reg=1&referrer=docs" icon="media/academy.svg" title="Segment University: Warehouses" description="Check out our course on warehouses in Segment University. (Must be logged in to access.)" %}



<div class="double">
  {% include components/reference-button.html href="/getting-started/04-full-install//" newtab="false" icon="symbols/arrow-left.svg" title="A full Segment implementation" description="Take your plans, and make them real." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/getting-started/06-testing-debugging/" newtab="false" icon="symbols/arrow-right.svg" title="Testing and Debugging" description="Test your implementation and see where your data is and isn't arriving." variant="related" subtitle="next" %}
</div>
