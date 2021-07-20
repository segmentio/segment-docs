---
title: Segment vs. Tag Managers
---

Tag managers, also known as Tag Management Systems (TMS), were a popular solution before the mainstream adoption of mobile apps. They primarily helped Digital Analytics and Online Marketers manage web tags or "beacons" on a website.

Built on an older technology, tag managers inject either a piece of JavaScript or an ad pixel into a website. They carry out rules that marketers create for each tag, like firing an ad channel pixel when that network refers a website visitor. Every tag requires users to create rules. No data is stored, and no code is eliminated.

In addition to ad networks, today's data-driven businesses use a variety of tools to optimize their product and marketing spends. In order to a/b test copy, nurture sales leads, email customers, and provide fast support, businesses integrate variety of analytics and marketing tools. Segment makes it easy to install, try, and use them all. Tag managers primarily focus on ad networks, and can't support modern tools without extensive customization.

Rather than "firing and forgetting," Segment takes a data-centric, deliberate approach to destinations. You don't need to set up special parameters for each tool – Segment does that for you. Segment structures your data so we can understand what it is, and can translate it correctly for each destination we send it to.  Segment works because [all of these tools](/docs/connections/destinations/catalog/) operate on the same customer data: who is on your app and what are they doing. Segment collects this data once, then translates and sends it to every tool you use. Because Segment also archives the data, we can [replay your historical data](/docs/guides/what-is-replay/) into new tools, and send your raw data to a [data storage solution](/docs/connections/storage/catalog/) for later analysis.


<table><tbody>
<tr><td></td><td><strong>Segment</strong></td><td><strong>Tag Managers</strong></td></tr>
<tr><td><strong>Core Competency</strong></td><td>Integrates complex tools with minimal effort, stores a complete copy of clickstream data, exports data to SQL databases</td><td>Loads JavaScript into webpages, inserts advertising pixels based on rule settings</td></tr><tr><td><strong>Data Storage</strong></td><td>Stores clickstream data in one comprehensive set; replays historical data into new tools; exports data into SQL databases and internal systems</td><td>Does not store data; cannot load historical data into new tools; cannot translate and load historical data into SQL databases</td></tr><tr><td><strong>Device Compatibility</strong></td><td>Tracks user events in mobile, web, and server environments. Server libraries include Python, Node, Ruby, PHP, .NET, Java, Clojure, Go, Rust and Xamarin</td><td>Operates on web; limited functionality on mobile; does not support server destinations</td>
</tr>
<tr><td><strong>User Interface</strong></td><td>Delivers sleek user experience; automatically translate data for new tools when you enable a destination</td><td>Requires that you configure settings and rules for each pixel to fire</td></tr>
<tr><td><strong>Tool Integrations</strong></td><td>Fully integrates analytics, advertising, email, customer support, marketing automation, usability tracking, error testing, and CRM tools with the flick of a switch</td><td>Manages ad pixels; requires custom engineering work to integrate any other complex tool</td></tr></tbody></table>

Every organization's data stack and business requirements are unique. Segment can also works well in tandem with a tag manager. In fact, Segment can also send data directly to the [Google Tag Manager (GTM) destination](/docs/connections/destinations/catalog/google-tag-manager/).

While you can use Segment's Analytics.js library through a tag manager, we don't recommended this for a few important reasons:

- A hybrid approach makes it difficult to determine the root cause of technical problems, and complicates troubleshooting. Segment cannot guarantee destination compatibility in a "hybrid" Segment-tag-manager installation, and cannot guarantee support on these installations. All QA and regression testing assumes a native installation of Analytics.js on the page.

- One of Segment's main charters is to not lose data. Our system and cloud infrastructure is designed to ensure that data loss does not happen. If you implement the entry point of data capture (Segment's libraries) using a Tag Manager, you introduce risk of data loss and make it difficult or impossible to troubleshoot.

- This implementation behind a tag manager can introduce major delays and performance issues, which can cause delays with events that need to occur early in your funnel.

- The biggest challenge is around triggering cascading events. Browsers are notorious for dropping calls. When you use a TMS to initiate Segment events you are introducing a second point of failure for those events.
