---
title: Destination catalog
hide_toc: true
---

<div class="l-chiclet-collection">
  {% for destination in site.data.catalog.destinations.destinations %}
    <a class="chiclet-item" href="{{site.baseurl}}/{{ destination.name | replace: "catalog", "connections" }}">
      <div class="logo">
        <img src="{{destination.logos.mark}}" />
      </div>
      <div class="content">
        <p class="title">{{ destination.display_name }}</p>
        <p class="category">{{ destination.categories.primary }}</p>
      </div>
    </a>
  {% endfor %}
