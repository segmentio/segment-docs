---
title: Destination catalog
hide_toc: true
---

<div class="l-chiclet-collection">
  {% assign destinations = site.data.catalog.destinations.destinations %}
  {% for destination in destinations %}
    {% if destination.status contains "PUBLIC" or destination.status contains "BETA" %}
      <a  class="chiclet-item" href="{{site.baseurl}}/{{ destination.name | replace: "catalog", "connections" }}">
        {% if destination.logos.mark != '' %}
          {% assign class = "logo mark" %}
        {% else %}
          {% assign class = "logo full" %}
        {% endif %}

        <div class="{{class}}">
          {% if destination.logos.mark != '' %}
            <img alt="{{destination.display_name}}" src="{{destination.logos.mark}}" />
          {% else %}
            <img alt="{{destination.display_name}}" src="{{destination.logos.logo}}" />
          {% endif %}
        </div>
        <div class="content">
          <p class="title">{{ destination.display_name }}</p>
          <p class="category">{{ destination.categories.primary }}</p>
        </div>
      </a>
    {% endif %}
  {% endfor %}
