---
title: Sending data to destinations
---

Once you've got data flowing _into_ Segment, what do you do with it? The Segment Destination catalog lists all of the places we can send your data.

## Routing data to destinations

When you enable a destination in the Segment App, you link it to a specific source (or sources). By default, Segment first processes the data from the selected source(s), then translates it and routes it from the Segment servers to to the API endpoint for that destination. This means that if you previously had loaded code or a snippet for that tool on your website or app, you should remove it to prevent sending duplicate data.

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

If you're just starting out, we know the [catalog](https://app.segment.com/catalog){.target="_blank"} can be really overwhelming. How do you choose from all of the available destinations?

We've written a lot about [how to choose your tools](https://segment.com/academy/choosing-stack/), but as a start, we recommend that you have one tool from each of the following categories:

- Analytics
- Email marketing
- Live-chat

We also feel that it's really important to have a data warehouse, so you can get a [clearer view of all of your data]() for analytics purposes. More on that just below.

## Adding a warehouse

Warehouses are a special type of destination which receive streaming data from your Segment sources, and store it in a table schema. This allows you to do a lot of interesting analytics work to answer your own questions about what your users are doing and why.



{% include components/media-icon.html href="https://university.segment.com/series/segment-101/destinations-warehouses?reg=1&referrer=docs" icon="media/icon-academy.svg" title="Segment University: Warehouses" content="Check out our course on warehouses in Segment University. (Must be logged in to access.)" %}

picking dests (methods comparison)
   - https://segment.com/docs/connections/destinations/cmodes-compare/





<div class="double">
  {% include components/media-icon.html  href="/getting-started/04-testing-debugging/" newtab="false" icon="symbols/arrow-left.svg" title="Back to A full Segment implementation" content=" " variant="related" %}

  {% include components/media-icon.html  href="/getting-started/05-data-to-destinations/" newtab="false" icon="symbols/arrow-right.svg" title="Next page: Testing and Debugging" content=" " variant="related" %}
</div>
