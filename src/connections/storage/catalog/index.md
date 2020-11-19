---
title: Data Storage catalog
hide_toc: true
menu_icon: "read-more"
layout: catalog
---

<div class="destinations-catalog">
  <div class="destinations-catalog__section">
    <div class="flex flex--wrap waffle waffle--large">
      {% assign warehouses = site.data.catalog.warehouse.items | sort: "display_name" %}
      {% for warehouse in warehouses %}
        {% if warehouse.status contains "PUBLIC" or warehouse.status contains "BETA" %}
          <div class="flex__column flex__column--6 flex__column--4@medium">
            <a class="thumbnail-integration" href="{{ site.baseurl }}/{{ warehouse.url }}/">
              <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                <div class="thumbnail-integration__logo">
                  {% if warehouse.mark.url != '' %}
                    <img class="image" alt="{{ warehouse.display_name }}" src="{{ warehouse.mark.url }}" />
                  {% else %}
                    <img class="image" alt="{{ warehouse.display_name }}" src="{{ warehouse.logo.url }}" />
                  {% endif %}
                </div>

                <h5>{{ warehouse.display_name }}</h5>
              </div>

              {% if warehouse.status == 'PUBLIC_BETA' %}
                <p class="thumbnail-integration__label">Beta</p>
              {% endif %}
            </a>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </div>
</div>
