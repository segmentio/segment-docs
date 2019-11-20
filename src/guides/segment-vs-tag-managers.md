---
title: What is the difference between Segment and tag managers?
---

Tag managers, also known as Tag Management Systems (TMS), were a popular solution before the mainstream adoption of mobile apps. They primarily helped Digital Analytics and Online Marketers manage web tags or "beacons" on a website.

Built on an older technology, tag managers inject either a piece of JavaScript or an ad pixel into a website. They carry out rules marketers create for each tag, like firing an ad channel pixel when that network refers a website visitor. Every tag requires users to create rules. No data is stored, and no code is eliminated.

In addition to ad networks, today's data-driven businesses use a variety of tools to optimize their product and marketing spends. In order to a/b test copy, nurture sales leads, email customers, and provide fast support, businesses integrate variety of analytics and marketing tools. Segment makes it easy to install, try, and use them all. Tag managers primarily focus on ad networks, and can't support modern tools without extensive customization.

Rather than "firing and forgetting," Segment takes a data-centric, deliberate approach to destinations. We collect your data, and understand what it means so we can map it to each destination correctly. You don't need to set up special parameters for each tool – we do that for you. Segment works because [all of these tools](/docs/connections/destinations/) operate on the same customer data: who is on your app and what are they doing. Segment collects this data once, then translates and sends it to every tool you use. Because we store the data, we also have the ability to replay your historical data into new tools and give you acccess to your raw data in a SQL data warehouse.

<table><tbody>
<tr><td></td><td><strong>Segment</strong></td><td><strong>Tag Managers</strong></td></tr>
<tr><td><strong>Core Competency</strong></td><td>Integrates complex tools with the flick of a switch, stores a complete copy of clickstream data, exports data to SQL databases</td><td>Loads JavaScript into webpages; inserts advertising pixels based on rule settings</td></tr><tr><td><strong>Data Storage</strong></td><td>Stores clickstream data in one comprehensive set; replays historical data into new tools; exports data into SQL databases and internal systems</td><td>Does not store data; cannot load historical data into new tools; cannot translate and load data into SQL databases</td></tr><tr><td><strong>Device Compatibility</strong></td><td>Tracks user events in mobile, web, and server-side environments. Server libraries include Python, Node, Ruby, PHP, .NET, Java, Clojure, Go, Rust &amp; Xamarin</td><td>Operates on web; limited functionality on mobile; does not support server destinations</td>
</tr>
<tr><td><strong>User Interface</strong></td><td>Delivers sleek user experience; automatically configures tools when users switch on an destination</td><td>Requires users to designate a number of settings and rules for each pixel to fire</td></tr>
<tr><td><strong>Tool Integrations</strong></td><td>Fully integrates analytics, advertising, email, customer support, marketing automation, usability tracking, error testing, and CRM tools with the flick of a switch</td><td>Manages ad pixels; requires custom engineering work to integrate any other complex tool</td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></tbody></table>

Every organization's data stack and business requirements are unique. It is often the case where Segment works well in tandem with a tag manager. In fact, Segment has a direct integration with Google Tag Manager (GTM) as a Destination.

While it is also possible to fire Segment's Analytics.js library through a tag manager, we don't recommended that you do this for a few key reasons:

- Segment's Engineering team conduct all QA and regression testing assuming a native installation of Analytics.js on the page. They do not check for a tag manager 'hybrid' approach. Therefore when it comes to troubleshooting, it can be difficult to pinpoint root cause of a technical issue.

- One of Segment's main charters is to not lose data. Our system and cloud infrastructure is designed to ensure that data loss does not happen. If you implement the entry point of data capture (Segment's libraries) through an additional tool like a Tag Manager, you introduce additional risk of data loss and make it difficult or impossible to troubleshoot.

- This implementation architecture can cause major performance issues, such as delays with any events that need to occur early in your funnel.

- The biggest challenge is around triggering cascading events. Browsers are notorious for dropping calls. When you use a TMS to initiate Segment events you are introducing a second point of failure for those events.

- Not every implementation of a TMS is the same, therefore the issue around data loss can be trivial or very high on a case by case basis.

_Replay is available to customers on our Business tier plan._
