---
title: Destination catalog
hide_toc: true
layout: destinations
---

{% assign destination_categories = site.data.catalog.destinations.destinations | group_by:"categories.primary" | sort: "name" %}

<div class="destinations-catalog">
  {% for category in destination_categories %}
    <div class="destinations-catalog__section markdown" id="{{ category.name | slugify }}">
      {% assign category_name_size = category.name | size %}
      {% if category_name_size != 0 %}
        {% assign category_icon = category.name | slugify %}

        <h2 class="destinations-catalog__title" id="{{ category.name | slugify }}">
          {% include icons/destinations-catalog/{{ category_icon }}.svg %}

          {{ category.name }}
        </h2>
      {% endif %}

      <div class="flex flex--wrap waffle waffle--large">
        {% for destination in category.items %}
          {% assign doc_path = destination.name | replace: "catalog", "connections" | replace: "destinations", "destinations/catalog"  %}

          {% if destination.status contains "PUBLIC" or destination.status contains "BETA" %}
            <div class="flex__column flex__column--6 flex__column--4@medium">
              <a class="thumbnail-integration" href="{{ doc_path | relative_url }}">
                <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                  <div class="thumbnail-integration__logo">
                    {% if destination.logos.mark != '' %}
                      <img class="image" alt="{{destination.display_name}}" src="{{destination.logos.mark}}" />
                    {% else %}
                      <img class="image" alt="{{destination.display_name}}" src="{{destination.logos.logo}}" />
                    {% endif %}
                  </div>

                  <h5>{{ destination.display_name }}</h5>
                </div>

                {% if destination.status == 'PUBLIC_BETA' %}
                  <p class="thumbnail-integration__label">Beta</p>
                {% endif %}
              </a>
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>
