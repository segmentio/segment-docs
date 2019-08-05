---
title: Warehouses catalog
hide_toc: true
---

<div class="l-chiclet-collection">
  {% assign warehouses = site.data.catalog.warehouses.warehouses %}
  {% for warehouse in warehouses %}
    <a  class="chiclet-item" href="{{site.baseurl}}/{{ warehouse.name | replace: "catalog", "connections" }}">
      {% if warehouse.logos.mark != '' %}
        {% assign class = "logo mark" %}
      {% else %}
        {% assign class = "logo full" %}
      {% endif %}

      <div class="{{class}}">
        {% if warehouse.logos.mark != '' %}
          <img alt="{{warehouse.display_name}}" src="{{warehouse.logos.mark}}" />
        {% else %}
          <img alt="{{warehouse.display_name}}" src="{{warehouse.logos.logo}}" />
        {% endif %}
        </div>
      <div class="content">
        <p class="title">{{ warehouse.display_name }}</p>
      </div>
    </a>
  {% endfor %}
