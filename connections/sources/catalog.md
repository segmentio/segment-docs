---
title: Sources catalog
hide_toc: true
---

<div class="l-chiclet-collection">
  {% assign app_sources = site.data.catalog.sources.sources %}
  {% assign cloud_sources = site.data.catalog.cloud_sources.sources %}
  {% assign sources = app_sources | concat: cloud_sources | uniq: 'display_name' | sort: 'display_name' %}

  {% for source in sources %}
    {% assign doc_path = source.name | replace: "catalog", "connections" %}

    <a  class="chiclet-item centered" href="{{doc_path | relative_url}}">
      {% if source.logos.mark != '' %}
        {% assign class = "logo mark" %}
      {% else %}
        {% assign class = "logo full" %}
      {% endif %}

      <div class="{{class}}">
        {% if source.logos.mark != '' %}
          <img alt="{{source.display_name}}" src="{{source.logos.mark}}" />
        {% else %}
          <img alt="{{source.display_name}}" src="{{source.logos.logo}}" />
        {% endif %}
        </div>
      <div class="content">
        <p class="title">{{ source.display_name }}</p>
      </div>
    </a>
  {% endfor %}
