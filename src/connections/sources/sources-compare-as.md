---
title: Sources Comparison
hidden: true
---

This page collates information about each source, organized by category for better comparison shopping.


<div class="destinations-catalog">
  {% assign categories = site.data.catalog.source_categories.items %}
  {% assign promoted_categories = "Website, Mobile, Server, Ott" | split: ", " %}

  {% for category in promoted_categories %}
    <div class="destinations-catalog__section markdown" id="{{ category | slugify }}">
      <h2 class="destinations-catalog__title" id="{{ category | slugify }}">
        {{ category }}
      </h2>
      <div>
        <table>
          <tr>
            <th> Source </th>
            <th> Categories </th>
            <th> Data Type </th>
          </tr>
          {% assign integrations = site.data.catalog.sources.items | where: "categories", category %}
          {% for integration in integrations %}
          <tr>
            <td>**[{{ integration.display_name }}](/docs/{{ integration.url }})**</td>
            <td>{{ integration.categories }}</td>
            <td>{{ integration.type }}</td>
          </tr>
          {% endfor %}
        </table>

      </div>
    </div>
  {% endfor %}


  <div class="destinations-catalog__section markdown" id="cloud-apps">
    <h2 class="destinations-catalog__title" id="cloud-apps">
      Cloud-apps
    </h2>
    <div>
        <table>
          <tr>
            <th> Source </th>
            <th> Categories </th>
            <th> Data Type </th>
          </tr>
          {% assign integrations = site.data.catalog.sources.items %}
          {% for integration in integrations %}
            {% unless integration.categories contains promoted_categories[0] or integration.categories contains promoted_categories[1] or integration.categories contains promoted_categories[2] or integration.categories contains promoted_categories[3]%}
          <tr>
            <td>**[{{ integration.display_name }}](/docs/{{ integration.url }})**</td>
            <td>{{ integration.categories | join: ", " }}</td>
            <td>{{ integration.type }}</td>
          </tr>
            {% endunless %}
          {% endfor %}
        </table>
    </div>
  </div>
</div>
