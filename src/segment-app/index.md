---
title: The Segment Web App
---

When you first log in, you go to your workspace. (If you're a member of several workspaces, you get to choose which one to go to.) Workspaces organize sets of sources and destinations

{% include components/reference-button.html href="https://university.segment.com/introduction-to-segment/299965?reg=1&referrer=docs" icon="media/academy.svg" title="Segment University: Segment App Overview" description="Want a video tour of the Segment workpsace? Head over to Segment University! (Must be logged in to access.)" %}

### What's a Workspace?

{% include content/whats-a-workspace.md %}


## Workspace Overview page

This is a Segment workspace.

![](images/workspace-overview.png)

The first thing you see is a graph of the Sources and Destinations you have connected to Segment. Sources send data to your workspace: these are your mobile apps, server sources, and website-based sources. Destinations are tools which get the data, and can also include Warehouses, which just store large amounts of data for later reuse and analysis.

The graph on this overview page includes lines which can show you which Sources send data to which Destinations. If this is the first time you're looking at your workspace and you haven't set it up yet, it won't look quite like this.

In the left navigation bar, you see the main parts of the Segment application: [Sources](/docs/connections/sources/), [Destinations](/docs/connections/destinations/), [Privacy](/docs/privacy/), and [Personas](/docs/personas/) and [Protocols](/docs/protocols/) if your subscription includes them.

You can also find the Catalog in the left navigation, which lists the sources you can collect data from, and the destinations you can send data to.

You can always click the Segment logo in the top left corner to get back to the Overview page.

## Sources

![](images/sources.png)

The Sources tab lists everything that is sending data to your Segment workspace. Sources are organized by type: website, mobile, sever, or by cloud-app type, like CRM or payments.

Each Source has a Status and a list of Destinations. A Source's Status tells you whether or not the source is sending data to Segment, and how long it's been since we last saw data from the source. The Source's Destinations list shows you which Destinations are receiving data from that Source. You can expand them for more detail.

## Destinations

![](images/destinations.png)

The Destination tab lists all of the Destinations connected to your workspace. These are sorted into categories like Analytics, Email marketing and other tool types. The list also shows whether or not Segment is sending data to that tool, or if the tool is enabled or disabled.

## The Segment Integration Catalog

![](images/catalog.png)

Next up we have the Catalog. The catalog includes a list of all [sources](/docs/connections/sources/) and [destinations](/docs/connections/destinations/) available in Segment. You can search either by category, or name. When you click on a catalog tile, the tile shows instructions on how to connect the tool to your Segment workspace.

The Catalog is always growing, so check out the "New and Noteworthy" section from time to time to see what's new!

## Personas and Protocols

If you have Protocols or Personas enabled in your workspace, you'll see sections for those too. Protocols helps you structure and maintain the format of the data you send through Segment, and Personas helps you use your Segment data to build audiences and better understand your users.

These features are fairly advanced, but you can learn more about them by [requesting a demo](https://segment.com/contact/sales/), or reading more in the [Personas documentation](/docs/personas/), and the [Protocols documentation](/docs/protocols/).

## Segment Settings

The **Workspace Settings** tab shows more information about your workspace, including your team settings, GDPR requests, and so on. You might not have access to edit these settings!

The **User Preferences** tab shows your individual account settings, including Notification settings.

The **Usage** tab shows how many API calls or [Monthly Tracked Users (MTUs)](/docs/guides/usage-and-billing/mtus-and-throughput/#how-does-segment-calculate-mtus) your workspace has used this month - which can be important for keeping an eye on your Segment bill.

## Health

The **Health** tab lists any repeated or consistent errors, which can help alert you to misconfigurations or data issues which you can correct.

Issues on the Health tab are sorted by Sources, Destinations, Warehouses, and again by type.

![](images/health.png)

If errors are present, they're sorted by type and include information about how long ago they were last seen, and how many times they've occurred. You can click the wrench icon on an individual error line to view the Event Delivery tool and see the erroring payload and response. You can also disable, or delete the erroring integration from this menu.

## Privacy Portal

The Privacy Portal allows you to inspect data coming into your Segment account, check it for Personally Identifying Information (PII), classify it based on how sensitive the information is, and then determine which categories of data to send to different destinations. Read more about these tools in the [Privacy Portal documentation](/docs/privacy/portal/).

![](/docs/privacy/images/privacy-add-new-matcher.gif)
