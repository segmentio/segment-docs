---
title: Destination catalog
hide_toc: true
---

<div class="l-chiclet-collection">
  {% for destination in site.destinations %}
    <a class="chiclet-item" href="{{site.baseurl}}/connections/destinations/{{ destination.name | downcase }}">
      <div class="logo">
        <img src="{{destination.logos[1].mark}}" />
      </div>
      <div class="content">
        <p class="title">{{ destination.display_name }}</p>
        <p class="category">{{ destination.categories[0].primary }}</p>
      </div>
    </a>
  {% endfor %}