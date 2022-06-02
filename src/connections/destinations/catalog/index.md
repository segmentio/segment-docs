---
title: Destination Catalog
hide_toc: true
layout: catalog
menu_icon: "read-more"
redirect_from:
  - '/docs/connections/destinations/catalog/drift/'
---

> info "Want a simpler list?"
> Check out the [list of _all_ destinations](/docs/connections/destinations/catalog/index-all/).

<br>
<div class="destinations-catalog">
  {% assign categories = site.data.catalog.destination_categories.items | sort:"display_name" %}

  {% for category in categories %}
    <div class="destinations-catalog__section markdown">
      {% assign category_icon = category.slug | slugify %}
      <h2 class="destinations-catalog__title flex flex--middle" id="{{ category.slug | slugify }}">
      {{category.display_name}}
      </h2>
      <div class="flex flex--wrap waffle waffle--xlarge">
        {% assign destinations = site.data.catalog.destinations.items | where: "categories", category.display_name %}
        {% for destination in destinations %}
        {% unless destination.hidden %}
            {% if destination.status contains "PUBLIC" or destination.status contains "BETA" %}
              <div class="flex__column flex__column--6">
                <a class="thumbnail-integration flex flex--middle" href="{{ site.baseurl }}/{{ destination.url }}/">
                  <div class="thumbnail-integration__content">
                    <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                      <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                        {% if destination.mark.url != '' and destination.mark.url != null %}
                          <img class="thumbnail-integration__logo image" alt="{{ destination.display_name }}" src="{{ destination.mark.url }}">
                        {% else %}
                          <img class="thumbnail-integration__logo image" alt="{{ destination.display_name }}" src="{{ destination.logo.url }}">
                        {% endif %}
                      </div>
                      <h5 class="flex__column flex__column--12 flex__column--10@medium">{{ destination.display_name }}</h5>
                    </div>
                  </div>
                  {% if destination.status == 'PUBLIC_BETA' %}
                    <p class="thumbnail-integration__label">Beta</p>
                  {% endif %}
                </a>
              </div>
            {% endif %}
          {% endunless %}
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>
