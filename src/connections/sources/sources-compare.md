---
title: Sources Comparison
---

This page collates information about each source, organized by category for better comparison shopping.

{% assign categories = site.data.catalog.source_categories.items %}
{% assign promoted_categories = "Website, Mobile, Server, Ott" | split: ", " %}
<!--
## Library Sources
  <table>
    <tr>
      <th> Source </th>
      <th> Categories </th>
      <th> Data Type </th>
    </tr>
{% for category in promoted_categories %}
    {% assign integrations = site.data.catalog.sources.items | where: "categories", category %}
    {% for integration in integrations %}
    <tr>
      <td>**[{{ integration.display_name }}](/docs/{{ integration.url }})**</td>
      <td>{{ integration.categories }}</td>
      <td>{{ integration.type }}</td>
    </tr>
    {% endfor %}
  {% endfor %}
</table> -->


## Cloud App Sources

Cloud-App Sources allow you to pull in data from third-party tools so you can use it in Segment. There are two types of Cloud Apps: **Object** and **Event** sources. As in the basic tracking API, **objects** usually contain information about a person or group which is updated over time, while **event** data happens once, and is appended to a list.

- **Event Cloud-App Sources** can export their data both into Segment warehouses, and into other enabled Segment integrations that work with event data. Data from Event sources can include userIds and anonymousIds, and can affect your MTU usage.

- **Object Cloud-App Sources** export data and import it directly into a Segment warehouse. From the warehouse, you can analyze your data with SQL, or use Personas's SQL Traits to build audiences. Some examples of Object Cloud sources are Salesforce (account information), Zendesk (support cases), and Stripe (payments information).



<table>
<thead>
  <tr>
    <th width="20%"> Source </th>
    <th width="30%"> Categories </th>
    <th>Data Type</th>
  </tr>
</thead>
<tbody>
  {% assign integrations = site.data.catalog.sources.items %}
  {% for integration in integrations %}
    {% unless integration.categories contains promoted_categories[0] or integration.categories contains promoted_categories[1] or integration.categories contains promoted_categories[2] or integration.categories contains promoted_categories[3]%}
    {% unless integration.display_name == "Project"%}
  <tr>
    <td> [{{ integration.display_name }}](/docs/{{ integration.url }})</td>
    <td width="30%">{{ integration.categories | join: ", " | capitalize }}</td>
    <td width="20%">{% if integration.isCloudEventSource %} Event 🗓 {%else%}Object 🎁{%endif%}</td>
  </tr>
    {% endunless %}
    {% endunless %}
  {% endfor %}
  </tbody>
</table>
