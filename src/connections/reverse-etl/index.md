---
title: Reverse ETL
beta: false
redirect_from:
  - '/reverse-etl/'
hide_toc: true
landing: true
---

Reverse ETL (Extract, Transform, Load) extracts data from a data warehouse using a query you provide, and syncs the data to your 3rd party destinations. For example, with Reverse ETL, you can sync records from Snowflake to Mixpanel. Reverse ETL supports event and object data. This includes customer profile data, subscriptions, product tables, shopping cart tables, and more.

## Getting started with Reverse ETL
<div class="double">
  {% include components/reference-button.html
    href="/docs/connections/reverse-etl/set-up-retl"
    icon="reverse-etl.svg"
    title="Configure Reverse ETL"
    description="Set up your data warehouse, create a model for the data you'd like to synchronize from your data warehouse, add a downstream destination, and map data from your warehouse to your destination."
  %}

  {% include components/reference-button.html
    href="/docs/connections/reverse-etl/use-reverse-etl"
    icon="book.svg"
    title="Use Reverse ETL"
    description="Learn about use cases for Reverse ETL and how to make changes to your mappings and models."
  %}
</div>

## Reverse ETL references
<div class="double">
  {% include components/reference-button.html
    href="/docs/connections/reverse-etl/reverse-etl-reference"
    icon="help.svg"
    title="Limits and supported data types"
    description="Learn about the use and rate limits Segment placed on Reverse ETL and the objects and arrays Segment supports."
  %}

  {% include components/reference-button.html
    href="/docs/connections/reverse-etl/frequently-asked-questions"
    icon="megaphone.svg"
    title="Frequently asked questions"
    description="Get answers to Reverse ETL questions frequently asked by customers."
  %}
</div>

## More Segment resources
{% include components/reference-button.html
  icon="guides.svg"
  href="https://segment.com/blog/reverse-etl/"
  title="What is reverse ETL? A complete guide"
  description="In this blog from Segment, learn how reverse ETL helps businesses activate their data to drive better decision-making and greater operational efficiency."
%}

{% include components/reference-button.html
  icon="projects.svg"
  href="https://segment.com/customers/mongodb/"
  title="Customer story: MongoDB"
  description="Learn how MongoDB used Reverse ETL to connect the work of analytics teams to downstream marketing and sales tools to deliver just-in-time communicates that increased customer satisfaction and engagement."
%}