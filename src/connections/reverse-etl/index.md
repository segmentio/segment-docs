---
title: Reverse ETL
beta: false
redirect_from:
  - '/reverse-etl/'
---

Reverse ETL (Extract, Transform, Load) extracts data from a data warehouse using a query you provide and syncs the data to your third party destinations. 

Use Reverse ETL when you want to:
* **Enable your marketing teams**: Sync audiences and other data built in the warehouse to Braze, Hubspot, or Salesforce Marketing Cloud for personalized marketing campaigns.
* **Enrich your customer profiles**: Sync enriched data to Mixpanel for a more complete view of the customer, or enrich Segment Unify with data from the warehouse.
* **Activate data in Twilio Engage**: Send data in the warehouse back into Segment as events that can be activated in all supported destinations, including Twilio Engage.
* **Strengthen your conversion events**: Pass offline or enriched data to conversion APIs like Facebook, Google Ads, TikTok, or Snapchat.
* **Empower business teams**: Connect Google Sheets to a view in the warehouse for other business teams to have access to up-to-date reports.

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
    href="/docs/connections/reverse-etl/reverse-etl-catalog"
    icon="reverse-etl.svg"
    title="Destination catalog"
    description="View the 30+ destinations with native Reverse ETL support and learn how you can use the Segment Connections and Segment Profiles to send data to the rest of the Segment catalog."
  %}
</div>

## Learn more

Learn more about the system that powers Reverse ETL, the mappings that power the flow of data to your downstream destinations, and observability tools you can use to manage your syncs.

<div class="flex flex--wrap gutter gutter--large">
  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/observability"
      title="Reverse ETL Observability"
      description="View the state of your Reverse ETL syncs and get alerted when things go wrong."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/mappings"
      title="Reverse ETL Mappings"
      description="Supported objects and arrays along with ways to manage your syncs."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/system"
      title="Reverse ETL System"
      description="Reference material about system limits and how Segment detects data changes."
    %}
  </div>
</div>
