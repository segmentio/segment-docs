---
title: Sources catalog
hide_toc: true
---

<div class="l-chiclet-collection">
  {% assign sources = site.data.catalog.sources.sources %}
  {% for source in sources %}
    <a  class="chiclet-item" href="{{site.baseurl}}/{{ source.name | replace: "catalog", "connections" }}">
      <div class="content">
        <p class="title">{{ source.display_name }}</p>
      </div>
    </a>
  {% endfor %}
