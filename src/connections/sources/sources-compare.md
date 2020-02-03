---
title: Sources Comparison Laura's Version
hidden: true
---

This page collates information about each source, organized by category for better comparison shopping.

{% assign categories = site.data.catalog.source_categories.items %}
{% assign promoted_categories = "Website, Mobile, Server, Ott" | split: ", " %}

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
</table>


## Cloud App Sources
<table>
  <tr>
    <th width="20%"> Source </th>
    <th width="30%"> Categories </th>
    <th> Data Type </th>
  </tr>
  {% assign integrations = site.data.catalog.sources.items %}
  {% for integration in integrations %}
    {% unless integration.categories contains promoted_categories[0] or integration.categories contains promoted_categories[1] or integration.categories contains promoted_categories[2] or integration.categories contains promoted_categories[3]%}
    {% unless integration.display_name == "Project"%}
  <tr>
    <td> **[{{ integration.display_name }}](/docs/{{ integration.url }})**</td>
    <td width="30%">{{ integration.categories | join: ", " }}</td>
    <td width="20%">{{ integration.type }} {%if integration.type == "object" %}🎁{%else%}🗓{%endif%}</td>
  </tr>
    {% endunless %}
    {% endunless %}
  {% endfor %}
</table>
