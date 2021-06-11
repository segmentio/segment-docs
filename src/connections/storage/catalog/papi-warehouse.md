---
title: Data Storage catalog
hide_toc: true
menu_icon: "read-more"
layout: catalog
---

<div class="destinations-catalog">
  <div class="destinations-catalog__section">
    <div class="flex flex--wrap waffle waffle--xlarge">
      {% assign warehouses = site.data.catalog.warehouses_papi.items | sort: "display_name" %}
      {% for warehouse in warehouses %}
          <div class="flex__column flex__column--6">
            <a class="thumbnail-integration flex flex--middle" href="{{ site.baseurl }}/{{ warehouse.url }}/">
              <div class="thumbnail-integration__content">
                <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                  <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                    {% if warehouse.mark.url != '' %}
                      <img class="thumbnail-integration__logo image" alt="{{ warehouse.display_name }}" src="{{ warehouse.mark.url }}" />
                    {% else %}
                      <img class="thumbnail-integration__logo image" alt="{{ warehouse.display_name }}" src="{{ warehouse.logo.url }}" />
                    {% endif %}
                  </div>
                  <h5 class="flex__column flex__column--12 flex__column--10@medium">{{ warehouse.display_name }}</h5>
                </div>
                {% if warehouse.status == 'PUBLIC_BETA' %}
                  <p class="thumbnail-integration__label">Beta</p>
                {% endif %}
              </div>
            </a>
          </div>

      {% endfor %}
    </div>
  </div>
</div>
