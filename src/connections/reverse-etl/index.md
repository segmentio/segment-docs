---
title: Reverse ETL
beta: false
hide_toc: true
redirect_from:
  - '/reverse-etl/'
---

Reverse ETL (Extract, Transform, Load) extracts data from a data warehouse using a query you provide and syncs the data to your third party destinations. 

Use Reverse ETL when you want to:
* **Enable your marketing teams**: Sync audiences and other data built in the warehouse to Braze, Hubspot, or Salesforce Marketing Cloud for personalized marketing campaigns.
* **Enrich your customer profiles**: Sync enriched data to Mixpanel for a more complete view of the customer, or enrich Segment Unify with data from your warehouse.
* **Activate data in Twilio Engage**: Send data in the warehouse back into Segment as events that can be activated in all supported destinations, including Twilio Engage destinations.
* **Strengthen your conversion events**: Pass offline or enriched data to conversion APIs like Facebook, Google Ads, TikTok, or Snapchat.
* **Empower business teams**: Connect Google Sheets to a view in the warehouse to create up-to-date reports for other business teams.

> info "Reverse ETL supports event and object data"
> Event and object data includes customer profile data, subscriptions, product tables, shopping cart tables, and more.


## Get started with Reverse ETL

<div class="double">
  {% include components/reference-button.html
    href="/docs/connections/reverse-etl/setup"
    icon="getting-started.svg"
    title="Set up Reverse ETL"
    description="Add a Reverse ETL source, set up a model, add a destination, and create mappings to transfer data from your warehouse to your downstream destinations."
  %}
  
  {% include components/reference-button.html
    href="/docs/connections/reverse-etl/manage-retl"
    icon="reverse-etl.svg"
    title="Manage Reverse ETL Syncs"
    description="View your sync history, gain insights into sync statuses, and restart or replay failed or partially successful syncs."
  %}
</div>

## Learn more

Learn more about the system that powers Reverse ETL, supported destinations, and frequently asked questions.
<div class="flex flex--wrap gutter gutter--large">
  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/system"
      title="Reverse ETL System"
      description="Reference material about system limits and how Segment detects data changes."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/reverse-etl-catalog"
      title="Destination catalog"
      description="View the 30+ destinations with native Reverse ETL support and learn how to send data to the rest of the Segment catalog using Segment Connections."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/faq"
      title="Reverse ETL FAQ"
      description="Frequently asked questions about Reverse ETL."
    %}
  </div>
</div>

## More Reverse ETL resources

{% include components/reference-button.html
  icon="guides.svg"
  href="https://segment.com/blog/reverse-etl/"
  title="What is Reverse ETL? A complete guide"
  description="In this blog from Segment, learn how Reverse ETL helps businesses activate their data to drive better decision-making and greater operational efficiency."
%}

{% include components/reference-button.html
  icon="projects.svg"
  href="https://segment.com/customers/mongodb/"
  title="Customer story: MongoDB"
  description="Learn how MongoDB used Reverse ETL to connect the work of analytics teams to downstream marketing and sales tools to deliver just-in-time communicates that increased customer satisfaction and engagement."
%}
