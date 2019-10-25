---
title: Sources catalog
hide_toc: true
landing: true
icon: symbols/connections.svg
excerpt: Detailed information about each destination. Learn how our API methods are implemented for that destination.
layout: catalog
---

<div class="destinations-catalog">
  {% assign categories = site.data.catalogV2.source_categories.items %}
  {% for category in categories %}
    <div class="destinations-catalog__section markdown" id="{{ category.display_name | slugify }}">
      <h2 class="destinations-catalog__title">
        {{ category.display_name }}
      </h2>
      <div class="flex flex--wrap waffle waffle--large">
        {% assign integrations = site.data.catalogV2.sources.items | where: "categories", category.display_name %}
        {% for integration in integrations %}
          <div class="flex__column flex__column--6 flex__column--4@medium">
            <a class="thumbnail-integration" href="{{ site.baseurl }}/{{ integration.url }}">
              <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                <div class="thumbnail-integration__logo">
                  {% if integration.logos.mark != '' %}
                    <img class="image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                  {% else %}
                    <img class="image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                  {% endif %}
                </div>
                <h5>{{ integration.display_name }}</h5>
              </div>
              {% if integration.status == 'PUBLIC_BETA' %}
                <p class="thumbnail-integration__label">Beta</p>
              {% endif %}
            </a>
          </div>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>
