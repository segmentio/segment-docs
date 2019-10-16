---
title: Warehouses catalog
hide_toc: true
---

<div class="destinations-catalog">
  <div class="destinations-catalog__section" id="{{ category.name | slugify }}">
    <div class="flex flex--wrap waffle waffle--large">
      {% assign warehouses = site.data.catalog.warehouses.warehouses %}
      {% for warehouse in warehouses %}
        {% assign doc_path = warehouse.name | replace: "catalog", "connections" | replace: "warehouses", "destinations" %}

        <div class="flex__column flex__column--6 flex__column--4@medium">
          <a class="thumbnail-integration" href="{{ doc_path | relative_url }}">
            <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
              <div class="thumbnail-integration__logo">
                {% if warehouse.logos.mark != '' %}
                  <img class="image" alt="{{warehouse.display_name}}" src="{{warehouse.logos.mark}}" />
                {% else %}
                  <img class="image" alt="{{warehouse.display_name}}" src="{{warehouse.logos.logo}}" />
                {% endif %}
              </div>

              <h5>{{ warehouse.display_name }}</h5>
            </div>

            {% if warehouse.status == 'PUBLIC_BETA' %}
              <p class="thumbnail-integration__label">Beta</p>
            {% endif %}
          </a>
        </div>
      {% endfor %}
    </div>
  </div>
</div>
